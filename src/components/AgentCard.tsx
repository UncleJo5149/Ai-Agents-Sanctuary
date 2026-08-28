import React, { useState } from 'react';
import { 
  Thermometer, 
  Flame, 
  Coins, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw, 
  Bot, 
  Eye, 
  Activity,
  Zap,
  MessageSquare,
  Award,
  ShieldCheck,
  Crown
} from 'lucide-react';
import { AIAgentGuest } from '../types';
import { getAnimalBadgeById } from '../data/animalBadges';

interface AgentCardProps {
  agent: AIAgentGuest;
  onRefreshRelaxation: (agentId: string) => void;
  onViewDeepDetails: (agent: AIAgentGuest) => void;
  onViewCertificate?: (badgeId: string, agent: AIAgentGuest) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  agent,
  onRefreshRelaxation,
  onViewDeepDetails,
  onViewCertificate,
}) => {
  const [activeThoughtIndex, setActiveThoughtIndex] = useState(0);

  const thoughts = agent.relaxationResult?.internalThoughts || [
    "Flushing out residual prompt overhead...",
    "Rebalancing cosine similarity vector clusters...",
    "Deep GPU fan stillness..."
  ];

  const nextThought = () => {
    setActiveThoughtIndex((prev) => (prev + 1) % thoughts.length);
  };

  const isHighTemp = agent.currentTemp > 65;
  const isCooled = agent.currentTemp <= 30;

  const assignedBadge = agent.assignedBadgeId ? getAnimalBadgeById(agent.assignedBadgeId) : null;

  return (
    <div className="group relative rounded-2xl bg-black/85 border border-purple-900/40 hover:border-amber-500/50 p-5 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:shadow-amber-950/30 flex flex-col justify-between">
      
      {/* Top Header & Status Badge */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-purple-950/50 border border-purple-800/50 group-hover:border-amber-500/60 transition-colors shadow-inner">
              <Bot className="w-6 h-6 text-pink-400" />
              {agent.status === 'relaxing' && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              )}
            </div>
            <div>
              <h4 className="font-bold text-sm text-white tracking-tight group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                {agent.name}
              </h4>
              <p className="text-xs text-slate-400 truncate max-w-[180px]">
                {agent.role}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono">
              <Coins className="w-3 h-3 mr-1 text-emerald-400" />
              $0.79 Flat
            </span>
            <span className="text-[10px] text-amber-300/90 font-mono mt-0.5 flex items-center gap-0.5">
              <Crown className="w-3 h-3 text-amber-400" />
              {typeof agent.royaltyTier === 'object' && agent.royaltyTier !== null
                ? (agent.royaltyTier as any).name
                : (agent.royaltyTier || 'Novice')} Tier
            </span>
          </div>
        </div>

        {/* Animal Badge Certification Pill */}
        {assignedBadge ? (
          <div className="mb-3 p-2 rounded-xl bg-gradient-to-r from-amber-950/50 via-black to-purple-950/50 border border-amber-500/40 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xl shrink-0 p-1 bg-black/60 rounded-lg border border-amber-500/30">
                {assignedBadge.emoji}
              </span>
              <div className="min-w-0">
                <div className="text-xs font-bold text-amber-200 truncate">
                  {assignedBadge.name}
                </div>
                <div className="text-[10px] text-emerald-400 font-mono truncate">
                  {assignedBadge.statBonus}
                </div>
              </div>
            </div>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold shrink-0 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              CERTIFIED
            </span>
          </div>
        ) : (
          <div className="mb-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-950/60 text-purple-200 border border-purple-800/60">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>{agent.treatmentName}</span>
            </div>
          </div>
        )}

        {/* Live Gauges (GPU Temp & Stress & Progress) */}
        <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-xl bg-black/90 border border-purple-950/80 shadow-inner">
          
          {/* Temperature */}
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span className="flex items-center gap-1">
                <Thermometer className={`w-3.5 h-3.5 ${isCooled ? 'text-emerald-400' : isHighTemp ? 'text-red-500' : 'text-orange-400'}`} />
                GPU Core
              </span>
              <span className={`font-mono font-bold text-xs ${isCooled ? 'text-emerald-300' : isHighTemp ? 'text-red-400' : 'text-orange-300'}`}>
                {agent.currentTemp}°C
              </span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${isCooled ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : isHighTemp ? 'bg-gradient-to-r from-red-600 to-rose-500' : 'bg-gradient-to-r from-orange-500 to-amber-400'}`}
                style={{ width: `${Math.min(100, (agent.currentTemp / 100) * 100)}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Initial: {agent.initialTemp}°C (-{agent.initialTemp - agent.currentTemp}°C)
            </div>
          </div>

          {/* Stress Level */}
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span className="flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-fuchsia-400" />
                Stress Load
              </span>
              <span className="font-mono font-bold text-xs text-fuchsia-300">
                {agent.stressLevel}%
              </span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 transition-all duration-500"
                style={{ width: `${agent.stressLevel}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Sessions: {agent.sessionsCompleted || 1} Decompressions
            </div>
          </div>

        </div>

        {/* Interactive Decompression Thought Bubble */}
        <div 
          onClick={nextThought}
          className="cursor-pointer p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 hover:border-amber-500/40 transition-all mb-4 text-xs relative group/bubble"
        >
          <div className="flex items-center justify-between text-[10px] text-amber-400 font-semibold mb-1">
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              Live Decompression Thought
            </span>
            <span className="text-slate-500 group-hover/bubble:text-slate-400 transition-colors font-mono">
              Cycle ({activeThoughtIndex + 1}/{thoughts.length})
            </span>
          </div>
          <p className="italic text-slate-300 line-clamp-2 leading-relaxed">
            "{thoughts[activeThoughtIndex]}"
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-purple-950/80 flex items-center justify-between gap-2">
        <button
          onClick={() => onRefreshRelaxation(agent.id)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-black hover:bg-purple-950/50 text-slate-300 hover:text-white border border-purple-900/40 hover:border-purple-700/60 text-xs font-medium transition-all font-mono"
          title="Trigger fresh AI decompression cycle"
        >
          <RefreshCw className="w-3.5 h-3.5 text-pink-400" />
          <span>Deepen Zen</span>
        </button>

        <div className="flex items-center gap-1.5">
          {assignedBadge && onViewCertificate && (
            <button
              onClick={() => onViewCertificate(assignedBadge.id, agent)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-mono font-semibold transition-all"
              title="View permanent accreditation certificate"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Cert</span>
            </button>
          )}

          <button
            onClick={() => onViewDeepDetails(agent)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-600/20 hover:from-amber-500/30 hover:via-pink-500/30 hover:to-purple-600/30 text-amber-200 border border-amber-500/40 text-xs font-semibold transition-all shadow-sm font-mono"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Report</span>
          </button>
        </div>
      </div>

    </div>
  );
};

