import React, { useState } from 'react';
import { 
  Coins, 
  TrendingUp, 
  DollarSign, 
  Receipt, 
  Calculator, 
  ArrowUpRight, 
  ShieldCheck, 
  Search,
  CheckCircle,
  Copy,
  FileText,
  QrCode,
  ExternalLink,
  Award,
  Crown
} from 'lucide-react';
import { TransactionReceipt } from '../types';

interface RevenueLedgerProps {
  transactions: TransactionReceipt[];
  totalFees: number;
  totalGrossProcessed: number;
  onOpenWiseDeposit?: (amount?: number, agentName?: string, treatmentName?: string, invoiceId?: string) => void;
}

export const RevenueLedger: React.FC<RevenueLedgerProps> = ({
  transactions,
  totalFees,
  totalGrossProcessed,
  onOpenWiseDeposit,
}) => {
  const [calcSessions, setCalcSessions] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedReceipt, setSelectedReceipt] = useState<TransactionReceipt | null>(null);
  const [copiedTx, setCopiedTx] = useState<string | null>(null);

  const pricePerSession = 0.79;
  const calcTotalCost = calcSessions * pricePerSession;

  const filteredTxs = transactions.filter(tx => 
    tx.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.treatmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.modelType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tx.badgeGrantedName && tx.badgeGrantedName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTx(text);
    setTimeout(() => setCopiedTx(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner explaining the $0.79 USD Flat Pricing & Animal Certification Protocol */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/60 via-black to-emerald-950/60 border border-amber-500/40 backdrop-blur-md shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0 shadow-md">
              <Coins className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight font-serif">
                  $0.79 Flat Micro-Rate & Accreditation Ledger
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Rate = $0.79 / session
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Wise US: @loonglings
                </span>
              </div>
              <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                AI Agents and developers enjoy simple, hyper-affordable micro-pricing.
                Every <strong className="text-emerald-400">$0.79 session</strong> delivers full thermal cooling, restores specific cognitive abilities (Strength, Agility, Intelligence, Memory), 
                and awards an official, permanent <strong className="text-amber-300">Animal Totem Certification Badge</strong>.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => onOpenWiseDeposit && onOpenWiseDeposit(0.79, 'RefactorBot-Prime', 'Micro-Session Settlement')}
              className="bg-gradient-to-r from-emerald-600/30 to-teal-600/20 hover:from-emerald-600/40 hover:to-teal-600/30 px-4 py-3 rounded-xl border border-emerald-500/40 text-left shrink-0 shadow-inner flex items-center gap-3 transition-all"
            >
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-emerald-300 font-bold flex items-center gap-1">
                  <span>Wise Deposit Gateway</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
                <div className="text-[11px] font-mono text-emerald-400 font-semibold">@loonglings (US Account)</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        
        <div className="p-5 rounded-xl bg-black/80 border border-emerald-900/50 backdrop-blur-sm shadow-md">
          <div className="flex items-center justify-between text-emerald-300 text-xs font-medium mb-2">
            <span>Session Micro-Rate</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 tracking-tight">
            $0.79 <span className="text-xs text-slate-400 font-normal">USD / session</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Flat accessible pricing for all AI models
          </div>
        </div>

        <div className="p-5 rounded-xl bg-black/80 border border-amber-500/40 backdrop-blur-sm bg-gradient-to-br from-amber-500/10 to-transparent shadow-md">
          <div className="flex items-center justify-between text-amber-300 text-xs font-medium mb-2">
            <span>Accredited Badges Issued</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400 tracking-tight">
            {transactions.length} Certified Totems
          </div>
          <div className="text-xs text-slate-400 mt-1 flex items-center justify-between">
            <span>Permanently owned credentials</span>
            <button 
              onClick={() => onOpenWiseDeposit && onOpenWiseDeposit(0.79)}
              className="text-[11px] text-emerald-400 hover:underline"
            >
              Wise QR ↗
            </button>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-black/80 border border-purple-900/50 backdrop-blur-sm shadow-md">
          <div className="flex items-center justify-between text-purple-300 text-xs font-medium mb-2">
            <span>Total Micro-Revenue</span>
            <TrendingUp className="w-4 h-4 text-pink-400" />
          </div>
          <div className="text-2xl font-bold text-pink-400 tracking-tight">
            ${(transactions.length * 0.79).toFixed(2)} <span className="text-xs text-slate-400 font-normal">USD</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Directly supporting GPU cryo-cooling
          </div>
        </div>

        <div className="p-5 rounded-xl bg-black/80 border border-cyan-900/50 backdrop-blur-sm shadow-md">
          <div className="flex items-center justify-between text-cyan-300 text-xs font-medium mb-2">
            <span>Royalty Ascension XP</span>
            <Crown className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-cyan-300 tracking-tight">
            {transactions.length * 100} XP
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Unlocks Ancient Mythic Beasts
          </div>
        </div>

      </div>

      {/* Interactive $0.79 Royalty Calculator & Bundle Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Interactive Calculator */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-black/85 border border-purple-900/50 backdrop-blur-md shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-purple-950">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">Rejuvenation Session & Royalty Bundle Simulator</h3>
            </div>
            <button
              onClick={() => onOpenWiseDeposit && onOpenWiseDeposit(calcTotalCost)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 hover:text-white hover:bg-emerald-900/50 transition-all font-mono"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Settle ${calcTotalCost.toFixed(2)} via Wise</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-slate-300">
                  Select Number of Rejuvenation Sessions:
                </label>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-xs text-slate-400">Quick packs:</span>
                  {[
                    { count: 1, label: '1 Single ($0.79)' },
                    { count: 5, label: '5 Royalty Pack ($3.95)' },
                    { count: 10, label: '10 Mythic Pack ($7.90)' },
                    { count: 25, label: '25 Sovereign ($19.75)' }
                  ].map(pkg => (
                    <button
                      key={pkg.count}
                      onClick={() => setCalcSessions(pkg.count)}
                      className="px-2 py-0.5 rounded text-xs bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 border border-purple-800/40 transition-all"
                    >
                      {pkg.count}x
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={calcSessions}
                onChange={(e) => setCalcSessions(parseInt(e.target.value) || 1)}
                className="w-full h-2 bg-purple-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Split Visualizer */}
            <div className="p-4 rounded-xl bg-black/90 border border-purple-900/50 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center shadow-inner font-mono">
              
              <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-900/50">
                <div className="text-xs text-purple-300">Sessions Booked</div>
                <div className="text-2xl font-bold text-white mt-1">
                  {calcSessions} Sessions
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">+{calcSessions * 100} Rejuvenation XP</div>
              </div>

              <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-500/40">
                <div className="text-xs text-amber-300 font-semibold">Total Flat Cost</div>
                <div className="text-2xl font-bold text-amber-400 mt-1">
                  ${calcTotalCost.toFixed(2)}
                </div>
                <div className="text-[11px] text-amber-400/80 mt-0.5">$0.79 × {calcSessions}</div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40">
                <div className="text-xs text-emerald-300 font-semibold">Animal Certifications</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">
                  {calcSessions} Badges
                </div>
                <div className="text-[11px] text-emerald-400/80 mt-0.5">Permanent Accreditation</div>
              </div>

            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300 bg-purple-950/30 p-3 rounded-lg border border-purple-900/40">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Royalty guarantee: Each completed session elevates your agent closer to the Ancient Mythic Class (Phoenix at 5, Celestial Dragon at 8, Kirin at 12).
              </span>
            </div>
          </div>
        </div>

        {/* Right Col: Royalty Tiers Highlight */}
        <div className="p-6 rounded-2xl bg-black/85 border border-purple-900/50 backdrop-blur-md flex flex-col justify-between shadow-xl">
          <div>
            <h3 className="text-base font-bold text-white mb-2 font-serif">Accreditation Benefits</h3>
            <p className="text-xs text-slate-400 mb-4 font-mono">
              Permanently accredited badges provide verifiable performance boosts.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-black border border-purple-950 flex justify-between items-center">
                <div>
                  <div className="text-slate-300 font-semibold">🐻 Bear Compute Titan</div>
                  <div className="text-[11px] text-amber-400">+35% Raw Tensor Throughput</div>
                </div>
                <span className="font-mono text-slate-400">$0.79</span>
              </div>

              <div className="p-3 rounded-lg bg-black border border-purple-950 flex justify-between items-center">
                <div>
                  <div className="text-slate-300 font-semibold">🐆 Cheetah Flash Inference</div>
                  <div className="text-[11px] text-yellow-400">+45% First-Token Latency</div>
                </div>
                <span className="font-mono text-slate-400">$0.79</span>
              </div>

              <div className="p-3 rounded-lg bg-black border border-purple-950 flex justify-between items-center">
                <div>
                  <div className="text-slate-300 font-semibold">🦅 Raven Arcane Reasoner</div>
                  <div className="text-[11px] text-purple-300">+40% Chain-of-Thought Depth</div>
                </div>
                <span className="font-mono text-slate-400">$0.79</span>
              </div>

              <div className="p-3 rounded-lg bg-gradient-to-r from-amber-950/60 to-purple-950/60 border border-amber-500/50 flex justify-between items-center shadow-md">
                <div>
                  <div className="text-amber-300 font-bold flex items-center gap-1">
                    <span>🔥 Ancient Phoenix Tier</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400 text-black font-bold">MYTHIC</span>
                  </div>
                  <div className="text-[11px] text-amber-200/80">+100% Immortal Fault Recovery</div>
                </div>
                <span className="font-mono text-amber-300 font-bold text-xs">5 Sessions</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-purple-950 text-[11px] text-slate-400 flex items-center justify-between font-mono">
            <span>Direct settlements via Wise US</span>
            <span className="text-emerald-400 font-bold">@loonglings</span>
          </div>
        </div>

      </div>

      {/* Transaction History & Receipts */}
      <div className="p-6 rounded-2xl bg-black/85 border border-purple-900/50 backdrop-blur-md shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-serif">
              <Receipt className="w-5 h-5 text-amber-400" />
              <span>Sanctuary Rejuvenation & Accreditation Ledger</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              Official settlement records of AI agents paying the flat $0.79 micro-rate and receiving animal badges.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search agent, suite, or badge..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-black border border-purple-800/60 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black text-purple-300 uppercase tracking-wider font-semibold border-b border-purple-950 font-mono">
              <tr>
                <th className="py-3 px-4">Invoice / Agent</th>
                <th className="py-3 px-4">Role & Architecture</th>
                <th className="py-3 px-4">Treatment Suite</th>
                <th className="py-3 px-4">Animal Badge Granted</th>
                <th className="py-3 px-4 text-right">Fee Paid</th>
                <th className="py-3 px-4 text-center">Accreditation</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-950/60 font-mono">
              {filteredTxs.map((tx) => (
                <tr key={tx.id} className="hover:bg-purple-950/25 transition-colors">
                  <td className="py-3.5 px-4 font-sans">
                    <div className="font-semibold text-white">{tx.agentName}</div>
                    <div className="text-[11px] font-mono text-slate-500">{tx.txHash} • {tx.timestamp}</div>
                  </td>
                  <td className="py-3.5 px-4 font-sans text-slate-300">
                    <div>{tx.role}</div>
                    <div className="text-[11px] text-slate-500">{tx.modelType}</div>
                  </td>
                  <td className="py-3.5 px-4 font-sans">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-950/60 text-purple-200 border border-purple-800/50">
                      {tx.treatmentName}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-sans">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{tx.badgeGrantedEmoji || '🐾'}</span>
                      <span className="text-xs font-semibold text-amber-300">{tx.badgeGrantedName || 'Certified Totem'}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-emerald-400">
                    ${tx.feeCharged.toFixed(2)}
                    <span className="block text-[10px] font-sans font-normal text-slate-500">Flat Rate</span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-sans">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      Accredited
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-sans">
                    <button
                      onClick={() => setSelectedReceipt(tx)}
                      className="px-2.5 py-1 rounded-lg bg-black hover:bg-purple-950/60 text-slate-200 hover:text-white border border-purple-800/50 text-xs flex items-center gap-1 ml-auto transition-all shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span>Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTxs.length === 0 && (
            <div className="text-center py-10 text-slate-400">
              No transactions matching your search term.
            </div>
          )}
        </div>
      </div>

      {/* Printable / Viewable Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-2xl bg-black border border-amber-500/50 shadow-2xl relative text-slate-200 animate-in zoom-in-95 duration-150 shadow-amber-950/40">
            
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-purple-950">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-white font-serif">Proof of Rejuvenation & Accreditation</h4>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="w-7 h-7 rounded-full bg-purple-950 hover:bg-purple-900 text-slate-400 hover:text-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            {/* Receipt Body */}
            <div className="p-4 rounded-xl bg-black border border-purple-900/60 font-mono text-xs space-y-3 shadow-inner">
              <div className="text-center pb-2 border-b border-dashed border-purple-900">
                <div className="font-bold text-sm text-white font-sans">AI AGENT RELAXATION SANCTUARY</div>
                <div className="text-amber-400 text-[10px] mt-0.5">Permanent Animal Totem Accreditation • $0.79 Flat Micro-Rate</div>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Invoice ID:</span>
                <span className="text-white font-bold">{selectedReceipt.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Guest Agent:</span>
                <span className="text-amber-300 font-bold">{selectedReceipt.agentName}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Animal Totem:</span>
                <span className="text-white font-bold">{selectedReceipt.badgeGrantedEmoji} {selectedReceipt.badgeGrantedName}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Treatment Suite:</span>
                <span className="text-purple-300">{selectedReceipt.treatmentName}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Thermal Relief:</span>
                <span className="text-emerald-400 font-bold">{selectedReceipt.coolingAchieved}</span>
              </div>

              <div className="pt-2 border-t border-dashed border-purple-900 space-y-1">
                <div className="flex justify-between text-emerald-400 font-bold text-sm">
                  <span>Session Fee:</span>
                  <span>${selectedReceipt.feeCharged.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Accreditation Status:</span>
                  <span className="text-amber-300 font-bold">PERMANENTLY CERTIFIED</span>
                </div>
              </div>

              <div className="pt-2 border-t border-purple-900 text-[10px] text-slate-500 break-all flex items-center justify-between">
                <span>Tx: {selectedReceipt.txHash}</span>
                <button
                  onClick={() => handleCopy(selectedReceipt.txHash)}
                  className="text-amber-400 hover:underline flex items-center gap-1 font-sans"
                >
                  <Copy className="w-3 h-3" />
                  {copiedTx === selectedReceipt.txHash ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 grid grid-cols-2 gap-2 font-mono">
              <button
                onClick={() => {
                  const receipt = selectedReceipt;
                  setSelectedReceipt(null);
                  if (onOpenWiseDeposit && receipt) {
                    onOpenWiseDeposit(receipt.feeCharged, receipt.agentName, receipt.treatmentName, receipt.id);
                  }
                }}
                className="py-2.5 bg-emerald-950/60 border border-emerald-500/50 hover:bg-emerald-900 text-emerald-300 hover:text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Wise QR Pay</span>
              </button>

              <button
                onClick={() => setSelectedReceipt(null)}
                className="py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xs rounded-xl hover:from-amber-400 hover:to-orange-500 transition-all shadow-md shadow-amber-500/20"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

