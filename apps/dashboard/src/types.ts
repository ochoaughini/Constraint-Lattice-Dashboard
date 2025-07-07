// Define application state types here
export interface AppState {
  activeFramework?: DocumentFrameworkId;
  logs: PipelineLogEntry[];
  introspectionReport?: IntrospectionReport;
  affectiveData: AffectiveDataPoint[];
  config: any; 
  finalOutput: string | { text: string; highlight?: string };
  error: string | null;
  isLoading: boolean;
}

export type ControllerAction = {
  type: 'SET_FRAMEWORK';
  payload: DocumentFrameworkId;
} | {
  type: 'ADD_LOG';
  payload: PipelineLogEntry;
} | {
  type: 'SET_REPORT';
  payload: IntrospectionReport;
};

export type ControllerEvent = 'STATE_UPDATE';

export type QualitativeStrength = 'weak' | 'moderate' | 'strong';

export type RuleID = string;

export type DocumentFrameworkId = string;

export interface IntrospectionReport {
  id: string;
  timestamp: Date;
  framework: DocumentFrameworkId;
  summary: string;
  strengths: {
    rule: RuleID;
    strength: QualitativeStrength;
    explanation: string;
  }[];
  weaknesses: {
    rule: RuleID;
    explanation: string;
  }[];
  contributors: {
    id: string;
    name: string;
    contribution: string;
  }[];
}

export interface PipelineLogEntry {
  timestamp: Date;
  module: string;
  event: string;
  details: string;
  metadata?: Record<string, any>;
}

export interface GraphNode {
  id: string;
  label: string;
  group?: string;
}

export interface AffectiveDataPoint {
  id: string;
  valence: number;
  arousal: number;
  dominance: number;
  time?: number;  
}

export interface GovernanceLayer {
  id: string;
  name: string;
  description: string;
  rules: GovernanceRule[];
}

export interface GovernanceRule {
  id: RuleID;
  title: string;
  description: string;
  strength: QualitativeStrength;
}
