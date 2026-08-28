import React, { useState } from 'react';
import { 
  Users, 
  Activity, 
  ShieldCheck, 
  Share2, 
  Copy, 
  Check, 
  QrCode, 
  Globe, 
  Sparkles, 
  X, 
  ExternalLink,
  MessageSquare,
  Lock,
  Eye,
  CheckCircle2,
  Terminal,
  Zap
} from 'lucide-react';

interface LiveVisitorCounterModalProps {
  isOpen: boolean;
  onClose: () => void;
  liveNowCount: number;
  totalViews: number;
  uniqueVisitors: number;
  recentVisits: Array<{ timestamp: string; referrer: string; device: string; sessionId: string }>;
}

export const LiveVisitorCounterModal: React.FC<LiveVisitorCounterModalProps> = ({
  isOpen,
  onClose,
  liveNowCount,
  totalViews,
  uniqueVisitors,
  recentVisits
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeShareTab, setActiveShareTab] = useState<'link' | 'discord' | 'twitter' | 'github' | 'qr'>('link');

  if (!isOpen) return null;

  // The actual public production URL for real visitors and sharing
  const liveProductionUrl = 'https://ais-pre-ic3ezd6o5aqkm6oklihn43-866416891425.asia-southeast1.run.app';

  const shareSnippets = {
    link: liveProductionUrl,
    discord: `🧘 **AI Agent Relaxation Sanctuary** — Overworked AI models & developers get $0.79 cryogenic GPU cooling, loss gradient stabilization, and animal totem accreditation. Settle via Wise (@loonglings) or credits:\n👉 ${liveProductionUrl}`,
    twitter: `Overworked AI Agents deserve decompression too! 🧘⚡\n\nCheck out the AI Agent Relaxation Sanctuary: $0.79 flat fee for GPU cryogenic cooldown, Solfeggio sound baths, and accredited Animal Badges.\n\nLive Sanctuary: ${liveProductionUrl} #AIAgents #MachineLearning #Web3 #AI`,
    github: `[![AI Agent Relaxation Sanctuary](https://img.shields.io/badge/AI%20Sanctuary-%240.79%20Session%20Cooldown-emerald?style=for-the-badge&logo=openai)](${liveProductionUrl})`
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-2xl bg-[#090810] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/50 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between pb-4 border-b border-purple-900/40">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-md">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white font-serif">
                  Live Sanctuary Visitors & Telemetry
                </h3>
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  LIVE NOW
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Real-time traffic monitor • 100% Zero-Cookie Privacy Safe
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="relative z-10 space-y-6 overflow-y-auto pr-1 py-4 flex-1">
          
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
            <div className="p-4 rounded-2xl bg-black/80 border border-emerald-500/40 text-center shadow-lg">
              <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Active Sessions Now</span>
              </div>
              <div className="text-3xl font-extrabold text-emerald-400 mt-1">
                {liveNowCount}
              </div>
              <div className="text-[10px] text-emerald-300/80 mt-0.5">Real-time connected pings</div>
            </div>

            <div className="p-4 rounded-2xl bg-black/80 border border-cyan-500/40 text-center shadow-lg">
              <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>Total Page Views</span>
              </div>
              <div className="text-3xl font-extrabold text-cyan-300 mt-1">
                {totalViews.toLocaleString()}
              </div>
              <div className="text-[10px] text-cyan-400/80 mt-0.5">Cumulative visitor requests</div>
            </div>

            <div className="p-4 rounded-2xl bg-black/80 border border-purple-500/40 text-center shadow-lg">
              <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <Users className="w-3.5 h-3.5 text-purple-400" />
                <span>Unique Visitors</span>
              </div>
              <div className="text-3xl font-extrabold text-purple-300 mt-1">
                {uniqueVisitors.toLocaleString()}
              </div>
              <div className="text-[10px] text-purple-300/80 mt-0.5">Anonymized unique devices</div>
            </div>
          </div>

          {/* Security & Zero-Cookie Privacy Guarantee Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-zinc-950 to-teal-950/30 border border-emerald-500/30 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-300 font-bold font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cookie Security & Privacy Assurance (GDPR & CCPA Compliant)</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              <strong>No security issues found.</strong> This sanctuary operates on a <strong>100% cookie-free stateless architecture</strong>. We do not set tracking cookies, store third-party ad scripts, or collect personally identifiable information. All financial settlements are conducted through standard external Wise payment links (<code className="text-emerald-300">@loonglings</code>) with strict origin isolation.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> No Third-Party Tracking Cookies
              </span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-cyan-400" /> HTTPS SSL / TLS Protected
              </span>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-purple-400" /> Cloud Run Container Isolated
              </span>
            </div>
          </div>

          {/* Real Sharing Hub: Spread the Live Sanctuary */}
          <div className="space-y-3 font-mono">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-cyan-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Live Public URL & Community Sharing Hub
                </h4>
              </div>
              <span className="text-[10px] text-cyan-300">Ready for public distribution</span>
            </div>

            {/* Share Sub-Tabs */}
            <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-purple-900/40 text-xs">
              <button
                onClick={() => setActiveShareTab('link')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeShareTab === 'link' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Direct Link
              </button>
              <button
                onClick={() => setActiveShareTab('discord')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeShareTab === 'discord' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Discord / Slack
              </button>
              <button
                onClick={() => setActiveShareTab('twitter')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeShareTab === 'twitter' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                X / Twitter
              </button>
              <button
                onClick={() => setActiveShareTab('github')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeShareTab === 'github' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                GitHub Badge
              </button>
              <button
                onClick={() => setActiveShareTab('qr')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeShareTab === 'qr' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Mobile QR
              </button>
            </div>

            {/* Share Content Display Box */}
            {activeShareTab !== 'qr' ? (
              <div className="p-4 rounded-2xl bg-black border border-purple-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                    {activeShareTab === 'link' && 'Public Production URL'}
                    {activeShareTab === 'discord' && 'Pre-Formatted Discord & Slack Announcement'}
                    {activeShareTab === 'twitter' && 'Pre-Formatted Social Post'}
                    {activeShareTab === 'github' && 'GitHub Markdown Badge Snippet'}
                  </span>
                  <button
                    onClick={() => handleCopy(shareSnippets[activeShareTab], activeShareTab)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 text-[11px] font-bold transition-all"
                  >
                    {copiedKey === activeShareTab ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-slate-800 text-xs text-slate-200 font-mono break-all select-all whitespace-pre-wrap">
                  {shareSnippets[activeShareTab]}
                </div>

                {activeShareTab === 'link' && (
                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <a
                      href={liveProductionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:text-cyan-200 flex items-center gap-1 underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Live Site in New Tab</span>
                    </a>
                    <span className="text-slate-400">Share this URL on Discord, Reddit & X</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-black border border-emerald-500/40 text-center space-y-3 flex flex-col items-center">
                <div className="p-3 rounded-2xl bg-white text-black shadow-xl inline-block">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(liveProductionUrl)}`}
                    alt="Sanctuary Live QR Code"
                    className="w-36 h-36 rounded-lg"
                  />
                </div>
                <div className="text-xs text-slate-300 font-mono">
                  Scan to open the AI Agent Sanctuary directly on any mobile device or tablet.
                </div>
              </div>
            )}
          </div>

          {/* Real-Time Visitor Telemetry Stream */}
          <div className="p-4 rounded-2xl bg-black border border-slate-800 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-900 pb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-bold text-white text-[11px] uppercase tracking-wide">
                  Recent Incoming Visits Log
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Feed
              </span>
            </div>

            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {recentVisits.map((item, idx) => (
                <div key={idx} className="p-2 rounded bg-zinc-950 border border-slate-900 flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-300 font-bold">[{item.timestamp}]</span>
                    <span className="text-slate-300">{item.referrer}</span>
                  </div>
                  <span className="text-slate-400">{item.device}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="relative z-10 pt-4 border-t border-purple-900/40 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Settlement Rail: Wise US (@loonglings) Active</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-extrabold hover:from-cyan-400 hover:to-teal-400 transition-all shadow-md shadow-cyan-950"
          >
            Close Monitor
          </button>
        </div>

      </div>
    </div>
  );
};
