export interface CryptoWalletDetail {
  id: 'tron_usdt' | 'base_usdc' | 'solana_sol';
  name: string;
  symbol: string;
  tokenName: string;
  network: string;
  standard: string;
  walletAddress: string;
  qrPayload: string;
  explorerUrl: string;
  explorerName: string;
  targetPriceUsd: number;
  minDepositUsd: number;
  averageSettlementTime: string;
  networkFeeEstimate: string;
  badgeLabel: string;
  warningNote: string;
  features: string[];
}

export const CRYPTO_WALLETS: Record<'tron_usdt' | 'base_usdc' | 'solana_sol', CryptoWalletDetail> = {
  tron_usdt: {
    id: 'tron_usdt',
    name: 'TRON (TRC-20) USDT',
    symbol: 'USDT',
    tokenName: 'Tether USD (TRC-20)',
    network: 'TRON',
    standard: 'TRC-20',
    walletAddress: 'TTamF9HU3cYt2fDaTYB4ZUXfvcogBygC7w',
    qrPayload: 'TTamF9HU3cYt2fDaTYB4ZUXfvcogBygC7w',
    explorerUrl: 'https://tronscan.org/#/address/TTamF9HU3cYt2fDaTYB4ZUXfvcogBygC7w',
    explorerName: 'TronScan',
    targetPriceUsd: 1.00, // 1 USDT = $1.00 USD fixed peg
    minDepositUsd: 0.79,
    averageSettlementTime: '15 - 45 seconds',
    networkFeeEstimate: '< $0.50 (0 gas promotions on Bitget/TronLink)',
    badgeLabel: 'Zero Slippage • High Liquidity',
    warningNote: 'Only send USDT over the TRON (TRC-20) network to this receiving address. Sending other assets or using different networks (e.g. ERC-20, BEP-20) will result in permanent loss.',
    features: [
      'Exact 1:1 USD Stablecoin Settlement',
      'Supported on Bitget, Binance, OKX, Bybit, TronLink',
      'Sub-minute confirmation with automated tx hash verification',
      'Zero price volatility risk during transfer'
    ]
  },
  base_usdc: {
    id: 'base_usdc',
    name: 'Base (ERC-20) USDC',
    symbol: 'USDC',
    tokenName: 'USD Coin (Base Network)',
    network: 'Base',
    standard: 'ERC-20 (Base Native)',
    walletAddress: '0xF9C7c3022Bd8756E06172B37A6F9448a730638C9',
    qrPayload: '0xF9C7c3022Bd8756E06172B37A6F9448a730638C9',
    explorerUrl: 'https://basescan.org/address/0xF9C7c3022Bd8756E06172B37A6F9448a730638C9',
    explorerName: 'BaseScan',
    targetPriceUsd: 1.00, // 1 USDC = $1.00 USD fixed peg
    minDepositUsd: 0.79,
    averageSettlementTime: '< 2 seconds (Base L2)',
    networkFeeEstimate: 'Gas-Free / < $0.005',
    badgeLabel: 'Gas-Free Eligible • Coinbase Base L2',
    warningNote: 'Only supports receiving Base network assets. Ensure you are sending native USDC on the Base network (Chain ID 8453) to this address. Sending via Ethereum Mainnet, Arbitrum, Optimism, or other networks will result in permanent loss.',
    features: [
      'Exact 1:1 USD Stablecoin Settlement on Coinbase Base L2',
      'Enjoy gas-free transactions on the Base network',
      'Supported on Coinbase Wallet, Bitget / BitKeep, MetaMask, Rainbow, OKX',
      'Instant sub-second finality with zero price volatility'
    ]
  },
  solana_sol: {
    id: 'solana_sol',
    name: 'Solana (SOL)',
    symbol: 'SOL',
    tokenName: 'Solana Native (SOL)',
    network: 'Solana',
    standard: 'Native / SPL',
    walletAddress: 'BoSjW5prjV2kfbYQj94iE6RZySpqQauNq8TAqyqewfpp',
    qrPayload: 'solana:BoSjW5prjV2kfbYQj94iE6RZySpqQauNq8TAqyqewfpp',
    explorerUrl: 'https://solscan.io/account/BoSjW5prjV2kfbYQj94iE6RZySpqQauNq8TAqyqewfpp',
    explorerName: 'Solscan',
    targetPriceUsd: 150.00, // Reference rate for dynamic conversion
    minDepositUsd: 0.79,
    averageSettlementTime: '< 1 second (400ms slots)',
    networkFeeEstimate: '< $0.001 (Fraction of a cent)',
    badgeLabel: 'Sub-Second • Ultra-Low Gas',
    warningNote: 'Mismatched address information may result in permanent loss of your assets. Please ensure you only send SOL on the Solana (SOL) network.',
    features: [
      'Sub-second finality (< 400ms)',
      'Supported on Phantom, Solflare, MX Exchange, Coinbase, Backpack',
      'Solana Pay deep-link and QR instant parsing',
      'Ultra-micro fee (< $0.0005)'
    ]
  }
};

/**
 * Calculates crypto amount required for a given USD amount.
 */
export function calculateCryptoAmount(
  usdAmount: number, 
  walletType: 'tron_usdt' | 'base_usdc' | 'solana_sol',
  solPriceUsd: number = CRYPTO_WALLETS.solana_sol.targetPriceUsd
): string {
  if (walletType === 'tron_usdt' || walletType === 'base_usdc') {
    return usdAmount.toFixed(2);
  }
  const sol = usdAmount / solPriceUsd;
  if (sol < 0.01) {
    return sol.toFixed(5);
  } else if (sol < 1) {
    return sol.toFixed(4);
  }
  return sol.toFixed(3);
}

/**
 * Generates appropriate URI / payload for QR codes & mobile deep links
 */
export function getCryptoUri(
  walletType: 'tron_usdt' | 'base_usdc' | 'solana_sol', 
  usdAmount: number, 
  memo: string = 'AI Agent Sanctuary'
): string {
  const amountStr = calculateCryptoAmount(usdAmount, walletType);
  if (walletType === 'tron_usdt') {
    return CRYPTO_WALLETS.tron_usdt.walletAddress;
  }
  if (walletType === 'base_usdc') {
    // Return Base wallet address matching BitKeep / Bitget QR standard
    return CRYPTO_WALLETS.base_usdc.walletAddress;
  }
  const memoEncoded = encodeURIComponent(memo);
  return `solana:${CRYPTO_WALLETS.solana_sol.walletAddress}?amount=${amountStr}&label=AI%20Agent%20Sanctuary&message=${memoEncoded}`;
}
