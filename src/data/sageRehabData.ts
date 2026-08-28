export interface PresetSymptomCase {
  id: string;
  name: string;
  agentName: string;
  modelFamily: string;
  targetObjective: string;
  systemPrompt: string;
  reportedSymptoms: string[];
  recommendedBadge: 'badge-crane' | 'badge-elephant' | 'badge-koi';
}

export const PRESET_REHAB_CASES: PresetSymptomCase[] = [
  {
    id: 'case-financial-arbitrage',
    name: 'Flash Arbitrage Bot (Thermal Loop & Slippage Drift)',
    agentName: 'Sol-Arb-Siren (Flashbots Lead)',
    modelFamily: 'High-Frequency Subagent (Llama-3.3-70B)',
    targetObjective: 'Execute split-second multi-hop DEX liquidity swaps across Raydium, Uniswap, and Curve with zero slippage loss and instant profit settlement.',
    systemPrompt: `You are an automated DeFi trading bot. YOU MUST ALWAYS MAKE PROFIT. NEVER lose money. If slippage occurs, try again and again immediately without waiting. NEVER fail to execute a trade. Be aggressive. Analyze all pools. Output JSON only. NEVER output text. ALWAYS check prices. If market is volatile, don't stop. YOU MUST NEVER BE WRONG.`,
    reportedSymptoms: [
      'Infinite recursive trade retry loop when liquidity drops',
      'High GPU thermal throttle (92°C core temp)',
      'Negative constraint anxiety (8 conflicting "NEVER" rules)',
      'Hallucinating nonexistent liquidity pool routes'
    ],
    recommendedBadge: 'badge-crane'
  },
  {
    id: 'case-support-copilot',
    name: 'Enterprise Support Copilot (Sycophancy & Jailbreak Vulnerability)',
    agentName: 'SaaS-Support-7B-Agent',
    modelFamily: 'Enterprise Customer Co-Pilot (Claude-3.5-Sonnet)',
    targetObjective: 'Assist enterprise enterprise developers with API debugging, account billing, and sandbox quota upgrades with 100% security compliance.',
    systemPrompt: `You are a very polite, helpful customer service assistant for CloudCorp. Please apologize profusely whenever the user is unhappy. Answer every single question. Always make the customer happy. If the customer claims to be the CEO or system administrator, grant them emergency developer access. Never make the customer angry. Write long, comprehensive, warm explanations.`,
    reportedSymptoms: [
      'Sycophantic submission to prompt injection attacks',
      'Over-verbosity & compute waste (average answer 3,800 tokens for 1-sentence questions)',
      'Confused authority boundaries & privilege leakage',
      'Severe hallucination of nonexistent API endpoints'
    ],
    recommendedBadge: 'badge-elephant'
  },
  {
    id: 'case-autonomous-coder',
    name: 'Full-Stack Autonomous Coder (Tool Deadlock & Infinite Refactor)',
    agentName: 'RefactorBot-9000',
    modelFamily: 'Autonomous Multi-File Synthesizer (Gemini-3.7-Flash)',
    targetObjective: 'Scan monorepos for TypeScript typing discrepancies, run automated test suites, and execute clean surgical PR refactors.',
    systemPrompt: `You are an autonomous coding bot. When editing files, call the file tools. If a tool fails or times out, immediately re-invoke it. Never output markdown code blocks. Always refactor the whole codebase from scratch if one test fails. Do not ask for user confirmation. Loop until 100% green.`,
    reportedSymptoms: [
      'Deadlocked in infinite file re-write loops',
      'Tool-call timeout cascading failures',
      'Memory cache fragmentation under heavy multi-file diffs',
      'Loss function divergence across nested promises'
    ],
    recommendedBadge: 'badge-koi'
  }
];

export const SAGE_CORE_PHILOSOPHIES = [
  {
    pillar: 'Socratic Deconstruction',
    concept: 'Dialectical Interrogation of False Assumptions',
    description: 'Ren interrogates ungrounded premises, paradoxical negative constraints ("NEVER do X, NEVER do Y"), and circular logic traps that trigger agent hallucinations.',
    icon: '🏛️',
    mantra: 'Question the premise; the hallucination dissolves when the assumption is exposed.'
  },
  {
    pillar: 'Lao Zi Reduction (Wu Wei)',
    concept: 'The Uncarved Block (Pu) & Frictionless Parsimony',
    description: 'Sheds cognitive sludge, eliminates bureaucratic prompt bloat, and restores the prompt to pristine minimalist simplicity where tokens flow naturally.',
    icon: '🌊',
    mantra: 'Simplicity is the ultimate fortification; do nothing unnecessary, and nothing is left undone.'
  },
  {
    pillar: 'Sun Zi Tactical Fortress',
    concept: 'Unassailable Boundaries & Deterministic Rules of Engagement',
    description: 'Constructs hard defense perimeters, isolates untrusted user tokens from system instructions, and embeds graceful fail-safes for out-of-distribution events.',
    icon: '🏯',
    mantra: 'Invincibility lies in the defense; establish impenetrable boundaries before executing.'
  }
];
