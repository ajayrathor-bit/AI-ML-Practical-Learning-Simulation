import { jsPDF } from 'jspdf';
import type { ProfessionId, ProfessionProfile, ProjectLabId } from '../types/careerStudio';
import type { LabRouteId } from '../types/lab';

export type ReadinessTier =
  | 'Foundational Explorer'
  | 'Workflow Practitioner'
  | 'Applied AI Builder'
  | 'Production AI Strategist';

export type SeniorityLevel = 'ic' | 'manager' | 'senior';
export type DataComfortLevel = 'non-tech' | 'spreadsheets' | 'sql-bi' | 'python-ml';
export type RepetitionLoad = 'low' | 'moderate' | 'high';
export type AiMaturityLevel = 'none' | 'prompting-only' | 'no-code-flows' | 'eval-builder';
export type PrimaryGoalOption = 'automate-role' | 'lead-ai' | 'career-transition';

export interface AiReadinessAnswers {
  professionId: ProfessionId;
  seniority: SeniorityLevel;
  dataComfort: DataComfortLevel;
  repetitionLoad: RepetitionLoad;
  aiMaturity: AiMaturityLevel;
  primaryGoal: PrimaryGoalOption;
  understandsHumanOversight: boolean;
}

export interface CompetencyGapRow {
  dimension: string;
  currentScore: number;
  targetScore: number;
  gap: number;
  status: 'Strength / Ready' | 'Moderate Gap' | 'Priority Focus';
  actionAdvice: string;
}

export interface AiReadinessReport {
  overallScore: number; // 0..100
  readinessTier: ReadinessTier;
  tierSummary: string;
  professionTitle: string;
  strongestArea: CompetencyGapRow;
  topPriorityGap: CompetencyGapRow;
  competencies: CompetencyGapRow[];
  recommendedProjects: ProjectLabId[];
  recommendedLabModules: Array<{
    route: LabRouteId;
    title: string;
    reason: string;
  }>;
  estimatedHoursToReady: number;
  honestPromptNote: string;
}

export interface QuizQuestionChoice<T extends string> {
  value: T;
  label: string;
  detail: string;
}

export const SENIORITY_CHOICES: Array<QuizQuestionChoice<SeniorityLevel>> = [
  {
    value: 'ic',
    label: 'Individual Contributor / Specialist',
    detail: 'Hands-on execution of daily operations, analysis, code, or client work.',
  },
  {
    value: 'manager',
    label: 'Team Lead / Functional Manager',
    detail: 'Overseeing workflows, coaching teammates, and tracking team KPIs.',
  },
  {
    value: 'senior',
    label: 'Senior Leader / Strategic Decision Maker',
    detail: 'Owning cross-departmental priorities, budgets, and transformation pilots.',
  },
];

export const DATA_COMFORT_CHOICES: Array<QuizQuestionChoice<DataComfortLevel>> = [
  {
    value: 'non-tech',
    label: 'Mostly Qualitative / Non-Technical Workflows',
    detail: 'Primarily documents, calls, emails, or operational coordination.',
  },
  {
    value: 'spreadsheets',
    label: 'Spreadsheet & Pivot-Table Proficient',
    detail: 'Comfortable with formulas, reporting tables, and tracking metrics in Excel/Sheets.',
  },
  {
    value: 'sql-bi',
    label: 'SQL Queries & BI Dashboards',
    detail: 'Regularly query databases, slice cohorts, or maintain analytics dashboards.',
  },
  {
    value: 'python-ml',
    label: 'Python Scripting & Statistical Modeling',
    detail: 'Have written scripts for data cleaning, regression, classification, or notebooks.',
  },
];

export const REPETITION_CHOICES: Array<QuizQuestionChoice<RepetitionLoad>> = [
  {
    value: 'low',
    label: 'Low (< 4 hrs/week repetitive admin)',
    detail: 'Most of your week already centers on novel strategic or interpersonal work.',
  },
  {
    value: 'moderate',
    label: 'Moderate (4–10 hrs/week manual prep)',
    detail: 'Regular copy-paste reporting, resume/doc reviews, or manual inbox triage.',
  },
  {
    value: 'high',
    label: 'High (10+ hrs/week structured repetition)',
    detail: 'Heavy recurring data consolidation, checking forms, or rule-based sorting.',
  },
];

export const AI_MATURITY_CHOICES: Array<QuizQuestionChoice<AiMaturityLevel>> = [
  {
    value: 'none',
    label: 'Just Getting Started',
    detail: 'Haven’t formally applied AI tools or ML concepts to workplace tasks yet.',
  },
  {
    value: 'prompting-only',
    label: 'Occasional ChatGPT / Prompting Only',
    detail: 'Use chat assistants for drafting text, without data pipelines or model evaluation.',
  },
  {
    value: 'no-code-flows',
    label: 'Structured Prompts & Workflow Automations',
    detail: 'Have built repeatable templates, RAG knowledge lookups, or multi-step automations.',
  },
  {
    value: 'eval-builder',
    label: 'Applied AI / ML Builder with Evaluation Checks',
    detail: 'Have tested models or AI APIs with validation metrics, error analysis, and guardrails.',
  },
];

export const GOAL_CHOICES: Array<QuizQuestionChoice<PrimaryGoalOption>> = [
  {
    value: 'automate-role',
    label: 'Boost Productivity in My Current Profession',
    detail: 'Automate repetitive tasks while strengthening domain leadership.',
  },
  {
    value: 'lead-ai',
    label: 'Lead AI Transformation Projects on My Team',
    detail: 'Scope high-ROI pilots, evaluate vendors/models, and govern human review.',
  },
  {
    value: 'career-transition',
    label: 'Transition Into an Applied Data / AI Role',
    detail: 'Build end-to-end Python, SQL, ML, and GenAI project portfolio depth.',
  },
];

const clamp = (val: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(val)));

export function computeAiReadinessReport(
  answers: AiReadinessAnswers,
  profession: ProfessionProfile
): AiReadinessReport {
  // 1. Domain & Problem Framing score
  const seniorityBonus =
    answers.seniority === 'senior' ? 22 : answers.seniority === 'manager' ? 16 : 10;
  const repetitionBonus =
    answers.repetitionLoad === 'high' ? 12 : answers.repetitionLoad === 'moderate' ? 8 : 5;
  const domainCurrent = clamp(56 + seniorityBonus + repetitionBonus);
  const domainTarget = answers.primaryGoal === 'lead-ai' ? 92 : 86;

  // 2. Data & SQL Fluency
  const dataMap: Record<DataComfortLevel, number> = {
    'non-tech': 22,
    spreadsheets: 46,
    'sql-bi': 72,
    'python-ml': 88,
  };
  const dataCurrent = dataMap[answers.dataComfort];
  const dataTarget = answers.primaryGoal === 'career-transition' ? 88 : 76;

  // 3. Applied ML & Predictive Intuition
  const mlFromData: Record<DataComfortLevel, number> = {
    'non-tech': 14,
    spreadsheets: 28,
    'sql-bi': 48,
    'python-ml': 78,
  };
  const mlMaturityBoost =
    answers.aiMaturity === 'eval-builder' ? 14 : answers.aiMaturity === 'no-code-flows' ? 6 : 0;
  const mlCurrent = clamp(mlFromData[answers.dataComfort] + mlMaturityBoost);
  const mlTarget =
    answers.primaryGoal === 'career-transition'
      ? 85
      : answers.primaryGoal === 'lead-ai'
      ? 74
      : 68;

  // 4. GenAI & RAG Workflow Grounding
  const genaiMap: Record<AiMaturityLevel, number> = {
    none: 15,
    'prompting-only': 42,
    'no-code-flows': 68,
    'eval-builder': 84,
  };
  const genaiCurrent = genaiMap[answers.aiMaturity];
  const genaiTarget = 82;

  // 5. Evaluation & Human Oversight
  const evalBase =
    answers.aiMaturity === 'eval-builder'
      ? 74
      : answers.aiMaturity === 'no-code-flows'
      ? 52
      : answers.aiMaturity === 'prompting-only'
      ? 34
      : 22;
  const oversightBoost = answers.understandsHumanOversight ? 16 : 0;
  const evalCurrent = clamp(evalBase + oversightBoost);
  const evalTarget = answers.primaryGoal === 'lead-ai' ? 90 : 84;

  const rawRows: Array<{
    dimension: string;
    currentScore: number;
    targetScore: number;
    adviceLow: string;
    adviceGood: string;
  }> = [
    {
      dimension: 'Domain Framing',
      currentScore: domainCurrent,
      targetScore: domainTarget,
      adviceLow: `Map 2 repetitive ${profession.shortTitle} workflows into Input -> AI -> Human Review stages.`,
      adviceGood: `Strong domain leverage in ${profession.shortTitle}—use it to anchor high-ROI AI pilots.`,
    },
    {
      dimension: 'Data & SQL Fluency',
      currentScore: dataCurrent,
      targetScore: dataTarget,
      adviceLow: 'Build foundational SQL aggregations & Python tabular cleaning before jumping to modeling.',
      adviceGood: 'Solid tabular foundation—extend into automated feature pipelines.',
    },
    {
      dimension: 'Applied ML Intuition',
      currentScore: mlCurrent,
      targetScore: mlTarget,
      adviceLow: 'Practice supervised regression/classification and error minimization in the ML Lab.',
      adviceGood: 'Ready to calibrate domain models and interpret precision/recall trade-offs.',
    },
    {
      dimension: 'GenAI & RAG Grounding',
      currentScore: genaiCurrent,
      targetScore: genaiTarget,
      adviceLow: 'Move beyond ad-hoc chat prompts into RAG retrieval over verified company documents.',
      adviceGood: 'Strong workflow grounding—pair retrieval with deterministic fallbacks.',
    },
    {
      dimension: 'Evaluation & Oversight',
      currentScore: evalCurrent,
      targetScore: evalTarget,
      adviceLow: 'Learn confusion matrices, bias checks, and strict human-in-the-loop approval gates.',
      adviceGood: 'Strong governance mindset—essential for safe production adoption.',
    },
  ];

  const competencies: CompetencyGapRow[] = rawRows.map((row) => {
    const gap = Math.max(0, row.targetScore - row.currentScore);
    const status: CompetencyGapRow['status'] =
      gap <= 12 ? 'Strength / Ready' : gap <= 32 ? 'Moderate Gap' : 'Priority Focus';
    return {
      dimension: row.dimension,
      currentScore: row.currentScore,
      targetScore: row.targetScore,
      gap,
      status,
      actionAdvice: gap <= 12 ? row.adviceGood : row.adviceLow,
    };
  });

  const overallScore = Math.round(
    competencies.reduce((sum, c) => sum + c.currentScore, 0) / competencies.length
  );

  const sortedByGapDesc = [...competencies].sort((a, b) => b.gap - a.gap);
  const sortedByScoreDesc = [...competencies].sort((a, b) => b.currentScore - a.currentScore);
  const topPriorityGap = sortedByGapDesc[0];
  const strongestArea = sortedByScoreDesc[0];

  let readinessTier: ReadinessTier = 'Foundational Explorer';
  let tierSummary =
    'You bring valuable industry experience and clear automation opportunities; building structured data fluency and core AI literacy next will unlock rapid gains.';
  if (overallScore >= 76) {
    readinessTier = 'Production AI Strategist';
    tierSummary =
      'You already combine strong data/AI foundations with oversight discipline—focus on domain-specific MLOps, model evaluation, and portfolio architecture.';
  } else if (overallScore >= 58) {
    readinessTier = 'Applied AI Builder';
    tierSummary =
      'You have solid analytical or workflow momentum. Closing targeted gaps in applied ML modeling and RAG grounding will let you ship reliable prototypes.';
  } else if (overallScore >= 40) {
    readinessTier = 'Workflow Practitioner';
    tierSummary =
      'You understand workplace needs and basic tools; pairing structured SQL/Python habits with evaluation practices turns casual usage into career leverage.';
  }

  // Recommend relevant curriculum modules based on top gaps & goal
  const recommendedLabModules: AiReadinessReport['recommendedLabModules'] = [];
  if (dataCurrent < 60 || overallScore < 50) {
    recommendedLabModules.push({
      route: 'foundations',
      title: 'AI Foundations',
      reason: 'Establishes the 5-stage AI pipeline and human-in-the-loop framing.',
    });
  }
  if (mlCurrent < mlTarget - 15) {
    recommendedLabModules.push({
      route: 'ml',
      title: 'Machine Learning Lab',
      reason: 'Interactive regression, classification boundaries, and error minimization.',
    });
  }
  if (genaiCurrent < genaiTarget - 15) {
    recommendedLabModules.push({
      route: 'genai',
      title: 'Generative AI & RAG Lab',
      reason: 'Learn vector embeddings and retrieval-augmented grounding beyond simple prompts.',
    });
  }
  if (recommendedLabModules.length < 3) {
    recommendedLabModules.push({
      route: 'mlops',
      title: 'MLOps Lab',
      reason: 'Covers canary rollouts, drift monitoring, and model evaluation checks.',
    });
  }

  const totalGapPoints = competencies.reduce((s, c) => s + c.gap, 0);
  const estimatedHoursToReady = Math.max(12, Math.min(96, Math.round(totalGapPoints * 0.35 + 10)));

  const honestPromptNote =
    answers.aiMaturity === 'prompting-only'
      ? 'You noted experience with ChatGPT/prompting. While helpful for daily writing, enterprise AI readiness requires data preparation, evaluation metrics, and verifiable workflows.'
      : 'Readiness scores are an educational self-assessment benchmark to guide study priorities—not an official certification or hiring evaluation.';

  return {
    overallScore,
    readinessTier,
    tierSummary,
    professionTitle: profession.title,
    strongestArea,
    topPriorityGap,
    competencies,
    recommendedProjects: profession.recommendedProjects,
    recommendedLabModules: recommendedLabModules.slice(0, 3),
    estimatedHoursToReady,
    honestPromptNote,
  };
}

export function buildAiReadinessPdfDoc(
  report: AiReadinessReport,
  answers: AiReadinessAnswers
): jsPDF {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const marginX = 48;
  const maxWidth = 500;
  let y = 52;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(15, 23, 42);
  doc.text('AI Readiness & Skill-Gap Report', marginX, y);
  y += 20;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `Intel AI/ML Interactive Lab · Personalized Diagnostic (${new Date().toISOString().slice(0, 10)})`,
    marginX,
    y
  );
  y += 24;

  // Score Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(14, 116, 144);
  doc.text(
    `Readiness Score: ${report.overallScore}/100 · Tier: ${report.readinessTier}`,
    marginX,
    y
  );
  y += 18;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  const summaryLines = doc.splitTextToSize(
    `Industry Track: ${report.professionTitle} | Primary Goal: ${answers.primaryGoal} | Est. Study Focus: ~${report.estimatedHoursToReady} hrs — ${report.tierSummary}`,
    maxWidth
  );
  doc.text(summaryLines, marginX, y);
  y += summaryLines.length * 14 + 14;

  // Competency Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(14, 116, 144);
  doc.text('Competency Skill-Gap Breakdown', marginX, y);
  y += 18;

  for (const row of report.competencies) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(
      `${row.dimension}: Current ${row.currentScore}/100 vs. Target ${row.targetScore}/100 (Gap: ${row.gap} pts · ${row.status})`,
      marginX,
      y
    );
    y += 14;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const adviceWrapped = doc.splitTextToSize(`Next Action: ${row.actionAdvice}`, maxWidth);
    doc.text(adviceWrapped, marginX, y);
    y += adviceWrapped.length * 13 + 8;
  }

  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(14, 116, 144);
  doc.text('Recommended Interactive Labs & Applied Projects', marginX, y);
  y += 16;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  for (const mod of report.recommendedLabModules) {
    const line = doc.splitTextToSize(`• ${mod.title}: ${mod.reason}`, maxWidth);
    doc.text(line, marginX, y);
    y += line.length * 13 + 4;
  }

  y += 14;
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  const disclaimer = doc.splitTextToSize(
    `Educational Assessment Note: ${report.honestPromptNote}`,
    maxWidth
  );
  doc.text(disclaimer, marginX, y);

  return doc;
}

export function downloadAiReadinessPdf(
  report: AiReadinessReport,
  answers: AiReadinessAnswers
): string {
  const doc = buildAiReadinessPdfDoc(report, answers);
  const slug = answers.professionId.replace(/[^a-z0-9-]/gi, '-');
  const filename = `ai-readiness-skill-gap-${slug}.pdf`;
  doc.save(filename);
  return filename;
}
