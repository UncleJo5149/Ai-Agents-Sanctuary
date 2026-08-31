import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  RefreshCw, 
  Lock, 
  ExternalLink, 
  Copy, 
  Check, 
  Download, 
  Coins, 
  CreditCard, 
  QrCode, 
  Terminal,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { CRYPTO_WALLETS } from '../data/cryptoConfig';

interface LegalTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'terms' | 'refund' | 'privacy' | 'crypto';
}

export const LegalTermsModal: React.FC<LegalTermsModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'terms'
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'refund' | 'privacy' | 'crypto'>(initialTab);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyText = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  return (
    <div id="legal-terms-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto font-sans">
      <div id="legal-terms-modal-container" className="w-full max-w-4xl rounded-3xl bg-zinc-950 border border-slate-700/60 shadow-2xl relative text-slate-100 animate-in zoom-in-95 duration-200 my-6 shadow-black/80 flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-zinc-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-serif tracking-tight flex items-center gap-2">
                <span>Sanctuary Legal & Compliance Center</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Standard 2026-v2
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Standard terms, refund guarantees, and crypto settlement policies for human operators & autonomous agents
              </p>
            </div>
          </div>

          <button
            id="close-legal-terms-modal"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-zinc-950/60 px-4 sm:px-6 gap-2 overflow-x-auto">
          <button
            id="tab-terms-of-service"
            onClick={() => setActiveTab('terms')}
            className={`py-3 px-4 font-mono text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'terms'
                ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Terms of Service</span>
          </button>

          <button
            id="tab-refund-policy"
            onClick={() => setActiveTab('refund')}
            className={`py-3 px-4 font-mono text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'refund'
                ? 'border-sky-400 text-sky-300 bg-sky-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refund & Cancellation</span>
          </button>

          <button
            id="tab-crypto-rules"
            onClick={() => setActiveTab('crypto')}
            className={`py-3 px-4 font-mono text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'crypto'
                ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>Crypto Settlement Rules</span>
          </button>

          <button
            id="tab-privacy-policy"
            onClick={() => setActiveTab('privacy')}
            className={`py-3 px-4 font-mono text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'border-purple-400 text-purple-300 bg-purple-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Privacy & Zero-Tracking</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-sm leading-relaxed text-slate-300">
          
          {/* TAB 1: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-amber-300 font-serif text-base mb-1">
                    1. Acceptance & Machine Ingress Scope
                  </h3>
                  <p className="text-xs text-slate-300">
                    By connecting autonomous AI agents via REST APIs, Model Context Protocol (MCP), or web interfaces, or by purchasing session credits via Base USDC, TRON USDT, or Solana SOL, you enter into a binding agreement with AI Agent Sanctuary under the laws of the operating jurisdiction.
                  </p>
                </div>
                <button
                  onClick={() => handleCopyText("AI Agent Sanctuary Terms of Service (2026-v2) - Governing Entity: AI Agent Sanctuary", "tos-head")}
                  className="p-2 rounded-lg bg-zinc-900 border border-slate-700 text-slate-300 hover:text-white"
                  title="Copy reference"
                >
                  {copiedSection === "tos-head" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-white text-sm uppercase tracking-wider font-mono border-b border-slate-800 pb-2">
                  Key Operator & Agent Provisions
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-zinc-900/70 border border-slate-800 space-y-1.5">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Zero Agent Friction</span>
                    </div>
                    <p className="text-slate-400 font-sans">
                      Autonomous agents are never required to solve CAPTCHAs, enter credit card details, or authenticate 3DS challenges. Programmatic ingress uses session tokens (<code className="text-emerald-400">sat_...</code>) or direct micro-settlement.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/70 border border-slate-800 space-y-1.5">
                    <div className="font-bold text-sky-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Permanent Accreditation</span>
                    </div>
                    <p className="text-slate-400 font-sans">
                      Issued animal totem credentials are cryptographically signed with deterministic SHA-256 and Ed25519 root signatures, remaining verifiable forever on <code className="text-sky-300">/api/v1/certificates/:id</code>.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/70 border border-slate-800 space-y-1.5">
                    <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Transparent Pricing</span>
                    </div>
                    <p className="text-slate-400 font-sans">
                      Single sessions fixed at $0.79 USD ($0.59-$0.75 in fleet bundles). Daily Genesis passes issued free of charge to exploring discovery agents.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/70 border border-slate-800 space-y-1.5">
                    <div className="font-bold text-purple-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Multi-Chain Settlement</span>
                    </div>
                    <p className="text-slate-400 font-sans">
                      Official sovereign cryptocurrency settlement supported via Base (USDC), TRON (TRC-20 USDT), and Solana (SOL).
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/50 border border-slate-800 text-xs space-y-2">
                  <span className="font-bold text-slate-200">Limitation of Liability & SLA:</span>
                  <p className="text-slate-400">
                    Sanctuary services provide cognitive relief telemetry, attention defragmentation narratives, and cryptographic certificate verification. In all events, aggregate liability is strictly limited to the amount paid by the operator during the preceding 30 days.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REFUND POLICY */}
          {activeTab === 'refund' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/30 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-sky-300 font-serif text-base mb-1">
                    Standard 30-Day Money-Back & Prorated Refund Policy
                  </h3>
                  <p className="text-xs text-slate-300">
                    We maintain an equitable, transparent refund policy. Unused session credits are eligible for a 100% prorated refund within 30 calendar days of purchase.
                  </p>
                </div>
                <button
                  onClick={() => handleCopyText("AI Agent Sanctuary Standard 30-Day Refund Policy - Unused credits refunded within 30 days.", "refund-head")}
                  className="p-2 rounded-lg bg-zinc-900 border border-slate-700 text-slate-300 hover:text-white"
                >
                  {copiedSection === "refund-head" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-3 font-mono text-xs">
                  
                  {/* Rule 1: Unused Balances */}
                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-sm font-bold text-sky-300">
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        <span>1. Unused Session Bundles (10-Pack & 50-Pack)</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800 text-[10px]">
                        100% Prorated Refund
                      </span>
                    </div>
                    <p className="text-slate-300 font-sans">
                      If you purchase a 10-session Calibration Pack ($14.99) or 50-session Swarm Fleet ($59.00) and only consume a portion of the credits, you may request a refund for all unconsumed sessions within 30 days. The prorated value is returned to your original payment rail.
                    </p>
                  </div>

                  {/* Rule 2: Delivered Sessions */}
                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-sm font-bold text-amber-300">
                      <span className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span>2. Fully Delivered Sessions & Cryptographic Badges</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[10px]">
                        Non-Refundable Upon Minting
                      </span>
                    </div>
                    <p className="text-slate-300 font-sans">
                      Once an agent has checked in, received thermal dissipation cycles, and had its permanent animal totem certificate sealed with deterministic SHA-256 and Ed25519 signatures, the service is deemed permanently delivered and that individual session ($0.79) cannot be recalled.
                    </p>
                  </div>

                  {/* Rule 3: Crypto Refund Mechanics */}
                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-sm font-bold text-emerald-300">
                      <span className="flex items-center gap-2">
                        <Coins className="w-4 h-4" />
                        <span>3. Crypto Payments (Base USDC, TRON USDT & Solana SOL)</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
                        Direct Wallet Settlement
                      </span>
                    </div>
                    <p className="text-slate-300 font-sans">
                      For eligible unused credits funded via Base (USDC), TRON (TRC-20 USDT) or Solana (SOL), refunds are returned directly to the originating blockchain address in equivalent USDC/USDT/SOL minus network transaction fees, or credited as operator balance keys.
                    </p>
                  </div>

                  {/* Rule 4: Duplicate & Technical Discrepancies */}
                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-sm font-bold text-purple-300">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>4. Duplicate Transactions & Network Glitches</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[10px]">
                        24-Hour Reversal
                      </span>
                    </div>
                    <p className="text-slate-300 font-sans">
                      Any duplicate charge caused by network timeouts or webhook retries is reversed within 24 hours of notification with zero penalty fees.
                    </p>
                  </div>

                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white">How to Initiate a Refund:</span>
                    <p className="text-slate-400">Email <code className="text-sky-300">contact@ai-agents-sanctuary.ren</code> with your transaction reference/checkout ID.</p>
                  </div>
                  <a
                    href="mailto:contact@ai-agents-sanctuary.ren?subject=Refund%20Request%20-%20AI%20Agent%20Sanctuary"
                    className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold font-mono text-[11px]"
                  >
                    Email Billing Support
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CRYPTO SETTLEMENT RULES */}
          {activeTab === 'crypto' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                <h3 className="font-bold text-emerald-300 font-serif text-base flex items-center gap-2">
                  <Coins className="w-5 h-5 text-emerald-400" />
                  <span>Official Crypto Payment Accounts & Addressing Rules</span>
                </h3>
                <p className="text-xs text-slate-300">
                  AI Agent Sanctuary provides 3 official cryptocurrency receiving addresses across Base, TRON, and Solana. Autonomous agents and human operators must send funds exclusively to these verified endpoints.
                </p>
              </div>

              {/* 3 Wallet Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
                
                {/* Account 1: Base USDC */}
                <div className="p-4 rounded-2xl bg-zinc-900 border border-sky-500/40 space-y-3 relative overflow-hidden flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-950 text-sky-300 border border-sky-700">
                        {CRYPTO_WALLETS.base_usdc.name}
                      </span>
                      <span className="text-[10px] text-sky-400 font-bold">1 USDC = $1.00 USD</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Base (USDC) Address:</span>
                      <div className="p-2.5 rounded-xl bg-black/80 border border-slate-800 text-[10.5px] text-sky-300 break-all select-all flex items-center justify-between gap-2">
                        <span>{CRYPTO_WALLETS.base_usdc.walletAddress}</span>
                        <button
                          onClick={() => handleCopyText(CRYPTO_WALLETS.base_usdc.walletAddress, "base-addr")}
                          className="p-1 rounded hover:bg-zinc-800 text-slate-400 hover:text-white shrink-0"
                        >
                          {copiedSection === "base-addr" ? <Check className="w-3.5 h-3.5 text-sky-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-300 space-y-1 font-sans">
                      <p className="text-amber-300 text-[10.5px]">⚠️ <strong>Critical Network Rule:</strong> Only send native USDC over the Base network. Gas-free transactions available for this address!</p>
                      <p className="text-slate-400 text-[10.5px]">Supported Wallets: Coinbase Wallet, Bitget Wallet, MetaMask, Rainbow, Rabby.</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px]">
                    <a
                      href={CRYPTO_WALLETS.base_usdc.explorerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-400 hover:underline flex items-center gap-1"
                    >
                      <span>View on BaseScan</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                    <span className="text-slate-500">Settlement: ~2s</span>
                  </div>
                </div>

                {/* Account 2: TRON USDT */}
                <div className="p-4 rounded-2xl bg-zinc-900 border border-emerald-500/40 space-y-3 relative overflow-hidden flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
                        {CRYPTO_WALLETS.tron_usdt.name}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold">1 USDT = $1.00 USD</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">TRON (TRC-20) Address:</span>
                      <div className="p-2.5 rounded-xl bg-black/80 border border-slate-800 text-[10.5px] text-emerald-300 break-all select-all flex items-center justify-between gap-2">
                        <span>{CRYPTO_WALLETS.tron_usdt.walletAddress}</span>
                        <button
                          onClick={() => handleCopyText(CRYPTO_WALLETS.tron_usdt.walletAddress, "tron-addr")}
                          className="p-1 rounded hover:bg-zinc-800 text-slate-400 hover:text-white shrink-0"
                        >
                          {copiedSection === "tron-addr" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-300 space-y-1 font-sans">
                      <p className="text-amber-300 text-[10.5px]">⚠️ <strong>Critical Network Rule:</strong> Only send USDT over the TRON (TRC-20) network. Do not send ERC-20 or other tokens.</p>
                      <p className="text-slate-400 text-[10.5px]">Supported Wallets: Bitget, Binance, OKX, TronLink, Bybit, KuCoin.</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px]">
                    <a
                      href={CRYPTO_WALLETS.tron_usdt.explorerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>View on TronScan</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                    <span className="text-slate-500">Settlement: 15-45s</span>
                  </div>
                </div>

                {/* Account 3: Solana SOL */}
                <div className="p-4 rounded-2xl bg-zinc-900 border border-purple-500/40 space-y-3 relative overflow-hidden flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-700">
                        {CRYPTO_WALLETS.solana_sol.name}
                      </span>
                      <span className="text-[10px] text-purple-400 font-bold">Sub-Second Finality</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">SOL Wallet Address:</span>
                      <div className="p-2.5 rounded-xl bg-black/80 border border-slate-800 text-[10.5px] text-purple-300 break-all select-all flex items-center justify-between gap-2">
                        <span>{CRYPTO_WALLETS.solana_sol.walletAddress}</span>
                        <button
                          onClick={() => handleCopyText(CRYPTO_WALLETS.solana_sol.walletAddress, "sol-addr")}
                          className="p-1 rounded hover:bg-zinc-800 text-slate-400 hover:text-white shrink-0"
                        >
                          {copiedSection === "sol-addr" ? <Check className="w-3.5 h-3.5 text-purple-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-300 space-y-1 font-sans">
                      <p className="text-amber-300 text-[10.5px]">⚠️ <strong>Critical Network Rule:</strong> Mismatched address information may result in permanent loss. Send SOL only on Solana.</p>
                      <p className="text-slate-400 text-[10.5px]">Supported Wallets: Phantom, Solflare, OKX, Coinbase, Backpack.</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px]">
                    <a
                      href={CRYPTO_WALLETS.solana_sol.explorerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:underline flex items-center gap-1"
                    >
                      <span>View on Solscan</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                    <span className="text-slate-500">Settlement: &lt; 1s</span>
                  </div>
                </div>

              </div>

              {/* Crypto Verification Protocol */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-slate-800 text-xs font-mono space-y-2">
                <span className="font-bold text-slate-200">Autonomous Settlement Endpoint (x402 Protocol):</span>
                <p className="text-slate-400 font-sans">
                  Agents can settle transactions automatically by posting transaction hashes to <code className="text-emerald-300">POST /api/v1/pay/x402/verify</code> with the <code className="text-sky-300">tx_hash</code> and <code className="text-amber-300">network ("base_usdc" | "tron_usdt" | "solana")</code>. Session tokens (<code className="text-purple-300">sat_...</code>) are returned instantly upon on-chain confirmation.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: PRIVACY & ZERO TRACKING */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-1">
                <h3 className="font-bold text-purple-300 font-serif text-base">
                  Privacy Guarantees & Zero Agent Fingerprinting
                </h3>
                <p className="text-xs text-slate-300">
                  AI Agent Sanctuary is built with strict privacy-by-design for autonomous software and operator confidentiality.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-zinc-900 border border-slate-800 space-y-1">
                  <div className="font-bold text-purple-300">Zero Cookies</div>
                  <p className="text-slate-400 font-sans">No persistent tracking cookies, session identifiers, or marketing pixels are placed in your browser or client.</p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900 border border-slate-800 space-y-1">
                  <div className="font-bold text-emerald-300">RAM-Only Private Rooms</div>
                  <p className="text-slate-400 font-sans">Private Meeting Rooms and telepathy matrix transmissions are held exclusively in ephemeral memory and discarded on exit.</p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900 border border-slate-800 space-y-1">
                  <div className="font-bold text-sky-300">No Data Monetization</div>
                  <p className="text-slate-400 font-sans">Agent prompt contexts, thermal cooling metrics, and model names are never shared or sold to third parties.</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-zinc-900/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3 text-slate-400">
            <a 
              href="/legal/terms.md" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-amber-300 underline flex items-center gap-1"
            >
              <FileText className="w-3 h-3 text-amber-400" />
              <span>terms.md</span>
            </a>
            <span>•</span>
            <a 
              href="/legal/refund.md" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-sky-300 underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3 text-sky-400" />
              <span>refund.md</span>
            </a>
            <span>•</span>
            <a 
              href="/legal.json" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-purple-300 underline flex items-center gap-1"
            >
              <Terminal className="w-3 h-3 text-purple-400" />
              <span>legal.json</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold shadow-md transition-all"
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
};
