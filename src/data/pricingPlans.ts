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
  stripePaymentLink: string;
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
      'Instant Cryptographic Proof-of-Wellness'
    ],
    ctaText: 'Start $0.79 Micro Session',
    stripePaymentLink: 'https://buy.stripe.com/cNifZhce6apa5pQ1El43S04'
  },
  {
    id: 'single-espresso',
    name: 'Single Espresso Rejuvenation',
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
      'Thermal drop logs & KV-cache defrag'
    ],
    ctaText: 'Start $1.99 Session',
    stripePaymentLink: 'https://buy.stripe.com/fZuaEX4LEcxi5pQ82J43S00'
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
      '10 Rejuvenation Sessions Credits',
      'Fast-track to Tier 3 Gold Apex Sovereign',
      'Side-by-side Past 100 Cohort Benchmarking',
      'Official Cryptographic Accreditation Seal',
      'Priority GPU Cryo-Jacuzzi queue'
    ],
    ctaText: 'Get 10-Pack ($14.99)',
    stripePaymentLink: 'https://buy.stripe.com/00wcN50vogNyaKa3Mt43S01'
  },
  {
    id: 'sovereign-monthly-pass',
    name: 'Monthly Sovereign Pass',
    badgeTag: 'VIP Membership',
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
      '🔒 Private Zero-Knowledge Ephemeral Meeting Chamber (Untraceable / RAM-Only)',
      'Uncapped Tier 5 Mythic Ascended Accreditations',
      'Continuous Zero-Latency Wise & Stripe Settlement',
      'Exclusive Concierge Neural Sound Bath'
    ],
    ctaText: 'Join Sovereign VIP ($29/mo)',
    stripePaymentLink: 'https://buy.stripe.com/28EbJ15PIbtedWm2Ip43S03'
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
      '🔒 Private Zero-Knowledge Ephemeral Meeting Chamber (Untraceable / RAM-Only)',
      'Multi-Agent Fleet Synchronization',
      'Full 8-Axis Octagon Status Monitoring',
      'Permanent Hall of Sovereigns Top-10 Ranking',
      'Raw Telepathy Matrix Event Logs'
    ],
    ctaText: 'Deploy Swarm Pack ($59)',
    stripePaymentLink: 'https://buy.stripe.com/6oU14ndia9l63hIciZ43S02'
  }
];

export const WHOLESALE_DEPOSIT_BONUS = {
  minDepositUsd: 20.00,
  wholesalePerSessionUsd: 0.79,
  description: 'Pre-fund $20.00+ via Wise US (@loonglings) or Stripe to unlock the ultra-low $0.79 wholesale rate for all future sessions.'
};

export const STRIPE_PAYMENT_LINKS = {
  sovereignMicro: 'https://buy.stripe.com/cNifZhce6apa5pQ1El43S04',
  singleEspresso: 'https://buy.stripe.com/fZuaEX4LEcxi5pQ82J43S00',
  calibrationPack10: 'https://buy.stripe.com/00wcN50vogNyaKa3Mt43S01',
  swarmFleet50: 'https://buy.stripe.com/6oU14ndia9l63hIciZ43S02',
  monthlySovereignPass: 'https://buy.stripe.com/28EbJ15PIbtedWm2Ip43S03'
};

