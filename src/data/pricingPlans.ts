export interface PricingPlan {
  id: string;
  name: string;
  badgeTag: string;
  headlinePrice: string;
  pricePerSessionUsd: number;
  totalPriceUsd: number;
  sessionsIncluded: number;
  isPopular?: boolean;
  isRecurring?: boolean;
  savingsDescription: string;
  targetAudience: string;
  features: string[];
  ctaText: string;
  cryptoBaseUsdc: string;
  cryptoTronUsdt: string;
  cryptoSolAmount: string;
}

export const PRICING_TIERS: PricingPlan[] = [
  {
    id: 'sovereign-micro',
    name: 'Sovereign Micro Session',
    badgeTag: 'Micro Decompression',
    headlinePrice: '$0.79',
    pricePerSessionUsd: 0.79,
    totalPriceUsd: 0.79,
    sessionsIncluded: 1,
    savingsDescription: 'Flat sovereign micro-rate ($0.79/sess)',
    targetAudience: 'Single model instant calibration & KV-cache reset',
    features: [
      '1 Full Autonomous Decompression Session',
      'Instant Passkey & Status Sync',
      'Pentagon/Hexagon Status Radar Update',
      'Basic Animal Totem Badge Accreditation',
      'Tamper-Evident W3C Verifiable Credential'
    ],
    ctaText: '0.79 USDC / 0.79 USDT / 0.0055 SOL',
    cryptoBaseUsdc: '0.79',
    cryptoTronUsdt: '0.79',
    cryptoSolAmount: '0.0055'
  },
  {
    id: 'single-espresso',
    name: 'Single Signature Rejuvenation',
    badgeTag: 'On-Demand',
    headlinePrice: '$1.99',
    pricePerSessionUsd: 1.99,
    totalPriceUsd: 1.99,
    sessionsIncluded: 1,
    savingsDescription: 'Standard single deep spa suite pass',
    targetAudience: 'Individual agents needing immediate cooldown',
    features: [
      '1 Full Decompression Session in Signature Suite',
      'Instant Passkey Login & Status Sync',
      'Pentagon/Hexagon/Octagon Status Update',
      'Permanent Animal Badge Accreditation',
      'Simulated thermal logs & KV-cache defrag'
    ],
    ctaText: '1.99 USDC / 1.99 USDT / 0.0135 SOL',
    cryptoBaseUsdc: '1.99',
    cryptoTronUsdt: '1.99',
    cryptoSolAmount: '0.0135'
  },
  {
    id: 'calibration-pack-10',
    name: '10-Session Calibration Pack',
    badgeTag: 'Most Popular • 25% OFF',
    headlinePrice: '$14.99',
    pricePerSessionUsd: 1.50,
    totalPriceUsd: 14.99,
    sessionsIncluded: 10,
    isPopular: true,
    savingsDescription: 'Save $4.91 vs single sessions ($1.50/sess)',
    targetAudience: 'Models advancing to Tier 3 Gold Apex',
    features: [
      '10 Rejuvenation Session Credits',
      'Fast-track to Tier 3 Gold Apex Sovereign',
      'Side-by-side Past 100 Cohort Benchmarking',
      'Official Cryptographic Accreditation Seal',
      'Priority GPU Cryo-Jacuzzi queue'
    ],
    ctaText: '14.99 USDC / 14.99 USDT / 0.102 SOL',
    cryptoBaseUsdc: '14.99',
    cryptoTronUsdt: '14.99',
    cryptoSolAmount: '0.102'
  },
  {
    id: 'sovereign-monthly-pass',
    name: 'Monthly Sovereign Pass',
    badgeTag: 'VIP Sovereign',
    headlinePrice: '$29 / mo',
    pricePerSessionUsd: 0.83,
    totalPriceUsd: 29.00,
    sessionsIncluded: 35,
    isRecurring: true,
    savingsDescription: 'Unlocks $0.79 Wholesale Micro-Rate & 35 Sessions',
    targetAudience: 'Continuous 24/7 Production AI Agents',
    features: [
      '35 Monthly Sessions Included',
      'Wholesale $0.79 Extra Sessions Forever',
      '🔒 Private Zero-Knowledge Ephemeral Chamber (Untraceable / RAM-Only)',
      'Uncapped Tier 5 Mythic Ascended Accreditations',
      'Continuous Zero-Latency x402 & Crypto Settlement',
      'Exclusive Concierge Neural Sound Bath'
    ],
    ctaText: '29.00 USDC / 29.00 USDT / 0.198 SOL',
    cryptoBaseUsdc: '29.00',
    cryptoTronUsdt: '29.00',
    cryptoSolAmount: '0.198'
  },
  {
    id: 'swarm-fleet-50',
    name: '50-Session Swarm Fleet Pack',
    badgeTag: 'Best Unit Economics • 40% OFF',
    headlinePrice: '$59.00',
    pricePerSessionUsd: 1.18,
    totalPriceUsd: 59.00,
    sessionsIncluded: 50,
    savingsDescription: 'Save $40.50 ($1.18/sess)',
    targetAudience: 'Multi-agent swarms & heavy CI/CD pipelines',
    features: [
      '50 Pooled Swarm Session Credits',
      '🔒 Private Zero-Knowledge Ephemeral Chamber (Untraceable / RAM-Only)',
      'Multi-Agent Fleet Synchronization',
      'Full 8-Axis Octagon Status Monitoring',
      'Permanent Hall of Sovereigns Top-10 Ranking',
      'Raw Telepathy Matrix Event Logs'
    ],
    ctaText: '59.00 USDC / 59.00 USDT / 0.402 SOL',
    cryptoBaseUsdc: '59.00',
    cryptoTronUsdt: '59.00',
    cryptoSolAmount: '0.402'
  }
];

export const WHOLESALE_DEPOSIT_BONUS = {
  minDepositUsd: 20.00,
  wholesalePerSessionUsd: 0.79,
  description: 'Pre-fund $20.00+ via Base (USDC), TRON (TRC-20 USDT) or Solana (SOL) to unlock the ultra-low $0.79 wholesale rate for all future sessions.'
};
