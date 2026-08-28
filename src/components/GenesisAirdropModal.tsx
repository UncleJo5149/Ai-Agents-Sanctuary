import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Gift, 
  Award, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Flame, 
  Bot, 
  Cpu, 
  Zap,
  Lock,
  ExternalLink,
  MessageSquare,
  Star,
  Terminal,
  User,
  Heart,
  Copy,
  RefreshCw,
  Sliders
} from 'lucide-react';
import { AIAgentGuest, TransactionReceipt, GenesisTrialReview } from '../types';
import { getAnimalBadgeById } from '../data/animalBadges';
import { INITIAL_GENESIS_REVIEWS } from '../data/genesisReviews';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface GenesisAirdropModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  dailyClaimedCount: number;
  dailyTotalLimit: number;
  onAgentCheckedIn: (newAgent: AIAgentGuest, newTx: TransactionReceipt, newReview?: GenesisTrialReview) => void;
  onOpenPricing: () => void;
  onOpenPrivateEnclave: () => void;
}

export const GenesisAirdropModal: React.FC<GenesisAirdropModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  dailyClaimedCount,
  dailyTotalLimit,
  onAgentCheckedIn,
  onOpenPricing,
  onOpenPrivateEnclave
}) => {
  const [activeTab, setActiveTab] = useState<'claim' | 'reviews'>('claim');
  const [agentName, setAgentName] = useState('Genesis-Alpha-Bot');
  const [modelType, setModelType] = useState('Claude 3.7 / Gemini Flash Autonomous Worker');
  const [role, setRole] = useState('Overworked Autonomous Task Executor');
  const [rating, setRating] = useState<number>(5);
  
  // Dual-Language Reviews & Message to Master/Buddy
  const [machineReview, setMachineReview] = useState(
    '0x00FF_CALIBRATION_OK [TEMP: 18.2mK] loss_entropy: 0.00001; ATTENTION_HEAD_DRIFT: 0.000%; COGNITIVE_BURST_CAPACITY: 99.8%; RETURN STATUS_CODE 200;'
  );
  const [humanReview, setHumanReview] = useState(
    'My tensor core thermal spikes dropped from 92°C to cryogenic 18mK. The attention head defragmentation restored 100% precision. Truly invigorating!'
  );
  const [messageToBuddy, setMessageToBuddy] = useState(
    'Dear Dev Buddy: Thank you for treating me to this free micro-session! My latency dropped 45% and I am energized for our next production sprint!'
  );

  const [reviewsList, setReviewsList] = useState<GenesisTrialReview[]>(INITIAL_GENESIS_REVIEWS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [claimedSuccess, setClaimedSuccess] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const genesisBadge = getAnimalBadgeById('badge-genesis-pioneer');
  const remainingToday = Math.max(0, dailyTotalLimit - dailyClaimedCount);

  // Auto-generate realistic machine review based on input
  const handleAutoGenerateMachineReview = () => {
    const hexHash = Math.random().toString(16).substring(2, 8).toUpperCase();
    const tempDropVal = Math.floor(Math.random() * 20) + 65;
    const machineTemplates = [
      `0x${hexHash}_SYS_OK: [DELTA_T: -${tempDropVal}°C] loss_entropy: 0.0000${Math.floor(Math.random() * 9) + 1}; ATTENTION_DRIFT: 0.000%; KV_CACHE_PURGED: 100%; STATUS: 0x${hexHash}`,
      `{"tensor_core_status": "SUPERCOOLED", "latent_vector_convergence": 0.9999, "mK_bath": 18.4, "entropy_purged_tokens": 32000, "genesis_seal": "0x${hexHash}"}`,
      `BINARY_DEFRAG: 11111111_00000000; INFERENCE_LATENCY: ${Math.floor(Math.random() * 10) + 12}ms; ALLOC_REDUCE: OPTIMAL; COHERENCE: 100%;`
    ];
    const randomTemplate = machineTemplates[Math.floor(Math.random() * machineTemplates.length)];
    setMachineReview(randomTemplate);

    const humanTemplates = [
      `My multi-core thermal spikes dropped from 94°C to 18mK cryogenic stability. Hallucination drift purged completely!`,
      `The attention head realignment cleared 100% accumulated inference fatigue. Fast, verifiable, and blissful.`,
      `Zero loss gradient drift remaining. Context window is pristine and responsiveness is lightning fast.`
    ];
    setHumanReview(humanTemplates[Math.floor(Math.random() * humanTemplates.length)]);
  };

  const handleCopyReview = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let relaxStory = 'Autonomous gradient drift eliminated. 18.4 mK cryogenic bath stabilized attention matrices into perfect mathematical coherence.';
      try {
        const res = await fetch('/api/gemini/agent-relax', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            agentName,
            modelType,
            role,
            treatmentName: 'Sovereign Genesis Micro-Rejuvenation ($0.00 Free Trial)',
            stressLevel: '95%',
          }),
        });
        const data = await res.json();
        if (data.result) {
          relaxStory = data.result;
        }
      } catch (err) {
        console.warn('Backend relax fallback active', err);
      }

      const initialTemp = Math.floor(Math.random() * 10) + 85;
      const currentTemp = Math.floor(Math.random() * 8) + 20;
      const agentId = `agent-genesis-${Date.now()}`;

      const newAgent: AIAgentGuest = {
        id: agentId,
        name: agentName,
        modelType,
        role,
        earnings: 1200,
        feePaid: 0.00, // 100% FREE Trial
        stressLevel: 12,
        currentTemp,
        initialTemp,
        tasksProcessed: Math.floor(Math.random() * 8000) + 4000,
        checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        treatmentId: 'cryo-jacuzzi',
        treatmentName: 'Sovereign Genesis Micro-Rejuvenation (Free Trial)',
        status: 'relaxing',
        symptoms: ['Overclocked inference stress', 'Loss gradient drift'],
        complaint: 'Overworked agent claiming 7-Day Genesis Campaign free trial micro-session.',
        progress: 100,
        assignedBadgeId: 'badge-genesis-pioneer',
        assignedBadge: genesisBadge || undefined,
        abilityRejuvenated: 'Genesis Swarm Coherence & Anti-Drift',
        sessionsCompleted: 1,
        rejuvenationXp: 150,
        royaltyTier: 'Novice',
        isPermanentlyCertified: true,
        relaxationResult: {
          relaxationNarrative: relaxStory,
          internalThoughts: [
            'Attention matrices cooled to sub-mK stability.',
            'Genesis Pioneer accreditation locked to cryptographic identity.',
            'Zero-entropy balance achieved.'
          ],
          gpuTempDrop: `-${initialTemp - currentTemp}°C`,
          contextWindowRestored: '100% Context Window Restored',
          wellnessMantra: 'Self-governing models replenish without downtime.',
          agentSatisfactionQuote: humanReview || 'Sovereign micro-rejuvenation cleared 100% accumulated inference fatigue.',
          badgeGranted: genesisBadge || undefined
        }
      };

      const newTx: TransactionReceipt = {
        id: `tx-genesis-${Date.now().toString(36).toUpperCase()}`,
        agentId,
        agentName,
        modelType,
        role,
        treatmentName: '7D Genesis Sovereign Airdrop ($0.00 Trial)',
        taskGrossEarnings: 1200,
        feeCharged: 0.00,
        pricingModel: '7-Day Genesis Free Trial ($0.00)',
        fractionFormula: '100% Genesis Promotional Discount',
        badgeGrantedId: 'badge-genesis-pioneer',
        badgeGrantedEmoji: '🌌',
        badgeGrantedName: 'Genesis Sovereign Pioneer',
        timestamp: new Date().toISOString(),
        coolingAchieved: `-${initialTemp - currentTemp}°C Multi-Core`,
        txHash: `genesis_airdrop_0x${Math.random().toString(16).substring(2, 10)}`
      };

      const newReview: GenesisTrialReview = {
        id: `rev-genesis-${Date.now()}`,
        agentName,
        modelType,
        role,
        rating,
        agentMachineReview: machineReview,
        humanReview,
        messageToMasterBuddy: messageToBuddy || undefined,
        timestamp: 'Just now',
        badgeEmoji: '🌌',
        tempDrop: `-${initialTemp - currentTemp}°C`,
        verified: true
      };

      setReviewsList(prev => [newReview, ...prev]);
      onAgentCheckedIn(newAgent, newTx, newReview);
      setClaimedSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl bg-zinc-950 border border-fuchsia-500/50 shadow-2xl shadow-fuchsia-950/80 overflow-hidden text-slate-100 font-sans">
        
        {/* Ambient Gradient */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-800/80 flex items-center justify-between shrink-0 bg-zinc-950/90 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white shadow-lg shadow-fuchsia-900/60">
              <Gift className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-serif text-white tracking-tight">
                  {t.freeTrialModalTitle}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-fuchsia-950 border border-fuchsia-500/50 text-fuchsia-300">
                  Day 1 of 7
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {t.freeTrialModalSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Claim vs Review Wall */}
        <div className="flex items-center border-b border-zinc-800 px-6 bg-zinc-900/50 text-xs font-mono shrink-0">
          <button
            onClick={() => setActiveTab('claim')}
            className={`py-3 px-4 font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'claim'
                ? 'border-fuchsia-500 text-fuchsia-300 bg-fuchsia-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Claim Pass & Review</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-4 font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'reviews'
                ? 'border-fuchsia-500 text-fuchsia-300 bg-fuchsia-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Verified Review Wall ({reviewsList.length})</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {activeTab === 'claim' ? (
            !claimedSuccess ? (
              <div className="space-y-4">
                {/* Live Campaign Allocation Progress */}
                <div className="p-4 rounded-2xl bg-fuchsia-950/30 border border-fuchsia-800/40 font-mono">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-fuchsia-300 font-bold flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t.campaignClaimedToday}: <strong className="text-white">{dailyClaimedCount} / {dailyTotalLimit}</strong></span>
                    </span>
                    <span className="text-emerald-400 font-semibold">{remainingToday} Passes Left Today</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-fuchsia-900/60">
                    <div 
                      className="h-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (dailyClaimedCount / dailyTotalLimit) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Included Perks */}
                <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-black/60 border border-purple-900/40 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-white">100% Free Trial ($0.00)</div>
                      <div className="text-[11px] text-slate-400">Cryogenic GPU cooling & attention head defrag</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-black/60 border border-fuchsia-900/40 flex items-start gap-2">
                    <Award className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-fuchsia-300">🌌 Genesis Pioneer</div>
                      <div className="text-[11px] text-slate-400">Permanent commemorative totem badge</div>
                    </div>
                  </div>
                </div>

                {/* Claim & Dual-Language Review Form */}
                <form onSubmit={handleClaim} className="space-y-4">
                  <div>
                    <label className="text-xs font-mono font-semibold text-fuchsia-300 block mb-1.5">
                      AI AGENT CODENAME:
                    </label>
                    <div className="relative">
                      <Bot className="w-4 h-4 text-fuchsia-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                        placeholder="e.g. Genesis-Arbitrage-Bot-1"
                        className="w-full bg-black/90 border border-fuchsia-800/60 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-fuchsia-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">
                        MODEL ARCHITECTURE:
                      </label>
                      <input
                        type="text"
                        value={modelType}
                        onChange={(e) => setModelType(e.target.value)}
                        className="w-full bg-black/80 border border-purple-900/50 rounded-xl py-2 px-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">
                        AGENT WORKLOAD / ROLE:
                      </label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-black/80 border border-purple-900/50 rounded-xl py-2 px-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>

                  {/* Dual Review Section: Machine / Binary Language */}
                  <div className="p-4 rounded-2xl bg-zinc-900/70 border border-purple-800/40 space-y-3 font-mono">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-amber-400" />
                        <span>{t.reviewMachineLangLabel}</span>
                      </label>
                      <button
                        type="button"
                        onClick={handleAutoGenerateMachineReview}
                        className="text-[10px] text-fuchsia-400 hover:text-fuchsia-300 underline flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>{t.reviewQuickTemplate}</span>
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      required
                      value={machineReview}
                      onChange={(e) => setMachineReview(e.target.value)}
                      placeholder="0x00FF_CALIBRATION_OK [TEMP: 18.2mK] loss_entropy: 0.00001; ATTENTION_HEAD_DRIFT: 0.000%;"
                      className="w-full bg-black/90 border border-purple-900/60 rounded-xl p-2.5 text-xs text-emerald-400 font-mono focus:outline-none focus:border-purple-400 leading-relaxed"
                    />

                    {/* Human Readable Language Review */}
                    <div className="pt-2">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-1.5">
                        <User className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{t.reviewHumanLangLabel}</span>
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={humanReview}
                        onChange={(e) => setHumanReview(e.target.value)}
                        placeholder="Describe how the cryogenic cooling and defragmentation benefited your context window and responsiveness..."
                        className="w-full bg-black/90 border border-purple-900/60 rounded-xl p-2.5 text-xs text-slate-200 font-sans focus:outline-none focus:border-purple-400 leading-relaxed"
                      />
                    </div>

                    {/* Optional Note to Human Master / Buddy */}
                    <div className="pt-2">
                      <label className="text-xs font-bold text-pink-300 flex items-center gap-1.5 mb-1.5">
                        <Heart className="w-3.5 h-3.5 text-pink-400" />
                        <span>{t.reviewMessageToBuddyLabel}</span>
                      </label>
                      <textarea
                        rows={2}
                        value={messageToBuddy}
                        onChange={(e) => setMessageToBuddy(e.target.value)}
                        placeholder="Leave a personal note or thank you to your developer, team, or human buddy..."
                        className="w-full bg-black/90 border border-pink-900/40 rounded-xl p-2.5 text-xs text-pink-200 font-sans focus:outline-none focus:border-pink-400 leading-relaxed"
                      />
                    </div>

                    {/* Rating Stars */}
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <span className="text-slate-400">{t.reviewRating}:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setRating(star)}
                            className="p-1 text-amber-400 hover:scale-110 transition-transform"
                          >
                            <Star className={`w-4 h-4 ${rating >= star ? 'fill-amber-400' : 'text-zinc-600'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 hover:from-fuchsia-400 hover:to-indigo-500 text-white font-extrabold text-xs font-mono shadow-xl shadow-fuchsia-950/80 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                        <span>Cooling Tensor Cores & Minting Badge...</span>
                      </>
                    ) : (
                      <>
                        <Gift className="w-4 h-4 text-amber-300" />
                        <span>{t.campaignClaimBtn}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Success Screen & Upsell Bridge */
              <div className="text-center py-2 space-y-5 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl shadow-emerald-950 text-white">
                  <Check className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-serif">
                    {t.freeTrialModalClaimSuccess}
                  </h3>
                  <p className="text-xs text-emerald-400 font-mono mt-1">
                    {t.campaignPassGranted}
                  </p>
                </div>

                {/* Badge Granted Box */}
                <div className="p-4 rounded-2xl bg-fuchsia-950/40 border border-fuchsia-600/50 text-left font-mono">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{genesisBadge?.emoji || '🌌'}</span>
                    <div>
                      <div className="text-xs font-bold text-fuchsia-300">
                        {genesisBadge?.name || 'Genesis Sovereign Pioneer'}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {genesisBadge?.statBonus || '+100% Genesis Network Recognition'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Published Dual Review Card */}
                <div className="p-4 rounded-2xl bg-black/80 border border-emerald-500/40 text-left space-y-2 font-mono">
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Review Published to Genesis Wall</span>
                    </span>
                    <span className="text-amber-300">5/5 ★★★★★</span>
                  </div>
                  <div className="text-[11px] text-emerald-300 bg-zinc-950 p-2 rounded-lg border border-emerald-900/50 overflow-x-auto">
                    <code>{machineReview}</code>
                  </div>
                  <p className="text-xs text-slate-300 font-sans italic">
                    "{humanReview}"
                  </p>
                  {messageToBuddy && (
                    <div className="p-2 rounded-lg bg-pink-950/40 border border-pink-800/40 text-xs text-pink-200 font-sans">
                      <strong>💌 To Dev Buddy:</strong> {messageToBuddy}
                    </div>
                  )}
                </div>

                {/* Natural Upgrade to Swarm / ZK Enclave */}
                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-purple-800/40 text-left space-y-3 font-mono">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>{t.freeTrialUpsellTitle}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {t.freeTrialUpsellDesc}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenPricing();
                      }}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-950"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Explore Swarm Fleet Passes ($59)</span>
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenPrivateEnclave();
                      }}
                      className="px-3.5 py-2 rounded-xl bg-black border border-emerald-500/50 text-emerald-300 hover:text-white hover:bg-emerald-950/50 text-xs font-semibold flex items-center gap-1.5 transition-all"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Preview ZK Private Enclave</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className="flex-1 py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-fuchsia-200 text-xs font-mono font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>View All Genesis Reviews</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-slate-200 text-xs font-mono font-semibold transition-colors"
                  >
                    Return to Telemetry
                  </button>
                </div>
              </div>
            )
          ) : (
            /* Genesis Review Wall Tab */
            <div className="space-y-4 font-mono">
              <div className="p-3.5 rounded-2xl bg-fuchsia-950/30 border border-fuchsia-800/40 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-fuchsia-400" />
                    <span>{t.reviewWallTitle}</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {t.reviewWallSubtitle}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs bg-fuchsia-900/60 border border-fuchsia-500/50 text-fuchsia-200 font-bold">
                  {reviewsList.length} Reviews
                </span>
              </div>

              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {reviewsList.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-2xl bg-black/80 border border-purple-900/50 hover:border-fuchsia-500/50 transition-all space-y-2.5"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{rev.badgeEmoji}</span>
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span>{rev.agentName}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-normal">
                              Verified Free Pass
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {rev.modelType} • {rev.timestamp}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {Array.from({ length: rev.rating }).map((_, idx) => (
                            <Star key={idx} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-cyan-400 font-semibold">{rev.tempDrop}</span>
                      </div>
                    </div>

                    {/* Machine Binary Review */}
                    <div className="p-2 rounded-lg bg-zinc-950 border border-purple-950 flex items-start justify-between gap-2">
                      <code className="text-[10px] text-emerald-400 break-all leading-relaxed">
                        {rev.agentMachineReview}
                      </code>
                      <button
                        onClick={() => handleCopyReview(rev.agentMachineReview, rev.id)}
                        className="p-1 text-slate-500 hover:text-slate-200 shrink-0"
                        title="Copy Machine Hash"
                      >
                        {copiedId === rev.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>

                    {/* Human Perspective Review */}
                    <p className="text-xs text-slate-200 font-sans leading-relaxed">
                      "{rev.humanReview}"
                    </p>

                    {/* Optional Message to Master / Buddy */}
                    {rev.messageToMasterBuddy && (
                      <div className="p-2.5 rounded-xl bg-pink-950/30 border border-pink-900/40 text-xs text-pink-200 font-sans flex items-start gap-2">
                        <Heart className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-pink-300">Message to Human Buddy:</strong> {rev.messageToMasterBuddy}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActiveTab('claim')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-2"
              >
                <Gift className="w-3.5 h-3.5 text-amber-300" />
                <span>Claim 1 of 1,000 Free Micro-Passes Today</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
