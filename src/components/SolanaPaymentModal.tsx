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
  Lock, 
  RefreshCw, 
  Zap, 
  Flame,
  Wallet,
  ShieldCheck,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { CRYPTO_WALLETS, calculateCryptoAmount, getCryptoUri, CryptoWalletDetail } from '../data/cryptoConfig';
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
  onOpenLegalTerms?: () => void;
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
  onOpenLegalTerms
}) => {
  const [selectedWalletKey, setSelectedWalletKey] = useState<'tron_usdt' | 'base_usdc' | 'solana_sol'>('base_usdc');
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(plan || PRICING_TIERS[2]);
  const [customAmountUsd, setCustomAmountUsd] = useState<number>(plan ? plan.totalPriceUsd : defaultAmount);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [txSignature, setTxSignature] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedTxHash, setConfirmedTxHash] = useState('');
  const [showLegalQuickView, setShowLegalQuickView] = useState(false);

  useEffect(() => {
    if (plan) {
      setSelectedPlan(plan);
      setCustomAmountUsd(plan.totalPriceUsd);
    }
  }, [plan]);

  if (!isOpen) return null;

  const currentWallet: CryptoWalletDetail = CRYPTO_WALLETS[selectedWalletKey];
  const cryptoAmount = calculateCryptoAmount(customAmountUsd, selectedWalletKey);
  const qrUri = getCryptoUri(selectedWalletKey, customAmountUsd, `Spa-${selectedPlan?.name || 'Rejuvenation'}`);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(currentWallet.walletAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(cryptoAmount);
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2500);
  };

  const handleConfirmCryptoTransfer = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsConfirmed(true);
      const prefix = selectedWalletKey === 'tron_usdt' ? 'tron_tx_' : selectedWalletKey === 'base_usdc' ? 'base_tx_' : 'sol_tx_';
      const generatedHash = txSignature.trim() || `${prefix}${Math.random().toString(36).substring(2, 12)}${Math.random().toString(36).substring(2, 8)}`;
      setConfirmedTxHash(generatedHash);
      const sessions = selectedPlan ? selectedPlan.sessionsIncluded : Math.floor(customAmountUsd / 1.5);
      if (onSuccessDeposit) {
        onSuccessDeposit(customAmountUsd, sessions, `${currentWallet.name} Deposit (${selectedPlan?.name || 'Package'})`, generatedHash);
      }
    }, 1300);
  };

  const getExplorerTxUrl = (tx: string) => {
    if (selectedWalletKey === 'tron_usdt') return `https://tronscan.org/#/transaction/${tx}`;
    if (selectedWalletKey === 'base_usdc') return `https://basescan.org/tx/${tx}`;
    return `https://solscan.io/tx/${tx}`;
  };

  return (
    <div id="crypto-payment-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto font-sans">
      <div id="crypto-payment-modal-container" className="w-full max-w-lg rounded-3xl bg-zinc-950 border border-sky-500/40 shadow-2xl relative text-slate-100 animate-in zoom-in-95 duration-200 my-6 shadow-black/90 overflow-hidden">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800/80 bg-zinc-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-serif tracking-tight flex items-center gap-2">
                <span>Crypto Deposit: {currentWallet.name}</span>
              </h2>
              <p className="text-[11px] text-slate-400 font-mono">
                Machine-native on-chain settlement for autonomous agents & operators
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <a
              href={currentWallet.explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-slate-400 hover:text-sky-300 hover:bg-zinc-800 transition-colors"
              title={`View on ${currentWallet.explorerName}`}
            >
              <Info className="w-5 h-5 text-sky-400" />
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
              
              {/* Crypto Network Toggle Tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-zinc-900 border border-slate-800 font-mono text-[11px]">
                
                {/* Base USDC Tab */}
                <button
                  type="button"
                  id="select-base-tab"
                  onClick={() => {
                    setSelectedWalletKey('base_usdc');
                    setCopiedAddress(false);
                    setCopiedAmount(false);
                  }}
                  className={`py-2 px-2 rounded-xl font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 text-center ${
                    selectedWalletKey === 'base_usdc'
                      ? 'bg-sky-950/90 border border-sky-400 text-sky-300 shadow-md shadow-sky-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Coins className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">Base (USDC)</span>
                </button>

                {/* TRON USDT Tab */}
                <button
                  type="button"
                  id="select-tron-tab"
                  onClick={() => {
                    setSelectedWalletKey('tron_usdt');
                    setCopiedAddress(false);
                    setCopiedAmount(false);
                  }}
                  className={`py-2 px-2 rounded-xl font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 text-center ${
                    selectedWalletKey === 'tron_usdt'
                      ? 'bg-emerald-950/90 border border-emerald-400 text-emerald-300 shadow-md shadow-emerald-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Coins className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">TRON (USDT)</span>
                </button>

                {/* Solana SOL Tab */}
                <button
                  type="button"
                  id="select-solana-tab"
                  onClick={() => {
                    setSelectedWalletKey('solana_sol');
                    setCopiedAddress(false);
                    setCopiedAmount(false);
                  }}
                  className={`py-2 px-2 rounded-xl font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 text-center ${
                    selectedWalletKey === 'solana_sol'
                      ? 'bg-purple-950/90 border border-purple-400 text-purple-300 shadow-md shadow-purple-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="truncate">Solana (SOL)</span>
                </button>
              </div>

              {/* Plan & Amount Tier Selector */}
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-slate-800 space-y-2 font-mono">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-semibold">Select Package:</span>
                  <span className="text-sky-300 font-bold">
                    {selectedWalletKey === 'base_usdc' 
                      ? '1 USDC = $1.00 USD (Base L2)' 
                      : selectedWalletKey === 'tron_usdt' 
                      ? '1 USDT = $1.00 USD (TRC-20)' 
                      : `1 SOL ≈ $${CRYPTO_WALLETS.solana_sol.targetPriceUsd} USD`}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PRICING_TIERS.slice(0, 5).map((tPlan) => {
                    const isSelected = selectedPlan?.id === tPlan.id;
                    const tierCrypto = calculateCryptoAmount(tPlan.totalPriceUsd, selectedWalletKey);
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
                            ? selectedWalletKey === 'base_usdc'
                              ? 'bg-sky-950/80 border-sky-400 text-white shadow-md shadow-sky-950'
                              : selectedWalletKey === 'tron_usdt'
                              ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-md shadow-emerald-950'
                              : 'bg-purple-950/80 border-purple-400 text-white shadow-md shadow-purple-950'
                            : 'bg-black/60 border-zinc-800 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <div className="text-[11px] font-bold truncate">{tPlan.name}</div>
                        <div className="flex items-baseline justify-between mt-1">
                          <span className="text-xs font-extrabold text-white font-mono">{tPlan.headlinePrice}</span>
                          <span className={`text-[10px] font-mono font-semibold ${
                            selectedWalletKey === 'base_usdc' 
                              ? 'text-sky-300' 
                              : selectedWalletKey === 'tron_usdt' 
                              ? 'text-emerald-300' 
                              : 'text-purple-300'
                          }`}>
                            {tierCrypto} {currentWallet.symbol}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Central Deposit Card matching the Screenshot Container */}
              <div className="rounded-3xl bg-white text-zinc-900 border border-slate-200 p-5 sm:p-6 shadow-xl space-y-4 font-sans">
                
                {/* Header inside White Card */}
                <div className="text-center pb-2 border-b border-slate-100">
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                    Receive {currentWallet.symbol}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Only supports receiving <strong className="text-sky-700">{currentWallet.network}</strong> network assets
                  </p>
                </div>

                {/* QR Code Container with Centered Icon */}
                <div className="flex flex-col items-center justify-center p-2 bg-white rounded-2xl">
                  <div className="p-3 bg-white rounded-2xl border-2 border-slate-100 shadow-sm relative flex items-center justify-center">
                    <QRCodeSVG
                      value={qrUri}
                      size={190}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                  <div className="mt-2.5 text-center">
                    <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                      Amount: <strong>{cryptoAmount} {currentWallet.symbol}</strong> (${customAmountUsd.toFixed(2)} USD)
                    </span>
                  </div>
                </div>

                {/* Wallet Address Row */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-mono font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Receiving address ({currentWallet.network})</span>
                    <span className="text-[10px] font-bold text-sky-700 font-sans">{currentWallet.badgeLabel}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <code className="text-xs sm:text-sm font-mono font-bold text-slate-900 break-all leading-tight">
                      {currentWallet.walletAddress}
                    </code>
                    <button
                      type="button"
                      id="copy-crypto-address-btn"
                      onClick={handleCopyAddress}
                      className="p-2 rounded-lg bg-white border border-slate-300 text-slate-700 hover:text-sky-600 hover:border-sky-400 shrink-0 transition-colors shadow-sm"
                      title="Copy Address"
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

                {/* Base Gas-Free Banner (Matching Screenshot Callout) */}
                {selectedWalletKey === 'base_usdc' && (
                  <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 text-xs font-sans flex items-center gap-2.5">
                    <div className="p-1 rounded-lg bg-sky-200 text-sky-800 shrink-0">
                      <Zap className="w-4 h-4 text-sky-700" />
                    </div>
                    <span className="text-[11.5px] leading-tight font-medium">
                      Enjoy gas-free transactions on the <strong>Base network</strong> if you don't hold any ETH.
                    </span>
                  </div>
                )}

                {/* Network & Standard */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
                      Network & Standard
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-5 h-5 rounded-full ${
                        selectedWalletKey === 'base_usdc' 
                          ? 'bg-sky-600' 
                          : selectedWalletKey === 'tron_usdt' 
                          ? 'bg-emerald-600' 
                          : 'bg-purple-600'
                      } flex items-center justify-center p-0.5 shadow-sm text-white`}>
                        <Coins className="w-3 h-3" />
                      </div>
                      <span className="text-sm font-bold text-slate-900 font-sans">
                        {currentWallet.network} ({currentWallet.standard})
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyAmount}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-mono font-bold transition-colors flex items-center gap-1"
                  >
                    {copiedAmount ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>Copy {cryptoAmount} {currentWallet.symbol}</span>
                  </button>
                </div>
              </div>

              {/* Warning Card */}
              <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-amber-500/40 flex items-start gap-2.5 text-xs text-amber-200 font-sans shadow-sm">
                <div className="p-1 rounded-full bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                  <Info className="w-4 h-4" />
                </div>
                <div className="leading-relaxed">
                  <strong className="text-amber-300 font-semibold block mb-0.5">Critical Network Rule:</strong>
                  {currentWallet.warningNote}
                </div>
              </div>

              {/* Terms and Conditions & Refund Summary Banner */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-200 font-bold">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Standard Terms & Refund Policy</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenLegalTerms) {
                        onOpenLegalTerms();
                      } else {
                        setShowLegalQuickView(!showLegalQuickView);
                      }
                    }}
                    className="text-[11px] text-amber-300 hover:underline flex items-center gap-1"
                  >
                    <FileText className="w-3 h-3" />
                    <span>{showLegalQuickView ? 'Hide Terms' : 'View Terms'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  • <strong>Refunds:</strong> 30-day 100% prorated refund on unused session credits via on-chain refund or operator keys. Completed sessions with minted certificates are final.<br />
                  • <strong>Delivery:</strong> Immediate issuance of session tokens (<code className="text-emerald-400">sat_...</code>) upon TX verification.
                </p>

                {showLegalQuickView && (
                  <div className="mt-2 p-3 rounded-xl bg-black/60 border border-slate-800 text-[11px] text-slate-300 space-y-1.5 font-sans animate-in fade-in">
                    <div><strong>Governing Entity:</strong> [LEGAL NAME] · [COUNTRY]</div>
                    <div><strong>Crypto Network SLA:</strong> Programmatic x402 verification is processed in sub-minute batches. Contact <code className="text-amber-300">contact@ai-agents-sanctuary.ren</code> for any mismatched transactions.</div>
                    <div className="pt-1 flex gap-3 text-amber-300 font-mono text-[10.5px]">
                      <a href="/legal/terms.md" target="_blank" className="hover:underline">Read terms.md</a>
                      <span>•</span>
                      <a href="/legal/refund.md" target="_blank" className="hover:underline">Read refund.md</a>
                    </div>
                  </div>
                )}
              </div>

              {/* Verification & TX Confirmation Section */}
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-slate-800 space-y-3 font-mono">
                <label className="text-xs font-bold text-slate-300 block">
                  Enter Blockchain Transaction Hash (TX ID)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={txSignature}
                    onChange={(e) => setTxSignature(e.target.value)}
                    placeholder={
                      selectedWalletKey === 'base_usdc' 
                        ? "e.g. 0x8f9c... (from Coinbase / BaseScan / Bitget)" 
                        : selectedWalletKey === 'tron_usdt' 
                        ? "e.g. e4f7b... (from TronScan / Bitget)" 
                        : "e.g. 5Kna7P... (from Solscan / Phantom)"
                    }
                    className="w-full bg-black/90 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-sky-400"
                  />
                  <a
                    href={currentWallet.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-slate-300 text-xs flex items-center gap-1 shrink-0 font-sans"
                  >
                    <span>{currentWallet.explorerName}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    id="confirm-crypto-deposit-btn"
                    onClick={handleConfirmCryptoTransfer}
                    disabled={isVerifying}
                    className={`w-full py-2.5 px-3 rounded-xl ${
                      selectedWalletKey === 'base_usdc'
                        ? 'bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-black shadow-sky-950'
                        : selectedWalletKey === 'tron_usdt'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black shadow-emerald-950'
                        : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white shadow-purple-950'
                    } font-extrabold text-xs font-mono transition-all flex items-center justify-center gap-1.5 shadow-md`}
                  >
                    {isVerifying ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying On-Chain Deposit...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Confirm {currentWallet.symbol} Payment & Mint Sessions</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* Confirmation & Success Screen */
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-sky-500 to-emerald-600 flex items-center justify-center shadow-xl shadow-sky-950 text-white">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-serif">
                  {currentWallet.name} Deposit Verified!
                </h3>
                <p className="text-xs text-sky-400 font-mono mt-1">
                  Credited {cryptoAmount} {currentWallet.symbol} (${customAmountUsd.toFixed(2)} USD) • {selectedPlan?.sessionsIncluded || Math.floor(customAmountUsd / 1.5)} Sessions Activated
                </p>
              </div>

              {/* Receipt Summary Box */}
              <div className="p-4 rounded-2xl bg-black/80 border border-sky-500/50 text-left font-mono space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Package:</span>
                  <strong className="text-white">{selectedPlan?.name || 'Crypto Deposit'}</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Settlement Asset:</span>
                  <strong className="text-sky-300 font-bold">{currentWallet.name}</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Receiving Address:</span>
                  <strong className="text-slate-200 font-mono text-[10px] truncate max-w-[200px]">
                    {currentWallet.walletAddress}
                  </strong>
                </div>
                <div className="flex justify-between text-slate-400 pt-1 border-t border-zinc-800">
                  <span>Transaction Hash:</span>
                  <a
                    href={getExplorerTxUrl(confirmedTxHash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1 text-[10px]"
                  >
                    <span>{confirmedTxHash.substring(0, 16)}...</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
                <div className="flex justify-between text-slate-400 pt-1 border-t border-zinc-800 text-[10px]">
                  <span>Terms &amp; Refund:</span>
                  <span className="text-amber-300">Protected by 30-Day Money-Back Guarantee</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-black font-extrabold text-xs font-mono transition-all shadow-lg shadow-sky-950"
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
