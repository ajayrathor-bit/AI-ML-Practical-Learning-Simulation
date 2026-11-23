import type {
  PipelineStageInfo,
  ProfessionProfile,
  ProjectMeta,
  TechnologyExplainer,
} from '../types/careerStudio';
import { PROFESSIONS_PART_1 } from './careerProfessionsPart1';
import { PROFESSIONS_PART_2 } from './careerProfessionsPart2';

export const PROFESSIONS: ProfessionProfile[] = [
  ...PROFESSIONS_PART_1,
  ...PROFESSIONS_PART_2,
];

export const AI_PIPELINE_STAGES: PipelineStageInfo[] = [
  {
    id: 'human-task',
    order: 1,
    label: 'Human Task',
    shortRole: 'Business Problem & Goal',
    description:
      'Every useful AI system starts with a clear operational problem defined by a domain professional—not technology looking for a problem.',
    exampleByRole: 'HR screening 250 resumes, a planner forecasting Q4 inventory, or an analyst reviewing claims.',
    dataArtifact: 'Task objective + success metric + error tolerance',
  },
  {
    id: 'data-input',
    order: 2,
    label: 'Data Input',
    shortRole: 'Structured & Text Signals',
    description:
      'Real-world evidence—tables, invoices, emails, logs, or sensor readings—is cleaned, normalized, and turned into measurable features.',
    exampleByRole: 'CSV sales logs, candidate skill keywords, transaction amounts, or code pull requests.',
    dataArtifact: 'Cleaned tabular records, tokens, or numeric feature vectors',
  },
  {
    id: 'ai-model',
    order: 3,
    label: 'AI Model',
    shortRole: 'Pattern Architecture',
    description:
      'An appropriate mathematical architecture loads parameters learned from historical examples rather than brittle hard-coded if/else branches.',
    exampleByRole: 'Tree/logistic scorer for credit risk, embedding retriever for docs, or time-series regressor.',
    dataArtifact: 'Calibrated model weights + feature schema',
  },
  {
    id: 'ml-nlp-cv',
    order: 4,
    label: 'ML / NLP / Computer Vision',
    shortRole: 'Core Intelligence Engine',
    description:
      'Depending on data modality, Machine Learning models numbers, NLP processes text intent/entities, and Computer Vision interprets visual frames.',
    exampleByRole: 'NLP parses resumes & support tickets; ML predicts churn; CV inspects assembly frames or scans.',
    dataArtifact: 'Representations, similarity scores, or risk probabilities',
  },
  {
    id: 'prediction-automation',
    order: 5,
    label: 'Prediction or Automation',
    shortRole: 'Actionable Output Draft',
    description:
      'The engine surfaces a ranked shortlist, anomaly score, demand curve, missing-field alert, or grounded response draft in seconds.',
    exampleByRole: 'Lead score 86/100, Fraud Alert HIGH, or Demand Forecast +18% over moving average.',
    dataArtifact: 'Scored recommendation + contributing factor weights',
  },
  {
    id: 'human-review',
    order: 6,
    label: 'Human Review',
    shortRole: 'Domain Oversight & Ethics',
    description:
      'Working professionals inspect explanations, override edge cases, guard against bias, and apply real-world context AI cannot see.',
    exampleByRole: 'Hiring manager reviews shortlisted talent; clinician oversees care; underwriter approves loan.',
    dataArtifact: 'Verified decision + human correction feedback signal',
  },
  {
    id: 'business-output',
    order: 7,
    label: 'Final Business Output',
    shortRole: 'Measured Impact & Audit Log',
    description:
      'Verified outcomes feed business execution while logging decisions cleanly so teams can audit quality and retrain models over time.',
    exampleByRole: 'Faster response SLAs, lower stockout waste, consistent underwriting, and traceable KPIs.',
    dataArtifact: 'Production decision + continuous evaluation telemetry',
  },
];

export const PROJECT_LABS_META: ProjectMeta[] = [
  {
    id: 'resume-screening',
    order: 1,
    title: 'AI Resume Screening & Talent Intelligence',
    industryTag: 'HR & Recruitment',
    summary:
      'Compare sample resumes against custom job requirements to inspect extracted skills, overlap scores, and human shortlisting notes.',
    technologies: ['python', 'nlp', 'data-analysis', 'model-evaluation'],
    humanCheckpoint:
      'Scores highlight skill overlap to aid preparation; recruiters always evaluate transferable potential and own hiring decisions.',
  },
  {
    id: 'sales-lead-scoring',
    order: 2,
    title: 'AI Sales Prediction & Lead Scoring',
    industryTag: 'Sales & Marketing',
    summary:
      'Adjust prospect engagement, budget fit, and industry urgency to simulate conversion propensity and ranked sales priority.',
    technologies: ['machine-learning', 'predictive-analytics', 'statistics', 'data-visualization'],
    humanCheckpoint:
      'Helps sales reps prioritize daily calls while account executives lead consultative discovery.',
  },
  {
    id: 'banking-fraud',
    order: 3,
    title: 'Intelligent Banking Fraud Detection',
    industryTag: 'Banking & Finance',
    summary:
      'Simulate synthetic card transactions and watch anomaly detection score amount spikes, velocity, and location mismatch.',
    technologies: ['python', 'machine-learning', 'statistics', 'model-evaluation'],
    humanCheckpoint:
      'Fraud analysts inspect flagged explanations before locking cards or contacting customers.',
  },
  {
    id: 'healthcare-analytics',
    order: 4,
    title: 'Healthcare Predictive Capacity & Operations Analytics',
    industryTag: 'Healthcare Administration',
    summary:
      'Model synthetic clinic visit volume, ward bed utilization, and post-visit administrative follow-up scheduling priorities.',
    technologies: ['predictive-analytics', 'statistics', 'data-visualization', 'sql'],
    humanCheckpoint:
      'Strictly operational capacity and follow-up scheduling simulation—no medical diagnosis or treatment decisions.',
  },
  {
    id: 'inventory-forecasting',
    order: 5,
    title: 'Smart Inventory & Demand Forecasting',
    industryTag: 'Operations & Supply Chain',
    summary:
      'Compare traditional moving-average planning against a seasonal + promotion ML demand forecast curve with reorder triggers.',
    technologies: ['predictive-analytics', 'python', 'data-visualization', 'ai-automation'],
    humanCheckpoint:
      'Supply planners review vendor MOQ limits and supplier risks prior to issuing purchase orders.',
  },
  {
    id: 'document-intelligence',
    order: 6,
    title: 'AI Document Intelligence',
    industryTag: 'Finance, Legal & Admin',
    summary:
      'Inspect preloaded invoices/claims or upload your own text file to extract structured fields, spot missing items, and export a report.',
    technologies: ['nlp', 'computer-vision', 'generative-ai', 'ai-automation'],
    humanCheckpoint:
      'Finance and admin reviewers verify flagged low-confidence fields prior to payment release.',
  },
  {
    id: 'customer-support-agent',
    order: 7,
    title: 'AI Customer Support Agent',
    industryTag: 'Customer Support & CX',
    summary:
      'Test live customer messages through intent classification, sentiment urgency scoring, grounded reply drafting, and escalation analytics.',
    technologies: ['nlp', 'llm', 'generative-ai', 'model-evaluation'],
    humanCheckpoint:
      'Distressed accounts and refund exceptions escalate automatically to empathetic human specialists.',
  },
  {
    id: 'business-intelligence',
    order: 8,
    title: 'AI Business Intelligence & Decision System',
    industryTag: 'Business Management & BI',
    summary:
      'Query quarterly department KPIs, explore revenue/margin trajectories, and test growth scenario levers interactively.',
    technologies: ['sql', 'data-analysis', 'data-visualization', 'predictive-analytics'],
    humanCheckpoint:
      'Leadership teams combine forecast bands with strategic context before finalizing budgets.',
  },
  {
    id: 'code-assistant',
    order: 9,
    title: 'AI Code Assistant & Bug Detection',
    industryTag: 'IT & Software Development',
    summary:
      'Inspect sample or edited code snippets to uncover edge-case bugs, suggested fixes, plain-English explanations, and unit test ideas.',
    technologies: ['llm', 'generative-ai', 'ai-automation', 'model-evaluation'],
    humanCheckpoint:
      'Engineers review security implications, verify logic against specs, and run CI tests before merging.',
  },
  {
    id: 'marketing-intelligence',
    order: 10,
    title: 'AI Marketing Campaign Intelligence',
    industryTag: 'Marketing & Growth',
    summary:
      'Analyze multi-channel campaign ROI, cluster audience segments, predict conversion lift, and preview grounded copy hooks.',
    technologies: ['machine-learning', 'data-visualization', 'generative-ai', 'statistics'],
    humanCheckpoint:
      'Marketers approve brand voice, creative accuracy, and channel spend guardrails.',
  },
];

export const TECH_EXPLAINERS: TechnologyExplainer[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'Core Foundations',
    whatItDoes:
      'General-purpose programming language powering data preparation, statistical pipelines, ML modeling, and backend APIs.',
    whyUsed:
      'Its ecosystem (pandas, scikit-learn, PyTorch) turns raw CSVs, documents, and logs into reproducible production workflows.',
    projectContribution:
      'Drives resume parsing, feature scaling, anomaly scoring, and demand forecast pipelines behind the scenes.',
    whatLearnerNeeds:
      'Variables, lists/dictionaries, loops, functions, and tabular manipulation with pandas.',
    usedInProjects: ['resume-screening', 'banking-fraud', 'inventory-forecasting', 'sales-lead-scoring'],
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Core Foundations',
    whatItDoes:
      'Structured Query Language used to filter, join, aggregate, and validate enterprise records stored in relational databases.',
    whyUsed:
      'Nearly every company stores customer, transaction, HR, and hospital operations data in SQL warehouses before any ML runs.',
    projectContribution:
      'Assembles clean KPI slices in Business Intelligence and historical cohort metrics in Healthcare Analytics.',
    whatLearnerNeeds:
      'SELECT, WHERE, JOINs, GROUP BY aggregations, and window functions for time-based cohorts.',
    usedInProjects: ['business-intelligence', 'healthcare-analytics', 'sales-lead-scoring'],
  },
  {
    id: 'statistics',
    name: 'Statistics',
    category: 'Core Foundations',
    whatItDoes:
      'Mathematical framework for distributions, variance, hypothesis testing, correlation, and uncertainty quantification.',
    whyUsed:
      'Prevents teams from mistaking random noise for real trends or misreading skewed financial/healthcare numbers.',
    projectContribution:
      'Sets z-score thresholds in Fraud Detection and confidence intervals in Demand & Healthcare capacity planning.',
    whatLearnerNeeds:
      'Mean vs. median, standard deviation, probability distributions, confidence intervals, and A/B significance.',
    usedInProjects: ['banking-fraud', 'healthcare-analytics', 'sales-lead-scoring', 'marketing-intelligence'],
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    category: 'Core Foundations',
    whatItDoes:
      'Exploratory profiling, missing-value cleaning, outlier investigation, and cohort breakdown prior to modeling.',
    whyUsed:
      'Models trained on messy duplicates or mismatched units fail silently—clean exploratory analysis anchors reliable AI.',
    projectContribution:
      'Structures extracted resume fields, cleans campaign channel metrics, and audits executive KPI tables.',
    whatLearnerNeeds:
      'Data cleaning workflows, handling nulls/duplicates, pivot summaries, and domain sanity checks.',
    usedInProjects: ['resume-screening', 'business-intelligence', 'document-intelligence'],
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    category: 'Applied AI/ML',
    whatItDoes:
      'Algorithms (regression, decision trees, clustering) that learn predictive rules directly from historical labeled or unlabeled data.',
    whyUsed:
      'Scales complex multi-factor patterns that static manual spreadsheet rules cannot maintain.',
    projectContribution:
      'Powers lead conversion scoring, fraud anomaly detection, and behavioral marketing audience clustering.',
    whatLearnerNeeds:
      'Train/validation/test splits, feature encoding, classification vs. regression vs. clustering.',
    usedInProjects: ['sales-lead-scoring', 'banking-fraud', 'marketing-intelligence'],
  },
  {
    id: 'deep-learning',
    name: 'Deep Learning',
    category: 'Applied AI/ML',
    whatItDoes:
      'Multi-layer neural networks capable of learning hierarchical features from dense text, audio, and image signals.',
    whyUsed:
      'Excels on unstructured modalities—scanned documents, natural language semantics, and camera inspection—where manual features fall short.',
    projectContribution:
      'Underpins transformer embeddings for semantic text matching and optical character layout recognition.',
    whatLearnerNeeds:
      'Linear layers, activation functions, loss minimization, and when simpler classical ML beats deep nets.',
    usedInProjects: ['document-intelligence', 'resume-screening', 'customer-support-agent'],
  },
  {
    id: 'nlp',
    name: 'Natural Language Processing',
    category: 'Applied AI/ML',
    whatItDoes:
      'Techniques that clean, tokenize, embed, classify intent, extract named entities, and score sentiment in human language.',
    whyUsed:
      'Unlocks insights trapped inside resumes, invoices, support emails, and employee feedback forms.',
    projectContribution:
      'Extracts skills in Resume Screening, classifies support urgency, and parses line items in Document Intelligence.',
    whatLearnerNeeds:
      'Tokenization, entity extraction, text similarity/embeddings, and sentiment limitations (sarcasm/context).',
    usedInProjects: ['resume-screening', 'document-intelligence', 'customer-support-agent'],
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision',
    category: 'Applied AI/ML',
    whatItDoes:
      'Models and OCR pipelines that interpret pixels, scanned document layouts, barcodes, and visual assembly frames.',
    whyUsed:
      'Converts scanned PDFs and camera images into structured tabular data or defect flags without manual re-keying.',
    projectContribution:
      'Extracts bounding-region text and table headers during invoice and claim document digitization.',
    whatLearnerNeeds:
      'Image/OCR preprocessing, confidence thresholding, and precision-vs-recall review queues.',
    usedInProjects: ['document-intelligence'],
  },
  {
    id: 'generative-ai',
    name: 'Generative AI',
    category: 'GenAI & Engineering',
    whatItDoes:
      'Models capable of synthesizing structured summaries, copy variants, draft replies, or test cases conditioned on verified context.',
    whyUsed:
      'Eliminates blank-page drafting work when grounded cleanly in verified enterprise data and constraints.',
    projectContribution:
      'Drafts empathetic support responses, ad copy hypotheses, and code fix explanations.',
    whatLearnerNeeds:
      'Grounded context injection (RAG), hallucination checks, and structured output constraints.',
    usedInProjects: ['customer-support-agent', 'code-assistant', 'marketing-intelligence', 'document-intelligence'],
  },
  {
    id: 'llm',
    name: 'Large Language Models',
    category: 'GenAI & Engineering',
    whatItDoes:
      'Transformer language engines trained on vast corpora that reason across instructions, code, and retrieved policy documents.',
    whyUsed:
      'Acts as a flexible language and tool-orchestration layer—when paired with clean retrieval, code checks, and human review.',
    projectContribution:
      'Powers contextual support drafting, bug explanation synthesis, and natural-language query translation.',
    whatLearnerNeeds:
      'Context windows, temperature/sampling, RAG grounding, and programmatic API integration—beyond casual chat prompts.',
    usedInProjects: ['customer-support-agent', 'code-assistant', 'business-intelligence'],
  },
  {
    id: 'predictive-analytics',
    name: 'Predictive Analytics',
    category: 'Applied AI/ML',
    whatItDoes:
      'Combines historical trends, seasonality, and leading indicators to estimate future demand, capacity load, or conversion likelihood.',
    whyUsed:
      'Moves teams from reactive firefighting (checking last month’s failure) to proactive planning.',
    projectContribution:
      'Forecasts warehouse SKU demand, hospital bed loads, quarterly revenue curves, and lead conversion odds.',
    whatLearnerNeeds:
      'Time-series backtesting, seasonality decomposition, and communicating uncertainty ranges responsibly.',
    usedInProjects: ['inventory-forecasting', 'healthcare-analytics', 'sales-lead-scoring', 'business-intelligence'],
  },
  {
    id: 'data-visualization',
    name: 'Data Visualization',
    category: 'Core Foundations',
    whatItDoes:
      'Translates dense model predictions, error curves, and KPI variances into clear, decision-ready charts and tables.',
    whyUsed:
      'Executives, HR teams, and doctors cannot act on raw probability arrays; clear visuals make AI inspectable and trustworthy.',
    projectContribution:
      'Renders interactive demand comparisons, hospital capacity gauges, fraud scores, and BI trend charts across all projects.',
    whatLearnerNeeds:
      'Choosing right chart types (line vs. bar vs. scatter), dual-coded labels, and avoiding misleading axes.',
    usedInProjects: ['inventory-forecasting', 'healthcare-analytics', 'business-intelligence', 'marketing-intelligence'],
  },
  {
    id: 'model-evaluation',
    name: 'Model Evaluation',
    category: 'GenAI & Engineering',
    whatItDoes:
      'Systematic benchmarking using accuracy, precision, recall, F1, MAE, bias audits, and golden QA datasets before rollout.',
    whyUsed:
      'Untested models fail silently on edge cases—especially imbalanced fraud, hiring fairness, or clinical scheduling.',
    projectContribution:
      'Tracks false-positive vs. catch-rate balance in Fraud Detection, test assertions in Code Assistant, and bot escalation quality.',
    whatLearnerNeeds:
      'Confusion matrices, precision vs. recall trade-offs, regression error metrics (MAE/RMSE), and fairness auditing.',
    usedInProjects: ['banking-fraud', 'resume-screening', 'customer-support-agent', 'code-assistant'],
  },
  {
    id: 'ai-automation',
    name: 'AI Automation',
    category: 'GenAI & Engineering',
    whatItDoes:
      'Connects data triggers, ML/LLM scoring steps, validation rules, and human-approval checkpoints into reliable workflows.',
    whyUsed:
      'A standalone model sitting in a notebook creates zero business impact until embedded into daily team operations safely.',
    projectContribution:
      'Orchestrates automated invoice completeness checks, reorder alerts, and CI code inspection steps.',
    whatLearnerNeeds:
      'Pipeline state design, exception handling, fallback rules, and human-in-the-loop approval gates.',
    usedInProjects: ['document-intelligence', 'inventory-forecasting', 'code-assistant'],
  },
];

// ==========================================
// Synthetic Project Demo Presets
// ==========================================

export interface SampleResumePreset {
  id: string;
  candidateName: string;
  currentRole: string;
  yearsExp: number;
  text: string;
}

export const SAMPLE_JOB_DESCRIPTIONS = [
  {
    id: 'jd-data-analyst',
    title: 'Senior Business & AI Data Analyst',
    requiredSkills: ['python', 'sql', 'statistics', 'tableau', 'machine learning', 'forecasting', 'stakeholder reporting'],
    minYears: 3,
  },
  {
    id: 'jd-product-ops',
    title: 'AI Product & Operations Lead',
    requiredSkills: ['agile', 'sql', 'product roadmap', 'rag', 'process automation', 'kpi', 'stakeholder management'],
    minYears: 4,
  },
];

export const SAMPLE_RESUMES: SampleResumePreset[] = [
  {
    id: 'res-priya',
    candidateName: 'Priya Nair (Candidate A)',
    currentRole: 'MIS & Business Analyst · 4 yrs',
    yearsExp: 4,
    text: 'Experienced Business Analyst proficient in SQL, Tableau, stakeholder reporting, and revenue forecasting. Built Python automation scripts for KPI dashboards and introductory machine learning churn prototypes.',
  },
  {
    id: 'res-arjun',
    candidateName: 'Arjun Mehta (Candidate B)',
    currentRole: 'Operations Coordinator · 5 yrs',
    yearsExp: 5,
    text: 'Operations specialist managing vendor SLAs, Excel pivot tables, process automation macros, and SQL inventory queries. Strong stakeholder management and KPI tracking experience; exploring statistics.',
  },
  {
    id: 'res-sana',
    candidateName: 'Sana Kulkarni (Candidate C)',
    currentRole: 'Product & Customer Success Lead · 4 yrs',
    yearsExp: 4,
    text: 'Customer Success & Agile Product Lead experienced in product roadmap delivery, SQL cohort reporting, RAG helpdesk knowledge curation, KPI reviews, and cross-functional stakeholder management.',
  },
];

export interface SampleInvoicePreset {
  id: string;
  label: string;
  rawText: string;
}

export const SAMPLE_INVOICES: SampleInvoicePreset[] = [
  {
    id: 'inv-complete',
    label: 'Vendor Invoice #4821 (Complete)',
    rawText: `VENDOR: Apex Industrial Components Ltd.
INVOICE NO: INV-2025-4821
DATE: 2025-02-14
PO NUMBER: PO-99104
BILL TO: Meridian Manufacturing Operations
LINE ITEMS:
- Precision Sensor Module x 25 @ $140.00 = $3500.00
- Shielded Harness Kit x 25 @ $32.00 = $800.00
SUBTOTAL: $4300.00
TAX (8%): $344.00
TOTAL DUE: $4644.00
PAYMENT TERMS: Net 30`,
  },
  {
    id: 'inv-missing',
    label: 'Logistics Bill #1094 (Missing PO & Tax)',
    rawText: `VENDOR: RapidFreight Regional Carriers
INVOICE NO: RFC-1094
DATE: 2025-02-18
BILL TO: Meridian Distribution Hub
LINE ITEMS:
- Refrigerated Pallet Route B x 4 @ $420.00 = $1680.00
- Fuel Surcharge Fee = $145.00
TOTAL DUE: $1825.00`,
  },
  {
    id: 'claim-medical',
    label: 'Clinic Intake Claim #774 (Administrative Check)',
    rawText: `VENDOR: Northside Outpatient Diagnostics
INVOICE NO: CLM-77402
DATE: 2025-02-19
PO NUMBER: REF-88219
BILL TO: CareFirst Administrative Clearinghouse
SUBTOTAL: $920.00
TAX (0%): $0.00
TOTAL DUE: $920.00
PAYMENT TERMS: Electronic 14 Days`,
  },
];

export interface SampleCodeSnippet {
  id: string;
  title: string;
  language: string;
  code: string;
}

export const SAMPLE_CODE_SNIPPETS: SampleCodeSnippet[] = [
  {
    id: 'code-discount',
    title: 'Checkout Discount Calculator (Buggy Division & Null Edge)',
    language: 'TypeScript',
    code: `export function calculateDiscountRate(items, couponPct) {
  let subtotal = 0;
  for (let i = 0; i <= items.length; i++) {
    subtotal += items[i].price * items[i].qty;
  }
  const discounted = subtotal - (subtotal * couponPct) / 100;
  return discounted / items.length;
}`,
  },
  {
    id: 'code-sql-auth',
    title: 'User Lookup Handler (Unsafe String Query + Missing Check)',
    language: 'TypeScript',
    code: `export async function findAccount(db, emailInput) {
  const query = "SELECT id, role FROM users WHERE email = '" + emailInput + "'";
  const rows = await db.execute(query);
  return rows[0].role;
}`,
  },
  {
    id: 'code-loop',
    title: 'Alert Threshold Filter (Assignment vs Comparison)',
    language: 'JavaScript',
    code: `function getHighRiskTransactions(list) {
  return list.filter((tx) => {
    if (tx.status = 'flagged') {
      return tx.amount > 1000;
    }
    return false;
  });
}`,
  },
];
