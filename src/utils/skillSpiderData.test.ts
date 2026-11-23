import test from 'node:test';
import assert from 'node:assert/strict';
import { PROFESSIONS } from '../data/careerStudioData';
import {
  buildSkillSpiderComparison,
  CAREER_RADAR_PATHS,
  getProfessionBaselineProfile,
  getRecommendedCareerPathForProfession,
  RADAR_AXES,
} from './skillSpiderData';

test('all 6 career paths and 15 professions produce complete 6-axis radar comparisons', () => {
  assert.equal(CAREER_RADAR_PATHS.length, 6);
  assert.equal(RADAR_AXES.length, 6);

  for (const prof of PROFESSIONS) {
    const baseline = getProfessionBaselineProfile(prof.id);
    const defaultPath = getRecommendedCareerPathForProfession(prof.id);
    const comparison = buildSkillSpiderComparison(defaultPath, baseline);

    assert.equal(comparison.axes.length, 6);
    assert.ok(comparison.averageProfessionalScore > 0);
    assert.ok(comparison.averageAiTargetScore > 0);
    for (const axis of comparison.axes) {
      assert.ok(Number.isFinite(axis.gap) && axis.gap >= 0);
    }
  }
});

test('toggling career paths updates target AI/ML technical requirements and priority gaps', () => {
  const opsBaseline = getProfessionBaselineProfile('operations-supply');

  const mlComp = buildSkillSpiderComparison('applied-ml-engineer', opsBaseline);
  const genaiComp = buildSkillSpiderComparison('genai-workflow-architect', opsBaseline);

  const mlModelingTarget =
    mlComp.axes.find((a) => a.key === 'ml-modeling')?.aiTechnicalSkills ?? 0;
  const genaiModelingTarget =
    genaiComp.axes.find((a) => a.key === 'ml-modeling')?.aiTechnicalSkills ?? 0;

  assert.ok(mlModelingTarget > genaiModelingTarget);
  assert.equal(genaiComp.largestGaps[0].key, 'nlp-genai');
  assert.equal(mlComp.largestGaps[0].key, 'ml-modeling');
});

test('raising a user professional skill score dynamically narrows its gap and upgrades status', () => {
  const base = getProfessionBaselineProfile('sales-bd');
  const before = buildSkillSpiderComparison('applied-ml-engineer', base);
  const mlBefore = before.axes.find((a) => a.key === 'ml-modeling')!;
  assert.equal(mlBefore.status, 'Priority Gap');

  const improved = { ...base, 'ml-modeling': 90 };
  const after = buildSkillSpiderComparison('applied-ml-engineer', improved);
  const mlAfter = after.axes.find((a) => a.key === 'ml-modeling')!;

  assert.ok(mlAfter.gap < mlBefore.gap);
  assert.equal(mlAfter.status, 'Ready / Strength');
});
