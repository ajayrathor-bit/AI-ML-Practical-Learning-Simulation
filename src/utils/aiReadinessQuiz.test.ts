import test from 'node:test';
import assert from 'node:assert/strict';
import { PROFESSIONS } from '../data/careerStudioData';
import {
  buildAiReadinessPdfDoc,
  computeAiReadinessReport,
  type AiReadinessAnswers,
} from './aiReadinessQuiz';

test('beginner non-tech prompting profile scores lower with clear foundational gaps', () => {
  const prof = PROFESSIONS[1]; // HR & Recruitment
  const answers: AiReadinessAnswers = {
    professionId: prof.id,
    seniority: 'ic',
    dataComfort: 'non-tech',
    repetitionLoad: 'high',
    aiMaturity: 'prompting-only',
    primaryGoal: 'automate-role',
    understandsHumanOversight: true,
  };

  const report = computeAiReadinessReport(answers, prof);
  assert.ok(report.overallScore < 58, `expected foundational/practitioner score, got ${report.overallScore}`);
  assert.equal(report.competencies.length, 5);
  assert.ok(report.topPriorityGap.gap > 20);
  assert.ok(report.honestPromptNote.includes('ChatGPT/prompting'));
  assert.ok(report.recommendedLabModules.length >= 2);
});

test('advanced python + evaluation builder scores significantly higher and produces valid PDF', () => {
  const prof = PROFESSIONS[4]; // IT & Software Development
  const answers: AiReadinessAnswers = {
    professionId: prof.id,
    seniority: 'senior',
    dataComfort: 'python-ml',
    repetitionLoad: 'moderate',
    aiMaturity: 'eval-builder',
    primaryGoal: 'lead-ai',
    understandsHumanOversight: true,
  };

  const report = computeAiReadinessReport(answers, prof);
  assert.ok(report.overallScore >= 76, `expected strategist score >= 76, got ${report.overallScore}`);
  assert.equal(report.readinessTier, 'Production AI Strategist');
  assert.equal(report.professionTitle, 'IT & Software Development');

  const doc = buildAiReadinessPdfDoc(report, answers);
  const bytes = doc.output('arraybuffer');
  assert.ok(bytes.byteLength > 1000);
});

test('all 15 professions compute valid non-NaN skill gap reports cleanly', () => {
  for (const prof of PROFESSIONS) {
    const report = computeAiReadinessReport(
      {
        professionId: prof.id,
        seniority: 'manager',
        dataComfort: 'spreadsheets',
        repetitionLoad: 'moderate',
        aiMaturity: 'no-code-flows',
        primaryGoal: 'lead-ai',
        understandsHumanOversight: true,
      },
      prof
    );
    assert.ok(Number.isFinite(report.overallScore));
    assert.equal(report.competencies.length, 5);
    assert.ok(report.recommendedProjects.length >= 2);
  }
});
