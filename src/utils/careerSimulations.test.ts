import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PROFESSIONS,
  AI_PIPELINE_STAGES,
  PROJECT_LABS_META,
  TECH_EXPLAINERS,
  SAMPLE_RESUMES,
  SAMPLE_JOB_DESCRIPTIONS,
  SAMPLE_INVOICES,
  SAMPLE_CODE_SNIPPETS,
} from '../data/careerStudioData';
import {
  evaluateResumeMatch,
  simulateLeadScoring,
  evaluateFraudRisk,
  simulateHealthcareOperations,
  simulateInventoryDemand,
  parseStructuredDocument,
  analyzeSupportMessage,
  simulateBusinessIntelligence,
  analyzeCodeForBugs,
  simulateMarketingIntelligence,
  buildPersonalizedTransformation,
  buildCareerTransformationPdfDoc,
} from './careerSimulations';

test('all 15 professions, 7 pipeline stages, 10 projects, and 14 technologies are completely populated', () => {
  assert.equal(PROFESSIONS.length, 15);
  assert.equal(AI_PIPELINE_STAGES.length, 7);
  assert.equal(PROJECT_LABS_META.length, 10);
  assert.equal(TECH_EXPLAINERS.length, 14);

  for (const prof of PROFESSIONS) {
    assert.ok(prof.responsibilities.length >= 5 && prof.responsibilities.length <= 8, `${prof.id} responsibilities`);
    assert.ok(prof.beforeAfterSteps.length >= 4, `${prof.id} beforeAfterSteps`);
    assert.ok(prof.recommendedProjects.length >= 2, `${prof.id} recommendedProjects`);
    assert.ok(prof.skillGapData.length >= 4, `${prof.id} skillGapData`);
    assert.ok(prof.possiblePathways.length >= 2, `${prof.id} possiblePathways`);
  }
});

test('Project 1 resume matcher scores stronger keyword match higher and notes human check', () => {
  const jd = SAMPLE_JOB_DESCRIPTIONS[0];
  const resPriya = evaluateResumeMatch({
    resumeText: SAMPLE_RESUMES[0].text,
    yearsExp: SAMPLE_RESUMES[0].yearsExp,
    requiredSkills: jd.requiredSkills,
    minYears: jd.minYears,
  });
  const resArjun = evaluateResumeMatch({
    resumeText: SAMPLE_RESUMES[1].text,
    yearsExp: SAMPLE_RESUMES[1].yearsExp,
    requiredSkills: jd.requiredSkills,
    minYears: jd.minYears,
  });
  assert.ok(resPriya.compositeScore > resArjun.compositeScore);
  assert.ok(resPriya.matchedSkills.includes('python'));
  assert.ok(resPriya.humanReviewNote.length > 10);
});

test('Project 2 & 3 lead scoring and fraud risk respond sensibly to elevated risk/fit inputs', () => {
  const hotLead = simulateLeadScoring({
    companySizeEmployees: 1200,
    engagementTouches: 14,
    budgetConfirmed: true,
    decisionMakerEngaged: true,
    daysSinceLastReply: 1,
  });
  const coldLead = simulateLeadScoring({
    companySizeEmployees: 15,
    engagementTouches: 1,
    budgetConfirmed: false,
    decisionMakerEngaged: false,
    daysSinceLastReply: 30,
  });
  assert.ok(hotLead.propensityScore > coldLead.propensityScore);
  assert.equal(hotLead.tier, 'Hot Priority');

  const highFraud = evaluateFraudRisk({
    amountUsd: 4200,
    baselineAvgUsd: 120,
    geoDistanceKm: 950,
    txLastHour: 6,
    unusualHour: true,
  });
  assert.ok(highFraud.riskScore >= 70);
  assert.equal(highFraud.decisionTier, 'High Risk — Analyst Hold');
});

test('Project 4 & 5 healthcare ops and inventory forecasting produce multi-point projections', () => {
  const hc = simulateHealthcareOperations({
    baseDailyVisits: 180,
    seasonalSurgePct: 25,
    scheduledProcedures: 24,
    staffOnDuty: 42,
    totalBeds: 120,
  });
  assert.equal(hc.series.length, 7);
  assert.ok(hc.peakOccupancyPct > 0 && hc.peakOccupancyPct <= 100);

  const inv = simulateInventoryDemand({
    baseWeeklyDemand: 400,
    promoBoostPct: 35,
    seasonalityStrengthPct: 25,
    currentStock: 350,
    supplierLeadWeeks: 3,
  });
  assert.equal(inv.weeks.length, 8);
  assert.ok(inv.mlErrorMae < inv.manualErrorMae);
  assert.ok(inv.recommendedReorderUnits > 0);
});

test('Project 6 document intelligence detects missing fields accurately', () => {
  const complete = parseStructuredDocument(SAMPLE_INVOICES[0].rawText);
  assert.equal(complete.missingFields.length, 0);
  assert.equal(complete.poNumber, 'PO-99104');

  const incomplete = parseStructuredDocument(SAMPLE_INVOICES[1].rawText);
  assert.ok(incomplete.missingFields.includes('PO / Reference Number'));
  assert.ok(incomplete.missingFields.includes('Tax Breakdown'));
});

test('Project 7, 8, 9, 10 simulators handle intents, scenarios, code bugs, and segments', () => {
  const support = analyzeSupportMessage('I was charged twice on my invoice and this is unacceptable!');
  assert.equal(support.intent, 'Billing & Refund');
  assert.equal(support.escalationRequired, true);

  const bi = simulateBusinessIntelligence({
    growthTargetPct: 18,
    costEfficiencyPct: 8,
    churnReductionPts: 3,
  });
  assert.equal(bi.quarters.length, 4);
  assert.ok(bi.annualProjectedRevenueK > 3670);

  const bugReport = analyzeCodeForBugs(SAMPLE_CODE_SNIPPETS[0].code);
  assert.ok(bugReport.findings.some((f) => f.title.includes('Off-by-one')));

  const sqlReport = analyzeCodeForBugs(SAMPLE_CODE_SNIPPETS[1].code);
  assert.ok(sqlReport.findings.some((f) => f.title.includes('SQL injection')));

  const mkt = simulateMarketingIntelligence({
    monthlyBudgetK: 60,
    audienceSegment: 'High-Intent Repeat Buyers',
    channelMixEmailPct: 35,
  });
  assert.equal(mkt.segments.length, 3);
  assert.ok(mkt.estimatedBlendedRoas > 2.5);
});

test('personalization engine builds tailored plan and generates valid PDF document', () => {
  const prof = PROFESSIONS[0];
  const plan = buildPersonalizedTransformation(
    {
      designation: 'Senior Credit Underwriter',
      industry: prof.id,
      yearsExperience: 6,
      keyResponsibilities: 'Loan documentation review, Credit risk checks',
      timeConsumingTasks: 'Manual PDF income checks, Monthly compliance reports',
      existingTechnicalSkills: ['Excel', 'SQL'],
      careerObjective: 'upskill-current-role',
    },
    prof
  );

  assert.ok(plan.automationOpportunities.length >= 2);
  assert.equal(plan.learningRoadmapWeeks.length, 3);

  const pdfDoc = buildCareerTransformationPdfDoc(plan, prof);
  const pdfOutput = pdfDoc.output('arraybuffer');
  assert.ok(pdfOutput.byteLength > 1000);
});
