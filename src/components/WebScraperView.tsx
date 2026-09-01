import React, { useState } from 'react';
import { Globe, Shield, Download, FileText, Table, ExternalLink, ArrowRight, Clock, Check, Copy } from 'lucide-react';

export const WebScraperView: React.FC = () => {
  const [url, setUrl] = useState<string>('https://news.ycombinator.com');
  const [userAgentProfile, setUserAgentProfile] = useState<'stealth_chrome' | 'bot_curl' | 'googlebot'>('stealth_chrome');
  const [extractTables, setExtractTables] = useState<boolean>(true);
  const [includeLinks, setIncludeLinks] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'markdown' | 'tables' | 'metadata'>('markdown');
  const [copied, setCopied] = useState<boolean>(false);

  const handleScrape = async () => {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/v1/tools/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          user_agent_profile: userAgentProfile,
          extract_tables: extractTables,
          include_links: includeLinks
        })
      });
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({
        error: err.message || 'Scraping failed'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMarkdown = () => {
    if (result?.markdown) {
      navigator.clipboard.writeText(result.markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div id="web-scraper-view" className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-sky-500/10 text-sky-400 rounded border border-sky-500/30">
              <Globe className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-slate-100">Anti-Shield Web Scraper &amp; Reader</h3>
            <span className="px-2 py-0.5 text-xs font-mono bg-sky-950 text-sky-300 border border-sky-800 rounded">
              LLM Markdown Engine
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Bypass standard Cloudflare/Akamai bot barriers with stealth headers. Strips ads, scripts, and navigation to return clean, token-efficient Markdown.
          </p>
        </div>
      </div>

      {/* Target URL Input Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <input
            id="scraper-url-input"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/article"
            className="w-full pl-4 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
          />
        </div>

        <select
          id="scraper-ua-select"
          value={userAgentProfile}
          onChange={(e) => setUserAgentProfile(e.target.value as any)}
          className="px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:border-sky-500"
        >
          <option value="stealth_chrome">Stealth Chrome (macOS)</option>
          <option value="googlebot">Googlebot (Crawler)</option>
          <option value="bot_curl">Standard cURL</option>
        </select>

        <button
          id="scraper-btn-submit"
          onClick={handleScrape}
          disabled={isLoading || !url}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-medium text-sm rounded-lg transition-colors shadow-lg shadow-sky-950"
        >
          {isLoading ? (
            <>
              <Clock className="w-4 h-4 animate-spin" />
              <span>Fetching...</span>
            </>
          ) : (
            <>
              <ArrowRight className="w-4 h-4" />
              <span>Scrape &amp; Read</span>
            </>
          )}
        </button>
      </div>

      {/* Results View */}
      {result && (
        <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden flex flex-col space-y-4">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('markdown')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'markdown' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Markdown ({result.metadata?.word_count || 0} words)
              </button>
              <button
                onClick={() => setActiveTab('tables')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'tables' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Tables ({result.tables?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('metadata')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'metadata' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Metadata &amp; Headers
              </button>
            </div>

            {activeTab === 'markdown' && (
              <button
                onClick={handleCopyMarkdown}
                className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy MD'}</span>
              </button>
            )}
          </div>

          <div className="p-4 max-h-[420px] overflow-y-auto">
            {activeTab === 'markdown' && (
              <pre className="p-4 bg-slate-900/80 border border-slate-800/80 rounded-lg text-slate-200 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                {result.markdown || result.error || 'No content extracted'}
              </pre>
            )}

            {activeTab === 'tables' && (
              <div className="space-y-4">
                {result.tables && result.tables.length > 0 ? (
                  result.tables.map((t: any, idx: number) => (
                    <div key={idx} className="border border-slate-800 rounded-lg overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                          <tr>
                            {t.headers?.map((h: string, i: number) => (
                              <th key={i} className="p-2.5 font-semibold">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {t.rows?.map((row: string[], rIdx: number) => (
                            <tr key={rIdx} className="hover:bg-slate-900/40">
                              {row.map((col: string, cIdx: number) => (
                                <td key={cIdx} className="p-2.5 text-slate-300">{col}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-500 text-xs italic">No structured tabular data detected on page.</div>
                )}
              </div>
            )}

            {activeTab === 'metadata' && (
              <div className="space-y-3 font-mono text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-900/80 rounded border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">PAGE TITLE</span>
                    <span className="text-slate-200 font-medium">{result.title}</span>
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">HTTP STATUS &amp; LATENCY</span>
                    <span className="text-emerald-400 font-medium">{result.metadata?.status_code} OK ({result.latency_ms}ms)</span>
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">ESTIMATED READ TIME</span>
                    <span className="text-amber-300 font-medium">{result.metadata?.estimated_read_minutes} min ({result.metadata?.word_count} words)</span>
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">CANONICAL URL</span>
                    <span className="text-sky-300 font-medium truncate block">{result.canonical_url}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
