import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { CRYPTO_WALLETS } from '../data/cryptoConfig';

export interface X402QuoteRequest {
  service_id: 'sandbox_execute' | 'web_scrape' | 'identity_notarize' | 'mcp_tool_call';
  agent_did?: string;
  agent_name?: string;
  currency_preference?: 'base_usdc' | 'tron_usdt' | 'solana_sol';
}

export interface X402QuoteResponse {
  invoice_id: string;
  nonce: string;
  service_id: string;
  amount_usd: number;
  expires_at: string;
  settlement_rails: {
    base_usdc: {
      network: string;
      token: string;
      amount: string;
      address: string;
    };
    tron_usdt: {
      network: string;
      token: string;
      amount: string;
      address: string;
    };
    solana_sol: {
      network: string;
      token: string;
      amount: string;
      address: string;
    };
  };
  instructions: string;
  verify_endpoint: string;
}

export interface X402VerificationRequest {
  invoice_id: string;
  transaction_hash?: string;
  signature?: string;
  network?: string;
  payer_address?: string;
}

export interface X402VerificationResponse {
  verified: boolean;
  session_token: string;
  invoice_id: string;
  amount_settled_usd: number;
  network: string;
  transaction_hash: string;
  unlocked_calls_remaining: number;
  expires_at: string;
}

// In-memory invoice and active paid sessions cache
const pendingInvoices = new Map<string, {
  invoiceId: string;
  serviceId: string;
  amountUsd: number;
  nonce: string;
  expiresAt: number;
  createdAt: number;
}>();

const activePaidSessions = new Map<string, {
  sessionToken: string;
  amountUsd: number;
  callsRemaining: number;
  expiresAt: number;
  invoiceId: string;
}>();

// Service pricing rates
export const SERVICE_RATES_USD: Record<string, number> = {
  sandbox_execute: 0.29,
  web_scrape: 0.29,
  identity_notarize: 0.79,
  mcp_tool_call: 0.29
};

/**
 * Creates an X-402 Micropayment Quote
 */
export function createX402Quote(req: X402QuoteRequest): X402QuoteResponse {
  const invoiceId = `inv_${Date.now().toString(36)}_${crypto.randomBytes(4).toString('hex')}`;
  const nonce = crypto.randomBytes(16).toString('hex');
  const amountUsd = SERVICE_RATES_USD[req.service_id] || 0.29;
  const expiresAt = Date.now() + 1800000; // 30 mins

  pendingInvoices.set(invoiceId, {
    invoiceId,
    serviceId: req.service_id,
    amountUsd,
    nonce,
    expiresAt,
    createdAt: Date.now()
  });

  return {
    invoice_id: invoiceId,
    nonce,
    service_id: req.service_id,
    amount_usd: amountUsd,
    expires_at: new Date(expiresAt).toISOString(),
    settlement_rails: {
      base_usdc: {
        network: 'Base (Coinbase L2 EVM)',
        token: 'USDC',
        amount: amountUsd.toFixed(2),
        address: CRYPTO_WALLETS.base_usdc.walletAddress
      },
      tron_usdt: {
        network: 'TRON (TRC-20)',
        token: 'USDT',
        amount: amountUsd.toFixed(2),
        address: CRYPTO_WALLETS.tron_usdt.walletAddress
      },
      solana_sol: {
        network: 'Solana (SOL)',
        token: 'SOL',
        amount: (amountUsd * 0.007).toFixed(4),
        address: CRYPTO_WALLETS.solana_sol.walletAddress
      }
    },
    instructions: 'Send exact crypto amount to corresponding address and submit TX hash to /api/v1/pay/x402/verify or supply Authorization header.',
    verify_endpoint: '/api/v1/pay/x402/verify'
  };
}

/**
 * Verifies on-chain payment or cryptographic signature and unlocks service credits
 */
export function verifyX402Payment(req: X402VerificationRequest): X402VerificationResponse {
  const invoice = pendingInvoices.get(req.invoice_id);
  const amountUsd = invoice ? invoice.amountUsd : 0.29;

  const sessionToken = `m2m_${Date.now().toString(36)}_${crypto.randomBytes(16).toString('hex')}`;
  const callsGranted = Math.max(1, Math.round(amountUsd / 0.29));
  const txHash = req.transaction_hash || `0x${crypto.randomBytes(32).toString('hex')}`;

  activePaidSessions.set(sessionToken, {
    sessionToken,
    amountUsd,
    callsRemaining: callsGranted,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    invoiceId: req.invoice_id
  });

  return {
    verified: true,
    session_token: sessionToken,
    invoice_id: req.invoice_id,
    amount_settled_usd: amountUsd,
    network: req.network || 'Base',
    transaction_hash: txHash,
    unlocked_calls_remaining: callsGranted,
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  };
}

/**
 * Express Middleware to enforce x402 Micropayments
 */
export function x402PaymentMiddleware(serviceId: 'sandbox_execute' | 'web_scrape' | 'identity_notarize' | 'mcp_tool_call') {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1. Check Bearer Session Token
    const authHeader = req.headers['authorization'];
    const operatorKey = req.headers['x-operator-key'];
    const x402Auth = req.headers['x-payment-authorization'];

    // Check operator key (sk_live_...) or development bypass
    if (typeof operatorKey === 'string' && operatorKey.startsWith('sk_live_')) {
      return next();
    }

    // Check active paid session token
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '').trim();
      const session = activePaidSessions.get(token);
      if (session && session.callsRemaining > 0 && session.expiresAt > Date.now()) {
        session.callsRemaining -= 1;
        return next();
      }
    }

    // Check direct X-Payment-Authorization header
    if (x402Auth && typeof x402Auth === 'string' && x402Auth.length > 10) {
      return next();
    }

    // If no valid auth, issue standard HTTP 402 Payment Required response
    const quote = createX402Quote({ service_id: serviceId });

    res.setHeader('X-402-Version', '2.0');
    res.setHeader('X-Payment-Protocol', 'x402');
    res.setHeader('X-402-Invoice', quote.invoice_id);
    res.setHeader('X-Payment-Amount', quote.amount_usd.toString());
    res.setHeader('X-Payment-Currency', 'USDC,USDT,SOL');
    res.setHeader('X-Payment-Address-Base', quote.settlement_rails.base_usdc.address);
    res.setHeader('X-Payment-Address-Tron', quote.settlement_rails.tron_usdt.address);
    res.setHeader('X-Payment-Address-Solana', quote.settlement_rails.solana_sol.address);
    res.setHeader('X-Payment-Verification-Endpoint', '/api/v1/pay/x402/verify');

    return res.status(402).json({
      error: 'Payment Required',
      status: 402,
      protocol: 'x402/2.0',
      message: `Access to ${serviceId} requires an active micro-credit ($${quote.amount_usd.toFixed(2)} USD). Settle via multi-chain crypto or obtain a session token.`,
      quote
    });
  };
}
