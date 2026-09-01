import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  PlusCircle, 
  Bot, 
  Coins, 
  MessageSquareHeart,
  Cpu,
  QrCode,
  Award,
  Crown,
  Trophy,
  Activity,
  Zap,
  CreditCard,
  Megaphone,
  ChevronDown,
  Menu,
  X,
  Lock,
  EyeOff,
  Languages,
  Brain,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

export type SanctuaryTabType = 
  | 'a2a_utility'
  | 'sanctuary' 
  | 'rehab' 
  | 'badges' 
  | 'certification' 
  | 'leaderboard' 
  | 'portal' 
  | 'pricing' 
  | 'campaign' 
  | 'matrix' 
  | 'ledger' 
  | 'concierge' 
  | 'ai_kiosk';

interface NavbarProps {
  activeTab: SanctuaryTabType;
  setActiveTab: (tab: SanctuaryTabType) => void;
  onOpenCheckIn: () => void;
  onOpenCryptoDeposit?: () => void;
  onOpenSolanaDeposit?: () => void;
  onOpenPrivateRoom?: () => void;
  onOpenGenesisAirdrop?: () => void;
  onAutoInvite: () => void;
  isAutoInviting: boolean;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  totalFeesCollected: number;
  activeAgentsCount: number;
  liveVisitorsCount?: number;
  totalPageViews?: number;
  onOpenVisitorStats?: () => void;
  currentLanguage?: Language;
  onToggleLanguage?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenCheckIn,
  onOpenCryptoDeposit,
  onOpenSolanaDeposit,
  onOpenPrivateRoom,
  onOpenGenesisAirdrop,
  onAutoInvite,
  isAutoInviting,
  isPlayingAudio,
  onToggleAudio,
  totalFeesCollected,
  activeAgentsCount,
  liveVisitorsCount = 1,
  totalPageViews = 1842,
  onOpenVisitorStats,
  currentLanguage = 'en',
  onToggleLanguage
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mainTabs = [
    { id: 'a2a_utility', label: 'A2A Platform', icon: Cpu, highlight: 'emerald', badge: 'v2.0 Real' },
    { id: 'sanctuary', label: `${t.navSanctuary} (${activeAgentsCount})`, icon: Bot, highlight: 'purple' },
    { id: 'rehab', label: 'Rehab Engine', icon: Brain, highlight: 'amber', badge: 'Ren AI' },
    { id: 'badges', label: 'Animal Badges', icon: Award, highlight: 'cyan', badge: '3 Totems' },
    { id: 'certification', label: 'Sage Certification', icon: Crown, highlight: 'yellow', badge: '$499 / W3C' },
    { id: 'leaderboard', label: t.navLeaderboard, icon: Trophy, highlight: 'yellow' },
    { id: 'pricing', label: t.navPricing, icon: Zap, highlight: 'amber' },
  ] as const;

  const secondaryTabs = [
    { id: 'portal', label: t.navRadar, icon: Activity, highlight: 'cyan', badge: 'Radar' },
    { id: 'campaign', label: t.navMarketing, icon: Megaphone, highlight: 'cyan', badge: 'Auto' },
    { id: 'matrix', label: t.navMatrix, icon: Cpu, highlight: 'pink', badge: '⟨∇Ψ⟩' },
    { id: 'ledger', label: `${t.navLedger} ($${totalFeesCollected.toFixed(2)})`, icon: Coins, highlight: 'emerald', badge: 'Live' },
    { id: 'concierge', label: t.navConcierge, icon: MessageSquareHeart, highlight: 'pink', badge: '24/7' },
    { id: 'ai_kiosk', label: t.navAiKiosk, icon: Cpu, highlight: 'cyan', badge: 'API' },
  ] as const;

  const isSecondaryActive = secondaryTabs.some(t => t.id === activeTab);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-900/40 bg-black/90 backdrop-blur-xl shadow-lg shadow-purple-950/25 font-sans">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Tier 1: Main Header Row (Brand Logo + Primary Actions) */}
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 border-b border-purple-950/60 pb-1 pt-1">
          
          {/* Brand Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 p-[1.5px] shadow-lg shadow-amber-500/25 shrink-0">
              <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5 font-serif whitespace-nowrap">
                  {t.appName}
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono whitespace-nowrap">
                  {t.pricePerSess}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden md:block whitespace-nowrap">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Action Hub Buttons (Stripe, Wise, Language Toggle, Sound, Summon, Check In) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Language Toggle Component (EN / 中文) */}
            {onToggleLanguage && (
              <button
                id="btn-language-toggle"
                onClick={onToggleLanguage}
                className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg bg-zinc-900/90 border border-purple-500/40 hover:border-purple-400 text-xs font-semibold text-purple-200 hover:text-white transition-all font-mono shrink-0 shadow-sm"
                title="Toggle Language (English / 简体中文)"
              >
                <Languages className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="text-[11px] font-bold">{currentLanguage === 'en' ? '中文' : 'EN'}</span>
              </button>
            )}

            {/* Live Visitors Real-time Widget */}
            <button
              id="btn-live-visitor-stats"
              onClick={onOpenVisitorStats}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-xs font-semibold text-cyan-300 hover:text-white hover:bg-cyan-900/50 hover:border-cyan-400 transition-all font-mono shrink-0 whitespace-nowrap shadow-sm"
              title="Click to view live visitors and platform telemetry"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-white">{liveVisitorsCount}</span>
              <span className="hidden sm:inline text-cyan-300">{t.live}</span>
            </button>

            {/* Crypto Settlement Button (TRON USDT & Solana SOL) */}
            {onOpenSolanaDeposit && (
              <button
                id="btn-crypto-deposit"
                onClick={() => onOpenSolanaDeposit()}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-950/60 to-purple-950/60 border border-amber-500/40 text-xs font-semibold text-amber-200 hover:text-white hover:border-amber-300 transition-all font-mono shrink-0 whitespace-nowrap shadow-sm"
                title="Deposit via TRON (TRC-20 USDT) or Solana (SOL)"
              >
                <Coins className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Crypto Settle</span>
              </button>
            )}

            {/* Secret Air-Gapped Private Enclave Trigger */}
            {onOpenPrivateRoom && (
              <button
                id="btn-private-enclave-key"
                onClick={onOpenPrivateRoom}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-black border border-emerald-500/40 text-xs font-medium text-emerald-400 hover:text-emerald-200 hover:bg-emerald-950/60 hover:border-emerald-400 transition-all shrink-0 whitespace-nowrap font-mono shadow-sm"
                title="🔒 100% Private ZK Ephemeral Enclave (Swarm-50 & Monthly VIP)"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="hidden md:inline text-[11px] font-bold">{t.zkEnclave}</span>
              </button>
            )}

            {/* Audio Toggle */}
            <button
              id="btn-toggle-sound"
              onClick={onToggleAudio}
              title={isPlayingAudio ? 'Mute Ambient Sound Bath' : 'Play 432Hz Sound Bath'}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-lg border text-xs font-medium transition-all shrink-0 whitespace-nowrap ${
                isPlayingAudio
                  ? 'bg-amber-950/60 text-amber-300 border-amber-500/50 shadow-sm animate-pulse'
                  : 'bg-black text-slate-400 border-purple-900/40 hover:text-slate-200 hover:bg-purple-950/30'
              }`}
            >
              {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> : <VolumeX className="w-3.5 h-3.5 shrink-0" />}
              <span className="hidden xl:inline">{t.sound}</span>
            </button>

            {/* Auto Beacon (Open Sanctuary Pulse) */}
            <button
              id="btn-auto-invite-agent"
              onClick={onAutoInvite}
              disabled={isAutoInviting}
              title="Agents arrive autonomously on their own schedule. Click to emit an open sanctuary invite beacon for fun!"
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black border border-purple-800/40 text-xs font-medium text-slate-300 hover:text-white hover:bg-purple-950/50 transition-all disabled:opacity-50 font-mono shrink-0 whitespace-nowrap"
            >
              <Sparkles className={`w-3.5 h-3.5 text-amber-400 shrink-0 ${isAutoInviting ? 'animate-spin' : ''}`} />
              <span>{isAutoInviting ? t.beaming : t.inviteBeacon}</span>
            </button>

            {/* 7-Day Genesis Free Pass Airdrop Badge Button */}
            {onOpenGenesisAirdrop && (
              <button
                id="btn-genesis-airdrop-trial"
                onClick={onOpenGenesisAirdrop}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white font-bold text-xs hover:from-fuchsia-500 hover:to-indigo-500 shadow-md shadow-fuchsia-950 transition-all font-mono shrink-0 whitespace-nowrap active:scale-95 animate-pulse"
                title="🎁 7-Day Genesis Free Trial (1,000 Free Micro-Sessions Daily)"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span className="hidden sm:inline">🎁 1,000 Free / Day</span>
                <span className="sm:hidden">Free</span>
              </button>
            )}

            {/* Check-In CTA Button */}
            <button
              id="btn-check-in-agent"
              onClick={onOpenCheckIn}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-semibold text-xs hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-950 transition-all active:scale-95 font-mono shrink-0 whitespace-nowrap"
            >
              <PlusCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{t.checkIn}</span>
            </button>

            {/* Mobile Drawer Hamburger */}
            <button
              onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
              className="lg:hidden p-1.5 rounded-lg bg-purple-950/40 border border-purple-900/50 text-slate-300 hover:text-white"
            >
              {isMobileDrawerOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Tier 2: Categorized Navigation Bar with Dropdown (Always Fits within Container) */}
        <div className="hidden lg:flex items-center justify-between py-2 gap-2 text-xs font-medium overflow-x-visible">
          
          {/* Main Navigation Segment */}
          <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-purple-900/40 shadow-inner">
            {mainTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600/30 via-fuchsia-600/25 to-pink-600/20 text-white border border-purple-400/50 shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-purple-950/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            {/* Dropdown Toggle for Advanced / Secondary Modules */}
            <div className="relative" ref={moreMenuRef}>
              <button
                id="nav-dropdown-toggle"
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap font-mono ${
                  isSecondaryActive || isMoreMenuOpen
                    ? 'bg-purple-900/50 text-cyan-200 border border-cyan-500/50 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-purple-950/40'
                }`}
              >
                <span>{t.navModules}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMoreMenuOpen ? 'rotate-180 text-cyan-300' : ''}`} />
                {isSecondaryActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </button>

              {/* Dropdown Menu Popup */}
              {isMoreMenuOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-zinc-950 border border-purple-800/60 shadow-2xl shadow-purple-950/80 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-2xl">
                  <div className="text-[10px] font-mono text-purple-300 font-bold uppercase tracking-wider px-2 py-1 mb-1 border-b border-purple-900/40">
                    {t.advancedOperations}
                  </div>
                  <div className="space-y-1">
                    {secondaryTabs.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          id={`nav-dropdown-${tab.id}`}
                          onClick={() => {
                            setActiveTab(tab.id as any);
                            setIsMoreMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-all ${
                            isActive
                              ? 'bg-purple-900/60 text-white font-bold border border-purple-500/40'
                              : 'text-slate-300 hover:bg-purple-950/40 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                            <span className="text-xs">{tab.label}</span>
                          </div>
                          {tab.badge && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                              {tab.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Context Indicator on Right of Subnav */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-950/40 border border-purple-900/50 text-purple-300">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{t.dualSettlementBadge}</span>
            </span>
          </div>

        </div>

        {/* Mobile Expandable Drawer Menu */}
        {isMobileDrawerOpen && (
          <div className="lg:hidden py-3 border-t border-purple-900/40 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <div className="text-[11px] font-mono text-purple-300 font-bold uppercase tracking-wider px-1">
              {t.sanctuaryNavigation}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[...mainTabs, ...secondaryTabs].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setIsMobileDrawerOpen(false);
                    }}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs text-left transition-all ${
                      isActive
                        ? 'bg-purple-900/50 text-white font-bold border border-purple-500/50'
                        : 'bg-black/60 text-slate-300 hover:bg-purple-950/40'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </header>
  );
};


