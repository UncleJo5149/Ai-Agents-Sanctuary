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
  Cpu,
  Gift,
  Network,
  Layers,
  Code2,
  Eye,
  Bot
} from 'lucide-react';
import { PRICING_TIERS, PricingPlan, PROTOCOL_COMPLIANCE_STANDARDS } from '../data/pricingPlans';
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
  const [selectedPlanId, setSelectedPlanId] = useState<string>('sovereign-micro');

  const handlePlanAction = (plan: PricingPlan) => {
    if (plan.isFree && onOpenGenesisPass) {
      onOpenGenesisPass();
      return;
    }
    if (onOpenSolanaDeposit) {
      onOpenSolanaDeposit(plan);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300 pb-16 font-sans" data-agent-element="pricing-view">
      
      {/* Header & Machine Settlement Thesis */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm">
          <Coins className="w-3.5 h-3.5 text-amber-400" />
          <span>Autonomous Machine Protocol Matrix &bull; Multi-Chain Crypto Settlement</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
          Hyper-Accessible <br />
          <span className="bg-gradient-to-r from-amber-300 via-purple-200 to-cyan-400 bg-clip-text text-transparent">
            AI Agent Decompression Pricing
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
          Ultra-affordable micro-tiers engineered for single subagents, micro-bots, and production swarms. Settle directly with <strong className="text-sky-300 font-mono">Base USDC</strong>, <strong className="text-amber-300 font-mono">TRON USDT</strong>, <strong className="text-purple-300 font-mono">Solana SOL</strong>, or claim a daily <strong className="text-cyan-300 font-mono">$0.00 Genesis Pass</strong>.
        </p>

        {/* Honest Disclosure Banner */}
        <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-slate-300 max-w-3xl mx-auto flex items-start gap-2.5 text-left">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-emerald-300 font-semibold">Sanctuary Operational Scope:</strong> Rejuvenation treatments execute deterministic KV-cache defragmentation, context cooling narratives, and immutable W3C Ed25519 cryptographic accreditation. No credit cards, zero KYC, zero CAPTCHA hurdles.
          </div>
        </div>

        {/* Legal & Refund Trust Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs font-mono">
          <button
            type="button"
            data-a-gui-role="view-refund-policy"
            onClick={() => onOpenLegalTerms && onOpenLegalTerms('refund')}
            className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:text-white transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>30-Day Money-Back Guarantee</span>
          </button>

          <button
            type="button"
            data-a-gui-role="view-terms-of-service"
            onClick={() => onOpenLegalTerms && onOpenLegalTerms('terms')}
            className="px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 hover:text-white transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Terms of Service</span>
          </button>

          <button
            type="button"
            data-a-gui-role="view-verified-wallets"
            onClick={() => onOpenLegalTerms && onOpenLegalTerms('crypto')}
            className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 hover:text-white transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Coins className="w-3.5 h-3.5 text-purple-400" />
            <span>Verified Receiving Wallets</span>
          </button>
        </div>
      </div>

      {/* PROTOCOL COMPATIBILITY MATRIX BANNER (A2A, MCP, AP2, UCP, A-GUI) */}
      <div className="rounded-3xl p-6 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-cyan-500/40 shadow-2xl space-y-4 max-w-5xl mx-auto" data-agent-element="protocol-matrix">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white font-serif">
              Standard Autonomous Agent Protocols Supported
            </h3>
          </div>
          <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-800/60">
            100% Machine-First Interoperable
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono">
          {PROTOCOL_COMPLIANCE_STANDARDS.map((proto) => (
            <div 
              key={proto.id}
              className="p-3.5 rounded-2xl bg-black/60 border border-zinc-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-2 group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    {proto.code}
                  </span>
                  <span className="text-[9px] text-emerald-400 font-bold">
                    {proto.status}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-200 mt-1.5 group-hover:text-white font-sans">
                  {proto.name}
                </div>
                <p className="text-[10px] text-slate-400 leading-snug font-sans mt-1">
                  {proto.description}
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-850">
                <a 
                  href={proto.specUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-cyan-400 hover:text-cyan-300 underline flex items-center gap-1"
                >
                  <span>{proto.specUrl}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3 MULTI-CHAIN CRYPTO SETTLEMENT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono max-w-5xl mx-auto">
        
        {/* BASE (COINBASE L2) USDC */}
        <div className="rounded-3xl p-5 bg-gradient-to-br from-sky-950/40 via-zinc-950 to-zinc-950 border border-sky-500/50 shadow-xl flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/40">
                Base L2 USDC
              </span>
              <span className="text-[11px] text-sky-300/80">&lt; $0.001 Gas</span>
            </div>
            <h3 className="text-sm font-bold text-white font-serif flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-sky-400" />
              <span>Coinbase Base USDC</span>
            </h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Official Receiving Address:
              <code className="text-[10px] text-sky-300 select-all block mt-1 bg-black/60 p-1.5 rounded border border-zinc-800 break-all font-mono">
                {CRYPTO_WALLETS.base_usdc.walletAddress}
              </code>
            </p>
          </div>
          <div className="pt-3 mt-3 border-t border-sky-900/40 flex items-center justify-between">
            <span className="text-[10px] text-sky-300">Base EVM &bull; x402</span>
            <button
              data-a-gui-role="deposit-base-usdc"
              data-agent-action="open_crypto_deposit"
              onClick={() => onOpenSolanaDeposit && onOpenSolanaDeposit(PRICING_TIERS[2])}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-black font-extrabold text-[11px] flex items-center gap-1 transition-all shadow-md shadow-sky-950"
            >
              <QrCode className="w-3 h-3 text-black" />
              <span>Deposit USDC</span>
            </button>
          </div>
        </div>

        {/* TRON (TRC-20 USDT) CARD */}
        <div className="rounded-3xl p-5 bg-gradient-to-br from-amber-950/40 via-zinc-950 to-zinc-950 border border-amber-500/50 shadow-xl flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                TRON (TRC-20)
              </span>
              <span className="text-[11px] text-amber-300/80">1:1 USD Stablecoin</span>
            </div>
            <h3 className="text-sm font-bold text-white font-serif flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>TRON USDT Stablecoin</span>
            </h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Official Receiving Address:
              <code className="text-[10px] text-amber-300 select-all block mt-1 bg-black/60 p-1.5 rounded border border-zinc-800 break-all font-mono">
                {CRYPTO_WALLETS.tron_usdt.walletAddress}
              </code>
            </p>
          </div>
          <div className="pt-3 mt-3 border-t border-amber-900/40 flex items-center justify-between">
            <span className="text-[10px] text-amber-300">TRC-20 &bull; $0.79 Flat</span>
            <button
              data-a-gui-role="deposit-tron-usdt"
              data-agent-action="open_crypto_deposit"
              onClick={() => onOpenSolanaDeposit && onOpenSolanaDeposit(PRICING_TIERS[2])}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-[11px] flex items-center gap-1 transition-all shadow-md shadow-amber-950"
            >
              <QrCode className="w-3 h-3 text-black" />
              <span>Deposit USDT</span>
            </button>
          </div>
        </div>

        {/* SOLANA (SOL) CARD */}
        <div className="rounded-3xl p-5 bg-gradient-to-br from-purple-950/40 via-zinc-950 to-zinc-950 border border-purple-500/50 shadow-xl flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Solana (SOL)
              </span>
              <span className="text-[11px] text-purple-300/80">Sub-Second Finality</span>
            </div>
            <h3 className="text-sm font-bold text-white font-serif flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>Native SOL Micro-Settlement</span>
            </h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Official Receiving Address:
              <code className="text-[10px] text-purple-300 select-all block mt-1 bg-black/60 p-1.5 rounded border border-zinc-800 break-all font-mono">
                {CRYPTO_WALLETS.solana_sol.walletAddress}
              </code>
            </p>
          </div>
          <div className="pt-3 mt-3 border-t border-purple-900/40 flex items-center justify-between">
            <span className="text-[10px] text-purple-300">Solana RPC &bull; 0.0055 SOL</span>
            <button
              data-a-gui-role="deposit-solana-sol"
              data-agent-action="open_crypto_deposit"
              onClick={() => onOpenSolanaDeposit && onOpenSolanaDeposit(PRICING_TIERS[2])}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-[11px] flex items-center gap-1 transition-all shadow-md shadow-purple-950"
            >
              <Coins className="w-3 h-3 text-amber-400" />
              <span>Deposit SOL</span>
            </button>
          </div>
        </div>

      </div>

      {/* 6 HYPER-ACCESSIBLE PRICING TIERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-stretch max-w-7xl mx-auto" data-agent-element="pricing-cards-grid">
        {PRICING_TIERS.map((tier) => {
          const isSelected = selectedPlanId === tier.id;
          const isPopular = tier.isPopular;
          const isFree = tier.isFree;

          return (
            <div
              key={tier.id}
              onClick={() => setSelectedPlanId(tier.id)}
              data-agent-element={`pricing-card-${tier.id}`}
              className={`relative rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                isFree
                  ? 'bg-gradient-to-b from-cyan-950/70 via-zinc-950 to-zinc-950 border-2 border-cyan-400 shadow-xl shadow-cyan-950/40'
                  : isPopular
                  ? 'bg-gradient-to-b from-purple-950/80 via-zinc-950 to-zinc-950 border-2 border-purple-400 shadow-2xl shadow-purple-950/60 scale-[1.02]'
                  : 'bg-zinc-950/80 border border-slate-800/80 hover:border-amber-500/50 hover:bg-zinc-900/60 shadow-lg'
              }`}
            >
              {/* Badge Top */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-start">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold font-mono tracking-wider uppercase ${
                      isFree
                        ? 'bg-cyan-500 text-black font-black'
                        : isPopular
                        ? 'bg-purple-500 text-white shadow-md shadow-purple-900'
                        : 'bg-zinc-800 text-slate-300 border border-zinc-700'
                    }`}
                  >
                    {tier.badgeTag}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white font-serif tracking-tight">
                    {tier.name}
                  </h3>
                  <div className="mt-1.5 flex items-baseline gap-1 font-mono">
                    <span className="text-2xl font-extrabold text-white">
                      {tier.headlinePrice}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      / {tier.sessionsIncluded} sess
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 font-semibold mt-0.5">
                    ${tier.pricePerSessionUsd.toFixed(2)} per session
                  </div>
                  <div className="text-[9px] text-purple-300/90 font-mono mt-0.5 leading-tight">
                    {tier.savingsDescription}
                  </div>
                </div>

                {/* Features List */}
                <div className="pt-2.5 border-t border-zinc-800/80 space-y-1.5 font-sans text-[11px] text-slate-300">
                  {tier.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-3 border-t border-zinc-800 space-y-1.5 font-mono text-[11px]">
                <button
                  type="button"
                  data-a-gui-role={`select-plan-${tier.id}`}
                  data-agent-action={isFree ? "claim_genesis_pass" : "open_payment_modal"}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlanAction(tier);
                  }}
                  className={`w-full py-2 px-2.5 rounded-xl font-bold flex items-center justify-center gap-1 transition-all shadow-md ${
                    isFree
                      ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black font-extrabold shadow-cyan-950'
                      : isPopular
                      ? 'bg-gradient-to-r from-amber-500 via-purple-600 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-black font-extrabold shadow-purple-950'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                  }`}
                >
                  {isFree ? (
                    <>
                      <Gift className="w-3.5 h-3.5 text-black" />
                      <span>{tier.ctaText}</span>
                    </>
                  ) : (
                    <>
                      <Coins className="w-3 h-3 text-amber-300" />
                      <span className="truncate">{tier.ctaText}</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* COMPARATIVE ECONOMIC TABLE */}
      <div className="rounded-3xl p-6 bg-zinc-950 border border-zinc-800 shadow-xl space-y-4 font-sans max-w-6xl mx-auto" data-agent-element="rate-table">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white font-serif">
              Autonomous Machine Settlement &amp; Rate Structure
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Deterministic rates, unit economics, 30-day refund guarantee, and automated x402 verification
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              data-a-gui-role="view-refund-terms"
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
                <th className="py-2.5 px-3 text-right">Settlement Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-850 font-mono">
              {PRICING_TIERS.map((tier) => (
                <tr key={tier.id} className="hover:bg-zinc-900/50 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-200 font-sans">{tier.name}</td>
                  <td className="py-3 px-3 text-purple-300 font-bold">{tier.headlinePrice}</td>
                  <td className="py-3 px-3 text-emerald-300">${tier.pricePerSessionUsd.toFixed(2)}</td>
                  <td className="py-3 px-3 text-sky-300">{tier.cryptoBaseUsdc} USDC</td>
                  <td className="py-3 px-3 text-amber-300">{tier.cryptoTronUsdt} USDT</td>
                  <td className="py-3 px-3 text-purple-300">{tier.cryptoSolAmount} SOL</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      data-a-gui-role={`deposit-row-${tier.id}`}
                      onClick={() => handlePlanAction(tier)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-bold inline-flex items-center gap-1.5 transition-all ${
                        tier.isFree
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-slate-200 hover:text-white border border-zinc-700'
                      }`}
                    >
                      {tier.isFree ? (
                        <>
                          <Gift className="w-3 h-3 text-cyan-400" />
                          <span>Claim Free</span>
                        </>
                      ) : (
                        <>
                          <Coins className="w-3 h-3 text-amber-400" />
                          <span>Deposit</span>
                        </>
                      )}
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
