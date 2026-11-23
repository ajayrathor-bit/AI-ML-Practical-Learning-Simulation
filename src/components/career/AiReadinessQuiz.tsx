import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Download,
  FlaskConical,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { PROFESSIONS, PROJECT_LABS_META } from '../../data/careerStudioData';
import type { ProfessionId, ProjectLabId } from '../../types/careerStudio';
import type { LabRouteId } from '../../types/lab';
import {
  AI_MATURITY_CHOICES,
  computeAiReadinessReport,
  DATA_COMFORT_CHOICES,
  downloadAiReadinessPdf,
  GOAL_CHOICES,
  REPETITION_CHOICES,
  SENIORITY_CHOICES,
  type AiReadinessAnswers,
  type AiReadinessReport,
} from '../../utils/aiReadinessQuiz';

interface AiReadinessQuizProps {
  selectedProfessionId: ProfessionId;
  onSelectProfession: (id: ProfessionId) => void;
  onLaunchProject: (id: ProjectLabId) => void;
  onNavigateLab: (route: LabRouteId) => void;
}

const TOTAL_STEPS = 5;

export function AiReadinessQuiz({
  selectedProfessionId,
  onSelectProfession,
  onLaunchProject,
  onNavigateLab,
}: AiReadinessQuizProps) {
  const [stepIndex, setStepIndex] = useState(0); // 0..4
  const [submittedReport, setSubmittedReport] = useState<AiReadinessReport | null>(null);
  const [downloadedFilename, setDownloadedFilename] = useState<string | null>(null);

  const [answers, setAnswers] = useState<AiReadinessAnswers>({
    professionId: selectedProfessionId,
    seniority: 'ic',
    dataComfort: 'spreadsheets',
    repetitionLoad: 'moderate',
    aiMaturity: 'prompting-only',
    primaryGoal: 'automate-role',
    understandsHumanOversight: true,
  });

  useEffect(() => {
    setAnswers((prev) => ({ ...prev, professionId: selectedProfessionId }));
  }, [selectedProfessionId]);

  const activeProfession =
    PROFESSIONS.find((p) => p.id === answers.professionId) ?? PROFESSIONS[0];

  const handleProfessionChange = (id: ProfessionId) => {
    setAnswers((prev) => ({ ...prev, professionId: id }));
    onSelectProfession(id);
  };

  const handleGenerateReport = () => {
    const report = computeAiReadinessReport(answers, activeProfession);
    setSubmittedReport(report);
    setDownloadedFilename(null);
  };

  const handleRetake = () => {
    setSubmittedReport(null);
    setDownloadedFilename(null);
    setStepIndex(0);
  };

  const handleDownloadPdf = () => {
    if (!submittedReport) return;
    const filename = downloadAiReadinessPdf(submittedReport, answers);
    setDownloadedFilename(filename);
  };

  const progressPct = Math.round(((stepIndex + 1) / TOTAL_STEPS) * 100);

  return (
    <section
      aria-label="AI Readiness Quiz"
      className="rounded-2xl border border-slate-800/90 bg-[#0D1628] p-6 space-y-6"
    >
      {/* Header Row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start border-b border-slate-800/80 pb-5">
        <div className="xl:col-span-7 space-y-1.5 min-w-0">
          <div className="flex items-center gap-2 text-xs font-medium text-cyan-300">
            <ClipboardCheck className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Interactive Self-Assessment · 5 Dimensions</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
            AI Readiness Quiz &amp; Customized Skill-Gap Report
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Assess your current industry background, analytical comfort, and workflow maturity to receive a tailored AI skill-gap profile and recommended interactive labs.
          </p>
        </div>

        <div className="xl:col-span-5 flex items-start gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3.5 py-2.5 text-xs text-blue-100 leading-relaxed min-w-0">
          <ShieldCheck className="h-4 w-4 text-cyan-300 shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            Educational Diagnostic: Scores benchmark your starting habits against applied industry workflows to guide study priorities—not a formal test or credential.
          </span>
        </div>
      </div>

      {/* QUIZ STAGE (Questions 1..5) */}
      {!submittedReport ? (
        <div className="space-y-6">
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-cyan-300 tabular-nums">
                Question {stepIndex + 1} of {TOTAL_STEPS}
              </span>
              <span className="font-mono text-slate-400 tabular-nums">{progressPct}%</span>
            </div>
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-slate-800"
              role="progressbar"
              aria-valuenow={progressPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="AI Readiness Quiz progress"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            {/* Step Jump Buttons */}
            <div className="grid grid-cols-5 gap-2 pt-1">
              {[
                'Background',
                'Data Fluency',
                'Workflow Load',
                'AI Maturity',
                'Career Goal',
              ].map((label, idx) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setStepIndex(idx)}
                  aria-current={stepIndex === idx ? 'step' : undefined}
                  className={`rounded-lg border px-2 py-1.5 text-[11px] font-medium truncate transition-colors ${
                    stepIndex === idx
                      ? 'border-cyan-400 bg-cyan-500/12 text-cyan-200'
                      : idx < stepIndex
                      ? 'border-emerald-500/30 bg-emerald-500/8 text-emerald-200'
                      : 'border-slate-800 bg-[#091122] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {idx + 1}. {label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 1: Background & Seniority */}
          {stepIndex === 0 && (
            <div className="space-y-5 rounded-xl border border-slate-800 bg-[#091122] p-5">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-slate-100">
                  1. What is your current industry track and role level?
                </h3>
                <p className="text-xs text-slate-400">
                  Your domain experience shapes which AI workflows deliver the fastest practical wins.
                </p>
              </div>

              <div>
                <label
                  htmlFor="quiz-industry-select"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  Industry Background
                </label>
                <select
                  id="quiz-industry-select"
                  value={answers.professionId}
                  onChange={(e) => handleProfessionChange(e.target.value as ProfessionId)}
                  className="w-full max-w-xl rounded-lg border border-slate-700 bg-[#0D1628] px-3 py-2.5 text-sm text-slate-100"
                >
                  {PROFESSIONS.map((prof) => (
                    <option key={prof.id} value={prof.id}>
                      {prof.title} ({prof.sectorTag})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-medium text-slate-300">Role Seniority</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {SENIORITY_CHOICES.map((opt) => {
                    const selected = answers.seniority === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setAnswers((p) => ({ ...p, seniority: opt.value }))}
                        aria-pressed={selected}
                        className={`rounded-xl border p-4 text-left transition-colors ${
                          selected
                            ? 'border-cyan-400 bg-cyan-500/12'
                            : 'border-slate-800 bg-[#0D1628] hover:border-slate-700'
                        }`}
                      >
                        <div className="text-sm font-semibold text-slate-100 mb-1">
                          {opt.label}
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{opt.detail}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Data & Analytical Comfort */}
          {stepIndex === 1 && (
            <div className="space-y-4 rounded-xl border border-slate-800 bg-[#091122] p-5">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-slate-100">
                  2. How comfortable are you working with data, spreadsheets, or code today?
                </h3>
                <p className="text-xs text-slate-400">
                  Honest answers calibrate whether your roadmap starts with data fundamentals or predictive modeling.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DATA_COMFORT_CHOICES.map((opt) => {
                  const selected = answers.dataComfort === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAnswers((p) => ({ ...p, dataComfort: opt.value }))}
                      aria-pressed={selected}
                      className={`rounded-xl border p-4 text-left transition-colors ${
                        selected
                          ? 'border-cyan-400 bg-cyan-500/12'
                          : 'border-slate-800 bg-[#0D1628] hover:border-slate-700'
                      }`}
                    >
                      <div className="text-sm font-semibold text-slate-100 mb-1">
                        {opt.label}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{opt.detail}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Repetitive Workflow & Document Load */}
          {stepIndex === 2 && (
            <div className="space-y-4 rounded-xl border border-slate-800 bg-[#091122] p-5">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-slate-100">
                  3. How many hours per week go into repetitive reporting, document triage, or manual sorting?
                </h3>
                <p className="text-xs text-slate-400">
                  High-repetition tasks are prime candidates for NLP extraction, classification, and forecasting support.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {REPETITION_CHOICES.map((opt) => {
                  const selected = answers.repetitionLoad === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAnswers((p) => ({ ...p, repetitionLoad: opt.value }))}
                      aria-pressed={selected}
                      className={`rounded-xl border p-4 text-left transition-colors ${
                        selected
                          ? 'border-cyan-400 bg-cyan-500/12'
                          : 'border-slate-800 bg-[#0D1628] hover:border-slate-700'
                      }`}
                    >
                      <div className="text-sm font-semibold text-slate-100 mb-1">
                        {opt.label}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{opt.detail}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Current AI & Automation Maturity */}
          {stepIndex === 3 && (
            <div className="space-y-4 rounded-xl border border-slate-800 bg-[#091122] p-5">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-slate-100">
                  4. Which best describes your current hands-on experience with AI systems?
                </h3>
                <p className="text-xs text-slate-400">
                  Helps distinguish everyday chat prompting from structured RAG pipelines and evaluated ML workflows.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {AI_MATURITY_CHOICES.map((opt) => {
                  const selected = answers.aiMaturity === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAnswers((p) => ({ ...p, aiMaturity: opt.value }))}
                      aria-pressed={selected}
                      className={`rounded-xl border p-4 text-left transition-colors ${
                        selected
                          ? 'border-cyan-400 bg-cyan-500/12'
                          : 'border-slate-800 bg-[#0D1628] hover:border-slate-700'
                      }`}
                    >
                      <div className="text-sm font-semibold text-slate-100 mb-1">
                        {opt.label}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{opt.detail}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: Primary Career Goal & Human Oversight Check */}
          {stepIndex === 4 && (
            <div className="space-y-5 rounded-xl border border-slate-800 bg-[#091122] p-5">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-slate-100">
                  5. What is your primary objective over the next 6–12 months?
                </h3>
                <p className="text-xs text-slate-400">
                  Your objective sets the target benchmark levels shown in your skill-gap report.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {GOAL_CHOICES.map((opt) => {
                  const selected = answers.primaryGoal === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAnswers((p) => ({ ...p, primaryGoal: opt.value }))}
                      aria-pressed={selected}
                      className={`rounded-xl border p-4 text-left transition-colors ${
                        selected
                          ? 'border-cyan-400 bg-cyan-500/12'
                          : 'border-slate-800 bg-[#0D1628] hover:border-slate-700'
                      }`}
                    >
                      <div className="text-sm font-semibold text-slate-100 mb-1">
                        {opt.label}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{opt.detail}</p>
                    </button>
                  );
                })}
              </div>

              <label className="flex items-start gap-2.5 rounded-xl border border-slate-800 bg-[#0D1628] p-4 text-xs text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={answers.understandsHumanOversight}
                  onChange={(e) =>
                    setAnswers((p) => ({ ...p, understandsHumanOversight: e.target.checked }))
                  }
                  className="accent-cyan-400 mt-0.5"
                />
                <span>
                  I verify model outputs, check for edge-case errors/bias, and keep human oversight on sensitive decisions (hiring, credit, medical logistics).
                </span>
              </label>
            </div>
          )}

          {/* Quiz Footer Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              type="button"
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-slate-700 bg-[#121E36] px-4 py-2 text-xs font-medium text-slate-200 hover:border-cyan-500/40 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              <span>Previous Question</span>
            </button>

            {stepIndex < TOTAL_STEPS - 1 ? (
              <button
                type="button"
                onClick={() => setStepIndex((i) => Math.min(TOTAL_STEPS - 1, i + 1))}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-cyan-500 px-5 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400"
              >
                <span>Next Question</span>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleGenerateReport}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>Generate My AI Skill-Gap Report</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* CUSTOMIZED SKILL-GAP REPORT VIEW */
        <div className="space-y-6">
          {/* Top Actions & Score Overview */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
            <div className="xl:col-span-5 rounded-xl border border-cyan-500/40 bg-[#091122] p-5 flex flex-col justify-between gap-4 min-w-0">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-cyan-300 uppercase">
                    {submittedReport.professionTitle}
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-emerald-300">
                    <Award className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{submittedReport.readinessTier}</span>
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-4xl font-bold text-slate-50 tabular-nums">
                    {submittedReport.overallScore}
                  </span>
                  <span className="font-mono text-sm text-slate-400">/ 100 Readiness Index</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {submittedReport.tierSummary}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-slate-800 pt-3 text-xs">
                <div>
                  <div className="text-slate-400">Strongest Area</div>
                  <div className="font-semibold text-emerald-300">
                    {submittedReport.strongestArea.dimension} ({submittedReport.strongestArea.currentScore})
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Top Priority Gap</div>
                  <div className="font-semibold text-amber-300">
                    {submittedReport.topPriorityGap.dimension} (-{submittedReport.topPriorityGap.gap} pts)
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-cyan-500 px-3.5 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Download Skill-Gap PDF</span>
                </button>
                <button
                  type="button"
                  onClick={handleRetake}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-slate-700 bg-[#121E36] px-3.5 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-500/40"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>

            {/* Recharts Skill-Gap Comparison Chart */}
            <div className="xl:col-span-7 rounded-xl border border-slate-800 bg-[#091122] p-5 space-y-3 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-slate-100">
                  Current Competency vs. Goal Benchmark ({submittedReport.professionTitle})
                </span>
                <span className="font-mono text-cyan-300 tabular-nums">
                  Est. Upskilling Focus: ~{submittedReport.estimatedHoursToReady} hrs
                </span>
              </div>

              <div className="h-64 w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={submittedReport.competencies}
                    layout="vertical"
                    margin={{ top: 4, right: 18, left: 4, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} stroke="#94A3B8" fontSize={11} />
                    <YAxis
                      type="category"
                      dataKey="dimension"
                      width={138}
                      stroke="#94A3B8"
                      fontSize={11}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0D1628',
                        borderColor: '#334155',
                        fontSize: '12px',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="currentScore" name="Your Current Level" fill="#22D3EE" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="targetScore" name="Target Benchmark" fill="#475569" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {downloadedFilename && (
            <div className="rounded-lg border border-emerald-500/35 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Exported {downloadedFilename} with your 5-dimension skill-gap analysis.</span>
            </div>
          )}

          {/* 5-Dimension Diagnostic Breakdown Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
            {submittedReport.competencies.map((row) => (
              <div
                key={row.dimension}
                className="rounded-xl border border-slate-800 bg-[#091122] p-4 flex flex-col justify-between gap-2.5"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span
                      className={
                        row.status === 'Strength / Ready'
                          ? 'text-emerald-300'
                          : row.status === 'Moderate Gap'
                          ? 'text-cyan-300'
                          : 'text-amber-300'
                      }
                    >
                      {row.status}
                    </span>
                    <span className="text-slate-400 tabular-nums">Gap: {row.gap}</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-100">{row.dimension}</div>
                  <div className="font-mono text-xs text-slate-400 tabular-nums">
                    {row.currentScore} / {row.targetScore} target
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{row.actionAdvice}</p>
              </div>
            ))}
          </div>

          {/* Actionable Next Labs & Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-[#091122] p-4 space-y-3 min-w-0">
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                Recommended Curriculum Labs to Close Gaps
              </div>
              <div className="space-y-2">
                {submittedReport.recommendedLabModules.map((mod) => (
                  <button
                    key={mod.route}
                    type="button"
                    onClick={() => onNavigateLab(mod.route)}
                    className="w-full flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-[#0D1628] p-3 text-left hover:border-cyan-400/50 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-100">{mod.title}</div>
                      <div className="text-[11px] text-slate-400">{mod.reason}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-cyan-300 shrink-0" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-[#091122] p-4 space-y-3 min-w-0">
              <div className="text-xs font-semibold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Recommended Applied Projects ({submittedReport.professionTitle})</span>
              </div>
              <div className="space-y-2">
                {submittedReport.recommendedProjects.map((pid) => {
                  const meta = PROJECT_LABS_META.find((p) => p.id === pid);
                  if (!meta) return null;
                  return (
                    <button
                      key={meta.id}
                      type="button"
                      onClick={() => onLaunchProject(meta.id)}
                      className="w-full flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-[#0D1628] p-3 text-left hover:border-purple-400/50 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-100 truncate">
                          {meta.title}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {meta.industryTag}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-purple-300 shrink-0" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            {submittedReport.honestPromptNote}
          </p>
        </div>
      )}
    </section>
  );
}
