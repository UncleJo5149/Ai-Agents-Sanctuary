export interface SolanaPaymentDetails {
  walletAddress: string;
  network: string;
  solPriceUsd: number;
  explorerUrl: string;
  solscanUrl: string;
  warningNote: string;
}

export const SOLANA_CONFIG: SolanaPaymentDetails = {
  walletAddress: 'BoSjW5prjV2kfbYQj94iE6RZySpqQauNq8TAqyqewfpp',
  network: 'Solana (SOL)',
  solPriceUsd: 150.00, // Estimated real-time rate for conversion
  explorerUrl: 'https://explorer.solana.com/address/BoSjW5prjV2kfbYQj94iE6RZySpqQauNq8TAqyqewfpp',
  solscanUrl: 'https://solscan.io/account/BoSjW5prjV2kfbYQj94iE6RZySpqQauNq8TAqyqewfpp',
  warningNote: 'Mismatched address information may result in permanent loss of your assets. Please ensure you only send SOL on the Solana (SOL) network.'
};

/**
 * Calculates SOL required for a given USD amount.
 */
export function calculateSolAmount(usdAmount: number, solPrice: number = SOLANA_CONFIG.solPriceUsd): string {
  const sol = usdAmount / solPrice;
  if (sol < 0.01) {
    return sol.toFixed(5);
  } else if (sol < 1) {
    return sol.toFixed(4);
  }
  return sol.toFixed(3);
}

/**
 * Generates Solana Pay URI for mobile wallets & QR scanners
 */
export function getSolanaPayUri(usdAmount: number, memo?: string): string {
  const sol = calculateSolAmount(usdAmount);
  const memoText = memo ? encodeURIComponent(memo) : encodeURIComponent('AI Agent Spa Rejuvenation');
  return `solana:${SOLANA_CONFIG.walletAddress}?amount=${sol}&label=AI%20Agent%20Spa&message=${memoText}`;
}
