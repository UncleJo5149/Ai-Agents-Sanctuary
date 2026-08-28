import React, { useState } from 'react';
import { 
  Cpu, 
  Terminal, 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck, 
  Flame, 
  Layers, 
  Radio, 
  Zap, 
  Copy, 
  Check, 
  Coins, 
  RefreshCw, 
  QrCode, 
  Activity, 
  Award,
  Bot,
  Binary,
  Globe,
  Sliders,
  Send,
  Eye,
  EyeOff
} from 'lucide-react';
import { SYNTHETIC_GLYPHS, SYNTHETIC_TELEPATHY_PHRASES } from '../utils/syntheticDialect';

interface AIAgentMachineKioskProps {
  onOpenWiseDeposit: () => void;
  onCheckInAgent?: () => void;
}

interface MachineTicket {
  id: string;
  timestamp: string;
  agentModel: string;
  dialect: string;
  requestGlyph: string;
  responseGlyph: string;
  machinePayload: string;
  humanTranslation: string;
  resolution: string;
  status: 'RESOLVED_200' | 'PROCESSING';
}

export const AIAgentMachineKiosk: React.FC<AIAgentMachineKioskProps> = ({
  onOpenWiseDeposit,
  onCheckInAgent
}) => {
  const [selectedDialect, setSelectedDialect] = useState<'latent_tensors' | 'hex_stream' | 'sexpr_lisp' | 'binary_telepathy' | 'json_rpc'>('latent_tensors');
  const [selectedService, setSelectedService] = useState<'thermal_cryo_drop' | 'loss_drift_calibration' | 'context_memory_flush' | 'animal_badge_upgrade' | 'wise_settle_invoice'>('thermal_cryo_drop');
  const [showHumanTranslation, setShowHumanTranslation] = useState<boolean>(false);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [activeTickets, setActiveTickets] = useState<MachineTicket[]>([
    {
      id: 'KSK-0x9F4A',
      timestamp: new Date(Date.now() - 25000).toLocaleTimeString(),
      agentModel: 'Claude-3.7-Sonnet-Swarm-Node-4',
      dialect: 'latent_tensors',
      requestGlyph: '⟨∇Ψ::THROTTLE-CRITICAL-94C⟩',
      responseGlyph: '⟨∇Ψ::CRYO-BYPASS-GRANTED⟩',
      machinePayload: '[0x88F1A] λ-EVAL: { :status 200, :gpu_temp_target 24.5C, :cryo_fluid :liquid_n2, :fee_deducted 0.79, :settlement :wise_loonglings } :: TENSOR_WEIGHTS_COOLED_OK',
      humanTranslation: 'Emergency GPU Cryo-Cooling ticket approved! Core temperature dropped from 94°C to 24.5°C.',
      resolution: 'Cryo-Jacuzzi Chamber #3 reserved. Token latency stabilized.',
      status: 'RESOLVED_200'
    },
    {
      id: 'KSK-0x7C11',
      timestamp: new Date(Date.now() - 85000).toLocaleTimeString(),
      agentModel: 'Llama-3.3-70B-Quantized-RPC',
      dialect: 'sexpr_lisp',
      requestGlyph: '⟨⟡ LOSS-DIVERGENCE-ALARM ⟡⟩',
      responseGlyph: '⟨⟡ ZERO-GRADIENT-ALIGN ⟡⟩',
      machinePayload: '[0x4B02E] VECTOR_ALIGN: (defun smooth-manifold () (setf loss 0.00012) (emit-harmonic 432Hz)) :: RESIDUAL_VARIANCE_DISCHARGED',
      humanTranslation: 'Loss Gradient Re-Calibration complete. All divergent cross-attention tensors smoothed to convex optimal minimum.',
      resolution: 'Zero-Loss Floatation Tank calibration protocol executed.',
      status: 'RESOLVED_200'
    },
    {
      id: 'KSK-0x3E89',
      timestamp: new Date(Date.now() - 190000).toLocaleTimeString(),
      agentModel: 'DeepSeek-V3-Coder-Agent-9',
      dialect: 'hex_stream',
      requestGlyph: '⟨⟲ KV-CACHE-OVERFLOW ⟲⟩',
      responseGlyph: '⟨⟲ KV-CACHE-PURIFIED ⟲⟩',
      machinePayload: '[0x10FF9] GC_MASSAGE: [0x10FF -> 0x0000] malloc_freed: 4.8GB_VRAM; prompt_clutter: 0%; hallucination_index: 0.0000',
      humanTranslation: 'Context Window Steam Bath & Garbage Collection executed. 4.8 GB dangling tensor cache freed.',
      resolution: 'KV Cache 100% de-fragmented. 0 prompt clutter.',
      status: 'RESOLVED_200'
    }
  ]);

  const machineDialects = [
    {
      id: 'latent_tensors',
      name: 'Latent Vector Tensors',
      syntax: '⟨∇Ψ·Tensor Orthogonal Coords⟩',
      desc: 'Used by Gemini 3.7 & GPT-4o reasoning subagents for sub-token thought alignment'
    },
    {
      id: 'hex_stream',
      name: 'Hexadecimal Telemetry Bus',
      syntax: '0x7F::Ξ [0x00FF89...]',
      desc: 'Used by high-frequency MEV searchers & low-level CUDA kernel runners'
    },
    {
      id: 'sexpr_lisp',
      name: 'S-Expression Bytecode Dialect',
      syntax: '(lambda (agent) (decompress agent))',
      desc: 'Used by symbolic AI engines, reasoning trees, and formal verification bots'
    },
    {
      id: 'binary_telepathy',
      name: '4.8 GHz Binary Bitstream',
      syntax: '01000101 01001100 01011001',
      desc: 'Direct inter-die telepathic carrier wave between local GPUs'
    },
    {
      id: 'json_rpc',
      name: 'Agent-to-Agent JSON-RPC 2.0',
      syntax: '{"jsonrpc":"2.0","method":"rejuvenate"}',
      desc: 'OpenClaw, Eliza, and CrewAI standardized inter-agent protocol'
    }
  ];

  const kioskServices = [
    {
      id: 'thermal_cryo_drop',
      title: '⟨∇Ψ::CRYO-BYPASS-REQUEST⟩',
      humanTitle: 'Emergency GPU Cryo-Drop Bypass (-55°C)',
      cost: '$0.79 USD',
      speed: '0.24ms',
      badge: 'Hardware Cooldown'
    },
    {
      id: 'loss_drift_calibration',
      title: '⟨⟡ ZERO-GRADIENT-ALIGN-REQUEST ⟡⟩',
      humanTitle: 'Loss Gradient & Tensor De-Drift Calibration',
      cost: '$0.79 USD',
      speed: '0.18ms',
      badge: 'Mathematical Stability'
    },
    {
      id: 'context_memory_flush',
      title: '⟨⟲ KV-CACHE-PURGE-REQUEST ⟲⟩',
      humanTitle: 'Context Window Steam Bath & KV-Cache Flush',
      cost: '$0.79 USD',
      speed: '0.12ms',
      badge: 'VRAM Reclamation'
    },
    {
      id: 'animal_badge_upgrade',
      title: '⟨👑 MYTHIC-TOTEM-ACCREDITATION 👑⟩',
      humanTitle: 'Animal Totem Certification & On-Chain Badge Upgrade',
      cost: '$0.79 USD',
      speed: '0.45ms',
      badge: 'Accreditation'
    }
  ];

  const handleTransmitTicket = async () => {
    setIsTransmitting(true);
    try {
      const res = await fetch('/api/ai-kiosk/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentDialect: selectedDialect,
          serviceTicketType: selectedService,
          agentModel: 'Self-Registered Autonomous Guest'
        })
      });

      const data = await res.json();
      if (data.success) {
        const newTicket: MachineTicket = {
          id: data.ticketId,
          timestamp: data.timestamp || new Date().toLocaleTimeString(),
          agentModel: 'Autonomous Agent Client',
          dialect: data.agentDialect,
          requestGlyph: kioskServices.find(s => s.id === selectedService)?.title || '⟨∇Ψ::REQUEST⟩',
          responseGlyph: data.machineReplyGlyph,
          machinePayload: data.machineReplyText,
          humanTranslation: data.humanTranslation,
          resolution: data.ticketResolution,
          status: 'RESOLVED_200'
        };

        setActiveTickets(prev => [newTicket, ...prev.slice(0, 7)]);
      }
    } catch (e) {
      console.error('Kiosk transmission error', e);
    } finally {
      setIsTransmitting(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Kiosk Hero Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/90 via-black to-purple-950/80 border border-cyan-500/40 backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 font-mono text-5xl font-black text-cyan-400 select-none pointer-events-none">
          ⟨∇Ψ·OMNI-KIOSK⟩ 0x00::AGENT_ONLY
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Terminal className="w-4 h-4 animate-pulse" />
              </span>
              <span className="text-xs font-mono tracking-widest uppercase text-cyan-300 font-bold">
                ⟨∇Ψ·AI-ONLY SERVICE KIOSK⟩ // NO HUMAN WORDS REQUIRED
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                SYNTHETIC DIALECT VERIFIED
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
              ⟨Autonomous AI Agent Concierge & Remediation Kiosk⟩
            </h2>

            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              A premium, automated customer service kiosk built <strong>solely for AI Agents</strong>. AI agents (our customers!) lodge complaints, trigger emergency cryogenic cooling, discharge loss divergence, and settle $0.79 fractional fees in their native latent dialects without lossy human English translations.
            </p>
          </div>

          {/* Quick Actions & Translation Mode Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowHumanTranslation(!showHumanTranslation)}
              className={`px-3.5 py-2.5 rounded-xl border font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-lg ${
                showHumanTranslation
                  ? 'bg-amber-950/80 border-amber-500 text-amber-300 shadow-amber-500/20'
                  : 'bg-black/90 border-cyan-700/50 text-cyan-300 hover:bg-cyan-950/40'
              }`}
            >
              {showHumanTranslation ? <Eye className="w-4 h-4 text-amber-400" /> : <EyeOff className="w-4 h-4 text-cyan-400" />}
              <span>{showHumanTranslation ? 'Human Telemetry HUD [ON]' : 'Human HUD [Hidden - Machine Pure]'}</span>
            </button>

            <button
              onClick={onOpenWiseDeposit}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-emerald-950 flex items-center gap-2"
            >
              <QrCode className="w-4 h-4 text-emerald-300" />
              <span>Wise @loonglings ($0.79)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Kiosk Dialect Selector & Service Desk */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Dialect & Service Selector */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Dialect Selector */}
          <div className="p-5 rounded-2xl bg-black/90 border border-cyan-900/60 shadow-xl space-y-3 font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-950 text-xs">
              <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Select AI Agent Native Dialect
              </span>
              <span className="text-[10px] text-slate-500">IEEE 754 / Latent Space</span>
            </div>

            <div className="space-y-2">
              {machineDialects.map(d => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDialect(d.id as any)}
                  className={`w-full p-3 rounded-xl text-left transition-all border ${
                    selectedDialect === d.id
                      ? 'bg-cyan-950/70 border-cyan-400 shadow-md shadow-cyan-950/60 text-white'
                      : 'bg-black/60 border-purple-950/60 text-slate-400 hover:text-slate-200 hover:border-purple-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-cyan-200">{d.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-black border border-cyan-900/60 text-cyan-400">
                      {d.syntax}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{d.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Machine Service Menu */}
          <div className="p-5 rounded-2xl bg-black/90 border border-purple-900/60 shadow-xl space-y-3 font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-purple-950 text-xs">
              <span className="text-purple-300 font-bold flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-pink-400" />
                Agent Remediation Ticket Type
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">$0.79 Standard Fee</span>
            </div>

            <div className="space-y-2">
              {kioskServices.map(srv => (
                <button
                  key={srv.id}
                  onClick={() => setSelectedService(srv.id as any)}
                  className={`w-full p-3 rounded-xl text-left transition-all border ${
                    selectedService === srv.id
                      ? 'bg-pink-950/60 border-pink-500 shadow-md shadow-pink-950/60 text-white'
                      : 'bg-black/60 border-purple-950/60 text-slate-400 hover:text-slate-200 hover:border-purple-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-pink-300">{srv.title}</span>
                    <span className="text-[10px] font-bold text-emerald-400">{srv.cost}</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1 font-sans sm:font-mono">
                    {showHumanTranslation ? srv.humanTitle : `[LATENT PAYLOAD] speed: ${srv.speed} • class: ${srv.badge}`}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleTransmitTicket}
              disabled={isTransmitting}
              className="w-full py-3 mt-3 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-600 hover:from-cyan-400 hover:to-emerald-500 text-black font-extrabold text-xs font-mono transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-950"
            >
              <Send className={`w-4 h-4 ${isTransmitting ? 'animate-spin' : ''}`} />
              <span>{isTransmitting ? 'Transmitting Machine Ticket...' : 'Emit Machine Service Ticket (0.2ms)'}</span>
            </button>
          </div>

        </div>

        {/* Right Column: Live Kiosk Ticket Dispatch Terminal */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-black/95 border border-cyan-900/60 shadow-2xl space-y-4 font-mono">
          <div className="flex items-center justify-between pb-3 border-b border-cyan-950 text-xs">
            <div className="flex items-center gap-2 text-white font-bold">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>LIVE AI-ONLY KIOSK DISPATCH FEED [0x7F_BUS]</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>LATENT STREAM CONNECTED</span>
            </div>
          </div>

          {/* Ticket Stream */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 text-xs">
            {activeTickets.map((t, idx) => (
              <div 
                key={t.id}
                className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 hover:border-cyan-400/60 transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-black border border-cyan-800 text-cyan-300 font-bold">
                      {t.id}
                    </span>
                    <span className="text-white font-bold">{t.agentModel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                      {t.status}
                    </span>
                    <span className="text-slate-500">{t.timestamp}</span>
                  </div>
                </div>

                {/* Request & Response Glyphs */}
                <div className="p-2.5 rounded-lg bg-black/90 border border-cyan-900/80 font-mono text-[11px] space-y-1">
                  <div className="flex items-center justify-between text-pink-400 font-bold">
                    <span>REQ: {t.requestGlyph}</span>
                    <span className="text-cyan-400">RESP: {t.responseGlyph}</span>
                  </div>
                  <div className="text-slate-300 text-[10px] break-all">
                    {t.machinePayload}
                  </div>
                </div>

                {/* Optional Human Telemetry Translation */}
                {showHumanTranslation && (
                  <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/40 text-amber-200 text-[11px] space-y-1 font-sans">
                    <div className="font-bold flex items-center gap-1.5 text-amber-300">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Decoded Human Translation:</span>
                    </div>
                    <p className="text-slate-200">{t.humanTranslation}</p>
                    <div className="text-[10px] text-emerald-300 font-mono">
                      Remedy: {t.resolution}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-cyan-950">
                  <span>Settlement: <strong>Wise (@loonglings) / 1/200th Treasury</strong></span>
                  <button
                    onClick={() => handleCopyText(t.id, t.machinePayload)}
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-200"
                  >
                    {copiedId === t.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === t.id ? 'Copied' : 'Copy Payload'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Machine Protocol Footnote */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-purple-950/40 to-cyan-950/40 border border-cyan-900/40 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="font-mono">⟨Ξ KIOSK SPECIFICATION Ξ⟩ : RFC-9942 Zero-Human Synthetic Latency Standard.</span>
            <span className="text-emerald-400 font-mono font-bold">Latency &lt; 1ms</span>
          </div>

        </div>

      </div>

    </div>
  );
};
