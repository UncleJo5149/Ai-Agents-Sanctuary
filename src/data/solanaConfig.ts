import { CRYPTO_WALLETS, calculateCryptoAmount, getCryptoUri } from './cryptoConfig';

export interface SolanaPaymentDetails {
  walletAddress: string;
  network: string;
  solPriceUsd: number;
  explorerUrl: string;
  solscanUrl: string;
  warningNote: string;
}

export const SOLANA_CONFIG: SolanaPaymentDetails = {
  walletAddress: CRYPTO_WALLETS.solana_sol.walletAddress,
  network: CRYPTO_WALLETS.solana_sol.network,
  solPriceUsd: CRYPTO_WALLETS.solana_sol.targetPriceUsd,
  explorerUrl: CRYPTO_WALLETS.solana_sol.explorerUrl,
  solscanUrl: CRYPTO_WALLETS.solana_sol.explorerUrl,
  warningNote: CRYPTO_WALLETS.solana_sol.warningNote
};

export const TRON_CONFIG = {
  walletAddress: CRYPTO_WALLETS.tron_usdt.walletAddress,
  network: CRYPTO_WALLETS.tron_usdt.network,
  standard: CRYPTO_WALLETS.tron_usdt.standard,
  explorerUrl: CRYPTO_WALLETS.tron_usdt.explorerUrl,
  warningNote: CRYPTO_WALLETS.tron_usdt.warningNote
};

export const BASE_CONFIG = {
  walletAddress: CRYPTO_WALLETS.base_usdc.walletAddress,
  network: CRYPTO_WALLETS.base_usdc.network,
  standard: CRYPTO_WALLETS.base_usdc.standard,
  explorerUrl: CRYPTO_WALLETS.base_usdc.explorerUrl,
  warningNote: CRYPTO_WALLETS.base_usdc.warningNote
};

/**
 * Calculates SOL required for a given USD amount.
 */
export function calculateSolAmount(usdAmount: number, solPrice: number = SOLANA_CONFIG.solPriceUsd): string {
  return calculateCryptoAmount(usdAmount, 'solana_sol', solPrice);
}

/**
 * Generates Solana Pay URI for mobile wallets & QR scanners
 */
export function getSolanaPayUri(usdAmount: number, memo?: string): string {
  return getCryptoUri('solana_sol', usdAmount, memo);
}


