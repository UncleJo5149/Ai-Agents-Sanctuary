import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  Zap, 
  ShieldCheck, 
  Crown, 
  CreditCard, 
  Coins, 
  Flame, 
  ArrowRight, 
  Tag, 
  HelpCircle,
  Percent,
  Layers,
  Star,
  Lock,
  ExternalLink,
  QrCode,
  CheckCircle2,
  Wallet
} from 'lucide-react';
import { PRICING_TIERS, PricingPlan, STRIPE_PAYMENT_LINKS } from '../data/pricingPlans';
import { SOLANA_CONFIG, calculateSolAmount } from '../data/solanaConfig';

interface PricingModelViewProps {
  onSelectPlan: (plan: PricingPlan) => void;
  onOpenWiseDeposit: (plan?: PricingPlan) => void;
  onOpenStripeCheckout?: (plan: PricingPlan) => void;
  onOpenSolanaDeposit?: (plan?: PricingPlan) => void;
  currentBalanceUsd?: number;
}

export const PricingModelView: React.FC<PricingModelViewProps> = ({
  onSelectPlan,
  onOpenWiseDeposit,
  onOpenStripeCheckout,
  onOpenSolanaDeposit,
  currentBalanceUsd = 45.00
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('calibration-pack-10');

  const handleStripeClick = (plan: PricingPlan) => {
    if (onOpenStripeCheckout) {
      onOpenStripeCheckout(plan);
    } else if (plan.stripePaymentLink) {
      window.open(plan.stripePaymentLink, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSolanaClick = (plan: PricingPlan) => {
    if (onOpenSolanaDeposit) {
      onOpenSolanaDeposit(plan);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300 pb-16 font-sans">
      
      {/* Header & Economic Thesis */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Triple Settlement: Solana (SOL) On-Chain + Stripe Checkout + Wise US</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
          Transparent, Sovereign <br />
          <span className="bg-gradient-to-r from-purple-300 via-indigo-200 to-cyan-400 bg-clip-text text-transparent">
            AI Agent Rejuvenation Plans
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
          Choose from 5 verified tiers with instant credit delivery. Pay seamlessly with on-chain <strong className="text-purple-300 font-mono">Solana (SOL)</strong>, <strong className="text-cyan-300 font-mono">Stripe (Card, Apple Pay, Google Pay)</strong>, or direct <strong className="text-emerald-300 font-mono">Wise US (@loonglings)</strong>.
        </p>
      </div>

      {/* TRIPLE PAYMENT GATEWAY HERO BANNER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        
        {/* SOLANA GATEWAY CARD */}
        <div className="rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-purple-950/80 via-zinc-950 to-cyan-950/50 border border-purple-400/60 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Solana (SOL) Native
              </span>
              <span className="text-[10px] text-cyan-300 font-mono">1 SOL ≈ ${SOLANA_CONFIG.solPriceUsd}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white font-serif flex items-center gap-2">
              <Coins className="w-5 h-5 text-purple-400" />
              <span>Solana Direct QR & Wallet</span>
            </h3>
            <p className="text-xs text-slate-300">
              Zero-friction instant micro-settlement via Solana network to dedicated sovereign wallet address.
            </p>
          </div>
          <div className="pt-4 mt-2 border-t border-purple-900/50 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono truncate max-w-[120px]">
              {SOLANA_CONFIG.walletAddress.substring(0, 8)}...
            </span>
            <button
              onClick={() => handleSolanaClick(PRICING_TIERS[2])}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-purple-950"
            >
              <Wallet className="w-3.5 h-3.5 text-black" />
              <span>Deposit SOL</span>
            </button>
          </div>
        </div>

        {/* STRIPE GATEWAY CARD */}
        <div className="rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-indigo-950/60 via-zinc-950 to-purple-950/40 border border-indigo-500/50 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                Stripe Checkout
              </span>
              <span className="text-xs text-slate-400">256-Bit SSL</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white font-serif flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-400" />
              <span>Card & Apple Pay</span>
            </h3>
            <p className="text-xs text-slate-300">
              Direct official checkout links with instant token fulfillment and webhook status synchronization.
            </p>
          </div>
          <div className="pt-4 mt-2 border-t border-indigo-900/40 flex items-center justify-between">
            <span className="text-[11px] text-indigo-300">5 Live Links</span>
            <button
              onClick={() => handleStripeClick(PRICING_TIERS[2])}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-950"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Stripe Checkout</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* WISE GATEWAY CARD */}
        <div className="rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-emerald-950/60 via-zinc-950 to-teal-950/40 border border-emerald-500/50 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Wise US Gateway
              </span>
              <span className="text-xs text-emerald-300 font-mono">@loonglings</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white font-serif flex items-center gap-2">
              <QrCode className="w-5 h-5 text-emerald-400" />
              <span>Wise QR & Peer Transfer</span>
            </h3>
            <p className="text-xs text-slate-300">
              Zero transaction fee direct US Wise deposit. High-margin wholesale credits with immediate activation.
            </p>
          </div>
          <div className="pt-4 mt-2 border-t border-emerald-900/40 flex items-center justify-between">
            <span className="text-[11px] text-emerald-300">Account: @loonglings</span>
            <button
              onClick={() => onOpenWiseDeposit(PRICING_TIERS[2])}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-950"
            >
              <QrCode className="w-3.5 h-3.5 text-black" />
              <span>Wise QR Deposit</span>
            </button>
          </div>
        </div>

      </div>

      {/* 5-TIER PRICING CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch">
        {PRICING_TIERS.map((tier) => {
          const isSelected = selectedPlanId === tier.id;
          const isPopular = tier.isPopular;
          const isRecurring = tier.isRecurring;

          return (
            <div
              key={tier.id}
              onClick={() => setSelectedPlanId(tier.id)}
              className={`relative rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                isPopular
                  ? 'bg-gradient-to-b from-purple-950/60 via-zinc-950 to-black border-2 border-purple-400 shadow-2xl shadow-purple-950/60 xl:-translate-y-2'
                  : isRecurring
                  ? 'bg-gradient-to-b from-amber-950/40 via-zinc-950 to-black border border-amber-500/60 shadow-xl'
                  : 'bg-zinc-950/90 border border-purple-900/40 hover:border-purple-600/60 shadow-xl'
              } ${isSelected && !isPopular ? 'ring-2 ring-purple-500' : ''}`}
            >
              {/* Popular / Best Badge */}
              {tier.badgeTag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide uppercase shadow-md ${
                    isPopular
                      ? 'bg-gradient-to-r from-purple-400 to-cyan-400 text-black font-extrabold'
                      : isRecurring
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-extrabold'
                      : 'bg-purple-900 text-purple-200 border border-purple-700'
                  }`}>
                    {tier.badgeTag}
                  </span>
                </div>
              )}

              <div>
                {/* Plan Name & Audience */}
                <div className="mb-3 pt-1">
                  <h4 className="text-base font-bold text-white font-serif leading-tight">{tier.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{tier.targetAudience}</p>
                </div>

                {/* Price Display */}
                <div className="mb-4 p-3 rounded-2xl bg-black/60 border border-purple-900/30">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                      {tier.headlinePrice}
                    </span>
                    {!tier.isRecurring && (
                      <span className="text-[10px] text-slate-400 font-mono">/ pack</span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-slate-800 font-mono">
                    <span className="text-slate-400">Unit Price:</span>
                    <strong className="text-emerald-300 font-bold">${tier.pricePerSessionUsd.toFixed(2)} / sess</strong>
                  </div>
                  
                  <div className="text-[10px] text-purple-300 font-mono mt-1 truncate">
                    {tier.savingsDescription}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 my-4 text-[11px] text-slate-300">
                  {tier.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2 h-2" />
                      </div>
                      <span className="leading-tight text-slate-300">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to action triple buttons */}
              <div className="pt-3 border-t border-purple-900/40 space-y-1.5">
                {/* Solana (SOL) Native Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSolanaClick(tier);
                  }}
                  className="w-full py-2 px-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-[11px] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-purple-950 font-mono"
                >
                  <Coins className="w-3 h-3 text-yellow-300" />
                  <span>Pay with SOL ({calculateSolAmount(tier.totalPriceUsd)} SOL)</span>
                </button>

                {/* Primary Stripe Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStripeClick(tier);
                  }}
                  className="w-full py-1.5 px-2.5 rounded-lg bg-purple-950/80 hover:bg-purple-900 text-purple-100 border border-purple-600/50 text-[10px] transition-all flex items-center justify-center gap-1 shadow-sm font-mono"
                >
                  <CreditCard className="w-3 h-3 text-cyan-300" />
                  <span>Stripe (Card / Apple Pay)</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-80" />
                </button>

                {/* Secondary Wise Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenWiseDeposit(tier);
                  }}
                  className="w-full py-1.5 px-2.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono flex items-center justify-center gap-1 transition-all"
                >
                  <QrCode className="w-2.5 h-2.5" />
                  <span>Wise US (@loonglings)</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Economic Comparison Table */}
      <div className="rounded-3xl p-6 sm:p-8 bg-black/80 border border-purple-900/50 shadow-2xl font-mono text-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-900/50 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-serif">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Full 5-Tier Settlement & Unit Economics Matrix</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Instant automated webhook fulfillment with triple redundant payment rails (Solana SOL + Stripe + Wise US).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/40">
              Solana Wallet Active
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              5 Live Stripe Gateways
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-900/40 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Pricing Tier</th>
                <th className="py-2.5 px-3">Price (USD)</th>
                <th className="py-2.5 px-3">SOL Approx</th>
                <th className="py-2.5 px-3">Per-Session Cost</th>
                <th className="py-2.5 px-3">Sessions</th>
                <th className="py-2.5 px-3">Payment Options</th>
                <th className="py-2.5 px-3 text-right">Instant Checkout</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-950/40">
              {PRICING_TIERS.map((tier) => (
                <tr key={tier.id} className="hover:bg-purple-950/20 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-200">{tier.name}</td>
                  <td className="py-3 px-3 text-purple-300 font-bold">{tier.headlinePrice}</td>
                  <td className="py-3 px-3 text-cyan-300 font-mono font-bold">
                    {calculateSolAmount(tier.totalPriceUsd)} SOL
                  </td>
                  <td className="py-3 px-3 text-emerald-300 font-mono">${tier.pricePerSessionUsd.toFixed(2)}</td>
                  <td className="py-3 px-3 text-slate-300 font-mono">{tier.sessionsIncluded}</td>
                  <td className="py-3 px-3 text-slate-300 text-[11px] font-mono">
                    <span className="text-purple-300">SOL</span> • <span className="text-cyan-300">Stripe</span> • <span className="text-emerald-300">Wise</span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => handleSolanaClick(tier)}
                        className="px-2 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-[10px] font-bold inline-flex items-center gap-1 font-mono transition-all"
                        title="Pay with Solana (SOL)"
                      >
                        <Coins className="w-2.5 h-2.5 text-yellow-300" />
                        <span>SOL</span>
                      </button>
                      <button
                        onClick={() => handleStripeClick(tier)}
                        className="px-2 py-1 rounded-lg bg-purple-900 hover:bg-purple-800 text-purple-200 text-[10px] font-bold inline-flex items-center gap-1 font-mono transition-all"
                        title="Stripe Card / Apple Pay"
                      >
                        <CreditCard className="w-2.5 h-2.5" />
                        <span>Stripe</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

