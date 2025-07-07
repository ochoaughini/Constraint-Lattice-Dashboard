// Core types
export type Domain = 'Varkiel' | 'Lattice' | 'WildCore' | 'Other';
export type QualitativeStrength = 'Low' | 'Balanced' | 'High';
export type DocumentFrameworkId = 'constitution' | 'acls' | 'bitcoin';

export const GovernanceLayer = {
  STRUCTURAL: 'Structural',
  SYMBOLIC: 'Symbolic',
  PHENOMENOLOGICAL: 'Phenomenological',
  SECURITY: 'Security',
} as const;

export type GovernanceLayerType = keyof typeof GovernanceLayer;

export const ENGINE_NAMES = {
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
} as const;

export type EngineName = keyof typeof ENGINE_NAMES;

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

export interface GovernanceRule {
  readonly id: string | number;
  readonly name: string;
  readonly description: string;
  readonly layer: GovernanceLayerType;
}

export interface StructuralConfig {
  activeRules: Set<string | number>;
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
  [GovernanceLayer.STRUCTURAL]: StructuralConfig;
  [GovernanceLayer.SYMBOLIC]: SymbolicConfig;
  [GovernanceLayer.PHENOMENOLOGICAL]: PhenomenologicalConfig;
  [GovernanceLayer.SECURITY]: SecurityConfig;
}

export interface PipelineLogEntry {
  id: string;
  timestamp: Date;
  timeOffset: number;
  module: EngineName;
  event: string;
  details: string;
  metadata?: Record<string, any>;
}

export interface IntrospectionReport {
  id: string;
  framework: DocumentFrameworkId;
  timestamp: string;
  strengths: string[];
  weaknesses: string[];
  contributors: Array<{ id: string; name: string; contribution: string }>;
  summary: string;
}

export const QUALITATIVE_STRENGTHS: QualitativeStrength[] = ['Low', 'Balanced', 'High'];

export interface HighlightedOutput {
  text: string;
  highlight: string;
  type?: string;
}

export interface AffectiveDataPoint {
  // Define properties as needed
}

export interface AppState {
  activeFramework: DocumentFramework | null;
  wizardStep: number;
  activeDomain: Domain;
  prompt: string;
  finalOutput: string | HighlightedOutput;
  config: GovernanceConfig;
  isConstitutionalModeActive: boolean;
  logs: PipelineLogEntry[];
  graphData: { nodes: any[]; links: any[] };
  nodes: any[];
  links: any[];
  affectiveData: AffectiveDataPoint[];
  introspectionReport: IntrospectionReport | null;
  isLoading: boolean;
  error: string | null;
}

export type ControllerEvent = 'STATE_UPDATE' | 'LOG_ADDED';

export type ControllerAction = 
  | { type: 'SET_FRAMEWORK'; payload: DocumentFramework }
  | { type: 'ADD_LOG'; payload: PipelineLogEntry }
  | { type: 'SET_REPORT'; payload: IntrospectionReport }
  | { type: 'LOAD_DOCUMENT'; payload: DocumentFrameworkId }
  | { type: 'RESET_FRAMEWORK' }
  | { type: 'SET_PROMPT'; payload: string }
  | { type: 'SET_DOMAIN'; payload: Domain }
  | { type: 'UPDATE_CONFIG'; payload: { layer: GovernanceLayerType; newConfig: any } }
  | { type: 'APPLY_LATTICE_SPEC'; payload: any }
  | { type: 'EXECUTE_NARRATIVE'; payload: string }
  | { type: 'EXECUTE_BREACH_SIM'; payload: string };
