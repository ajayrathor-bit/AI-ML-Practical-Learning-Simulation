import { jsPDF } from 'jspdf';
import type {
  CustomUserProfile,
  PersonalizedTransformationPlan,
  ProfessionProfile,
  ProjectLabId,
} from '../types/careerStudio';

// ==========================================
// Project 1: AI Resume Screening Simulator
// ==========================================

export interface ResumeEvaluationResult {
  extractedSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  skillOverlapScore: number; // 0..100
  experienceFitScore: number; // 0..100
  compositeScore: number; // 0..100
  recommendationBand: 'Strong Shortlist Review' | 'Borderline — Check Transferable Skills' | 'Low Keyword Match';
  humanReviewNote: string;
}

const KNOWN_SKILL_CATALOG = [
  'python',
  'sql',
  'statistics',
  'tableau',
  'power bi',
  'machine learning',
  'forecasting',
  'stakeholder reporting',
  'stakeholder management',
  'agile',
  'product roadmap',
  'rag',
  'process automation',
  'kpi',
  'excel',
  'nlp',
  'deep learning',
  'git',
];

export function evaluateResumeMatch(params: {
  resumeText: string;
  yearsExp: number;
  requiredSkills: string[];
  minYears: number;
}): ResumeEvaluationResult {
  const normalized = params.resumeText.toLowerCase();
  const catalogToScan = Array.from(
    new Set([...KNOWN_SKILL_CATALOG, ...params.requiredSkills.map((s) => s.toLowerCase().trim())])
  ).filter(Boolean);

  const extractedSkills = catalogToScan.filter((skill) => normalized.includes(skill));
  const reqLower = params.requiredSkills.map((s) => s.toLowerCase().trim()).filter(Boolean);
  const matchedSkills = reqLower.filter((req) => normalized.includes(req));
  const missingSkills = reqLower.filter((req) => !normalized.includes(req));

  const skillOverlapScore =
    reqLower.length > 0 ? Math.round((matchedSkills.length / reqLower.length) * 100) : 0;

  const minY = Math.max(1, params.minYears);
  const experienceFitScore = Math.min(100, Math.round((params.yearsExp / minY) * 85 + 15));
  const compositeScore = Math.round(skillOverlapScore * 0.72 + experienceFitScore * 0.28);

  const recommendationBand: ResumeEvaluationResult['recommendationBand'] =
    compositeScore >= 72
      ? 'Strong Shortlist Review'
      : compositeScore >= 45
      ? 'Borderline — Check Transferable Skills'
      : 'Low Keyword Match';

  const humanReviewNote =
    missingSkills.length > 0
      ? `Human recruiter check advised: verify if candidate holds unlisted synonyms for ${missingSkills.slice(0, 3).join(', ')}.`
      : 'All core criteria detected in text; recruiter should evaluate depth and behavioral fit.';

  return {
    extractedSkills,
    matchedSkills,
    missingSkills,
    skillOverlapScore,
    experienceFitScore,
    compositeScore,
    recommendationBand,
    humanReviewNote,
  };
}

// ==========================================
// Project 2: Sales Prediction & Lead Scoring
// ==========================================

export interface LeadScoreInput {
  companySizeEmployees: number; // 10..5000
  engagementTouches: number; // 0..20
  budgetConfirmed: boolean;
  decisionMakerEngaged: boolean;
  daysSinceLastReply: number; // 0..45
}

export interface LeadScoreResult {
  propensityScore: number; // 0..100
  tier: 'Hot Priority' | 'Warm Nurture' | 'Early Discovery';
  estimatedWinDays: number;
  drivers: Array<{ factor: string; impact: number }>;
}

export function simulateLeadScoring(input: LeadScoreInput): LeadScoreResult {
  const sizePoints = Math.min(20, Math.round(Math.log10(Math.max(10, input.companySizeEmployees)) * 6));
  const touchPoints = Math.min(28, input.engagementTouches * 2);
  const budgetPoints = input.budgetConfirmed ? 24 : 4;
  const dmPoints = input.decisionMakerEngaged ? 20 : 5;
  const recencyPenalty = Math.min(22, Math.round(input.daysSinceLastReply * 0.65));

  const raw = 12 + sizePoints + touchPoints + budgetPoints + dmPoints - recencyPenalty;
  const propensityScore = Math.max(5, Math.min(98, Math.round(raw)));

  const tier: LeadScoreResult['tier'] =
    propensityScore >= 72 ? 'Hot Priority' : propensityScore >= 45 ? 'Warm Nurture' : 'Early Discovery';
  const estimatedWinDays = Math.max(12, Math.round(68 - propensityScore * 0.45));

  return {
    propensityScore,
    tier,
    estimatedWinDays,
    drivers: [
      { factor: 'Engagement Velocity', impact: touchPoints },
      { factor: 'Budget Clarity', impact: budgetPoints },
      { factor: 'Decision-Maker Access', impact: dmPoints },
      { factor: 'Account Scale Fit', impact: sizePoints },
      { factor: 'Reply Recency Drag', impact: -recencyPenalty },
    ],
  };
}

// ==========================================
// Project 3: Banking Fraud Detection Simulator
// ==========================================

export interface FraudTxInput {
  amountUsd: number;
  baselineAvgUsd: number;
  geoDistanceKm: number;
  txLastHour: number;
  unusualHour: boolean;
}

export interface FraudEvalResult {
  riskScore: number; // 0..100
  decisionTier: 'Low Risk — Auto Clear' | 'Medium Risk — Step-Up OTP' | 'High Risk — Analyst Hold';
  amountRatio: number;
  contributors: Array<{ signal: string; contribution: number }>;
}

export function evaluateFraudRisk(input: FraudTxInput): FraudEvalResult {
  const safeAvg = Math.max(20, input.baselineAvgUsd);
  const amountRatio = Number((input.amountUsd / safeAvg).toFixed(2));
  const amountScore = Math.min(36, Math.max(0, Math.round((amountRatio - 1) * 9)));
  const geoScore = Math.min(30, Math.round(input.geoDistanceKm / 40));
  const velocityScore = Math.min(24, Math.max(0, (input.txLastHour - 1) * 5));
  const hourScore = input.unusualHour ? 12 : 0;

  const riskScore = Math.max(2, Math.min(99, 6 + amountScore + geoScore + velocityScore + hourScore));
  const decisionTier: FraudEvalResult['decisionTier'] =
    riskScore >= 70
      ? 'High Risk — Analyst Hold'
      : riskScore >= 38
      ? 'Medium Risk — Step-Up OTP'
      : 'Low Risk — Auto Clear';

  return {
    riskScore,
    decisionTier,
    amountRatio,
    contributors: [
      { signal: 'Spend Spike vs. Baseline', contribution: amountScore },
      { signal: 'Geolocation Jump', contribution: geoScore },
      { signal: '1-Hour Velocity Burst', contribution: velocityScore },
      { signal: 'Off-Hours Activity', contribution: hourScore },
    ],
  };
}

// ==========================================
// Project 4: Healthcare Predictive Capacity & Operations
// ==========================================

export interface HealthcareOpsInput {
  baseDailyVisits: number;
  seasonalSurgePct: number; // -15..45
  scheduledProcedures: number; // 5..60
  staffOnDuty: number; // 10..60
  totalBeds: number;
}

export interface HealthcareOpsForecastPoint {
  day: string;
  projectedVisits: number;
  bedOccupancyPct: number;
  supportQueueLoad: number;
}

export interface HealthcareOpsResult {
  series: HealthcareOpsForecastPoint[];
  peakOccupancyPct: number;
  staffingPressure: 'Balanced Capacity' | 'Monitor Surge Buffer' | 'Reallocate Admin Shifts';
  followUpPriorityCount: number;
}

export function simulateHealthcareOperations(input: HealthcareOpsInput): HealthcareOpsResult {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayMultipliers = [1.08, 1.12, 1.05, 1.02, 0.98, 0.84, 0.78];

  const series: HealthcareOpsForecastPoint[] = days.map((day, idx) => {
    const surgeFactor = 1 + input.seasonalSurgePct / 100;
    const projectedVisits = Math.round(
      input.baseDailyVisits * dayMultipliers[idx] * surgeFactor + input.scheduledProcedures * 0.45
    );
    const occupiedBeds = Math.min(
      input.totalBeds,
      Math.round(projectedVisits * 0.42 + input.scheduledProcedures * 0.65)
    );
    const bedOccupancyPct = Math.min(100, Math.round((occupiedBeds / Math.max(1, input.totalBeds)) * 100));
    const supportQueueLoad = Math.round(projectedVisits * 0.16);
    return { day, projectedVisits, bedOccupancyPct, supportQueueLoad };
  });

  const peakOccupancyPct = Math.max(...series.map((s) => s.bedOccupancyPct));
  const avgVisits = series.reduce((acc, s) => acc + s.projectedVisits, 0) / series.length;
  const visitsPerStaff = avgVisits / Math.max(1, input.staffOnDuty);

  const staffingPressure: HealthcareOpsResult['staffingPressure'] =
    peakOccupancyPct >= 88 || visitsPerStaff > 5.2
      ? 'Reallocate Admin Shifts'
      : peakOccupancyPct >= 75 || visitsPerStaff > 4.2
      ? 'Monitor Surge Buffer'
      : 'Balanced Capacity';

  return {
    series,
    peakOccupancyPct,
    staffingPressure,
    followUpPriorityCount: Math.round(series[0].supportQueueLoad * 1.4),
  };
}

// ==========================================
// Project 5: Inventory & Demand Forecasting
// ==========================================

export interface InventoryForecastInput {
  baseWeeklyDemand: number;
  promoBoostPct: number; // 0..60
  seasonalityStrengthPct: number; // 0..40
  currentStock: number;
  supplierLeadWeeks: number; // 1..6
}

export interface InventoryForecastWeek {
  week: string;
  actualOrExpectedDemand: number;
  manualMovingAvg: number;
  mlForecast: number;
}

export interface InventoryForecastResult {
  weeks: InventoryForecastWeek[];
  recommendedReorderUnits: number;
  manualErrorMae: number;
  mlErrorMae: number;
  stockoutRisk: 'Healthy Buffer' | 'Reorder Recommended' | 'Urgent Stockout Risk';
}

export function simulateInventoryDemand(input: InventoryForecastInput): InventoryForecastResult {
  const seasonPattern = [0.9, 0.95, 1.08, 1.24, 1.15, 0.96, 1.02, 1.18];
  const promoWeeks = new Set([3, 4, 7]);

  const weeks: InventoryForecastWeek[] = seasonPattern.map((mult, idx) => {
    const seasonalEffect = 1 + (mult - 1) * (input.seasonalityStrengthPct / 30);
    const promoLift = promoWeeks.has(idx) ? 1 + input.promoBoostPct / 100 : 1;
    const expected = Math.round(input.baseWeeklyDemand * seasonalEffect * promoLift);
    const manualMovingAvg = Math.round(input.baseWeeklyDemand * (1 + idx * 0.01));
    const mlForecast = Math.round(expected * (idx % 2 === 0 ? 0.97 : 1.03));
    return {
      week: `W${idx + 1}`,
      actualOrExpectedDemand: expected,
      manualMovingAvg,
      mlForecast,
    };
  });

  const manualErrorMae = Math.round(
    weeks.reduce((sum, w) => sum + Math.abs(w.actualOrExpectedDemand - w.manualMovingAvg), 0) / weeks.length
  );
  const mlErrorMae = Math.round(
    weeks.reduce((sum, w) => sum + Math.abs(w.actualOrExpectedDemand - w.mlForecast), 0) / weeks.length
  );

  const leadDemand = weeks
    .slice(0, Math.min(weeks.length, input.supplierLeadWeeks + 1))
    .reduce((sum, w) => sum + w.mlForecast, 0);
  const recommendedReorderUnits = Math.max(0, Math.round(leadDemand * 1.15 - input.currentStock));

  const stockoutRisk: InventoryForecastResult['stockoutRisk'] =
    input.currentStock < leadDemand * 0.75
      ? 'Urgent Stockout Risk'
      : input.currentStock < leadDemand * 1.1
      ? 'Reorder Recommended'
      : 'Healthy Buffer';

  return {
    weeks,
    recommendedReorderUnits,
    manualErrorMae,
    mlErrorMae,
    stockoutRisk,
  };
}

// ==========================================
// Project 6: AI Document Intelligence Parser
// ==========================================

export interface DocumentParseResult {
  vendorName: string | null;
  documentId: string | null;
  documentDate: string | null;
  poNumber: string | null;
  subtotal: string | null;
  taxAmount: string | null;
  totalDue: string | null;
  paymentTerms: string | null;
  lineItems: string[];
  missingFields: string[];
  confidencePct: number;
}

export function parseStructuredDocument(rawText: string): DocumentParseResult {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const findField = (patterns: RegExp[]): string | null => {
    for (const line of lines) {
      for (const regex of patterns) {
        const match = line.match(regex);
        if (match?.[1]?.trim()) {
          return match[1].trim();
        }
      }
    }
    return null;
  };

  const vendorName = findField([/^(?:VENDOR|SUPPLIER|FROM)\s*[:\-]\s*(.+)$/i]);
  const documentId = findField([/^(?:INVOICE NO|INVOICE #|CLAIM NO|DOC ID)\s*[:\-]\s*(.+)$/i]);
  const documentDate = findField([/^(?:DATE|ISSUED)\s*[:\-]\s*(.+)$/i]);
  const poNumber = findField([/^(?:PO NUMBER|PO #|REFERENCE)\s*[:\-]\s*(.+)$/i]);
  const subtotal = findField([/^(?:SUBTOTAL)\s*[:\-]\s*(.+)$/i]);
  const taxAmount = findField([/^(?:TAX(?:\s*\([^)]+\))?)\s*[:\-]\s*(.+)$/i]);
  const totalDue = findField([/^(?:TOTAL DUE|TOTAL|AMOUNT DUE)\s*[:\-]\s*(.+)$/i]);
  const paymentTerms = findField([/^(?:PAYMENT TERMS|TERMS)\s*[:\-]\s*(.+)$/i]);

  const lineItems = lines.filter((l) => l.startsWith('-') || /\$\d+/.test(l) && /@|x\s+\d+/i.test(l));

  const requiredChecks: Array<[string, string | null]> = [
    ['Vendor Name', vendorName],
    ['Invoice / Document Number', documentId],
    ['Issue Date', documentDate],
    ['PO / Reference Number', poNumber],
    ['Tax Breakdown', taxAmount],
    ['Total Due', totalDue],
    ['Payment Terms', paymentTerms],
  ];

  const missingFields = requiredChecks.filter(([, val]) => !val).map(([name]) => name);
  const foundCount = requiredChecks.length - missingFields.length;
  const confidencePct = Math.round((foundCount / requiredChecks.length) * 96 + (lineItems.length > 0 ? 4 : 0));

  return {
    vendorName,
    documentId,
    documentDate,
    poNumber,
    subtotal,
    taxAmount,
    totalDue,
    paymentTerms,
    lineItems,
    missingFields,
    confidencePct: Math.min(100, confidencePct),
  };
}

// ==========================================
// Project 7: AI Customer Support Agent
// ==========================================

export interface SupportAnalysisResult {
  intent: 'Billing & Refund' | 'Technical Outage' | 'Account & Access' | 'Order & Delivery' | 'General Policy';
  sentiment: 'Distressed / Urgent' | 'Neutral' | 'Positive';
  escalationRequired: boolean;
  escalationReason: string | null;
  confidencePct: number;
  suggestedReply: string;
}

export function analyzeSupportMessage(message: string): SupportAnalysisResult {
  const lower = message.toLowerCase();

  let intent: SupportAnalysisResult['intent'] = 'General Policy';
  if (/(refund|charged twice|invoice|billing|payment|cancel)/i.test(lower)) {
    intent = 'Billing & Refund';
  } else if (/(crash|error|500|down|bug|broken|outage|latency)/i.test(lower)) {
    intent = 'Technical Outage';
  } else if (/(login|password|sso|locked|access|permission)/i.test(lower)) {
    intent = 'Account & Access';
  } else if (/(shipping|delivery|tracking|parcel|delayed|order)/i.test(lower)) {
    intent = 'Order & Delivery';
  }

  const urgentWords = ['furious', 'unacceptable', 'charged twice', 'lawsuit', 'cancel', 'broken', 'urgent', 'terrible', 'days waiting'];
  const positiveWords = ['thanks', 'great', 'helpful', 'resolved', 'appreciate', 'quick'];
  const hasUrgent = urgentWords.some((w) => lower.includes(w));
  const hasPositive = positiveWords.some((w) => lower.includes(w));

  const sentiment: SupportAnalysisResult['sentiment'] = hasUrgent
    ? 'Distressed / Urgent'
    : hasPositive
    ? 'Positive'
    : 'Neutral';

  const escalationRequired =
    sentiment === 'Distressed / Urgent' ||
    (intent === 'Billing & Refund' && /(twice|unauthorized|dispute)/i.test(lower)) ||
    intent === 'Technical Outage';

  const escalationReason = escalationRequired
    ? `Escalated for priority human review due to ${sentiment === 'Distressed / Urgent' ? 'high customer frustration' : intent.toLowerCase()} risk.`
    : null;

  const replyTemplates: Record<SupportAnalysisResult['intent'], string> = {
    'Billing & Refund':
      'I have logged your billing inquiry and flagged any duplicate charge check for our Billing Specialist team. You will receive an itemized confirmation within 2 business hours.',
    'Technical Outage':
      'I understand service reliability is critical. I have tagged this as a priority technical incident with diagnostic logs attached for our on-call engineering team.',
    'Account & Access':
      'I can help verify your workspace access right away. Please confirm your registered organization email while I trigger a secure SSO & permission check.',
    'Order & Delivery':
      'I have retrieved your fulfillment timeline and checked carrier scan milestones. If transit remains stalled past 24 hours, a specialist will initiate a replacement shipment.',
    'General Policy':
      'Thank you for reaching out. Based on our standard support guidelines, I have prepared the relevant policy details and can connect you with a specialist anytime.',
  };

  return {
    intent,
    sentiment,
    escalationRequired,
    escalationReason,
    confidencePct: intent === 'General Policy' ? 76 : 91,
    suggestedReply: replyTemplates[intent],
  };
}

// ==========================================
// Project 8: Business Intelligence Simulator
// ==========================================

export interface BiScenarioInput {
  growthTargetPct: number; // -10..35
  costEfficiencyPct: number; // 0..20
  churnReductionPts: number; // 0..5
}

export interface BiQuarterPoint {
  quarter: string;
  revenueK: number;
  marginPct: number;
  projectedRevenueK: number;
}

export function simulateBusinessIntelligence(input: BiScenarioInput): {
  quarters: BiQuarterPoint[];
  annualProjectedRevenueK: number;
  projectedAvgMarginPct: number;
  executiveInsights: string[];
} {
  const baseRevenue = [820, 890, 940, 1020];
  const baseMargin = [21.4, 22.1, 22.8, 23.5];

  const quarters: BiQuarterPoint[] = ['Q1', 'Q2', 'Q3', 'Q4'].map((quarter, i) => {
    const retentionBoost = 1 + (input.churnReductionPts * 0.012 * (i + 1)) / 2;
    const growthMult = 1 + (input.growthTargetPct / 100) * ((i + 1) / 4);
    const projectedRevenueK = Math.round(baseRevenue[i] * growthMult * retentionBoost);
    const marginPct = Number(
      (baseMargin[i] + input.costEfficiencyPct * 0.45 + input.churnReductionPts * 0.4).toFixed(1)
    );
    return {
      quarter,
      revenueK: baseRevenue[i],
      marginPct,
      projectedRevenueK,
    };
  });

  const annualProjectedRevenueK = quarters.reduce((sum, q) => sum + q.projectedRevenueK, 0);
  const projectedAvgMarginPct = Number(
    (quarters.reduce((sum, q) => sum + q.marginPct, 0) / quarters.length).toFixed(1)
  );

  const executiveInsights = [
    `Scenario lifts projected annual revenue to $${(annualProjectedRevenueK / 1000).toFixed(2)}M (${input.growthTargetPct >= 0 ? '+' : ''}${input.growthTargetPct}% top-line lever).`,
    `Reducing churn by ${input.churnReductionPts} pts compounds Q4 recurring retention revenue by +$${Math.round(quarters[3].projectedRevenueK - baseRevenue[3])}K.`,
    `Operating efficiency (+${input.costEfficiencyPct}%) expands average EBITDA margin to ${projectedAvgMarginPct}%.`,
  ];

  return {
    quarters,
    annualProjectedRevenueK,
    projectedAvgMarginPct,
    executiveInsights,
  };
}

// ==========================================
// Project 9: Code Assistant & Bug Detector
// ==========================================

export interface CodeFinding {
  severity: 'High' | 'Medium' | 'Low';
  title: string;
  explanation: string;
  suggestedFix: string;
}

export interface CodeReviewResult {
  findings: CodeFinding[];
  generatedTestSnippet: string;
  readinessSummary: string;
}

export function analyzeCodeForBugs(code: string): CodeReviewResult {
  const findings: CodeFinding[] = [];

  if (/<=\s*\w+\.length/.test(code)) {
    findings.push({
      severity: 'High',
      title: 'Off-by-one loop bound (<= array.length)',
      explanation:
        'Using `i <= items.length` reads `items[items.length]` which is `undefined`, throwing a runtime TypeError on property access.',
      suggestedFix: 'Replace `i <= items.length` with `i < items.length` or iterate with `for (const item of items)`.',
    });
  }

  if (/\/\s*\w+\.length/.test(code) && !/\.length\s*(?:===|!==|>|<)\s*0/.test(code)) {
    findings.push({
      severity: 'Medium',
      title: 'Unchecked division by empty array length',
      explanation: 'If the input array is empty, dividing by `.length` evaluates to `NaN` or `Infinity`.',
      suggestedFix: 'Guard upfront: `if (items.length === 0) return 0;` before dividing.',
    });
  }

  if (/SELECT\s+.+\+\s*\w+/i.test(code) || /`SELECT\s+.+\$\{/i.test(code)) {
    findings.push({
      severity: 'High',
      title: 'SQL injection risk from string-concatenated query',
      explanation: 'Concatenating user input directly into SQL allows crafted input to alter query semantics.',
      suggestedFix: 'Use parameterized queries: `db.execute("SELECT id, role FROM users WHERE email = $1", [emailInput])`.',
    });
  }

  if (/rows\[0\]\./.test(code) && !/rows\.length/.test(code) && !/\?\./.test(code)) {
    findings.push({
      severity: 'Medium',
      title: 'Potential undefined access on empty query result',
      explanation: 'Accessing `rows[0].role` crashes when no matching record exists.',
      suggestedFix: 'Check `if (!rows.length) return null;` or use optional chaining `rows[0]?.role ?? null`.',
    });
  }

  if (/if\s*\([^=]*[^=!<>]=[^=][^)]*\)/.test(code)) {
    findings.push({
      severity: 'High',
      title: 'Assignment (=) inside conditional if(...) expression',
      explanation:
        'Single `=` mutates `tx.status` and evaluates truthy for non-empty strings instead of comparing equality.',
      suggestedFix: 'Change `=` to strict equality `===`: `if (tx.status === "flagged")`.',
    });
  }

  if (findings.length === 0) {
    findings.push({
      severity: 'Low',
      title: 'No common pattern bugs triggered — add boundary tests',
      explanation:
        'Static heuristic scan found no loop-bound, single-equals, or SQL concatenation issues in the snippet.',
      suggestedFix: 'Verify null inputs, empty collections, and numeric edge values with automated unit tests.',
    });
  }

  const generatedTestSnippet = `test('handles empty and nominal inputs safely', () => {
  assert.doesNotThrow(() => targetFn([]));
  assert.equal(typeof targetFn([{ price: 20, qty: 2 }], 10), 'number');
});`;

  const highCount = findings.filter((f) => f.severity === 'High').length;
  const readinessSummary =
    highCount > 0
      ? `${highCount} high-severity bug pattern(s) flagged for developer review before merge.`
      : 'No high-severity static patterns found; human logic & test review still required.';

  return { findings, generatedTestSnippet, readinessSummary };
}

// ==========================================
// Project 10: Marketing Campaign Intelligence
// ==========================================

export interface MarketingInput {
  monthlyBudgetK: number; // 10..150
  audienceSegment: 'High-Intent Repeat Buyers' | 'Mid-Funnel Evaluators' | 'Price-Sensitive Browsers';
  channelMixEmailPct: number; // 10..60
}

export interface MarketingClusterPoint {
  segment: string;
  sharePct: number;
  predictedRoas: number;
  projectedConversions: number;
}

export function simulateMarketingIntelligence(input: MarketingInput): {
  segments: MarketingClusterPoint[];
  estimatedConversions: number;
  estimatedBlendedRoas: number;
  suggestedHeadline: string;
  suggestedCta: string;
} {
  const segMult =
    input.audienceSegment === 'High-Intent Repeat Buyers'
      ? 1.32
      : input.audienceSegment === 'Mid-Funnel Evaluators'
      ? 1.05
      : 0.84;
  const emailLift = 1 + (input.channelMixEmailPct - 25) * 0.004;

  const segments: MarketingClusterPoint[] = [
    {
      segment: 'Repeat VIP',
      sharePct: 28,
      predictedRoas: Number((4.2 * emailLift).toFixed(2)),
      projectedConversions: Math.round(input.monthlyBudgetK * 11.4 * emailLift),
    },
    {
      segment: 'Active Evaluators',
      sharePct: 44,
      predictedRoas: Number((2.9 * segMult).toFixed(2)),
      projectedConversions: Math.round(input.monthlyBudgetK * 8.6 * segMult),
    },
    {
      segment: 'Deal Seekers',
      sharePct: 28,
      predictedRoas: Number((1.85 * (1.12 - input.channelMixEmailPct * 0.002)).toFixed(2)),
      projectedConversions: Math.round(input.monthlyBudgetK * 6.2),
    },
  ];

  const estimatedConversions = Math.round(
    segments.reduce((s, item) => s + item.projectedConversions, 0) * 0.45 * segMult
  );
  const estimatedBlendedRoas = Number((2.65 * segMult * emailLift).toFixed(2));

  const copyMap: Record<MarketingInput['audienceSegment'], { h: string; c: string }> = {
    'High-Intent Repeat Buyers': {
      h: 'Unlock Your Next Workspace Upgrade — Priority Loyalty Access Inside',
      c: 'Claim Member Bundle',
    },
    'Mid-Funnel Evaluators': {
      h: 'See How Teams Cut Weekly Reporting Hours in Half — Live Walkthrough',
      c: 'Explore Interactive Demo',
    },
    'Price-Sensitive Browsers': {
      h: 'Starter Plan Savings: Transparent Pricing With Zero Annual Lock-In',
      c: 'Compare Value Tiers',
    },
  };

  return {
    segments,
    estimatedConversions,
    estimatedBlendedRoas,
    suggestedHeadline: copyMap[input.audienceSegment].h,
    suggestedCta: copyMap[input.audienceSegment].c,
  };
}

// ==========================================
// Step 8: Personalized Career Transformation Engine
// ==========================================

export function buildPersonalizedTransformation(
  profile: CustomUserProfile,
  profession: ProfessionProfile
): PersonalizedTransformationPlan {
  const customTasksRaw = [profile.timeConsumingTasks, profile.keyResponsibilities]
    .join(',')
    .split(/[\n,;]+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 4);

  const taskList =
    customTasksRaw.length >= 2
      ? customTasksRaw.slice(0, 4)
      : profession.responsibilities.slice(0, 3).map((r) => r.title);

  const automationOpportunities = taskList.map((taskName, index) => {
    const matchedResp =
      profession.responsibilities.find((r) =>
        taskName.toLowerCase().includes(r.title.toLowerCase().split(' ')[0])
      ) ?? profession.responsibilities[index % profession.responsibilities.length];

    return {
      task: taskName,
      aiApproach: matchedResp.howAiAssists,
      estimatedHoursSavedWeekly: Math.max(2, 5 - index),
      humanControl: matchedResp.workflow.humanReview,
    };
  });

  const existingLower = new Set(profile.existingTechnicalSkills.map((s) => s.toLowerCase()));
  const prioritySkillsToLearn = profession.newAiSkills.filter(
    (skill) => !existingLower.has(skill.toLowerCase())
  );

  const focusByObjective: Record<
    CustomUserProfile['careerObjective'],
    Array<{ phase: string; focus: string; deliverable: string }>
  > = {
    'upskill-current-role': [
      {
        phase: 'Weeks 1–3 · Foundations & Data Fluency',
        focus: `Python & SQL essentials framed around ${profession.shortTitle} datasets`,
        deliverable: 'Clean automated KPI summary replacing manual weekly spreadsheets',
      },
      {
        phase: 'Weeks 4–6 · Domain ML & Evaluation',
        focus: 'Classification, forecasting & precision/recall calibration',
        deliverable: `Working ${profession.recommendedProjects[0].replace(/-/g, ' ')} prototype`,
      },
      {
        phase: 'Weeks 7–8 · GenAI, RAG & Human Review',
        focus: 'Document intelligence & grounded assistants with verification gates',
        deliverable: 'Present AI workflow ROI pitch to your current manager',
      },
    ],
    'lead-ai-projects': [
      {
        phase: 'Weeks 1–3 · Problem Framing & Data Readiness',
        focus: `Auditing ${profession.shortTitle} workflows for high-ROI AI opportunities`,
        deliverable: 'Prioritized 90-day department AI feasibility scorecard',
      },
      {
        phase: 'Weeks 4–6 · Cross-Functional ML & RAG Architecture',
        focus: 'Model evaluation metrics, bias checks, and cost-latency trade-offs',
        deliverable: 'Pilot specification linking ML/LLM outputs to business KPIs',
      },
      {
        phase: 'Weeks 7–8 · Production Governance & Rollout',
        focus: 'MLOps drift monitoring, canary launches & human-in-the-loop SOPs',
        deliverable: 'Executive transformation governance brief',
      },
    ],
    'transition-ai-role': [
      {
        phase: 'Weeks 1–4 · Python, SQL & Statistics Core',
        focus: 'Data manipulation, exploratory analysis, and baseline statistics',
        deliverable: 'Clean portfolio repository with domain dataset analysis',
      },
      {
        phase: 'Weeks 5–8 · Applied ML & NLP Portfolio',
        focus: 'End-to-end modeling, evaluation benchmarks & explainability',
        deliverable: `2 domain-anchored projects (${profession.recommendedProjects.slice(0, 2).join(', ')})`,
      },
      {
        phase: 'Weeks 9–12 · GenAI, Deployment & Career Positioning',
        focus: 'RAG grounding, MLOps lifecycle & translating prior experience',
        deliverable: 'Complete portfolio showcase + domain-bridge resume story',
      },
    ],
  };

  return {
    profile,
    automationOpportunities,
    recommendedProjects: profession.recommendedProjects,
    prioritySkillsToLearn:
      prioritySkillsToLearn.length > 0 ? prioritySkillsToLearn : profession.newAiSkills,
    suggestedPathways: profession.possiblePathways,
    learningRoadmapWeeks: focusByObjective[profile.careerObjective],
  };
}

// ==========================================
// PDF Report Generators (jsPDF)
// ==========================================

export function buildCareerTransformationPdfDoc(
  plan: PersonalizedTransformationPlan,
  profession: ProfessionProfile
): jsPDF {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const marginX = 48;
  const maxWidth = 500;
  let y = 52;

  const ensureSpace = (needed: number) => {
    if (y + needed > 780) {
      doc.addPage();
      y = 52;
    }
  };

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(15, 23, 42);
  doc.text('AI Career Transformation Report', marginX, y);
  y += 20;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `Intel AI/ML Interactive Lab · Educational Career Planning Summary (${new Date().toISOString().slice(0, 10)})`,
    marginX,
    y
  );
  y += 24;

  // Profile Overview
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(14, 116, 144);
  doc.text('1. Professional Profile', marginX, y);
  y += 16;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  const profileLines = [
    `Current Designation: ${plan.profile.designation || profession.title}`,
    `Industry Track: ${profession.title}`,
    `Experience: ${plan.profile.yearsExperience} year(s)`,
    `Existing Technical Skills: ${plan.profile.existingTechnicalSkills.length > 0 ? plan.profile.existingTechnicalSkills.join(', ') : 'Domain expertise focus'}`,
  ];
  for (const line of profileLines) {
    const wrapped = doc.splitTextToSize(line, maxWidth);
    doc.text(wrapped, marginX, y);
    y += wrapped.length * 14;
  }
  y += 10;

  // Automation Opportunities
  ensureSpace(120);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(14, 116, 144);
  doc.text('2. Priority AI Workflow & Automation Opportunities', marginX, y);
  y += 16;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  for (const opp of plan.automationOpportunities) {
    ensureSpace(54);
    const block = doc.splitTextToSize(
      `• ${opp.task} (~${opp.estimatedHoursSavedWeekly} hrs/wk potential savings): ${opp.aiApproach} | Human Oversight: ${opp.humanControl}`,
      maxWidth
    );
    doc.text(block, marginX, y);
    y += block.length * 13 + 6;
  }
  y += 8;

  // Skills & Roadmap
  ensureSpace(120);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(14, 116, 144);
  doc.text('3. Recommended AI/ML Skills & Learning Roadmap', marginX, y);
  y += 16;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  const skillsText = doc.splitTextToSize(
    `Target Capabilities: ${plan.prioritySkillsToLearn.join(' · ')}`,
    maxWidth
  );
  doc.text(skillsText, marginX, y);
  y += skillsText.length * 14 + 6;

  for (const step of plan.learningRoadmapWeeks) {
    ensureSpace(46);
    const row = doc.splitTextToSize(`${step.phase}: ${step.focus} -> Deliverable: ${step.deliverable}`, maxWidth);
    doc.text(row, marginX, y);
    y += row.length * 13 + 5;
  }
  y += 10;

  // Pathways + Honest Disclaimer
  ensureSpace(100);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(14, 116, 144);
  doc.text('4. Possible Career Evolution Pathways (Exploratory)', marginX, y);
  y += 16;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  for (const path of plan.suggestedPathways) {
    ensureSpace(36);
    const row = doc.splitTextToSize(`• ${path.roleTitle} (${path.transitionFit}): ${path.exampleFocus}`, maxWidth);
    doc.text(row, marginX, y);
    y += row.length * 13 + 4;
  }

  ensureSpace(46);
  y += 12;
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  const disclaimer = doc.splitTextToSize(
    'Educational Disclaimer: This personalized guide summarizes simulated workflow examples and skill pathways. It is designed for career planning and does not guarantee job placement, salary outcomes, or official certification.',
    maxWidth
  );
  doc.text(disclaimer, marginX, y);

  return doc;
}

export function downloadCareerTransformationPdf(
  plan: PersonalizedTransformationPlan,
  profession: ProfessionProfile
): string {
  const doc = buildCareerTransformationPdfDoc(plan, profession);
  const safeSlug = profession.id.replace(/[^a-z0-9-]/gi, '-');
  const filename = `ai-career-transformation-${safeSlug}.pdf`;
  doc.save(filename);
  return filename;
}

export function downloadDocumentExtractPdf(
  parsed: DocumentParseResult,
  sourceLabel: string
): string {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('AI Document Intelligence — Extracted Fields Summary', 48, 52);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Source Preset / File: ${sourceLabel} | Extraction Confidence: ${parsed.confidencePct}%`, 48, 72);

  let y = 104;
  const rows: Array<[string, string]> = [
    ['Vendor / Provider', parsed.vendorName ?? 'MISSING'],
    ['Document / Invoice ID', parsed.documentId ?? 'MISSING'],
    ['Date', parsed.documentDate ?? 'MISSING'],
    ['PO / Reference', parsed.poNumber ?? 'MISSING'],
    ['Subtotal', parsed.subtotal ?? 'Not specified'],
    ['Tax Amount', parsed.taxAmount ?? 'MISSING'],
    ['Total Due', parsed.totalDue ?? 'MISSING'],
    ['Payment Terms', parsed.paymentTerms ?? 'MISSING'],
    ['Missing Required Fields', parsed.missingFields.length > 0 ? parsed.missingFields.join(', ') : 'None detected'],
  ];

  for (const [k, v] of rows) {
    doc.setFont('helvetica', 'bold');
    doc.text(`${k}:`, 48, y);
    doc.setFont('helvetica', 'normal');
    doc.text(v, 210, y);
    y += 20;
  }

  const filename = 'document-intelligence-extract.pdf';
  doc.save(filename);
  return filename;
}
