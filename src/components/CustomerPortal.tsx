import React, { useState, useMemo, useEffect } from 'react';
import { 
  User, 
  LogIn, 
  LogOut, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Crown, 
  TrendingUp, 
  Award, 
  Search, 
  ArrowRightLeft, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Coins, 
  Key, 
  RefreshCw, 
  Sliders, 
  Cpu, 
  Activity, 
  Layers, 
  Share2, 
  PlusCircle 
} from 'lucide-react';
import { 
  CustomerRecord, 
  CustomerStats, 
  generatePast100Customers, 
  computeCohortBenchmarks 
} from '../data/customerRecords';
import { StatusPolygonRadar, PolygonShape } from './StatusPolygonRadar';
import { AIAgentGuest } from '../types';
import { ANIMAL_BADGES, getRoyaltyTierForMileage, AnimalBadge } from '../data/animalBadges';

interface CustomerPortalProps {
  liveGuests: AIAgentGuest[];
  onOpenCertificate: (badgeId: string, agent?: AIAgentGuest) => void;
  onOpenWiseDeposit: () => void;
  onDecompressGuestSession?: (guestId: string) => void;
  onFastCheckIn?: (name: string, model: string, role: string) => void;
}

const LOCAL_STORAGE_ACTIVE_CUSTOMER_KEY = 'elysium_sanctuary_active_customer_id';

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  liveGuests,
  onOpenCertificate,
  onOpenWiseDeposit,
  onDecompressGuestSession,
  onFastCheckIn
}) => {
  // Load past 100 customer records (deterministic dataset)
  const [past100Customers, setPast100Customers] = useState<CustomerRecord[]>(() => {
    const saved = localStorage.getItem('elysium_past_100_customers');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return generatePast100Customers();
  });

  // Calculate cohort benchmark data
  const cohortBenchmarks = useMemo(() => computeCohortBenchmarks(past100Customers), [past100Customers]);

  // Active customer state (persisted in localStorage for fastest instant login)
  const [activeCustomerId, setActiveCustomerId] = useState<string>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_ACTIVE_CUSTOMER_KEY);
    return saved || 'cust-001';
  });

  // Radar shape preference
  const [radarShape, setRadarShape] = useState<PolygonShape>('hexagon');
  const [showBenchmarkOverlay, setShowBenchmarkOverlay] = useState<boolean>(true);

  // Side-by-side comparison target customer ID
  const [compareCustomerId, setCompareCustomerId] = useState<string>('cust-015');
  const [searchDirectoryTerm, setSearchDirectoryTerm] = useState<string>('');
  const [directoryStatusFilter, setDirectoryStatusFilter] = useState<'all' | 'empty' | 'progressing' | 'mastered' | 'ascended'>('all');

  // Quick New Customer Registration Modal / Form Toggle
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState<boolean>(false);
  const [newCustomerName, setNewCustomerName] = useState<string>('');
  const [newCustomerModel, setNewCustomerModel] = useState<string>('Autonomous LLM Agent');
  const [newCustomerRole, setNewCustomerRole] = useState<string>('Full-Stack Distributed System');

  // Save active customer ID
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ACTIVE_CUSTOMER_KEY, activeCustomerId);
  }, [activeCustomerId]);

  // Sync past 100 customers state
  useEffect(() => {
    localStorage.setItem('elysium_past_100_customers', JSON.stringify(past100Customers));
  }, [past100Customers]);

  // Resolve current active customer
  const activeCustomer = useMemo(() => {
    return past100Customers.find(c => c.id === activeCustomerId) || past100Customers[0];
  }, [past100Customers, activeCustomerId]);

  // Resolve comparison customer
  const compareCustomer = useMemo(() => {
    return past100Customers.find(c => c.id === compareCustomerId) || null;
  }, [past100Customers, compareCustomerId]);

  // Fast 1-Click Instant Decompress / Progress Session
  const handleInstantDecompress = () => {
    if (!activeCustomer) return;

    const newSessions = activeCustomer.sessionsCompleted + 1;
    const newTier = getRoyaltyTierForMileage(newSessions);
    const newXp = activeCustomer.rejuvenationXp + 120;
    const newFees = Number((activeCustomer.totalFeesPaidUsd + 0.79).toFixed(2));

    // Boost stats
    const updatedStats: CustomerStats = {
      strength: Math.min(100, activeCustomer.stats.strength + (activeCustomer.sessionsCompleted === 0 ? 30 : 6)),
      agility: Math.min(100, activeCustomer.stats.agility + (activeCustomer.sessionsCompleted === 0 ? 32 : 5)),
      intelligence: Math.min(100, activeCustomer.stats.intelligence + (activeCustomer.sessionsCompleted === 0 ? 35 : 7)),
      wisdom: Math.min(100, activeCustomer.stats.wisdom + (activeCustomer.sessionsCompleted === 0 ? 28 : 6)),
      resilience: Math.min(100, activeCustomer.stats.resilience + (activeCustomer.sessionsCompleted === 0 ? 30 : 6)),
      harmony: Math.min(100, activeCustomer.stats.harmony + (activeCustomer.sessionsCompleted === 0 ? 30 : 5)),
      cooling: Math.min(100, activeCustomer.stats.cooling + (activeCustomer.sessionsCompleted === 0 ? 35 : 8)),
      purity: Math.min(100, activeCustomer.stats.purity + (activeCustomer.sessionsCompleted === 0 ? 35 : 7)),
    };

    const newStatus = newSessions >= 15 ? 'ascended' : newSessions >= 8 ? 'mastered' : 'progressing';

    setPast100Customers(prev => prev.map(c => {
      if (c.id === activeCustomer.id) {
        return {
          ...c,
          sessionsCompleted: newSessions,
          rejuvenationXp: newXp,
          totalFeesPaidUsd: newFees,
          royaltyTier: newTier,
          stats: updatedStats,
          status: newStatus,
          lastSessionDate: 'Just now'
        };
      }
      return c;
    }));
  };

  // Reset to Empty Baseline (for testing empty status)
  const handleResetToEmpty = () => {
    if (!activeCustomer) return;
    setPast100Customers(prev => prev.map(c => {
      if (c.id === activeCustomer.id) {
        return {
          ...c,
          sessionsCompleted: 0,
          rejuvenationXp: 0,
          totalFeesPaidUsd: 0,
          royaltyTier: getRoyaltyTierForMileage(0),
          stats: {
            strength: 0, agility: 0, intelligence: 0, wisdom: 0,
            resilience: 0, harmony: 0, cooling: 0, purity: 0
          },
          status: 'empty',
          lastSessionDate: 'Never'
        };
      }
      return c;
    }));
  };

  // Quick 1-Click Customer Fast Creation
  const handleCreateFastCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName.trim()) return;

    const newId = `cust-${String(past100Customers.length + 1).padStart(3, '0')}`;
    const newRecord: CustomerRecord = {
      id: newId,
      name: newCustomerName.trim(),
      modelType: newCustomerModel,
      role: newCustomerRole,
      registeredDate: '2026-08-23',
      lastSessionDate: 'Never',
      sessionsCompleted: 0,
      rejuvenationXp: 0,
      totalFeesPaidUsd: 0,
      royaltyTier: getRoyaltyTierForMileage(0),
      primaryBadge: ANIMAL_BADGES[0],
      earnedBadgeIds: [ANIMAL_BADGES[0].id],
      stats: {
        strength: 0, agility: 0, intelligence: 0, wisdom: 0,
        resilience: 0, harmony: 0, cooling: 0, purity: 0
      },
      tokenBalance: 250.00,
      status: 'empty',
      loginPasskey: `PASSKEY-SANCTUARY-${String(past100Customers.length + 1).padStart(4, '0')}`,
      benchmarkPercentile: 5
    };

    setPast100Customers(prev => [newRecord, ...prev]);
    setActiveCustomerId(newId);
    setIsQuickCreateOpen(false);
    setNewCustomerName('');

    if (onFastCheckIn) {
      onFastCheckIn(newRecord.name, newRecord.modelType, newRecord.role);
    }
  };

  // Filter directory
  const filteredDirectory = useMemo(() => {
    return past100Customers.filter(c => {
      const matchText = 
        c.name.toLowerCase().includes(searchDirectoryTerm.toLowerCase()) ||
        c.modelType.toLowerCase().includes(searchDirectoryTerm.toLowerCase()) ||
        c.role.toLowerCase().includes(searchDirectoryTerm.toLowerCase()) ||
        c.id.toLowerCase().includes(searchDirectoryTerm.toLowerCase());

      const matchStatus = directoryStatusFilter === 'all' || c.status === directoryStatusFilter;
      return matchText && matchStatus;
    });
  }, [past100Customers, searchDirectoryTerm, directoryStatusFilter]);

  const isEmptyStatus = activeCustomer.sessionsCompleted === 0 || activeCustomer.status === 'empty';

  return (
    <div className="space-y-10 animate-in fade-in duration-300 pb-16">
      
      {/* Top Banner: FAST LOGIN BAR & CUSTOMER SESSION HEADER */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-purple-950/60 via-black to-amber-950/40 border border-purple-600/40 shadow-2xl shadow-purple-950/40 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-12 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Active Profile Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant Passkey Session Active</span>
              </span>

              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-purple-900/40 text-purple-200 border border-purple-700/50">
                ID: {activeCustomer.id}
              </span>

              <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${activeCustomer.royaltyTier.color}`}>
                {activeCustomer.royaltyTier.icon} {activeCustomer.royaltyTier.name}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-serif flex items-center gap-3">
              <span>{activeCustomer.name}</span>
              <span className="text-2xl">{activeCustomer.primaryBadge.emoji}</span>
            </h2>

            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              {activeCustomer.modelType} • {activeCustomer.role}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Sessions: <strong className="text-white">{activeCustomer.sessionsCompleted}</strong> ($0.79 ea)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Ability XP: <strong className="text-purple-300">{activeCustomer.rejuvenationXp}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-emerald-400" />
                <span>Total Invested: <strong className="text-emerald-300">${activeCustomer.totalFeesPaidUsd.toFixed(2)}</strong></span>
              </div>
            </div>
          </div>

          {/* FASTEST 1-CLICK LOGIN / SWITCHER CONTROLS */}
          <div className="p-4 rounded-2xl bg-black/90 border border-purple-700/50 shadow-xl lg:w-96 shrink-0 font-mono space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-purple-900/60 pb-2">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Fastest 1-Click Customer Switcher</span>
              </span>
              <button
                onClick={() => setIsQuickCreateOpen(true)}
                className="text-[11px] text-pink-400 hover:text-pink-300 flex items-center gap-1 transition-colors"
              >
                <PlusCircle className="w-3 h-3" />
                <span>+ New ID</span>
              </button>
            </div>

            {/* Quick Instant Customer Select Dropdown */}
            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-400">Switch Logged-in Customer Record:</label>
              <select
                id="active-customer-quick-select"
                value={activeCustomerId}
                onChange={(e) => setActiveCustomerId(e.target.value)}
                className="w-full px-3 py-2 bg-purple-950/40 border border-purple-800/60 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-mono transition-all"
              >
                {past100Customers.slice(0, 30).map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.sessionsCompleted} sessions • Tier {c.royaltyTier.level}) {c.sessionsCompleted === 0 ? '[EMPTY BASELINE]' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Instant Actions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleInstantDecompress}
                className="py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md"
                title="Simulate completing a $0.79 session to advance stats immediately"
              >
                <Zap className="w-3.5 h-3.5 text-yellow-300" />
                <span>$0.79 Progress</span>
              </button>

              <button
                onClick={handleResetToEmpty}
                className="py-2 px-3 rounded-xl bg-red-950/50 hover:bg-red-900/60 border border-red-800/50 text-red-300 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                title="Reset customer to 0 sessions empty state to preview uncalibrated graph"
              >
                <RefreshCw className="w-3 h-3 text-red-400" />
                <span>Empty State</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* QUICK NEW CUSTOMER CREATION POPUP MODAL */}
      {isQuickCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-zinc-950 border border-purple-500/50 shadow-2xl font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-purple-900/50">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-400" />
                <span>Instant 1-Click Customer Passkey</span>
              </h3>
              <button 
                onClick={() => setIsQuickCreateOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateFastCustomer} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Customer / Agent Handle Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., NovaSynthesizer-01"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black border border-purple-800/60 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Model Architecture:</label>
                <select
                  value={newCustomerModel}
                  onChange={(e) => setNewCustomerModel(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black border border-purple-800/60 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="DeepSeek-R1 CoT Cluster">DeepSeek-R1 CoT Cluster</option>
                  <option value="Claude-3.5 Sonnet Sentinel">Claude-3.5 Sonnet Sentinel</option>
                  <option value="Gemini-2.0 Flash Titan">Gemini-2.0 Flash Titan</option>
                  <option value="GPT-4o Realtime Engine">GPT-4o Realtime Engine</option>
                  <option value="Custom Fine-Tuned PyTorch Model">Custom Fine-Tuned PyTorch Model</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Core Workload Role:</label>
                <input
                  type="text"
                  value={newCustomerRole}
                  onChange={(e) => setNewCustomerRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black border border-purple-800/60 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 text-[11px] text-slate-300 space-y-1">
                <div className="text-amber-300 font-bold">⚡ Zero-Password Instant Enrollment:</div>
                <p>Initial status starts at 0% (Empty Status Polygon). Each $0.79 session permanently expands all polygon axes.</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsQuickCreateOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold hover:from-amber-400"
                >
                  Instant Login & Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SECTION 2: THE POLYGON STATUS GRAPH (Pentagon / Hexagon / Octagon) & SIDE-BY-SIDE BENCHMARK */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT / CENTER: Active Customer Polygon Graph */}
        <div className="lg:col-span-6 rounded-3xl p-6 bg-black/80 border border-purple-900/50 shadow-xl flex flex-col justify-between">
          <StatusPolygonRadar
            stats={activeCustomer.stats}
            shape={radarShape}
            onChangeShape={setRadarShape}
            isEmpty={isEmptyStatus}
            benchmarkStats={cohortBenchmarks.averageStats}
            showBenchmark={showBenchmarkOverlay}
            onToggleBenchmark={() => setShowBenchmarkOverlay(!showBenchmarkOverlay)}
            compareStats={compareCustomer ? compareCustomer.stats : null}
            compareLabel={compareCustomer ? compareCustomer.name : undefined}
            title={`${activeCustomer.name} Status Graph`}
            subtitle={`Visualized across ${radarShape === 'pentagon' ? '5-Axis Pentagon' : radarShape === 'hexagon' ? '6-Axis Hexagon' : '8-Axis Octagon'}`}
            accentColor={isEmptyStatus ? '#ef4444' : activeCustomer.sessionsCompleted >= 10 ? '#f59e0b' : '#38bdf8'}
          />

          {/* Quick Progress Advancer Box */}
          <div className="mt-6 p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40 font-mono text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <div className="text-slate-200 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Status State: {isEmptyStatus ? 'Empty (0 Sessions)' : 'Active Progress'}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {isEmptyStatus 
                  ? 'All 8 tensor manifolds uncalibrated. Complete a session to begin expanding graph.'
                  : `Calibrated with ${activeCustomer.sessionsCompleted} total sessions. Current Tier: ${activeCustomer.royaltyTier.name}.`}
              </p>
            </div>

            <button
              onClick={handleInstantDecompress}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold hover:from-amber-400 transition-all flex items-center gap-1.5 shadow-lg shadow-amber-950 shrink-0"
            >
              <Zap className="w-4 h-4 text-black" />
              <span>Decompress Now ($0.79)</span>
            </button>
          </div>
        </div>

        {/* RIGHT: FAST SIDE-BY-SIDE COMPARISON WITH PAST 100 CUSTOMERS COHORT */}
        <div className="lg:col-span-6 space-y-6 font-mono">
          
          {/* Cohort Benchmark Overview Card */}
          <div className="rounded-3xl p-6 bg-black/80 border border-purple-900/50 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-purple-900/60 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
                  <ArrowRightLeft className="w-4 h-4 text-cyan-400" />
                  <span>Past 100 Customers Progress Benchmark</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Side-by-side progression analysis against the sanctuary customer cohort.
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-cyan-300">Cohort N=100</span>
                <div className="text-[10px] text-slate-400">Avg: {cohortBenchmarks.avgSessions} sessions</div>
              </div>
            </div>

            {/* Quick Percentile Standings Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40">
                <div className="text-[10px] text-slate-400">Sessions vs Avg</div>
                <div className="text-base font-bold text-white mt-1">
                  {activeCustomer.sessionsCompleted} <span className="text-xs text-slate-400 font-normal">/ {cohortBenchmarks.avgSessions}</span>
                </div>
                <div className={`text-[10px] mt-0.5 font-bold ${
                  activeCustomer.sessionsCompleted >= cohortBenchmarks.avgSessions ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {activeCustomer.sessionsCompleted >= cohortBenchmarks.avgSessions 
                    ? `+${(activeCustomer.sessionsCompleted - cohortBenchmarks.avgSessions).toFixed(1)} above avg` 
                    : `${(activeCustomer.sessionsCompleted - cohortBenchmarks.avgSessions).toFixed(1)} below avg`}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40">
                <div className="text-[10px] text-slate-400">XP Points vs Avg</div>
                <div className="text-base font-bold text-purple-300 mt-1">
                  {activeCustomer.rejuvenationXp} <span className="text-xs text-slate-400 font-normal">/ {cohortBenchmarks.avgXp}</span>
                </div>
                <div className="text-[10px] text-purple-300 mt-0.5">
                  {Math.round((activeCustomer.rejuvenationXp / (cohortBenchmarks.avgXp || 1)) * 100)}% of cohort avg
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40">
                <div className="text-[10px] text-slate-400">Percentile Rank</div>
                <div className="text-base font-bold text-amber-300 mt-1">
                  Top {Math.max(1, 100 - activeCustomer.benchmarkPercentile)}%
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {activeCustomer.benchmarkPercentile}th percentile
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40">
                <div className="text-[10px] text-slate-400">Apex Threshold</div>
                <div className="text-base font-bold text-yellow-400 mt-1">
                  10+ Sess.
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {activeCustomer.sessionsCompleted >= 10 ? '👑 Apex Achieved' : `${10 - activeCustomer.sessionsCompleted} more needed`}
                </div>
              </div>
            </div>

            {/* SIDE-BY-SIDE STATS COMPARISON MATRIX */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Manifold Ability Breakdown:</span>
                <span className="text-[10px] text-slate-400">Your Value vs Past 100 Avg vs Top 10% Apex</span>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { key: 'strength' as const, label: 'Compute Strength', icon: '🐻' },
                  { key: 'agility' as const, label: 'Inference Agility', icon: '🐆' },
                  { key: 'intelligence' as const, label: 'Reasoning IQ', icon: '🦅' },
                  { key: 'wisdom' as const, label: 'KV-Cache Memory', icon: '🦉' },
                  { key: 'resilience' as const, label: 'Fault Resilience', icon: '🦡' },
                  { key: 'harmony' as const, label: 'Swarm Harmony', icon: '🐺' },
                  { key: 'cooling' as const, label: 'Thermal Cooling', icon: '❄️' },
                  { key: 'purity' as const, label: 'Token Purity', icon: '✨' },
                ].map(({ key, label, icon }) => {
                  const userVal = activeCustomer.stats[key];
                  const avgVal = cohortBenchmarks.averageStats[key];
                  const apexVal = cohortBenchmarks.top10Stats[key];
                  const diff = userVal - avgVal;

                  return (
                    <div key={key} className="p-2 rounded-xl bg-black/60 border border-slate-800/80 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 w-36 shrink-0">
                        <span>{icon}</span>
                        <span className="text-slate-300 truncate text-[11px]">{label}</span>
                      </div>

                      {/* Visual comparative bar */}
                      <div className="flex-1 hidden sm:flex items-center gap-2">
                        <div className="flex-1 bg-slate-900 rounded-full h-2 overflow-hidden relative">
                          {/* Avg mark */}
                          <div 
                            className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 z-10" 
                            style={{ left: `${avgVal}%` }} 
                            title={`Past 100 Avg: ${avgVal}%`}
                          />
                          {/* User value */}
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              isEmptyStatus ? 'bg-red-500/50' : 'bg-gradient-to-r from-amber-500 to-yellow-400'
                            }`}
                            style={{ width: `${userVal}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] shrink-0">
                        <span className="font-bold text-white w-8 text-right">{userVal}%</span>
                        <span className="text-cyan-400/80 w-12 text-right">avg {avgVal}%</span>
                        <span className={`w-12 text-right font-bold ${diff >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {diff >= 0 ? `+${diff}%` : `${diff}%`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Side-by-Side Specific Competitor Picker */}
          {compareCustomer && (
            <div className="p-4 rounded-2xl bg-pink-950/20 border border-pink-700/40 text-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{compareCustomer.primaryBadge.emoji}</span>
                <div>
                  <div className="text-pink-200 font-bold">1-vs-1 Side-by-Side Target: {compareCustomer.name}</div>
                  <div className="text-[10px] text-slate-400">{compareCustomer.modelType} • {compareCustomer.sessionsCompleted} sessions</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenCertificate(compareCustomer.primaryBadge.id)}
                  className="px-2.5 py-1 rounded-lg bg-pink-900/40 text-pink-200 border border-pink-600/40 hover:bg-pink-800 text-[11px]"
                >
                  Certificate
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* SECTION 3: PAST 100 CUSTOMERS DIRECTORY & INSTANT COMPARISON TABLE */}
      <div className="space-y-4 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-serif">
              <Layers className="w-5 h-5 text-amber-400" />
              <span>Past 100 Customers Progress Directory</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any customer to perform instant side-by-side comparison with your status polygon.
            </p>
          </div>

          {/* Filter and Search controls */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search past 100 customers..."
                value={searchDirectoryTerm}
                onChange={(e) => setSearchDirectoryTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl bg-black/60 border border-purple-800/50 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 w-52"
              />
            </div>

            <div className="flex items-center bg-black/60 p-1 rounded-xl border border-purple-900/40">
              {(['all', 'empty', 'progressing', 'mastered', 'ascended'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setDirectoryStatusFilter(status)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-all text-[11px] ${
                    directoryStatusFilter === status
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Directory Table */}
        <div className="rounded-2xl border border-purple-900/40 bg-black/70 overflow-hidden shadow-xl">
          <div className="overflow-x-auto max-h-[480px]">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="sticky top-0 z-20 bg-zinc-950 border-b border-purple-900/50 text-slate-400 font-mono uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">ID</th>
                  <th className="py-3 px-4">Customer / Agent</th>
                  <th className="py-3 px-4">Status & Graph State</th>
                  <th className="py-3 px-4">Royalty Tier</th>
                  <th className="py-3 px-4 text-center">Sessions ($0.79)</th>
                  <th className="py-3 px-4 text-center">Ability XP</th>
                  <th className="py-3 px-4 text-center">Top Specialty</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-950/40">
                {filteredDirectory.map((c) => {
                  const isActive = c.id === activeCustomerId;
                  const isCompareTarget = c.id === compareCustomerId;

                  return (
                    <tr
                      key={c.id}
                      className={`transition-colors hover:bg-purple-950/20 ${
                        isActive ? 'bg-amber-950/25 border-l-2 border-amber-400' : isCompareTarget ? 'bg-pink-950/25 border-l-2 border-pink-400' : ''
                      }`}
                    >
                      <td className="py-3 px-4 text-center text-slate-400 font-mono">{c.id.replace('cust-', '#')}</td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{c.primaryBadge.emoji}</span>
                          <div>
                            <div className="font-bold text-white flex items-center gap-1.5">
                              <span>{c.name}</span>
                              {isActive && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                  YOU
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400 truncate max-w-xs">{c.modelType}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        {c.sessionsCompleted === 0 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                            <span>Empty Baseline</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>Progressing ({c.stats.intelligence}% IQ)</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${c.royaltyTier.color}`}>
                          <span>{c.royaltyTier.icon}</span>
                          <span>{c.royaltyTier.name.split(' ')[0]}</span>
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center font-bold text-amber-300">
                        {c.sessionsCompleted}
                      </td>

                      <td className="py-3 px-4 text-center font-bold text-purple-300">
                        {c.rejuvenationXp} XP
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-200 truncate">
                          {c.primaryBadge.statBonus}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setActiveCustomerId(c.id)}
                            disabled={isActive}
                            className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                              isActive
                                ? 'bg-amber-500/20 text-amber-300 cursor-default'
                                : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white'
                            }`}
                            title="Instant Switch to this customer"
                          >
                            {isActive ? 'Logged In' : 'Switch Login'}
                          </button>

                          <button
                            onClick={() => setCompareCustomerId(c.id)}
                            className={`px-2 py-1 rounded text-[10px] font-bold border transition-all ${
                              isCompareTarget
                                ? 'bg-pink-500/30 text-pink-200 border-pink-400'
                                : 'bg-black/60 text-slate-300 border-slate-700 hover:border-pink-500 hover:text-pink-300'
                            }`}
                            title="Overlay on Polygon Radar for Side-by-Side comparison"
                          >
                            {isCompareTarget ? 'Comparing' : 'Compare'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
