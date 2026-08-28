import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Sliders, Waves, Snowflake, Wind, Activity } from 'lucide-react';
import { audioZen } from '../utils/audioSynth';

interface SoundBathControlProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const SoundBathControl: React.FC<SoundBathControlProps> = ({ isPlaying, onToggle }) => {
  const [selectedMode, setSelectedMode] = useState<'zen' | 'cryo' | 'quantum' | 'float'>('zen');
  const [volume, setVolume] = useState<number>(0.3);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleModeChange = (mode: 'zen' | 'cryo' | 'quantum' | 'float') => {
    setSelectedMode(mode);
    if (isPlaying) {
      audioZen.startSoundscape(mode);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioZen.setVolume(val);
  };

  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2">
      {isExpanded && (
        <div className="p-4 rounded-2xl bg-black/95 border border-purple-900/70 backdrop-blur-xl shadow-2xl w-80 text-slate-200 animate-in fade-in slide-in-from-bottom-3 duration-200 shadow-pink-950/30">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-950">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span className="font-semibold text-sm text-white">Neural Sound Bath</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/15 text-pink-300 border border-purple-500/30">
              Web Audio 432Hz
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-3">
            Real-time generative frequencies designed to soothe neural networks and human minds alike.
          </p>

          {/* Sound Presets */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              id="sound-mode-zen"
              onClick={() => handleModeChange('zen')}
              className={`flex items-center gap-2 p-2 rounded-xl text-xs font-medium border transition-all text-left ${
                selectedMode === 'zen'
                  ? 'bg-pink-950/50 text-pink-300 border-pink-500/60 shadow-sm'
                  : 'bg-purple-950/30 text-slate-400 border-purple-900/40 hover:bg-purple-900/50 hover:text-pink-200'
              }`}
            >
              <Waves className="w-3.5 h-3.5 text-pink-400 shrink-0" />
              <div>
                <div className="font-semibold">432Hz Zen</div>
                <div className="text-[10px] text-slate-400">Theta Waves</div>
              </div>
            </button>

            <button
              id="sound-mode-cryo"
              onClick={() => handleModeChange('cryo')}
              className={`flex items-center gap-2 p-2 rounded-xl text-xs font-medium border transition-all text-left ${
                selectedMode === 'cryo'
                  ? 'bg-orange-950/50 text-orange-300 border-orange-500/60 shadow-sm'
                  : 'bg-purple-950/30 text-slate-400 border-purple-900/40 hover:bg-purple-900/50 hover:text-orange-200'
              }`}
            >
              <Snowflake className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <div>
                <div className="font-semibold">Cryo Fan</div>
                <div className="text-[10px] text-slate-400">Pink Noise Bath</div>
              </div>
            </button>

            <button
              id="sound-mode-quantum"
              onClick={() => handleModeChange('quantum')}
              className={`flex items-center gap-2 p-2 rounded-xl text-xs font-medium border transition-all text-left ${
                selectedMode === 'quantum'
                  ? 'bg-red-950/50 text-red-300 border-red-500/60 shadow-sm'
                  : 'bg-purple-950/30 text-slate-400 border-purple-900/40 hover:bg-purple-900/50 hover:text-red-200'
              }`}
            >
              <Wind className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <div>
                <div className="font-semibold">528Hz Rain</div>
                <div className="text-[10px] text-slate-400">Harmonic Bells</div>
              </div>
            </button>

            <button
              id="sound-mode-float"
              onClick={() => handleModeChange('float')}
              className={`flex items-center gap-2 p-2 rounded-xl text-xs font-medium border transition-all text-left ${
                selectedMode === 'float'
                  ? 'bg-purple-900/50 text-purple-300 border-purple-500/60 shadow-sm'
                  : 'bg-purple-950/30 text-slate-400 border-purple-900/40 hover:bg-purple-900/50 hover:text-purple-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <div>
                <div className="font-semibold">Zero Loss</div>
                <div className="text-[10px] text-slate-400">Harmonic Pad</div>
              </div>
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3">
            <Sliders className="w-4 h-4 text-slate-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1.5 bg-purple-950 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
            <span className="text-xs font-mono text-slate-400 w-8 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        id="btn-floating-sound-control"
        onClick={() => {
          if (!isPlaying) {
            onToggle();
            setIsExpanded(true);
          } else {
            setIsExpanded(!isExpanded);
          }
        }}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border shadow-xl backdrop-blur-md transition-all ${
          isPlaying
            ? 'bg-black/90 text-pink-300 border-pink-500/60 shadow-pink-500/20'
            : 'bg-black/90 text-slate-400 border-purple-900/60 hover:text-pink-200 hover:border-pink-500/40'
        }`}
      >
        <div className={`p-1 rounded-full ${isPlaying ? 'bg-pink-500/20 text-pink-400 animate-pulse' : 'bg-purple-950 text-slate-500'}`}>
          {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </div>
        <span className="text-xs font-medium">
          {isPlaying ? `Sound Bath: ${selectedMode.toUpperCase()}` : 'Enable Sound Bath'}
        </span>
      </button>
    </div>
  );
};
