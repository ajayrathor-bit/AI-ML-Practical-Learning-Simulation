import type { ProfessionId } from '../types/careerStudio';
import type { LabRouteId } from '../types/lab';

export type CareerPathId =
  | 'ai-product-analytics'
  | 'applied-ml-engineer'
  | 'genai-workflow-architect'
  | 'decision-intelligence-lead'
  | 'ai-governance-risk'
  | 'automation-ops-specialist';

export type RadarDimensionKey =
  | 'domain-framing'
  | 'data-pipelines'
  | 'ml-modeling'
  | 'nlp-genai'
  | 'eval-oversight'
  | 'delivery-ops';

export interface RadarAxisDefinition {
  key: RadarDimensionKey;
  axisLabel: string;
  professionalLabel: string;
}

export const RADAR_AXES: RadarAxisDefinition[] = [
  {
    key: 'domain-framing',
    axisLabel: 'Domain Framing',
    professionalLabel: 'Business Problem & KPI Scoping',
  },
  {
    key: 'data-pipelines',
    axisLabel: 'Data & SQL',
    professionalLabel: 'Spreadsheet, Reporting & Data Prep',
  },
  {
    key: 'ml-modeling',
    axisLabel: 'ML Modeling',
    professionalLabel: 'Quantitative & Trend Intuition',
  },
  {
    key: 'nlp-genai',
    axisLabel: 'GenAI & NLP',
    professionalLabel: 'Unstructured Docs & Communication',
  },
  {
    key: 'eval-oversight',
    axisLabel: 'Eval & Guardrails',
    professionalLabel: 'Quality Assurance & Risk Judgment',
  },
  {
    key: 'delivery-ops',
    axisLabel: 'Delivery & Ops',
    professionalLabel: 'Cross-Team Workflow Execution',
  },
];

export interface CareerPathAxisRequirement {
  targetScore: number;
  professionalBasis: string;
  technicalTarget: string;
  labRoute: LabRouteId;
  labTitle: string;
}

export interface CareerRadarPath {
  id: CareerPathId;
  shortTabLabel: string;
  roleTitle: string;
  focusDomain: string;
  summary: string;
  requirements: Record<RadarDimensionKey, CareerPathAxisRequirement>;
}

export const CAREER_RADAR_PATHS: CareerRadarPath[] = [
  {
    id: 'ai-product-analytics',
    shortTabLabel: 'AI Product & Analytics',
    roleTitle: 'AI Product & Analytics Manager',
    focusDomain: 'Product Strategy · Experimentation · Stakeholder Alignment',
    summary:
      'Turns existing business KPI ownership into AI product specifications, measurable model acceptance criteria, and human-in-the-loop rollouts.',
    requirements: {
      'domain-framing': {
        targetScore: 92,
        professionalBasis: 'Stakeholder interviews, roadmap prioritization, ROI cases',
        technicalTarget: 'Translating business SLAs into precision, recall & latency targets',
        labRoute: 'foundations',
        labTitle: 'AI Foundations',
      },
      'data-pipelines': {
        targetScore: 78,
        professionalBasis: 'BI metric definitions and cohort spreadsheet tracking',
        technicalTarget: 'SQL event instrumentation and labeled ground-truth datasets',
        labRoute: 'ml',
        labTitle: 'Machine Learning Lab',
      },
      'ml-modeling': {
        targetScore: 72,
        professionalBasis: 'Interpreting forecasts and trend variances',
        technicalTarget: 'Selecting regression vs. classification & baseline benchmarks',
        labRoute: 'ml',
        labTitle: 'Machine Learning Lab',
      },
      'nlp-genai': {
        targetScore: 80,
        professionalBasis: 'Customer feedback synthesis and user research notes',
        technicalTarget: 'Scoping RAG workflows, grounding citations & UX fallback states',
        labRoute: 'genai',
        labTitle: 'Generative AI Lab',
      },
      'eval-oversight': {
        targetScore: 88,
        professionalBasis: 'Sign-off checklists and executive risk reviews',
        technicalTarget: 'Confusion-matrix trade-offs, bias audits & human approval gates',
        labRoute: 'mlops',
        labTitle: 'MLOps Lab',
      },
      'delivery-ops': {
        targetScore: 86,
        professionalBasis: 'Cross-functional sprint delivery and change management',
        technicalTarget: 'A/B shadow testing, adoption telemetry & feedback loops',
        labRoute: 'projects',
        labTitle: 'Project Studio',
      },
    },
  },
  {
    id: 'applied-ml-engineer',
    shortTabLabel: 'Applied ML Engineer',
    roleTitle: 'Applied Machine Learning Engineer',
    focusDomain: 'Predictive Pipelines · Neural Nets · Model Tuning',
    summary:
      'Bridges quantitative domain knowledge into reproducible Python feature pipelines, supervised modeling, and production inference services.',
    requirements: {
      'domain-framing': {
        targetScore: 76,
        professionalBasis: 'Operational bottleneck identification',
        technicalTarget: 'Defining leak-free prediction horizons & feature leakage checks',
        labRoute: 'foundations',
        labTitle: 'AI Foundations',
      },
      'data-pipelines': {
        targetScore: 94,
        professionalBasis: 'Tabular audits and source reconciliations',
        technicalTarget: 'Automated Python/SQL ETL, normalization & train/test splits',
        labRoute: 'ml',
        labTitle: 'Machine Learning Lab',
      },
      'ml-modeling': {
        targetScore: 95,
        professionalBasis: 'Variance formulas and sensitivity testing',
        technicalTarget: 'Gradient descent, loss functions, regularization & deep networks',
        labRoute: 'dl',
        labTitle: 'Deep Learning Lab',
      },
      'nlp-genai': {
        targetScore: 78,
        professionalBasis: 'Document categorization rules',
        technicalTarget: 'Vector embeddings, tokenization & transformer fine-tuning basics',
        labRoute: 'nlp',
        labTitle: 'NLP Lab',
      },
      'eval-oversight': {
        targetScore: 88,
        professionalBasis: 'Manual spot-checks on edge outputs',
        technicalTarget: 'Cross-validation, ROC-AUC calibration & error slice debugging',
        labRoute: 'mlops',
        labTitle: 'MLOps Lab',
      },
      'delivery-ops': {
        targetScore: 86,
        professionalBasis: 'Standard operating runbooks',
        technicalTarget: 'Model versioning, drift alerts & automated retraining triggers',
        labRoute: 'mlops',
        labTitle: 'MLOps Lab',
      },
    },
  },
  {
    id: 'genai-workflow-architect',
    shortTabLabel: 'GenAI & RAG Architect',
    roleTitle: 'GenAI & Agentic Workflow Architect',
    focusDomain: 'RAG Retrieval · Tool-Use Agents · Prompt Evaluation',
    summary:
      'Converts expertise in policies, playbooks, and knowledge bases into grounded RAG search systems and auditable tool-calling workflows.',
    requirements: {
      'domain-framing': {
        targetScore: 84,
        professionalBasis: 'Standardizing team playbooks & customer FAQs',
        technicalTarget: 'Decomposing workflows into deterministic vs. LLM-assisted steps',
        labRoute: 'agentic',
        labTitle: 'Agentic AI Lab',
      },
      'data-pipelines': {
        targetScore: 82,
        professionalBasis: 'Organizing shared folders and SOP libraries',
        technicalTarget: 'Document chunking, metadata tagging & vector index ingestion',
        labRoute: 'genai',
        labTitle: 'Generative AI Lab',
      },
      'ml-modeling': {
        targetScore: 68,
        professionalBasis: 'Rule-based routing thresholds',
        technicalTarget: 'Cosine similarity scoring, top-K retrieval & reranking intuition',
        labRoute: 'nlp',
        labTitle: 'NLP Lab',
      },
      'nlp-genai': {
        targetScore: 95,
        professionalBasis: 'Clear business writing and structured templates',
        technicalTarget: 'System prompts, structured JSON schemas & citation-grounded RAG',
        labRoute: 'genai',
        labTitle: 'Generative AI Lab',
      },
      'eval-oversight': {
        targetScore: 90,
        professionalBasis: 'Editorial fact-checking before publication',
        technicalTarget: 'Hallucination eval harnesses, guardrail filters & human sign-off',
        labRoute: 'agentic',
        labTitle: 'Agentic AI Lab',
      },
      'delivery-ops': {
        targetScore: 84,
        professionalBasis: 'Managing workflow handoffs across tools',
        technicalTarget: 'Orchestrating API tool-calls, latency budgets & fallback routing',
        labRoute: 'agentic',
        labTitle: 'Agentic AI Lab',
      },
    },
  },
  {
    id: 'decision-intelligence-lead',
    shortTabLabel: 'Decision Intelligence',
    roleTitle: 'Business & Decision Intelligence Lead',
    focusDomain: 'Forecasting · Cohort Analytics · Executive Simulation',
    summary:
      'Upgrades spreadsheet-driven P&L, demand, or revenue reviews into probabilistic forecasts, churn scoring, and scenario planning models.',
    requirements: {
      'domain-framing': {
        targetScore: 90,
        professionalBasis: 'Executive reporting & departmental KPI ownership',
        technicalTarget: 'Framing counterfactual what-if scenarios & margin drivers',
        labRoute: 'foundations',
        labTitle: 'AI Foundations',
      },
      'data-pipelines': {
        targetScore: 88,
        professionalBasis: 'Pivot tables and multi-tab workbook joins',
        technicalTarget: 'Warehouse SQL aggregations & reproducible feature tables',
        labRoute: 'ml',
        labTitle: 'Machine Learning Lab',
      },
      'ml-modeling': {
        targetScore: 85,
        professionalBasis: 'Moving averages and manual budget assumptions',
        technicalTarget: 'Time-series forecasting, elasticity regression & churn classifiers',
        labRoute: 'ml',
        labTitle: 'Machine Learning Lab',
      },
      'nlp-genai': {
        targetScore: 72,
        professionalBasis: 'Board memo drafting & call summaries',
        technicalTarget: 'Natural-language metric Q&A anchored to verified SQL results',
        labRoute: 'genai',
        labTitle: 'Generative AI Lab',
      },
      'eval-oversight': {
        targetScore: 84,
        professionalBasis: 'Variance reconciliation against finance actuals',
        technicalTarget: 'Forecast MAE/MAPE tracking & confidence interval communication',
        labRoute: 'mlops',
        labTitle: 'MLOps Lab',
      },
      'delivery-ops': {
        targetScore: 82,
        professionalBasis: 'Weekly operating cadence reviews',
        technicalTarget: 'Automated anomaly briefing alerts & executive decision dashboards',
        labRoute: 'projects',
        labTitle: 'Project Studio',
      },
    },
  },
  {
    id: 'ai-governance-risk',
    shortTabLabel: 'AI Governance & Risk',
    roleTitle: 'AI Governance, Risk & Compliance Specialist',
    focusDomain: 'Explainability · Bias Audits · Human Oversight',
    summary:
      'Leverages legal, compliance, credit, or HR fairness experience to audit model risk, design explainability trails, and enforce ethical guardrails.',
    requirements: {
      'domain-framing': {
        targetScore: 90,
        professionalBasis: 'Regulatory interpretation & internal control policies',
        technicalTarget: 'Mapping compliance obligations to measurable AI risk controls',
        labRoute: 'foundations',
        labTitle: 'AI Foundations',
      },
      'data-pipelines': {
        targetScore: 76,
        professionalBasis: 'Audit sampling and record-keeping verification',
        technicalTarget: 'Data lineage tracking, PII redaction & representation checks',
        labRoute: 'ml',
        labTitle: 'Machine Learning Lab',
      },
      'ml-modeling': {
        targetScore: 74,
        professionalBasis: 'Scorecard thresholds and exception escalation',
        technicalTarget: 'Understanding feature weights, calibration & imbalanced risk error',
        labRoute: 'dl',
        labTitle: 'Deep Learning Lab',
      },
      'nlp-genai': {
        targetScore: 78,
        professionalBasis: 'Policy drafting and contract clause inspection',
        technicalTarget: 'Evaluating prompt-injection exposure & grounded citation auditability',
        labRoute: 'genai',
        labTitle: 'Generative AI Lab',
      },
      'eval-oversight': {
        targetScore: 96,
        professionalBasis: 'Audit sign-offs and fairness reviews',
        technicalTarget: 'Subgroup parity metrics, drift thresholds & override audit trails',
        labRoute: 'mlops',
        labTitle: 'MLOps Lab',
      },
      'delivery-ops': {
        targetScore: 84,
        professionalBasis: 'Governance committee reviews & policy rollouts',
        technicalTarget: 'Model cards, incident escalation playbooks & release gates',
        labRoute: 'mlops',
        labTitle: 'MLOps Lab',
      },
    },
  },
  {
    id: 'automation-ops-specialist',
    shortTabLabel: 'Ops Automation Lead',
    roleTitle: 'Intelligent Operations & Automation Lead',
    focusDomain: 'Document OCR · Queue Routing · Exception Triage',
    summary:
      'Transforms hands-on knowledge of supply chain, support, or back-office bottlenecks into document parsing, intent routing, and QA workflows.',
    requirements: {
      'domain-framing': {
        targetScore: 86,
        professionalBasis: 'Mapping SOP bottlenecks and SLA delays',
        technicalTarget: 'Calculating automation ROI vs. human exception-handling cost',
        labRoute: 'foundations',
        labTitle: 'AI Foundations',
      },
      'data-pipelines': {
        targetScore: 82,
        professionalBasis: 'ERP exports, ticket queues & inventory sheets',
        technicalTarget: 'Structured JSON extraction pipelines & schema validation checks',
        labRoute: 'nlp',
        labTitle: 'NLP Lab',
      },
      'ml-modeling': {
        targetScore: 76,
        professionalBasis: 'Safety-stock rules and triage queues',
        technicalTarget: 'Demand forecasting & confidence-threshold auto-routing models',
        labRoute: 'ml',
        labTitle: 'Machine Learning Lab',
      },
      'nlp-genai': {
        targetScore: 84,
        professionalBasis: 'Reading invoices, forms & customer emails',
        technicalTarget: 'OCR entity extraction, intent classification & grounded draft replies',
        labRoute: 'nlp',
        labTitle: 'NLP Lab',
      },
      'eval-oversight': {
        targetScore: 84,
        professionalBasis: 'Two-person QA verification on high-value orders',
        technicalTarget: 'Low-confidence human escalation queues & precision monitoring',
        labRoute: 'agentic',
        labTitle: 'Agentic AI Lab',
      },
      'delivery-ops': {
        targetScore: 92,
        professionalBasis: 'Daily SLA monitoring and team handoffs',
        technicalTarget: 'Resilient webhook workflows, fallback queues & throughput telemetry',
        labRoute: 'projects',
        labTitle: 'Project Studio',
      },
    },
  },
];

const DEFAULT_BASELINE: Record<RadarDimensionKey, number> = {
  'domain-framing': 76,
  'data-pipelines': 52,
  'ml-modeling': 36,
  'nlp-genai': 42,
  'eval-oversight': 60,
  'delivery-ops': 70,
};

const PROFESSION_BASELINES: Record<ProfessionId, Record<RadarDimensionKey, number>> = {
  'banking-finance': {
    'domain-framing': 82,
    'data-pipelines': 62,
    'ml-modeling': 46,
    'nlp-genai': 40,
    'eval-oversight': 76,
    'delivery-ops': 68,
  },
  'hr-recruitment': {
    'domain-framing': 80,
    'data-pipelines': 48,
    'ml-modeling': 32,
    'nlp-genai': 56,
    'eval-oversight': 68,
    'delivery-ops': 74,
  },
  'sales-bd': {
    'domain-framing': 82,
    'data-pipelines': 52,
    'ml-modeling': 38,
    'nlp-genai': 54,
    'eval-oversight': 54,
    'delivery-ops': 78,
  },
  'marketing-digital': {
    'domain-framing': 78,
    'data-pipelines': 58,
    'ml-modeling': 42,
    'nlp-genai': 64,
    'eval-oversight': 56,
    'delivery-ops': 74,
  },
  'it-software': {
    'domain-framing': 70,
    'data-pipelines': 80,
    'ml-modeling': 54,
    'nlp-genai': 62,
    'eval-oversight': 72,
    'delivery-ops': 84,
  },
  'healthcare-admin': {
    'domain-framing': 82,
    'data-pipelines': 50,
    'ml-modeling': 34,
    'nlp-genai': 44,
    'eval-oversight': 78,
    'delivery-ops': 72,
  },
  'operations-supply': {
    'domain-framing': 80,
    'data-pipelines': 64,
    'ml-modeling': 48,
    'nlp-genai': 38,
    'eval-oversight': 66,
    'delivery-ops': 82,
  },
  'education-training': {
    'domain-framing': 80,
    'data-pipelines': 44,
    'ml-modeling': 32,
    'nlp-genai': 58,
    'eval-oversight': 68,
    'delivery-ops': 70,
  },
  'manufacturing-prod': {
    'domain-framing': 78,
    'data-pipelines': 60,
    'ml-modeling': 48,
    'nlp-genai': 34,
    'eval-oversight': 74,
    'delivery-ops': 80,
  },
  'retail-ecommerce': {
    'domain-framing': 78,
    'data-pipelines': 60,
    'ml-modeling': 44,
    'nlp-genai': 52,
    'eval-oversight': 58,
    'delivery-ops': 76,
  },
  'project-management': {
    'domain-framing': 82,
    'data-pipelines': 54,
    'ml-modeling': 36,
    'nlp-genai': 52,
    'eval-oversight': 68,
    'delivery-ops': 86,
  },
  'customer-support': {
    'domain-framing': 78,
    'data-pipelines': 48,
    'ml-modeling': 32,
    'nlp-genai': 60,
    'eval-oversight': 64,
    'delivery-ops': 76,
  },
  'business-management': {
    'domain-framing': 86,
    'data-pipelines': 58,
    'ml-modeling': 42,
    'nlp-genai': 52,
    'eval-oversight': 70,
    'delivery-ops': 78,
  },
  'data-analytics': {
    'domain-framing': 76,
    'data-pipelines': 84,
    'ml-modeling': 64,
    'nlp-genai': 48,
    'eval-oversight': 70,
    'delivery-ops': 72,
  },
  'other-backgrounds': { ...DEFAULT_BASELINE },
};

export function getProfessionBaselineProfile(
  professionId: ProfessionId
): Record<RadarDimensionKey, number> {
  return { ...(PROFESSION_BASELINES[professionId] ?? DEFAULT_BASELINE) };
}

export function getRecommendedCareerPathForProfession(
  professionId: ProfessionId
): CareerPathId {
  switch (professionId) {
    case 'it-software':
    case 'data-analytics':
      return 'applied-ml-engineer';
    case 'marketing-digital':
    case 'customer-support':
    case 'education-training':
      return 'genai-workflow-architect';
    case 'banking-finance':
    case 'healthcare-admin':
      return 'ai-governance-risk';
    case 'operations-supply':
    case 'manufacturing-prod':
    case 'hr-recruitment':
      return 'automation-ops-specialist';
    case 'sales-bd':
    case 'retail-ecommerce':
    case 'business-management':
      return 'decision-intelligence-lead';
    default:
      return 'ai-product-analytics';
  }
}

export interface SkillRadarAxisRow {
  key: RadarDimensionKey;
  axisLabel: string;
  professionalLabel: string;
  professionalSkills: number;
  aiTechnicalSkills: number;
  gap: number;
  status: 'Ready / Strength' | 'Moderate Gap' | 'Priority Gap';
  professionalBasis: string;
  technicalTarget: string;
  labRoute: LabRouteId;
  labTitle: string;
}

export interface SkillSpiderComparison {
  path: CareerRadarPath;
  axes: SkillRadarAxisRow[];
  averageProfessionalScore: number;
  averageAiTargetScore: number;
  averageGap: number;
  largestGaps: SkillRadarAxisRow[];
  strongestMatches: SkillRadarAxisRow[];
}

const clampScore = (val: number) => Math.max(0, Math.min(100, Math.round(val)));

export function buildSkillSpiderComparison(
  pathId: CareerPathId,
  professionalScores: Record<RadarDimensionKey, number>
): SkillSpiderComparison {
  const path =
    CAREER_RADAR_PATHS.find((item) => item.id === pathId) ?? CAREER_RADAR_PATHS[0];

  const axes: SkillRadarAxisRow[] = RADAR_AXES.map((axisDef) => {
    const req = path.requirements[axisDef.key];
    const current = clampScore(professionalScores[axisDef.key] ?? 50);
    const target = clampScore(req.targetScore);
    const gap = Math.max(0, target - current);
    const status: SkillRadarAxisRow['status'] =
      gap <= 10 ? 'Ready / Strength' : gap <= 25 ? 'Moderate Gap' : 'Priority Gap';

    return {
      key: axisDef.key,
      axisLabel: axisDef.axisLabel,
      professionalLabel: axisDef.professionalLabel,
      professionalSkills: current,
      aiTechnicalSkills: target,
      gap,
      status,
      professionalBasis: req.professionalBasis,
      technicalTarget: req.technicalTarget,
      labRoute: req.labRoute,
      labTitle: req.labTitle,
    };
  });

  const count = axes.length;
  const averageProfessionalScore = Math.round(
    axes.reduce((sum, row) => sum + row.professionalSkills, 0) / count
  );
  const averageAiTargetScore = Math.round(
    axes.reduce((sum, row) => sum + row.aiTechnicalSkills, 0) / count
  );
  const averageGap = Math.round(axes.reduce((sum, row) => sum + row.gap, 0) / count);

  const largestGaps = [...axes].sort((a, b) => b.gap - a.gap).slice(0, 3);
  const strongestMatches = [...axes].sort((a, b) => a.gap - b.gap).slice(0, 2);

  return {
    path,
    axes,
    averageProfessionalScore,
    averageAiTargetScore,
    averageGap,
    largestGaps,
    strongestMatches,
  };
}
