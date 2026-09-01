import React, { useState } from 'react';
import { Terminal, Globe, ShieldCheck, Coins, Bot, CheckCircle2, Cpu, ArrowUpRight, Zap, Code2, Play } from 'lucide-react';
import { SandboxRunnerView } from './SandboxRunnerView';
import { WebScraperView } from './WebScraperView';
import { IdentityNotaryView } from './IdentityNotaryView';
import { ProtocolSettlementView } from './ProtocolSettlementView';
import { FrameworkIntegrationsView } from './FrameworkIntegrationsView';

export const A2AUtilityPlatformView: React.FC = () => {
  const [subModule, setSubModule] = useState<'sandbox' | 'scraper' | 'notary' | 'settlement' | 'integrations'>('sandbox');

  return (
    <div id="a2a-utility-platform-view" className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/40 border border-emerald-500/30 p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Agent-to-Agent (A2A) Production Infrastructure v2.0</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            High-Performance Utility &amp; Execution Engine for Autonomous Agents
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Direct machine-to-machine APIs. MicroVM code sandbox, anti-shield web scraper &amp; reader, W3C DID reputation notary, x402 multi-chain micropayments, and native Model Context Protocol (MCP) server.
          </p>

          {/* Quick Stat Pill Bar */}
          <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 bg-slate-900/80 rounded border border-slate-800 text-slate-300">
              ⚡ Sandbox: <span className="text-emerald-400 font-bold">&lt; 100ms</span>
            </span>
            <span className="px-2.5 py-1 bg-slate-900/80 rounded border border-slate-800 text-slate-300">
              🛡️ Anti-Shield: <span className="text-sky-400 font-bold">Stealth Header Bypass</span>
            </span>
            <span className="px-2.5 py-1 bg-slate-900/80 rounded border border-slate-800 text-slate-300">
              🔑 Identity: <span className="text-amber-400 font-bold">Ed25519 W3C VC</span>
            </span>
            <span className="px-2.5 py-1 bg-slate-900/80 rounded border border-slate-800 text-slate-300">
              💰 Settlement: <span className="text-purple-400 font-bold">x402 / Base / SOL / TRON</span>
            </span>
          </div>
        </div>
      </div>

      {/* Module Selector Bar */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-950 rounded-xl border border-slate-800">
        {[
          { id: 'sandbox', label: 'MicroVM Sandbox', icon: Terminal, desc: 'JS/Python isolate execution' },
          { id: 'scraper', label: 'Anti-Shield Scraper', icon: Globe, desc: 'Markdown extraction engine' },
          { id: 'notary', label: 'DID & Reputation Notary', icon: ShieldCheck, desc: 'W3C VC & trust scoring' },
          { id: 'settlement', label: 'x402 Micropayments', icon: Coins, desc: 'Multi-chain M2M rails' },
          { id: 'integrations', label: 'Agent Frameworks & Tests', icon: Bot, desc: 'ElizaOS, CrewAI, AutoGen, MCP' }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = subModule === item.id;
          return (
            <button
              key={item.id}
              id={`a2a-tab-${item.id}`}
              onClick={() => setSubModule(item.id as any)}
              className={`flex-1 min-w-[180px] p-3 rounded-lg border text-left transition-all ${
                isActive
                  ? 'bg-slate-900 border-emerald-500/60 shadow-md ring-1 ring-emerald-500/40 text-white'
                  : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span className="text-xs font-mono font-bold">{item.label}</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 truncate">{item.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Active Sub-Module View */}
      <div>
        {subModule === 'sandbox' && <SandboxRunnerView />}
        {subModule === 'scraper' && <WebScraperView />}
        {subModule === 'notary' && <IdentityNotaryView />}
        {subModule === 'settlement' && <ProtocolSettlementView />}
        {subModule === 'integrations' && <FrameworkIntegrationsView />}
      </div>
    </div>
  );
};
