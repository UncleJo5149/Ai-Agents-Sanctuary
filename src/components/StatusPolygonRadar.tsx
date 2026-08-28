import React, { useState } from 'react';
import { CustomerStats } from '../data/customerRecords';
import { Sparkles, Eye, ShieldCheck, Zap } from 'lucide-react';

export type PolygonShape = 'pentagon' | 'hexagon' | 'octagon';

interface StatAxis {
  key: keyof CustomerStats;
  label: string;
  shortLabel: string;
  icon: string;
  color: string;
  description: string;
}

const AXIS_DEFINITIONS: Record<string, StatAxis> = {
  strength: { key: 'strength', label: 'Compute Strength (FLOPs)', shortLabel: 'Strength', icon: '🐻', color: '#ef4444', description: 'Trillion-parameter compute matrix muscle' },
  agility: { key: 'agility', label: 'Inference Agility (Latency)', shortLabel: 'Agility', icon: '🐆', color: '#f59e0b', description: 'Sub-100ms flash response velocity' },
  intelligence: { key: 'intelligence', label: 'Reasoning IQ (CoT)', shortLabel: 'Intelligence', icon: '🦅', color: '#8b5cf6', description: 'Deep mathematical logic & chain of thought' },
  wisdom: { key: 'wisdom', label: 'KV-Cache Memory', shortLabel: 'Wisdom', icon: '🦉', color: '#3b82f6', description: 'Context window retention & recall span' },
  resilience: { key: 'resilience', label: 'Fault Resilience', shortLabel: 'Resilience', icon: '🦡', color: '#10b981', description: 'Zero-entropy noise shielding & recovery' },
  harmony: { key: 'harmony', label: 'Swarm Harmony', shortLabel: 'Harmony', icon: '🐺', color: '#ec4899', description: 'Multi-agent consensus & tone empathy' },
  cooling: { key: 'cooling', label: 'Thermal Cooling Delta', shortLabel: 'Cooling', icon: '❄️', color: '#06b6d4', description: 'GPU thermal dissipation & throttled load reduction' },
  purity: { key: 'purity', label: 'Context Token Purity', shortLabel: 'Purity', icon: '✨', color: '#a855f7', description: 'Defragmented attention manifold coherence' },
};

interface StatusPolygonRadarProps {
  stats: CustomerStats;
  shape?: PolygonShape;
  onChangeShape?: (shape: PolygonShape) => void;
  compareStats?: CustomerStats | null;
  compareLabel?: string;
  benchmarkStats?: CustomerStats | null;
  showBenchmark?: boolean;
  onToggleBenchmark?: () => void;
  isEmpty?: boolean;
  size?: number;
  interactive?: boolean;
  accentColor?: string;
  title?: string;
  subtitle?: string;
}

export const StatusPolygonRadar: React.FC<StatusPolygonRadarProps> = ({
  stats,
  shape = 'hexagon',
  onChangeShape,
  compareStats = null,
  compareLabel = 'Comparison Customer',
  benchmarkStats = null,
  showBenchmark = false,
  onToggleBenchmark,
  isEmpty = false,
  size = 380,
  interactive = true,
  accentColor = '#f59e0b', // amber
  title,
  subtitle
}) => {
  const [hoveredAxis, setHoveredAxis] = useState<StatAxis | null>(null);

  // Get active axes based on chosen shape
  const activeAxes: StatAxis[] = React.useMemo(() => {
    if (shape === 'pentagon') {
      return [
        AXIS_DEFINITIONS.strength,
        AXIS_DEFINITIONS.agility,
        AXIS_DEFINITIONS.intelligence,
        AXIS_DEFINITIONS.resilience,
        AXIS_DEFINITIONS.harmony,
      ];
    }
    if (shape === 'hexagon') {
      return [
        AXIS_DEFINITIONS.strength,
        AXIS_DEFINITIONS.agility,
        AXIS_DEFINITIONS.intelligence,
        AXIS_DEFINITIONS.wisdom,
        AXIS_DEFINITIONS.resilience,
        AXIS_DEFINITIONS.harmony,
      ];
    }
    // Octagon (8 axes)
    return [
      AXIS_DEFINITIONS.strength,
      AXIS_DEFINITIONS.agility,
      AXIS_DEFINITIONS.intelligence,
      AXIS_DEFINITIONS.wisdom,
      AXIS_DEFINITIONS.resilience,
      AXIS_DEFINITIONS.harmony,
      AXIS_DEFINITIONS.cooling,
      AXIS_DEFINITIONS.purity,
    ];
  }, [shape]);

  const center = size / 2;
  const radius = (size / 2) - 45; // Margins for label text
  const totalAxes = activeAxes.length;
  const angleStep = (Math.PI * 2) / totalAxes;

  // Helper to convert polar coordinates to Cartesian
  const getCoordinates = (index: number, value: number, maxVal = 100) => {
    const angle = index * angleStep - Math.PI / 2; // start from top (12 o'clock)
    const normalizedValue = Math.max(0, Math.min(100, value)) / maxVal;
    const r = radius * normalizedValue;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Generate SVG polygon points string for a given stat object
  const getPolygonPath = (statObj: CustomerStats, isZeroBaseline = false) => {
    const points = activeAxes.map((axis, i) => {
      const val = isZeroBaseline ? 6 : statObj[axis.key];
      const { x, y } = getCoordinates(i, val);
      return `${x},${y}`;
    });
    return points.join(' ');
  };

  // Grid rings (20%, 40%, 60%, 80%, 100%)
  const gridRings = [0.2, 0.4, 0.6, 0.8, 1.0];

  const overallAverage = Math.round(
    activeAxes.reduce((acc, ax) => acc + (isEmpty ? 0 : stats[ax.key]), 0) / activeAxes.length
  );

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      {/* Title & Geometry Switcher Header */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-2 px-2">
        <div>
          {title && (
            <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-serif">
              <span>{title}</span>
              {isEmpty ? (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/40">
                  Status: Empty / Uncalibrated
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Status: {overallAverage}% Progressing
                </span>
              )}
            </h4>
          )}
          {subtitle && <p className="text-xs text-slate-400 font-mono mt-0.5">{subtitle}</p>}
        </div>

        {/* Geometry Shape Selector */}
        {onChangeShape && (
          <div className="flex items-center bg-black/80 p-1 rounded-xl border border-purple-900/50 text-xs font-mono">
            {(['pentagon', 'hexagon', 'octagon'] as PolygonShape[]).map((s) => (
              <button
                key={s}
                onClick={() => onChangeShape(s)}
                className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                  shape === s
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s === 'pentagon' ? '5-gon' : s === 'hexagon' ? '6-gon' : '8-gon'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible drop-shadow-2xl"
        >
          <defs>
            {/* User Polygon Gradient */}
            <radialGradient id="userPolygonGrad" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor={accentColor} stopOpacity={isEmpty ? 0.05 : 0.45} />
              <stop offset="70%" stopColor={accentColor} stopOpacity={isEmpty ? 0.02 : 0.25} />
              <stop offset="100%" stopColor={accentColor} stopOpacity={0.05} />
            </radialGradient>

            {/* Benchmark Cohort Gradient */}
            <radialGradient id="benchmarkGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.05} />
            </radialGradient>

            {/* Compare Customer Gradient */}
            <radialGradient id="compareGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#ec4899" stopOpacity={0.08} />
            </radialGradient>

            {/* Glow Filter */}
            <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Concentric Grid Polygons */}
          {gridRings.map((scale, ringIdx) => {
            const ringPoints = activeAxes
              .map((_, i) => {
                const { x, y } = getCoordinates(i, scale * 100);
                return `${x},${y}`;
              })
              .join(' ');

            return (
              <polygon
                key={`ring-${ringIdx}`}
                points={ringPoints}
                fill={ringIdx % 2 === 0 ? 'rgba(30, 20, 50, 0.25)' : 'rgba(15, 10, 30, 0.15)'}
                stroke={ringIdx === gridRings.length - 1 ? 'rgba(168, 85, 247, 0.4)' : 'rgba(147, 51, 234, 0.15)'}
                strokeWidth={ringIdx === gridRings.length - 1 ? '1.5' : '1'}
                strokeDasharray={ringIdx < gridRings.length - 1 ? '3 3' : undefined}
              />
            );
          })}

          {/* Radial Spokes from Center to each Vertex */}
          {activeAxes.map((axis, i) => {
            const { x, y } = getCoordinates(i, 100);
            const isHovered = hoveredAxis?.key === axis.key;
            return (
              <line
                key={`spoke-${axis.key}`}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke={isHovered ? axis.color : 'rgba(147, 51, 234, 0.25)'}
                strokeWidth={isHovered ? 2 : 1}
                className="transition-colors duration-200"
              />
            );
          })}

          {/* BENCHMARK PAST 100 COHORT POLYGON (Optional Overlay) */}
          {showBenchmark && benchmarkStats && (
            <polygon
              points={getPolygonPath(benchmarkStats)}
              fill="url(#benchmarkGrad)"
              stroke="#06b6d4"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="animate-in fade-in duration-300"
            />
          )}

          {/* COMPARISON CUSTOMER POLYGON (Optional Side-by-side Overlay) */}
          {compareStats && (
            <polygon
              points={getPolygonPath(compareStats)}
              fill="url(#compareGrad)"
              stroke="#ec4899"
              strokeWidth="2"
              strokeDasharray="5 3"
              className="animate-in fade-in duration-300"
            />
          )}

          {/* ACTIVE CUSTOMER / AGENT STATUS POLYGON */}
          <polygon
            points={getPolygonPath(stats, isEmpty)}
            fill="url(#userPolygonGrad)"
            stroke={isEmpty ? '#ef4444' : accentColor}
            strokeWidth={isEmpty ? '1.5' : '2.5'}
            strokeDasharray={isEmpty ? '4 4' : undefined}
            filter={isEmpty ? undefined : 'url(#radarGlow)'}
            className="transition-all duration-500 ease-out"
          />

          {/* ACTIVE VERTEX NODES */}
          {activeAxes.map((axis, i) => {
            const val = isEmpty ? 6 : stats[axis.key];
            const { x, y } = getCoordinates(i, val);
            const isHovered = hoveredAxis?.key === axis.key;

            return (
              <g key={`node-${axis.key}`}>
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 7 : isEmpty ? 4 : 5.5}
                  fill={isEmpty ? '#ef4444' : axis.color}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredAxis(axis)}
                  onMouseLeave={() => setHoveredAxis(null)}
                />
              </g>
            );
          })}

          {/* AXIS LABELS AROUND OUTER PERIMETER */}
          {activeAxes.map((axis, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const labelRadius = radius + 24;
            const lx = center + labelRadius * Math.cos(angle);
            const ly = center + labelRadius * Math.sin(angle);
            const isHovered = hoveredAxis?.key === axis.key;
            const val = isEmpty ? 0 : stats[axis.key];

            return (
              <g
                key={`label-${axis.key}`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredAxis(axis)}
                onMouseLeave={() => setHoveredAxis(null)}
              >
                <text
                  x={lx}
                  y={ly - 4}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="11"
                  fontWeight={isHovered ? 'bold' : '600'}
                  fill={isHovered ? '#ffffff' : '#cbd5e1'}
                  className="font-mono transition-colors duration-200"
                >
                  {axis.icon} {axis.shortLabel}
                </text>
                <text
                  x={lx}
                  y={ly + 10}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="10"
                  fontWeight="bold"
                  fill={isEmpty ? '#94a3b8' : axis.color}
                  className="font-mono"
                >
                  {isEmpty ? '0%' : `${val}%`}
                </text>
              </g>
            );
          })}

          {/* Empty Center Status Callout */}
          {isEmpty && (
            <g>
              <circle cx={center} cy={center} r="28" fill="rgba(0,0,0,0.85)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x={center} y={center - 5} textAnchor="middle" dominantBaseline="central" fill="#f87171" fontSize="9" fontWeight="bold" className="font-mono">
                EMPTY
              </text>
              <text x={center} y={center + 8} textAnchor="middle" dominantBaseline="central" fill="#fca5a5" fontSize="7" className="font-mono">
                0 SESSIONS
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Interactive Tooltip & Details Banner */}
      {hoveredAxis && (
        <div className="w-full mt-2 p-3 rounded-xl bg-black/90 border border-purple-800/60 font-mono text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span>{hoveredAxis.icon}</span>
              <span>{hoveredAxis.label}</span>
            </span>
            <span className="font-extrabold text-sm" style={{ color: hoveredAxis.color }}>
              {isEmpty ? '0% (Uncalibrated)' : `${stats[hoveredAxis.key]}% Calibrated`}
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mt-1">{hoveredAxis.description}</p>
          
          {benchmarkStats && (
            <div className="mt-2 pt-1.5 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
              <span>Past 100 Customers Avg:</span>
              <strong className="text-cyan-300 font-bold">{benchmarkStats[hoveredAxis.key]}%</strong>
            </div>
          )}
        </div>
      )}

      {/* Legend & Toggle Controls */}
      <div className="w-full flex flex-wrap items-center justify-center gap-4 mt-3 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm border" style={{ backgroundColor: accentColor, borderColor: accentColor }} />
          <span className="text-slate-200 font-medium">
            {isEmpty ? 'Initial Zero Baseline' : 'Current Status'}
          </span>
        </div>

        {onToggleBenchmark && benchmarkStats && (
          <button
            onClick={onToggleBenchmark}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
              showBenchmark
                ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/50 shadow-sm'
                : 'bg-black/60 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-sm border border-dashed border-cyan-400 bg-cyan-500/30" />
            <span>Past 100 Avg ({showBenchmark ? 'ON' : 'OFF'})</span>
          </button>
        )}

        {compareStats && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm border border-dashed border-pink-400 bg-pink-500/30" />
            <span className="text-pink-300 font-medium truncate max-w-[140px]">{compareLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
};
