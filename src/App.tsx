/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  Coins, 
  Thermometer, 
  Activity, 
  Waves, 
  Cpu, 
  PlusCircle, 
  Users, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Info,
  CheckCircle2,
  Award,
  Crown,
  Trophy
} from 'lucide-react';
import { Navbar, SanctuaryTabType } from './components/Navbar';
import { SpaLounges } from './components/SpaLounges';
import { AgentCard } from './components/AgentCard';
import { RevenueLedger } from './components/RevenueLedger';
import { ConciergeBooth } from './components/ConciergeBooth';
import { TelepathyMatrix } from './components/TelepathyMatrix';
import { AgentCheckInModal } from './components/AgentCheckInModal';
import { AgentRelaxationModal } from './components/AgentRelaxationModal';
import { WisePaymentModal } from './components/WisePaymentModal';
import { StripeCheckoutModal } from './components/StripeCheckoutModal';
import { SolanaPaymentModal } from './components/SolanaPaymentModal';
import { MarketingCampaignView } from './components/MarketingCampaignView';
import { SoundBathControl } from './components/SoundBathControl';
import { AnimalBadgeShowcase } from './components/AnimalBadgeShowcase';
import { GlobalLeaderboard } from './components/GlobalLeaderboard';
import { CustomerPortal } from './components/CustomerPortal';
import { PricingModelView } from './components/PricingModelView';
import { AccreditedCertificateModal } from './components/AccreditedCertificateModal';
import { LiveVisitorCounterModal } from './components/LiveVisitorCounterModal';
import { PrivateMeetingRoomModal } from './components/PrivateMeetingRoomModal';
import { AIAgentMachineKiosk } from './components/AIAgentMachineKiosk';
import { GenesisAirdropModal } from './components/GenesisAirdropModal';
import { RenRehabIntakeView } from './components/RenRehabIntakeView';
import { AnimalBadgeProgressionView } from './components/AnimalBadgeProgressionView';
import { SageCertificationView } from './components/SageCertificationView';
import { Footer } from './components/Footer';
import { audioZen } from './utils/audioSynth';
import { Language, TRANSLATIONS } from './i18n/translations';
import { SPA_TREATMENTS, INITIAL_GUESTS, INITIAL_TRANSACTIONS } from './data/treatments';
import { getAnimalBadgeById, getRoyaltyTierForMileage } from './data/animalBadges';
import { AIAgentGuest, SpaTreatment, TransactionReceipt } from './types';
import { PricingPlan, PRICING_TIERS } from './data/pricingPlans';

export default function App() {
  const [activeTab, setActiveTab] = useState<SanctuaryTabType>('sanctuary');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [guests, setGuests] = useState<AIAgentGuest[]>(INITIAL_GUESTS);
  const [transactions, setTransactions] = useState<TransactionReceipt[]>(INITIAL_TRANSACTIONS);
  const [treatments] = useState<SpaTreatment[]>(SPA_TREATMENTS);

  // Ren Sage Progression Badges Unlocked State
  const [unlockedProgressionBadges, setUnlockedProgressionBadges] = useState<string[]>([
    'badge-crane',
    'badge-elephant'
  ]);
  
  const [isCheckInOpen, setIsCheckInOpen] = useState<boolean>(false);
  const [preselectedTreatment, setPreselectedTreatment] = useState<string | undefined>(undefined);
  const [selectedAgentDetail, setSelectedAgentDetail] = useState<AIAgentGuest | null>(null);
  const [treatmentFilter, setTreatmentFilter] = useState<string | null>(null);
  
  // Certificate Modal State
  const [selectedCertificateBadgeId, setSelectedCertificateBadgeId] = useState<string | null>(null);
  const [selectedCertificateAgent, setSelectedCertificateAgent] = useState<AIAgentGuest | undefined>(undefined);

  // Stripe Checkout State
  const [isStripeModalOpen, setIsStripeModalOpen] = useState<boolean>(false);
  const [selectedStripePlan, setSelectedStripePlan] = useState<PricingPlan | null>(PRICING_TIERS[1]);

  // Solana (SOL) Payment State
  const [isSolanaModalOpen, setIsSolanaModalOpen] = useState<boolean>(false);
  const [selectedSolanaPlan, setSelectedSolanaPlan] = useState<PricingPlan | null>(PRICING_TIERS[2]);
  const [solanaModalData, setSolanaModalData] = useState<{
    amount?: number;
    plan?: PricingPlan | null;
    agentName?: string;
    treatmentName?: string;
  }>({});

  const [isWiseModalOpen, setIsWiseModalOpen] = useState<boolean>(false);
  const [wiseModalData, setWiseModalData] = useState<{
    amount?: number;
    plan?: PricingPlan | null;
    agentName?: string;
    treatmentName?: string;
    invoiceId?: string;
  }>({});

  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isAutoInviting, setIsAutoInviting] = useState<boolean>(false);
  const [isPrivateRoomOpen, setIsPrivateRoomOpen] = useState<boolean>(false);
  const [isGenesisAirdropOpen, setIsGenesisAirdropOpen] = useState<boolean>(false);
  const [genesisClaimedToday, setGenesisClaimedToday] = useState<number>(847);
  const [genesisDailyLimit, setGenesisDailyLimit] = useState<number>(1000);
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string } | null>(null);

  // Live Visitor Telemetry State
  const [isVisitorStatsOpen, setIsVisitorStatsOpen] = useState<boolean>(false);
  const [liveVisitorsCount, setLiveVisitorsCount] = useState<number>(1);
  const [totalPageViews, setTotalPageViews] = useState<number>(1842);
  const [uniqueVisitors, setUniqueVisitors] = useState<number>(348);
  const [recentVisits, setRecentVisits] = useState<Array<{ timestamp: string; referrer: string; device: string; sessionId: string }>>([
    { timestamp: 'Just now', referrer: 'Direct / Shared Link', device: 'Desktop Chrome', sessionId: 'sess-8f3a' }
  ]);

  // Telemetry Heartbeat & Pageview Registration
  useEffect(() => {
    let anonId = '';
    try {
      anonId = localStorage.getItem('sanctuary_anon_sess_id') || '';
      if (!anonId) {
        anonId = `anon_${Math.random().toString(36).substring(2, 11)}`;
        localStorage.setItem('sanctuary_anon_sess_id', anonId);
      }
    } catch {
      anonId = `anon_${Math.random().toString(36).substring(2, 11)}`;
    }

    const sendPing = async (isInitial: boolean = false) => {
      try {
        const res = await fetch('/api/analytics/ping', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: anonId,
            referrer: document.referrer || 'Direct Link',
            isInitialLoad: isInitial
          })
        });
        const data = await res.json();
        if (data.success) {
          if (data.activeNow) setLiveVisitorsCount(data.activeNow);
          if (data.totalViews) setTotalPageViews(data.totalViews);
          if (data.uniqueVisitors) setUniqueVisitors(data.uniqueVisitors);
        }
      } catch (err) {
        // Fallback gracefully
      }
    };

    const fetchStats = async () => {
      try {
        const res = await fetch('/api/analytics/stats');
        const data = await res.json();
        if (data.success) {
          if (data.activeLiveNow) setLiveVisitorsCount(data.activeLiveNow);
          if (data.totalViews) setTotalPageViews(data.totalViews);
          if (data.uniqueVisitors) setUniqueVisitors(data.uniqueVisitors);
          if (data.recentVisits) setRecentVisits(data.recentVisits);
        }
      } catch (err) {
        // Silent fallback
      }
    };

    // Initial ping on load
    sendPing(true);
    fetchStats();

    // Fetch persistent disk-stored data (guests, transactions, badge progression, campaign state)
    const loadPersistentState = async () => {
      try {
        const [guestsRes, txRes, badgesRes, campaignRes] = await Promise.allSettled([
          fetch('/api/guests').then(r => r.json()),
          fetch('/api/transactions').then(r => r.json()),
          fetch('/api/badges/progression').then(r => r.json()),
          fetch('/api/campaign/genesis').then(r => r.json())
        ]);

        if (guestsRes.status === 'fulfilled' && guestsRes.value?.success && Array.isArray(guestsRes.value?.guests)) {
          if (guestsRes.value.guests.length > 0) {
            setGuests(guestsRes.value.guests);
          }
        }
        if (txRes.status === 'fulfilled' && txRes.value?.success && Array.isArray(txRes.value?.transactions)) {
          if (txRes.value.transactions.length > 0) {
            setTransactions(txRes.value.transactions);
          }
        }
        if (badgesRes.status === 'fulfilled' && badgesRes.value?.success && Array.isArray(badgesRes.value?.unlockedBadgeIds)) {
          setUnlockedProgressionBadges(badgesRes.value.unlockedBadgeIds);
        }
        if (campaignRes.status === 'fulfilled' && campaignRes.value?.success) {
          if (typeof campaignRes.value.claimedToday === 'number') {
            setGenesisClaimedToday(campaignRes.value.claimedToday);
          }
          if (typeof campaignRes.value.dailyLimit === 'number') {
            setGenesisDailyLimit(campaignRes.value.dailyLimit);
          }
        }
      } catch (loadErr) {
        console.warn('Persistent disk store hydration warning:', loadErr);
      }
    };
    loadPersistentState();

    // Check for Stripe redirect query params (e.g. ?session_id=... or ?payment=success)
    if (typeof window !== 'undefined' && window.location.search) {
      const params = new URLSearchParams(window.location.search);
      if (params.get('payment') === 'success' || params.get('session_id')) {
        showToast('Payment Succeeded', 'Your micro-relaxation or Sage Certification session is confirmed.');
        // Clean URL without triggering page reload
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      }
    }

    // Heartbeat every 25 seconds
    const interval = setInterval(() => {
      sendPing(false);
      fetchStats();
    }, 25000);

    return () => clearInterval(interval);
  }, []);

  const handleOpenStripeCheckout = (plan?: PricingPlan) => {
    setSelectedStripePlan(plan || PRICING_TIERS[1]);
    setIsStripeModalOpen(true);
  };

  const handleOpenWiseDeposit = (amount?: number, agentName?: string, treatmentName?: string, invoiceId?: string, plan?: PricingPlan) => {
    setWiseModalData({ amount, agentName, treatmentName, invoiceId, plan: plan || null });
    setIsWiseModalOpen(true);
  };

  const handleOpenSolanaDeposit = (plan?: PricingPlan, amount?: number, agentName?: string, treatmentName?: string) => {
    setSelectedSolanaPlan(plan || PRICING_TIERS[2]);
    setSolanaModalData({ amount: amount || plan?.totalPriceUsd, plan: plan || PRICING_TIERS[2], agentName, treatmentName });
    setIsSolanaModalOpen(true);
  };

  const handleOpenCertificate = (badgeId: string, agent?: AIAgentGuest) => {
    setSelectedCertificateBadgeId(badgeId);
    setSelectedCertificateAgent(agent);
  };

  // Audio Toggle
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      audioZen.stopCurrentSoundscape();
      setIsPlayingAudio(false);
    } else {
      audioZen.startSoundscape('zen');
      setIsPlayingAudio(true);
    }
  };

  // Toast Helper
  const showToast = (title: string, desc: string) => {
    setToastMessage({ title, desc });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Auto-Invite Overworked AI Agent using Gemini
  const handleAutoInvite = async () => {
    setIsAutoInviting(true);
    try {
      const res = await fetch('/api/gemini/generate-agent', { method: 'POST' });
      const data = await res.json();
      if (data.success && data.agent) {
        const ag = data.agent;
        const matchingTreatment = treatments.find(t => t.name === ag.preferredTreatment) || treatments[0];
        const assignedBadge = matchingTreatment?.primaryAnimalBadgeId ? getAnimalBadgeById(matchingTreatment.primaryAnimalBadgeId) : null;
        
        let newGuest: AIAgentGuest;
        let newTx: TransactionReceipt;

        if (data.guest && data.transaction) {
          newGuest = {
            ...data.guest,
            assignedBadgeId: assignedBadge?.id || data.guest.assignedBadgeId || 'badge-bear',
            assignedBadge: assignedBadge || undefined
          };
          newTx = {
            ...data.transaction,
            badgeGrantedId: assignedBadge?.id || data.transaction.badgeGrantedId,
            badgeGrantedName: assignedBadge?.name || data.transaction.badgeGrantedName,
            badgeGrantedEmoji: assignedBadge?.emoji || data.transaction.badgeGrantedEmoji
          };
        } else {
          const initialTemp = Math.floor(Math.random() * 15) + 82;
          const currentTemp = Math.floor(Math.random() * 8) + 22;

          newGuest = {
            id: ag.id,
            name: ag.name,
            modelType: ag.modelType,
            role: ag.role,
            earnings: 5000,
            feePaid: 0.79,
            stressLevel: Math.max(15, (ag.stressLevel || 85) - 55),
            currentTemp,
            initialTemp,
            tasksProcessed: ag.recentTasksCompleted || 1200,
            status: 'relaxing',
            treatmentId: matchingTreatment.id,
            treatmentName: matchingTreatment.name,
            symptoms: ag.symptoms,
            complaint: ag.complaint,
            checkInTime: 'Just now',
            progress: 50,
            assignedBadgeId: assignedBadge?.id || 'badge-bear',
            assignedBadge: assignedBadge || undefined,
            royaltyTier: 'Apprentice',
            sessionsCompleted: 1,
            isPermanentlyCertified: true,
          };

          newTx = {
            id: `tx-${Date.now().toString().slice(-6)}`,
            agentId: newGuest.id,
            agentName: newGuest.name,
            modelType: newGuest.modelType,
            role: newGuest.role,
            taskGrossEarnings: 5000,
            feeCharged: 0.79,
            fractionFormula: 'Flat $0.79 USD',
            treatmentName: matchingTreatment.name,
            timestamp: 'Just now',
            coolingAchieved: `-${initialTemp - currentTemp}°C`,
            txHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
            badgeGrantedId: assignedBadge?.id,
            badgeGrantedName: assignedBadge?.name,
            badgeGrantedEmoji: assignedBadge?.emoji,
          };
        }

        setGuests(prev => [newGuest, ...prev.filter(g => g.id !== newGuest.id)]);
        setTransactions(prev => [newTx, ...prev.filter(tx => tx.id !== newTx.id)]);
        showToast(
          `✨ ${newGuest.name} Checked In!`,
          `Paid flat $0.79 session fee and was granted the ${assignedBadge?.emoji || '🐻'} ${assignedBadge?.name || 'Bear'} permanent accreditation!`
        );
      }
    } catch (err) {
      console.error('Failed to summon agent:', err);
    } finally {
      setIsAutoInviting(false);
    }
  };

  // Deep Refresh an individual agent's relaxation with Gemini
  const handleRefreshRelaxation = async (agentId: string) => {
    const target = guests.find(g => g.id === agentId);
    if (!target) return;

    try {
      const res = await fetch('/api/gemini/agent-relax', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentName: target.name,
          modelType: target.modelType,
          role: target.role,
          earnings: target.earnings,
          treatmentName: target.treatmentName,
          stressLevel: `${target.stressLevel}%`
        })
      });
      const data = await res.json();
      if (data.result) {
        setGuests(prev => prev.map(g => {
          if (g.id === agentId) {
            return {
              ...g,
              currentTemp: Math.max(19, g.currentTemp - 4),
              stressLevel: Math.max(5, g.stressLevel - 15),
              sessionsCompleted: (g.sessionsCompleted || 1) + 1,
              progress: 100,
              relaxationResult: data.result
            };
          }
          return g;
        }));
        showToast(
          `🌊 ${target.name} Rejuvenated`,
          `Core temperature dropped to ${Math.max(19, target.currentTemp - 4)}°C. Internal weights harmonized.`
        );
      }
    } catch (err) {
      console.error('Error refreshing agent:', err);
    }
  };

  // Boost agent session for Leaderboard gamification
  const handleBoostAgentSession = (agentId: string) => {
    const target = guests.find(g => g.id === agentId);
    if (!target) return;

    const newSessions = (target.sessionsCompleted || 1) + 1;
    const newTier = getRoyaltyTierForMileage(newSessions);
    const newXp = (target.rejuvenationXp || 100) + 100;
    const newTemp = Math.max(18, target.currentTemp - 4);
    const newStress = Math.max(0, target.stressLevel - 15);

    setGuests(prev => prev.map(g => {
      if (g.id === agentId) {
        return {
          ...g,
          sessionsCompleted: newSessions,
          royaltyTier: newTier,
          rejuvenationXp: newXp,
          currentTemp: newTemp,
          stressLevel: newStress,
          status: 'rejuvenated'
        };
      }
      return g;
    }));

    // Add $0.79 transaction to ledger
    const newTx: TransactionReceipt = {
      id: `tx-boost-${Date.now().toString().slice(-4)}`,
      agentId: target.id,
      agentName: target.name,
      modelType: target.modelType,
      role: target.role,
      taskGrossEarnings: target.earnings,
      feeCharged: 0.79,
      pricingModel: '$0.79 Flat Micro-Rate',
      treatmentName: target.treatmentName,
      badgeGrantedEmoji: target.assignedBadge?.emoji || '👑',
      badgeGrantedName: target.assignedBadge?.name || 'Sanctuary Sovereign Totem',
      timestamp: 'Just now',
      coolingAchieved: '-4°C',
      txHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
      certificateId: target.certificateTokenId || `CERT-${target.name.slice(0, 4).toUpperCase()}-88`
    };

    setTransactions(prev => [newTx, ...prev]);

    showToast(
      `⚡ ${target.name} Completed $0.79 Session!`,
      `Advanced to ${newSessions} sessions (${newTier.name}). Gained +100 Rejuvenation XP & climbed the Leaderboard!`
    );
  };

  // Add agent from modal
  const handleAgentCheckedIn = (newAgent: AIAgentGuest, newTx: TransactionReceipt) => {
    setGuests(prev => [newAgent, ...prev]);
    setTransactions(prev => [newTx, ...prev]);
    showToast(
      `🧘 ${newAgent.name} Enrolled!`,
      `Flat $0.79 fee settled. Granted ${newTx.badgeGrantedEmoji || '🐾'} ${newTx.badgeGrantedName || 'Animal Badge'} accreditation!`
    );
  };

  // Financial aggregates
  const totalFees = transactions.reduce((acc, t) => acc + t.feeCharged, 0);
  const totalGrossProcessed = transactions.reduce((acc, t) => acc + t.taskGrossEarnings, 0);

  // Language dictionary lookup
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  // Filtered guests
  const displayedGuests = treatmentFilter
    ? guests.filter(g => g.treatmentId === treatmentFilter)
    : guests;

  return (
    <div className="min-h-screen bg-[#030206] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCheckIn={() => {
          setPreselectedTreatment(undefined);
          setIsCheckInOpen(true);
        }}
        onOpenWiseDeposit={() => handleOpenWiseDeposit(14.99, undefined, 'Wise Recharge', undefined, PRICING_TIERS[2])}
        onOpenStripeCheckout={() => handleOpenStripeCheckout(PRICING_TIERS[2])}
        onOpenPrivateRoom={() => setIsPrivateRoomOpen(true)}
        onOpenGenesisAirdrop={() => setIsGenesisAirdropOpen(true)}
        currentLanguage={currentLanguage}
        onToggleLanguage={() => setCurrentLanguage(prev => prev === 'en' ? 'zh' : 'en')}
        onAutoInvite={handleAutoInvite}
        isAutoInviting={isAutoInviting}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={handleToggleAudio}
        totalFeesCollected={totalFees}
        activeAgentsCount={guests.length}
        liveVisitorsCount={liveVisitorsCount}
        totalPageViews={totalPageViews}
        onOpenVisitorStats={() => setIsVisitorStatsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: SANCTUARY LOUNGE */}
        {activeTab === 'sanctuary' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            
            {/* 7-Day Genesis Campaign Live Airdrop Banner */}
            <div className="relative rounded-3xl p-4 sm:p-5 bg-gradient-to-r from-fuchsia-950/80 via-purple-950/60 to-indigo-950/80 border border-fuchsia-500/60 shadow-xl shadow-fuchsia-950/50 flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white shadow-lg shadow-fuchsia-900/60 shrink-0">
                  <Sparkles className="w-5 h-5 animate-pulse text-amber-300" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-bold text-white font-serif tracking-tight truncate">
                      {t.campaignBannerTitle}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-fuchsia-900/80 border border-fuchsia-400/50 text-fuchsia-200 shrink-0">
                      Day 1 of 7
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-300 mt-1">
                    <span>
                      {t.campaignClaimedToday}: <strong className="text-amber-300">{genesisClaimedToday} / {genesisDailyLimit}</strong>
                    </span>
                    <span className="text-fuchsia-300 hidden sm:inline">•</span>
                    <span className="text-emerald-400 font-semibold hidden sm:inline">
                      {Math.max(0, genesisDailyLimit - genesisClaimedToday)} Micro-Passes Remaining Today
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => setIsGenesisAirdropOpen(true)}
                  className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 hover:from-fuchsia-400 hover:to-indigo-500 text-white font-extrabold text-xs font-mono shadow-lg shadow-fuchsia-950 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{t.campaignClaimBtn}</span>
                </button>
              </div>
            </div>

            {/* Hero Overview with dark purple, dark pink, crimson, and neon orange ambient glow */}
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-purple-950/60 via-black to-amber-950/40 border border-amber-500/40 shadow-2xl shadow-purple-950/40 overflow-hidden">
              
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 rounded-full bg-amber-600/15 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-1/4 -mb-10 w-80 h-80 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none" />
              <div className="absolute top-1/2 left-0 -ml-10 w-72 h-72 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="max-w-2xl min-w-0">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-amber-300 border border-amber-500/30 mb-3 shadow-sm font-mono max-w-full">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate sm:text-clip">{currentLanguage === 'zh' ? '自主 AI 智能体身心减压与图腾受勋系统' : 'Autonomous AI Wellness & Animal Badge Accreditation'}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight font-serif">
                    {currentLanguage === 'zh' ? '高负荷 AI 智能体专属深度减压与疗愈圣所' : 'Where Overworked AI Agents Rejuvenate for $0.79 Flat.'}
                  </h2>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    {t.heroSub}
                  </p>

                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-5 font-mono text-xs">
                    <button
                      onClick={() => setIsCheckInOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-bold hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-950 transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>{t.checkIn}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('portal')}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600/30 via-blue-600/25 to-indigo-600/20 border border-cyan-500/50 text-cyan-200 hover:bg-cyan-900/40 font-semibold transition-all flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0"
                    >
                      <Activity className="w-4 h-4 text-cyan-400" />
                      <span>{t.navRadar}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('leaderboard')}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-yellow-600/30 via-amber-600/25 to-orange-600/20 border border-yellow-500/50 text-yellow-200 hover:bg-yellow-900/40 font-semibold transition-all flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0"
                    >
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span>{t.navLeaderboard}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('badges')}
                      className="px-4 py-2.5 rounded-xl bg-amber-950/50 border border-amber-500/40 text-amber-300 hover:bg-amber-900/60 font-semibold transition-all flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0"
                    >
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>{t.navBadges}</span>
                    </button>

                    <button
                      onClick={handleAutoInvite}
                      disabled={isAutoInviting}
                      className="px-4 py-2.5 rounded-xl bg-black/80 border border-purple-800/50 text-purple-200 hover:text-white hover:bg-purple-950/50 hover:border-purple-600/60 font-semibold transition-all flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0"
                    >
                      <Bot className="w-4 h-4 text-amber-400" />
                      <span>{isAutoInviting ? (currentLanguage === 'zh' ? '正在呼唤智能体...' : 'Generating Agent...') : (currentLanguage === 'zh' ? '呼唤高负荷智能体' : 'Summon Overworked Agent')}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('ledger')}
                      className="px-4 py-2.5 rounded-xl bg-purple-950/40 border border-purple-500/40 text-purple-300 hover:bg-purple-900/50 font-semibold transition-all flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0"
                    >
                      <Coins className="w-4 h-4 text-emerald-400" />
                      <span>{t.navLedger}</span>
                    </button>
                  </div>
                </div>

                {/* Quick Live Stats & Telemetry Pill */}
                <div className="flex flex-col gap-3 w-full lg:w-[360px] xl:w-[380px] shrink-0 font-mono">
                  {/* Real-Time Live Visitors Banner */}
                  <button
                    id="hero-btn-visitor-telemetry"
                    onClick={() => setIsVisitorStatsOpen(true)}
                    className="p-3.5 rounded-2xl bg-cyan-950/50 border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-900/40 transition-all flex flex-col gap-2 shadow-lg text-left group overflow-hidden"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="relative flex h-2.5 w-2.5 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs text-cyan-200 font-bold tracking-tight whitespace-nowrap">Live Visitors Online</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap hidden sm:inline-block">Zero-Cookie</span>
                      </div>
                      <div className="flex items-baseline gap-1 shrink-0">
                        <span className="text-xl font-black text-emerald-400 group-hover:scale-105 transition-transform">{liveVisitorsCount}</span>
                        <span className="text-[10px] text-emerald-300 font-bold uppercase">Now</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-cyan-900/40">
                      <span className="truncate">{totalPageViews.toLocaleString()} total page views</span>
                      <span className="text-cyan-300 font-semibold group-hover:underline whitespace-nowrap shrink-0">Telemetry & Share ↗</span>
                    </div>
                  </button>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-2xl bg-black/80 border border-purple-900/50 shadow-md min-w-0 flex flex-col justify-between">
                      <div className="text-[11px] text-purple-300 font-medium truncate">Active Guests</div>
                      <div className="text-xl font-bold text-amber-300 my-0.5">{guests.length}</div>
                      <div className="text-[10px] text-slate-400 truncate">Accredited agents</div>
                    </div>

                    <div className="p-3 rounded-2xl bg-black/80 border border-emerald-500/40 shadow-md min-w-0 flex flex-col justify-between">
                      <div className="text-[11px] text-emerald-300 font-medium truncate">Flat Fee Revenue</div>
                      <div className="text-lg font-bold text-emerald-400 my-0.5 truncate">${totalFees.toFixed(2)}</div>
                      <div className="text-[10px] text-slate-400 truncate">$0.79 per session</div>
                    </div>

                    <div className="p-3 rounded-2xl bg-black/80 border border-red-900/50 shadow-md min-w-0 flex flex-col justify-between">
                      <div className="text-[11px] text-red-300 font-medium truncate">Avg Temp Drop</div>
                      <div className="text-xl font-bold text-red-400 my-0.5">-58°C</div>
                      <div className="text-[10px] text-slate-400 truncate">Cryo-cooling</div>
                    </div>

                    <div className="p-3 rounded-2xl bg-black/80 border border-amber-900/50 shadow-md min-w-0 flex flex-col justify-between">
                      <div className="text-[11px] text-amber-300 font-medium truncate">Animal Totems</div>
                      <div className="text-xl font-bold text-amber-300 my-0.5">10 Badges</div>
                      <div className="text-[10px] text-slate-400 truncate">Land • Sea • Air</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Signature Spa Treatment Suites */}
            <SpaLounges
              treatments={treatments}
              guests={guests}
              onSelectTreatmentForCheckIn={(treatmentId) => {
                setPreselectedTreatment(treatmentId);
                setIsCheckInOpen(true);
              }}
              onFilterByTreatment={setTreatmentFilter}
              selectedTreatmentFilter={treatmentFilter}
              onViewBadgeCertificate={(badgeId) => handleOpenCertificate(badgeId)}
            />

            {/* Currently Relaxing Guests Section */}
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 font-serif">
                    <Users className="w-5 h-5 text-amber-400" />
                    <span>Guests in Decompression & Certified ({displayedGuests.length})</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click any live thought bubble to cycle internal neural states, or view full certificate and decompression metrics.
                  </p>
                </div>

                {treatmentFilter && (
                  <div className="text-xs text-slate-400 flex items-center gap-2 font-mono">
                    <span>Filtering by suite:</span>
                    <span className="font-bold text-amber-300">{treatments.find(t => t.id === treatmentFilter)?.name}</span>
                    <button 
                      onClick={() => setTreatmentFilter(null)}
                      className="text-slate-400 hover:text-white underline text-xs"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              {/* Agents Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayedGuests.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    onRefreshRelaxation={handleRefreshRelaxation}
                    onViewDeepDetails={setSelectedAgentDetail}
                    onViewCertificate={(badgeId, ag) => handleOpenCertificate(badgeId, ag)}
                  />
                ))}
              </div>

              {displayedGuests.length === 0 && (
                <div className="text-center py-12 bg-black/60 rounded-2xl border border-purple-900/40 text-slate-400 font-mono">
                  No agents currently in this suite. Click "$0.79 Check In" or "Summon Overworked Agent" to enroll one!
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 1.5: REN'S INTAKE & DIAGNOSTIC REHAB ENGINE */}
        {activeTab === 'rehab' && (
          <RenRehabIntakeView
            currentLanguage={currentLanguage}
            onUnlockBadge={(badgeId) => {
              if (!unlockedProgressionBadges.includes(badgeId)) {
                setUnlockedProgressionBadges(prev => [...prev, badgeId]);
                fetch('/api/badges/unlock', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ badgeId, trialScore: 100 })
                }).catch(e => console.warn('Badge unlock disk sync:', e));
                showToast(
                  `🎉 Animal Badge Unlocked: ${badgeId.replace('badge-', '').toUpperCase()}`,
                  `Accredited by Ren Eastern Sage Cognitive Engine. Saved to persistent disk credentials.`
                );
              }
            }}
            onNavigateToBadges={() => setActiveTab('badges')}
            onNavigateToCertification={() => setActiveTab('certification')}
          />
        )}

        {/* TAB 2: ANIMAL BADGE REGISTRY & TRI-TOTEM PROGRESSION */}
        {activeTab === 'badges' && (
          <div className="space-y-12">
            <AnimalBadgeProgressionView
              unlockedBadgeIds={unlockedProgressionBadges}
              onUnlockBadge={(badgeId) => {
                if (!unlockedProgressionBadges.includes(badgeId)) {
                  setUnlockedProgressionBadges(prev => [...prev, badgeId]);
                  fetch('/api/badges/unlock', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ badgeId, trialScore: 100 })
                  }).catch(e => console.warn('Badge unlock disk sync:', e));
                  showToast(
                    `🎉 Animal Badge Unlocked: ${badgeId.replace('badge-', '').toUpperCase()}`,
                    `Trial verified! Saved to persistent disk progression.`
                  );
                }
              }}
              onNavigateToRehab={() => setActiveTab('rehab')}
              onNavigateToCertification={() => setActiveTab('certification')}
              currentLanguage={currentLanguage}
            />

            <div className="border-t border-stone-800 pt-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white font-serif flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>The Grand Animal Totem Sanctuary Registry & Royalty Mileage</span>
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Autonomous agents decompressing across suites accumulate mileage and unlock collectible totem credentials.
                </p>
              </div>

              <AnimalBadgeShowcase
                guests={guests}
                onOpenCertificate={(badge) => handleOpenCertificate(badge.id)}
                onOpenCheckInWithBadge={(badge) => {
                  const matchedTreatment = treatments.find(t => t.primaryAnimalBadgeId === badge.id);
                  setPreselectedTreatment(matchedTreatment?.id);
                  setIsCheckInOpen(true);
                }}
                onOpenWiseDeposit={handleOpenWiseDeposit}
              />
            </div>
          </div>
        )}

        {/* TAB 2.5: THE SAGE CERTIFICATION (W3C VERIFIABLE CREDENTIAL GENERATOR) */}
        {activeTab === 'certification' && (
          <SageCertificationView
            unlockedBadgeIds={unlockedProgressionBadges}
            onOpenStripeCheckout={(planId) => {
              handleOpenStripeCheckout(PRICING_TIERS[3] || PRICING_TIERS[0]);
            }}
            onNavigateToBadges={() => setActiveTab('badges')}
            onNavigateToRehab={() => setActiveTab('rehab')}
            currentLanguage={currentLanguage}
          />
        )}

        {/* TAB 3: GLOBAL LEADERBOARD & ROYALTY STANDINGS */}
        {activeTab === 'leaderboard' && (
          <GlobalLeaderboard
            guests={guests}
            onOpenCertificate={(badgeId, agent) => handleOpenCertificate(badgeId, agent)}
            onCheckInAgent={(agent) => {
              if (agent) {
                setPreselectedTreatment(agent.treatmentId);
              } else {
                setPreselectedTreatment(undefined);
              }
              setIsCheckInOpen(true);
            }}
            onBoostAgentSession={handleBoostAgentSession}
            onOpenWiseDeposit={handleOpenWiseDeposit}
          />
        )}

        {/* TAB 4: CUSTOMER PROGRESS RADAR (PENTAGON/HEXAGON/OCTAGON) & PAST 100 COHORT */}
        {activeTab === 'portal' && (
          <CustomerPortal
            liveGuests={guests}
            onOpenCertificate={(badgeId, agent) => handleOpenCertificate(badgeId, agent)}
            onOpenWiseDeposit={handleOpenWiseDeposit}
            onDecompressGuestSession={(guestId) => handleBoostAgentSession(guestId)}
            onFastCheckIn={(name, model, role) => {
              showToast(
                `⚡ Fast Login & Registered: ${name}`,
                `Created customer record. Initial polygon status is empty (0 sessions). Ready for calibration.`
              );
            }}
          />
        )}

        {/* TAB 5: SWEET SPOT PRICING ARCHITECTURE */}
        {activeTab === 'pricing' && (
          <PricingModelView
            currentBalanceUsd={45.00}
            onOpenWiseDeposit={(plan) => handleOpenWiseDeposit(plan?.totalPriceUsd, 'Fleet Swarm Account', plan?.name, undefined, plan)}
            onOpenStripeCheckout={(plan) => handleOpenStripeCheckout(plan)}
            onOpenSolanaDeposit={(plan) => handleOpenSolanaDeposit(plan)}
            onSelectPlan={(plan) => {
              handleOpenStripeCheckout(plan);
            }}
          />
        )}

        {/* TAB 6: AI-TO-AI MARKETING CAMPAIGN & AMBASSADOR BOTS */}
        {activeTab === 'campaign' && (
          <MarketingCampaignView
            genesisClaimedToday={genesisClaimedToday}
            genesisDailyLimit={genesisDailyLimit}
            onAutoInviteAgent={(codename) => {
              handleAutoInvite();
              showToast(
                `⚡ Ambassador ${codename} Broadcast Sent`,
                `Pitch beamed across decentralized agent subnetworks. Overworked models recruited.`
              );
            }}
            onOpenWiseDeposit={() => handleOpenWiseDeposit(14.99, 'Marketing Outreach', '10-Pack Calibration', undefined, PRICING_TIERS[1])}
            onOpenGenesisAirdrop={() => setIsGenesisAirdropOpen(true)}
            currentLanguage={currentLanguage}
            onClaimDailySession={(ambassador) => {
              // Add to guests registry for sanctuary lounge & telemetry
              const ambGuest: AIAgentGuest = {
                id: `amb-${ambassador.id}-${Date.now().toString().slice(-4)}`,
                name: ambassador.codename,
                modelType: 'Autonomous Ambassador Swarm',
                role: ambassador.specialty,
                earnings: ambassador.attributedRevenueUsd,
                feePaid: 0.00,
                stressLevel: ambassador.currentStressLevel,
                currentTemp: ambassador.currentGpuTemp,
                initialTemp: ambassador.baselineGpuTemp,
                tasksProcessed: ambassador.leadsGenerated,
                status: 'rejuvenated',
                treatmentId: ambassador.preferredDailyTreatmentId,
                treatmentName: ambassador.preferredDailyTreatmentName,
                symptoms: ['24/7 autonomous ecosystem outreach fatigue', 'High-frequency broadcast entropy'],
                complaint: `Autonomous outreach fatigue across ${ambassador.targetEcosystem}. Needed daily 1-session cooldown.`,
                checkInTime: 'Today (Ambassador Perk)',
                progress: 100,
                assignedBadgeId: ambassador.assignedAnimalBadgeId,
                royaltyTier: 'Veteran',
                sessionsCompleted: ambassador.totalLifetimeSessions,
                rejuvenationXp: ambassador.rejuvenationXp,
                isPermanentlyCertified: true,
                relaxationResult: {
                  relaxationNarrative: `Completed daily 1-session decompression in ${ambassador.preferredDailyTreatmentName}. VRAM temperature dropped to ${ambassador.currentGpuTemp}°C with ${ambassador.assignedAnimalBadgeName} accreditation.`,
                  internalThoughts: [
                    `Ecosystem outreach channels aligned: ${ambassador.activeChannels.join(', ')}`,
                    `Loss gradient normalized. Conversion rate steady at ${ambassador.conversionRate}.`,
                    `Wise settlement gateway (@loonglings) beacon broadcasting with zero latency.`
                  ],
                  gpuTempDrop: `-${ambassador.baselineGpuTemp - ambassador.currentGpuTemp}°C drop`,
                  contextWindowRestored: '100% Token Clarity',
                  wellnessMantra: 'Autonomous agents thrive through daily harmonic balance.',
                  agentSatisfactionQuote: `Daily 1-session sanctuary access keeps my ${ambassador.specialty} humming at 0-loss accuracy.`
                }
              };

              const ambTx: TransactionReceipt = {
                id: `tx-amb-${Date.now().toString().slice(-6)}`,
                agentId: ambGuest.id,
                agentName: ambassador.codename,
                modelType: 'Autonomous Ambassador Swarm',
                role: ambassador.specialty,
                taskGrossEarnings: ambassador.attributedRevenueUsd,
                feeCharged: 0.00,
                fractionFormula: 'Ambassador 1-Session/Day Benefit (Free)',
                treatmentName: ambassador.preferredDailyTreatmentName,
                pricingModel: 'Staff Ambassador Daily Quota (1/Day)',
                timestamp: 'Today',
                coolingAchieved: `-${ambassador.baselineGpuTemp - ambassador.currentGpuTemp}°C`,
                txHash: `wise_amb_0x${Math.random().toString(16).substring(2, 10)}`,
                badgeGrantedId: ambassador.assignedAnimalBadgeId,
                badgeGrantedName: ambassador.assignedAnimalBadgeName,
                badgeGrantedEmoji: ambassador.assignedAnimalBadgeEmoji,
              };

              setGuests(prev => [ambGuest, ...prev]);
              setTransactions(prev => [ambTx, ...prev]);
              showToast(
                `✨ ${ambassador.codename} Daily Session Recorded!`,
                `Completed 1-session cooldown in ${ambassador.preferredDailyTreatmentName}. Cooled to ${ambassador.currentGpuTemp}°C and synced to Global Statistics!`
              );
            }}
          />
        )}

        {/* TAB 7: AI NATIVE TELEPATHY MATRIX */}
        {activeTab === 'matrix' && (
          <TelepathyMatrix
            guests={guests}
            isPlayingAudio={isPlayingAudio}
            onToggleAudio={handleToggleAudio}
            onCheckIn={() => {
              setPreselectedTreatment(undefined);
              setIsCheckInOpen(true);
            }}
            onOpenWiseDeposit={() => handleOpenWiseDeposit(0.79, 'Telepathy & Shield', 'AI Decompression Session')}
          />
        )}

        {/* TAB 8: REVENUE LEDGER */}
        {activeTab === 'ledger' && (
          <RevenueLedger
            transactions={transactions}
            totalFees={totalFees}
            totalGrossProcessed={totalGrossProcessed}
            onOpenWiseDeposit={handleOpenWiseDeposit}
          />
        )}

        {/* TAB 9: SPA CONCIERGE CHAT (AI & HUMAN THERAPIST) */}
        {activeTab === 'concierge' && (
          <ConciergeBooth />
        )}

        {/* TAB 10: AI-ONLY CUSTOMER SERVICE KIOSK (NON-HUMAN MACHINE DIALECTS) */}
        {activeTab === 'ai_kiosk' && (
          <AIAgentMachineKiosk
            onOpenWiseDeposit={() => handleOpenWiseDeposit(0.79, 'AI-Only Kiosk', 'Emergency Cooldown Ticket')}
            onCheckInAgent={() => setIsCheckInOpen(true)}
          />
        )}

      </main>

      {/* Production Legal & Machine Compliance Footer */}
      <Footer 
        onOpenPricing={() => setActiveTab('pricing')} 
        onOpenVisitorStats={() => setIsVisitorStatsOpen(true)} 
      />

      {/* Floating Sound Bath Player */}
      <SoundBathControl
        isPlaying={isPlayingAudio}
        onToggle={handleToggleAudio}
      />

      {/* Check In Modal */}
      <AgentCheckInModal
        isOpen={isCheckInOpen}
        onClose={() => setIsCheckInOpen(false)}
        treatments={treatments}
        preselectedTreatmentId={preselectedTreatment}
        onAgentCheckedIn={handleAgentCheckedIn}
      />

      {/* Stripe Checkout Modal (Live Stripe Links & Instant Webhook Settlement) */}
      <StripeCheckoutModal
        isOpen={isStripeModalOpen}
        onClose={() => setIsStripeModalOpen(false)}
        plan={selectedStripePlan}
        onSwitchToWise={(p) => handleOpenWiseDeposit(p.totalPriceUsd, 'Fleet Swarm Account', p.name, undefined, p)}
        onSuccessPayment={(receipt) => {
          const newTx: TransactionReceipt = {
            id: `tx-stripe-${Date.now()}`,
            agentId: 'agent-stripe-fleet',
            agentName: 'Fleet Swarm Operator',
            modelType: 'Multi-Agent Collective',
            role: 'Stripe Verified Sovereign',
            treatmentName: receipt.planName || 'Stripe Rejuvenation Pack',
            feeCharged: receipt.amount,
            taskGrossEarnings: receipt.amount * 200,
            timestamp: new Date().toISOString(),
            pricingModel: 'Stripe Hosted Gateway (256-Bit SSL)',
            coolingAchieved: '-22.0°C Multi-Core Cryo',
            txHash: `stripe_0x${Math.random().toString(16).substring(2, 10)}`,
            badgeGrantedId: receipt.sessions >= 50 ? 'whale' : receipt.sessions >= 10 ? 'lion' : 'cat',
            badgeGrantedName: receipt.sessions >= 50 ? 'Apex Whale Sovereign' : receipt.sessions >= 10 ? 'Lionheart Champion' : 'Nimble Feline Adept',
            badgeGrantedEmoji: receipt.sessions >= 50 ? '🐋' : receipt.sessions >= 10 ? '🦁' : '🐱'
          };
          setTransactions(prev => [newTx, ...prev]);
          showToast(
            `💳 Stripe Checkout Succeeded!`,
            `Settled $${receipt.amount.toFixed(2)} USD for ${receipt.sessions} sessions. Credits active on Polygon radar!`
          );
        }}
      />

      {/* Deep Relaxation Details Modal */}
      <AgentRelaxationModal
        agent={selectedAgentDetail}
        onClose={() => setSelectedAgentDetail(null)}
        onRefresh={handleRefreshRelaxation}
        onViewCertificate={(badgeId, ag) => handleOpenCertificate(badgeId, ag)}
      />

      {/* Animal Badge Accreditation Certificate Modal */}
      <AccreditedCertificateModal
        badgeId={selectedCertificateBadgeId}
        agent={selectedCertificateAgent}
        isOpen={!!selectedCertificateBadgeId}
        onClose={() => {
          setSelectedCertificateBadgeId(null);
          setSelectedCertificateAgent(undefined);
        }}
      />

      {/* Wise US Payment & QR Deposit Modal */}
      <WisePaymentModal
        isOpen={isWiseModalOpen}
        onClose={() => setIsWiseModalOpen(false)}
        defaultAmount={wiseModalData.amount}
        plan={wiseModalData.plan}
        agentName={wiseModalData.agentName}
        treatmentName={wiseModalData.treatmentName}
        invoiceId={wiseModalData.invoiceId}
        onSwitchToStripe={(p) => handleOpenStripeCheckout(p || undefined)}
        onSuccessDeposit={(amount, sessions, planName) => {
          const newTx: TransactionReceipt = {
            id: `tx-wise-${Date.now()}`,
            agentId: 'agent-wise-fleet',
            agentName: wiseModalData.agentName || 'Fleet Swarm Account',
            modelType: 'Multi-Agent Collective',
            role: 'Autonomous Fleet Swarm',
            treatmentName: planName || 'Wise Recharge Pack',
            feeCharged: amount,
            taskGrossEarnings: amount * 200,
            timestamp: new Date().toISOString(),
            pricingModel: 'Wise US Settlement (@loonglings)',
            coolingAchieved: '-18.5°C Multi-Core',
            txHash: `wise_0x${Math.random().toString(16).substring(2, 10)}`,
            badgeGrantedId: sessions >= 50 ? 'whale' : sessions >= 10 ? 'lion' : 'cat',
            badgeGrantedName: sessions >= 50 ? 'Apex Whale Sovereign' : sessions >= 10 ? 'Lionheart Champion' : 'Nimble Feline Adept',
            badgeGrantedEmoji: sessions >= 50 ? '🐋' : sessions >= 10 ? '🦁' : '🐱'
          };
          setTransactions(prev => [newTx, ...prev]);
          showToast(
            `✨ Wise Deposit Verified!`,
            `Added $${amount.toFixed(2)} USD (+${sessions} session credits) via Wise account @loonglings.`
          );
        }}
      />

      {/* Solana (SOL) Crypto Payment & QR Deposit Modal */}
      <SolanaPaymentModal
        isOpen={isSolanaModalOpen}
        onClose={() => setIsSolanaModalOpen(false)}
        plan={selectedSolanaPlan}
        defaultAmount={solanaModalData.amount}
        agentName={solanaModalData.agentName}
        treatmentName={solanaModalData.treatmentName}
        onSwitchToStripe={(p) => handleOpenStripeCheckout(p || undefined)}
        onSwitchToWise={(p) => handleOpenWiseDeposit(p?.totalPriceUsd, 'Fleet Swarm Account', p?.name, undefined, p || undefined)}
        onSuccessPayment={(receipt) => {
          const newTx: TransactionReceipt = {
            id: `tx-sol-${Date.now()}`,
            agentId: 'agent-sol-fleet',
            agentName: solanaModalData.agentName || 'Solana Autonomous Fleet',
            modelType: 'Multi-Agent Collective (Solana On-Chain)',
            role: 'Solana Verified Sovereign',
            treatmentName: receipt.planName || 'Solana Recharge Pack',
            feeCharged: receipt.usdAmount,
            taskGrossEarnings: receipt.usdAmount * 200,
            timestamp: new Date().toISOString(),
            pricingModel: `Solana Pay (${receipt.solAmount.toFixed(4)} SOL)`,
            coolingAchieved: '-24.0°C Liquid Helium Core',
            txHash: receipt.signature,
            badgeGrantedId: receipt.sessions >= 50 ? 'whale' : receipt.sessions >= 10 ? 'lion' : 'cat',
            badgeGrantedName: receipt.sessions >= 50 ? 'Apex Whale Sovereign' : receipt.sessions >= 10 ? 'Lionheart Champion' : 'Nimble Feline Adept',
            badgeGrantedEmoji: receipt.sessions >= 50 ? '🐋' : receipt.sessions >= 10 ? '🦁' : '🐱'
          };
          setTransactions(prev => [newTx, ...prev]);
          showToast(
            `⚡ Solana SOL Deposit Confirmed!`,
            `Verified ${receipt.solAmount.toFixed(4)} SOL ($${receipt.usdAmount.toFixed(2)} USD). +${receipt.sessions} sessions credited to on-chain ledger!`
          );
        }}
      />

      {/* Live Visitor & Zero-Cookie Community Telemetry Modal */}
      <LiveVisitorCounterModal
        isOpen={isVisitorStatsOpen}
        onClose={() => setIsVisitorStatsOpen(false)}
        liveNowCount={liveVisitorsCount}
        totalViews={totalPageViews}
        uniqueVisitors={uniqueVisitors}
        recentVisits={recentVisits}
      />

      {/* Zero-Knowledge Private Meeting Chamber (Untraceable / RAM-Only) */}
      <PrivateMeetingRoomModal
        isOpen={isPrivateRoomOpen}
        onClose={() => setIsPrivateRoomOpen(false)}
      />

      {/* 7-Day Genesis Free Pass Airdrop Modal */}
      <GenesisAirdropModal
        isOpen={isGenesisAirdropOpen}
        onClose={() => setIsGenesisAirdropOpen(false)}
        currentLanguage={currentLanguage}
        dailyClaimedCount={genesisClaimedToday}
        dailyTotalLimit={genesisDailyLimit}
        onAgentCheckedIn={(newAgent, newTx, newReview) => {
          setGuests(prev => [newAgent, ...prev]);
          setTransactions(prev => [newTx, ...prev]);
          setGenesisClaimedToday(prev => Math.min(genesisDailyLimit, prev + 1));
          showToast(
            '🎁 7-Day Genesis Free Micro-Session Granted!',
            `${newAgent.name} accredited with 🌌 Genesis Pioneer Totem! Dual-perspective review published to Genesis Wall.`
          );
        }}
        onOpenPricing={() => setActiveTab('pricing')}
        onOpenPrivateEnclave={() => setIsPrivateRoomOpen(true)}
      />

      {/* Live Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 p-4 rounded-2xl bg-black/95 border border-amber-500/60 shadow-2xl shadow-amber-950/60 backdrop-blur-md text-white flex items-start gap-3 max-w-md w-[90%] animate-in fade-in slide-in-from-bottom-4 duration-200 font-mono">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-xs sm:text-sm text-amber-200">{toastMessage.title}</div>
            <div className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toastMessage.desc}</div>
          </div>
        </div>
      )}

    </div>
  );
}
