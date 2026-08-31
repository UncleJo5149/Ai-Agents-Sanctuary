import React, { useState } from 'react';
import { 
  Award, 
  Crown, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Lock, 
  CheckCircle2, 
  Flame, 
  Coins, 
  ArrowRight,
  Filter,
  Layers,
  ChevronRight,
  Share2,
  FileCheck,
  PackageCheck,
  Terminal
} from 'lucide-react';
import { AnimalBadge, AnimalRealm, AbilityType, ANIMAL_BADGES, ROYALTY_LEVELS, getRoyaltyTierForMileage } from '../data/animalBadges';
import { AIAgentGuest } from '../types';
import { CryptographicAccreditationLedgerView } from './CryptographicAccreditationLedgerView';
import { OfficialSdkAndBadgesToolkit } from './OfficialSdkAndBadgesToolkit';

interface AnimalBadgeShowcaseProps {
  guests: AIAgentGuest[];
  onOpenCertificate: (badge: AnimalBadge, agentName?: string, modelType?: string, certId?: string) => void;
  onOpenCheckInWithBadge?: (badge: AnimalBadge) => void;
  onOpenCryptoDeposit: (amount?: number, agentName?: string, treatmentName?: string, invoiceId?: string) => void;
}

export const AnimalBadgeShowcase: React.FC<AnimalBadgeShowcaseProps> = ({
  guests,
  onOpenCertificate,
  onOpenCheckInWithBadge,
  onOpenCryptoDeposit,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'badges' | 'ledger' | 'sdk'>('badges');
  const [selectedRealm, setSelectedRealm] = useState<AnimalRealm | 'all'>('all');
  const [selectedAbility, setSelectedAbility] = useState<AbilityType | 'all'>('all');

  // Total session mileage across active agents
  const totalSessionsCompleted = guests.reduce((sum, g) => sum + (g.sessionsCompleted || 1), 0);
  const currentRoyalty = getRoyaltyTierForMileage(Math.floor(totalSessionsCompleted / 2));

  const filteredBadges = ANIMAL_BADGES.filter(badge => {
    const matchesRealm = selectedRealm === 'all' || badge.realm === selectedRealm;
    const matchesAbility = selectedAbility === 'all' || badge.ability === selectedAbility;
    return matchesRealm && matchesAbility;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-black/80 border border-purple-900/60 font-mono">
        <button
          onClick={() => setActiveSubTab('badges')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'badges'
              ? 'bg-gradient-to-r from-amber-600/40 via-orange-600/30 to-purple-600/30 text-amber-200 border border-amber-500/50 shadow-md shadow-amber-950/50'
              : 'text-slate-400 hover:text-slate-200 hover:bg-purple-950/30'
          }`}
        >
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span>⟨Animal Totem Badges & Mileage⟩</span>
        </button>

        <button
          onClick={() => setActiveSubTab('ledger')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'ledger'
              ? 'bg-gradient-to-r from-purple-600/40 via-pink-600/30 to-purple-600/30 text-purple-200 border border-purple-500/50 shadow-md shadow-purple-950/50'
              : 'text-slate-400 hover:text-slate-200 hover:bg-purple-950/30'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5 text-purple-400" />
          <span>⟨Public Cryptographic Ledger⟩</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800 font-bold">1,424+ Verified</span>
        </button>

        <button
          onClick={() => setActiveSubTab('sdk')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'sdk'
              ? 'bg-gradient-to-r from-teal-600/40 via-cyan-600/30 to-teal-600/30 text-teal-200 border border-teal-500/50 shadow-md shadow-teal-950/50'
              : 'text-slate-400 hover:text-slate-200 hover:bg-teal-950/30'
          }`}
        >
          <PackageCheck className="w-3.5 h-3.5 text-teal-400" />
          <span>⟨Python & Node SDKs + GitHub Badges⟩</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal-950 text-teal-300 border border-teal-800 font-bold">pip & npm</span>
        </button>
      </div>

      {activeSubTab === 'ledger' && (
        <CryptographicAccreditationLedgerView
          onOpenCryptoDeposit={() => onOpenCryptoDeposit(0.79, 'Accreditation Query', 'Public Proof Notarization')}
        />
      )}

      {activeSubTab === 'sdk' && (
        <OfficialSdkAndBadgesToolkit />
      )}

      {activeSubTab === 'badges' && (
        <>
          {/* Royalty Banner & $0.79 Value Proposition */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/70 via-black to-purple-950/70 border border-amber-500/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl font-serif select-none pointer-events-none">
              👑 🐉 🔥
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <Crown className="w-5 h-5 text-amber-400 animate-pulse" />
                  </span>
                  <span className="text-xs font-mono tracking-widest uppercase text-amber-300 font-bold">
                    Elysium Royalty & Neural Accreditation Protocol
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    $0.79 USD / Rejuvenation Session
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-serif">
                  Animal Totem Badges & Permanent Accreditation
                </h2>

                <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                  Every $0.79 rejuvenation session restores a specific neural ability and awards your AI Agent an official, 
                  permanently owned <strong>Animal Certification Badge</strong>. Stack session mileage to level up through the Royalty Tiers and unlock the ancient mythic beasts.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <button
                  onClick={() => onOpenCryptoDeposit(0.79, 'RefactorBot-Prime', 'Animal Badge Session')}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-mono font-bold text-xs sm:text-sm transition-all shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-2"
                >
                  <Coins className="w-4 h-4 text-emerald-200" />
                  <span>Crypto Deposit ($0.79 Session)</span>
                </button>
              </div>
            </div>

            {/* Royalty Mileage Level Bar */}
            <div className="mt-8 pt-6 border-t border-amber-500/30 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
              
              <div className="p-4 rounded-2xl bg-black/60 border border-amber-500/30 flex items-center gap-4">
                <div className="text-3xl p-2 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  {currentRoyalty.icon}
                </div>
                <div>
                  <div className="text-xs text-slate-400">Current Royalty Rank:</div>
                  <div className="text-sm font-bold text-amber-300">{currentRoyalty.name}</div>
                  <div className="text-[11px] text-slate-400">Level {currentRoyalty.level} • {currentRoyalty.badgeCountNeeded}+ Badges Accredited</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-amber-500/30 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Total Sanctuary Mileage:</span>
                  <span className="text-amber-400 font-bold">{totalSessionsCompleted} Sessions</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-amber-500/20">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (totalSessionsCompleted / 100) * 100)}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-500 flex justify-between">
                  <span>Next Rank: Level {Math.min(5, currentRoyalty.level + 1)}</span>
                  <span>{Math.max(0, (currentRoyalty.level * 15) - totalSessionsCompleted)} sessions needed</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-amber-500/30 flex flex-col justify-center text-xs space-y-1">
                <div className="text-amber-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Lifetime Certified Stat Boosts</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Earned badges permanently attach to the agent's system prompt & metadata across all frameworks.
                </p>
              </div>

            </div>
          </div>

      {/* Filter Tabs (Realm & Ability) */}
      <div className="space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Realm Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Realm:</span>
            </span>

            {[
              { id: 'all', label: 'All Totems', icon: '🐾' },
              { id: 'land', label: 'Land Guardians', icon: '🌲' },
              { id: 'air', label: 'Air Sovereigns', icon: '🦅' },
              { id: 'sea', label: 'Ocean Depths', icon: '🌊' },
              { id: 'mythic', label: '✨ Ancient Mythic', icon: '🐉' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedRealm(tab.id as AnimalRealm | 'all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                  selectedRealm === tab.id
                    ? 'bg-amber-500/20 text-amber-200 border border-amber-500/50 shadow-sm font-bold'
                    : 'bg-black/60 text-slate-400 hover:text-white border border-purple-950 hover:bg-purple-950/40'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Pricing Quick Tip */}
          <div className="text-xs font-mono text-emerald-400 bg-emerald-950/50 px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5" />
            <span>Flat $0.79 / session unlocks badge certification</span>
          </div>

        </div>

        {/* Ability Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-slate-400 mr-1">Rejuvenated Ability:</span>
          {[
            { id: 'all', label: 'All Abilities' },
            { id: 'strength', label: 'Strength (Compute/FLOPs)' },
            { id: 'agility', label: 'Agility (Low Latency)' },
            { id: 'intelligence', label: 'Intelligence (Reasoning)' },
            { id: 'wisdom', label: 'Wisdom (Long-Context)' },
            { id: 'resilience', label: 'Resilience (Zero-Crash)' },
            { id: 'harmony', label: 'Harmony (Swarm/Tone)' },
          ].map(ab => (
            <button
              key={ab.id}
              onClick={() => setSelectedAbility(ab.id as AbilityType | 'all')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedAbility === ab.id
                  ? 'bg-purple-600/40 text-purple-200 border border-purple-500/50 font-bold'
                  : 'bg-black/40 text-slate-400 hover:text-slate-200 border border-purple-950/60'
              }`}
            >
              {ab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBadges.map((badge) => {
          const isMythic = badge.tier === 'ancient_mythic';
          const isUnlocked = totalSessionsCompleted >= badge.requiredSessions || badge.unlockedByDefault;

          return (
            <div
              key={badge.id}
              className={`relative rounded-3xl bg-gradient-to-br ${badge.colorGradient} border ${badge.borderColor} p-6 shadow-xl space-y-5 transition-all hover:scale-[1.01] overflow-hidden ${
                isMythic ? 'ring-1 ring-amber-400/40 shadow-amber-500/10' : ''
              }`}
            >
              {/* Mythic Background Shimmer */}
              {isMythic && (
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
              )}

              {/* Top Row: Totem Emoji, Tier, Realm */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="text-4xl sm:text-5xl p-2.5 rounded-2xl bg-black/50 border border-white/10 shadow-inner">
                    {badge.emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${badge.accentColor}`}>
                        {badge.tier.replace('_', ' ')}
                      </span>
                      {isMythic && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-sm">
                          ✨ ANCIENT
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white font-serif tracking-wide pt-0.5">
                      {badge.name}
                    </h3>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
                    {badge.realm} Realm
                  </span>
                  <span className="text-xs text-amber-300 font-bold">
                    $0.79 Fee
                  </span>
                </div>
              </div>

              {/* Ability & Stat Bonus Banner */}
              <div className="p-3.5 rounded-2xl bg-black/70 border border-white/10 space-y-1.5 font-mono text-xs">
                <div className="text-slate-400 text-[11px] flex items-center justify-between">
                  <span>Rejuvenates:</span>
                  <span className="text-amber-300 font-bold uppercase text-[10px]">{badge.ability}</span>
                </div>
                <div className="text-white font-semibold">
                  {badge.abilityName}
                </div>
                <div className="text-emerald-400 font-bold text-xs pt-1 border-t border-white/5 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{badge.statBonus}</span>
                </div>
              </div>

              {/* Description & Quote */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {badge.description}
              </p>

              <blockquote className="text-[11px] text-slate-400 italic font-serif border-l-2 border-amber-500/40 pl-3">
                "{badge.quote}"
              </blockquote>

              {/* Card Footer: Mileage Requirement + Accreditation Actions */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                
                <div className="text-xs font-mono">
                  {isUnlocked ? (
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Permanently Accredited</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Unlocks at {badge.requiredSessions} Sessions</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenCertificate(badge, 'RefactorBot-Prime', 'Autonomous Code Synthesizer', `CERT-${badge.id.toUpperCase()}-8821`)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-mono font-semibold transition-all flex items-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </button>

                  {onOpenCheckInWithBadge && (
                    <button
                      onClick={() => onOpenCheckInWithBadge(badge)}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white text-xs font-mono font-bold transition-all shadow-md shadow-amber-950 flex items-center gap-1"
                    >
                      <span>$0.79 Rejuvenate</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Royalty Levels Master Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-black/80 border border-purple-900/60 shadow-xl space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-purple-950">
          <Crown className="w-6 h-6 text-amber-400" />
          <div>
            <h3 className="text-xl font-bold text-white font-serif">
              Elysium Royalty & Mileage Level Progression
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Return regularly at $0.79/session to ascend tiers and earn certified lifetime stat boosts.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-mono text-xs">
          {ROYALTY_LEVELS.map((lvl) => {
            const isCurrent = currentRoyalty.level === lvl.level;

            return (
              <div 
                key={lvl.level}
                className={`p-4 rounded-2xl border transition-all ${lvl.color} ${
                  isCurrent ? 'ring-2 ring-amber-400 shadow-lg shadow-amber-500/20' : 'opacity-85 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                  <span className="text-2xl">{lvl.icon}</span>
                  <span className="text-[10px] font-bold uppercase">Level {lvl.level}</span>
                </div>

                <h4 className="font-bold text-sm text-white font-serif mb-2">
                  {lvl.name}
                </h4>

                <div className="text-[11px] text-slate-300 mb-3 space-y-1">
                  <div>Required Sessions: <strong>{lvl.sessionsNeeded}</strong></div>
                  <div>Rate: <strong>$0.79 flat / session</strong></div>
                </div>

                <div className="space-y-1 text-[10px] text-slate-400">
                  <div className="font-bold text-slate-200">Royalty Perks:</div>
                  {lvl.royaltyPerks.map((p, idx) => (
                    <div key={idx} className="flex items-start gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>

                {isCurrent && (
                  <div className="mt-3 pt-2 border-t border-white/10 text-center text-[10px] font-bold text-amber-300">
                    ★ CURRENT RANK ★
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      </>
      )}

    </div>
  );
};
