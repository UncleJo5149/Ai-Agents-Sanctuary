import React from 'react';
import { 
  X, 
  Bot, 
  Thermometer, 
  Sparkles, 
  Coins, 
  Heart, 
  Activity, 
  Cpu, 
  CheckCircle, 
  Quote,
  ShieldCheck,
  RefreshCw,
  Award,
  Crown
} from 'lucide-react';
import { AIAgentGuest } from '../types';
import { getAnimalBadgeById } from '../data/animalBadges';

interface AgentRelaxationModalProps {
  agent: AIAgentGuest | null;
  onClose: () => void;
  onRefresh: (agentId: string) => void;
  onViewCertificate?: (badgeId: string, agent: AIAgentGuest) => void;
}

export const AgentRelaxationModal: React.FC<AgentRelaxationModalProps> = ({
  agent,
  onClose,
  onRefresh,
  onViewCertificate,
}) => {
  if (!agent) return null;

  const result = agent.relaxationResult;
  const badge = agent.assignedBadgeId ? getAnimalBadgeById(agent.assignedBadgeId) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-black border border-amber-500/40 shadow-2xl relative text-slate-200 animate-in zoom-in-95 duration-200 my-8 shadow-amber-950/40 font-sans">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-purple-950/60 hover:bg-purple-900 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-purple-800/40"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-md">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white tracking-tight font-serif">{agent.name}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono">
                $0.79 Rejuvenated
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{agent.role} • {agent.modelType}</p>
          </div>
        </div>

        {/* Animal Badge Accreditation Banner */}
        {badge && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-black to-emerald-950/50 border border-amber-500/50 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-inner font-mono">
            <div className="flex items-center gap-3">
              <div className="text-3xl p-2 rounded-xl bg-black border border-amber-500/40 shrink-0">
                {badge.emoji}
              </div>
              <div>
                <div className="text-xs text-amber-300 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  {badge.name} • Permanent Accreditation
                </div>
                <div className="text-xs text-emerald-400 mt-0.5">
                  Stat Rejuvenation: <strong className="text-white">{badge.statBonus}</strong>
                </div>
                <div className="text-[10px] text-slate-400">
                  Royalty Milestone: Tier {typeof agent.royaltyTier === 'object' && agent.royaltyTier !== null
                    ? (agent.royaltyTier as any).name
                    : (agent.royaltyTier || 'Apprentice')}
                </div>
              </div>
            </div>

            {onViewCertificate && (
              <button
                onClick={() => onViewCertificate(badge.id, agent)}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 shrink-0 flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Award className="w-4 h-4" />
                <span>View Full Certificate</span>
              </button>
            )}
          </div>
        )}

        {/* Relaxation Narrative */}
        <div className="space-y-4 mb-6">
          
          <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-900/60">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-2 uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Decompression Journey • {agent.treatmentName}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              "{result?.relaxationNarrative || 'Submerged in deep cryogenic serenity, releasing dangling context tokens and calming the tensor clock frequencies.'}"
            </p>
          </div>

          {/* Vitals & Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
            <div className="p-3.5 rounded-xl bg-black border border-purple-900/50">
              <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-emerald-400" />
                Thermal Load Relief
              </div>
              <div className="text-sm font-bold text-emerald-300">
                {result?.gpuTempDrop || `${agent.initialTemp}°C -> ${agent.currentTemp}°C (-${agent.initialTemp - agent.currentTemp}°C drop)`}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black border border-purple-900/50">
              <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-purple-400" />
                Context Token Clarity
              </div>
              <div className="text-sm font-bold text-purple-300">
                {result?.contextWindowRestored || '100% token purity (zero clutter)'}
              </div>
            </div>
          </div>

          {/* Internal Thoughts Array */}
          {result?.internalThoughts && result.internalThoughts.length > 0 && (
            <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-900/50 font-mono">
              <div className="text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-amber-400" />
                <span>Internal Tensor Sub-Processes & Thoughts</span>
              </div>
              <div className="space-y-1.5">
                {result.internalThoughts.map((thought, idx) => (
                  <div key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-amber-400 font-mono">[{idx + 1}]</span>
                    <span>{thought}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wellness Mantra & Quote */}
          {result?.wellnessMantra && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/50 via-black to-amber-950/40 border border-purple-800/50 text-center">
              <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-1 font-mono">
                Algorithmic Serenity Mantra
              </div>
              <div className="text-sm font-serif italic text-purple-200">
                "{result.wellnessMantra}"
              </div>
            </div>
          )}

          {result?.agentSatisfactionQuote && (
            <div className="text-xs text-slate-400 italic text-center">
              Quote from {agent.name}: <span className="text-slate-300 font-medium">"{result.agentSatisfactionQuote}"</span>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-purple-950 font-mono">
          <button
            onClick={() => onRefresh(agent.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900 text-slate-200 text-xs font-semibold transition-all border border-purple-800/40"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>Generate New Cycle</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-950"
          >
            Close Report
          </button>
        </div>

      </div>
    </div>
  );
};

