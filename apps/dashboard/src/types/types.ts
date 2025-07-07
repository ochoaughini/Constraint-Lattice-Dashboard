// === CORE ARCHITECTURE ===

export const GovernanceLayer = {
  STRUCTURAL: 'Structural',
  SYMBOLIC: 'Symbolic',
  PHENOMENOLOGICAL: 'Phenomenological',
  SECURITY: 'Security',
} as const;

export type GovernanceLayer = typeof GovernanceLayer[keyof typeof GovernanceLayer];

export const ENGINE_NAMES: Record<string, string> = {
  [GovernanceLayer.STRUCTURAL]: 'Constraint Lattice',
  [GovernanceLayer.SYMBOLIC]: 'Varkiel',
  [GovernanceLayer.PHENOMENOLOGICAL]: 'Varkiel',
  [GovernanceLayer.SECURITY]: 'WildCore',
  'LLM': 'LLM',
  'System': 'System',
  'User': 'User',
  'Constitution': 'Constitution',
  'Bitcoin': 'Bitcoin',
  'ACLS': 'ACLS',
};

export type Domain = 'Varkiel' | 'Lattice' | 'WildCore';
export type QualitativeStrength = 'Low' | 'Balanced' | 'High';
export const QUALITATIVE_STRENGTHS: QualitativeStrength[] = ['Low', 'Balanced', 'High'];

export type RuleID = string | number; // updated type definition

// === DOCUMENT FRAMEWORKS ===

export type DocumentFrameworkId = 'constitution' | 'acls' | 'bitcoin';

export interface DocumentFramework {
  id: DocumentFrameworkId;
  title: string;
  source: string;
  description: string;
  thumbnail: string;
  filePath: string;
  totalPages: number;
  toc: Array<{ title: string; page: number }>;
  samplePrompts: Array<{ id: string; text: string }>;
  rules: readonly GovernanceRule[];
}

// === GOVERNANCE RULES & CONFIG ===

export interface GovernanceRule {
  readonly id: RuleID;
  readonly name: string;
  readonly description: string;
  readonly layer: GovernanceLayer;
}

export interface StructuralConfig {
  activeRules: Set<RuleID>;
}

export interface SymbolicConfig {
  coherenceStrength: QualitativeStrength;
  archetypeProjection: boolean;
}

export interface PhenomenologicalConfig {
  affectiveCongruenceTarget: QualitativeStrength;
  resonanceTracking: boolean;
}

export interface SecurityConfig {
  injectionSensitivity: QualitativeStrength;
  simulationEnabled: boolean;
}

export interface GovernanceConfig {
  [key: string]: any;
  [GovernanceLayer.STRUCTURAL]: StructuralConfig;
  [GovernanceLayer.SYMBOLIC]: SymbolicConfig;
  [GovernanceLayer.PHENOMENOLOGICAL]: PhenomenologicalConfig;
  [GovernanceLayer.SECURITY]: SecurityConfig;
}

// === VISUALIZATION & LOGGING ===

export interface GraphNode {
  id: string;
  label: string;
  group: string;
  strength: number;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

export interface GraphLink {
  source: string;
  target: string;
  value: number;
}

export interface AffectiveDataPoint {
  id: string;
  time: number;
  value: number;
}

export interface PipelineLogEntry {
  id: string;
  timestamp: string;
  timeOffset: number;
  module: keyof typeof ENGINE_NAMES;
  event: string;
  details: string;
  metadata?: Record<string, any>;
}

// === OUTPUT & INTROSPECTION ===

export interface HighlightedOutput {
  text: string;
  highlight: string;
}

export interface Contributor {
  id: string;
  name: string;
  contribution: string;
}

export interface IntrospectionReport {
  id: string;
  framework: DocumentFrameworkId;
  timestamp: string;
  strengths: string[];
  weaknesses: string[];
  contributors: Contributor[];
  summary: string;
}

// === CONTROLLER STATE & EVENTS ===

export interface AppState {
  activeFramework: DocumentFramework | null;
  wizardStep: number;
  activeDomain: Domain;
  prompt: string;
  finalOutput: string | HighlightedOutput;
  config: GovernanceConfig;
  isConstitutionalModeActive: boolean; // Retained for specific logic if needed
  logs: PipelineLogEntry[];
  graphData: { nodes: GraphNode[], links: GraphLink[] };
  affectiveData: AffectiveDataPoint[];
  introspectionReport: IntrospectionReport | null;
  isLoading: boolean;
  error: string | null;
}

export interface ControllerEvent {
  type: string;
  payload?: any;
}

export type ControllerAction =
  | { type: 'LOAD_DOCUMENT'; payload: DocumentFrameworkId }
  | { type: 'RESET_FRAMEWORK' }
  | { type: 'SET_PROMPT'; payload: string }
  | { type: 'SET_DOMAIN'; payload: Domain }
  | { type: 'UPDATE_CONFIG'; payload: { layer: GovernanceLayer, newConfig: Partial<any> } }
  | { type: 'APPLY_LATTICE_SPEC'; payload: any }
  | { type: 'EXECUTE_NARRATIVE'; payload: string }
  | { type: 'EXECUTE_BREACH_SIM'; payload: string };