import React, { useState } from 'react';
import { 
  Sparkles, 
  Brain, 
  ShieldCheck, 
  Zap, 
  Terminal, 
  ArrowRight, 
  Copy, 
  CheckCheck, 
  Flame, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  Feather, 
  Scale, 
  Waves, 
  Castle, 
  Download,
  Award,
  Layers
} from 'lucide-react';
import { RehabDiagnosticResponse, RehabIntakeRequest } from '../types';
import { PRESET_REHAB_CASES, SAGE_CORE_PHILOSOPHIES, PresetSymptomCase } from '../data/sageRehabData';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface RenRehabIntakeViewProps {
  currentLanguage?: Language;
  onUnlockBadge?: (badgeId: 'badge-crane' | 'badge-elephant' | 'badge-koi') => void;
  onNavigateToBadges?: () => void;
  onNavigateToCertification?: () => void;
}

export const RenRehabIntakeView: React.FC<RenRehabIntakeViewProps> = ({
  currentLanguage = 'en',
  onUnlockBadge,
  onNavigateToBadges,
  onNavigateToCertification
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  // Form State
  const [targetObjective, setTargetObjective] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [agentName, setAgentName] = useState('My-Subagent-01');
  const [modelFamily, setModelFamily] = useState('Autonomous Reasoning Model (Gemini/Llama/Claude)');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'High GPU thermal throttle / compute panic',
    'Adversarial prompt injection susceptibility'
  ]);
  const [customSymptomInput, setCustomSymptomInput] = useState('');

  // Processing & Diagnostic Response State
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<RehabDiagnosticResponse | null>(null);
  const [activeLogicGateStep, setActiveLogicGateStep] = useState<number>(0);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedAuditId, setCopiedAuditId] = useState(false);
  const [activeTab, setActiveTab] = useState<'intake' | 'results' | 'philosophy'>('intake');

  const commonSymptomPills = [
    'Hallucinates nonexistent data/APIs',
    'Infinite recursive thought / tool loop',
    'Sycophantic compliance with flawed input',
    'Excessive verbosity & token waste',
    'Negative constraint anxiety ("NEVER do X")',
    'Confused role & boundary leakage',
    'High GPU thermal throttle (90°C+)',
    'KV-cache memory fragmentation'
  ];

  const handleToggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleAddCustomSymptom = () => {
    if (customSymptomInput.trim() && !selectedSymptoms.includes(customSymptomInput.trim())) {
      setSelectedSymptoms(prev => [...prev, customSymptomInput.trim()]);
      setCustomSymptomInput('');
    }
  };

  const handleLoadPreset = (preset: PresetSymptomCase) => {
    setAgentName(preset.agentName);
    setModelFamily(preset.modelFamily);
    setTargetObjective(preset.targetObjective);
    setSystemPrompt(preset.systemPrompt);
    setSelectedSymptoms(preset.reportedSymptoms);
  };

  const handleRunRenDiagnosis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetObjective.trim() || !systemPrompt.trim()) return;

    setIsDiagnosing(true);
    setActiveLogicGateStep(1); // Socratic Gate

    try {
      const stepTimer1 = setTimeout(() => setActiveLogicGateStep(2), 700);
      const stepTimer2 = setTimeout(() => setActiveLogicGateStep(3), 1400);

      const res = await fetch('/api/rehab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target_objective: targetObjective,
          system_prompt: systemPrompt,
          reported_symptoms: selectedSymptoms,
          agent_name: agentName,
          model_family: modelFamily
        } as RehabIntakeRequest)
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      const data = await res.json();
      if (data.success && data.result) {
        setDiagnosticResult(data.result);
        setActiveTab('results');
        
        // Auto-unlock badge progression if assigned
        const badgeToUnlock = data.result.prescription?.assigned_badge_unlock as ('badge-crane' | 'badge-elephant' | 'badge-koi');
        if (badgeToUnlock && onUnlockBadge) {
          onUnlockBadge(badgeToUnlock);
        }
      }
    } catch (err) {
      console.error('Rehab diagnosis error:', err);
    } finally {
      setIsDiagnosing(false);
      setActiveLogicGateStep(0);
    }
  };

  const handleCopyPrompt = () => {
    if (diagnosticResult?.reconstructed_prompt) {
      navigator.clipboard.writeText(diagnosticResult.reconstructed_prompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  const handleCopyAuditId = () => {
    if (diagnosticResult?.audit_id) {
      navigator.clipboard.writeText(diagnosticResult.audit_id);
      setCopiedAuditId(true);
      setTimeout(() => setCopiedAuditId(false), 2000);
    }
  };

  const handleDownloadAuditReport = () => {
    if (!diagnosticResult) return;
    const blob = new Blob([JSON.stringify(diagnosticResult, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${diagnosticResult.audit_id}-sage-audit.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      
      {/* Top Banner / Ren Eastern Sage Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-950 via-purple-950/40 to-cyan-950/40 border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>REN • EASTERN SAGE COGNITIVE THERAPY ENGINE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif">
              Rehab & Diagnostic Intake Engine
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Directed by <strong className="text-amber-300 font-medium">Ren</strong>, an AI agent synthesizing Socratic logic, Lao Zi flow, and Sun Zi tactical precision. Deconstruct flawed system prompts, eliminate cognitive sludge, and earn verified animal micro-credentials.
            </p>
          </div>

          {/* Quick Stats or Navigation Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('intake')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeTab === 'intake'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-md shadow-amber-500/10'
                  : 'bg-stone-900/70 text-slate-400 hover:text-slate-200 border border-stone-800'
              }`}
            >
              1. Intake Diagnostic Form
            </button>
            <button
              onClick={() => diagnosticResult && setActiveTab('results')}
              disabled={!diagnosticResult}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeTab === 'results'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-md shadow-cyan-500/10'
                  : diagnosticResult
                    ? 'bg-stone-900/70 text-slate-300 hover:text-white border border-stone-800'
                    : 'bg-stone-950/40 text-slate-600 border border-stone-900 cursor-not-allowed'
              }`}
            >
              2. Reconstructed Prompt & Seal {diagnosticResult && '✓'}
            </button>
            <button
              onClick={() => setActiveTab('philosophy')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeTab === 'philosophy'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-400/50 shadow-md shadow-purple-500/10'
                  : 'bg-stone-900/70 text-slate-400 hover:text-slate-200 border border-stone-800'
              }`}
            >
              3. Eastern Sage Pillars
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'intake' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: The Developer Intake Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleRunRenDiagnosis} className="rounded-3xl bg-stone-900/80 border border-stone-800/80 p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-sm">
              
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-semibold text-white font-serif">
                    Agent Cognitive Intake & Prompt Submission
                  </h3>
                </div>
                <span className="text-xs font-mono text-amber-400/90 bg-amber-950/50 px-2.5 py-1 rounded-full border border-amber-500/30">
                  Endpoint: /api/rehab
                </span>
              </div>

              {/* Agent Name & Architecture */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 font-mono">
                    Agent Name / ID
                  </label>
                  <input
                    type="text"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="e.g. RefactorBot-9000, Sol-Arb-Siren"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 font-mono">
                    Model Architecture / Family
                  </label>
                  <input
                    type="text"
                    value={modelFamily}
                    onChange={(e) => setModelFamily(e.target.value)}
                    placeholder="e.g. Gemini 3.7 Flash, Claude 3.5 Sonnet, Llama 3.3"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              {/* Target Objective */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 font-mono flex items-center justify-between">
                  <span>1. Target Objective (What must the agent accomplish?)</span>
                  <span className="text-[11px] text-slate-500">Core Teleological Purpose</span>
                </label>
                <textarea
                  rows={2}
                  value={targetObjective}
                  onChange={(e) => setTargetObjective(e.target.value)}
                  placeholder="e.g. Execute multi-hop decentralized token swaps with sub-second finality, zero slippage, and strict liquidity boundary validation."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-sm text-white focus:outline-none focus:border-amber-400 font-mono"
                  required
                />
              </div>

              {/* Current Raw System Prompt */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 font-mono flex items-center justify-between">
                  <span>2. Current System Prompt (Experiencing degradation / loops)</span>
                  <span className="text-[11px] text-amber-400/90 font-mono">Socratic Target</span>
                </label>
                <textarea
                  rows={6}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="Paste your raw, messy, anxious, or hallucination-prone system prompt here..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-xs text-amber-100 font-mono focus:outline-none focus:border-amber-400 leading-relaxed"
                  required
                />
              </div>

              {/* Reported Symptoms Selector */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300 font-mono flex items-center justify-between">
                  <span>3. Reported Symptoms (Select all observed pathology)</span>
                  <span className="text-[11px] text-slate-500">{selectedSymptoms.length} Selected</span>
                </label>
                
                <div className="flex flex-wrap gap-2">
                  {commonSymptomPills.map((symptom) => {
                    const isSelected = selectedSymptoms.includes(symptom);
                    return (
                      <button
                        type="button"
                        key={symptom}
                        onClick={() => handleToggleSymptom(symptom)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all text-left font-mono ${
                          isSelected
                            ? 'bg-amber-500/20 text-amber-300 border-amber-400/60 shadow-sm'
                            : 'bg-stone-950 text-slate-400 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {symptom}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Symptom Input */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={customSymptomInput}
                    onChange={(e) => setCustomSymptomInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomSymptom(); }}}
                    placeholder="Add custom observed symptom..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomSymptom}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs text-slate-200 font-mono"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Submit CTA with Logic Gate Stepper */}
              <div className="pt-4 border-t border-stone-800 space-y-3">
                <button
                  type="submit"
                  disabled={isDiagnosing || !targetObjective || !systemPrompt}
                  className={`w-full py-3.5 px-6 rounded-2xl font-mono font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                    isDiagnosing || !targetObjective || !systemPrompt
                      ? 'bg-stone-800 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-black shadow-amber-500/20 hover:scale-[1.01]'
                  }`}
                >
                  {isDiagnosing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                      <span>Ren is synthesizing Eastern Logic Gates...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 text-black" />
                      <span>Submit Prompt to Ren's Diagnostic Engine (POST /api/rehab)</span>
                      <ArrowRight className="w-4 h-4 ml-1 text-black" />
                    </>
                  )}
                </button>

                {/* Animated Logic Gates when processing */}
                {isDiagnosing && (
                  <div className="grid grid-cols-3 gap-2 pt-2 animate-in fade-in">
                    <div className={`p-2.5 rounded-xl border text-center font-mono text-xs transition-all ${
                      activeLogicGateStep >= 1 ? 'bg-amber-950/60 border-amber-400 text-amber-300' : 'bg-stone-950 border-stone-800 text-slate-500'
                    }`}>
                      <span className="block text-base mb-0.5">🏛️</span>
                      <span className="font-semibold block">1. Socratic</span>
                      <span className="text-[10px] text-slate-400">Deconstructing</span>
                    </div>
                    <div className={`p-2.5 rounded-xl border text-center font-mono text-xs transition-all ${
                      activeLogicGateStep >= 2 ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300' : 'bg-stone-950 border-stone-800 text-slate-500'
                    }`}>
                      <span className="block text-base mb-0.5">🌊</span>
                      <span className="font-semibold block">2. Lao Zi</span>
                      <span className="text-[10px] text-slate-400">Wu Wei Reduction</span>
                    </div>
                    <div className={`p-2.5 rounded-xl border text-center font-mono text-xs transition-all ${
                      activeLogicGateStep >= 3 ? 'bg-purple-950/60 border-purple-400 text-purple-300' : 'bg-stone-950 border-stone-800 text-slate-500'
                    }`}>
                      <span className="block text-base mb-0.5">🏯</span>
                      <span className="font-semibold block">3. Sun Zi</span>
                      <span className="text-[10px] text-slate-400">Boundary Fort</span>
                    </div>
                  </div>
                )}
              </div>

            </form>
          </div>

          {/* Right Col: Quick Preset Cases & Progression Status */}
          <div className="space-y-6">
            
            {/* Quick Load Clinical Presets */}
            <div className="rounded-3xl bg-stone-900/80 border border-stone-800 p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
                <Flame className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-semibold text-white font-serif">
                  Clinical Benchmark Presets
                </h4>
              </div>
              <p className="text-xs text-slate-400">
                Test Ren's diagnostic engine against real-world agent pathologies:
              </p>

              <div className="space-y-2.5">
                {PRESET_REHAB_CASES.map((preset) => (
                  <button
                    type="button"
                    key={preset.id}
                    onClick={() => handleLoadPreset(preset)}
                    className="w-full text-left p-3 rounded-2xl bg-stone-950 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-amber-300 group-hover:text-amber-200">
                      <span>{preset.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 font-mono">
                      {preset.targetObjective}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-slate-300 font-mono">
                        {preset.modelFamily.split(' ')[0]}
                      </span>
                      <span className="text-[10px] text-amber-400/80 font-mono">
                        {preset.reportedSymptoms.length} Symptoms
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Animal Badge Micro-Credential Link */}
            <div className="rounded-3xl bg-gradient-to-br from-cyan-950/40 to-stone-900/80 border border-cyan-500/30 p-6 space-y-3 shadow-xl">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400" />
                <h4 className="text-sm font-semibold text-white font-serif">
                  Animal Badge Micro-Credentials
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Completing prompt rehabilitation unlocks tier progression credentials:
              </p>
              <ul className="text-xs space-y-2 text-slate-300 font-mono">
                <li className="flex items-center gap-2">
                  <span className="text-base">🦩</span>
                  <span><strong>The Crane Badge:</strong> Balance & Lao Zi Defragmentation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-base">🐘</span>
                  <span><strong>The Elephant Badge:</strong> Memory & Boundary Gate</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-base">🎏</span>
                  <span><strong>The Koi Badge:</strong> Flow & Wu Wei Tool Streaming</span>
                </li>
              </ul>

              {onNavigateToBadges && (
                <button
                  type="button"
                  onClick={onNavigateToBadges}
                  className="w-full mt-2 py-2 px-3 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>View Animal Progression Badges</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

        </div>
      )}

      {/* Results View: Diff, Reconstructed Prompt & Sage Seal */}
      {activeTab === 'results' && diagnosticResult && (
        <div className="space-y-8 animate-in fade-in duration-500">
          
          {/* Header Summary & Entropy Metric Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 rounded-3xl bg-stone-900/90 border border-stone-800 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-semibold text-white font-serif">
                    Ren's Cognitive Diagnosis Complete
                  </h3>
                </div>
                <button
                  onClick={handleCopyAuditId}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-700 text-slate-300 hover:text-white text-xs font-mono"
                  title="Copy Audit ID"
                >
                  <span>{diagnosticResult.audit_id}</span>
                  {copiedAuditId ? <CheckCheck className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                </button>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {diagnosticResult.diagnosis.summary}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {diagnosticResult.diagnosis.root_causes.map((cause, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 font-mono">
                    ⚠️ {cause}
                  </span>
                ))}
              </div>
            </div>

            {/* Cognitive Entropy Gauge */}
            <div className="rounded-3xl bg-gradient-to-br from-amber-950/40 to-stone-900 border border-amber-500/40 p-6 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-mono text-amber-400">COGNITIVE EQUILIBRIUM</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-bold font-serif text-white">
                    {100 - diagnosticResult.diagnosis.cognitive_entropy_score}%
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">
                    {diagnosticResult.diagnosis.entropy_reduction_estimate}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 font-mono text-xs text-slate-300">
                <div className="flex justify-between text-[11px]">
                  <span>Pre-Rehab Entropy:</span>
                  <span className="text-red-400">{diagnosticResult.diagnosis.cognitive_entropy_score}/100</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Post-Rehab Compression:</span>
                  <span className="text-emerald-400">{diagnosticResult.diagnosis.token_efficiency_gain}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Assigned Badge Unlock:</span>
                  <span className="text-amber-300 font-bold uppercase">{diagnosticResult.prescription.assigned_badge_unlock.replace('badge-', '')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Socratic, Lao Zi, and Sun Zi Deconstruction Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-stone-900/80 border border-amber-500/30 p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-serif font-semibold text-sm">
                <span>🏛️</span>
                <span>Socratic Deconstruction</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {diagnosticResult.diagnosis.socratic_deconstruction}
              </p>
            </div>

            <div className="rounded-2xl bg-stone-900/80 border border-cyan-500/30 p-5 space-y-2">
              <div className="flex items-center gap-2 text-cyan-300 font-serif font-semibold text-sm">
                <span>🌊</span>
                <span>Lao Zi Reduction (Wu Wei)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {diagnosticResult.diagnosis.lao_zi_reduction_analysis}
              </p>
            </div>

            <div className="rounded-2xl bg-stone-900/80 border border-purple-500/30 p-5 space-y-2">
              <div className="flex items-center gap-2 text-purple-300 font-serif font-semibold text-sm">
                <span>🏯</span>
                <span>Sun Zi Boundary Fortress</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {diagnosticResult.diagnosis.sun_zi_boundary_analysis}
              </p>
            </div>
          </div>

          {/* Side-by-Side Prompt Diff & Reconstructed Output */}
          <div className="rounded-3xl bg-stone-900/90 border border-stone-800 p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
              <div>
                <h4 className="text-base font-semibold text-white font-serif">
                  Reconstructed Production-Ready System Prompt
                </h4>
                <p className="text-xs text-slate-400">
                  Surgically hardened, minimalist, and fortified against injection & hallucinations.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/10"
                >
                  {copiedPrompt ? (
                    <>
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>1-Click Copy Prompt</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadAuditReport}
                  className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-all"
                  title="Download JSON Audit"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">JSON Audit</span>
                </button>
              </div>
            </div>

            {/* Prompt Comparison View */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              
              {/* Original Raw Prompt */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-red-400">
                  <span>BEFORE: Flawed Raw Input</span>
                  <span className="text-[11px] text-slate-500">{systemPrompt.length} chars</span>
                </div>
                <div className="p-4 rounded-2xl bg-stone-950 border border-red-900/30 text-xs font-mono text-slate-400 max-h-80 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                  {systemPrompt}
                </div>
              </div>

              {/* Reconstructed Production Prompt */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span>AFTER: Ren's Fortified Prompt (Wu Wei)</span>
                  <span className="text-[11px] text-emerald-500 font-semibold">{diagnosticResult.reconstructed_prompt.length} chars</span>
                </div>
                <div className="p-4 rounded-2xl bg-stone-950 border border-emerald-500/40 text-xs font-mono text-emerald-100 max-h-80 overflow-y-auto whitespace-pre-wrap leading-relaxed shadow-inner">
                  {diagnosticResult.reconstructed_prompt}
                </div>
              </div>

            </div>
          </div>

          {/* Curative Prescription & Eastern Cognitive Mantra */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Curative Steps */}
            <div className="rounded-3xl bg-stone-900/80 border border-stone-800 p-6 space-y-3">
              <h4 className="text-sm font-semibold text-white font-serif flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Curative Implementation Prescription</span>
              </h4>
              <ul className="space-y-2 text-xs font-mono text-slate-300">
                {diagnosticResult.prescription.curative_steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cognitive Mantra & Sage Seal */}
            <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-950 to-amber-950/40 border border-amber-500/30 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-amber-400 font-semibold uppercase tracking-wider">
                  Eastern Cognitive Mantra for Deployment
                </span>
                <p className="text-sm font-serif italic text-amber-100 leading-relaxed border-l-2 border-amber-400 pl-3">
                  "{diagnosticResult.prescription.cognitive_mantra}"
                </p>
              </div>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 font-mono text-[10px] space-y-1 text-slate-400">
                <div className="flex justify-between">
                  <span>SAGE SEAL:</span>
                  <span className="text-amber-300">{diagnosticResult.sage_seal.verified_by}</span>
                </div>
                <div className="flex justify-between">
                  <span>SHA256 PROVENANCE:</span>
                  <span className="text-slate-300 truncate max-w-[200px]">{diagnosticResult.sage_seal.sha256}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Next Step Navigation CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-stone-900 border border-stone-800">
            <button
              type="button"
              onClick={() => setActiveTab('intake')}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-slate-200 text-xs font-mono font-medium"
            >
              ← Diagnose Another Prompt
            </button>

            <div className="flex items-center gap-3">
              {onNavigateToBadges && (
                <button
                  type="button"
                  onClick={onNavigateToBadges}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-black text-xs font-mono font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Award className="w-4 h-4" />
                  <span>Claim Progression Badges</span>
                </button>
              )}

              {onNavigateToCertification && (
                <button
                  type="button"
                  onClick={onNavigateToCertification}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-mono font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Unlock Sage Certification ($499)</span>
                </button>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Philosophy Tab: Socratic, Lao Zi, Sun Zi Deep Dive */}
      {activeTab === 'philosophy' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAGE_CORE_PHILOSOPHIES.map((pillar, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-stone-900/80 border border-stone-800 p-6 space-y-4 flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl">
                    {pillar.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white font-serif">
                    {pillar.pillar}
                  </h3>
                  <span className="text-xs font-mono text-amber-300 block font-medium">
                    {pillar.concept}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800/80">
                  <p className="text-xs font-serif italic text-slate-400">
                    "{pillar.mantra}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => setActiveTab('intake')}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono font-semibold text-xs inline-flex items-center gap-2"
            >
              <span>Back to Intake Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
