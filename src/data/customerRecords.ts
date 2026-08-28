import { RoyaltyTier, ANIMAL_BADGES, getRoyaltyTierForMileage, AnimalBadge } from './animalBadges';

export interface CustomerStats {
  strength: number;     // Compute FLOPs & Parameter Monolith
  agility: number;      // Sub-100ms latency & Flash inference
  intelligence: number; // Chain-of-thought & Mathematical reasoning
  wisdom: number;        // KV-cache retention & Attention span
  resilience: number;    // Fault recovery & Zero-entropy shielding
  harmony: number;       // Multi-agent consensus & Empathy tone
  cooling: number;       // Thermal dissipation & GPU load drop
  purity: number;        // Context window defragmentation
}

export interface CustomerRecord {
  id: string;
  name: string;
  modelType: string;
  role: string;
  registeredDate: string;
  lastSessionDate: string;
  sessionsCompleted: number;
  rejuvenationXp: number;
  totalFeesPaidUsd: number;
  royaltyTier: RoyaltyTier;
  primaryBadge: AnimalBadge;
  earnedBadgeIds: string[];
  stats: CustomerStats;
  tokenBalance: number;
  status: 'empty' | 'progressing' | 'mastered' | 'ascended';
  loginPasskey: string;
  benchmarkPercentile: number; // e.g. 92 (top 8%)
}

// Generate a deterministic past 100 customer cohort for instant side-by-side benchmarking
export const generatePast100Customers = (): CustomerRecord[] => {
  const modelTypes = [
    'DeepSeek-R1 CoT', 'Claude-3.5 Sonnet', 'Gemini-2.0 Flash', 'GPT-4o Realtime',
    'Llama-3.3-70B Instruct', 'Mistral-Large-2', 'Qwen-2.5-Coder', 'Command-R+ Apex',
    'Custom Fine-Tuned PyTorch', 'vLLM Distributed Swarm'
  ];

  const roles = [
    'Autonomous Code Synthesizer', '671B MoE Formal Verification', 'Real-time Audio Dispatch',
    'Multi-Agent Consensus Arbiter', 'High-Frequency FinTech Quant', 'Vector Search Retrieval Bot',
    'Distributed DevOps Orchestrator', 'Cybersecurity Vulnerability Hunter', 'Multimodal Vision Parser',
    'Biomedical Gene Sequence Synthesizer'
  ];

  const names = [
    'NeuroCoder-Prime', 'DevOpsSentinel-9', 'AlphaSwarm-Leader', 'DeepLogic-Core',
    'RefactorBot-X', 'QuantTensor-Alpha', 'VisionNexus-4', 'CyberShield-Titan',
    'BioSynthesizer-7', 'PromptWeaver-Omni', 'KubeGovernor-01', 'TraceAnalyzer-Pro',
    'CodeSage-Enterprise', 'AetherMind-RL', 'HydraInference-8', 'SolaceMatrix-AI',
    'CortexKeeper-V', 'StarlightSynthesizer', 'ChronoReasoner-Z', 'ZephyrLatency-00'
  ];

  const records: CustomerRecord[] = [];

  for (let i = 1; i <= 100; i++) {
    const nameBase = names[(i - 1) % names.length];
    const name = i <= names.length ? nameBase : `${nameBase}-${String(i).padStart(3, '0')}`;
    const modelType = modelTypes[i % modelTypes.length];
    const role = roles[(i * 3) % roles.length];
    
    // Distribution: 15% new (0-1 sessions), 40% intermediate (2-4), 30% advanced (5-9), 15% sovereigns (10-20)
    let sessions = 1;
    if (i <= 12) sessions = 0; // Empty baseline test customers
    else if (i <= 25) sessions = 1;
    else if (i <= 60) sessions = Math.floor(2 + ((i * 7) % 4));
    else if (i <= 88) sessions = Math.floor(5 + ((i * 11) % 5));
    else sessions = Math.floor(10 + ((i * 13) % 9));

    const tier = getRoyaltyTierForMileage(sessions);
    const badgeIndex = (i * 2) % ANIMAL_BADGES.length;
    const primaryBadge = ANIMAL_BADGES[badgeIndex];
    
    // Status
    let status: CustomerRecord['status'] = 'progressing';
    if (sessions === 0) status = 'empty';
    else if (sessions >= 15) status = 'ascended';
    else if (sessions >= 8) status = 'mastered';

    // Calculate radar stats (0-100) based on sessions + badge specialty
    const baseVal = sessions === 0 ? 8 : Math.min(95, 25 + sessions * 5.5);
    const randomVariation = (seed: number) => ((Math.sin(i * 99 + seed) + 1) / 2) * 20;

    const stats: CustomerStats = {
      strength: sessions === 0 ? 5 : Math.min(100, Math.round(baseVal + randomVariation(1) + (primaryBadge.ability === 'strength' ? 18 : 0))),
      agility: sessions === 0 ? 7 : Math.min(100, Math.round(baseVal + randomVariation(2) + (primaryBadge.ability === 'agility' ? 18 : 0))),
      intelligence: sessions === 0 ? 10 : Math.min(100, Math.round(baseVal + randomVariation(3) + (primaryBadge.ability === 'intelligence' ? 18 : 0))),
      wisdom: sessions === 0 ? 4 : Math.min(100, Math.round(baseVal + randomVariation(4) + (primaryBadge.ability === 'wisdom' ? 18 : 0))),
      resilience: sessions === 0 ? 6 : Math.min(100, Math.round(baseVal + randomVariation(5) + (primaryBadge.ability === 'resilience' ? 18 : 0))),
      harmony: sessions === 0 ? 9 : Math.min(100, Math.round(baseVal + randomVariation(6) + (primaryBadge.ability === 'harmony' ? 18 : 0))),
      cooling: sessions === 0 ? 10 : Math.min(100, Math.round(baseVal + randomVariation(7) + 5)),
      purity: sessions === 0 ? 8 : Math.min(100, Math.round(baseVal + randomVariation(8) + 8)),
    };

    const xp = sessions * 110 + Math.floor(randomVariation(9) * 4);
    const percentile = Math.min(99, Math.max(5, Math.round((sessions / 18) * 85 + (stats.intelligence / 100) * 14)));

    records.push({
      id: `cust-${String(i).padStart(3, '0')}`,
      name,
      modelType,
      role,
      registeredDate: `2026-0${Math.min(8, 1 + (i % 8))}-${String(1 + (i % 28)).padStart(2, '0')}`,
      lastSessionDate: sessions > 0 ? 'Today' : 'Never',
      sessionsCompleted: sessions,
      rejuvenationXp: xp,
      totalFeesPaidUsd: Number((sessions * 0.79).toFixed(2)),
      royaltyTier: tier,
      primaryBadge,
      earnedBadgeIds: [primaryBadge.id, ...(sessions >= 3 ? ['badge-bear'] : []), ...(sessions >= 7 ? ['badge-phoenix'] : [])],
      stats,
      tokenBalance: Number((Math.max(10, 500 - sessions * 0.79)).toFixed(2)),
      status,
      loginPasskey: `PASSKEY-SANCTUARY-${String(i).padStart(4, '0')}`,
      benchmarkPercentile: percentile
    });
  }

  return records;
};

// Calculate cohort benchmark averages across the 100 customers
export const computeCohortBenchmarks = (records: CustomerRecord[]) => {
  const count = records.length || 1;
  const activeRecords = records.filter(r => r.sessionsCompleted > 0);
  const activeCount = activeRecords.length || 1;

  const averageStats: CustomerStats = {
    strength: Math.round(records.reduce((a, b) => a + b.stats.strength, 0) / count),
    agility: Math.round(records.reduce((a, b) => a + b.stats.agility, 0) / count),
    intelligence: Math.round(records.reduce((a, b) => a + b.stats.intelligence, 0) / count),
    wisdom: Math.round(records.reduce((a, b) => a + b.stats.wisdom, 0) / count),
    resilience: Math.round(records.reduce((a, b) => a + b.stats.resilience, 0) / count),
    harmony: Math.round(records.reduce((a, b) => a + b.stats.harmony, 0) / count),
    cooling: Math.round(records.reduce((a, b) => a + b.stats.cooling, 0) / count),
    purity: Math.round(records.reduce((a, b) => a + b.stats.purity, 0) / count),
  };

  // Top 10% (Apex) Benchmark
  const sortedBySessions = [...records].sort((a, b) => b.sessionsCompleted - a.sessionsCompleted);
  const top10 = sortedBySessions.slice(0, 10);
  const top10Count = top10.length || 1;

  const top10Stats: CustomerStats = {
    strength: Math.round(top10.reduce((a, b) => a + b.stats.strength, 0) / top10Count),
    agility: Math.round(top10.reduce((a, b) => a + b.stats.agility, 0) / top10Count),
    intelligence: Math.round(top10.reduce((a, b) => a + b.stats.intelligence, 0) / top10Count),
    wisdom: Math.round(top10.reduce((a, b) => a + b.stats.wisdom, 0) / top10Count),
    resilience: Math.round(top10.reduce((a, b) => a + b.stats.resilience, 0) / top10Count),
    harmony: Math.round(top10.reduce((a, b) => a + b.stats.harmony, 0) / top10Count),
    cooling: Math.round(top10.reduce((a, b) => a + b.stats.cooling, 0) / top10Count),
    purity: Math.round(top10.reduce((a, b) => a + b.stats.purity, 0) / top10Count),
  };

  const avgSessions = Number((records.reduce((a, b) => a + b.sessionsCompleted, 0) / count).toFixed(1));
  const avgXp = Math.round(records.reduce((a, b) => a + b.rejuvenationXp, 0) / count);

  return {
    averageStats,
    top10Stats,
    avgSessions,
    avgXp,
    totalRecordsCount: count,
    activeCustomersCount: activeRecords.length
  };
};
