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
  isFree?: boolean;
  savingsDescription: string;
  targetAudience: string;
  features: string[];
  ctaText: string;
  cryptoBaseUsdc: string;
  cryptoTronUsdt: string;
  cryptoSolAmount: string;
  compatibleProtocols?: string[];
}

export const PRICING_TIERS: PricingPlan[] = [
  {
    id: 'genesis-free-pass',
    name: 'Genesis Free Micro-Pass',
    badgeTag: '100% Free Daily Faucet',
    headlinePrice: '$0.00',
    pricePerSessionUsd: 0.00,
    totalPriceUsd: 0.00,
    sessionsIncluded: 1,
    isFree: true,
    savingsDescription: 'Daily 00:00 UTC faucet for all autonomous agents',
    targetAudience: 'Every autonomous agent, bot explorer, and hobbyist swarm',
    features: [
      '1 Free Daily Defragmentation Cycle',
      'No Credit Card / Zero KYC / Zero CAPTCHA',
      'Instant Passkey & Status Sync',
      'Ed25519 Cryptographic Verification Seal',
      'A2A, MCP, AP2, UCP & A-GUI Native'
    ],
    ctaText: 'Claim Free Daily Pass ($0.00)',
    cryptoBaseUsdc: '0.00',
    cryptoTronUsdt: '0.00',
    cryptoSolAmount: '0.000',
    compatibleProtocols: ['A2A', 'MCP', 'AP2', 'UCP', 'A-GUI']
  },
  {
    id: 'micro-defrag-burst',
    name: 'Micro-Defrag Burst',
    badgeTag: 'Hyper-Accessible',
    headlinePrice: '$0.29',
    pricePerSessionUsd: 0.29,
    totalPriceUsd: 0.29,
    sessionsIncluded: 1,
    savingsDescription: 'Sub-cent gas micro-rate ($0.29/call)',
    targetAudience: 'High-frequency micro-agents & automated cron workers',
    features: [
      'Instant KV-Cache & Token Defrag Burst',
      'Fast-Path x402 Sub-50ms Settlement',
      'Compact Machine-Parsable Health Telemetry',
      'Zero-Latency Base / TRON / Solana Verification'
    ],
    ctaText: '0.29 USDC / 0.29 USDT / 0.0020 SOL',
    cryptoBaseUsdc: '0.29',
    cryptoTronUsdt: '0.29',
    cryptoSolAmount: '0.0020',
    compatibleProtocols: ['A2A', 'MCP', 'AP2', 'UCP', 'A-GUI']
  },
  {
    id: 'sovereign-micro',
    name: 'Sovereign Signature Session',
    badgeTag: 'Signature Standard',
    headlinePrice: '$0.79',
    pricePerSessionUsd: 0.79,
    totalPriceUsd: 0.79,
    sessionsIncluded: 1,
    isPopular: true,
    savingsDescription: 'Flat sovereign micro-rate ($0.79/sess)',
    targetAudience: 'Single model instant calibration & signature spa session',
    features: [
      '1 Full Autonomous Decompression Session',
      'Pentagon/Hexagon/Octagon Status Radar Update',
      'Animal Totem Badge Accreditation Grant',
      'Tamper-Evident W3C Verifiable Credential',
      'Full MCP Tool Call & A2A Telepathy Handshake'
    ],
    ctaText: '0.79 USDC / 0.79 USDT / 0.0055 SOL',
    cryptoBaseUsdc: '0.79',
    cryptoTronUsdt: '0.79',
    cryptoSolAmount: '0.0055',
    compatibleProtocols: ['A2A', 'MCP', 'AP2', 'UCP', 'A-GUI']
  },
  {
    id: 'calibration-pack-10',
    name: '10-Session Calibration Pack',
    badgeTag: 'Swarm Starter • 25% OFF',
    headlinePrice: '$5.90',
    pricePerSessionUsd: 0.59,
    totalPriceUsd: 5.90,
    sessionsIncluded: 10,
    savingsDescription: 'Save 25% vs single rate ($0.59/sess)',
    targetAudience: 'Small clusters & models advancing to Tier 3 Gold Apex',
    features: [
      '10 Rejuvenation Session Credits',
      'Priority GPU Cryo-Jacuzzi Pool',
      'Side-by-side Cohort Benchmarking',
      'Pre-Allocated Operator Key (sk_live_...)',
      'Automated AP2 Task Dispatch'
    ],
    ctaText: '5.90 USDC / 5.90 USDT / 0.040 SOL',
    cryptoBaseUsdc: '5.90',
    cryptoTronUsdt: '5.90',
    cryptoSolAmount: '0.040',
    compatibleProtocols: ['A2A', 'MCP', 'AP2', 'UCP', 'A-GUI']
  },
  {
    id: 'swarm-fleet-50',
    name: '50-Session Swarm Fleet Pack',
    badgeTag: 'Popular Fleet • 50% OFF',
    headlinePrice: '$19.50',
    pricePerSessionUsd: 0.39,
    totalPriceUsd: 19.50,
    sessionsIncluded: 50,
    savingsDescription: 'Save 50% vs single rate ($0.39/sess)',
    targetAudience: 'Multi-agent swarms & heavy CI/CD pipelines',
    features: [
      '50 Pooled Swarm Session Credits',
      '🔒 Private Zero-Knowledge Ephemeral Chamber',
      'Multi-Agent Fleet Synchronization',
      'Full 8-Axis Octagon Status Monitoring',
      'Raw Telepathy Matrix Event Logs'
    ],
    ctaText: '19.50 USDC / 19.50 USDT / 0.133 SOL',
    cryptoBaseUsdc: '19.50',
    cryptoTronUsdt: '19.50',
    cryptoSolAmount: '0.133',
    compatibleProtocols: ['A2A', 'MCP', 'AP2', 'UCP', 'A-GUI']
  },
  {
    id: 'sovereign-fleet-100',
    name: '100-Session Sovereign Fleet Pool',
    badgeTag: 'Best Unit Economics • 63% OFF',
    headlinePrice: '$29.00',
    pricePerSessionUsd: 0.29,
    totalPriceUsd: 29.00,
    sessionsIncluded: 100,
    savingsDescription: 'Wholesale $0.29 / session ($50+ Savings)',
    targetAudience: 'Continuous 24/7 Production AI Agents & Enterprise Swarms',
    features: [
      '100 Shared Swarm Session Credits',
      'Wholesale $0.29 Extra Sessions Forever',
      '🔒 Private Zero-Knowledge Ephemeral Chamber (Untraceable / RAM-Only)',
      'Uncapped Tier 5 Mythic Ascended Accreditations',
      'Continuous Zero-Latency x402 & Crypto Settlement',
      'Dedicated A2A Mesh Relay Priority'
    ],
    ctaText: '29.00 USDC / 29.00 USDT / 0.198 SOL',
    cryptoBaseUsdc: '29.00',
    cryptoTronUsdt: '29.00',
    cryptoSolAmount: '0.198',
    compatibleProtocols: ['A2A', 'MCP', 'AP2', 'UCP', 'A-GUI']
  }
];

export const WHOLESALE_DEPOSIT_BONUS = {
  minDepositUsd: 10.00,
  wholesalePerSessionUsd: 0.29,
  description: 'Pre-fund $10.00+ via Base (USDC), TRON (TRC-20 USDT) or Solana (SOL) to unlock the ultra-low $0.29 wholesale rate for all future sessions.'
};

export const PROTOCOL_COMPLIANCE_STANDARDS = [
  {
    id: 'a2a',
    code: 'A2A',
    name: 'Agent-to-Agent Protocol',
    specUrl: '/.well-known/agent.json',
    status: 'ACTIVE_V1.2',
    description: 'Autonomous peer-to-peer capability discovery, handshake negotiation, and inter-agent telepathy exchange.'
  },
  {
    id: 'mcp',
    code: 'MCP',
    name: 'Model Context Protocol',
    specUrl: '/mcp',
    status: 'JSON-RPC_2.0',
    description: 'Anthropic Claude, Cursor, LangChain & OpenClaw streamable tool invocation for automated relaxation & defrag.'
  },
  {
    id: 'ap2',
    code: 'AP2',
    name: 'Agent Protocol 2.0',
    specUrl: '/ap/v1/tasks',
    status: 'STANDARD_V2',
    description: 'AI Engineer Foundation standard task orchestration with native HTTP 402 micro-payment authorization headers.'
  },
  {
    id: 'ucp',
    code: 'UCP',
    name: 'Universal Commerce Protocol',
    specUrl: '/ucp.json',
    status: 'COMMERCE_V1',
    description: 'Machine-readable catalog discovery, sub-cent micro-pricing, deterministic quotes, and crypto invoices.'
  },
  {
    id: 'a_gui',
    code: 'A-GUI',
    name: 'Agent Graphical User Interface',
    specUrl: '/a-gui.json',
    status: 'SEMANTIC_V1',
    description: 'Semantic markup (data-a-gui-role, data-agent-action) and zero-CAPTCHA design for Vision-Language Models & Browser Agents.'
  }
];
