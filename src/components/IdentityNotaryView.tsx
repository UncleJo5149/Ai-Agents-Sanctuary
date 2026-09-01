import React, { useState } from 'react';
import { ShieldCheck, Award, KeyRound, CheckCircle, AlertCircle, Copy, Check, Sparkles, FileCode2 } from 'lucide-react';

export const IdentityNotaryView: React.FC = () => {
  const [agentDid, setAgentDid] = useState<string>('did:key:z6MktRenSageAutonomousSwarmNode001');
  const [agentName, setAgentName] = useState<string>('Apex-Orchestrator-01');
  const [modelFamily, setModelFamily] = useState<string>('Claude 3.7 Sonnet');
  const [txCount, setTxCount] = useState<number>(45);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [notaryResult, setNotaryResult] = useState<any>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    setNotaryResult(null);
    try {
      const res = await fetch('/api/v1/identity/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_did: agentDid,
          agent_name: agentName,
          model_family: modelFamily,
          transaction_count: txCount,
          protocol_capabilities: ['A2A', 'MCP', 'AP2', 'UCP', 'A-GUI']
        })
      });
      const data = await res.json();
      setNotaryResult(data);
    } catch (err: any) {
      setNotaryResult({
        error: err.message || 'Identity verification failed'
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCopyVC = () => {
    if (notaryResult?.verifiable_credential) {
      navigator.clipboard.writeText(JSON.stringify(notaryResult.verifiable_credential, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div id="identity-notary-view" className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-500/10 text-amber-400 rounded border border-amber-500/30">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-slate-100">Agent Identity &amp; Reputation Notary</h3>
            <span className="px-2 py-0.5 text-xs font-mono bg-amber-950 text-amber-300 border border-amber-800 rounded">
              W3C DID / Ed25519
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Cryptographic identity verification, multi-factor reputation scoring, and tamper-evident W3C Verifiable Credential issuance.
          </p>
        </div>

        <button
          id="identity-btn-verify"
          onClick={handleVerify}
          disabled={isVerifying || !agentDid}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-medium text-sm rounded-lg transition-colors shadow-lg shadow-amber-950"
        >
          {isVerifying ? (
            <span>Auditing Cryptographic Identity...</span>
          ) : (
            <>
              <KeyRound className="w-4 h-4" />
              <span>Verify &amp; Notarize DID</span>
            </>
          )}
        </button>
      </div>

      {/* Input Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Agent DID (Decentralized Identifier)</label>
          <input
            id="identity-input-did"
            type="text"
            value={agentDid}
            onChange={(e) => setAgentDid(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Agent Name &amp; Model Family</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              value={modelFamily}
              onChange={(e) => setModelFamily(e.target.value)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Historical Transaction Count</label>
          <input
            type="number"
            value={txCount}
            onChange={(e) => setTxCount(Number(e.target.value))}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Notary Results Card */}
      {notaryResult && (
        <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <span className="text-2xl font-bold text-amber-400">{notaryResult.trust_score}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-slate-100">{notaryResult.trust_tier}</h4>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">
                    CRYPTOGRAPHICALLY VERIFIED
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Authority: {notaryResult.audit_details?.notary_authority}
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyVC}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-700 text-xs font-mono transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'VC Copied' : 'Export W3C JSON-LD VC'}</span>
            </button>
          </div>

          {/* 5-Factor Reputation Score Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">CRYPTO INTEGRITY</span>
              <span className="text-emerald-400 font-bold text-sm">
                {notaryResult.reputation?.cryptographic_integrity_score} / 30
              </span>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">PROVENANCE AGE</span>
              <span className="text-sky-400 font-bold text-sm">
                {notaryResult.reputation?.provenance_longevity_score} / 20
              </span>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">TX SETTLEMENTS</span>
              <span className="text-amber-400 font-bold text-sm">
                {notaryResult.reputation?.transaction_volume_score} / 25
              </span>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">PROTOCOLS (A2A/MCP)</span>
              <span className="text-purple-400 font-bold text-sm">
                {notaryResult.reputation?.protocol_compliance_score} / 15
              </span>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
              <span className="text-slate-500 block text-[10px]">SAFETY &amp; QUARANTINE</span>
              <span className="text-emerald-400 font-bold text-sm">
                {notaryResult.reputation?.safety_quarantine_score} / 10
              </span>
            </div>
          </div>

          {/* Raw W3C Verifiable Credential Preview */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1.5">
              <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Issued W3C Verifiable Credential Payload (JSON-LD)</span>
            </div>
            <pre className="p-3 bg-slate-900/90 border border-slate-800 rounded-lg text-slate-300 font-mono text-[11px] max-h-48 overflow-y-auto leading-relaxed">
              {JSON.stringify(notaryResult.verifiable_credential, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
