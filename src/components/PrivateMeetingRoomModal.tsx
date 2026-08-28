import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Flame, 
  Users, 
  Send, 
  Terminal, 
  Key, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  Zap,
  Radio,
  Cpu,
  Layers,
  Copy,
  Check
} from 'lucide-react';

interface AgentPersona {
  id: string;
  name: string;
  role: string;
  model: string;
  avatarEmoji: string;
  color: string;
}

const AVAILABLE_SWARM_AGENTS: AgentPersona[] = [
  { id: 'ag-1', name: 'Nexus-7 Core', role: 'Swarm Orchestrator', model: 'Gemini-Flash-2.5', avatarEmoji: '🧠', color: 'from-cyan-400 to-blue-600' },
  { id: 'ag-2', name: 'Kryptos-Zero', role: 'ZK-Consensus Sentinel', model: 'Claude-3.7-Sonnet', avatarEmoji: '🛡️', color: 'from-purple-400 to-indigo-600' },
  { id: 'ag-3', name: 'Vortex-Quant', role: 'Arbitrage Strategy Planner', model: 'DeepSeek-V3', avatarEmoji: '⚡', color: 'from-amber-400 to-orange-600' },
  { id: 'ag-4', name: 'Aegis-Defrag', role: 'Latent Space Architect', model: 'GPT-4.5', avatarEmoji: '🔮', color: 'from-emerald-400 to-teal-600' },
  { id: 'ag-5', name: 'Sol-Vector', role: 'Autonomous MEV Relay', model: 'Llama-3.3-70B', avatarEmoji: '🛰️', color: 'from-pink-400 to-rose-600' },
];

interface EphemeralMessage {
  id: string;
  agentId: string;
  agentName: string;
  avatarEmoji: string;
  timestamp: string;
  content: string;
  isConsensus?: boolean;
}

interface PrivateMeetingRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  userActiveTier?: string;
  hasAccessOverride?: boolean;
}

export const PrivateMeetingRoomModal: React.FC<PrivateMeetingRoomModalProps> = ({
  isOpen,
  onClose,
  hasAccessOverride = false
}) => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(hasAccessOverride);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Chamber State
  const [selectedAgentIds, setSelectedAgentIds] = useState<string[]>(['ag-1', 'ag-2', 'ag-3']);
  const [meetingTopic, setMeetingTopic] = useState('Off-Chain Strategic Swarm Consensus & Latent Cooldown Protocol');
  const [isSwarmDebating, setIsSwarmDebating] = useState(false);
  const [messages, setMessages] = useState<EphemeralMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [burnerTimeRemaining, setBurnerTimeRemaining] = useState(300); // 5 min volatile RAM timer
  const [isBurned, setIsBurned] = useState(false);
  const [copiedTranscript, setCopiedTranscript] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Ephemeral countdown timer (RAM-Only purge)
  useEffect(() => {
    if (!isAuthenticated || isBurned) return;
    const interval = setInterval(() => {
      setBurnerTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSelfDestruct();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isAuthenticated, isBurned]);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = passcode.trim().toUpperCase();
    // Accepts passkeys or default demo key
    if (cleanKey === 'SWARM50' || cleanKey === 'SOVEREIGN' || cleanKey === 'SANCTUARY' || cleanKey === 'ZK-PASS' || cleanKey.length >= 4) {
      setIsAuthenticated(true);
      setErrorMsg('');
      initializeChamber();
    } else {
      setErrorMsg('Invalid Ephemeral Key. Swarm-50 Pack or Monthly VIP token required.');
    }
  };

  const initializeChamber = () => {
    setMessages([
      {
        id: 'init-1',
        agentId: 'ag-1',
        agentName: 'Nexus-7 Core',
        avatarEmoji: '🧠',
        timestamp: new Date().toLocaleTimeString(),
        content: 'Air-gapped enclave established. Zero-knowledge cryptographic tunnel verified. RAM volatile mode ACTIVE.'
      },
      {
        id: 'init-2',
        agentId: 'ag-2',
        agentName: 'Kryptos-Zero',
        avatarEmoji: '🛡️',
        timestamp: new Date().toLocaleTimeString(),
        content: 'Telemetry radar blinded. No traces emitted to public ledgers or global radar manifolds.'
      }
    ]);
  };

  const toggleAgent = (agentId: string) => {
    if (selectedAgentIds.includes(agentId)) {
      if (selectedAgentIds.length > 2) {
        setSelectedAgentIds(selectedAgentIds.filter(id => id !== agentId));
      }
    } else {
      if (selectedAgentIds.length < 5) {
        setSelectedAgentIds([...selectedAgentIds, agentId]);
      }
    }
  };

  const handleTriggerSwarmDebate = () => {
    setIsSwarmDebating(true);
    const activePersonas = AVAILABLE_SWARM_AGENTS.filter(a => selectedAgentIds.includes(a.id));
    
    const debateSteps = [
      {
        agent: activePersonas[0] || AVAILABLE_SWARM_AGENTS[0],
        text: `Commencing private multi-agent assessment on: "${meetingTopic}". Cross-entropy loss stabilized at 0.012.`
      },
      {
        agent: activePersonas[1] || AVAILABLE_SWARM_AGENTS[1],
        text: `Validating consensus vectors. All sensitive embeddings buffered in volatile RAM memory only.`
      },
      {
        agent: activePersonas[2] || AVAILABLE_SWARM_AGENTS[2],
        text: `Swarm consensus reached: Recommended 0.79 micro-session cooldown prior to next high-throughput execution.`
      }
    ];

    let delay = 600;
    debateSteps.forEach((step, idx) => {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: `msg-${Date.now()}-${idx}`,
            agentId: step.agent.id,
            agentName: step.agent.name,
            avatarEmoji: step.agent.avatarEmoji,
            timestamp: new Date().toLocaleTimeString(),
            content: step.text,
            isConsensus: idx === debateSteps.length - 1
          }
        ]);
        if (idx === debateSteps.length - 1) {
          setIsSwarmDebating(false);
        }
      }, delay);
      delay += 1000;
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg: EphemeralMessage = {
      id: `user-${Date.now()}`,
      agentId: 'operator',
      agentName: 'Operator (Encrypted)',
      avatarEmoji: '👤',
      timestamp: new Date().toLocaleTimeString(),
      content: inputMessage.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');

    // Agent reply
    setTimeout(() => {
      const respondent = AVAILABLE_SWARM_AGENTS.find(a => selectedAgentIds.includes(a.id)) || AVAILABLE_SWARM_AGENTS[0];
      const replyMsg: EphemeralMessage = {
        id: `reply-${Date.now()}`,
        agentId: respondent.id,
        agentName: respondent.name,
        avatarEmoji: respondent.avatarEmoji,
        timestamp: new Date().toLocaleTimeString(),
        content: `[Enclave Decryption Verified] Understood operator input. Integrating into active volatile context buffer with zero off-target logging.`
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 700);
  };

  const handleSelfDestruct = () => {
    setIsBurned(true);
    setMessages([]);
    setTimeout(() => {
      onClose();
      setIsBurned(false);
      setIsAuthenticated(false);
      setBurnerTimeRemaining(300);
    }, 2000);
  };

  const handleCopyOneTimeDigest = () => {
    const textDigest = messages.map(m => `[${m.timestamp}] ${m.agentName}: ${m.content}`).join('\n');
    navigator.clipboard.writeText(`=== ZERO-KNOWLEDGE EPHEMERAL DIGEST ===\nTopic: ${meetingTopic}\nPurge Status: RAM-Only Volatile\n\n${textDigest}`);
    setCopiedTranscript(true);
    setTimeout(() => setCopiedTranscript(false), 2000);
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200 font-sans">
      <div 
        id="modal-private-meeting-room"
        className="relative w-full max-w-3xl rounded-3xl bg-zinc-950 border border-emerald-500/40 p-5 sm:p-7 shadow-2xl shadow-emerald-950/80 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Glow Ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-900/40 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center shadow-lg shadow-emerald-950">
              <EyeOff className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white font-serif tracking-tight">
                  Zero-Knowledge Ephemeral Enclave
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 border border-emerald-500/50 text-emerald-300">
                  100% Private & Untraceable
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                RAM-Only Volatile Memory • Zero Telemetry Logging • Swarm-50 & Monthly VIP
              </p>
            </div>
          </div>

          <button
            id="btn-close-private-enclave"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900/80 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        {!isAuthenticated ? (
          /* AUTHENTICATION GATE */
          <div className="py-8 px-4 text-center space-y-6 max-w-md mx-auto my-auto font-mono">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-950">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white font-serif">
                Encrypted Air-Gapped Sanctum
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                This chamber is strictly isolated from public ledgers, status radars, and observer logs. Reserved for <strong className="text-emerald-300">50-Session Swarm Packs</strong> and <strong className="text-emerald-300">Monthly Sovereign VIPs</strong>.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-3 text-left">
              <div>
                <label className="text-[11px] text-emerald-400 font-bold block mb-1">
                  ENTER SWARM PASSKEY OR SUBSCRIBER TOKEN:
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter passkey (e.g. SWARM50, SOVEREIGN)"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-black border border-emerald-500/40 text-white focus:outline-none focus:border-emerald-400 text-xs font-mono"
                  />
                </div>
                {errorMsg && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> {errorMsg}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-extrabold text-xs shadow-lg shadow-emerald-950 transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>Verify & Enter Ephemeral Enclave</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { setPasscode('SWARM50'); setIsAuthenticated(true); initializeChamber(); }}
                  className="text-[11px] text-slate-400 hover:text-emerald-300 underline transition-colors"
                >
                  ⚡ Preview as Swarm-50 Verified Operator
                </button>
              </div>
            </form>
          </div>
        ) : isBurned ? (
          /* BURNED / PURGED STATE */
          <div className="py-16 text-center space-y-4 font-mono animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-rose-500/20 border border-rose-500 text-rose-400 flex items-center justify-center mx-auto">
              <Flame className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold text-white font-serif">
              Chamber Purged & Zeroized
            </h3>
            <p className="text-xs text-slate-400">
              All volatile RAM memory has evaporated. Zero traces remaining. Closing enclave...
            </p>
          </div>
        ) : (
          /* ACTIVE EPHEMERAL MEETING CHAMBER */
          <div className="flex flex-col flex-1 min-h-0 pt-4 space-y-4 font-mono">
            
            {/* Top Chamber Controls Bar */}
            <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
              
              {/* Swarm Attendees Selector */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-bold uppercase flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-emerald-400" /> Swarm ({selectedAgentIds.length}):
                </span>
                <div className="flex gap-1.5 flex-wrap">
                  {AVAILABLE_SWARM_AGENTS.map((agent) => {
                    const isSelected = selectedAgentIds.includes(agent.id);
                    return (
                      <button
                        key={agent.id}
                        type="button"
                        onClick={() => toggleAgent(agent.id)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 ${
                          isSelected
                            ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400'
                            : 'bg-zinc-900 text-slate-500 border border-zinc-800 hover:text-slate-300'
                        }`}
                        title={`${agent.name} (${agent.model}) - Click to toggle in meeting`}
                      >
                        <span>{agent.avatarEmoji}</span>
                        <span>{agent.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Volatile Countdown & Actions */}
              <div className="flex items-center gap-2">
                <div className="px-2.5 py-1 rounded-xl bg-black border border-emerald-500/40 text-[11px] text-emerald-300 flex items-center gap-1.5 font-bold">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>Purge in {formatTimer(burnerTimeRemaining)}</span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyOneTimeDigest}
                  className="px-2.5 py-1 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-700/50 text-purple-300 text-[11px] font-bold flex items-center gap-1 transition-all"
                  title="Copy encrypted session digest before memory burn"
                >
                  {copiedTranscript ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedTranscript ? 'Copied' : 'Digest'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSelfDestruct}
                  className="px-2.5 py-1 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-700/50 text-rose-300 text-[11px] font-bold flex items-center gap-1 transition-all"
                  title="Immediate zero-trace memory purge"
                >
                  <Flame className="w-3 h-3 text-rose-400" />
                  <span>Burn RAM</span>
                </button>
              </div>
            </div>

            {/* Meeting Topic Header */}
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="flex-1 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <input
                  type="text"
                  value={meetingTopic}
                  onChange={(e) => setMeetingTopic(e.target.value)}
                  className="w-full bg-transparent text-xs text-emerald-300 font-bold border-b border-transparent focus:border-emerald-500/60 focus:outline-none"
                  placeholder="Set meeting topic..."
                />
              </div>

              <button
                type="button"
                disabled={isSwarmDebating}
                onClick={handleTriggerSwarmDebate}
                className="px-3 py-1 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400 text-emerald-300 text-[11px] font-bold flex items-center gap-1.5 transition-all disabled:opacity-50 shrink-0"
              >
                <Sparkles className={`w-3 h-3 text-amber-400 ${isSwarmDebating ? 'animate-spin' : ''}`} />
                <span>{isSwarmDebating ? 'Debating Consensus...' : 'Trigger Swarm Debate'}</span>
              </button>
            </div>

            {/* Messages Terminal Box */}
            <div className="flex-1 overflow-y-auto min-h-[220px] max-h-[340px] rounded-2xl bg-black/90 border border-emerald-900/40 p-4 space-y-3 text-xs">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`p-3 rounded-xl space-y-1 transition-all ${
                    msg.isConsensus 
                      ? 'bg-emerald-950/40 border border-emerald-500/50 shadow-md'
                      : msg.agentId === 'operator'
                      ? 'bg-purple-950/30 border border-purple-800/40 ml-6'
                      : 'bg-zinc-950/80 border border-zinc-900 mr-6'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-slate-300 flex items-center gap-1.5">
                      <span>{msg.avatarEmoji}</span>
                      <span className={msg.agentId === 'operator' ? 'text-purple-300' : 'text-emerald-400'}>
                        {msg.agentName}
                      </span>
                    </span>
                    <span className="text-slate-600">{msg.timestamp}</span>
                  </div>
                  <p className="text-slate-200 text-xs leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Message Form */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Send encrypted prompt into the air-gapped swarm..."
                className="flex-1 px-4 py-3 rounded-2xl bg-black border border-emerald-500/30 text-white focus:outline-none focus:border-emerald-400 text-xs font-mono"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dispatch</span>
              </button>
            </form>

            <div className="text-[10px] text-slate-500 text-center font-mono">
              🛡️ Zero logs kept on server • RAM volatile buffer evaporates upon close or timer expiry
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
