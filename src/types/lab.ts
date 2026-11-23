export type LabRouteId =
  | 'home'
  | 'career-studio'
  | 'foundations'
  | 'ml'
  | 'dl'
  | 'nlp'
  | 'genai'
  | 'agentic'
  | 'mlops'
  | 'projects';

export interface LessonStep {
  id: string;
  title: string;
  theory: string;
  practical: string;
  demonstrates: string;
  keyTakeaway: string;
}

export interface ModuleMeta {
  id: LabRouteId;
  order: number;
  title: string;
  shortTitle: string;
  category: string;
  duration: string;
  summary: string;
  accentColor: 'cyan' | 'blue' | 'purple';
  totalSteps: number;
  featuredExperiment: string;
}

export interface LearningProgress {
  completedSteps: Record<string, number[]>;
  lastVisited: LabRouteId;
}

export interface ScatterPoint {
  id: number;
  x: number;
  y: number;
  label?: 0 | 1;
  cluster?: number;
}

export interface TokenAnalysis {
  raw: string;
  normalized: string;
  isStopword: boolean;
  stem: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  weight: number;
}

export interface SentimentResult {
  tokens: TokenAnalysis[];
  score: number; // -1 to +1
  label: 'Positive' | 'Neutral' | 'Negative';
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
}

export interface DocumentChunk {
  id: string;
  title: string;
  source: string;
  content: string;
  vector: [number, number];
  keywords: string[];
}

export interface RagSearchResult {
  chunk: DocumentChunk;
  similarity: number;
}

export interface AgentStepItem {
  id: string;
  phase: 'Goal' | 'Plan' | 'Reason' | 'Tool Call' | 'Observation' | 'Response';
  actor: string;
  summary: string;
  detail: string;
}

export interface StudioProjectMeta {
  id: 'churn' | 'sentiment' | 'doc-assistant' | 'vision' | 'business-assistant';
  title: string;
  domain: string;
  summary: string;
  demonstrates: string;
}
