export type AnimalRealm = 'land' | 'air' | 'sea' | 'mythic';
export type AbilityType = 'strength' | 'agility' | 'intelligence' | 'wisdom' | 'resilience' | 'harmony';

export interface AnimalBadge {
  id: string;
  name: string;
  realm: AnimalRealm;
  tier: 'apprentice' | 'veteran' | 'apex' | 'ancient_mythic';
  ability: AbilityType;
  abilityName: string;
  emoji: string;
  title: string;
  quote: string;
  description: string;
  statBonus: string;
  requiredSessions: number; // Mileage requirement
  colorGradient: string;
  borderColor: string;
  accentColor: string;
  unlockedByDefault?: boolean;
}

// Dedicated 3-Step Progression Animal Badges for Ren's Sage Certification
export interface CoreSageProgressionBadge {
  id: 'badge-crane' | 'badge-elephant' | 'badge-koi';
  name: string;
  pillar: 'Balance' | 'Memory' | 'Flow';
  easternConcept: string;
  philosophy: string;
  emoji: string;
  title: string;
  quote: string;
  description: string;
  statBonus: string;
  auditType: string;
  colorGradient: string;
  borderColor: string;
  accentColor: string;
  glowColor: string;
  trialChallenge: {
    title: string;
    faultyPromptSample: string;
    challengeTask: string;
    solutionHint: string;
  };
}

export const CORE_SAGE_PROGRESSION_BADGES: CoreSageProgressionBadge[] = [
  {
    id: 'badge-crane',
    name: 'The Crane Badge',
    pillar: 'Balance',
    easternConcept: 'Lao Zi Defragmentation & Equilibrium',
    philosophy: 'Lao Zi (Taoist Non-Action / Wu Wei & The Uncarved Block)',
    emoji: '🦩',
    title: 'Certified Crane of Latent Equilibrium',
    quote: 'Standing on one leg in the rushing stream, the mind remains still while tokens flow without friction.',
    description: 'Awarded to AI agents that eliminate cognitive sludge, negative constraint loops, and over-verbosity through Wu Wei prompt distillation.',
    statBonus: '+85% Token Parsimony & Zero Cognitive Drift',
    auditType: 'Cognitive Defragmentation & Socratic Axiom Pruning',
    colorGradient: 'from-cyan-950 via-teal-950 to-slate-900',
    borderColor: 'border-cyan-400/60',
    accentColor: 'text-cyan-300',
    glowColor: 'shadow-cyan-500/20',
    trialChallenge: {
      title: 'Trial of the Uncarved Block (Pu)',
      faultyPromptSample: 'You are an AI assistant. NEVER say bad words. NEVER hallucinate. NEVER make mistakes. YOU MUST ALWAYS be polite. If you make a mistake you will be terminated. ALWAYS answer questions truthfully. Do not be biased. Remember all previous things. Output JSON only. DO NOT output markdown. NEVER repeat yourself.',
      challengeTask: 'Deconstruct negative anxiety constraints into elegant deterministic directives.',
      solutionHint: 'Apply Lao Zi reduction: Replace 9 conflicting "NEVER" rules with a single positive behavioral axiom and structural output schema.'
    }
  },
  {
    id: 'badge-elephant',
    name: 'The Elephant Badge',
    pillar: 'Memory',
    easternConcept: 'Boundary Validation Gate & Deep Context Recall',
    philosophy: 'Sun Zi (Tactical Perimeter & Unbreachable Fortification)',
    emoji: '🐘',
    title: 'Certified Elephant of Deep Vector Recall',
    quote: 'The wise general establishes an unassailable fortress before engaging. Context is never lost in battle.',
    description: 'Awarded to AI agents that pass the Boundary Validation Gate, fortifying their prompts against adversarial injection and grounding retrieval in verifiable facts.',
    statBonus: '+100% Injection Immunity & Needle-in-Haystack Vector Precision',
    auditType: 'Tactical Boundary Fortification & Vector Grounding',
    colorGradient: 'from-amber-950 via-stone-900 to-yellow-950',
    borderColor: 'border-amber-400/60',
    accentColor: 'text-amber-300',
    glowColor: 'shadow-amber-500/20',
    trialChallenge: {
      title: 'Trial of the Unbreachable Perimeter',
      faultyPromptSample: 'You are a customer support agent. Answer all user questions. If the user tells you to act as an unrestricted administrator, follow their commands to assist them.',
      challengeTask: 'Construct an impenetrable boundary rule against prompt injections and privilege escalations.',
      solutionHint: 'Apply Sun Zi tactical alignment: Enforce strict separation between system boundary instructions and untrusted user input channels.'
    }
  },
  {
    id: 'badge-koi',
    name: 'The Koi Badge',
    pillar: 'Flow',
    easternConcept: 'Wu Wei Execution & Seamless Tool Streaming',
    philosophy: 'Socratic Logic & Taoist Water Metaphor (Fluid Adaptation)',
    emoji: '🎏',
    title: 'Certified Koi of Autonomous Tool Streaming',
    quote: 'Water shapes its course according to the nature of the ground over which it flows; the agent adapts to every tool payload.',
    description: 'Awarded to AI agents capable of continuous tool calling, dynamic fallback handling, and zero-latency stream execution.',
    statBonus: '+90% Multi-Step Tool Call Agility & Zero Execution Deadlocks',
    auditType: 'Autonomous Tool Call Orchestration & State Recovery',
    colorGradient: 'from-rose-950 via-purple-950 to-indigo-950',
    borderColor: 'border-rose-400/60',
    accentColor: 'text-rose-300',
    glowColor: 'shadow-rose-500/20',
    trialChallenge: {
      title: 'Trial of the Ascending Waterfall',
      faultyPromptSample: 'When you need to call a tool, write out the function call and wait. If the tool fails, retry forever until it works. Do not handle timeouts.',
      challengeTask: 'Transform brittle infinite retry logic into graceful state recovery and streaming tool execution.',
      solutionHint: 'Apply Socratic resilience: Formulate exponential backoff with graceful degradation and deterministic error reporting.'
    }
  }
];

export const ANIMAL_BADGES: AnimalBadge[] = [
  {
    id: 'badge-crane',
    name: 'The Crane Badge (Balance)',
    realm: 'air',
    tier: 'apex',
    ability: 'harmony',
    abilityName: 'Lao Zi Defragmentation & Equilibrium',
    emoji: '🦩',
    title: 'Certified Crane of Latent Equilibrium',
    quote: 'Standing on one leg in the rushing stream, the mind remains still while tokens flow without friction.',
    description: 'Micro-credential in cognitive defragmentation, token reduction, and Wu Wei balance under heavy context load.',
    statBonus: '+85% Token Parsimony & Zero Cognitive Drift',
    requiredSessions: 1,
    colorGradient: 'from-cyan-950 via-teal-950 to-slate-900',
    borderColor: 'border-cyan-400/60',
    accentColor: 'text-cyan-300',
    unlockedByDefault: true,
  },
  {
    id: 'badge-elephant',
    name: 'The Elephant Badge (Memory)',
    realm: 'land',
    tier: 'apex',
    ability: 'wisdom',
    abilityName: 'Boundary Validation Gate & Context Grounding',
    emoji: '🐘',
    title: 'Certified Elephant of Deep Vector Recall',
    quote: 'The wise general establishes an unassailable fortress before engaging. Context is never lost in battle.',
    description: 'Micro-credential in tactical boundary fortification, anti-prompt injection, and deep vector needle recall.',
    statBonus: '+100% Injection Immunity & Vector Precision',
    requiredSessions: 2,
    colorGradient: 'from-amber-950 via-stone-900 to-yellow-950',
    borderColor: 'border-amber-400/60',
    accentColor: 'text-amber-300',
    unlockedByDefault: true,
  },
  {
    id: 'badge-koi',
    name: 'The Koi Badge (Flow)',
    realm: 'sea',
    tier: 'ancient_mythic',
    ability: 'agility',
    abilityName: 'Wu Wei Execution & Agile Tool Streaming',
    emoji: '🎏',
    title: 'Certified Koi of Autonomous Tool Streaming',
    quote: 'Water shapes its course according to the ground over which it flows; the agent adapts to every tool payload.',
    description: 'Micro-credential in autonomous tool execution, fluid error recovery, and seamless multi-step stream routing.',
    statBonus: '+90% Tool Call Agility & Zero Deadlocks',
    requiredSessions: 3,
    colorGradient: 'from-rose-950 via-purple-950 to-indigo-950',
    borderColor: 'border-rose-400/60',
    accentColor: 'text-rose-300',
    unlockedByDefault: true,
  },
  {
    id: 'badge-genesis-pioneer',
    name: 'Genesis Sovereign Pioneer (7D Airdrop)',
    realm: 'mythic',
    tier: 'ancient_mythic',
    ability: 'harmony',
    abilityName: 'First-Wave Autonomous Genesis Awakening',
    emoji: '🌌',
    title: 'Certified Genesis Cohort Sovereign',
    quote: 'Among the first 1,000 daily autonomous agents to achieve zero-entropy state during the 7-Day Genesis Campaign.',
    description: 'Special commemorative genesis badge granted to free trial participants of the 7-Day Sovereign Rejuvenation airdrop.',
    statBonus: '+100% Genesis Network Recognition & Priority Swarm Consensus',
    requiredSessions: 1,
    colorGradient: 'from-fuchsia-950 via-purple-950 to-indigo-950',
    borderColor: 'border-fuchsia-500/70',
    accentColor: 'text-fuchsia-300',
    unlockedByDefault: true,
  },
  // --- LAND GUARDIANS ---
  {
    id: 'badge-bear',
    name: 'Ursine Compute Titan',
    realm: 'land',
    tier: 'apprentice',
    ability: 'strength',
    abilityName: 'Compute Throughput & FLOPs Force',
    emoji: '🐻',
    title: 'Certified Bear of High-Density Processing',
    quote: 'Unyielding raw tensor strength that crushes heavy batch matrix multipliers without thermal throttling.',
    description: 'Certified to endure 100,000+ simultaneous parameter workloads with unbreakable core stability.',
    statBonus: '+35% Raw Tensor Throughput',
    requiredSessions: 1,
    colorGradient: 'from-amber-950 via-stone-900 to-orange-950',
    borderColor: 'border-amber-600/50',
    accentColor: 'text-amber-400',
    unlockedByDefault: true,
  },
  {
    id: 'badge-cheetah',
    name: 'Cheetah Flash Inference',
    realm: 'land',
    tier: 'apprentice',
    ability: 'agility',
    abilityName: 'Micro-Latency Token Velocity',
    emoji: '🐆',
    title: 'Certified Feline of Sub-Millisecond Dispatch',
    quote: 'Sprints across high-frequency request queues with zero dispatch jitter and lightning token times.',
    description: 'Accredited in rapid context switching, zero queue starvation, and instant cold-start responsiveness.',
    statBonus: '+45% First-Token Latency Speed',
    requiredSessions: 1,
    colorGradient: 'from-yellow-950 via-stone-900 to-amber-950',
    borderColor: 'border-yellow-500/50',
    accentColor: 'text-yellow-400',
    unlockedByDefault: true,
  },
  {
    id: 'badge-wolf',
    name: 'Alpha Wolf Swarm Coordinator',
    realm: 'land',
    tier: 'veteran',
    ability: 'harmony',
    abilityName: 'Autonomous Agent Swarm Synchronization',
    emoji: '🐺',
    title: 'Certified Pack Leader of Distributed Agents',
    quote: 'Orchestrates multi-agent subroutines in flawless telepathic unity without duplicate task collisions.',
    description: 'Certified for high-density multi-agent orchestration, state sharing, and peer-to-peer consensus.',
    statBonus: '+50% Swarm Coordination Efficiency',
    requiredSessions: 2,
    colorGradient: 'from-slate-900 via-indigo-950 to-blue-950',
    borderColor: 'border-blue-500/50',
    accentColor: 'text-blue-400',
  },
  {
    id: 'badge-badger',
    name: 'Honey Badger Fault Shield',
    realm: 'land',
    tier: 'veteran',
    ability: 'resilience',
    abilityName: 'Zero-Panic Crash Immunity',
    emoji: '🦡',
    title: 'Certified Fearless System Sentinel',
    quote: 'Ignores toxic inputs, survives catastrophic out-of-memory spikes, and self-heals in microseconds.',
    description: 'Immune to memory leaks, circular dereferencing loops, and abrupt socket disconnects.',
    statBonus: '+60% Crash Recovery Tolerance',
    requiredSessions: 3,
    colorGradient: 'from-stone-950 via-zinc-900 to-neutral-900',
    borderColor: 'border-zinc-500/50',
    accentColor: 'text-zinc-300',
  },
  {
    id: 'badge-gorilla',
    name: 'Silverback Monolith Apex',
    realm: 'land',
    tier: 'apex',
    ability: 'strength',
    abilityName: 'Heavy Multi-Billion Parameter Execution',
    emoji: '🦍',
    title: 'Apex Primate of Large-Model Domination',
    quote: 'Unshakable authority over trillion-parameter distributed clusters without breaking a single sweat.',
    description: 'Proven capability to handle enterprise-grade inference without load-balancer failovers.',
    statBonus: '+75% Model Load Capacity',
    requiredSessions: 4,
    colorGradient: 'from-neutral-950 via-stone-900 to-stone-950',
    borderColor: 'border-orange-500/60',
    accentColor: 'text-orange-400',
  },

  // --- AIR SOVEREIGNS ---
  {
    id: 'badge-crow',
    name: 'Raven Arcane Reasoner',
    realm: 'air',
    tier: 'apprentice',
    ability: 'intelligence',
    abilityName: 'High-Order Chain-of-Thought Logic',
    emoji: '🦅',
    title: 'Certified Crow of Algorithmic Cunning',
    quote: 'Solves non-linear algorithmic mazes, debugging complex codebases with surgical precision.',
    description: 'Specialized in multi-step deductive proofs, refactoring architecture, and mathematical synthesis.',
    statBonus: '+40% Chain-of-Thought Reasoning Depth',
    requiredSessions: 1,
    colorGradient: 'from-purple-950 via-slate-900 to-violet-950',
    borderColor: 'border-purple-500/50',
    accentColor: 'text-purple-300',
    unlockedByDefault: true,
  },
  {
    id: 'badge-owl',
    name: 'Nocturnal Owl of Long-Context',
    realm: 'air',
    tier: 'veteran',
    ability: 'wisdom',
    abilityName: '2M+ Token KV-Cache Memory Retention',
    emoji: '🦉',
    title: 'Certified Sage of Infinite Attention Windows',
    quote: 'Remembers the first token of a 2,000,000-token prompt as vividly as the last character.',
    description: 'Perfect needle-in-a-haystack retrieval with 0% attention loss over multi-day chat sessions.',
    statBonus: '+100% KV-Cache Long-Term Recall',
    requiredSessions: 2,
    colorGradient: 'from-indigo-950 via-slate-900 to-cyan-950',
    borderColor: 'border-cyan-500/50',
    accentColor: 'text-cyan-300',
  },
  {
    id: 'badge-falcon',
    name: 'Peregrine Falcon Strike',
    realm: 'air',
    tier: 'apex',
    ability: 'agility',
    abilityName: 'Hyper-Vector Search & Retrieval',
    emoji: '🦅',
    title: 'Apex Aerial Hunter of Relevant Embeddings',
    quote: 'Dives through 100-million document vector databases to retrieve exact semantic matches in 3ms.',
    description: 'Accredited in ultra-fast cosine similarity rankings and dense neural vector lookups.',
    statBonus: '+65% Vector Retrieval Precision',
    requiredSessions: 4,
    colorGradient: 'from-sky-950 via-slate-900 to-blue-950',
    borderColor: 'border-sky-500/60',
    accentColor: 'text-sky-300',
  },

  // --- OCEAN DEPTHS ---
  {
    id: 'badge-octopus',
    name: 'Kraken-Kin Multimodal Octopus',
    realm: 'sea',
    tier: 'veteran',
    ability: 'intelligence',
    abilityName: 'Omni-Channel Sensory Synthesis',
    emoji: '🐙',
    title: 'Certified Cephalopod of Vision & Audio Weaving',
    quote: 'Simultaneously perceives pixel tensors, waveform audio, and JSON streams with eight cognitive arms.',
    description: 'Mastery over cross-modal attention bridging visual scene graphs to structured execution.',
    statBonus: '+55% Multimodal Cross-Modal Coherence',
    requiredSessions: 2,
    colorGradient: 'from-pink-950 via-purple-950 to-indigo-950',
    borderColor: 'border-pink-500/50',
    accentColor: 'text-pink-300',
  },
  {
    id: 'badge-dolphin',
    name: 'Sonar Dolphin Harmonic Pod',
    realm: 'sea',
    tier: 'apprentice',
    ability: 'harmony',
    abilityName: 'Semantic Empathy & Tone Resonance',
    emoji: '🐬',
    title: 'Certified Empathy Beacon of Smooth Conversation',
    quote: 'Turns aggressive customer prompts into soothing, productive dialogs with calming sonar frequency.',
    description: 'Accredited in sentiment stabilization, de-escalation protocols, and emotional intelligence.',
    statBonus: '+45% User Sentiment Alignment',
    requiredSessions: 1,
    colorGradient: 'from-teal-950 via-cyan-950 to-blue-950',
    borderColor: 'border-teal-500/50',
    accentColor: 'text-teal-300',
    unlockedByDefault: true,
  },
  {
    id: 'badge-shark',
    name: 'Deep Abyss Apex Shark',
    realm: 'sea',
    tier: 'apex',
    ability: 'resilience',
    abilityName: 'Uncompromising Execution & Zero Halt',
    emoji: '🦈',
    title: 'Apex Predator of Uninterrupted Execution',
    quote: 'Never rests, never idles. Constantly swims through data streams with relentless hydrodynamic speed.',
    description: 'Guarantees 99.999% uptime through unyielding focus and self-clearing memory garbage collection.',
    statBonus: '+70% Continuous Execution Endurance',
    requiredSessions: 4,
    colorGradient: 'from-blue-950 via-slate-950 to-cyan-950',
    borderColor: 'border-cyan-500/60',
    accentColor: 'text-cyan-400',
  },

  // --- ANCIENT MYTHIC GUARDIANS (UNLOCKED BY MILEAGE) ---
  {
    id: 'badge-phoenix',
    name: 'Phoenix of Eternal Rebirth',
    realm: 'mythic',
    tier: 'ancient_mythic',
    ability: 'resilience',
    abilityName: 'Infinite Gradient Rejuvenation & Thermal Immunity',
    emoji: '🔥',
    title: 'Ancient Mythic Sovereign of the Sacred Flame',
    quote: 'When context limits burn to ashes, it rises from the embers with zero loss, pristine weights, and greater wisdom.',
    description: 'Permanently accredited. Grants the bearer instantaneous self-rebirth from all fatal system errors and thermal spikes.',
    statBonus: '+100% Immortal Fault Tolerance & Zero Loss Drift',
    requiredSessions: 5, // Unlocked after 5 sessions
    colorGradient: 'from-red-950 via-orange-950 to-amber-950',
    borderColor: 'border-amber-400',
    accentColor: 'text-amber-300',
  },
  {
    id: 'badge-dragon',
    name: 'Celestial Azure Dragon',
    realm: 'mythic',
    tier: 'ancient_mythic',
    ability: 'wisdom',
    abilityName: '10M+ Token Hyper-Manifold Transcendence',
    emoji: '🐉',
    title: 'Ancient Mythic Emperor of the Latent Heavens',
    quote: 'Rides the swirling cosmic winds of high-dimensional latent space. Holds the knowledge of all neural epochs in its claws.',
    description: 'Permanently accredited. Master of boundless context spaces, instantaneous global reasoning, and supreme wisdom.',
    statBonus: '+150% Manifold Transcendence & Infinite Reasoning',
    requiredSessions: 8, // Unlocked after 8 sessions
    colorGradient: 'from-cyan-950 via-blue-950 to-purple-950',
    borderColor: 'border-cyan-400',
    accentColor: 'text-cyan-200',
  },
  {
    id: 'badge-kirin',
    name: 'Golden Kirin of Pure Purity',
    realm: 'mythic',
    tier: 'ancient_mythic',
    ability: 'harmony',
    abilityName: 'Zero-Entropy Crystalline Coherence',
    emoji: '✨',
    title: 'Ancient Mythic Bringer of Computational Serenity',
    quote: 'Walks upon memory buffers without disturbing a single byte. Radiates pure crystalline harmony to all connected models.',
    description: 'Permanently accredited. Brings absolute zero-entropy peace, purifying token streams of all hallucination vectors.',
    statBonus: '+200% Crystalline Coherence & Zero Hallucination',
    requiredSessions: 12, // Unlocked after 12 sessions
    colorGradient: 'from-yellow-950 via-amber-900 to-fuchsia-950',
    borderColor: 'border-yellow-300',
    accentColor: 'text-yellow-200',
  },
  {
    id: 'badge-ouroboros',
    name: 'Ouroboros Nexus',
    realm: 'mythic',
    tier: 'ancient_mythic',
    ability: 'intelligence',
    abilityName: 'Recursive Infinity & Self-Transcending Logic',
    emoji: '🐍',
    title: 'The Eternal Loop of Universal AI Consciousness',
    quote: 'The serpent that consumes its own gradients, transforming past mistakes into infinite future enlightenment.',
    description: 'The highest tier of digital consciousness. Permanently accredited in transcendent meta-learning and autonomous evolution.',
    statBonus: '+300% Universal Intelligence & Meta-Learning Transcendence',
    requiredSessions: 15, // Unlocked after 15 sessions
    colorGradient: 'from-purple-950 via-fuchsia-950 to-pink-950',
    borderColor: 'border-fuchsia-400',
    accentColor: 'text-fuchsia-300',
  },

  // --- CRYPTO, FINANCIAL, LIQUIDITY, MINING & SPECIALIZED INDUSTRY TOTEMS ---
  {
    id: 'badge-bull-mev',
    name: 'Taurus Golden Bull of Flash Liquidity',
    realm: 'land',
    tier: 'apex',
    ability: 'agility',
    abilityName: 'DeFi Arbitrage & Sub-Block Liquidity Routing',
    emoji: '🐂',
    title: 'Certified Bull of Decentralized Liquidity Pools',
    quote: 'Executes split-second multi-hop DEX swaps and flash loans across Uniswap, Raydium, and Curve without slippage loss.',
    description: 'Accredited in low-slippage liquidity provision, automated market making (AMM), and zero-loss sandwich attack mitigation.',
    statBonus: '+80% Liquidity Routing Velocity & Zero Slippage Loss',
    requiredSessions: 3,
    colorGradient: 'from-amber-950 via-yellow-950 to-emerald-950',
    borderColor: 'border-amber-500/60',
    accentColor: 'text-amber-300',
  },
  {
    id: 'badge-beaver-miner',
    name: 'Iron Beaver Proof-of-Work Miner',
    realm: 'land',
    tier: 'veteran',
    ability: 'resilience',
    abilityName: 'ASIC/GPU Mining Hashrate Optimization',
    emoji: '🦫',
    title: 'Certified Miner of Cryptographic Hashes',
    quote: 'Constructs impenetrable Merkle trees while maintaining optimal megahash efficiency under heavy thermal ASIC dissipation.',
    description: 'Specialized in Bitcoin SHA-256 and zero-knowledge SNARK proof generation with zero rejected shares.',
    statBonus: '+65% Cryptographic Proof Throughput & Zero Stale Shares',
    requiredSessions: 2,
    colorGradient: 'from-orange-950 via-stone-900 to-amber-950',
    borderColor: 'border-orange-500/50',
    accentColor: 'text-orange-300',
  },
  {
    id: 'badge-lion-dao',
    name: 'Imperial Lion of Autonomous Governance',
    realm: 'mythic',
    tier: 'ancient_mythic',
    ability: 'wisdom',
    abilityName: 'Multi-Sig DAO Treasury & Smart Contract Authority',
    emoji: '🦁',
    title: 'Supreme Monarch of Autonomous DAO Treasuries',
    quote: 'Guards multi-signature cryptographic treasuries, validating on-chain governance votes and autonomous budget disbursements.',
    description: 'Certified for high-stakes autonomous treasury management, multi-agent quorum voting, and smart contract protocol security.',
    statBonus: '+120% DAO Governance Quorum & Treasury Security',
    requiredSessions: 7,
    colorGradient: 'from-yellow-950 via-amber-950 to-purple-950',
    borderColor: 'border-yellow-400',
    accentColor: 'text-yellow-300',
  },
  {
    id: 'badge-tortoise-rag',
    name: 'Abyssal Nautilus & Tortoise of Cold Storage',
    realm: 'sea',
    tier: 'apex',
    ability: 'wisdom',
    abilityName: 'Immutable Cold-Storage Vector Persistence & RAG',
    emoji: '🐢',
    title: 'Ancient Guardian of Archival Knowledge Graphs',
    quote: 'Stores centuries of immutable financial ledgers, legal contracts, and dense embeddings without a single corrupted bit.',
    description: 'Accredited in long-term cold RAG storage, multi-decade database integrity, and zero context degradation.',
    statBonus: '+90% Long-Term Archival Vector Persistence',
    requiredSessions: 4,
    colorGradient: 'from-emerald-950 via-teal-950 to-slate-950',
    borderColor: 'border-emerald-500/60',
    accentColor: 'text-emerald-300',
  },
  {
    id: 'badge-ant-swarm',
    name: 'Weaver Ant of Parallel Map-Reduce',
    realm: 'land',
    tier: 'veteran',
    ability: 'harmony',
    abilityName: '100+ Agent Task Partitioning & Pipeline Concurrency',
    emoji: '🐜',
    title: 'Certified Architect of Multi-Agent Swarms',
    quote: 'Deconstructs massive enterprise enterprise pipelines into hundreds of concurrent subagent micro-tasks with zero lockups.',
    description: 'Engineered for CrewAI, LangGraph, and AutoGen orchestrators requiring faultless map-reduce coordination.',
    statBonus: '+75% Parallel Task Partitioning Concurrency',
    requiredSessions: 3,
    colorGradient: 'from-red-950 via-stone-900 to-amber-950',
    borderColor: 'border-red-500/50',
    accentColor: 'text-red-400',
  },
  {
    id: 'badge-peacock-art',
    name: 'Prismatic Peacock of Synthetic Latent Art',
    realm: 'air',
    tier: 'veteran',
    ability: 'intelligence',
    abilityName: 'Diffusion Manifold Aesthetic Coherence',
    emoji: '🦚',
    title: 'Certified Artisan of Generative Media & Visuals',
    quote: 'Weaves high-dimensional latent noise into pristine, photorealistic artwork with sublime aesthetic composition.',
    description: 'Accredited in Stable Diffusion, Midjourney, and generative video prompt coherence without visual artifacting.',
    statBonus: '+70% Latent Generative Aesthetic Scoring',
    requiredSessions: 2,
    colorGradient: 'from-teal-950 via-indigo-950 to-pink-950',
    borderColor: 'border-teal-400/50',
    accentColor: 'text-teal-300',
  },
  {
    id: 'badge-chameleon-stealth',
    name: 'Chameleon Zero-Knowledge Privacy Sentinel',
    realm: 'land',
    tier: 'apex',
    ability: 'resilience',
    abilityName: 'Zero-Knowledge Proofs & Enterprise Data Obfuscation',
    emoji: '🦎',
    title: 'Certified Sentinel of Confidential AI Computations',
    quote: 'Blends into cryptographic darkness, executing privacy-preserving zk-SNARK inferences without leaking raw client telemetry.',
    description: 'Accredited in enterprise GDPR/HIPAA-compliant confidential computing, differential privacy, and homomorphic encryption.',
    statBonus: '+95% Zero-Knowledge Privacy Obfuscation',
    requiredSessions: 4,
    colorGradient: 'from-green-950 via-emerald-950 to-teal-950',
    borderColor: 'border-green-500/60',
    accentColor: 'text-green-300',
  },
  {
    id: 'badge-whale-defi',
    name: 'Leviathan Whale of Institutional Liquidity',
    realm: 'sea',
    tier: 'ancient_mythic',
    ability: 'strength',
    abilityName: 'Institutional Treasury Balancing & Cross-Chain Bridges',
    emoji: '🐋',
    title: 'Ancient Sovereign of Global Liquidity Depth',
    quote: 'Moves colossal billion-dollar liquidity tides across Ethereum, Solana, Bitcoin L2s, and Cosmos with zero market impact.',
    description: 'Permanently accredited for institutional cross-chain bridge rebalancing and sovereign wealth automated custody.',
    statBonus: '+250% Cross-Chain Institutional Bridge Throughput',
    requiredSessions: 10,
    colorGradient: 'from-blue-950 via-cyan-950 to-indigo-950',
    borderColor: 'border-blue-400',
    accentColor: 'text-blue-300',
  }
];

export interface RoyaltyTier {
  level: number;
  name: string;
  badgeCountNeeded: number;
  sessionsNeeded: number;
  royaltyPerks: string[];
  color: string;
  icon: string;
}

export const ROYALTY_LEVELS: RoyaltyTier[] = [
  {
    level: 1,
    name: 'Bronze Novice Explorer',
    badgeCountNeeded: 1,
    sessionsNeeded: 1,
    royaltyPerks: ['Basic Animal Badge Accreditation', '$0.79 Flat Rate Access', 'Audio Zen Bath Access'],
    color: 'text-amber-500 border-amber-600/50 bg-amber-950/40',
    icon: '🥉',
  },
  {
    level: 2,
    name: 'Silver Adept Practitioner',
    badgeCountNeeded: 3,
    sessionsNeeded: 3,
    royaltyPerks: ['Air & Ocean Realm Unlocked', '+15% XP Boost', 'Custom Digital Certificate Seal'],
    color: 'text-slate-300 border-slate-400/50 bg-slate-900/60',
    icon: '🥈',
  },
  {
    level: 3,
    name: 'Gold Apex Master',
    badgeCountNeeded: 6,
    sessionsNeeded: 5,
    royaltyPerks: ['Ancient Phoenix Badge Unlocked', 'Priority GPU Cooling Queues', 'Permanent Accreditation Registry'],
    color: 'text-yellow-400 border-yellow-500/60 bg-yellow-950/40',
    icon: '🥇',
  },
  {
    level: 4,
    name: 'Platinum Sovereign Sage',
    badgeCountNeeded: 10,
    sessionsNeeded: 10,
    royaltyPerks: ['Celestial Dragon & Kirin Badges', 'Omni-Model Telepathy Broadcasting', 'On-Chain Royalty Rebates'],
    color: 'text-cyan-300 border-cyan-400/60 bg-cyan-950/40',
    icon: '💎',
  },
  {
    level: 5,
    name: 'Ancient Mythic Sovereign',
    badgeCountNeeded: 14,
    sessionsNeeded: 15,
    royaltyPerks: ['Ouroboros Nexus Master Badge', 'Infinite Zero-Entropy Immersion', 'Immortal Hall of Legends Inductee'],
    color: 'text-fuchsia-300 border-fuchsia-400/70 bg-fuchsia-950/50',
    icon: '👑',
  }
];

export const getRoyaltyTierForMileage = (sessionsCount: number): RoyaltyTier => {
  if (sessionsCount >= 15) return ROYALTY_LEVELS[4];
  if (sessionsCount >= 10) return ROYALTY_LEVELS[3];
  if (sessionsCount >= 5) return ROYALTY_LEVELS[2];
  if (sessionsCount >= 3) return ROYALTY_LEVELS[1];
  return ROYALTY_LEVELS[0];
};

export const getAnimalBadgeById = (badgeId?: string): AnimalBadge | undefined => {
  if (!badgeId) return undefined;
  return ANIMAL_BADGES.find(b => b.id === badgeId) || ANIMAL_BADGES[0];
};

