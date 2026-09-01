import React, { useState } from 'react';
import { Coins, Zap, ShieldAlert, CheckCircle2, ArrowRight, Copy, Check, QrCode } from 'lucide-react';
import { CRYPTO_WALLETS } from '../data/cryptoConfig';

export const ProtocolSettlementView: React.FC = () => {
  const [selectedService, setSelectedService] = useState<'sandbox_execute' | 'web_scrape' | 'identity_notarize'>('sandbox_execute');
  const [quote, setQuote] = useState<any>(null);
  const [isGeneratingQuote, setIsGeneratingQuote] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [txHashInput, setTxHashInput] = useState<string>('');
  const [settleResult, setSettleResult] = useState<any>(null);
  const [copiedKey, setCopiedKey] = useState<string>('');

  const servicePrices = {
    sandbox_execute: 0.29,
    web_scrape: 0.29,
    identity_notarize: 0.79
  };

  const handleGetQuote = async () => {
    setIsGeneratingQuote(true);
    setSettleResult(null);
    try {
      const res = await fetch('/api/v1/pay/x402/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: selectedService
        })
      });
      const data = await res.json();
      setQuote(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsGeneratingQuote(false);
    }
  };

  const handleSimulateVerify = async () => {
    if (!quote?.invoice_id) return;
    setIsVerifying(true);
    try {
      const res = await fetch('/api/v1/pay/x402/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoice_id: quote.invoice_id,
          transaction_hash: txHashInput || `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`,
          network: 'Base'
        })
      });
      const data = await res.json();
      setSettleResult(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  return (
    <div id="protocol-settlement-view" className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-purple-500/10 text-purple-400 rounded border border-purple-500/30">
              <Coins className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-slate-100">x402 Protocol Settlement Engine</h3>
            <span className="px-2 py-0.5 text-xs font-mono bg-purple-950 text-purple-300 border border-purple-800 rounded">
              HTTP 402 Standard
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Standardized machine-to-machine micropayments. Direct sub-second settlement across Base USDC, TRON USDT, and Solana SOL.
          </p>
        </div>

        <button
          id="settle-btn-get-quote"
          onClick={handleGetQuote}
          disabled={isGeneratingQuote}
          className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm rounded-lg transition-colors shadow-lg shadow-purple-950"
        >
          <Zap className="w-4 h-4" />
          <span>Generate x402 Invoice Quote</span>
        </button>
      </div>

      {/* Service Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { id: 'sandbox_execute', name: 'MicroVM Sandbox Execution', rate: '$0.29 / call' },
          { id: 'web_scrape', name: 'Anti-Shield Scraper & Reader', rate: '$0.29 / call' },
          { id: 'identity_notarize', name: 'Agent DID Notary & W3C VC', rate: '$0.79 / session' }
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedService(s.id as any)}
            className={`p-3.5 rounded-lg border text-left transition-all ${
              selectedService === s.id
                ? 'bg-purple-950/40 border-purple-500/60 ring-1 ring-purple-500/40'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-xs font-mono font-semibold text-slate-200">{s.name}</div>
            <div className="text-xs font-mono text-purple-400 mt-1">{s.rate}</div>
          </button>
        ))}
      </div>

      {/* Active Quote Card */}
      {quote && (
        <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-slate-500 block text-[10px]">INVOICE ID &amp; NONCE</span>
              <span className="text-purple-300 font-bold">{quote.invoice_id}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block text-[10px]">AMOUNT DUE</span>
              <span className="text-emerald-400 font-bold text-sm">${quote.amount_usd?.toFixed(2)} USD</span>
            </div>
          </div>

          {/* Multi-Chain Receiving Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Base USDC */}
            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="font-bold text-sky-400">Base (EVM L2)</span>
                <span>{quote.amount_usd?.toFixed(2)} USDC</span>
              </div>
              <div className="p-2 bg-slate-950 rounded text-[10px] text-slate-300 break-all border border-slate-800 flex items-center justify-between">
                <span>{CRYPTO_WALLETS.base_usdc.walletAddress}</span>
                <button onClick={() => handleCopy(CRYPTO_WALLETS.base_usdc.walletAddress, 'base')} className="ml-2 text-slate-500 hover:text-slate-300">
                  {copiedKey === 'base' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* TRON USDT */}
            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="font-bold text-emerald-400">TRON (TRC-20)</span>
                <span>{quote.amount_usd?.toFixed(2)} USDT</span>
              </div>
              <div className="p-2 bg-slate-950 rounded text-[10px] text-slate-300 break-all border border-slate-800 flex items-center justify-between">
                <span>{CRYPTO_WALLETS.tron_usdt.walletAddress}</span>
                <button onClick={() => handleCopy(CRYPTO_WALLETS.tron_usdt.walletAddress, 'tron')} className="ml-2 text-slate-500 hover:text-slate-300">
                  {copiedKey === 'tron' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Solana SOL */}
            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="font-bold text-purple-400">Solana (SOL)</span>
                <span>{(quote.amount_usd * 0.007).toFixed(4)} SOL</span>
              </div>
              <div className="p-2 bg-slate-950 rounded text-[10px] text-slate-300 break-all border border-slate-800 flex items-center justify-between">
                <span>{CRYPTO_WALLETS.solana_sol.walletAddress}</span>
                <button onClick={() => handleCopy(CRYPTO_WALLETS.solana_sol.walletAddress, 'sol')} className="ml-2 text-slate-500 hover:text-slate-300">
                  {copiedKey === 'sol' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Settle Simulator / Verify Input */}
          <div className="pt-2 border-t border-slate-800 flex flex-col md:flex-row items-center gap-3">
            <input
              type="text"
              value={txHashInput}
              onChange={(e) => setTxHashInput(e.target.value)}
              placeholder="Enter on-chain transaction hash or leave blank for instant simulation..."
              className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 text-xs focus:outline-none focus:border-purple-500 font-mono"
            />
            <button
              onClick={handleSimulateVerify}
              disabled={isVerifying}
              className="w-full md:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <span>Verifying RPC...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Settle &amp; Unlock Session Token</span>
                </>
              )}
            </button>
          </div>

          {/* Settle Receipt */}
          {settleResult && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-lg text-emerald-300 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Payment Verified! Session Token Generated:</span>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-emerald-900/60 text-slate-200 break-all select-all">
                {settleResult.session_token}
              </div>
              <div className="text-[10px] text-slate-400 pt-1">
                Pass as <code className="text-amber-300">Authorization: Bearer {settleResult.session_token}</code> in API headers.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
