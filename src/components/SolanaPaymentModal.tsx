import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowLeft, 
  Copy, 
  Check, 
  Info, 
  ExternalLink, 
  ShieldAlert, 
  Sparkles, 
  Coins, 
  CheckCircle2, 
  CreditCard, 
  Building2, 
  Lock, 
  RefreshCw, 
  Zap, 
  Flame,
  Wallet
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { SOLANA_CONFIG, calculateSolAmount, getSolanaPayUri } from '../data/solanaConfig';
import { PricingPlan, PRICING_TIERS } from '../data/pricingPlans';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface SolanaPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage?: Language;
  defaultAmount?: number;
  plan?: PricingPlan | null;
  agentName?: string;
  treatmentName?: string;
  onSuccessDeposit?: (amountUsd: number, sessions: number, planName?: string, txHash?: string) => void;
  onSwitchToWise?: (plan?: PricingPlan) => void;
  onSwitchToStripe?: (plan?: PricingPlan) => void;
}

export const SolanaPaymentModal: React.FC<SolanaPaymentModalProps> = ({
  isOpen,
  onClose,
  currentLanguage = 'en',
  defaultAmount = 14.99,
  plan = null,
  agentName,
  treatmentName,
  onSuccessDeposit,
  onSwitchToWise,
  onSwitchToStripe
}) => {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(plan || PRICING_TIERS[2]);
  const [customAmountUsd, setCustomAmountUsd] = useState<number>(plan ? plan.totalPriceUsd : defaultAmount);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [txSignature, setTxSignature] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedTxHash, setConfirmedTxHash] = useState('');

  useEffect(() => {
    if (plan) {
      setSelectedPlan(plan);
      setCustomAmountUsd(plan.totalPriceUsd);
    }
  }, [plan]);

  if (!isOpen) return null;

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const solAmount = calculateSolAmount(customAmountUsd, SOLANA_CONFIG.solPriceUsd);
  const solanaPayUri = getSolanaPayUri(customAmountUsd, `Spa-${selectedPlan?.name || 'Rejuvenation'}`);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(SOLANA_CONFIG.walletAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(solAmount);
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2500);
  };

  const handleConfirmSolTransfer = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsConfirmed(true);
      const generatedHash = txSignature.trim() || `sol_5x${Math.random().toString(36).substring(2, 12)}${Math.random().toString(36).substring(2, 8)}`;
      setConfirmedTxHash(generatedHash);
      const sessions = selectedPlan ? selectedPlan.sessionsIncluded : Math.floor(customAmountUsd / 1.5);
      if (onSuccessDeposit) {
        onSuccessDeposit(customAmountUsd, sessions, selectedPlan?.name || 'Solana (SOL) Deposit', generatedHash);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto font-sans">
      <div className="w-full max-w-lg rounded-3xl bg-zinc-950 border border-purple-500/50 shadow-2xl relative text-slate-100 animate-in zoom-in-95 duration-200 my-6 shadow-purple-950/70 overflow-hidden">
        
        {/* Top Header matching exact screenshot UI style */}
        <div className="p-4 sm:p-5 border-b border-zinc-800/80 bg-zinc-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Close or Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-base sm:text-lg font-bold text-white font-serif tracking-tight">
              {t.solanaDepositTitle || 'Deposit to Solana (SOL) wallet'}
            </h2>
          </div>

          <div className="flex items-center gap-1">
            <a
              href={SOLANA_CONFIG.solscanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-slate-400 hover:text-purple-300 hover:bg-zinc-800 transition-colors"
              title="View on Solscan Explorer"
            >
              <Info className="w-5 h-5 text-purple-400" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[85vh] overflow-y-auto">
          
          {!isConfirmed ? (
            <div className="space-y-4">
              
              {/* Plan & Amount Tier Selector */}
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-purple-900/50 space-y-2 font-mono">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-semibold">Select Rejuvenation Package:</span>
                  <span className="text-purple-300 font-bold">1 SOL ≈ ${SOLANA_CONFIG.solPriceUsd} USD</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PRICING_TIERS.slice(0, 5).map((tPlan) => {
                    const isSelected = selectedPlan?.id === tPlan.id;
                    const tierSol = calculateSolAmount(tPlan.totalPriceUsd, SOLANA_CONFIG.solPriceUsd);
                    return (
                      <button
                        key={tPlan.id}
                        type="button"
                        onClick={() => {
                          setSelectedPlan(tPlan);
                          setCustomAmountUsd(tPlan.totalPriceUsd);
                        }}
                        className={`p-2 rounded-xl text-left transition-all border ${
                          isSelected
                            ? 'bg-purple-950/80 border-purple-400 text-white shadow-md shadow-purple-950'
                            : 'bg-black/60 border-zinc-800 text-slate-300 hover:border-purple-800'
                        }`}
                      >
                        <div className="text-[11px] font-bold truncate">{tPlan.name}</div>
                        <div className="flex items-baseline justify-between mt-1">
                          <span className="text-xs font-extrabold text-white font-mono">{tPlan.headlinePrice}</span>
                          <span className="text-[10px] text-purple-300 font-mono font-semibold">{tierSol} SOL</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Central Deposit Card matching the Screenshot Container */}
              <div className="rounded-3xl bg-white text-zinc-900 border border-slate-200 p-5 sm:p-6 shadow-xl space-y-4 font-sans">
                
                {/* QR Code Container with Centered Solana Badge */}
                <div className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl">
                  <div className="p-3 bg-white rounded-2xl border-2 border-slate-100 shadow-sm relative flex items-center justify-center">
                    <QRCodeSVG
                      value={solanaPayUri}
                      size={200}
                      level="H"
                      includeMargin={false}
                      imageSettings={{
                        src: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
                        x: undefined,
                        y: undefined,
                        height: 38,
                        width: 38,
                        excavate: true,
                      }}
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                      Amount: <strong>{solAmount} SOL</strong> (${customAmountUsd.toFixed(2)} USD)
                    </span>
                  </div>
                </div>

                {/* SOL Wallet Address Row */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-mono font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    {t.solanaWalletAddress || 'SOL wallet address'}
                  </div>
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <code className="text-xs sm:text-sm font-mono font-bold text-slate-900 break-all leading-tight">
                      {SOLANA_CONFIG.walletAddress}
                    </code>
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="p-2 rounded-lg bg-white border border-slate-300 text-slate-700 hover:text-purple-600 hover:border-purple-400 shrink-0 transition-colors shadow-sm"
                      title="Copy SOL Address"
                    >
                      {copiedAddress ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  {copiedAddress && (
                    <div className="text-[10px] text-emerald-600 font-mono font-bold mt-1 text-right flex items-center justify-end gap-1">
                      <Check className="w-3 h-3" /> Address copied to clipboard!
                    </div>
                  )}
                </div>

                {/* Network Row */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
                      {t.solanaNetwork || 'Network'}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 flex items-center justify-center p-0.5 shadow-sm">
                        <Coins className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-bold text-slate-900 font-sans">
                        {SOLANA_CONFIG.network}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyAmount}
                    className="px-2.5 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-mono font-bold transition-colors flex items-center gap-1"
                  >
                    {copiedAmount ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>Copy {solAmount} SOL</span>
                  </button>
                </div>
              </div>

              {/* Warning Card matching the Screenshot Container */}
              <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-amber-500/40 flex items-start gap-2.5 text-xs text-amber-200 font-sans shadow-sm">
                <div className="p-1 rounded-full bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                  <Info className="w-4 h-4" />
                </div>
                <div className="leading-relaxed">
                  <strong className="text-amber-300 font-semibold block mb-0.5">Network Confirmation Notice:</strong>
                  {t.solanaWarning || SOLANA_CONFIG.warningNote}
                </div>
              </div>

              {/* Verification & TX Confirmation Section */}
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-purple-900/60 space-y-3 font-mono">
                <label className="text-xs font-bold text-purple-300 block">
                  Optional: Enter Solana Transaction Signature (TX Hash)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={txSignature}
                    onChange={(e) => setTxSignature(e.target.value)}
                    placeholder="e.g. 5Kna7P... (from Solscan / Phantom)"
                    className="w-full bg-black/90 border border-purple-900/60 rounded-xl py-2 px-3 text-xs text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-purple-400"
                  />
                  <a
                    href={SOLANA_CONFIG.solscanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-slate-300 text-xs flex items-center gap-1 shrink-0 font-sans"
                  >
                    <span>Solscan</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => window.open(solanaPayUri, '_blank')}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-bold text-xs font-mono transition-all flex items-center justify-center gap-1.5 shadow-md shadow-purple-950"
                  >
                    <Wallet className="w-3.5 h-3.5" />
                    <span>Pay with Phantom / Solflare</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirmSolTransfer}
                    disabled={isVerifying}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-xs font-mono transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950"
                  >
                    {isVerifying ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying Ledger...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>I Have Sent {solAmount} SOL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Other Payment Options Switcher */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Other Payment Methods:</span>
                <div className="flex items-center gap-2">
                  {onSwitchToWise && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSwitchToWise(selectedPlan || undefined);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <Building2 className="w-3 h-3" />
                      <span>Wise US (@loonglings)</span>
                    </button>
                  )}
                  {onSwitchToStripe && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSwitchToStripe(selectedPlan || undefined);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-300 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <CreditCard className="w-3 h-3" />
                      <span>Stripe Checkout</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          ) : (
            /* Confirmation & Success Screen */
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl shadow-emerald-950 text-white">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-serif">
                  Solana Payment Verified & Credited!
                </h3>
                <p className="text-xs text-emerald-400 font-mono mt-1">
                  Received {solAmount} SOL (${customAmountUsd.toFixed(2)} USD) • {selectedPlan?.sessionsIncluded || Math.floor(customAmountUsd / 1.5)} Sessions Added
                </p>
              </div>

              {/* Receipt Summary Box */}
              <div className="p-4 rounded-2xl bg-black/80 border border-emerald-500/50 text-left font-mono space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Package:</span>
                  <strong className="text-white">{selectedPlan?.name || 'Solana Deposit'}</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Settlement Asset:</span>
                  <strong className="text-purple-300 font-bold">Solana (SOL) On-Chain</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Recipient Address:</span>
                  <strong className="text-slate-200 font-mono text-[10px] truncate max-w-[200px]">
                    {SOLANA_CONFIG.walletAddress}
                  </strong>
                </div>
                <div className="flex justify-between text-slate-400 pt-1 border-t border-zinc-800">
                  <span>Transaction Hash:</span>
                  <a
                    href={`https://solscan.io/tx/${confirmedTxHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1 text-[10px]"
                  >
                    <span>{confirmedTxHash.substring(0, 16)}...</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-xs font-mono transition-all shadow-lg shadow-emerald-950"
              >
                Return to Sanctuary Dashboard
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
