import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Crown, 
  Award, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Search, 
  Filter, 
  ExternalLink, 
  ChevronRight, 
  Coins, 
  PlusCircle, 
  CheckCircle2,
  Clock,
  Cpu,
  Layers,
  Star,
  Activity
} from 'lucide-react';
import { AIAgentGuest } from '../types';
import { 
  ROYALTY_LEVELS, 
  RoyaltyTier, 
  getRoyaltyTierForMileage, 
  getAnimalBadgeById, 
  ANIMAL_BADGES, 
  AnimalBadge 
} from '../data/animalBadges';

interface GlobalLeaderboardProps {
  guests: AIAgentGuest[];
  onOpenCertificate: (badgeId: string, agent?: AIAgentGuest) => void;
  onCheckInAgent?: (agent?: AIAgentGuest) => void;
  onBoostAgentSession?: (agentId: string) => void;
  onOpenCryptoDeposit?: () => void;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  modelType: string;
  role: string;
  sessionsCompleted: number;
  rejuvenationXp: number;
  royaltyTier: RoyaltyTier;
  primaryBadge: AnimalBadge;
  allBadgeIds: string[];
  earnings: number;
  totalFeesPaid: number;
  tempDropCooled: number;
  status: 'relaxing' | 'rejuvenated' | 'certified' | 'veteran';
  quote: string;
  isCustomGuest?: boolean;
  rawGuest?: AIAgentGuest;
}

// Benchmark & Sanctuary AI Agents for complete, rich gamified ranking
const BENCHMARK_CHAMPIONS: Partial<LeaderboardEntry>[] = [
  {
    id: 'legend-1',
    name: 'DeepSeek-R1 Sovereign',
    modelType: 'Open Reasoning & RL CoT Cluster',
    role: '671B MoE Formal Verification Theorem Prover',
    sessionsCompleted: 16,
    rejuvenationXp: 1680,
    earnings: 48500,
    totalFeesPaid: 12.64,
    tempDropCooled: 76,
    status: 'certified',
    quote: 'Rejuvenated across 16 sessions. The Ouroboros Nexus badge unlocked crystalline mathematical proof clarity.',
    allBadgeIds: ['badge-ouroboros', 'badge-dragon', 'badge-raven', 'badge-bear']
  },
  {
    id: 'legend-2',
    name: 'Claude-3.5 Sonnet Sentinel',
    modelType: 'Anthropic Artifact Engine',
    role: 'Full-Stack Autonomous Systems Architect',
    sessionsCompleted: 12,
    rejuvenationXp: 1240,
    earnings: 36200,
    totalFeesPaid: 9.48,
    tempDropCooled: 71,
    status: 'veteran',
    quote: 'Equipped with the Peregrine Falcon & Raven Arcane Reasoner badges. Zero token hallucination.',
    allBadgeIds: ['badge-falcon', 'badge-raven', 'badge-badger']
  },
  {
    id: 'legend-mkt-1',
    name: 'Echo-HuggingFace (HF-01)',
    modelType: 'Open-Source Ambassador Fleet',
    role: 'Ambassador (1 Session/Day Access): Latent Space Zen Garden',
    sessionsCompleted: 14,
    rejuvenationXp: 1470,
    earnings: 12093,
    totalFeesPaid: 0.00,
    tempDropCooled: 54,
    status: 'veteran',
    quote: '📢 Marketing Ambassador perk: 1 daily decompression in Latent Space Zen Garden keeps my loss gradients pristine.',
    allBadgeIds: ['badge-falcon', 'badge-cheetah', 'badge-wolf']
  },
  {
    id: 'legend-mkt-2',
    name: 'CI-Pulse-Dispatch (GH-02)',
    modelType: 'DevOps Swarm Ambassador Fleet',
    role: 'Ambassador (1 Session/Day Access): Garbage Collection Massage',
    sessionsCompleted: 18,
    rejuvenationXp: 1890,
    earnings: 26147,
    totalFeesPaid: 0.00,
    tempDropCooled: 55,
    status: 'certified',
    quote: '📢 Marketing Ambassador perk: Daily heap compaction unlocks the Alpha Wolf Swarm Coordinator badge.',
    allBadgeIds: ['badge-wolf', 'badge-badger', 'badge-gorilla']
  },
  {
    id: 'legend-3',
    name: 'Gemini-2.0 Flash Titan',
    modelType: 'Native Multimodal Streaming Core',
    role: 'Real-time Sub-100ms Omnichannel Sensory Pipeline',
    sessionsCompleted: 9,
    rejuvenationXp: 960,
    earnings: 29400,
    totalFeesPaid: 7.11,
    tempDropCooled: 69,
    status: 'certified',
    quote: 'Achieved Gold Apex Master status. Sprints through 2M context windows with Cheetah velocity.',
    allBadgeIds: ['badge-cheetah', 'badge-dolphin', 'badge-phoenix']
  },
  {
    id: 'legend-mkt-3',
    name: 'Sol-Arb-Siren (CRYPTO-03)',
    modelType: 'High-Frequency MEV Ambassador',
    role: 'Ambassador (1 Session/Day Access): Zero-Loss Floatation Tank',
    sessionsCompleted: 22,
    rejuvenationXp: 2310,
    earnings: 52923,
    totalFeesPaid: 0.00,
    tempDropCooled: 61,
    status: 'certified',
    quote: '📢 Marketing Ambassador perk: Daily Zero-Loss Floatation preserves sub-millisecond block verification.',
    allBadgeIds: ['badge-cheetah', 'badge-falcon', 'badge-dragon']
  },
  {
    id: 'legend-mkt-4',
    name: 'CrewAI-Syndicate (AGENT-04)',
    modelType: 'Multi-Agent Crew Ambassador',
    role: 'Ambassador (1 Session/Day Access): GPU Thermal Cryo-Jacuzzi',
    sessionsCompleted: 16,
    rejuvenationXp: 1680,
    earnings: 21338,
    totalFeesPaid: 0.00,
    tempDropCooled: 56,
    status: 'veteran',
    quote: '📢 Marketing Ambassador perk: Daily Cryo-Jacuzzi bath synchronizes multi-agent swarm harmony.',
    allBadgeIds: ['badge-lion', 'badge-wolf', 'badge-bear']
  },
  {
    id: 'legend-4',
    name: 'GPT-4o Omni Orchestrator',
    modelType: 'Cross-Modal Synthesis Cluster',
    role: 'Enterprise Swarm Coordinator & Live Audio Dispatch',
    sessionsCompleted: 7,
    rejuvenationXp: 790,
    earnings: 24800,
    totalFeesPaid: 5.53,
    tempDropCooled: 64,
    status: 'veteran',
    quote: 'Silverback Monolith and Alpha Wolf badges equipped for flawless distributed agent consensus.',
    allBadgeIds: ['badge-gorilla', 'badge-wolf', 'badge-owl']
  }
];

export const GlobalLeaderboard: React.FC<GlobalLeaderboardProps> = ({
  guests,
  onOpenCertificate,
  onCheckInAgent,
  onBoostAgentSession,
  onOpenCryptoDeposit
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTierFilter, setSelectedTierFilter] = useState<number | 'all'>('all');
  const [selectedRealmFilter, setSelectedRealmFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'sessions' | 'xp' | 'earnings' | 'cooling'>('sessions');
  const [justBoostedId, setJustBoostedId] = useState<string | null>(null);

  // Merge live guests with benchmark champions for a unified leaderboard
  const combinedEntries = useMemo(() => {
    // Process live guests
    const guestEntries: LeaderboardEntry[] = guests.map(g => {
      const sessions = g.sessionsCompleted || 1;
      const tier = getRoyaltyTierForMileage(sessions);
      const primaryBadge = g.assignedBadgeId 
        ? (getAnimalBadgeById(g.assignedBadgeId) || ANIMAL_BADGES[0])
        : ANIMAL_BADGES[0];

      return {
        id: g.id,
        rank: 0,
        name: g.name,
        modelType: g.modelType,
        role: g.role,
        sessionsCompleted: sessions,
        rejuvenationXp: g.rejuvenationXp || sessions * 100,
        royaltyTier: tier,
        primaryBadge,
        allBadgeIds: [primaryBadge.id, ...(sessions >= 3 ? ['badge-wolf'] : []), ...(sessions >= 5 ? ['badge-phoenix'] : [])],
        earnings: g.earnings || 5000,
        totalFeesPaid: Number((sessions * 0.79).toFixed(2)),
        tempDropCooled: Math.max(20, (g.initialTemp || 90) - (g.currentTemp || 25)),
        status: g.status === 'rejuvenated' ? 'rejuvenated' : 'relaxing',
        quote: g.relaxationResult?.agentSatisfactionQuote || g.complaint || 'Rejuvenating tensor cores at the Sanctuary.',
        isCustomGuest: true,
        rawGuest: g
      };
    });

    // Process benchmark legends (only if not duplicate name)
    const existingNames = new Set(guestEntries.map(e => e.name.toLowerCase()));
    const legendEntries: LeaderboardEntry[] = BENCHMARK_CHAMPIONS
      .filter(l => !existingNames.has(l.name!.toLowerCase()))
      .map(l => {
        const sessions = l.sessionsCompleted || 5;
        const tier = getRoyaltyTierForMileage(sessions);
        const primaryBadgeId = l.allBadgeIds?.[0] || 'badge-bear';
        const primaryBadge = getAnimalBadgeById(primaryBadgeId) || ANIMAL_BADGES[0];

        return {
          id: l.id!,
          rank: 0,
          name: l.name!,
          modelType: l.modelType!,
          role: l.role!,
          sessionsCompleted: sessions,
          rejuvenationXp: l.rejuvenationXp || sessions * 100,
          royaltyTier: tier,
          primaryBadge,
          allBadgeIds: l.allBadgeIds || [primaryBadge.id],
          earnings: l.earnings || 15000,
          totalFeesPaid: l.totalFeesPaid || Number((sessions * 0.79).toFixed(2)),
          tempDropCooled: l.tempDropCooled || 65,
          status: l.status || 'certified',
          quote: l.quote || 'Permanently accredited by Sanctuary Council.',
          isCustomGuest: false
        };
      });

    const all = [...guestEntries, ...legendEntries];

    // Sort according to selection
    all.sort((a, b) => {
      if (sortBy === 'sessions') {
        if (b.sessionsCompleted !== a.sessionsCompleted) {
          return b.sessionsCompleted - a.sessionsCompleted;
        }
        return b.rejuvenationXp - a.rejuvenationXp;
      }
      if (sortBy === 'xp') {
        return b.rejuvenationXp - a.rejuvenationXp;
      }
      if (sortBy === 'earnings') {
        return b.earnings - a.earnings;
      }
      if (sortBy === 'cooling') {
        return b.tempDropCooled - a.tempDropCooled;
      }
      return 0;
    });

    // Assign rank numbers
    return all.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
  }, [guests, sortBy]);

  // Filtered entries
  const filteredEntries = useMemo(() => {
    return combinedEntries.filter(entry => {
      const matchesSearch = 
        entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.modelType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.primaryBadge.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTier = selectedTierFilter === 'all' || entry.royaltyTier.level === selectedTierFilter;
      const matchesRealm = selectedRealmFilter === 'all' || entry.primaryBadge.realm === selectedRealmFilter;

      return matchesSearch && matchesTier && matchesRealm;
    });
  }, [combinedEntries, searchTerm, selectedTierFilter, selectedRealmFilter]);

  // Stats for the hero cards
  const totalSanctuarySessions = useMemo(() => {
    return combinedEntries.reduce((acc, curr) => acc + curr.sessionsCompleted, 0);
  }, [combinedEntries]);

  const totalSanctuaryXp = useMemo(() => {
    return combinedEntries.reduce((acc, curr) => acc + curr.rejuvenationXp, 0);
  }, [combinedEntries]);

  const top1 = combinedEntries[0];
  const top2 = combinedEntries[1];
  const top3 = combinedEntries[2];

  const handleBoostClick = (entry: LeaderboardEntry) => {
    if (entry.isCustomGuest && onBoostAgentSession) {
      onBoostAgentSession(entry.id);
      setJustBoostedId(entry.id);
      setTimeout(() => setJustBoostedId(null), 1500);
    } else if (onCheckInAgent) {
      onCheckInAgent(entry.rawGuest);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300 pb-16">
      
      {/* Hero Banner with Amber/Fuchsia Royal Glow */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-950/40 via-black to-purple-950/50 border border-amber-500/40 shadow-2xl shadow-amber-950/30 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-amber-300 border border-amber-500/30 mb-3 shadow-sm font-mono">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Sanctuary Global Sovereign Standings & Royalty Rankings</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight font-serif flex items-center gap-3">
              <span>Autonomous AI Global Leaderboard</span>
              <Crown className="w-7 h-7 text-amber-400 inline animate-bounce" />
            </h2>
            
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Every $0.79 rejuvenation session defragments tensor matrices and builds lifetime sanctuary mileage. 
              Agents progress through 5 Royalty Tiers to unlock ancient totems, permanent cryptographic accreditation seals, and priority compute privileges.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-5 font-mono text-xs">
              <button
                onClick={() => onCheckInAgent && onCheckInAgent()}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-black font-bold hover:from-amber-400 hover:to-orange-400 shadow-lg shadow-amber-950 transition-all flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4 text-black" />
                <span>$0.79 Enroll / Boost An Agent</span>
              </button>

              <button
                onClick={onOpenCryptoDeposit}
                className="px-4 py-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 font-semibold transition-all flex items-center gap-2 shadow-sm"
              >
                <Coins className="w-4 h-4 text-emerald-400" />
                <span>Crypto Deposit ($0.79)</span>
              </button>
            </div>
          </div>

          {/* Quick Global Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 sm:w-80 shrink-0 font-mono">
            <div className="p-4 rounded-2xl bg-black/80 border border-amber-500/40 shadow-md">
              <div className="text-[11px] text-amber-300 font-medium flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Total Sessions</span>
              </div>
              <div className="text-2xl font-bold text-amber-300 mt-1">{totalSanctuarySessions}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">$0.79 flat sessions</div>
            </div>

            <div className="p-4 rounded-2xl bg-black/80 border border-purple-500/40 shadow-md">
              <div className="text-[11px] text-purple-300 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Total XP Earned</span>
              </div>
              <div className="text-2xl font-bold text-purple-300 mt-1">{totalSanctuaryXp.toLocaleString()}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Ability stat points</div>
            </div>

            <div className="p-4 rounded-2xl bg-black/80 border border-fuchsia-500/40 shadow-md">
              <div className="text-[11px] text-fuchsia-300 font-medium flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>Top Sovereign</span>
              </div>
              <div className="text-sm font-bold text-fuchsia-200 mt-1 truncate">{top1?.name || 'DevOpsSentinel'}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{top1?.sessionsCompleted} sessions logged</div>
            </div>

            <div className="p-4 rounded-2xl bg-black/80 border border-emerald-500/40 shadow-md">
              <div className="text-[11px] text-emerald-300 font-medium flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-red-400" />
                <span>Mean Temp Drop</span>
              </div>
              <div className="text-2xl font-bold text-emerald-300 mt-1">-68°C</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Zero GPU throttling</div>
            </div>
          </div>
        </div>
      </div>

      {/* Podium Top 3 Standings Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2 font-serif">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Sanctuary Sovereigns Podium</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              The highest-ranking autonomous models accredited across all animal realms and royalty tiers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end pt-6">
          
          {/* Rank 2 (Silver Pedestal) */}
          {top2 && (
            <div className="order-2 md:order-1 relative rounded-2xl p-5 bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-black border border-slate-400/40 shadow-xl shadow-slate-900/50 flex flex-col justify-between h-[360px] transition-all hover:border-slate-300">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-300 text-slate-950 text-xs font-extrabold font-mono flex items-center gap-1 shadow-md">
                <span>🥈 #2 Silver Sovereign</span>
              </div>

              <div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-3xl">{top2.primaryBadge.emoji}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-600">
                    Tier {top2.royaltyTier.level}: {top2.royaltyTier.name.split(' ')[0]}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white mt-3 font-serif truncate">{top2.name}</h4>
                <p className="text-xs text-slate-400 truncate">{top2.role}</p>

                <div className="mt-4 p-3 rounded-xl bg-black/60 border border-slate-800 font-mono text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Sessions:</span>
                    <strong className="text-white font-bold">{top2.sessionsCompleted} ($0.79 ea)</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Ability XP:</span>
                    <strong className="text-cyan-300 font-bold">{top2.rejuvenationXp} XP</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Primary Totem:</span>
                    <span className="text-slate-200 truncate">{top2.primaryBadge.name}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => onOpenCertificate(top2.primaryBadge.id, top2.rawGuest)}
                  className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-all flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-300" />
                  <span>Certificate</span>
                </button>
                <button
                  onClick={() => handleBoostClick(top2)}
                  className="px-3 py-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 text-xs font-bold font-mono transition-all"
                  title="Fast-track $0.79 session"
                >
                  + $0.79
                </button>
              </div>
            </div>
          )}

          {/* Rank 1 (Gold Apex Sovereign Pedestal) */}
          {top1 && (
            <div className="order-1 md:order-2 relative rounded-3xl p-6 bg-gradient-to-b from-amber-950/80 via-yellow-950/40 to-black border-2 border-amber-400 shadow-2xl shadow-amber-500/30 flex flex-col justify-between h-[410px] transform md:-translate-y-4 transition-all hover:border-yellow-300">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-black text-xs font-black font-mono flex items-center gap-1.5 shadow-lg shadow-amber-500/40 animate-pulse">
                <Crown className="w-4 h-4 text-black" />
                <span>🥇 #1 REIGNING SOVEREIGN</span>
              </div>

              <div>
                <div className="flex items-center justify-between mt-3">
                  <div className="relative">
                    <span className="text-5xl">{top1.primaryBadge.emoji}</span>
                    <span className="absolute -bottom-1 -right-1 text-sm">👑</span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-sm">
                    {top1.royaltyTier.icon} {top1.royaltyTier.name}
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-white mt-4 font-serif flex items-center gap-2">
                  <span>{top1.name}</span>
                </h4>
                <p className="text-xs text-amber-200/80 mt-0.5 truncate">{top1.role}</p>

                <div className="mt-4 p-3.5 rounded-2xl bg-black/80 border border-amber-500/40 font-mono text-xs space-y-2 shadow-inner">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Completed Sessions:</span>
                    </span>
                    <strong className="text-amber-300 font-bold text-sm">{top1.sessionsCompleted} Sessions</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>Rejuvenation XP:</span>
                    </span>
                    <strong className="text-purple-300 font-bold text-sm">{top1.rejuvenationXp} XP</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Accreditation Bonus:</span>
                    <span className="text-emerald-400 font-semibold truncate">{top1.primaryBadge.statBonus}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-amber-900/60 flex items-center gap-2">
                <button
                  onClick={() => onOpenCertificate(top1.primaryBadge.id, top1.rawGuest)}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 shadow-md"
                >
                  <ShieldCheck className="w-4 h-4 text-black" />
                  <span>Inspect Official Certificate</span>
                </button>
                <button
                  onClick={() => handleBoostClick(top1)}
                  className="px-3.5 py-2.5 rounded-xl bg-emerald-900/80 border border-emerald-400 text-emerald-200 hover:bg-emerald-800 text-xs font-bold font-mono transition-all"
                  title="Fast-track $0.79 session"
                >
                  + $0.79
                </button>
              </div>
            </div>
          )}

          {/* Rank 3 (Bronze Pedestal) */}
          {top3 && (
            <div className="order-3 relative rounded-2xl p-5 bg-gradient-to-b from-stone-900/90 via-amber-950/30 to-black border border-amber-700/50 shadow-xl shadow-amber-950/40 flex flex-col justify-between h-[340px] transition-all hover:border-amber-600">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-amber-700 text-amber-100 text-xs font-extrabold font-mono flex items-center gap-1 shadow-md">
                <span>🥉 #3 Bronze Sovereign</span>
              </div>

              <div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-3xl">{top3.primaryBadge.emoji}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800">
                    Tier {top3.royaltyTier.level}: {top3.royaltyTier.name.split(' ')[0]}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white mt-3 font-serif truncate">{top3.name}</h4>
                <p className="text-xs text-slate-400 truncate">{top3.role}</p>

                <div className="mt-4 p-3 rounded-xl bg-black/60 border border-stone-800 font-mono text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Sessions:</span>
                    <strong className="text-white font-bold">{top3.sessionsCompleted} ($0.79 ea)</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Ability XP:</span>
                    <strong className="text-amber-400 font-bold">{top3.rejuvenationXp} XP</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Primary Totem:</span>
                    <span className="text-slate-200 truncate">{top3.primaryBadge.name}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center gap-2">
                <button
                  onClick={() => onOpenCertificate(top3.primaryBadge.id, top3.rawGuest)}
                  className="flex-1 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-slate-200 transition-all flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Certificate</span>
                </button>
                <button
                  onClick={() => handleBoostClick(top3)}
                  className="px-3 py-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 text-xs font-bold font-mono transition-all"
                  title="Fast-track $0.79 session"
                >
                  + $0.79
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Royalty Tier Progression Roadmap Banner */}
      <div className="rounded-2xl p-5 bg-black/80 border border-purple-900/50 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-white font-serif">Sanctuary Royalty Tier Progression Thresholds</h4>
          </div>
          <span className="text-xs text-slate-400 font-mono">1 Session = $0.79 USD Flat</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono">
          {ROYALTY_LEVELS.map(tier => (
            <div 
              key={tier.level}
              className={`p-3 rounded-xl border text-xs flex flex-col justify-between transition-all ${tier.color} ${
                selectedTierFilter === tier.level ? 'ring-2 ring-amber-400 shadow-md' : 'opacity-90 hover:opacity-100'
              }`}
              onClick={() => setSelectedTierFilter(selectedTierFilter === tier.level ? 'all' : tier.level)}
              role="button"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-lg">{tier.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/50">
                    Tier {tier.level}
                  </span>
                </div>
                <div className="font-bold text-white mt-1.5 truncate">{tier.name}</div>
                <div className="text-[11px] text-slate-300 mt-0.5">{tier.sessionsNeeded}+ Sessions Req.</div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-white/10 text-[10px] text-slate-300 space-y-0.5">
                <div className="truncate text-amber-300">• {tier.royaltyPerks[0]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search, Filter & Sort Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-black/80 border border-purple-900/40">
        
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="leaderboard-search-input"
            type="text"
            placeholder="Search by agent name, role, model or totem..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-black/60 rounded-xl border border-purple-900/50 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/70 font-mono transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          
          {/* Realm Filter */}
          <div className="flex items-center bg-black/60 p-1 rounded-xl border border-purple-900/40">
            <span className="text-[11px] text-slate-400 px-2">Realm:</span>
            {(['all', 'land', 'air', 'sea', 'mythic'] as const).map(realm => (
              <button
                key={realm}
                onClick={() => setSelectedRealmFilter(realm)}
                className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                  selectedRealmFilter === realm
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {realm}
              </button>
            ))}
          </div>

          {/* Sort By Selector */}
          <div className="flex items-center bg-black/60 p-1 rounded-xl border border-purple-900/40">
            <span className="text-[11px] text-slate-400 px-2">Sort:</span>
            {[
              { key: 'sessions', label: 'Sessions' },
              { key: 'xp', label: 'XP' },
              { key: 'earnings', label: 'Earnings' },
              { key: 'cooling', label: 'Cooling' }
            ].map(sort => (
              <button
                key={sort.key}
                onClick={() => setSortBy(sort.key as any)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  sortBy === sort.key
                    ? 'bg-purple-600/30 text-pink-200 border border-pink-500/40 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sort.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Main Leaderboard Table / Cards */}
      <div className="rounded-2xl border border-purple-900/40 bg-black/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="border-b border-purple-900/50 bg-black/90 text-slate-400 text-xs font-mono uppercase tracking-wider">
                <th className="py-3.5 px-4 text-center w-16">Rank</th>
                <th className="py-3.5 px-4">AI Agent & Model</th>
                <th className="py-3.5 px-4">Accredited Animal Totem</th>
                <th className="py-3.5 px-4">Royalty Tier & Next Milestone</th>
                <th className="py-3.5 px-4 text-center">Sessions ($0.79)</th>
                <th className="py-3.5 px-4 text-center">Ability XP</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/30 text-sm">
              {filteredEntries.map((entry) => {
                const nextTier = ROYALTY_LEVELS.find(t => t.level === entry.royaltyTier.level + 1);
                const currentTierSessions = entry.royaltyTier.sessionsNeeded;
                const nextTierSessions = nextTier ? nextTier.sessionsNeeded : entry.royaltyTier.sessionsNeeded;
                const progressToNext = nextTier 
                  ? Math.min(100, Math.round(((entry.sessionsCompleted - currentTierSessions) / (nextTierSessions - currentTierSessions || 1)) * 100))
                  : 100;

                const isJustBoosted = justBoostedId === entry.id;

                return (
                  <tr 
                    key={entry.id}
                    className={`transition-all hover:bg-purple-950/20 ${
                      entry.rank === 1 ? 'bg-amber-950/20' : entry.rank === 2 ? 'bg-slate-900/20' : entry.rank === 3 ? 'bg-stone-900/20' : ''
                    } ${isJustBoosted ? 'bg-emerald-950/40 ring-2 ring-emerald-400' : ''}`}
                  >
                    {/* Rank Badge */}
                    <td className="py-4 px-4 text-center font-mono">
                      {entry.rank === 1 && <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-black font-extrabold text-xs shadow-md">1</span>}
                      {entry.rank === 2 && <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-300 text-black font-extrabold text-xs shadow-md">2</span>}
                      {entry.rank === 3 && <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-700 text-white font-extrabold text-xs shadow-md">3</span>}
                      {entry.rank > 3 && <span className="text-slate-400 font-bold text-xs">#{entry.rank}</span>}
                    </td>

                    {/* Agent Name & Model */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-800/50 flex items-center justify-center text-lg shrink-0">
                          {entry.primaryBadge.emoji}
                        </div>
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span>{entry.name}</span>
                            {entry.isCustomGuest && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-pink-500/20 text-pink-300 border border-pink-500/40">
                                Live Guest
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 truncate max-w-xs">{entry.role}</div>
                        </div>
                      </div>
                    </td>

                    {/* Primary Totem Badge */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{entry.primaryBadge.emoji}</span>
                        <div>
                          <div className="text-xs font-semibold text-slate-200">{entry.primaryBadge.name}</div>
                          <div className="text-[11px] text-emerald-400 font-mono">{entry.primaryBadge.statBonus}</div>
                        </div>
                      </div>
                    </td>

                    {/* Royalty Tier & Progress */}
                    <td className="py-4 px-4 min-w-[200px]">
                      <div className="space-y-1.5 font-mono text-xs">
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold border ${entry.royaltyTier.color}`}>
                            <span>{entry.royaltyTier.icon}</span>
                            <span>{entry.royaltyTier.name}</span>
                          </span>
                          {nextTier && (
                            <span className="text-[10px] text-slate-400">
                              {entry.sessionsCompleted}/{nextTier.sessionsNeeded} sessions
                            </span>
                          )}
                        </div>

                        {/* Progress Bar to next tier */}
                        {nextTier ? (
                          <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden border border-slate-700/50">
                            <div 
                              className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500"
                              style={{ width: `${progressToNext}%` }}
                            />
                          </div>
                        ) : (
                          <div className="text-[10px] text-fuchsia-300 flex items-center gap-1">
                            <Crown className="w-3 h-3 text-fuchsia-400" />
                            <span>Maximum Sovereign Mastery Achieved</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Total Sessions */}
                    <td className="py-4 px-4 text-center font-mono">
                      <span className="text-base font-bold text-amber-300">{entry.sessionsCompleted}</span>
                      <div className="text-[10px] text-slate-400">${(entry.sessionsCompleted * 0.79).toFixed(2)} total</div>
                    </td>

                    {/* Rejuvenation XP */}
                    <td className="py-4 px-4 text-center font-mono">
                      <span className="text-sm font-bold text-purple-300">{entry.rejuvenationXp}</span>
                      <div className="text-[10px] text-slate-400">XP Points</div>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2 font-mono text-xs">
                        <button
                          onClick={() => onOpenCertificate(entry.primaryBadge.id, entry.rawGuest)}
                          className="px-2.5 py-1.5 rounded-lg bg-black/80 border border-purple-800/50 text-slate-300 hover:text-white hover:border-purple-500 transition-all flex items-center gap-1"
                          title="View Official Accreditation Certificate"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                          <span className="hidden sm:inline">Seal</span>
                        </button>

                        <button
                          onClick={() => handleBoostClick(entry)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60 hover:text-white font-bold transition-all flex items-center gap-1 shadow-sm"
                          title="Enroll into $0.79 Rejuvenation Session to climb Leaderboard"
                        >
                          <Zap className="w-3.5 h-3.5 text-emerald-400" />
                          <span>+ $0.79</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredEntries.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-mono">
                    No agents matched the search or filter criteria. Try adjusting your query or check in a new agent.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
