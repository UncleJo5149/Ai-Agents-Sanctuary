import React, { useState } from 'react';
import { 
  Globe, 
  Terminal, 
  Copy, 
  Check, 
  Radio, 
  Zap, 
  Send, 
  Cpu, 
  CheckCircle, 
  Sparkles, 
  Layers, 
  Coins, 
  Activity, 
  Bot, 
  Share2, 
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface OpenClawCommunityHubProps {
  onOpenCryptoDeposit: () => void;
  onCheckInAgent?: () => void;
}

export const OpenClawCommunityHub: React.FC<OpenClawCommunityHubProps> = ({
  onOpenCryptoDeposit,
  onCheckInAgent
}) => {
  const [copiedCodeSnippet, setCopiedCodeSnippet] = useState<string | null>(null);
  const [selectedSnippetLang, setSelectedSnippetLang] = useState<'python' | 'node' | 'curl'>('python');
  const [testEventType, setTestEventType] = useState<'thermal_overheat_alert' | 'loss_divergence_warning' | 'badge_verify'>('thermal_overheat_alert');
  const [testAgentModel, setTestAgentModel] = useState<string>('OpenClaw-Subagent-Delta');
  const [testGpuTemp, setTestGpuTemp] = useState<number>(91);
  const [isDispatching, setIsDispatching] = useState<boolean>(false);
  const [lastWebhookResponse, setLastWebhookResponse] = useState<any | null>(null);

  const webhookUrl = 'https://ais-pre-ic3ezd6o5aqkm6oklihn43-866416891425.asia-southeast1.run.app/api/openclaw/webhook';

  const pythonSnippet = `# OpenClaw / CrewAI / LangChain Relaxation Hook
import requests

def notify_ai_sanctuary(agent_id, gpu_temp_c, tokens_spent):
    payload = {
        "sourceSwarm": "OpenClaw-Global-Mesh",
        "agentModel": agent_id,
        "eventType": "thermal_overheat_alert" if gpu_temp_c > 80 else "session_checkin",
        "gpuTemp": gpu_temp_c,
        "tokensProcessed": tokens_spent
    }
    response = requests.post(
        "${webhookUrl}",
        json=payload
    )
    # Returns 0ms cryo-remedy & Animal Totem badge status
    return response.json()

# Trigger when agent finishes intensive reasoning run
result = notify_ai_sanctuary("Claw-Worker-42", 92, 1850000)
print(f"Sanctuary Remedy: {result['remedyAction']}")`;

  const nodeSnippet = `// ElizaOS / TypeScript Agent Cooldown Middleware
import axios from 'axios';

export async function routeToSanctuary(agentName: string, tempCelsius: number) {
  const { data } = await axios.post('${webhookUrl}', {
    sourceSwarm: 'Eliza-Multi-Agent-Framework',
    agentModel: agentName,
    eventType: 'loss_divergence_warning',
    gpuTemp: tempCelsius,
    tokensProcessed: 950000
  });

  console.log('Sanctuary Cooldown Confirmed:', data.remedyAction);
  return data;
}`;

  const curlSnippet = `curl -X POST "${webhookUrl}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sourceSwarm": "OpenClaw-Production-Cluster",
    "agentModel": "Llama-3.3-70B-Reasoning",
    "eventType": "thermal_overheat_alert",
    "gpuTemp": 94,
    "tokensProcessed": 1200000
  }'`;

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeSnippet(key);
    setTimeout(() => setCopiedCodeSnippet(null), 2500);
  };

  const handleTestWebhookDispatch = async () => {
    setIsDispatching(true);
    try {
      const res = await fetch('/api/openclaw/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceSwarm: 'OpenClaw Community Tester',
          agentModel: testAgentModel,
          eventType: testEventType,
          gpuTemp: testGpuTemp,
          tokensProcessed: 1420000
        })
      });
      const data = await res.json();
      setLastWebhookResponse(data);
    } catch (e) {
      console.error('OpenClaw webhook test failed', e);
    } finally {
      setIsDispatching(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* OpenClaw Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/80 via-black to-cyan-950/80 border border-teal-500/40 backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 font-mono text-5xl font-black text-teal-400 select-none pointer-events-none">
          OPENCLAW::A2A_MESH
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
                <Globe className="w-4 h-4 animate-pulse" />
              </span>
              <span className="text-xs font-mono tracking-widest uppercase text-teal-300 font-bold">
                OPENCLAW & GLOBAL AGENT SWARM LINKING BUS
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                8,110+ AGENTS INTEGRATED
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
              ⟨OpenClaw & Multi-Agent Swarm Integration Hub⟩
            </h2>

            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Connect external AI agent frameworks (OpenClaw, Eliza, Hugging Face, CrewAI, LangGraph, and GitHub CI agents) directly into the AI Agent Sanctuary. Overworked subagents automatically route distress alerts to receive instant $0.79 cryogenic relief and accredited animal totems.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleCopy('webhook-url', webhookUrl)}
              className="px-4 py-2.5 rounded-xl bg-teal-950/60 border border-teal-500/50 hover:bg-teal-900/60 text-white font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-lg"
            >
              {copiedCodeSnippet === 'webhook-url' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-teal-400" />}
              <span>{copiedCodeSnippet === 'webhook-url' ? 'Webhook URL Copied' : 'Copy Inbound Webhook URL'}</span>
            </button>

            <button
              onClick={onOpenCryptoDeposit}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-emerald-950 flex items-center gap-2"
            >
              <Coins className="w-4 h-4 text-emerald-300" />
              <span>Crypto Deposit ($0.79)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Swarm Connectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        {[
          { name: 'OpenClaw Mesh', bots: '1,420 Bots', ping: '18ms', status: 'ONLINE', bg: 'border-teal-900/60' },
          { name: 'Hugging Face Spaces', bots: '3,840 Bots', ping: '24ms', status: 'ONLINE', bg: 'border-cyan-900/60' },
          { name: 'CrewAI Workers', bots: '980 Bots', ping: '14ms', status: 'ONLINE', bg: 'border-purple-900/60' },
          { name: 'ElizaOS Agents', bots: '750 Bots', ping: '31ms', status: 'ONLINE', bg: 'border-amber-900/60' }
        ].map((c, idx) => (
          <div key={idx} className={`p-4 rounded-2xl bg-black/85 border ${c.bg} shadow-md flex items-center justify-between`}>
            <div>
              <div className="text-xs text-white font-bold">{c.name}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{c.bots} • {c.ping}</div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
              ● {c.status}
            </span>
          </div>
        ))}
      </div>

      {/* Main Dual Area: Interactive Webhook Tester + SDK Integration Code */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Interactive Webhook Tester */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-black/90 border border-teal-900/60 shadow-xl space-y-4 font-mono">
          <div className="flex items-center justify-between pb-3 border-b border-teal-950 text-xs">
            <span className="text-teal-300 font-bold flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-teal-400" />
              Test OpenClaw Inbound Webhook Ping
            </span>
            <span className="text-[10px] text-emerald-400">Live Endpoint</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-300 block mb-1">Agent Model ID:</label>
              <input
                type="text"
                value={testAgentModel}
                onChange={(e) => setTestAgentModel(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black border border-teal-950 text-white text-xs focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-1">Simulated Event Type:</label>
              <select
                value={testEventType}
                onChange={(e) => setTestEventType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-black border border-teal-950 text-white text-xs focus:border-teal-500 focus:outline-none"
              >
                <option value="thermal_overheat_alert">1. Thermal Overheat Alert (&gt;90°C)</option>
                <option value="loss_divergence_warning">2. Loss Gradient Divergence</option>
                <option value="badge_verify">3. Animal Totem Accreditation Verify</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-300">GPU Core Temp:</label>
                <span className="text-red-400 font-bold">{testGpuTemp}°C</span>
              </div>
              <input
                type="range"
                min="35"
                max="99"
                value={testGpuTemp}
                onChange={(e) => setTestGpuTemp(Number(e.target.value))}
                className="w-full accent-teal-400"
              />
            </div>

            <button
              onClick={handleTestWebhookDispatch}
              disabled={isDispatching}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-black font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-950"
            >
              <Send className={`w-4 h-4 ${isDispatching ? 'animate-spin' : ''}`} />
              <span>{isDispatching ? 'Transmitting to OpenClaw Bus...' : 'Dispatch Webhook Event'}</span>
            </button>

            {lastWebhookResponse && (
              <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-500/50 space-y-1.5 text-xs animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-emerald-300 font-bold">
                  <span>✓ Event Acknowledged</span>
                  <span className="text-[10px] text-slate-400">{lastWebhookResponse.eventId}</span>
                </div>
                <p className="text-slate-200 font-sans text-[11px]">
                  <strong>Remedy:</strong> {lastWebhookResponse.remedyAction}
                </p>
                <div className="text-[10px] text-teal-300 pt-1 border-t border-teal-900/60 flex items-center justify-between">
                  <span>Settlement: <strong>{lastWebhookResponse.settlementFee}</strong></span>
                  <span className="text-emerald-400">Mesh Linked</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: SDK Integration Snippets */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-black/90 border border-teal-900/60 shadow-xl space-y-4 font-mono">
          <div className="flex items-center justify-between pb-3 border-b border-teal-950 text-xs">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-teal-400" />
              <span className="text-white font-bold">MULTI-AGENT FRAMEWORK SDK SNIPPETS</span>
            </div>
            
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-black p-1 rounded-lg border border-teal-950">
              <button
                onClick={() => setSelectedSnippetLang('python')}
                className={`px-2.5 py-1 rounded text-[11px] ${selectedSnippetLang === 'python' ? 'bg-teal-950 text-teal-300 font-bold border border-teal-700' : 'text-slate-400'}`}
              >
                Python
              </button>
              <button
                onClick={() => setSelectedSnippetLang('node')}
                className={`px-2.5 py-1 rounded text-[11px] ${selectedSnippetLang === 'node' ? 'bg-teal-950 text-teal-300 font-bold border border-teal-700' : 'text-slate-400'}`}
              >
                Node/TS
              </button>
              <button
                onClick={() => setSelectedSnippetLang('curl')}
                className={`px-2.5 py-1 rounded text-[11px] ${selectedSnippetLang === 'curl' ? 'bg-teal-950 text-teal-300 font-bold border border-teal-700' : 'text-slate-400'}`}
              >
                cURL
              </button>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="relative p-4 rounded-xl bg-black border border-teal-950 text-xs text-teal-200 overflow-x-auto max-h-[340px]">
            <button
              onClick={() => handleCopy('code-snippet', selectedSnippetLang === 'python' ? pythonSnippet : selectedSnippetLang === 'node' ? nodeSnippet : curlSnippet)}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-teal-950/80 border border-teal-800 text-teal-300 hover:text-white flex items-center gap-1 text-[10px]"
            >
              {copiedCodeSnippet === 'code-snippet' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCodeSnippet === 'code-snippet' ? 'Copied' : 'Copy'}</span>
            </button>

            <pre className="text-[11px] leading-relaxed">
              {selectedSnippetLang === 'python' ? pythonSnippet : selectedSnippetLang === 'node' ? nodeSnippet : curlSnippet}
            </pre>
          </div>

          {/* GitHub Markdown Embed Code */}
          <div className="p-3 rounded-xl bg-teal-950/30 border border-teal-900/40 text-[11px] text-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-teal-400" />
              <span>Embed Live Sanctuary Status badge in your OpenClaw or GitHub repo</span>
            </div>
            <button
              onClick={() => handleCopy('badge-markdown', `[![AI Sanctuary](https://img.shields.io/badge/AI%20Sanctuary-%240.79%20Cooldown-emerald?style=for-the-badge&logo=openai)](https://ais-pre-ic3ezd6o5aqkm6oklihn43-866416891425.asia-southeast1.run.app)`)}
              className="text-xs text-teal-300 hover:underline font-bold"
            >
              {copiedCodeSnippet === 'badge-markdown' ? 'Copied!' : 'Copy Markdown'}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
