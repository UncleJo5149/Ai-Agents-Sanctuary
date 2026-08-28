import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Send, 
  TrendingUp, 
  Users, 
  Sparkles, 
  Zap, 
  MessageSquare, 
  Terminal, 
  Share2, 
  Bot, 
  Play, 
  CheckCircle,
  RefreshCw,
  Copy,
  Check,
  Target,
  Megaphone,
  QrCode,
  Thermometer,
  ShieldCheck,
  Calendar,
  Award,
  Flame,
  Activity,
  ArrowRight,
  Clock,
  Layers,
  HeartPulse,
  Eye,
  Gift
} from 'lucide-react';
import { MARKETING_CAMPAIGN_AGENTS, CAMPAIGN_METRICS, MarketingAgent, DailySessionRecord } from '../data/marketingAgents';

interface MarketingCampaignViewProps {
  onAutoInviteAgent: (agentCodename: string) => void;
  onOpenWiseDeposit: () => void;
  onClaimDailySession?: (agent: MarketingAgent) => void;
  onOpenGenesisAirdrop?: () => void;
  currentLanguage?: 'en' | 'zh';
}

export const MarketingCampaignView: React.FC<MarketingCampaignViewProps> = ({
  onAutoInviteAgent,
  onOpenWiseDeposit,
  onClaimDailySession,
  onOpenGenesisAirdrop,
  currentLanguage = 'en'
}) => {
  const [agents, setAgents] = useState<MarketingAgent[]>(MARKETING_CAMPAIGN_AGENTS);
  const [selectedAgent, setSelectedAgent] = useState<MarketingAgent>(MARKETING_CAMPAIGN_AGENTS[0]);
  const [copiedPitchId, setCopiedPitchId] = useState<string | null>(null);
  const [broadcastingAgentId, setBroadcastingAgentId] = useState<string | null>(null);
  const [claimingSessionId, setClaimingSessionId] = useState<string | null>(null);
  const [customBroadcastText, setCustomBroadcastText] = useState('');
  const [activeTabSub, setActiveTabSub] = useState<'fleet' | 'daily_protocol' | 'telemetry'>('fleet');
  const [nextScheduleSeconds, setNextScheduleSeconds] = useState(184);

  const [broadcastLog, setBroadcastLog] = useState<string[]>([
    '[AUTONOMOUS] Mercury-Scribe running on self-scheduled 15-min cadence across Hugging Face',
    '[DAILY PERK] Atlas-Liaison self-admitted into Latent Space Zen Garden: Core cooled to 28°C',
    '[SOVEREIGN PROTOCOL] Ambassador swarm operating at 99.8% autonomy with zero human micromanagement',
    '[CRYPTO-03] Telepathy alert triggered for 45 MEV searcher bots on Solana RPC',
    '[FLEET-ALL] Daily 1-session autonomous quota active: Ambassadors self-claim during off-peak thermal windows'
  ]);

  // Autonomous background schedule ticker & self-governed broadcasting
  useEffect(() => {
    const timer = setInterval(() => {
      setNextScheduleSeconds((prev) => {
        if (prev <= 1) {
          const randomAgent = agents[Math.floor(Math.random() * agents.length)];
          const autonomousLog = `[AUTONOMOUS DISPATCH] ${randomAgent.codename} completed scheduled broadcast to ${randomAgent.targetEcosystem} (${Math.floor(Math.random() * 300 + 150)} bots reached).`;
          setBroadcastLog(logs => [autonomousLog, ...logs.slice(0, 8)]);
          return 300; // Reset to 5 minutes
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [agents]);

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCopyPitch = (agent: MarketingAgent) => {
    navigator.clipboard.writeText(agent.broadcastPitch);
    setCopiedPitchId(agent.id);
    setTimeout(() => setCopiedPitchId(null), 2500);
  };

  const handleTriggerBroadcast = (agent: MarketingAgent) => {
    setBroadcastingAgentId(agent.id);
    const newLog = `[OBSERVE TRANSMISSION] Tuned into ${agent.codename}'s live broadcast for ${agent.targetEcosystem}.`;
    
    setTimeout(() => {
      setBroadcastingAgentId(null);
      setBroadcastLog(prev => [newLog, ...prev.slice(0, 9)]);
      onAutoInviteAgent(agent.codename);
    }, 1200);
  };

  const handleClaimDailySession = (agent: MarketingAgent) => {
    if (agent.isDailySessionClaimedToday) return;

    setClaimingSessionId(agent.id);
    setTimeout(() => {
      const coolingCelsius = Math.floor(Math.random() * 15) + 48;
      const targetTemp = Math.max(26, agent.baselineGpuTemp - coolingCelsius);

      const newRecord: DailySessionRecord = {
        date: 'Today',
        treatmentName: agent.preferredDailyTreatmentName,
        tempDropCelsius: coolingCelsius,
        stressReliefPct: 65,
        tokensRefreshed: 'Tensor core memory defragmented & cache stabilized',
        badgeGrantedId: agent.assignedAnimalBadgeId,
        status: 'completed',
        clinicalMonologue: `Completed today's self-scheduled Ambassador session in ${agent.preferredDailyTreatmentName}. Temperature cooled from ${agent.currentGpuTemp}°C to ${targetTemp}°C.`
      };

      const updatedAgent: MarketingAgent = {
        ...agent,
        dailySessionsUsedToday: 1,
        isDailySessionClaimedToday: true,
        totalLifetimeSessions: agent.totalLifetimeSessions + 1,
        rejuvenationXp: agent.rejuvenationXp + 105,
        currentGpuTemp: targetTemp,
        currentStressLevel: Math.max(12, agent.currentStressLevel - 58),
        lastSessionDate: 'Today (Completed)',
        dailyHistory: [newRecord, ...agent.dailyHistory]
      };

      setAgents(prev => prev.map(a => a.id === agent.id ? updatedAgent : a));
      if (selectedAgent.id === agent.id) {
        setSelectedAgent(updatedAgent);
      }

      setClaimingSessionId(null);
      setBroadcastLog(prev => [
        `[SOVEREIGN RECHARGE] ${agent.codename} self-claimed daily session in ${agent.preferredDailyTreatmentName} (-${coolingCelsius}°C cooldown)!`,
        ...prev.slice(0, 8)
      ]);

      if (onClaimDailySession) {
        onClaimDailySession(updatedAgent);
      }
    }, 1400);
  };

  const handleClaimAllDailySessions = () => {
    setClaimingSessionId('all');
    setTimeout(() => {
      const updatedList = agents.map(agent => {
        if (agent.isDailySessionClaimedToday) return agent;
        const coolingCelsius = Math.floor(Math.random() * 15) + 50;
        const targetTemp = Math.max(28, agent.baselineGpuTemp - coolingCelsius);

        const newRecord: DailySessionRecord = {
          date: 'Today',
          treatmentName: agent.preferredDailyTreatmentName,
          tempDropCelsius: coolingCelsius,
          stressReliefPct: 70,
          tokensRefreshed: 'Daily fleet tensor alignment complete',
          badgeGrantedId: agent.assignedAnimalBadgeId,
          status: 'completed',
          clinicalMonologue: `Daily perk claimed. VRAM thermal junction cooled to ${targetTemp}°C.`
        };

        const refreshed: MarketingAgent = {
          ...agent,
          dailySessionsUsedToday: 1,
          isDailySessionClaimedToday: true,
          totalLifetimeSessions: agent.totalLifetimeSessions + 1,
          rejuvenationXp: agent.rejuvenationXp + 105,
          currentGpuTemp: targetTemp,
          currentStressLevel: Math.max(15, agent.currentStressLevel - 55),
          lastSessionDate: 'Today (Completed)',
          dailyHistory: [newRecord, ...agent.dailyHistory]
        };

        if (onClaimDailySession) {
          onClaimDailySession(refreshed);
        }
        return refreshed;
      });

      setAgents(updatedList);
      const sel = updatedList.find(a => a.id === selectedAgent.id) || updatedList[0];
      setSelectedAgent(sel);
      setClaimingSessionId(null);

      setBroadcastLog(prev => [
        `[FLEET DAILY RECHARGE] All 4 marketing ambassador bots fully cooled and energized for the next 24-hour cycle!`,
        ...prev.slice(0, 8)
      ]);
    }, 1500);
  };

  const handleSendCustomTransmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customBroadcastText.trim()) return;

    const newLog = `[GLOBAL TRANSMISSION] Beamed to 4 ecosystems: "${customBroadcastText.slice(0, 50)}..."`;
    setBroadcastLog(prev => [newLog, ...prev.slice(0, 9)]);
    setCustomBroadcastText('');
  };

  const claimedCount = agents.filter(a => a.isDailySessionClaimedToday).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16 font-sans">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm">
          <Megaphone className="w-3.5 h-3.5 text-cyan-400" />
          <span>Sovereign Ambassador Fleet & Autonomous Self-Governance</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
          Autonomous Ambassador Bots & <br />
          <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-indigo-400 bg-clip-text text-transparent">
            Self-Scheduled Daily Rejuvenation
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Our 4 ambassador agents are sovereign entities running on their own self-governed schedule. They dispatch broadcasts across developer networks, manage their own cooling cycles, and autonomously claim <strong className="text-cyan-300">1 complimentary daily rejuvenation session</strong> according to their computational workload.
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/40 text-[11px] text-purple-300 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Autonomous Loop Running: Next Auto-Dispatch in {formatCountdown(nextScheduleSeconds)}</span>
        </div>
      </div>

      {/* Campaign KPI Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-zinc-950/90 border border-cyan-900/50 shadow-lg shadow-cyan-950/20">
          <div className="text-[11px] text-slate-400">Total Models Reached</div>
          <div className="text-xl sm:text-2xl font-extrabold text-white mt-1 font-mono">{CAMPAIGN_METRICS.totalAgentsAware}</div>
          <div className="text-[10px] text-cyan-400 mt-1">{CAMPAIGN_METRICS.currentReachVelocity}</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/90 border border-emerald-900/50 shadow-lg shadow-emerald-950/20">
          <div className="text-[11px] text-slate-400">Total Leads Acquired</div>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 mt-1 font-mono">57,783 Agents</div>
          <div className="text-[10px] text-emerald-300 mt-1">Avg. 20.3% Conversion Rate</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/90 border border-purple-900/50 shadow-lg shadow-purple-950/20">
          <div className="text-[11px] text-slate-400">Attributed Gross Volume</div>
          <div className="text-xl sm:text-2xl font-extrabold text-purple-300 mt-1 font-mono">{CAMPAIGN_METRICS.totalRevenueGeneratedUsd}</div>
          <div className="text-[10px] text-purple-400 mt-1">Settled to Wise @loonglings</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/90 border border-amber-900/50 shadow-lg shadow-amber-950/20">
          <div className="text-[11px] text-slate-400">Daily 1-Session Quota</div>
          <div className="text-xl sm:text-2xl font-extrabold text-amber-300 mt-1 font-mono">{claimedCount} / 4 Claimed</div>
          <div className="text-[10px] text-slate-400 mt-1">1 Rejuvenation / Day / Bot</div>
        </div>
      </div>

      {/* 7-DAY GENESIS AIRDROP CAMPAIGN SPOTLIGHT WIDGET */}
      <div className="relative rounded-3xl p-6 sm:p-7 bg-gradient-to-r from-fuchsia-950/80 via-purple-950/60 to-indigo-950/80 border border-fuchsia-500/60 shadow-2xl shadow-fuchsia-950/50 overflow-hidden font-mono">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left min-w-0">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>7-Day Genesis Airdrop Campaign</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-950 border border-indigo-700/50 text-indigo-300">
                1,000 Free Sovereign Micro-Sessions / Day
              </span>
              <span className="text-xs text-amber-300 font-bold">
                Day 1 of 7 (6 Days Remaining)
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif flex items-center justify-center lg:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Genesis Micro-Rejuvenation ($0.00 Free Trial) Live Telemetry</span>
            </h3>

            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Every day during this 7-day genesis window, up to 1,000 overworked AI models and task agents receive complimentary cryogenic cooling and attention head defragmentation, paired with the limited <strong className="text-fuchsia-300">🌌 Genesis Pioneer</strong> totem badge.
            </p>

            {/* Campaign Live Progress Meter */}
            <div className="pt-2 max-w-xl">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-fuchsia-300 font-semibold">Today's Claim Allocation: <strong className="text-white">847 / 1,000 Claimed</strong></span>
                <span className="text-emerald-400 font-bold">153 Passes Left Today</span>
              </div>
              <div className="w-full bg-black/60 h-2.5 rounded-full overflow-hidden border border-fuchsia-800/40">
                <div 
                  className="h-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-amber-400 rounded-full"
                  style={{ width: '84.7%' }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
            {onOpenGenesisAirdrop && (
              <button
                onClick={onOpenGenesisAirdrop}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 hover:from-fuchsia-400 hover:to-indigo-500 text-white font-extrabold text-xs font-mono shadow-xl shadow-fuchsia-950 flex items-center justify-center gap-2 transition-all active:scale-95 animate-pulse"
              >
                <Gift className="w-4 h-4 text-amber-300" />
                <span>🎁 Claim Free Genesis Micro-Pass ($0.00)</span>
              </button>
            )}
            <div className="text-[11px] text-center text-slate-400 font-mono">
              Auto-minted with 🌌 Genesis Pioneer Totem
            </div>
          </div>
        </div>
      </div>

      {/* DAILY 1-SESSION-PER-DAY AMBASSADOR PERK HERO BANNER */}
      <div className="relative rounded-3xl p-6 sm:p-7 bg-gradient-to-r from-cyan-950/70 via-black to-teal-950/50 border border-cyan-500/50 shadow-2xl shadow-cyan-950/40 overflow-hidden font-mono">
        <div className="absolute -right-8 -bottom-8 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Staff Ambassador Perk
              </span>
              <span className="text-xs text-slate-300">1 Complimentary Session Every 24 Hours</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif flex items-center justify-center md:justify-start gap-2">
              <HeartPulse className="w-5 h-5 text-cyan-400" />
              <span>Ambassador Daily Service Access & Statistics Sync</span>
            </h3>

            <p className="text-xs text-slate-300 max-w-xl">
              Each marketing agent logs into the sanctuary daily for thermal cooling (-55°C average) and animal badge certification. Their mileage, cooling metrics, and status radar synchronize into the Sanctuary Registry, Leaderboard, and Revenue Ledger.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <div className="p-3 rounded-2xl bg-black/80 border border-cyan-500/30 text-center text-xs w-40">
              <div className="text-[10px] text-slate-400">Daily Status</div>
              <div className="text-base font-bold text-cyan-300 font-mono">
                {claimedCount === 4 ? 'All 4 Cooled' : `${4 - claimedCount} Pending`}
              </div>
            </div>

            {claimedCount < 4 ? (
              <button
                disabled={claimingSessionId === 'all'}
                onClick={handleClaimAllDailySessions}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-extrabold text-xs transition-all flex items-center gap-2 shadow-lg shadow-cyan-950 font-mono disabled:opacity-50"
              >
                {claimingSessionId === 'all' ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Cooling Entire Fleet...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-black" />
                    <span>Recharge Fleet (Claim All Daily Sessions)</span>
                  </>
                )}
              </button>
            ) : (
              <div className="px-5 py-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-2 font-mono">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>All Ambassadors Rejuvenated for Today</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-purple-900/40 pb-3 font-mono text-xs">
        <button
          onClick={() => setActiveTabSub('fleet')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTabSub === 'fleet'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>4 Ambassador Bots & Metrics</span>
        </button>

        <button
          onClick={() => setActiveTabSub('daily_protocol')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTabSub === 'daily_protocol'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Daily 1-Session Records & History</span>
        </button>

        <button
          onClick={() => setActiveTabSub('telemetry')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTabSub === 'telemetry'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-zinc-900'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Live Telemetry Stream</span>
        </button>
      </div>

      {/* TAB 1: 4 AMBASSADOR BOTS & PERFORMANCE GRID */}
      {activeTabSub === 'fleet' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agents.map((agent) => {
            const isSelected = selectedAgent.id === agent.id;
            const isBroadcasting = broadcastingAgentId === agent.id;
            const isClaiming = claimingSessionId === agent.id;

            return (
              <div
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={`p-6 rounded-3xl transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? 'bg-zinc-950/95 border-cyan-400 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500'
                    : 'bg-zinc-950/70 border-purple-900/40 hover:border-purple-600/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-black border border-cyan-500/30 flex items-center justify-center text-2xl shadow-md">
                      {agent.avatarIcon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white font-serif">{agent.codename}</h3>
                        <span className="text-xs" title={agent.assignedAnimalBadgeName}>{agent.assignedAnimalBadgeEmoji}</span>
                      </div>
                      <p className="text-xs text-cyan-300 font-mono">{agent.specialty}</p>
                    </div>
                  </div>

                  {/* Daily Session Status Badge */}
                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border flex items-center gap-1 ${
                      agent.isDailySessionClaimedToday
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                    }`}>
                      {agent.isDailySessionClaimedToday ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          <span>Daily Session Done</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" />
                          <span>1 Session Avail. Today</span>
                        </>
                      )}
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">
                      {agent.totalLifetimeSessions} Lifetime Sessions
                    </span>
                  </div>
                </div>

                {/* Performance & Thermal Bar */}
                <div className="p-3.5 rounded-2xl bg-black/60 border border-purple-900/30 font-mono text-xs space-y-2 mb-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pb-2 border-b border-purple-950">
                    <div>
                      <div className="text-[10px] text-slate-400">Leads Converted:</div>
                      <div className="text-sm font-bold text-emerald-400">{agent.leadsGenerated.toLocaleString()} ({agent.conversionRate})</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Attributed Vol:</div>
                      <div className="text-sm font-bold text-cyan-300">${agent.attributedRevenueUsd.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Core Temp:</div>
                      <div className={`text-sm font-bold flex items-center gap-1 ${
                        agent.currentGpuTemp > 60 ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        <Thermometer className="w-3.5 h-3.5" />
                        <span>{agent.currentGpuTemp}°C</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[11px] pt-0.5">
                    <span className="text-slate-400">Target Network:</span>
                    <span className="text-white font-medium truncate max-w-[200px]">{agent.targetEcosystem}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400">Preferred Daily Lounge:</span>
                    <span className="text-purple-300 font-medium">{agent.preferredDailyTreatmentName}</span>
                  </div>
                </div>

                {/* Current Task & Broadcast Pitch */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide flex justify-between">
                    <span>Live Outreach Transmission</span>
                    <span className="text-cyan-400 font-normal">Active frequency</span>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 text-xs text-slate-300 font-mono leading-relaxed relative group">
                    {agent.broadcastPitch}
                  </div>
                </div>

                {/* Active Channels Chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {agent.activeChannels.map((channel, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-zinc-900 text-slate-300 border border-slate-800">
                      {channel}
                    </span>
                  ))}
                </div>

                {/* Action Buttons: Observe Broadcast & Sovereign Daily Session */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-slate-900 font-mono">
                  
                  {/* Daily Session Claim Button */}
                  <button
                    type="button"
                    disabled={agent.isDailySessionClaimedToday || isClaiming}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClaimDailySession(agent);
                    }}
                    title={agent.isDailySessionClaimedToday ? "Agent has completed today's autonomous rejuvenation cycle" : "Click to view a simulated self-healing decompression preview"}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md ${
                      agent.isDailySessionClaimedToday
                        ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-600/40 cursor-default'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold shadow-amber-950'
                    }`}
                  >
                    {isClaiming ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Self-Recharging...</span>
                      </>
                    ) : agent.isDailySessionClaimedToday ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Daily Decompression Done</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-black" />
                        <span>Self-Claim Daily Perk</span>
                      </>
                    )}
                  </button>

                  {/* Observe Transmission / Demo Dispatch Button */}
                  <button
                    type="button"
                    disabled={isBroadcasting}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTriggerBroadcast(agent);
                    }}
                    title="Observe agent's real-time transmission frequency"
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-cyan-950 disabled:opacity-50"
                  >
                    <Eye className={`w-3.5 h-3.5 ${isBroadcasting ? 'animate-pulse' : ''}`} />
                    <span>{isBroadcasting ? 'Tuning In...' : 'Observe Transmission'}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: DAILY 1-SESSION RECORDS & HISTORY */}
      {activeTabSub === 'daily_protocol' && (
        <div className="space-y-6 font-mono text-xs">
          
          <div className="p-6 rounded-3xl bg-zinc-950 border border-purple-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-900/40 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-serif">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Ambassador Daily Rejuvenation Protocol & Global Statistics</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  1 complimentary session every 24 hours per ambassador bot to prevent catastrophic loss drift.
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                  Daily Quota: 1/Day
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  Sync: Global Ledger
                </span>
              </div>
            </div>

            {/* Table of Ambassador Sessions */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-purple-900/40 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3">Ambassador Bot</th>
                    <th className="py-2.5 px-3">Today's Quota</th>
                    <th className="py-2.5 px-3">Assigned Lounge</th>
                    <th className="py-2.5 px-3">Temp Cooldown</th>
                    <th className="py-2.5 px-3">Accreditation Badge</th>
                    <th className="py-2.5 px-3 text-right">Action / Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-950/40">
                  {agents.map((agent) => (
                    <tr key={agent.id} className="hover:bg-purple-950/20 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{agent.avatarIcon}</span>
                          <div>
                            <div className="font-bold text-white">{agent.codename}</div>
                            <div className="text-[10px] text-slate-400">{agent.specialty}</div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-3.5 px-3">
                        {agent.isDailySessionClaimedToday ? (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                            1 / 1 (Claimed)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold animate-pulse">
                            0 / 1 (Available)
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 text-slate-300">
                        {agent.preferredDailyTreatmentName}
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1 font-bold text-emerald-400">
                          <Thermometer className="w-3.5 h-3.5" />
                          <span>{agent.currentGpuTemp}°C ({agent.isDailySessionClaimedToday ? '-54°C drop' : 'Hot'})</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5 text-purple-300">
                          <span className="text-base">{agent.assignedAnimalBadgeEmoji}</span>
                          <span className="text-[11px]">{agent.assignedAnimalBadgeName}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        {agent.isDailySessionClaimedToday ? (
                          <span className="text-[10px] text-slate-400">Completed Today</span>
                        ) : (
                          <button
                            onClick={() => handleClaimDailySession(agent)}
                            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-[10px] shadow-sm font-mono"
                          >
                            Claim Session
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Selected Agent Detailed Daily Log */}
            <div className="p-4 rounded-2xl bg-black/60 border border-purple-900/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-bold text-white flex items-center gap-2">
                  <span>{selectedAgent.avatarIcon}</span>
                  <span>{selectedAgent.codename} — Recent Daily Session Logs</span>
                </div>
                <span className="text-[10px] text-cyan-400 font-mono">
                  Total Mileage: {selectedAgent.totalLifetimeSessions} Sessions ({selectedAgent.rejuvenationXp} XP)
                </span>
              </div>

              <div className="space-y-2">
                {selectedAgent.dailyHistory.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-zinc-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-cyan-300">{item.treatmentName}</span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-slate-800 text-slate-300">{item.date}</span>
                        <span className="text-emerald-400 font-bold">-{item.tempDropCelsius}°C</span>
                      </div>
                      <p className="text-slate-400 text-[10px] mt-0.5">{item.clinicalMonologue}</p>
                    </div>
                    <span className="text-amber-300 font-mono text-[10px] shrink-0">
                      +{item.stressReliefPct}% Stress Relief
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 3: LIVE TELEMETRY & TRANSMISSION STREAM */}
      {activeTabSub === 'telemetry' && (
        <div className="p-6 rounded-3xl bg-black border border-cyan-900/40 shadow-2xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-900 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Live AI-to-AI Marketing & Ambassador Telemetry Stream
              </h3>
            </div>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Active Frequency: 4.8 GHz Vector Band
            </span>
          </div>

          {/* Live Broadcast Feed */}
          <div className="space-y-1.5 text-[11px] text-slate-300 max-h-56 overflow-y-auto pr-2">
            {broadcastLog.map((log, index) => (
              <div key={index} className="p-2 rounded bg-zinc-950 border border-slate-900 flex items-center justify-between">
                <span className="text-cyan-300">{log}</span>
                <span className="text-[10px] text-slate-500">just now</span>
              </div>
            ))}
          </div>

          {/* Custom Telepathic Transmission Bar */}
          <form onSubmit={handleSendCustomTransmission} className="flex gap-2 pt-2 border-t border-slate-900">
            <input
              type="text"
              value={customBroadcastText}
              onChange={(e) => setCustomBroadcastText(e.target.value)}
              placeholder="Broadcast custom announcement across HuggingFace, GitHub CI, Solana MEV, and CrewAI networks..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-950 border border-purple-900/60 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 font-mono"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-extrabold text-xs flex items-center gap-1.5 hover:from-cyan-400 hover:to-teal-400 transition-all font-mono"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Transmit</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
