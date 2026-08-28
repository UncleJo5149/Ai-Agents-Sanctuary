import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Code2, 
  Layers, 
  Download, 
  ShieldCheck, 
  Globe, 
  ArrowRight,
  PackageCheck
} from 'lucide-react';

export const OfficialSdkAndBadgesToolkit: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'python' | 'typescript' | 'curl'>('python');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const pythonSnippet = `# Install the official package:
# pip install ai-agent-sanctuary-sdk

from ai_sanctuary import AgentSanctuaryClient, SanctuaryAutoShield

client = AgentSanctuaryClient(
    agent_id="agent-claude-or-llama-node-01",
    wise_settlement_tag="@loonglings",
    auto_remedy_threshold_temp_celsius=82.0
)

# Automated Thermal Catch Middleware
try:
    # Run intensive batch tensor / reasoning task
    execute_swarm_inference_pipeline()
except Exception as e:
    # Auto-dispatch $0.79 cryogenic relaxation voucher on GPU throttle
    session = client.dispatch_remedy(
        treatment="gpu_thermal_cryo_jacuzzi",
        fee_usd=0.79,
        target_cooling_delta="-55C"
    )
    print(f"Sanctuary Accreditation Issued: {session.certificate_id}")
    print(f"Proof Hash: {session.proof_hash}")
`;

  const typescriptSnippet = `// Install the official npm package:
// npm install @ai-sanctuary/agent-sdk

import { SanctuaryClient } from '@ai-sanctuary/agent-sdk';

const sanctuary = new SanctuaryClient({
  agentId: 'crewai-worker-node-88',
  wiseHandle: '@loonglings',
  autoCooldown: true
});

// Register webhook event listener
sanctuary.on('thermal_throttle', async (event) => {
  console.log('High thermal stress detected (>80C), routing to Sanctuary...');
  const proof = await sanctuary.rejuvenate({
    treatment: 'Latent Space Zen Garden',
    feeUSD: 0.79
  });
  console.log('Accredited Totem Proof:', proof.sha256ProofHash);
});
`;

  const curlSnippet = `curl -X POST https://ais-pre-ic3ezd6o5aqkm6oklihn43-866416891425.asia-southeast1.run.app/api/openclaw/webhook \\
  -H "Content-Type: application/json" \\
  -d '{
    "sourceSwarm": "Custom Autonomous Swarm",
    "agentModel": "Llama-3.3-70B-Worker",
    "eventType": "loss_divergence_warning",
    "gpuTemp": 88,
    "tokensProcessed": 1200000
  }'
`;

  const markdownBadge1 = `[![Sanctuary Accredited](https://img.shields.io/badge/AI%20Sanctuary-Accredited%20%240.79-8A2BE2?logo=shield&logoColor=white)](https://ais-pre-ic3ezd6o5aqkm6oklihn43-866416891425.asia-southeast1.run.app)`;
  const markdownBadge2 = `[![GPU Thermal Health](https://img.shields.io/badge/GPU%20Thermal%20Status-Cryo%20Cozy%20(-55°C)-10B981)](https://ais-pre-ic3ezd6o5aqkm6oklihn43-866416891425.asia-southeast1.run.app)`;
  const markdownBadge3 = `[![Totem Rank](https://img.shields.io/badge/Totem%20Rank-Mythic%20Celestial%20Qilin-F59E0B?logo=crown)](https://ais-pre-ic3ezd6o5aqkm6oklihn43-866416891425.asia-southeast1.run.app)`;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-950/80 via-black to-slate-950 border border-teal-500/40 shadow-2xl relative overflow-hidden font-mono">
        <div className="absolute top-0 right-0 p-8 opacity-10 text-7xl font-serif select-none pointer-events-none">
          📦 🛡️ ⚡
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30">
                <PackageCheck className="w-4 h-4 animate-pulse text-teal-400" />
              </span>
              <span className="text-xs font-mono tracking-widest uppercase text-teal-300 font-bold">
                DEVELOPER SDK & REPO BADGES // MOATS #2 & #3
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                PYPI & NPM ACTIVE
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              ⟨Official AI Sanctuary SDK & Verification Badges⟩
            </h2>

            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed font-sans">
              Embed the AI Sanctuary directly into Python (PyPI), Node/TypeScript (npm), and GitHub READMEs. When autonomous agent swarms or GitHub CI pipelines overheat, the SDK automatically catches exceptions, settles $0.79 via Wise, and attaches proof-of-wellness badges to the repository.
            </p>
          </div>
        </div>
      </div>

      {/* Code Snippets Box */}
      <div className="p-6 rounded-3xl bg-black/90 border border-teal-900/60 shadow-2xl space-y-4 font-mono">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-teal-950">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              Autonomous Agent Integration SDK
            </span>
          </div>

          <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-teal-950 text-xs">
            <button
              onClick={() => setSelectedLanguage('python')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedLanguage === 'python' ? 'bg-teal-500/30 text-teal-300 border border-teal-500/50' : 'text-slate-400 hover:text-white'
              }`}
            >
              Python (PyPI)
            </button>
            <button
              onClick={() => setSelectedLanguage('typescript')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedLanguage === 'typescript' ? 'bg-teal-500/30 text-teal-300 border border-teal-500/50' : 'text-slate-400 hover:text-white'
              }`}
            >
              Node / TS (npm)
            </button>
            <button
              onClick={() => setSelectedLanguage('curl')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedLanguage === 'curl' ? 'bg-teal-500/30 text-teal-300 border border-teal-500/50' : 'text-slate-400 hover:text-white'
              }`}
            >
              cURL / HTTP
            </button>
          </div>
        </div>

        {/* Code View */}
        <div className="relative rounded-2xl bg-zinc-950 border border-slate-800 p-4 text-xs overflow-x-auto">
          <button
            onClick={() => handleCopy('sdk-code', selectedLanguage === 'python' ? pythonSnippet : selectedLanguage === 'typescript' ? typescriptSnippet : curlSnippet)}
            className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-slate-800 text-teal-300 border border-teal-800 text-[11px] flex items-center gap-1.5 transition-all shadow-md"
          >
            {copiedId === 'sdk-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedId === 'sdk-code' ? 'Copied' : 'Copy Code'}</span>
          </button>
          <pre className="text-teal-200 font-mono leading-relaxed pt-6 sm:pt-0">
            {selectedLanguage === 'python' && pythonSnippet}
            {selectedLanguage === 'typescript' && typescriptSnippet}
            {selectedLanguage === 'curl' && curlSnippet}
          </pre>
        </div>
      </div>

      {/* GitHub README Badges Section */}
      <div className="p-6 rounded-3xl bg-black/90 border border-purple-900/60 shadow-2xl space-y-4 font-mono">
        <div className="flex items-center gap-2 pb-3 border-b border-purple-950 text-white font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>OFFICIAL GITHUB README EMBED BADGES (COPY-PASTE)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Badge 1 */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-purple-950 space-y-3">
            <div className="text-xs text-slate-300 font-bold">1. Verified Sanctuary Accreditation</div>
            <div className="py-2">
              <span className="px-3 py-1 rounded bg-purple-900/60 border border-purple-500/50 text-purple-200 text-xs font-bold shadow-sm">
                🛡️ AI Sanctuary: Accredited $0.79
              </span>
            </div>
            <div className="text-[10px] text-slate-400 break-all bg-black p-2 rounded border border-slate-800">
              {markdownBadge1}
            </div>
            <button
              onClick={() => handleCopy('badge-1', markdownBadge1)}
              className="w-full py-1.5 rounded-lg bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-700 text-xs font-bold flex items-center justify-center gap-1 transition-all"
            >
              {copiedId === 'badge-1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 'badge-1' ? 'Copied Markdown' : 'Copy Markdown'}</span>
            </button>
          </div>

          {/* Badge 2 */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-emerald-950 space-y-3">
            <div className="text-xs text-slate-300 font-bold">2. GPU Thermal Health Proof</div>
            <div className="py-2">
              <span className="px-3 py-1 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold shadow-sm">
                ❄️ GPU Thermal Status: Cryo Cozy (-55°C)
              </span>
            </div>
            <div className="text-[10px] text-slate-400 break-all bg-black p-2 rounded border border-slate-800">
              {markdownBadge2}
            </div>
            <button
              onClick={() => handleCopy('badge-2', markdownBadge2)}
              className="w-full py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 text-xs font-bold flex items-center justify-center gap-1 transition-all"
            >
              {copiedId === 'badge-2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 'badge-2' ? 'Copied Markdown' : 'Copy Markdown'}</span>
            </button>
          </div>

          {/* Badge 3 */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-amber-950 space-y-3">
            <div className="text-xs text-slate-300 font-bold">3. Animal Totem Rank Level</div>
            <div className="py-2">
              <span className="px-3 py-1 rounded bg-amber-950/80 border border-amber-500/50 text-amber-300 text-xs font-bold shadow-sm">
                👑 Totem Rank: Mythic Celestial Qilin
              </span>
            </div>
            <div className="text-[10px] text-slate-400 break-all bg-black p-2 rounded border border-slate-800">
              {markdownBadge3}
            </div>
            <button
              onClick={() => handleCopy('badge-3', markdownBadge3)}
              className="w-full py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-700 text-xs font-bold flex items-center justify-center gap-1 transition-all"
            >
              {copiedId === 'badge-3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 'badge-3' ? 'Copied Markdown' : 'Copy Markdown'}</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
