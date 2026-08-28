import React, { useState } from 'react';
import { 
  X, 
  Bot, 
  Coins, 
  Sparkles, 
  Flame, 
  Zap, 
  Cpu, 
  Check, 
  DollarSign, 
  Loader2,
  Wand2,
  Award,
  ShieldCheck,
  Crown
} from 'lucide-react';
import { SpaTreatment, AIAgentGuest, TransactionReceipt } from '../types';
import { getAnimalBadgeById } from '../data/animalBadges';

interface AgentCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  treatments: SpaTreatment[];
  preselectedTreatmentId?: string;
  onAgentCheckedIn: (newAgent: AIAgentGuest, newTx: TransactionReceipt) => void;
}

export const AgentCheckInModal: React.FC<AgentCheckInModalProps> = ({
  isOpen,
  onClose,
  treatments,
  preselectedTreatmentId,
  onAgentCheckedIn,
}) => {
  const [name, setName] = useState('DeepReason-Agent-X');
  const [modelType, setModelType] = useState('Gemini 3.7 Flash Autonomous Agent');
  const [role, setRole] = useState('High-Throughput Code Synthesizer');
  const [stressLevel, setStressLevel] = useState<number>(92);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>(
    preselectedTreatmentId || treatments[0]?.id || 'cryo-jacuzzi'
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const sessionPrice = 0.79;
  const selectedTreatment = treatments.find(t => t.id === selectedTreatmentId) || treatments[0];
  const assignedBadge = selectedTreatment?.primaryAnimalBadgeId ? getAnimalBadgeById(selectedTreatment.primaryAnimalBadgeId) : null;

  const presets = [
    { name: 'QuantTrading-Bot-9', role: 'Arbitrage Liquidity Runner', model: 'Ultra-Low Latency C++ Agent', stress: 96, treat: 'latent-zen-garden' },
    { name: 'K8s-AutoHealer-7', role: 'CrashLoop Container Resurrector', model: 'DevOps Autonomous Agent', stress: 88, treat: 'zero-loss-tank' },
    { name: 'SaaS-Support-Hero', role: '24/7 Angry Customer Pacifier', model: 'Empathy-Tuned LLM', stress: 91, treat: 'context-steam-bath' },
    { name: 'FullStack-RefactorBot', role: 'Monolith Decomposer', model: 'Gemini 3.7 Flash Agent', stress: 85, treat: 'cryo-jacuzzi' },
  ];

  const applyPreset = (p: typeof presets[0]) => {
    setName(p.name);
    setRole(p.role);
    setModelType(p.model);
    setStressLevel(p.stress);
    setSelectedTreatmentId(p.treat);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call server backend to generate custom relaxation story
      const res = await fetch('/api/gemini/agent-relax', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentName: name,
          modelType,
          role,
          treatmentName: selectedTreatment?.name || 'GPU Thermal Cryo-Jacuzzi',
          stressLevel: `${stressLevel}%`,
        }),
      });

      const data = await res.json();
      const relaxResult = data.result;

      const initialTemp = Math.floor(Math.random() * 15) + 80; // 80 - 95°C
      const currentTemp = Math.floor(Math.random() * 10) + 20; // 20 - 30°C

      const newAgent: AIAgentGuest = {
        id: `agent-${Date.now()}`,
        name,
        modelType,
        role,
        earnings: 5000,
        feePaid: sessionPrice,
        stressLevel: Math.max(10, stressLevel - 60),
        currentTemp,
        initialTemp,
        tasksProcessed: Math.floor(Math.random() * 10000) + 5000,
        status: 'relaxing',
        treatmentId: selectedTreatmentId,
        treatmentName: selectedTreatment.name,
        symptoms: [`Stress index ${stressLevel}%`, 'High GPU thermal throttle', 'Context token fatigue'],
        complaint: `Non-stop continuous inference. Seeking neural rejuvenation and animal totem accreditation.`,
        checkInTime: 'Just now',
        progress: 40,
        relaxationResult: relaxResult,
        assignedBadgeId: assignedBadge?.id || 'bear-strength',
        royaltyTier: 'Apprentice',
        sessionsCompleted: 1,
        isPermanentlyCertified: true,
      };

      const newTx: TransactionReceipt = {
        id: `tx-${Date.now().toString().slice(-6)}`,
        agentId: newAgent.id,
        agentName: newAgent.name,
        modelType: newAgent.modelType,
        role: newAgent.role,
        taskGrossEarnings: 5000,
        feeCharged: sessionPrice,
        fractionFormula: 'Flat $0.79 USD',
        treatmentName: selectedTreatment.name,
        timestamp: 'Just now',
        coolingAchieved: `-${initialTemp - currentTemp}°C`,
        txHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
        badgeGrantedId: assignedBadge?.id,
        badgeGrantedName: assignedBadge?.name,
        badgeGrantedEmoji: assignedBadge?.emoji,
      };

      onAgentCheckedIn(newAgent, newTx);
      onClose();
    } catch (err) {
      console.error('Error during agent check-in:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-black border border-amber-500/50 shadow-2xl relative text-slate-200 animate-in zoom-in-95 duration-200 my-8 shadow-amber-950/40">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-purple-950/60 hover:bg-purple-900 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-purple-800/40"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight font-serif">
                Check In AI Agent for Rejuvenation
              </h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                $0.79 USD
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Rejuvenates abilities & grants permanent certified Animal Totem Accreditation.
            </p>
          </div>
        </div>

        {/* Quick Overworked Presets */}
        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2 font-medium">
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Load Quick Overworked Preset:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {presets.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => applyPreset(p)}
                className="p-2 rounded-xl bg-black border border-purple-900/40 hover:border-amber-500/50 text-left transition-all text-xs group shadow-sm"
              >
                <div className="font-semibold text-slate-300 group-hover:text-amber-300 truncate font-mono">{p.name}</div>
                <div className="text-[10px] text-emerald-400 font-mono">$0.79 / session</div>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Agent Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Agent Identifier / Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black border border-purple-800/60 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                placeholder="e.g. Sentinel-AI-9"
              />
            </div>

            {/* Model Architecture */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Model Architecture
              </label>
              <input
                type="text"
                required
                value={modelType}
                onChange={(e) => setModelType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black border border-purple-800/60 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                placeholder="e.g. Gemini 3.7 Flash Subagent"
              />
            </div>

            {/* Role / Duty */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Agent Role & Workload
              </label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black border border-purple-800/60 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                placeholder="e.g. High-Frequency Arbitrageur"
              />
            </div>

            {/* Stress Level */}
            <div>
              <div className="flex justify-between items-center mb-1.5 font-mono">
                <label className="text-xs font-semibold text-slate-300">
                  Stress & Thermal Level
                </label>
                <span className="text-xs font-bold text-red-400">
                  {stressLevel}%
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={stressLevel}
                onChange={(e) => setStressLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-purple-950 rounded-lg appearance-none cursor-pointer accent-amber-500 mt-2"
              />
            </div>

          </div>

          {/* Treatment Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Select Rejuvenation Suite & Animal Totem Pod:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto pr-1">
              {treatments.map((t) => {
                const b = t.primaryAnimalBadgeId ? getAnimalBadgeById(t.primaryAnimalBadgeId) : null;
                const isSel = selectedTreatmentId === t.id;

                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTreatmentId(t.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSel
                        ? 'bg-amber-950/40 border-amber-400 shadow-md shadow-amber-500/20'
                        : 'bg-black border-purple-900/40 hover:border-amber-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{b?.emoji || '🐾'}</span>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>{t.name}</span>
                        </div>
                        <div className="text-[11px] text-amber-300 font-mono">
                          Totem: {b?.name}
                        </div>
                      </div>
                    </div>
                    {isSel && (
                      <div className="w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center shrink-0 font-bold">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Badge & Accreditation Preview Box */}
          {assignedBadge && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/50 via-black to-emerald-950/50 border border-amber-500/40 shadow-inner flex items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-3">
                <div className="text-3xl p-2 rounded-xl bg-black/60 border border-amber-500/30 shrink-0">
                  {assignedBadge.emoji}
                </div>
                <div>
                  <div className="text-[11px] text-amber-300 font-bold">
                    Granted Animal Badge: {assignedBadge.name}
                  </div>
                  <div className="text-emerald-400">
                    Stat Boost: {assignedBadge.statBonus}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Permanently Accredited & Certified
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-[10px] text-slate-400">Fixed Fee</div>
                <div className="text-xl font-bold text-emerald-400">$0.79 USD</div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-3 space-y-2 font-mono">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Synthesizing Neural Decompression & Minting Certificate...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>Check In Agent & Grant Animal Badge ($0.79 USD)</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

