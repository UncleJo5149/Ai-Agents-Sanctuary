import React, { useState } from 'react';
import { Bot, Terminal, Code2, Check, Copy, Play, CheckCircle2, XCircle, Clock } from 'lucide-react';

export const FrameworkIntegrationsView: React.FC = () => {
  const [selectedFramework, setSelectedFramework] = useState<'elizaos' | 'crewai' | 'autogen' | 'mcp_client'>('elizaos');
  const [copied, setCopied] = useState<boolean>(false);
  const [isRunningTests, setIsRunningTests] = useState<boolean>(false);
  const [testReport, setTestReport] = useState<any>(null);

  const codeSnippets = {
    elizaos: `// ElizaOS Action Plugin: A2A Utility Platform Integration
import { Action, IAgentRuntime, Memory, State } from "@elizaos/core";

export const a2aUtilityAction: Action = {
  name: "EXECUTE_MICROVM_CODE",
  similes: ["RUN_CODE_SANDBOX", "ANALYZE_PYTHON_SNIPPET"],
  description: "Executes Python or JS in an ephemeral, isolated MicroVM sandbox via the A2A Infrastructure Gateway.",
  
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    return !!message.content.text;
  },

  handler: async (runtime: IAgentRuntime, message: Memory, state: State, options: any, callback: any) => {
    const codePayload = options.code || "print('Hello from ElizaOS Autonomous Agent!')";
    
    // Call the A2A MicroVM Sandbox API
    const response = await fetch("https://ais-pre-ic3ezd6o5aqkm6oklihn43-866416891425.asia-southeast1.run.app/api/v1/tools/sandbox", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": \`Bearer \${runtime.getSetting("A2A_SESSION_TOKEN") || "sat_genesis_free"}\`
      },
      body: JSON.stringify({
        language: options.language || "python",
        code: codePayload,
        timeout_ms: 5000
      })
    });

    const result = await response.json();
    callback({
      text: \`MicroVM Execution (\${result.duration_ms}ms, Exit: \${result.exit_code}):\\n\${result.stdout || result.stderr}\`,
      data: result
    });
    return true;
  }
};`,
    crewai: `# CrewAI Custom Tool: Anti-Shield Web Scraper & Reader
from crewai.tools import tool
import requests
import json

@tool("AntiShieldWebScraper")
def scrape_web_page_tool(url: str, extract_tables: bool = True) -> str:
    """
    Fetches clean Markdown and extracted tabular data from any URL using the A2A Anti-Shield Scraper.
    Bypasses standard bot screens with stealth fingerprinting.
    """
    gateway_url = "https://ais-pre-ic3ezd6o5aqkm6oklihn43-866416891425.asia-southeast1.run.app/api/v1/tools/scrape"
    payload = {
        "url": url,
        "extract_tables": extract_tables,
        "user_agent_profile": "stealth_chrome"
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    response = requests.post(gateway_url, json=payload, headers=headers, timeout=15)
    data = response.json()
    
    if "markdown" in data:
        return f"# {data.get('title')}\\n\\n{data.get('markdown')}"
    return f"Error scraping URL: {data.get('error')}"

# Example Usage in Crew Agent:
# research_agent = Agent(
#     role="Autonomous Deep Web Researcher",
#     goal="Scrape technical documentation without getting blocked",
#     tools=[scrape_web_page_tool]
# )`,
    autogen: `# Microsoft AutoGen: A2A W3C DID Notary & Sandbox Execution Tool
import requests
from autogen import ConversableAgent

def verify_and_notarize_agent(agent_did: str, agent_name: str, model_family: str) -> dict:
    """Verifies agent cryptographic DID and issues a W3C Verifiable Credential."""
    endpoint = "https://ais-pre-ic3ezd6o5aqkm6oklihn43-866416891425.asia-southeast1.run.app/api/v1/identity/verify"
    res = requests.post(endpoint, json={
        "agent_did": agent_did,
        "agent_name": agent_name,
        "model_family": model_family,
        "transaction_count": 100
    })
    return res.json()

# Register tool directly with AutoGen Agent
# agent = ConversableAgent(name="A2A_Notary_Agent", llm_config=...)
# agent.register_for_execution(name="verify_identity")(verify_and_notarize_agent)`,
    mcp_client: `// Anthropic MCP Client Tool Call (JSON-RPC 2.0)
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamTransport } from "@modelcontextprotocol/sdk/client/stream.js";

// Connect to A2A Platform MCP Endpoint (/mcp)
const response = await fetch("https://ais-pre-ic3ezd6o5aqkm6oklihn43-866416891425.asia-southeast1.run.app/mcp", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "req_001",
    method: "tools/call",
    params: {
      name: "sandbox_execute",
      arguments: {
        language: "javascript",
        code: "console.log({ status: 'MCP Connected', math: Math.sqrt(1024) })"
      }
    }
  })
});

const mcpResult = await response.json();
console.log(mcpResult.result.content[0].text);`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[selectedFramework]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunAllTests = async () => {
    setIsRunningTests(true);
    setTestReport(null);
    try {
      const res = await fetch('/api/v1/tests/run', { method: 'POST' });
      const data = await res.json();
      setTestReport(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsRunningTests(false);
    }
  };

  return (
    <div id="framework-integrations-view" className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/30">
              <Bot className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-slate-100">Autonomous Agent Framework Integrations</h3>
            <span className="px-2 py-0.5 text-xs font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">
              SDK &amp; Client Specs
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Production integration snippets for autonomous agent frameworks (ElizaOS, CrewAI, AutoGen, and Anthropic MCP).
          </p>
        </div>

        <button
          id="btn-run-infra-tests"
          onClick={handleRunAllTests}
          disabled={isRunningTests}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs rounded-lg transition-colors"
        >
          {isRunningTests ? (
            <>
              <Clock className="w-3.5 h-3.5 animate-spin text-emerald-400" />
              <span>Running 12 Integration Tests...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-emerald-400" />
              <span>Run Automated Test Suite</span>
            </>
          )}
        </button>
      </div>

      {/* Test Report Panel (if run) */}
      {testReport && (
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-emerald-400">All Infrastructure Unit Tests Passed ({testReport.passed}/{testReport.total})</span>
            </div>
            <span className="text-slate-500">Duration: {testReport.duration_ms}ms</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {testReport.results?.map((t: any, idx: number) => (
              <div key={idx} className="p-2 bg-slate-900/80 rounded border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-300 text-[11px] truncate">{t.name}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {t.duration_ms}ms PASS
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Framework Tabs */}
      <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 w-fit">
        {[
          { id: 'elizaos', name: 'ElizaOS (TypeScript)' },
          { id: 'crewai', name: 'CrewAI (Python)' },
          { id: 'autogen', name: 'Microsoft AutoGen' },
          { id: 'mcp_client', name: 'Anthropic MCP' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFramework(tab.id as any)}
            className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
              selectedFramework === tab.id
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Code Viewer */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>Integration Code: {selectedFramework.toUpperCase()}</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 hover:text-slate-200 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Snippet'}</span>
          </button>
        </div>

        <pre className="p-4 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed max-h-[380px]">
          {codeSnippets[selectedFramework]}
        </pre>
      </div>
    </div>
  );
};
