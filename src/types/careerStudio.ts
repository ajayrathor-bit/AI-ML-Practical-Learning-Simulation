export type ProfessionId =
  | 'banking-finance'
  | 'hr-recruitment'
  | 'sales-bd'
  | 'marketing-digital'
  | 'it-software'
  | 'healthcare-admin'
  | 'operations-supply'
  | 'education-training'
  | 'manufacturing-prod'
  | 'retail-ecommerce'
  | 'project-management'
  | 'customer-support'
  | 'business-management'
  | 'data-analytics'
  | 'other-backgrounds';

export type ProjectLabId =
  | 'resume-screening'
  | 'sales-lead-scoring'
  | 'banking-fraud'
  | 'healthcare-analytics'
  | 'inventory-forecasting'
  | 'document-intelligence'
  | 'customer-support-agent'
  | 'business-intelligence'
  | 'code-assistant'
  | 'marketing-intelligence';

export type TechExplainerId =
  | 'python'
  | 'sql'
  | 'statistics'
  | 'data-analysis'
  | 'machine-learning'
  | 'deep-learning'
  | 'nlp'
  | 'computer-vision'
  | 'generative-ai'
  | 'llm'
  | 'predictive-analytics'
  | 'data-visualization'
  | 'model-evaluation'
  | 'ai-automation';

export interface WorkflowStepComparison {
  stepNumber: number;
  title: string;
  beforeAction: string;
  beforePainPoint: string;
  afterAction: string;
  afterSystemNote: string;
  humanOversightRole: string;
}

export interface TaskResponsibility {
  id: string;
  title: string;
  summary: string;
  currentManualProcess: string;
  howAiAssists: string;
  aiTechnologies: string[];
  toolsUsed: string[];
  workflow: {
    input: string;
    aiProcessing: string;
    mlOrAutomation: string;
    output: string;
    humanReview: string;
  };
  expectedBenefits: string[];
  skillsRequired: string[];
}

export interface SkillGapMetric {
  skillArea: string;
  currentBaseline: number;
  targetAiReady: number;
}

export interface CareerPathwayOption {
  roleTitle: string;
  transitionFit: string;
  exampleFocus: string;
}

export interface ProfessionProfile {
  id: ProfessionId;
  title: string;
  shortTitle: string;
  sectorTag: string;
  shortDescription: string;
  iconKey: string;
  accentColor: 'cyan' | 'blue' | 'purple';
  dailyWorkflowExampleTitle: string;
  humanOversightStatement: string;
  responsibilities: TaskResponsibility[];
  beforeAfterSteps: WorkflowStepComparison[];
  recommendedProjects: ProjectLabId[];
  existingStrengths: string[];
  newAiSkills: string[];
  skillGapData: SkillGapMetric[];
  possiblePathways: CareerPathwayOption[];
}

export interface PipelineStageInfo {
  id: string;
  order: number;
  label: string;
  shortRole: string;
  description: string;
  exampleByRole: string;
  dataArtifact: string;
}

export interface TechnologyExplainer {
  id: TechExplainerId;
  name: string;
  category: 'Core Foundations' | 'Applied AI/ML' | 'GenAI & Engineering';
  whatItDoes: string;
  whyUsed: string;
  projectContribution: string;
  whatLearnerNeeds: string;
  usedInProjects: ProjectLabId[];
}

export interface ProjectMeta {
  id: ProjectLabId;
  order: number;
  title: string;
  industryTag: string;
  summary: string;
  technologies: TechExplainerId[];
  humanCheckpoint: string;
}

export interface CustomUserProfile {
  designation: string;
  industry: ProfessionId;
  yearsExperience: number;
  keyResponsibilities: string;
  timeConsumingTasks: string;
  existingTechnicalSkills: string[];
  careerObjective: 'upskill-current-role' | 'lead-ai-projects' | 'transition-ai-role';
}

export interface PersonalizedTransformationPlan {
  profile: CustomUserProfile;
  automationOpportunities: Array<{
    task: string;
    aiApproach: string;
    estimatedHoursSavedWeekly: number;
    humanControl: string;
  }>;
  recommendedProjects: ProjectLabId[];
  prioritySkillsToLearn: string[];
  suggestedPathways: CareerPathwayOption[];
  learningRoadmapWeeks: Array<{
    phase: string;
    focus: string;
    deliverable: string;
  }>;
}
