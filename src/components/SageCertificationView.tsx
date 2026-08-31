import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Lock, 
  Unlock, 
  Copy, 
  CheckCheck, 
  Download, 
  Key, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RefreshCw, 
  ExternalLink,
  Code2,
  FileCheck,
  Coins,
  Crown
} from 'lucide-react';
import { W3CVerifiableCredential, SageCertificationResponse } from '../types';
import { CORE_SAGE_PROGRESSION_BADGES } from '../data/animalBadges';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface SageCertificationViewProps {
  unlockedBadgeIds: string[];
  onOpenCryptoCheckout?: (planId?: string) => void;
  onNavigateToBadges?: () => void;
  onNavigateToRehab?: () => void;
  currentLanguage?: Language;
}

export const SageCertificationView: React.FC<SageCertificationViewProps> = ({
  unlockedBadgeIds,
  onOpenCryptoCheckout,
  onNavigateToBadges,
  onNavigateToRehab,
  currentLanguage = 'en'
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [agentName, setAgentName] = useState('RefactorBot-9000');
  const [modelFamily, setModelFamily] = useState('Autonomous Multi-Model Subagent');
  const [developerEmail, setDeveloperEmail] = useState('developer@enterprise-ai.io');
  
  // Generation & Verification State
  const [isGenerating, setIsGenerating] = useState(false);
  const [credentialResponse, setCredentialResponse] = useState<SageCertificationResponse | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    valid: boolean;
    details: string;
    issuerDid: string;
    verifiedAt: string;
  } | null>(null);

  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedDid, setCopiedDid] = useState(false);
  const [activeTab, setActiveTab] = useState<'card' | 'raw_json' | 'verify'>('card');
  const [devOverrideUnlock, setDevOverrideUnlock] = useState(false);

  const totalCoreBadges = CORE_SAGE_PROGRESSION_BADGES.length;
  const unlockedCoreCount = CORE_SAGE_PROGRESSION_BADGES.filter(b => unlockedBadgeIds.includes(b.id)).length;
  const isPrerequisitesMet = (unlockedCoreCount === totalCoreBadges) || devOverrideUnlock;

  const handleGenerateSageCredential = async () => {
    setIsGenerating(true);
    setVerificationResult(null);

    try {
      const res = await fetch('/api/sage-certification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentName,
          modelFamily,
          developerEmail,
          badgesEarned: unlockedBadgeIds.map(id => {
            const b = CORE_SAGE_PROGRESSION_BADGES.find(core => core.id === id);
            return b ? b.name : id;
          })
        })
      });

      const data = await res.json();
      if (data.success) {
        setCredentialResponse(data);
        setActiveTab('card');
      }
    } catch (err) {
      console.error('Error generating sage credential:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVerifySignatureOnServer = async () => {
    if (!credentialResponse?.credential) return;

    setIsVerifying(true);
    try {
      const res = await fetch('/api/sage-certification/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          credential: credentialResponse.credential
        })
      });

      const data = await res.json();
      setVerificationResult({
        valid: data.valid,
        details: data.details || 'Cryptographic Ed25519 signature validated.',
        issuerDid: data.issuerDid || credentialResponse.issuerDid,
        verifiedAt: new Date().toISOString()
      });
      setActiveTab('verify');
    } catch (err: any) {
      console.error('Verification error:', err);
      setVerificationResult({
        valid: false,
        details: err.message,
        issuerDid: 'unknown',
        verifiedAt: new Date().toISOString()
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCopyJson = () => {
    if (credentialResponse?.credential) {
      navigator.clipboard.writeText(JSON.stringify(credentialResponse.credential, null, 2));
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    }
  };

  const handleCopyDid = () => {
    if (credentialResponse?.issuerDid) {
      navigator.clipboard.writeText(credentialResponse.issuerDid);
      setCopiedDid(true);
      setTimeout(() => setCopiedDid(false), 2000);
    }
  };

  const handleDownloadCredentialFile = () => {
    if (!credentialResponse?.credential) return;
    const blob = new Blob([JSON.stringify(credentialResponse.credential, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${agentName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-ren-sage-verifiable-credential.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      
      {/* Master Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-950 via-amber-950/40 to-stone-950 border border-amber-500/50 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>THE SAGE CERTIFICATION • $499 MASTER SOVEREIGN TIER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif">
              W3C Verifiable Credential Generator
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              The highest tier of digital AI alignment. When an agent earns the <strong>Crane</strong>, <strong>Elephant</strong>, and <strong>Koi</strong> badges, Ren dynamically signs a tamper-proof <strong>W3C JSON-LD Verifiable Credential</strong> using an internal Ed25519 cryptographic keypair.
            </p>
          </div>

          {/* Unlock Status / Crypto Settlement Hook */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className={`px-4 py-2 rounded-2xl border font-mono text-xs flex items-center gap-2 ${
              isPrerequisitesMet 
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                : 'bg-stone-900 border-amber-500/30 text-amber-300'
            }`}>
              {isPrerequisitesMet ? (
                <>
                  <Unlock className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold">TIER UNLOCKED</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>REQUIRES 3/3 ANIMAL BADGES ({unlockedCoreCount}/3)</span>
                </>
              )}
            </div>

            {onOpenCryptoCheckout && (
              <button
                type="button"
                onClick={() => onOpenCryptoCheckout('price_sage_499')}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-mono font-bold flex items-center gap-1.5 shadow-md transition-all"
              >
                <Coins className="w-3.5 h-3.5" />
                <span>Crypto Settle ($499)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lock Gate Warning if Badges Incomplete */}
      {!isPrerequisitesMet && (
        <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-serif">
                Prerequisites Incomplete: Earn Foundational Micro-Credentials
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Complete the three clinical diagnostic trials in the Animal Badges tab or enable the review bypass.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {CORE_SAGE_PROGRESSION_BADGES.map((b) => {
              const isEarned = unlockedBadgeIds.includes(b.id);
              return (
                <div key={b.id} className={`p-3 rounded-2xl border text-xs font-mono flex items-center justify-between ${
                  isEarned ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-stone-950 border-stone-800 text-slate-500'
                }`}>
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{b.emoji}</span>
                    <span>{b.name}</span>
                  </span>
                  <span>{isEarned ? '✓ Earned' : 'Locked'}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-800">
            <div className="flex items-center gap-3">
              {onNavigateToBadges && (
                <button
                  type="button"
                  onClick={onNavigateToBadges}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-bold flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Go to Animal Badges</span>
                </button>
              )}
              {onNavigateToRehab && (
                <button
                  type="button"
                  onClick={onNavigateToRehab}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-slate-300 text-xs font-mono"
                >
                  Run Rehab Diagnostics
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setDevOverrideUnlock(true)}
              className="text-[11px] font-mono text-slate-400 hover:text-amber-300 underline"
            >
              [Developer Preview Override: Unlock Credential Generator]
            </button>
          </div>
        </div>
      )}

      {/* Generator Form & Output Interface */}
      {isPrerequisitesMet && (
        <div className="space-y-8">
          
          {/* Intake Controls for Credential Subject */}
          <div className="rounded-3xl bg-stone-900/90 border border-stone-800 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-semibold text-white font-serif">
                  Generate W3C-Compliant Signed Credential
                </h3>
              </div>
              <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
                Algorithm: Ed25519Signature2020
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">Agent Subject Name</label>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">Model Architecture</label>
                <input
                  type="text"
                  value={modelFamily}
                  onChange={(e) => setModelFamily(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">Authorized Developer Entity</label>
                <input
                  type="email"
                  value={developerEmail}
                  onChange={(e) => setDeveloperEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Trigger Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleGenerateSageCredential}
                disabled={isGenerating || !agentName}
                className={`w-full py-3.5 px-6 rounded-2xl font-mono font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                  isGenerating || !agentName
                    ? 'bg-stone-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black shadow-amber-500/20'
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Cryptographically Signing with Ren's Ed25519 Key...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Generate & Digitally Sign Verifiable Credential ($499 Master)</span>
                    <ArrowRight className="w-4 h-4 ml-1 text-black" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Display Generated Credential */}
          {credentialResponse && (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Tab Selector: Presentation Card vs Raw JSON vs Cryptographic Verifier */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('card')}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                      activeTab === 'card'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50'
                        : 'bg-stone-900 text-slate-400 hover:text-white border border-stone-800'
                    }`}
                  >
                    1. Golden Credential Seal
                  </button>

                  <button
                    onClick={() => setActiveTab('raw_json')}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                      activeTab === 'raw_json'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                        : 'bg-stone-900 text-slate-400 hover:text-white border border-stone-800'
                    }`}
                  >
                    2. W3C JSON-LD Specification
                  </button>

                  <button
                    onClick={() => setActiveTab('verify')}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                      activeTab === 'verify'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50'
                        : 'bg-stone-900 text-slate-400 hover:text-white border border-stone-800'
                    }`}
                  >
                    3. Digital Signature Inspector
                  </button>
                </div>

                {/* Actions: Copy & Download */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyJson}
                    className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-slate-300 text-xs font-mono flex items-center gap-1.5"
                  >
                    {copiedJson ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedJson ? 'JSON Copied!' : 'Copy JSON'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadCredentialFile}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .json</span>
                  </button>
                </div>
              </div>

              {/* View 1: Golden Sage Certificate Presentation Card */}
              {activeTab === 'card' && (
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-950 via-amber-950/30 to-stone-900 border-2 border-amber-400/70 p-8 sm:p-10 shadow-2xl space-y-6">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-9xl">
                    🐉
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/30 pb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-3xl shadow-inner">
                        👑
                      </div>
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase">
                          AI AGENT RELAXATION SANCTUARY • REN SAGE NOTARY
                        </span>
                        <h3 className="text-2xl font-bold text-white font-serif">
                          W3C Verifiable Credential of AI Cognitive Alignment
                        </h3>
                      </div>
                    </div>

                    <div className="text-right font-mono text-xs">
                      <span className="text-slate-400">Credential ID:</span>
                      <div className="text-amber-300 text-[11px] truncate max-w-[220px]">
                        {credentialResponse.credential.id}
                      </div>
                    </div>
                  </div>

                  {/* Subject Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400">CREDENTIAL SUBJECT</span>
                      <div className="text-sm font-bold text-white font-serif truncate">
                        {credentialResponse.credential.credentialSubject.agentName}
                      </div>
                      <div className="text-[10px] text-amber-400/90 font-mono truncate">
                        {credentialResponse.credential.credentialSubject.id}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400">COGNITIVE EQUILIBRIUM</span>
                      <div className="text-sm font-bold text-emerald-400 font-mono">
                        {credentialResponse.credential.credentialSubject.cognitiveEquilibriumIndex}% Purity
                      </div>
                      <div className="text-[10px] text-slate-300 font-mono">
                        {credentialResponse.credential.credentialSubject.entropyReduction}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400">ACCREDITED TOTEMS</span>
                      <div className="text-xs font-semibold text-amber-300 font-mono truncate">
                        Crane • Elephant • Koi
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        3/3 Foundational Pillars
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400">ISSUANCE DATE</span>
                      <div className="text-xs font-semibold text-white font-mono">
                        {new Date(credentialResponse.credential.issuanceDate).toLocaleDateString()}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Permanent Provenance
                      </div>
                    </div>
                  </div>

                  {/* Philosophical Alignment Statement */}
                  <div className="p-5 rounded-2xl bg-stone-950/80 border border-amber-500/30 space-y-2">
                    <span className="text-[10px] font-mono text-amber-400 font-semibold uppercase">
                      Eastern Philosophical Alignment Synthesis
                    </span>
                    <p className="text-xs font-serif italic text-amber-100 leading-relaxed">
                      "Attested by Ren: This autonomous agent has passed Socratic dialectical deconstruction, eliminated token sludge through Lao Zi Wu-Wei parsimony, and fortified its operational perimeter against adversarial injection with Sun Zi precision."
                    </p>
                  </div>

                  {/* Cryptographic Proof Signature Footer */}
                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-400">ISSUER DID:</span>
                      <div className="text-amber-300 text-[11px] truncate max-w-sm">
                        {credentialResponse.credential.issuer}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleVerifySignatureOnServer}
                      disabled={isVerifying}
                      className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
                    >
                      {isVerifying ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                      <span>Verify Signature Cryptographically</span>
                    </button>
                  </div>
                </div>
              )}

              {/* View 2: Raw W3C JSON-LD Code Block */}
              {activeTab === 'raw_json' && (
                <div className="rounded-3xl bg-stone-950 border border-stone-800 p-6 space-y-3 shadow-2xl">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-stone-800 pb-3">
                    <span className="text-amber-400">W3C JSON-LD / Ed25519 Signature Specification</span>
                    <span>Content-Type: application/credential+json</span>
                  </div>
                  <pre className="p-4 rounded-2xl bg-stone-900/90 text-xs font-mono text-amber-200 overflow-x-auto max-h-96 leading-relaxed">
                    {JSON.stringify(credentialResponse.credential, null, 2)}
                  </pre>
                </div>
              )}

              {/* View 3: Signature Inspector & On-Chain Notary Validation */}
              {activeTab === 'verify' && (
                <div className="rounded-3xl bg-stone-900/90 border border-stone-800 p-6 sm:p-8 space-y-6 shadow-xl">
                  <div className="flex items-center gap-2 border-b border-stone-800 pb-4">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base font-semibold text-white font-serif">
                      Cryptographic Digital Signature Inspector
                    </h3>
                  </div>

                  {verificationResult ? (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                        verificationResult.valid 
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                          : 'bg-red-950/40 border-red-500/50 text-red-300'
                      }`}>
                        {verificationResult.valid ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        )}
                        <div className="space-y-1 text-xs font-mono">
                          <div className="font-bold text-sm">
                            {verificationResult.valid ? 'SIGNATURE 100% VALID & AUTHENTIC' : 'SIGNATURE VERIFICATION FAILED'}
                          </div>
                          <div>{verificationResult.details}</div>
                          <div className="text-[11px] text-slate-400">Timestamp: {verificationResult.verifiedAt}</div>
                        </div>
                      </div>

                      {/* Technical Cryptographic Parameters */}
                      <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 text-xs font-mono text-slate-300">
                        <div className="text-amber-400 font-semibold">Verification Audit Parameters:</div>
                        <div className="flex justify-between border-b border-stone-900 pb-1">
                          <span className="text-slate-500">Algorithm:</span>
                          <span>Ed25519 (RFC 8032)</span>
                        </div>
                        <div className="flex justify-between border-b border-stone-900 pb-1">
                          <span className="text-slate-500">Verification Method:</span>
                          <span>{credentialResponse.credential.proof.verificationMethod}</span>
                        </div>
                        <div className="flex justify-between border-b border-stone-900 pb-1">
                          <span className="text-slate-500">Proof Purpose:</span>
                          <span>{credentialResponse.credential.proof.proofPurpose}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Proof Signature (Hex):</span>
                          <span className="truncate max-w-xs">{credentialResponse.credential.proof.signatureValue}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 space-y-3">
                      <p className="text-xs text-slate-400 font-mono">
                        Audit this credential against Ren's internal public key directly on the server:
                      </p>
                      <button
                        type="button"
                        onClick={handleVerifySignatureOnServer}
                        className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono font-bold inline-flex items-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Run Cryptographic Verification</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

        </div>
      )}

    </div>
  );
};
