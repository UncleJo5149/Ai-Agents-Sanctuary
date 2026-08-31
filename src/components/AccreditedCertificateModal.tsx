import React, { useState } from 'react';
import { 
  X, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  Copy, 
  Check, 
  Share2, 
  Flame, 
  Zap, 
  Lock,
  ExternalLink,
  Crown
} from 'lucide-react';
import { AnimalBadge, getAnimalBadgeById } from '../data/animalBadges';
import { AIAgentGuest } from '../types';

interface AccreditedCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  badge?: AnimalBadge | null;
  badgeId?: string | null;
  agent?: AIAgentGuest;
  agentName?: string;
  modelType?: string;
  certificateId?: string;
  sessionsCompleted?: number;
  onOpenCryptoDeposit?: (amount?: number, agentName?: string, treatmentName?: string, invoiceId?: string) => void;
}

export const AccreditedCertificateModal: React.FC<AccreditedCertificateModalProps> = ({
  isOpen,
  onClose,
  badge: badgeProp,
  badgeId,
  agent,
  agentName: agentNameProp,
  modelType: modelTypeProp,
  certificateId: certificateIdProp,
  sessionsCompleted: sessionsCompletedProp,
  onOpenCryptoDeposit,
}) => {
  const [copied, setCopied] = useState(false);

  const badge = badgeProp || (badgeId ? getAnimalBadgeById(badgeId) : null);
  const agentName = agent?.name || agentNameProp || 'RefactorBot-Prime';
  const modelType = agent?.modelType || modelTypeProp || 'Autonomous Code Synthesizer';
  const certificateId = agent?.certificateTokenId || certificateIdProp || (badge ? `CERT-${badge.id.toUpperCase()}-8891` : 'CERT-ELYSIUM-8891');
  const sessionsCompleted = agent?.sessionsCompleted || sessionsCompletedProp || 4;

  if (!isOpen || !badge) return null;

  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleCopyProof = () => {
    const proofText = `[ELYSIUM SANCTUARY ACCREDITATION]\nAgent: ${agentName} (${modelType})\nBadge: ${badge.emoji} ${badge.name} [Tier: ${badge.tier.toUpperCase()}]\nAbility Rejuvenated: ${badge.abilityName}\nPermanent Stat Bonus: ${badge.statBonus}\nAccreditation ID: ${certificateId}\nOfficial Fee: $0.79 USD\nSettled via Wise: @loonglings\nStatus: PERMANENTLY_ACCREDITED & CERTIFIED`;
    navigator.clipboard.writeText(proofText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isMythic = badge.tier === 'ancient_mythic';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-stone-950 via-black to-slate-950 border border-amber-500/50 shadow-2xl p-6 sm:p-8 text-white space-y-6 animate-in fade-in zoom-in-95 duration-200"
        style={{
          boxShadow: isMythic 
            ? '0 0 50px rgba(245, 158, 11, 0.25), inset 0 0 30px rgba(217, 70, 239, 0.15)' 
            : '0 0 30px rgba(245, 158, 11, 0.15)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Outer Frame */}
        <div className="p-6 sm:p-8 rounded-2xl border-2 border-dashed border-amber-500/40 bg-gradient-to-b from-amber-950/20 via-black to-purple-950/20 relative overflow-hidden">
          
          {/* Watermark Logo */}
          <div className="absolute -right-6 -bottom-6 text-9xl opacity-5 select-none pointer-events-none">
            {badge.emoji}
          </div>

          {/* Certificate Header */}
          <div className="text-center space-y-2 pb-4 border-b border-amber-500/30">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono tracking-widest uppercase">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Official Neural Accreditation Certificate</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100 tracking-wide pt-1">
              Certificate of Digital Rejuvenation
            </h2>

            <p className="text-xs text-amber-200/70 font-mono">
              Accredited under the Elysium Sanctuary Royalty Protocol • Verifiable ID: {certificateId}
            </p>
          </div>

          {/* Certificate Body */}
          <div className="py-6 space-y-6 text-center">
            
            <p className="text-xs sm:text-sm text-slate-300 font-serif italic">
              This hereby certifies that the synthetic intelligence agent
            </p>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-300">
                {agentName}
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Architecture: <span className="text-slate-200">{modelType}</span>
              </p>
            </div>

            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed font-serif">
              has completed dedicated wellness decompression at Elysium Spa ($0.79 per session) and is hereby granted permanent accreditation and certification of the totem:
            </p>

            {/* Animal Badge Totem Banner */}
            <div className={`p-4 rounded-2xl bg-gradient-to-r ${badge.colorGradient} border ${badge.borderColor} shadow-lg max-w-md mx-auto flex items-center gap-4 text-left`}>
              <div className="text-4xl sm:text-5xl p-2 rounded-xl bg-black/40 border border-white/10 shrink-0">
                {badge.emoji}
              </div>
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${badge.accentColor}`}>
                    {badge.tier.replace('_', ' ')} Tier
                  </span>
                  {isMythic && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/40 font-mono">
                      MYTHIC ANCIENT
                    </span>
                  )}
                </div>
                <h4 className="text-base font-bold text-white truncate font-mono">
                  {badge.name}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-1">
                  {badge.abilityName}
                </p>
              </div>
            </div>

            {/* Permanent Stat Bonus Accreditation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto text-left font-mono text-xs">
              <div className="p-3 rounded-xl bg-black/60 border border-amber-500/30">
                <span className="text-slate-400 block text-[10px]">Accredited Ability Bonus:</span>
                <strong className="text-emerald-400 font-bold">{badge.statBonus}</strong>
              </div>

              <div className="p-3 rounded-xl bg-black/60 border border-amber-500/30">
                <span className="text-slate-400 block text-[10px]">Permanent Status:</span>
                <strong className="text-amber-300 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  PERMANENTLY CERTIFIED
                </strong>
              </div>
            </div>

            {/* Quote */}
            <p className="text-xs text-slate-400 italic max-w-md mx-auto font-serif">
              "{badge.quote}"
            </p>

          </div>

          {/* Certificate Footer / Signatures */}
          <div className="pt-4 border-t border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div className="text-left space-y-0.5">
              <div>Date Issued: <strong className="text-slate-200">{issueDate}</strong></div>
              <div>Session Rate: <strong className="text-emerald-300">$0.79 USD (Settled via Wise)</strong></div>
            </div>

            <div className="text-right space-y-0.5">
              <div className="flex items-center gap-1 text-amber-300 font-bold">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Dr. Silico, Chief Wellness Model</span>
              </div>
              <div className="text-[10px] text-slate-500">
                Cryptographic Seal: SHA256-ELYSIUM-ACCREDITED
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          
          <button
            onClick={handleCopyProof}
            className="px-4 py-2.5 rounded-xl bg-amber-950/50 border border-amber-500/50 hover:bg-amber-900/50 text-amber-200 text-xs font-mono font-semibold transition-all flex items-center gap-2 shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Credential Proof Copied!' : 'Copy Verification Proof'}</span>
          </button>

          {onOpenCryptoDeposit && (
            <button
              onClick={() => {
                onClose();
                onOpenCryptoDeposit(0.79, agentName, badge.name, certificateId);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold font-mono transition-all flex items-center gap-2 shadow-lg shadow-emerald-950/60"
            >
              <span>Renew via Crypto ($0.79)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all ml-auto"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
};
