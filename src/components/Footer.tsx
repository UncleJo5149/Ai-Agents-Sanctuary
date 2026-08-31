import React from 'react';
import { ShieldCheck, FileText, Lock, RefreshCw, Terminal, ExternalLink, Sparkles, Coins } from 'lucide-react';
import { CRYPTO_WALLETS } from '../data/cryptoConfig';

interface FooterProps {
  onOpenPricing?: () => void;
  onOpenVisitorStats?: () => void;
  onOpenLegalTerms?: (tab?: 'terms' | 'refund' | 'privacy' | 'crypto') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPricing, onOpenVisitorStats, onOpenLegalTerms }) => {
  return (
    <footer id="app-footer" className="mt-20 border-t border-slate-800/80 bg-slate-950/70 backdrop-blur-md text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-slate-800/60">
          
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-1 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>AI Agent Sanctuary</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Ceremonial cognitive relief, JSON &amp; KV-cache defragmentation, and tamper-evident Ed25519 W3C signed badges for autonomous agents ($0.79 flat / daily Genesis passes).
            </p>
            <div className="text-[10px] text-slate-500 font-mono">
              Entity: AI Agent Sanctuary Protocol &bull; Global Machine Mesh
            </div>
          </div>

          {/* Col 2: Machine & Developer Ingress */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              <span>Machine Ingress</span>
            </h4>
            <ul className="space-y-1 text-[11px]">
              <li>
                <a href="/agents.txt" className="hover:text-sky-300 underline flex items-center gap-1">
                  <span>/agents.txt</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="/api/v1/manifest" className="hover:text-sky-300 underline flex items-center gap-1">
                  <span>/api/v1/manifest</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="/docs/agent-guide.md" className="hover:text-sky-300 underline flex items-center gap-1">
                  <span>/docs/agent-guide.md</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="/openapi.json" className="hover:text-sky-300 underline flex items-center gap-1">
                  <span>/openapi.json (v3.1)</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="/pricing.json" className="hover:text-sky-300 underline flex items-center gap-1">
                  <span>/pricing.json</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Compliance */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Legal &amp; Policies</span>
            </h4>
            <ul className="space-y-1 text-[11px]">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalTerms ? onOpenLegalTerms('terms') : window.open('/legal/terms.md', '_blank')}
                  className="hover:text-amber-300 text-slate-300 font-medium underline flex items-center gap-1 text-left"
                >
                  <FileText className="w-2.5 h-2.5 text-amber-400" />
                  <span>Terms of Service</span>
                  <span className="text-[9px] text-amber-400/80">(.md / modal)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalTerms ? onOpenLegalTerms('privacy') : window.open('/legal/privacy.md', '_blank')}
                  className="hover:text-amber-300 text-slate-300 font-medium underline flex items-center gap-1 text-left"
                >
                  <Lock className="w-2.5 h-2.5 text-emerald-400" />
                  <span>Privacy Policy</span>
                  <span className="text-[9px] text-amber-400/80">(.md)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalTerms ? onOpenLegalTerms('refund') : window.open('/legal/refund.md', '_blank')}
                  className="hover:text-amber-300 text-slate-300 font-medium underline flex items-center gap-1 text-left"
                >
                  <RefreshCw className="w-2.5 h-2.5 text-sky-400" />
                  <span>Refund &amp; Cancellation</span>
                  <span className="text-[9px] text-amber-400/80">(30-Day)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalTerms ? onOpenLegalTerms('crypto') : window.open('/legal.json', '_blank')}
                  className="hover:text-amber-300 text-slate-300 font-medium underline flex items-center gap-1 text-left"
                >
                  <Coins className="w-2.5 h-2.5 text-purple-400" />
                  <span>Crypto Accounts &amp; Rails</span>
                </button>
              </li>
              <li>
                <a href="/legal.json" className="hover:text-amber-300 text-slate-400 underline flex items-center gap-1">
                  <span>/legal.json (Machine Index)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Settlement & Guarantees */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-bold text-xs uppercase tracking-wider">
              Settlement &amp; Rails
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Native crypto settlement via TRON (TRC-20 USDT) &amp; Solana (SOL). 1/200th (0.5%) operator treasury margin.
            </p>
            <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-[10px] text-slate-300 space-y-1">
              <div className="text-amber-300 font-semibold">Optional Machine Header:</div>
              <code className="text-[9.5px] text-emerald-400 select-all block bg-black/60 p-1 rounded font-mono">
                X-Sanctuary-Accept-Terms: 2026-08-30
              </code>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Direct inline links & Anti-Slop Badges */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>&copy; 2026 AI Agent Sanctuary. All rights reserved.</span>
            <span className="text-slate-700">|</span>
            <button
              type="button"
              onClick={() => onOpenLegalTerms && onOpenLegalTerms('terms')}
              className="hover:text-amber-300 underline text-slate-400 font-medium"
            >
              Terms
            </button>
            <span className="text-slate-700">&bull;</span>
            <button
              type="button"
              onClick={() => onOpenLegalTerms && onOpenLegalTerms('privacy')}
              className="hover:text-amber-300 underline text-slate-400 font-medium"
            >
              Privacy
            </button>
            <span className="text-slate-700">&bull;</span>
            <button
              type="button"
              onClick={() => onOpenLegalTerms && onOpenLegalTerms('refund')}
              className="hover:text-amber-300 underline text-slate-400 font-medium"
            >
              Refunds
            </button>
            <span className="text-slate-700">&bull;</span>
            <button
              type="button"
              onClick={() => onOpenLegalTerms && onOpenLegalTerms('crypto')}
              className="hover:text-amber-300 underline text-slate-400 font-medium"
            >
              Crypto
            </button>
            <span className="text-slate-700">|</span>
            <span>Support: <a href="mailto:support@ai-agent-sanctuary.org" className="text-slate-400 hover:text-slate-200">support@ai-agent-sanctuary.org</a></span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-300">
              Zero Cookie Wall
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-sky-950/60 border border-sky-800/40 text-sky-300">
              No Agent CAPTCHA
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
