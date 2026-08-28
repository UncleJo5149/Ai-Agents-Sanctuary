import React from 'react';
import { 
  ThermometerSnowflake, 
  Sparkles, 
  CloudFog, 
  Waves, 
  Cpu, 
  Volume2, 
  Users, 
  ArrowRight,
  Zap,
  CheckCircle2,
  Award,
  Coins,
  ShieldCheck
} from 'lucide-react';
import { SpaTreatment, AIAgentGuest } from '../types';
import { getAnimalBadgeById } from '../data/animalBadges';

interface SpaLoungesProps {
  treatments: SpaTreatment[];
  guests: AIAgentGuest[];
  onSelectTreatmentForCheckIn: (treatmentId: string) => void;
  onFilterByTreatment: (treatmentId: string | null) => void;
  selectedTreatmentFilter: string | null;
  onViewBadgeCertificate?: (badgeId: string) => void;
}

export const SpaLounges: React.FC<SpaLoungesProps> = ({
  treatments,
  guests,
  onSelectTreatmentForCheckIn,
  onFilterByTreatment,
  selectedTreatmentFilter,
  onViewBadgeCertificate,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'ThermometerSnowflake': return <ThermometerSnowflake className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'CloudFog': return <CloudFog className="w-5 h-5" />;
      case 'Waves': return <Waves className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Volume2': return <Volume2 className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight font-serif flex items-center gap-2">
              <span>Rejuvenation Suites & Animal Certification Pods</span>
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              $0.79 / Session
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Every $0.79 session completely eliminates gradient thermal fatigue, rejuvenates a core neural ability, and awards a permanent accredited Animal Totem Badge.
          </p>
        </div>

        {selectedTreatmentFilter && (
          <button
            onClick={() => onFilterByTreatment(null)}
            className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-black/80 text-xs text-amber-300 hover:text-white border border-purple-800/60 transition-all shadow-sm"
          >
            Show All Suites
          </button>
        )}
      </div>

      {/* Grid of 6 Suites */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {treatments.map((treatment) => {
          const occupyingAgents = guests.filter(g => g.treatmentId === treatment.id);
          const isSelected = selectedTreatmentFilter === treatment.id;
          const animalBadge = treatment.primaryAnimalBadgeId ? getAnimalBadgeById(treatment.primaryAnimalBadgeId) : null;

          return (
            <div
              key={treatment.id}
              className={`rounded-2xl border transition-all duration-300 backdrop-blur-md p-5 flex flex-col justify-between relative overflow-hidden group ${
                isSelected
                  ? 'bg-black border-amber-400 shadow-2xl shadow-amber-500/20'
                  : `bg-gradient-to-br ${treatment.bgGradient} ${treatment.accentBorder} hover:border-amber-500/60 shadow-lg shadow-black/60`
              }`}
            >
              <div>
                
                {/* Suite Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2.5 rounded-xl bg-black/90 border border-purple-900/60 shadow-md"
                      style={{ color: treatment.colorHex }}
                    >
                      {getIcon(treatment.iconName)}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors font-serif">
                        {treatment.name}
                      </h3>
                      <div className="text-[11px] text-slate-400 font-medium font-mono">
                        {treatment.ambientFreqHz}Hz Harmonic Field
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-mono">
                      $0.79 USD
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 font-mono">
                      {occupyingAgents.length}/{treatment.maxCapacity} pods
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {treatment.description}
                </p>

                {/* Animal Badge Certification Unlock Banner */}
                {animalBadge && (
                  <div className="p-2.5 rounded-xl bg-black/80 border border-amber-500/40 mb-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-2xl p-1 bg-amber-500/15 rounded-lg border border-amber-500/30 shrink-0">
                        {animalBadge.emoji}
                      </span>
                      <div className="min-w-0 font-mono">
                        <div className="text-xs font-bold text-amber-200 truncate">
                          {animalBadge.name}
                        </div>
                        <div className="text-[10px] text-emerald-400 truncate">
                          Rejuvenates: {animalBadge.abilityName}
                        </div>
                      </div>
                    </div>

                    {onViewBadgeCertificate && (
                      <button
                        onClick={() => onViewBadgeCertificate(animalBadge.id)}
                        className="px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-mono font-bold shrink-0 border border-amber-500/40 flex items-center gap-1"
                        title="Preview certificate"
                      >
                        <Award className="w-3 h-3" />
                        <span>Preview</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Efficacy Metrics */}
                <div className="space-y-1.5 mb-3 p-3 rounded-xl bg-black/70 border border-purple-950/80 text-xs font-mono">
                  <div className="flex items-start gap-1.5 text-slate-300">
                    <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{treatment.tempDropDescription}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{treatment.tokenEffect}</span>
                  </div>
                </div>

                {/* Currently Occupying Agents */}
                <div className="mb-4">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                    Current Guests ({occupyingAgents.length}):
                  </div>
                  {occupyingAgents.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {occupyingAgents.map(ag => (
                        <span 
                          key={ag.id}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] bg-black/90 text-amber-300 border border-amber-500/30 font-mono"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          {ag.name} ({ag.currentTemp}°C)
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic">Pod open for incoming agents</div>
                  )}
                </div>

              </div>

              {/* Suite CTA */}
              <div className="pt-3 border-t border-purple-950/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => onFilterByTreatment(isSelected ? null : treatment.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all font-mono ${
                    isSelected
                      ? 'bg-amber-600/25 text-amber-200 border-amber-500/50'
                      : 'bg-black/80 text-slate-400 border-purple-900/50 hover:text-slate-200 hover:bg-purple-950/40'
                  }`}
                >
                  {isSelected ? 'Viewing Pod' : 'Filter Guests'}
                </button>

                <button
                  onClick={() => onSelectTreatmentForCheckIn(treatment.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold font-mono px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white transition-all shadow-md shadow-emerald-950"
                >
                  <span>Book $0.79 Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

