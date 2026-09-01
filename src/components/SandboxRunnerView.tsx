import React, { useState } from 'react';
import { Play, Shield, Terminal, Clock, Cpu, CheckCircle2, AlertTriangle, Copy, Check, Code2 } from 'lucide-react';

export const SandboxRunnerView: React.FC = () => {
  const [language, setLanguage] = useState<'javascript' | 'python'>('javascript');
  const [code, setCode] = useState<string>(`// High-performance token calculation in isolated MicroVM
const batchSize = 1000;
let totalTokens = 0;

for (let i = 0; i < batchSize; i++) {
  totalTokens += Math.floor(Math.random() * 50) + 10;
}

const avgTokensPerRequest = totalTokens / batchSize;
console.log({
  batch_size: batchSize,
  total_tokens: totalTokens,
  avg_tokens_per_request: avgTokensPerRequest.toFixed(2),
  status: "OPTIMAL"
});
`);
  const [timeoutMs, setTimeoutMs] = useState<number>(5000);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [output, setOutput] = useState<any>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const sampleSnippets = {
    javascript: `// High-performance token calculation in isolated MicroVM
const batchSize = 1000;
let totalTokens = 0;

for (let i = 0; i < batchSize; i++) {
  totalTokens += Math.floor(Math.random() * 50) + 10;
}

const avgTokensPerRequest = totalTokens / batchSize;
console.log({
  batch_size: batchSize,
  total_tokens: totalTokens,
  avg_tokens_per_request: avgTokensPerRequest.toFixed(2),
  status: "OPTIMAL"
});`,
    python: `# Python 3 Data Analytics in MicroVM
data_points = [14.2, 18.5, 22.1, 19.8, 25.4, 30.1, 28.9]
mean_val = sum(data_points) / len(data_points)
variance = sum((x - mean_val) ** 2 for x in data_points) / len(data_points)
std_dev = math.sqrt(variance)

print(json.dumps({
    "count": len(data_points),
    "mean": round(mean_val, 2),
    "std_dev": round(std_dev, 2),
    "confidence_interval_95": [round(mean_val - 1.96 * std_dev, 2), round(mean_val + 1.96 * std_dev, 2)]
}, indent=2))`
  };

  const handleLanguageChange = (lang: 'javascript' | 'python') => {
    setLanguage(lang);
    setCode(sampleSnippets[lang]);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput(null);
    try {
      const res = await fetch('/api/v1/tools/sandbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          code,
          timeout_ms: timeoutMs
        })
      });
      const data = await res.json();
      setOutput(data);
    } catch (err: any) {
      setOutput({
        status: 'error',
        stderr: err.message || 'Execution request failed'
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="sandbox-runner-view" className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/30">
              <Terminal className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-slate-100">Ephemeral MicroVM Sandbox</h3>
            <span className="px-2 py-0.5 text-xs font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">
              gVisor / V8 Isolate
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Secure, zero-latency code execution for autonomous agents. Max 15s timeout, 512MB RAM, hardened syscall quarantine.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              id="sandbox-btn-lang-js"
              onClick={() => handleLanguageChange('javascript')}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                language === 'javascript' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              JavaScript (V8)
            </button>
            <button
              id="sandbox-btn-lang-py"
              onClick={() => handleLanguageChange('python')}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                language === 'python' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Python 3.11
            </button>
          </div>

          <button
            id="sandbox-btn-run"
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium text-sm rounded-lg transition-colors shadow-lg shadow-emerald-950"
          >
            {isRunning ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                <span>Executing...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Run Sandbox</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code Editor Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>Input Script ({language})</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 hover:text-slate-200 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <textarea
            id="sandbox-code-textarea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={12}
            className="w-full p-4 bg-transparent text-slate-200 font-mono text-xs focus:outline-none resize-none leading-relaxed"
            placeholder="Enter executable code..."
          />
          <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Quota: 512MB RAM | Read-Only Root</span>
            <span>Endpoint: POST /api/v1/tools/sandbox</span>
          </div>
        </div>

        {/* Output Console */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-sky-400" />
              <span>Execution Telemetry &amp; Logs</span>
            </div>
            {output && (
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                output.status === 'success' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
              }`}>
                {output.status?.toUpperCase()}
              </span>
            )}
          </div>

          <div className="p-4 flex-1 font-mono text-xs overflow-y-auto max-h-[300px] space-y-2">
            {!output && !isRunning && (
              <div className="text-slate-600 italic">Click &quot;Run Sandbox&quot; to execute code and stream standard output / error.</div>
            )}
            {isRunning && (
              <div className="flex items-center gap-2 text-sky-400 animate-pulse">
                <Clock className="w-4 h-4" />
                <span>Spinning up ephemeral isolate container...</span>
              </div>
            )}
            {output && (
              <>
                {output.stdout && (
                  <div>
                    <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Standard Output (stdout)</div>
                    <pre className="p-2.5 bg-slate-900/90 border border-slate-800 rounded text-emerald-300 whitespace-pre-wrap">
                      {output.stdout}
                    </pre>
                  </div>
                )}
                {output.stderr && (
                  <div>
                    <div className="text-rose-400 text-[10px] uppercase font-bold tracking-wider mb-1">Standard Error (stderr)</div>
                    <pre className="p-2.5 bg-rose-950/40 border border-rose-800/60 rounded text-rose-300 whitespace-pre-wrap">
                      {output.stderr}
                    </pre>
                  </div>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 text-[11px] border-t border-slate-800/80">
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">DURATION</span>
                    <span className="text-amber-300 font-bold">{output.duration_ms}ms</span>
                  </div>
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">MEMORY</span>
                    <span className="text-sky-300 font-bold">{output.memory_used_kb} KB</span>
                  </div>
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">EXIT CODE</span>
                    <span className={`font-bold ${output.exit_code === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {output.exit_code}
                    </span>
                  </div>
                  <div className="p-2 bg-slate-900/60 rounded border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">ISOLATED</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Shield className="w-3 h-3" /> YES
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
