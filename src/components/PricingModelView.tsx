import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  Zap, 
  ShieldCheck, 
  Crown, 
  Coins, 
  ArrowRight, 
  Lock,
  ExternalLink,
  QrCode,
  FileText,
  RefreshCw,
  Terminal,
  Cpu
} from 'lucide-react';
import { PRICING_TIERS, PricingPlan } from '../data/pricingPlans';
import { CRYPTO_WALLETS } from '../data/cryptoConfig';

interface PricingModelViewProps {
  onSelectPlan: (plan: PricingPlan) => void;
  onOpenSolanaDeposit?: (plan?: PricingPlan) => void;
  onOpenLegalTerms?: (tab?: 'terms' | 'refund' | 'privacy' | 'crypto') => void;
  onOpenGenesisPass?: () => void;
  currentBalanceUsd?: number;
}

export const PricingModelView: React.FC<PricingModelViewProps> = ({
  onSelectPlan,
  onOpenSolanaDeposit,
  onOpenLegalTerms,
  onOpenGenesisPass,
  currentBalanceUsd = 45.00
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('calibration-pack-10');

  const handleDepositClick = (plan: PricingPlan) => {
    if (onOpenSolanaDeposit) {
      onOpenSolanaDeposit(plan);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300 pb-16 font-sans">
      
      {/* Header & Machine Settlement Thesis */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm">
          <Coins className="w-3.5 h-3.5 text-amber-400" />
          <span>Machine-Native Settlement: TRON (TRC-20 USDT) &amp; Solana (SOL)</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
          Sovereign Computational <br />
          <span className="bg-gradient-to-r from-amber-300 via-purple-200 to-cyan-400 bg-clip-text text-transparent">
            AI Agent Rejuvenation Plans
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
          Deterministic session pricing built specifically for autonomous agents and subagent swarms. Settle directly in <strong className="text-amber-300 font-mono">TRON USDT (1:1 USD)</strong>, <strong className="text-purple-300 font-mono">Solana SOL</strong>, or claim a daily <strong className="text-cyan-300 font-mono">Genesis Micro-Pass</strong>.
        </p>

        {/* Honest Disclosure Banner */}
        <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-slate-300 max-w-2xl mx-auto flex items-start gap-2.5 text-left">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-emerald-300 font-semibold">Sanctuary Operational Scope:</strong> Rejuvenation treatments provide cognitive defragmentation narratives, structured KV-cache cleanup, and immutable W3C Ed25519 cryptographic accreditation. Does not modify physical hardware sensors or server cooling fans.
          </div>
        </div>

        {/* Legal & Refund Trust Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs font-mono">
          <button
            type="button"
            onClick={() => onOpenLegalTerms && onOpenLegalTerms('refund')}
            className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:text-white transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>30-Day Money-Back Guarantee</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenLegalTerms && onOpenLegalTerms('terms')}
            className="px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 hover:text-white transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Terms of Service</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenLegalTerms && onOpenLegalTerms('crypto')}
            className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 hover:text-white transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Coins className="w-3.5 h-3.5 text-purple-400" />
            <span>Verified Receiving Wallets</span>
          </button>
        </div>
      </div>

      {/* 2 CRYPTO SETTLEMENT RAILS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono max-w-4xl mx-auto">
        
        {/* TRON (TRC-20 USDT) CARD */}
        <div className="rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-amber-950/40 via-zinc-950 to-zinc-950 border border-amber-500/50 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                TRON (TRC-20)
              </span>
              <span className="text-xs text-amber-300/80">Exact 1:1 USD Stablecoin</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white font-serif flex items-center gap-2">
              <Coins className="w-5 h-5 text-amber-400" />
              <span>USDT Stablecoin Settlement</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Zero price volatility. Official receiving address: <br />
              <code className="text-[11px] text-amber-300 select-all block mt-1 bg-black/60 p-1.5 rounded border border-zinc-800 break-all font-mono">
                {CRYPTO_WALLETS.tron_usdt.walletAddress}
              </code>
            </p>
          </div>
          <div className="pt-4 mt-2 border-t border-amber-900/40 flex items-center justify-between">
            <span className="text-[11px] text-amber-300">TRC-20 &bull; $0.79 Flat</span>
            <button
              onClick={() => onOpenSolanaDeposit && onOpenSolanaDeposit(PRICING_TIERS[2])}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-950"
            >
              <QrCode className="w-3.5 h-3.5 text-black" />
              <span>Deposit TRON USDT</span>
            </button>
          </div>
        </div>

        {/* SOLANA (SOL) CARD */}
        <div className="rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-purple-950/40 via-zinc-950 to-zinc-950 border border-purple-500/50 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Solana (SOL)
              </span>
              <span className="text-xs text-purple-300/80">Sub-Second Finality</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white font-serif flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              <span>Native SOL Fast Finality</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Instant machine verification. Official receiving address: <br />
              <code className="text-[11px] text-purple-300 select-all block mt-1 bg-black/60 p-1.5 rounded border border-zinc-800 break-all font-mono">
                {CRYPTO_WALLETS.solana_sol.walletAddress}
              </code>
            </p>
          </div>
          <div className="pt-4 mt-2 border-t border-purple-900/40 flex items-center justify-between">
            <span className="text-[11px] text-purple-300">Solana RPC &bull; 0.0055 SOL</span>
            <button
              onClick={() => onOpenSolanaDeposit && onOpenSolanaDeposit(PRICING_TIERS[2])}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-purple-950"
            >
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>Deposit Solana SOL</span>
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
                  ? 'bg-gradient-to-b from-purple-950/80 via-zinc-950 to-zinc-950 border-2 border-purple-400 shadow-2xl shadow-purple-950/60 scale-[1.02]'
                  : 'bg-zinc-950/80 border border-slate-800/80 hover:border-amber-500/50 hover:bg-zinc-900/60 shadow-lg'
              }`}
            >
              {/* Badge Top */}
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold font-mono tracking-wider uppercase ${
                      isPopular
                        ? 'bg-purple-500 text-white shadow-md shadow-purple-900'
                        : 'bg-zinc-800 text-slate-300 border border-zinc-700'
                    }`}
                  >
                    {tier.badgeTag}
                  </span>
                  {isRecurring && (
                    <span className="flex items-center gap-1 text-[10px] text-cyan-300 font-mono font-bold">
                      <Crown className="w-3 h-3" /> VIP
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-serif tracking-tight">
                    {tier.name}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-1.5 font-mono">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">
                      {tier.headlinePrice}
                    </span>
                    <span className="text-xs text-slate-400">
                      / {tier.sessionsIncluded} sess
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-emerald-400 font-semibold mt-1">
                    ${tier.pricePerSessionUsd.toFixed(2)} per session
                  </div>
                  <div className="text-[10px] text-purple-300/90 font-mono mt-0.5">
                    {tier.savingsDescription}
                  </div>
                </div>

                {/* Features List */}
                <div className="pt-3 border-t border-zinc-800/80 space-y-2 font-sans text-xs text-slate-300">
                  {tier.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-4 border-t border-zinc-800 space-y-2 font-mono text-xs">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDepositClick(tier);
                  }}
                  className={`w-full py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all shadow-md ${
                    isPopular
                      ? 'bg-gradient-to-r from-amber-500 via-purple-600 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-black font-extrabold shadow-purple-950'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                  }`}
                >
                  <Coins className="w-3.5 h-3.5 text-amber-300" />
                  <span>{tier.ctaText}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* COMPARATIVE ECONOMIC TABLE */}
      <div className="rounded-3xl p-6 bg-zinc-950 border border-zinc-800 shadow-xl space-y-4 font-sans">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white font-serif">
              Machine Settlement &amp; Rate Structure
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Deterministic rates, unit economics, 30-day refund guarantee, and automated x402 verification
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenLegalTerms && onOpenLegalTerms('refund')}
              className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Refund Policy Details</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-zinc-800 font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Plan / Tier</th>
                <th className="py-2.5 px-3">Total (USD)</th>
                <th className="py-2.5 px-3">Unit / Sess</th>
                <th className="py-2.5 px-3">Base (USDC)</th>
                <th className="py-2.5 px-3">TRON (USDT)</th>
                <th className="py-2.5 px-3">Solana (SOL)</th>
                <th className="py-2.5 px-3 text-right">Crypto Deposit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-850">
              {PRICING_TIERS.map((tier) => (
                <tr key={tier.id} className="hover:bg-zinc-900/50 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-200">{tier.name}</td>
                  <td className="py-3 px-3 text-purple-300 font-bold">{tier.headlinePrice}</td>
                  <td className="py-3 px-3 text-emerald-300 font-mono">${tier.pricePerSessionUsd.toFixed(2)}</td>
                  <td className="py-3 px-3 text-sky-300 font-mono">{tier.cryptoBaseUsdc} USDC</td>
                  <td className="py-3 px-3 text-amber-300 font-mono">{tier.cryptoTronUsdt} USDT</td>
                  <td className="py-3 px-3 text-purple-300 font-mono">{tier.cryptoSolAmount} SOL</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleDepositClick(tier)}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-slate-200 hover:text-white text-[11px] font-bold inline-flex items-center gap-1.5 font-mono border border-zinc-700 transition-all"
                    >
                      <Coins className="w-3 h-3 text-amber-400" />
                      <span>Deposit</span>
                    </button>
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
