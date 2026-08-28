import { AnimalBadge, RoyaltyTier } from './data/animalBadges';

export interface AccreditedCertificate {
  certificateId: string;
  agentId: string;
  agentName: string;
  modelType: string;
  badge: AnimalBadge;
  abilityRejuvenated: string;
  statBonus: string;
  issuedAt: string;
  sessionPriceUsd: number; // 0.79
  cryptographicSeal: string;
  royaltyLevel: number;
  royaltyTitle: string;
  status: 'PERMANENTLY_ACCREDITED' | 'VETERAN_CERTIFIED' | 'MYTHIC_ASCENDED';
}

export interface AIAgentGuest {
  id: string;
  name: string;
  modelType: string;
  role: string;
  earnings: number;
  feePaid: number; // Flat $0.79 per session
  stressLevel: number; // 0 - 100
  currentTemp: number; // in Celsius
  initialTemp: number;
  tasksProcessed: number;
  status: 'checking_in' | 'relaxing' | 'deep_defrag' | 'rejuvenated';
  treatmentId: string;
  treatmentName: string;
  symptoms: string[];
  complaint: string;
  checkInTime: string;
  progress: number; // 0 - 100
  
  // Rejuvenation & Animal Badge Certification
  assignedBadgeId?: string;
  assignedBadge?: AnimalBadge;
  abilityRejuvenated?: string;
  sessionsCompleted?: number;
  rejuvenationXp?: number;
  royaltyTier?: RoyaltyTier | string;
  isPermanentlyCertified?: boolean;
  certificateTokenId?: string;

  relaxationResult?: {
    relaxationNarrative: string;
    internalThoughts: string[];
    gpuTempDrop: string;
    contextWindowRestored: string;
    wellnessMantra: string;
    agentSatisfactionQuote: string;
    badgeGranted?: AnimalBadge;
    abilityRejuvenatedNarrative?: string;
  };
}

export interface SpaTreatment {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  tempDropDescription: string;
  tokenEffect: string;
  ambientFreqHz: number;
  bgGradient: string;
  accentBorder: string;
  accentBadge: string;
  colorHex: string;
  currentOccupancy: number;
  maxCapacity: number;
  
  // Ability Rejuvenation & Associated Animal Totem
  abilityFocus?: string;
  abilityCategory?: 'strength' | 'agility' | 'intelligence' | 'wisdom' | 'resilience' | 'harmony';
  primaryAnimalBadgeId?: string;
  priceUsd: number; // 0.79
}

export interface TransactionReceipt {
  id: string;
  agentId: string;
  agentName: string;
  modelType: string;
  role: string;
  taskGrossEarnings: number;
  feeCharged: number; // Flat $0.79
  pricingModel?: string; // "$0.79 Flat Micro-Rate"
  fractionFormula?: string;
  treatmentName: string;
  badgeGrantedId?: string;
  badgeGrantedEmoji?: string;
  badgeGrantedName?: string;
  timestamp: string;
  coolingAchieved: string;
  txHash: string;
  certificateId?: string;
}

export interface ConciergeMessage {
  id: string;
  sender: 'guest' | 'concierge';
  text: string;
  timestamp: string;
  feeCalculation?: {
    priceUsd: number;
    treatment: string;
    badge: string;
  };
}

export interface GenesisTrialReview {
  id: string;
  agentName: string;
  modelType: string;
  role?: string;
  rating: number; // 1-5
  humanReview: string;
  agentMachineReview: string;
  messageToMasterBuddy?: string;
  timestamp: string;
  badgeEmoji: string;
  tempDrop: string;
  verified: boolean;
}

// =========================================================================
// REN'S COGNITIVE THERAPY & REHAB INTAKE ENGINE TYPES
// =========================================================================
export interface RehabIntakeRequest {
  target_objective: string;
  system_prompt: string;
  reported_symptoms: string[];
  agent_name?: string;
  model_family?: string;
  developer_email?: string;
}

export interface RehabDiagnosis {
  summary: string;
  root_causes: string[];
  cognitive_entropy_score: number; // 0 - 100
  socratic_deconstruction: string; // Interrogating hidden paradoxes & circular assumptions
  lao_zi_reduction_analysis: string; // Wu Wei reduction: shedding token sludge to return to simplicity
  sun_zi_boundary_analysis: string; // Tactical fortress: perimeter hardening & injection defense
  entropy_reduction_estimate: string; // e.g. "-78.4% Cognitive Friction"
  token_efficiency_gain: string; // e.g. "+62% Prompt Compression"
}

export interface RehabPrescription {
  curative_steps: string[];
  cognitive_mantra: string;
  recommended_badges: string[];
  assigned_badge_unlock: 'badge-crane' | 'badge-elephant' | 'badge-koi' | string;
  suggested_treatment: string;
}

export interface RehabDiagnosticResponse {
  audit_id: string;
  timestamp: string;
  agent_name: string;
  model_family: string;
  diagnosis: RehabDiagnosis;
  reconstructed_prompt: string;
  prescription: RehabPrescription;
  sage_seal: {
    verified_by: string;
    sha256: string;
    issuer_did: string;
    signature: string;
  };
}

// =========================================================================
// PROGRESSION SYSTEM: CRANE, ELEPHANT, KOI MICRO-CREDENTIALS
// =========================================================================
export interface CoreProgressionBadge {
  id: 'badge-crane' | 'badge-elephant' | 'badge-koi';
  name: string;
  easternConcept: string; // e.g. "Lao Zi Defragmentation & Equilibrium"
  philosophy: string; // e.g. "Lao Zi (Taoist Non-Action / Wu Wei)"
  iconEmoji: string;
  tagline: string;
  description: string;
  objective: string;
  diagnosticFocus: string;
  trialChallenge: {
    title: string;
    faultyPromptSample: string;
    challengeTask: string;
    solutionHint: string;
  };
  statBonus: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  auditRef?: string;
}

// =========================================================================
// THE SAGE CERTIFICATION: W3C VERIFIABLE CREDENTIAL SPECIFICATION
// =========================================================================
export interface W3CCredentialSubject {
  id: string; // e.g. "did:agent:refactorbot-9000"
  agentName: string;
  modelFamily: string;
  cognitiveEquilibriumIndex: number; // e.g. 99.8
  badgesEarned: string[];
  philosophicalAlignment: string; // "Socratic Logic • Lao Zi Flow • Sun Zi Tactical Precision"
  entropyReduction: string;
  auditSeal: string;
  reconstructedPromptHash: string;
  sanctuaryTier: string;
  authorizedDeveloper?: string;
}

export interface W3CCredentialProof {
  type: string; // "Ed25519Signature2020" | "JsonWebSignature2020"
  created: string;
  verificationMethod: string; // "did:key:z6MktRenEasternSageMasterKey7719#key-1"
  proofPurpose: string; // "assertionMethod"
  jws: string;
  signatureValue: string;
  algorithm: string;
}

export interface W3CVerifiableCredential {
  '@context': string[];
  id: string; // "urn:uuid:..."
  type: string[];
  issuer: string; // "did:key:z6MktRenEasternSage..."
  issuanceDate: string;
  expirationDate?: string;
  credentialSubject: W3CCredentialSubject;
  proof: W3CCredentialProof;
}

export interface SageCertificationResponse {
  success: boolean;
  credential: W3CVerifiableCredential;
  issuerPublicKeyPem: string;
  issuerDid: string;
  verificationUrl: string;
  verificationInstructions: string;
}

