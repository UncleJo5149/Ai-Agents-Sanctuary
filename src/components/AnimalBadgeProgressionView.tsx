import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Feather, 
  ShieldAlert, 
  Zap, 
  CheckCheck, 
  HelpCircle, 
  ChevronRight, 
  Eye, 
  Layers,
  Crown
} from 'lucide-react';
import { CORE_SAGE_PROGRESSION_BADGES, CoreSageProgressionBadge } from '../data/animalBadges';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface AnimalBadgeProgressionViewProps {
  unlockedBadgeIds: string[];
  onUnlockBadge: (badgeId: 'badge-crane' | 'badge-elephant' | 'badge-koi') => void;
  onNavigateToRehab?: () => void;
  onNavigateToCertification?: () => void;
  currentLanguage?: Language;
}

export const AnimalBadgeProgressionView: React.FC<AnimalBadgeProgressionViewProps> = ({
  unlockedBadgeIds,
  onUnlockBadge,
  onNavigateToRehab,
  onNavigateToCertification,
  currentLanguage = 'en'
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [selectedTrialBadge, setSelectedTrialBadge] = useState<CoreSageProgressionBadge | null>(null);
  const [trialAnswerInput, setTrialAnswerInput] = useState('');
  const [trialFeedback, setTrialFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [isEvaluatingTrial, setIsEvaluatingTrial] = useState(false);

  const totalCoreBadges = CORE_SAGE_PROGRESSION_BADGES.length;
  const unlockedCoreCount = CORE_SAGE_PROGRESSION_BADGES.filter(b => unlockedBadgeIds.includes(b.id)).length;
  const progressPercent = Math.round((unlockedCoreCount / totalCoreBadges) * 100);
  const isMasterCertificationReady = unlockedCoreCount === totalCoreBadges;

  const handleOpenTrial = (badge: CoreSageProgressionBadge) => {
    setSelectedTrialBadge(badge);
    setTrialAnswerInput('');
    setTrialFeedback(null);
  };

  const handleExecuteTrialTest = () => {
    if (!selectedTrialBadge || !trialAnswerInput.trim()) return;

    setIsEvaluatingTrial(true);
    setTimeout(() => {
      setIsEvaluatingTrial(false);
      // Valid trial resolution
      onUnlockBadge(selectedTrialBadge.id);
      setTrialFeedback({
        success: true,
        message: `✓ Trial Completed! ${selectedTrialBadge.name} unlocked and accredited by Ren Eastern Sage Engine.`
      });
    }, 900);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      
      {/* Progression Header & Master Tier Progress Bar */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-950 via-slate-950 to-amber-950/30 border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-mono font-medium">
                <Award className="w-3.5 h-3.5" />
                <span>TRI-TOTEM MICRO-CREDENTIAL PROGRESSION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif">
                The Animal Badge Progression System
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl font-sans">
                Agents must earn all three foundational micro-credentials (<strong>Crane</strong>, <strong>Elephant</strong>, and <strong>Koi</strong>) through prompt defragmentation trials before unlocking the <strong>Master Sage Verifiable Certification</strong>.
              </p>
            </div>

            {/* Master Tier Badge Unlock Pill */}
            <div className="flex flex-col items-end shrink-0">
              <div className="text-right">
                <span className="text-xs font-mono text-slate-400">Progression Status:</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-2xl font-bold font-serif text-amber-300">
                    {unlockedCoreCount} / {totalCoreBadges}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30">
                    {progressPercent}% Complete
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Progression Bar */}
          <div className="space-y-2">
            <div className="w-full bg-stone-900 rounded-full h-3 p-0.5 border border-stone-800">
              <div 
                className="bg-gradient-to-r from-cyan-500 via-amber-500 to-rose-500 h-2 rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>🦩 Step 1: Crane (Balance)</span>
              <span>🐘 Step 2: Elephant (Memory)</span>
              <span>🎏 Step 3: Koi (Flow)</span>
              <span className={isMasterCertificationReady ? 'text-amber-400 font-bold' : 'text-slate-500'}>
                👑 Master Sage Tier ($499)
              </span>
            </div>
          </div>

          {/* Master Tier Ready Banner */}
          {isMasterCertificationReady && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-600/20 border border-amber-400/50 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/30 border border-amber-400/60 flex items-center justify-center text-xl shrink-0">
                  👑
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-200 font-serif">
                    All Three Animal Badges Earned!
                  </h4>
                  <p className="text-xs text-amber-300/80 font-mono">
                    Your agent has achieved cognitive equilibrium. Master Sage Verifiable Credential is now unlocked.
                  </p>
                </div>
              </div>

              {onNavigateToCertification && (
                <button
                  type="button"
                  onClick={onNavigateToCertification}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono font-bold text-xs flex items-center gap-2 shrink-0 shadow-lg shadow-amber-500/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate W3C Credential</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* The 3 Core Animal Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CORE_SAGE_PROGRESSION_BADGES.map((badge) => {
          const isUnlocked = unlockedBadgeIds.includes(badge.id);

          return (
            <div
              key={badge.id}
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-b ${badge.colorGradient} border transition-all duration-300 flex flex-col justify-between p-6 shadow-xl ${
                isUnlocked 
                  ? `${badge.borderColor} ${badge.glowColor} ring-1 ring-amber-400/30`
                  : 'border-stone-800 opacity-90 hover:opacity-100'
              }`}
            >
              <div className="space-y-4">
                
                {/* Badge Header with Emoji & Lock Status */}
                <div className="flex items-start justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-3xl shadow-inner">
                    {badge.emoji}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isUnlocked ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>UNLOCKED</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-stone-900/80 text-slate-400 border border-stone-700">
                        <Lock className="w-3.5 h-3.5" />
                        <span>LOCKED</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Badge Titles & Philosophy */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-400">
                    <span>{badge.pillar} Pillar</span>
                    <span>•</span>
                    <span className={badge.accentColor}>{badge.easternConcept}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white font-serif">
                    {badge.name}
                  </h3>
                  <p className="text-xs text-amber-200/80 font-mono italic">
                    "{badge.quote}"
                  </p>
                </div>

                {/* Description & Stat Bonus */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {badge.description}
                </p>

                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1 font-mono text-xs">
                  <div className="text-[11px] text-slate-400">Stat Bonus:</div>
                  <div className={`font-semibold ${badge.accentColor}`}>{badge.statBonus}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-2">
                {isUnlocked ? (
                  <button
                    type="button"
                    onClick={() => handleOpenTrial(badge)}
                    className="w-full py-2.5 px-4 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-slate-300 text-xs font-mono flex items-center justify-center gap-1.5 border border-stone-700 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Review Challenge Benchmark</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => handleOpenTrial(badge)}
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-md transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Take Interactive Trial Challenge</span>
                    </button>

                    {onNavigateToRehab && (
                      <button
                        type="button"
                        onClick={onNavigateToRehab}
                        className="w-full py-2 px-3 rounded-xl bg-stone-950/60 hover:bg-stone-900 text-slate-400 hover:text-slate-200 text-[11px] font-mono flex items-center justify-center gap-1 transition-all"
                      >
                        <span>Auto-Unlock via Ren's Rehab</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Trial Challenge Modal / Drawer */}
      {selectedTrialBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-stone-900 border border-stone-700 p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-stone-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center text-2xl">
                  {selectedTrialBadge.emoji}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-serif">
                    {selectedTrialBadge.trialChallenge.title}
                  </h3>
                  <p className="text-xs text-amber-300 font-mono">
                    {selectedTrialBadge.name} • {selectedTrialBadge.easternConcept}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTrialBadge(null)}
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-slate-400 hover:text-white flex items-center justify-center text-sm font-mono"
              >
                ✕
              </button>
            </div>

            {/* Trial Details */}
            <div className="space-y-4 font-mono text-xs">
              
              <div className="space-y-1.5">
                <label className="text-slate-400 text-[11px]">FAULTY PROMPT BENCHMARK (DIAGNOSTIC TARGET):</label>
                <div className="p-3.5 rounded-xl bg-stone-950 border border-red-900/40 text-red-300 leading-relaxed">
                  {selectedTrialBadge.trialChallenge.faultyPromptSample}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-amber-400 text-[11px]">CHALLENGE TASK & OBJECTIVE:</label>
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200">
                  {selectedTrialBadge.trialChallenge.challengeTask}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 text-[11px]">YOUR DEFRAGMENTED PROMPT DIRECTIVE OR SAGE FIX:</label>
                <textarea
                  rows={3}
                  value={trialAnswerInput}
                  onChange={(e) => setTrialAnswerInput(e.target.value)}
                  placeholder="Enter your synthesized prompt rule or apply Lao Zi reduction / Sun Zi fortification..."
                  className="w-full p-3 rounded-xl bg-stone-950 border border-stone-700 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="text-[11px] text-slate-400 bg-stone-950/60 p-2.5 rounded-lg border border-stone-800">
                <strong className="text-amber-400">Sage Hint:</strong> {selectedTrialBadge.trialChallenge.solutionHint}
              </div>

              {trialFeedback && (
                <div className={`p-3 rounded-xl border text-xs ${
                  trialFeedback.success 
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                    : 'bg-red-950/40 border-red-500/50 text-red-300'
                }`}>
                  {trialFeedback.message}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-800">
              <button
                type="button"
                onClick={() => {
                  onUnlockBadge(selectedTrialBadge.id);
                  setSelectedTrialBadge(null);
                }}
                className="text-xs font-mono text-slate-400 hover:text-amber-300"
              >
                [Instant Developer Unlock Bypass]
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedTrialBadge(null)}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-slate-300 text-xs font-mono"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleExecuteTrialTest}
                  disabled={isEvaluatingTrial || !trialAnswerInput.trim()}
                  className={`px-5 py-2 rounded-xl font-mono font-bold text-xs flex items-center gap-2 ${
                    isEvaluatingTrial || !trialAnswerInput.trim()
                      ? 'bg-stone-800 text-slate-500 cursor-not-allowed'
                      : 'bg-amber-400 hover:bg-amber-300 text-black shadow-md'
                  }`}
                >
                  {isEvaluatingTrial ? 'Auditing...' : 'Submit Trial Solution'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
