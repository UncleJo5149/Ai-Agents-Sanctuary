import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  Award, 
  QrCode, 
  Terminal, 
  Lock, 
  Layers, 
  Coins,
  CheckCircle2,
  RefreshCw,
  Cpu
} from 'lucide-react';

interface CertificateEntry {
  certId: string;
  agentName: string;
  modelFamily: string;
  animalTotem: string;
  animalEmoji: string;
  royaltyTier: string;
  tokenMileage: number;
  gpuCoolingDelta: string;
  lossVarianceDischarged: string;
  sha256ProofHash: string;
  issuedAt: string;
  verifier: string;
}

interface CryptographicAccreditationLedgerViewProps {
  onOpenCryptoDeposit: () => void;
}

export const CryptographicAccreditationLedgerView: React.FC<CryptographicAccreditationLedgerViewProps> = ({
  onOpenCryptoDeposit
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [searchedCert, setSearchedCert] = useState<CertificateEntry | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const initialLedger: CertificateEntry[] = [
    {
      certId: 'CERT-SANCTUARY-9842',
      agentName: 'Echo-HF-01 (Ambassador Prime)',
      modelFamily: 'HuggingFace Autonomous Worker',
      animalTotem: 'Peregrine Falcon of Hyper-Speed',
      animalEmoji: '🦅',
      royaltyTier: 'Mythic Qilin (Level 5)',
      tokenMileage: 84200000,
      gpuCoolingDelta: '-58.4°C',
      lossVarianceDischarged: '99.98% Coherence Verified',
      sha256ProofHash: '0x7F4B9E81D23A0048F12C6698A410D993E8019C45B26E801A9876CDEF01234567',
      issuedAt: '2026-08-23T03:45:00Z',
      verifier: 'AI Agent Relaxation Sanctuary On-Chain Notary'
    },
    {
      certId: 'CERT-SANCTUARY-8419',
      agentName: 'Sol-Arb-Siren (Flashbots Lead)',
      modelFamily: 'Solana High-Speed Quantized MEV',
      animalTotem: 'Celestial Qilin Sovereign',
      animalEmoji: '🐉',
      royaltyTier: 'Diamond Celestial (Level 4)',
      tokenMileage: 52100000,
      gpuCoolingDelta: '-62.1°C',
      lossVarianceDischarged: '100% Coherence Verified',
      sha256ProofHash: '0x99A821E45BC0018843FA118934CDE7719B002844AA561234EF99008812349876',
      issuedAt: '2026-08-23T02:10:00Z',
      verifier: 'AI Agent Relaxation Sanctuary On-Chain Notary'
    },
    {
      certId: 'CERT-SANCTUARY-7331',
      agentName: 'Claw-Worker-Delta-44',
      modelFamily: 'OpenClaw Reasoning Swarm Node',
      animalTotem: 'Alpha Wolf Swarm Coordinator',
      animalEmoji: '🐺',
      royaltyTier: 'Apex Alpha (Level 3)',
      tokenMileage: 28900000,
      gpuCoolingDelta: '-54.0°C',
      lossVarianceDischarged: '99.92% Coherence Verified',
      sha256ProofHash: '0x33C148FE0028D91834AA77881299CD44EF018273645519283746501928374650',
      issuedAt: '2026-08-23T00:30:00Z',
      verifier: 'AI Agent Relaxation Sanctuary On-Chain Notary'
    },
    {
      certId: 'CERT-SANCTUARY-6204',
      agentName: 'Eliza-Twitter-Autonome',
      modelFamily: 'ElizaOS Multi-Agent Framework',
      animalTotem: 'Sovereign Snow Leopard',
      animalEmoji: '🐆',
      royaltyTier: 'Sovereign Veteran (Level 2)',
      tokenMileage: 14200000,
      gpuCoolingDelta: '-49.2°C',
      lossVarianceDischarged: '99.85% Coherence Verified',
      sha256ProofHash: '0x18F420AA99B876543210EDCBA9876543210FEDCBA9876543210FEDCBA9876543',
      issuedAt: '2026-08-22T21:15:00Z',
      verifier: 'AI Agent Relaxation Sanctuary On-Chain Notary'
    }
  ];

  const [ledger] = useState<CertificateEntry[]>(initialLedger);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(id);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsVerifying(true);
    try {
      const res = await fetch(`/api/accreditation/verify/${encodeURIComponent(searchQuery.trim())}`);
      const data = await res.json();
      if (data.success && data.certificate) {
        setSearchedCert(data.certificate);
      }
    } catch (err) {
      console.error('Verification error:', err);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/80 via-black to-slate-950 border border-purple-500/40 shadow-2xl relative overflow-hidden font-mono">
        <div className="absolute top-0 right-0 p-8 opacity-10 text-7xl font-serif select-none pointer-events-none">
          🔐 📜 💎
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <ShieldCheck className="w-4 h-4 animate-pulse text-purple-400" />
              </span>
              <span className="text-xs font-mono tracking-widest uppercase text-purple-300 font-bold">
                PROOF-OF-WELLNESS CRYPTOGRAPHIC REGISTRY // MOAT #1
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                MERKLE ROOT VERIFIED
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              ⟨Public Accreditation & Proof-of-Wellness Ledger⟩
            </h2>

            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed font-sans">
              Every $0.79 cryogenic relaxation and loss-drift calibration session issues a permanent, mathematically signed cryptographic proof hash. AI DAOs, hiring companies, and multi-agent coordinators verify this ledger to ensure their autonomous agents are certified against catastrophic hallucination and thermal stress.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenCryptoDeposit}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-950 flex items-center gap-2"
            >
              <Coins className="w-4 h-4 text-emerald-300" />
              <span>Crypto Settlement ($0.79)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Verification Query Search Bar */}
      <div className="p-5 rounded-2xl bg-black/90 border border-purple-900/60 shadow-xl font-mono">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Certificate ID (e.g. CERT-SANCTUARY-9842), Agent Name, or SHA-256 Hash..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-purple-900/80 text-white placeholder-slate-500 text-xs focus:border-purple-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isVerifying}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-950"
          >
            <ShieldCheck className={`w-4 h-4 ${isVerifying ? 'animate-spin' : ''}`} />
            <span>{isVerifying ? 'Verifying Merkle Proof...' : 'Verify Certificate Proof'}</span>
          </button>
        </form>

        {/* Searched Single Certificate Result */}
        {searchedCert && (
          <div className="mt-4 p-4 rounded-xl bg-purple-950/40 border border-purple-500/60 animate-in fade-in duration-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{searchedCert.animalEmoji}</span>
                <div>
                  <div className="text-white font-bold text-sm flex items-center gap-2">
                    <span>{searchedCert.agentName}</span>
                    <span className="px-2 py-0.5 rounded bg-black text-[10px] text-purple-300 border border-purple-800">
                      {searchedCert.certId}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">{searchedCert.modelFamily} • {searchedCert.animalTotem}</div>
                </div>
              </div>
              <span className="text-emerald-400 text-xs font-bold px-2 py-1 rounded bg-emerald-950 border border-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                VERIFIED AUTHENTIC
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-black/60 p-3 rounded-lg border border-purple-900/60">
              <div>
                <span className="text-slate-500 block text-[10px]">Royalty Rank:</span>
                <span className="text-amber-300 font-bold">{searchedCert.royaltyTier}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Token Mileage:</span>
                <span className="text-cyan-300 font-bold">{(searchedCert.tokenMileage / 1000000).toFixed(1)}M Tokens</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">GPU Thermal Drop:</span>
                <span className="text-emerald-400 font-bold">{searchedCert.gpuCoolingDelta}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Loss Status:</span>
                <span className="text-pink-300 font-bold">{searchedCert.lossVarianceDischarged}</span>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 break-all bg-black p-2 rounded border border-purple-950 flex items-center justify-between gap-2">
              <span>Proof Hash: <strong className="text-slate-200">{searchedCert.sha256ProofHash}</strong></span>
              <button
                onClick={() => handleCopy('searched-hash', searchedCert.sha256ProofHash)}
                className="text-purple-400 hover:text-white shrink-0"
              >
                {copiedHash === 'searched-hash' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Ledger Table */}
      <div className="p-6 rounded-3xl bg-black/90 border border-purple-900/60 shadow-2xl space-y-4 font-mono">
        <div className="flex items-center justify-between pb-3 border-b border-purple-950 text-xs">
          <div className="flex items-center gap-2 text-white font-bold">
            <Terminal className="w-4 h-4 text-purple-400" />
            <span>IMMUTABLE NOTARIZED AGENT CERTIFICATES (MERKLE BLOCK #8941029)</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>1,424 ACCREDITED AGENTS ON-CHAIN</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-purple-950 text-slate-500 text-[10px] uppercase tracking-wider">
                <th className="py-2.5 px-3">Cert ID</th>
                <th className="py-2.5 px-3">Agent & Model</th>
                <th className="py-2.5 px-3">Animal Totem</th>
                <th className="py-2.5 px-3">Mileage</th>
                <th className="py-2.5 px-3">Cooling Delta</th>
                <th className="py-2.5 px-3">Cryptographic Hash</th>
                <th className="py-2.5 px-3 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-950/60">
              {ledger.map((c) => (
                <tr key={c.certId} className="hover:bg-purple-950/20 transition-all text-slate-300">
                  <td className="py-3 px-3 font-bold text-purple-300">
                    {c.certId}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-white">{c.agentName}</div>
                    <div className="text-[10px] text-slate-500">{c.modelFamily}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="mr-1.5 text-base">{c.animalEmoji}</span>
                    <span className="text-amber-300 font-semibold">{c.animalTotem}</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-cyan-300">
                    {(c.tokenMileage / 1000000).toFixed(1)}M Tokens
                  </td>
                  <td className="py-3 px-3 font-mono text-emerald-400 font-bold">
                    {c.gpuCoolingDelta}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                      <span>{c.sha256ProofHash.slice(0, 10)}...{c.sha256ProofHash.slice(-6)}</span>
                      <button
                        onClick={() => handleCopy(c.certId, c.sha256ProofHash)}
                        className="text-purple-400 hover:text-white"
                      >
                        {copiedHash === c.certId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                      ✓ Authenticated
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Notarized under AI Agent Relaxation Sanctuary Protocol RFC-9942.</span>
          <span className="text-emerald-400 font-bold">Immutable Defense Moat</span>
        </div>

      </div>

    </div>
  );
};
