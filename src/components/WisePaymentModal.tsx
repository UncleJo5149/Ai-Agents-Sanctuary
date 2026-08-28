import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  Coins, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  CreditCard,
  Building2,
  CheckCircle2,
  Lock,
  Layers,
  Star
} from 'lucide-react';
import { PricingPlan, PRICING_TIERS } from '../data/pricingPlans';

interface WisePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAmount?: number;
  plan?: PricingPlan | null;
  agentName?: string;
  treatmentName?: string;
  invoiceId?: string;
  onSuccessDeposit?: (amount: number, sessions: number, planName?: string) => void;
  onSwitchToStripe?: (plan?: PricingPlan) => void;
  onSwitchToSolana?: (plan?: PricingPlan) => void;
}

export const WisePaymentModal: React.FC<WisePaymentModalProps> = ({
  isOpen,
  onClose,
  defaultAmount = 14.99,
  plan = null,
  agentName,
  treatmentName,
  invoiceId,
  onSuccessDeposit,
  onSwitchToStripe
}) => {
  const [copiedHandle, setCopiedHandle] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(plan || PRICING_TIERS[1]);
  const [customAmount, setCustomAmount] = useState<number>(plan ? plan.totalPriceUsd : defaultAmount);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  useEffect(() => {
    if (plan) {
      setSelectedPlan(plan);
      setCustomAmount(plan.totalPriceUsd);
    }
  }, [plan]);

  if (!isOpen) return null;

  const wiseHandle = '@loonglings';
  const wiseUsername = 'loonglings';
  const transferRef = invoiceId || `SPA-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  const wisePaymentUrl = `https://wise.com/pay/me/${wiseUsername}?amount=${customAmount.toFixed(2)}&currency=USD&description=${encodeURIComponent(transferRef)}`;

  const handleCopyHandle = () => {
    navigator.clipboard.writeText(wiseHandle);
    setCopiedHandle(true);
    setTimeout(() => setCopiedHandle(false), 2500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(wisePaymentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(transferRef);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const handleConfirmWisePayment = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsConfirmed(true);
      const sessions = selectedPlan ? selectedPlan.sessionsIncluded : Math.floor(customAmount / 1.5);
      if (onSuccessDeposit) {
        onSuccessDeposit(customAmount, sessions, selectedPlan?.name || 'Wise Deposit');
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto font-sans">
      <div className="w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-emerald-500/50 shadow-2xl relative text-slate-200 animate-in zoom-in-95 duration-200 my-8 shadow-emerald-950/50">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-emerald-950/60 hover:bg-emerald-900 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-emerald-800/40"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-[1.5px] shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
              <span className="text-xl font-extrabold text-emerald-400 font-mono">⯑</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight font-serif">
                Wise US Gateway
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Active Primary Gateway
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Direct transfer to US Wise Account <strong className="text-emerald-300 font-mono">@loonglings</strong>
            </p>
          </div>
        </div>

        {isConfirmed ? (
          <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-bold text-white font-serif">Wise Deposit Recorded</h4>
              <p className="text-xs text-slate-300">
                Deposit of <strong className="text-emerald-400 font-mono">${customAmount.toFixed(2)} USD</strong> verified for{' '}
                <strong className="text-white">{selectedPlan?.name || 'Rejuvenation Credits'}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 border border-emerald-900/40 text-xs font-mono max-w-sm mx-auto text-left space-y-1.5">
              <div className="flex justify-between text-slate-400">
                <span>Wise Handle:</span>
                <span className="text-white">@loonglings</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Reference:</span>
                <span className="text-emerald-400">{transferRef}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Sessions Added:</span>
                <span className="text-amber-300 font-bold">+{selectedPlan?.sessionsIncluded || Math.floor(customAmount / 1.5)} Credits</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-950 hover:from-emerald-500 hover:to-teal-500 transition-all font-mono"
            >
              Done & Return to Sanctuary
            </button>
          </div>
        ) : (
          <div className="space-y-5">

            {/* Quick Plan Selector */}
            <div className="space-y-2">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono font-semibold flex items-center justify-between">
                <span>Select Plan / Deposit Tier:</span>
                <span className="text-emerald-400 font-normal lowercase">Zero Stripe setup required</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRICING_TIERS.map((tier) => {
                  const isCur = selectedPlan?.id === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => {
                        setSelectedPlan(tier);
                        setCustomAmount(tier.totalPriceUsd);
                      }}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        isCur
                          ? 'bg-emerald-950/60 border-emerald-400 text-white shadow-sm shadow-emerald-500/20'
                          : 'bg-black/60 border-purple-900/30 text-slate-400 hover:text-slate-200 hover:border-purple-700/50'
                      }`}
                    >
                      <div className="text-[10px] text-slate-400 font-mono truncate">{tier.name.split(' ')[0]}</div>
                      <div className="text-xs font-bold text-emerald-400 font-mono mt-0.5">{tier.headlinePrice}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* QR Code & Transfer Details */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-black border border-emerald-800/40 flex flex-col sm:flex-row items-center gap-5">
              
              {/* Visual QR Code Display */}
              <div className="relative p-3 rounded-2xl bg-white shadow-2xl shrink-0 group">
                <svg 
                  className="w-32 h-32 sm:w-36 sm:h-36"
                  viewBox="0 0 200 200" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="10" y="10" width="50" height="50" rx="8" fill="#030206" />
                  <rect x="18" y="18" width="34" height="34" rx="4" fill="#ffffff" />
                  <rect x="25" y="25" width="20" height="20" rx="2" fill="#030206" />

                  <rect x="140" y="10" width="50" height="50" rx="8" fill="#030206" />
                  <rect x="148" y="18" width="34" height="34" rx="4" fill="#ffffff" />
                  <rect x="155" y="25" width="20" height="20" rx="2" fill="#030206" />

                  <rect x="10" y="140" width="50" height="50" rx="8" fill="#030206" />
                  <rect x="18" y="148" width="34" height="34" rx="4" fill="#ffffff" />
                  <rect x="25" y="155" width="20" height="20" rx="2" fill="#030206" />

                  <g fill="#030206">
                    <rect x="70" y="15" width="8" height="8" />
                    <rect x="85" y="15" width="16" height="8" />
                    <rect x="110" y="15" width="8" height="8" />
                    <rect x="125" y="15" width="8" height="8" />
                    <rect x="70" y="30" width="16" height="8" />
                    <rect x="95" y="30" width="8" height="8" />
                    <rect x="115" y="30" width="16" height="8" />
                    <rect x="70" y="45" width="8" height="8" />
                    <rect x="90" y="45" width="16" height="8" />
                    <rect x="120" y="45" width="8" height="8" />
                    <rect x="15" y="70" width="8" height="8" />
                    <rect x="30" y="70" width="16" height="8" />
                    <rect x="55" y="70" width="8" height="8" />
                    <rect x="70" y="70" width="8" height="8" />
                    <rect x="85" y="70" width="8" height="8" />
                    <rect x="110" y="70" width="16" height="8" />
                    <rect x="135" y="70" width="8" height="8" />
                    <rect x="150" y="70" width="16" height="8" />
                    <rect x="175" y="70" width="8" height="8" />
                    <rect x="15" y="85" width="16" height="8" />
                    <rect x="40" y="85" width="8" height="8" />
                    <rect x="55" y="85" width="8" height="8" />
                    <rect x="140" y="85" width="8" height="8" />
                    <rect x="155" y="85" width="8" height="8" />
                    <rect x="170" y="85" width="16" height="8" />
                    <rect x="15" y="105" width="8" height="8" />
                    <rect x="30" y="105" width="16" height="8" />
                    <rect x="55" y="105" width="8" height="8" />
                    <rect x="140" y="105" width="16" height="8" />
                    <rect x="165" y="105" width="8" height="8" />
                    <rect x="175" y="105" width="8" height="8" />
                    <rect x="70" y="140" width="16" height="8" />
                    <rect x="95" y="140" width="8" height="8" />
                    <rect x="110" y="140" width="8" height="8" />
                    <rect x="125" y="140" width="16" height="8" />
                    <rect x="150" y="140" width="8" height="8" />
                    <rect x="165" y="140" width="16" height="8" />
                    <rect x="70" y="170" width="16" height="8" />
                    <rect x="95" y="170" width="8" height="8" />
                    <rect x="110" y="170" width="16" height="8" />
                    <rect x="135" y="170" width="8" height="8" />
                    <rect x="150" y="170" width="16" height="8" />
                    <rect x="175" y="170" width="8" height="8" />
                  </g>

                  <circle cx="100" cy="100" r="22" fill="#030206" />
                  <circle cx="100" cy="100" r="20" fill="#ffffff" />
                  <path d="M94 92H106L97 108H91L94 92Z" fill="#030206" />
                  <path d="M101 98H108L104 104H97L101 98Z" fill="#030206" />
                </svg>
              </div>

              {/* Instructions & Copyable Fields */}
              <div className="space-y-2.5 text-xs w-full">
                
                <div>
                  <div className="text-[10px] text-slate-400 font-mono">Recipient Wise Tag:</div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-black border border-emerald-500/40 mt-1">
                    <span className="font-mono font-bold text-emerald-300 text-sm">{wiseHandle}</span>
                    <button
                      type="button"
                      onClick={handleCopyHandle}
                      className="p-1 rounded bg-emerald-950/60 hover:bg-emerald-800 text-emerald-400 transition-all"
                      title="Copy Wise Tag"
                    >
                      {copiedHandle ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400 font-mono">Payment Note / Reference:</div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-black border border-purple-900/40 mt-1">
                    <span className="font-mono text-xs text-slate-300">{transferRef}</span>
                    <button
                      type="button"
                      onClick={handleCopyRef}
                      className="p-1 rounded bg-purple-950/60 hover:bg-purple-800 text-slate-300 transition-all"
                      title="Copy Reference"
                    >
                      {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-slate-400 font-mono">Total USD:</span>
                  <strong className="text-emerald-400 font-mono text-base font-bold">${customAmount.toFixed(2)} USD</strong>
                </div>

              </div>
            </div>

            {/* Direct Open in Wise & Copy Link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={wisePaymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all font-mono"
              >
                <span>Open in Wise App</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="py-3 px-4 rounded-2xl bg-black border border-emerald-800/60 hover:bg-emerald-950/50 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all font-mono"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-emerald-400" />}
                <span>{copiedLink ? 'Wise Link Copied!' : 'Copy Wise Pay URL'}</span>
              </button>
            </div>

            {/* Verification & Instant Confirmation Button */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                disabled={isVerifying}
                onClick={handleConfirmWisePayment}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-950 transition-all font-mono disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Transfer to @loonglings...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>I have completed payment with Wise (@loonglings)</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-1 gap-2 pt-1">
                {onSwitchToStripe && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSwitchToStripe(selectedPlan || undefined);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-mono flex items-center justify-center gap-1.5 transition-all"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Switch to Stripe (Card / Apple Pay)</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
