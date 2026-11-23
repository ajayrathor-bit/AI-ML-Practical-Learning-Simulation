import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  FlaskConical,
  Play,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  PROFESSIONS,
  PROJECT_LABS_META,
  SAMPLE_JOB_DESCRIPTIONS,
  SAMPLE_RESUMES,
} from '../../data/careerStudioData';
import type { ProfessionId, ProjectLabId } from '../../types/careerStudio';
import {
  evaluateFraudRisk,
  evaluateResumeMatch,
  simulateHealthcareOperations,
  simulateInventoryDemand,
  simulateLeadScoring,
} from '../../utils/careerSimulations';
import {
  InteractiveProjectsLabPart2,
  TechnologyExplainerPanel,
} from './InteractiveProjectsLabPart2';

interface InteractiveProjectsLabProps {
  selectedProfessionId: ProfessionId;
  activeProjectId: ProjectLabId;
  onSelectProject: (id: ProjectLabId) => void;
}

export function InteractiveProjectsLab({
  selectedProfessionId,
  activeProjectId,
  onSelectProject,
}: InteractiveProjectsLabProps) {
  const profession =
    PROFESSIONS.find((p) => p.id === selectedProfessionId) ?? PROFESSIONS[0];
  const projectMeta =
    PROJECT_LABS_META.find((p) => p.id === activeProjectId) ?? PROJECT_LABS_META[0];

  const [processingStage, setProcessingStage] = useState<'idle' | 'processing' | 'done'>('done');

  const triggerStepFlash = () => {
    setProcessingStage('processing');
    window.setTimeout(() => setProcessingStage('done'), 320);
  };

  useEffect(() => {
    setProcessingStage('done');
  }, [activeProjectId]);

  // Project 1 state (Resume Screening)
  const [selectedJdId, setSelectedJdId] = useState(SAMPLE_JOB_DESCRIPTIONS[0].id);
  const [selectedResumeId, setSelectedResumeId] = useState(SAMPLE_RESUMES[0].id);
  const [customResumeText, setCustomResumeText] = useState(SAMPLE_RESUMES[0].text);
  const [candidateYears, setCandidateYears] = useState(SAMPLE_RESUMES[0].yearsExp);

  // Project 2 state (Lead Scoring)
  const [companySize, setCompanySize] = useState(450);
  const [touches, setTouches] = useState(9);
  const [budgetConfirmed, setBudgetConfirmed] = useState(true);
  const [dmEngaged, setDmEngaged] = useState(true);
  const [daysSinceReply, setDaysSinceReply] = useState(3);

  // Project 3 state (Fraud Detection)
  const [txAmount, setTxAmount] = useState(2450);
  const [baselineAvg, setBaselineAvg] = useState(180);
  const [geoDist, setGeoDist] = useState(480);
  const [txVelocity, setTxVelocity] = useState(4);
  const [unusualHour, setUnusualHour] = useState(true);

  // Project 4 state (Healthcare Operations)
  const [baseVisits, setBaseVisits] = useState(195);
  const [seasonalSurge, setSeasonalSurge] = useState(18);
  const [proceduresCount, setProceduresCount] = useState(24);
  const [staffOnDuty, setStaffOnDuty] = useState(42);
  const [totalBeds] = useState(120);

  // Project 5 state (Inventory Forecasting)
  const [baseWeeklyDemand, setBaseWeeklyDemand] = useState(420);
  const [promoBoost, setPromoBoost] = useState(32);
  const [seasonalityPct, setSeasonalityPct] = useState(25);
  const [currentStock, setCurrentStock] = useState(1250);
  const [leadWeeks, setLeadWeeks] = useState(3);

  // Computed Simulation Results
  const activeJd =
    SAMPLE_JOB_DESCRIPTIONS.find((j) => j.id === selectedJdId) ?? SAMPLE_JOB_DESCRIPTIONS[0];
  const resumeResult = evaluateResumeMatch({
    resumeText: customResumeText,
    yearsExp: candidateYears,
    requiredSkills: activeJd.requiredSkills,
    minYears: activeJd.minYears,
  });

  const leadResult = simulateLeadScoring({
    companySizeEmployees: companySize,
    engagementTouches: touches,
    budgetConfirmed,
    decisionMakerEngaged: dmEngaged,
    daysSinceLastReply: daysSinceReply,
  });

  const fraudResult = evaluateFraudRisk({
    amountUsd: txAmount,
    baselineAvgUsd: baselineAvg,
    geoDistanceKm: geoDist,
    txLastHour: txVelocity,
    unusualHour,
  });

  const healthcareResult = simulateHealthcareOperations({
    baseDailyVisits: baseVisits,
    seasonalSurgePct: seasonalSurge,
    scheduledProcedures: proceduresCount,
    staffOnDuty,
    totalBeds,
  });

  const inventoryResult = simulateInventoryDemand({
    baseWeeklyDemand,
    promoBoostPct: promoBoost,
    seasonalityStrengthPct: seasonalityPct,
    currentStock,
    supplierLeadWeeks: leadWeeks,
  });

  return (
    <div className="space-y-6">
      {/* Header & Honest Simulation Notice */}
      <section className="rounded-2xl border border-slate-800/90 bg-[#0D1628] p-6 space-y-4">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
          <div className="xl:col-span-7 space-y-1 min-w-0">
            <div className="flex items-center gap-2 text-xs font-medium text-cyan-300">
              <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Experience AI in Action · Try Real-World Projects</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              Interactive AI Project Implementation Lab (10 Industry Sandboxes)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Explore how AI transforms real job tasks across industries. Manipulate inputs below to observe scoring logic, charts, and human review checkpoints.
            </p>
          </div>

          <div className="xl:col-span-5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3.5 py-2.5 text-xs text-blue-100 leading-relaxed min-w-0">
            Educational Simulation: Powered by transparent deterministic models and synthetic datasets—no private customer data or live external predictions are implied.
          </div>
        </div>

        {/* 10-Project Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {PROJECT_LABS_META.map((proj) => {
            const isActive = proj.id === activeProjectId;
            const isRecommended = profession.recommendedProjects.includes(proj.id);
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => onSelectProject(proj.id)}
                aria-pressed={isActive}
                className={`rounded-xl border p-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                  isActive
                    ? 'border-cyan-400 bg-cyan-500/12 text-slate-50'
                    : 'border-slate-800 bg-[#091122] text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-1 text-[11px] mb-1">
                  <span className="font-mono text-cyan-300 tabular-nums">
                    #{String(proj.order).padStart(2, '0')}
                  </span>
                  {isRecommended && (
                    <span className="font-mono text-[10px] text-emerald-300">
                      MATCH: {profession.shortTitle}
                    </span>
                  )}
                </div>
                <div className="text-xs font-semibold leading-snug text-slate-100">
                  {proj.title}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                  {proj.industryTag}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Project Sandbox Stage */}
      <section className="rounded-2xl border border-slate-800/90 bg-[#0D1628] p-6 space-y-5">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start border-b border-slate-800/80 pb-4">
          <div className="xl:col-span-7 space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs text-cyan-300">
              <span className="font-mono">PROJECT {String(projectMeta.order).padStart(2, '0')} / 10</span>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <span className="text-slate-300">{projectMeta.industryTag}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-100">{projectMeta.title}</h3>
            <p className="text-xs sm:text-sm text-slate-400">{projectMeta.summary}</p>
          </div>

          <div className="xl:col-span-5 flex items-start gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-xs text-emerald-100 min-w-0">
            <ShieldCheck className="h-4 w-4 text-emerald-300 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{projectMeta.humanCheckpoint}</span>
          </div>
        </div>

        {/* PROJECT 1: AI RESUME SCREENING */}
        {activeProjectId === 'resume-screening' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 space-y-4 min-w-0">
              <div>
                <label htmlFor="jd-select" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Target Job Description Preset
                </label>
                <select
                  id="jd-select"
                  value={selectedJdId}
                  onChange={(e) => {
                    setSelectedJdId(e.target.value);
                    triggerStepFlash();
                  }}
                  className="w-full rounded-lg border border-slate-700 bg-[#091122] px-3 py-2 text-sm text-slate-100"
                >
                  {SAMPLE_JOB_DESCRIPTIONS.map((jd) => (
                    <option key={jd.id} value={jd.id}>
                      {jd.title} (Min {jd.minYears} yrs · {jd.requiredSkills.length} key skills)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="text-xs font-medium text-slate-300 mb-1.5">
                  Load Sample Candidate Profile
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {SAMPLE_RESUMES.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => {
                        setSelectedResumeId(sample.id);
                        setCustomResumeText(sample.text);
                        setCandidateYears(sample.yearsExp);
                        triggerStepFlash();
                      }}
                      className={`rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
                        selectedResumeId === sample.id
                          ? 'border-cyan-400 bg-cyan-500/12 text-slate-100'
                          : 'border-slate-800 bg-[#091122] text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-semibold truncate">{sample.candidateName}</div>
                      <div className="text-[11px] text-slate-400 truncate">{sample.currentRole}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <label htmlFor="resume-exp-slider" className="font-medium text-slate-300">
                    Candidate Experience
                  </label>
                  <span className="font-mono text-cyan-300 tabular-nums">{candidateYears} years</span>
                </div>
                <input
                  id="resume-exp-slider"
                  type="range"
                  min={1}
                  max={12}
                  value={candidateYears}
                  onChange={(e) => setCandidateYears(Number(e.target.value))}
                  className="w-full lab-slider"
                />
              </div>

              <div>
                <label htmlFor="resume-text-area" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Editable Resume Text (Try adding &quot;python&quot; or &quot;tableau&quot;)
                </label>
                <textarea
                  id="resume-text-area"
                  rows={4}
                  value={customResumeText}
                  onChange={(e) => setCustomResumeText(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-[#091122] p-3 text-xs sm:text-sm text-slate-100 leading-relaxed"
                />
              </div>

              <button
                type="button"
                onClick={triggerStepFlash}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400"
              >
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Re-Run NLP Skill Extraction</span>
              </button>
            </div>

            <div className="lg:col-span-6 space-y-4 min-w-0 rounded-xl border border-slate-800 bg-[#091122] p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Simulated Talent Intelligence Output
                </span>
                <span className="font-mono text-xs text-cyan-300">
                  {processingStage === 'processing' ? 'SCANNING...' : 'COMPLETE'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-slate-800 bg-[#0D1628] p-3">
                  <div className="text-[11px] text-slate-400">Overall Match</div>
                  <div className="font-mono text-2xl font-bold text-cyan-300 tabular-nums">
                    {resumeResult.compositeScore}%
                  </div>
                </div>
                <div className="rounded-lg border border-slate-800 bg-[#0D1628] p-3">
                  <div className="text-[11px] text-slate-400">Skill Overlap</div>
                  <div className="font-mono text-2xl font-bold text-slate-100 tabular-nums">
                    {resumeResult.skillOverlapScore}%
                  </div>
                </div>
                <div className="rounded-lg border border-slate-800 bg-[#0D1628] p-3">
                  <div className="text-[11px] text-slate-400">Experience Fit</div>
                  <div className="font-mono text-2xl font-bold text-slate-100 tabular-nums">
                    {resumeResult.experienceFitScore}%
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-slate-800 bg-[#0D1628] p-3.5 space-y-2">
                <div className="text-xs font-semibold text-slate-100">
                  Recruiter Guidance: {resumeResult.recommendationBand}
                </div>
                <p className="text-xs text-slate-300">{resumeResult.humanReviewNote}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/8 p-3 space-y-1.5">
                  <div className="font-semibold text-emerald-300">
                    Matched Criteria ({resumeResult.matchedSkills.length})
                  </div>
                  <div className="text-slate-200 leading-relaxed">
                    {resumeResult.matchedSkills.length > 0
                      ? resumeResult.matchedSkills.join(', ')
                      : 'None matched directly'}
                  </div>
                </div>
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/8 p-3 space-y-1.5">
                  <div className="font-semibold text-amber-300">
                    Unmatched Keywords ({resumeResult.missingSkills.length})
                  </div>
                  <div className="text-slate-200 leading-relaxed">
                    {resumeResult.missingSkills.length > 0
                      ? resumeResult.missingSkills.join(', ')
                      : 'All required skills present'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROJECT 2: SALES PREDICTION & LEAD SCORING */}
        {activeProjectId === 'sales-lead-scoring' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-4 min-w-0">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label htmlFor="lead-size" className="text-slate-300">Account Headcount</label>
                  <span className="font-mono text-cyan-300 tabular-nums">{companySize} employees</span>
                </div>
                <input
                  id="lead-size"
                  type="range"
                  min={20}
                  max={5000}
                  step={30}
                  value={companySize}
                  onChange={(e) => setCompanySize(Number(e.target.value))}
                  className="w-full lab-slider"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label htmlFor="lead-touches" className="text-slate-300">Engagement Touches (Web/Email/Demo)</label>
                  <span className="font-mono text-cyan-300 tabular-nums">{touches} touches</span>
                </div>
                <input
                  id="lead-touches"
                  type="range"
                  min={0}
                  max={20}
                  value={touches}
                  onChange={(e) => setTouches(Number(e.target.value))}
                  className="w-full lab-slider"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label htmlFor="lead-recency" className="text-slate-300">Days Since Last Prospect Reply</label>
                  <span className="font-mono text-cyan-300 tabular-nums">{daysSinceReply} days</span>
                </div>
                <input
                  id="lead-recency"
                  type="range"
                  min={0}
                  max={45}
                  value={daysSinceReply}
                  onChange={(e) => setDaysSinceReply(Number(e.target.value))}
                  className="w-full lab-slider"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <label className="flex items-center gap-2 rounded-lg border border-slate-800 bg-[#091122] p-3 text-xs text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={budgetConfirmed}
                    onChange={(e) => setBudgetConfirmed(e.target.checked)}
                    className="accent-cyan-400"
                  />
                  <span>Budget Range Confirmed</span>
                </label>
                <label className="flex items-center gap-2 rounded-lg border border-slate-800 bg-[#091122] p-3 text-xs text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dmEngaged}
                    onChange={(e) => setDmEngaged(e.target.checked)}
                    className="accent-cyan-400"
                  />
                  <span>Decision Maker Engaged</span>
                </label>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4 min-w-0 rounded-xl border border-slate-800 bg-[#091122] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-slate-400">Simulated Conversion Propensity</div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-3xl font-bold text-cyan-300 tabular-nums">
                      {leadResult.propensityScore} / 100
                    </span>
                    <span className="text-sm font-semibold text-slate-100">{leadResult.tier}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Est. Close Window</div>
                  <div className="font-mono text-lg font-bold text-slate-100 tabular-nums">
                    ~{leadResult.estimatedWinDays} days
                  </div>
                </div>
              </div>

              <div className="h-56 w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leadResult.drivers} layout="vertical" margin={{ left: 16, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                    <XAxis type="number" stroke="#94A3B8" fontSize={11} />
                    <YAxis type="category" dataKey="factor" stroke="#CBD5E1" fontSize={11} width={135} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0D1628', borderColor: '#334155', fontSize: '12px' }}
                    />
                    <Bar dataKey="impact" name="Score Impact" fill="#22D3EE" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* PROJECT 3: BANKING FRAUD DETECTION */}
        {activeProjectId === 'banking-fraud' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-4 min-w-0">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setTxAmount(95);
                    setBaselineAvg(120);
                    setGeoDist(12);
                    setTxVelocity(1);
                    setUnusualHour(false);
                  }}
                  className="rounded-lg border border-slate-700 bg-[#091122] px-3 py-1.5 text-xs text-slate-200 hover:border-cyan-500/40"
                >
                  Load Routine Grocery Tx
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTxAmount(3800);
                    setBaselineAvg(160);
                    setGeoDist(920);
                    setTxVelocity(6);
                    setUnusualHour(true);
                  }}
                  className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-200 hover:bg-amber-500/20"
                >
                  Load High-Risk Spike Preset
                </button>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label htmlFor="fraud-amt" className="text-slate-300">Transaction Amount</label>
                  <span className="font-mono text-cyan-300 tabular-nums">${txAmount}</span>
                </div>
                <input
                  id="fraud-amt"
                  type="range"
                  min={25}
                  max={5000}
                  step={25}
                  value={txAmount}
                  onChange={(e) => setTxAmount(Number(e.target.value))}
                  className="w-full lab-slider"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label htmlFor="fraud-geo" className="text-slate-300">Distance From Home Location</label>
                  <span className="font-mono text-cyan-300 tabular-nums">{geoDist} km</span>
                </div>
                <input
                  id="fraud-geo"
                  type="range"
                  min={0}
                  max={1500}
                  step={20}
                  value={geoDist}
                  onChange={(e) => setGeoDist(Number(e.target.value))}
                  className="w-full lab-slider"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label htmlFor="fraud-vel" className="text-slate-300">Transactions in Past 60 Minutes</label>
                  <span className="font-mono text-cyan-300 tabular-nums">{txVelocity} tx/hr</span>
                </div>
                <input
                  id="fraud-vel"
                  type="range"
                  min={1}
                  max={10}
                  value={txVelocity}
                  onChange={(e) => setTxVelocity(Number(e.target.value))}
                  className="w-full lab-slider"
                />
              </div>

              <label className="flex items-center gap-2 rounded-lg border border-slate-800 bg-[#091122] p-3 text-xs text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={unusualHour}
                  onChange={(e) => setUnusualHour(e.target.checked)}
                  className="accent-cyan-400"
                />
                <span>Late-Night / Unusual Cardholder Hour (01:00–04:30)</span>
              </label>
            </div>

            <div className="lg:col-span-7 space-y-4 min-w-0 rounded-xl border border-slate-800 bg-[#091122] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-slate-400">Synthetic Transaction Risk Score</div>
                  <div className="font-mono text-3xl font-bold text-slate-50 tabular-nums">
                    {fraudResult.riskScore} / 100
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0D1628] px-3 py-2 text-xs font-semibold">
                  {fraudResult.riskScore >= 70 ? (
                    <AlertTriangle className="h-4 w-4 text-rose-400" aria-hidden="true" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  )}
                  <span className={fraudResult.riskScore >= 70 ? 'text-rose-200' : 'text-cyan-200'}>
                    {fraudResult.decisionTier}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-400">
                Spend Ratio: <span className="font-mono text-slate-200">{fraudResult.amountRatio}×</span> cardholder baseline (${baselineAvg})
              </div>

              <div className="h-52 w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fraudResult.contributors}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                    <XAxis dataKey="signal" stroke="#94A3B8" fontSize={11} />
                    <YAxis stroke="#94A3B8" fontSize={11} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0D1628', borderColor: '#334155', fontSize: '12px' }}
                    />
                    <Bar dataKey="contribution" name="Risk Points" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* PROJECT 4: HEALTHCARE PREDICTIVE ANALYTICS */}
        {activeProjectId === 'healthcare-analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-4 min-w-0">
              <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/8 p-3 text-xs text-cyan-100 leading-relaxed">
                Operational Scope Only: Forecasts hospital appointment volume, bed capacity, and follow-up scheduling load—never clinical diagnosis or treatment.
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label htmlFor="hc-visits" className="text-slate-300">Baseline Daily Clinic Visits</label>
                  <span className="font-mono text-cyan-300 tabular-nums">{baseVisits} patients</span>
                </div>
                <input
                  id="hc-visits"
                  type="range"
                  min={80}
                  max={300}
                  step={5}
                  value={baseVisits}
                  onChange={(e) => setBaseVisits(Number(e.target.value))}
                  className="w-full lab-slider"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label htmlFor="hc-surge" className="text-slate-300">Seasonal Surge Adjustment</label>
                  <span className="font-mono text-cyan-300 tabular-nums">
                    {seasonalSurge >= 0 ? '+' : ''}{seasonalSurge}%
                  </span>
                </div>
                <input
                  id="hc-surge"
                  type="range"
                  min={-15}
                  max={45}
                  value={seasonalSurge}
                  onChange={(e) => setSeasonalSurge(Number(e.target.value))}
                  className="w-full lab-slider"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label htmlFor="hc-procs" className="text-slate-300">Scheduled Procedures</label>
                  <span className="font-mono text-cyan-300 tabular-nums">{proceduresCount}</span>
                </div>
                <input
                  id="hc-procs"
                  type="range"
                  min={5}
                  max={60}
                  value={proceduresCount}
                  onChange={(e) => setProceduresCount(Number(e.target.value))}
                  className="w-full lab-slider"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label htmlFor="hc-staff" className="text-slate-300">Admin &amp; Care Coordinators On Duty</label>
                  <span className="font-mono text-cyan-300 tabular-nums">{staffOnDuty} staff</span>
                </div>
                <input
                  id="hc-staff"
                  type="range"
                  min={15}
                  max={65}
                  value={staffOnDuty}
                  onChange={(e) => setStaffOnDuty(Number(e.target.value))}
                  className="w-full lab-slider"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4 min-w-0 rounded-xl border border-slate-800 bg-[#091122] p-5">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-slate-800 bg-[#0D1628] p-3">
                  <div className="text-[11px] text-slate-400">Peak Bed Occupancy</div>
                  <div className="font-mono text-2xl font-bold text-cyan-300 tabular-nums">
                    {healthcareResult.peakOccupancyPct}%
                  </div>
                </div>
                <div className="rounded-lg border border-slate-800 bg-[#0D1628] p-3">
                  <div className="text-[11px] text-slate-400">Follow-Up Admin Queue</div>
                  <div className="font-mono text-2xl font-bold text-slate-100 tabular-nums">
                    {healthcareResult.followUpPriorityCount}
                  </div>
                </div>
                <div className="rounded-lg border border-slate-800 bg-[#0D1628] p-3">
                  <div className="text-[11px] text-slate-400">Capacity Status</div>
                  <div className="text-xs font-semibold text-amber-200 mt-1">
                    {healthcareResult.staffingPressure}
                  </div>
                </div>
              </div>

              <div className="h-56 w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthcareResult.series}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                    <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                    <YAxis stroke="#94A3B8" fontSize={11} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0D1628', borderColor: '#334155', fontSize: '12px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Line
                      type="monotone"
                      dataKey="projectedVisits"
                      name="Projected Visits"
                      stroke="#22D3EE"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="bedOccupancyPct"
                      name="Bed Occupancy %"
                      stroke="#A78BFA"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* PROJECT 5: SMART INVENTORY & DEMAND FORECASTING */}
        {activeProjectId === 'inventory-forecasting' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-4 min-w-0">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label htmlFor="inv-base" className="text-slate-300">Baseline Weekly Demand</label>
                  <span className="font-mono text-cyan-300 tabular-nums">{baseWeeklyDemand} units</span>
                </div>
                <input
                  id="inv-base"
                  type="range"
                  min={150}
                  max={900}
                  step={25}
                  value={baseWeeklyDemand}
                  onChange={(e) => setBaseWeeklyDemand(Number(e.target.value))}
                  className="w-full lab-slider"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label htmlFor="inv-promo" className="text-slate-300">Promotional Campaign Lift</label>
                  <span className="font-mono text-cyan-300 tabular-nums">+{promoBoost}%</span>
                </div>
                <input
                  id="inv-promo"
                  type="range"
                  min={0}
                  max={60}
                  value={promoBoost}
                  onChange={(e) => setPromoBoost(Number(e.target.value))}
                  className="w-full lab-slider"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label htmlFor="inv-season" className="text-slate-300">Seasonality Amplitude</label>
                  <span className="font-mono text-cyan-300 tabular-nums">{seasonalityPct}%</span>
                </div>
                <input
                  id="inv-season"
                  type="range"
                  min={0}
                  max={40}
                  value={seasonalityPct}
                  onChange={(e) => setSeasonalityPct(Number(e.target.value))}
                  className="w-full lab-slider"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label htmlFor="inv-stock" className="text-slate-300">Current Warehouse Stock</label>
                  <span className="font-mono text-cyan-300 tabular-nums">{currentStock} units</span>
                </div>
                <input
                  id="inv-stock"
                  type="range"
                  min={200}
                  max={3500}
                  step={50}
                  value={currentStock}
                  onChange={(e) => setCurrentStock(Number(e.target.value))}
                  className="w-full lab-slider"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label htmlFor="inv-lead" className="text-slate-300">Supplier Lead Time</label>
                  <span className="font-mono text-cyan-300 tabular-nums">{leadWeeks} weeks</span>
                </div>
                <input
                  id="inv-lead"
                  type="range"
                  min={1}
                  max={6}
                  value={leadWeeks}
                  onChange={(e) => setLeadWeeks(Number(e.target.value))}
                  className="w-full lab-slider"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4 min-w-0 rounded-xl border border-slate-800 bg-[#091122] p-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg border border-slate-800 bg-[#0D1628] p-3">
                  <div className="text-[11px] text-slate-400">Manual MAE Error</div>
                  <div className="font-mono text-base sm:text-lg font-bold text-amber-300 tabular-nums">
                    ±{inventoryResult.manualErrorMae} units
                  </div>
                </div>
                <div className="rounded-lg border border-slate-800 bg-[#0D1628] p-3">
                  <div className="text-[11px] text-slate-400">ML Forecast MAE</div>
                  <div className="font-mono text-base sm:text-lg font-bold text-cyan-300 tabular-nums">
                    ±{inventoryResult.mlErrorMae} units
                  </div>
                </div>
                <div className="rounded-lg border border-slate-800 bg-[#0D1628] p-3">
                  <div className="text-[11px] text-slate-400">Recommended Order</div>
                  <div className="font-mono text-base sm:text-lg font-bold text-slate-100 tabular-nums">
                    {inventoryResult.recommendedReorderUnits} units
                  </div>
                </div>
                <div className="rounded-lg border border-slate-800 bg-[#0D1628] p-3">
                  <div className="text-[11px] text-slate-400">Stock Status</div>
                  <div className="text-xs font-semibold text-emerald-300 mt-1">
                    {inventoryResult.stockoutRisk}
                  </div>
                </div>
              </div>

              <div className="h-56 w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={inventoryResult.weeks}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                    <XAxis dataKey="week" stroke="#94A3B8" fontSize={11} />
                    <YAxis stroke="#94A3B8" fontSize={11} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0D1628', borderColor: '#334155', fontSize: '12px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Line
                      type="monotone"
                      dataKey="manualMovingAvg"
                      name="Manual Moving Avg"
                      stroke="#F59E0B"
                      strokeDasharray="4 4"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="actualOrExpectedDemand"
                      name="True Seasonal Demand"
                      stroke="#94A3B8"
                      strokeWidth={1.5}
                    />
                    <Line
                      type="monotone"
                      dataKey="mlForecast"
                      name="ML Seasonal Forecast"
                      stroke="#22D3EE"
                      strokeWidth={2.5}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* PROJECTS 6-10 Delegated cleanly */}
        {(activeProjectId === 'document-intelligence' ||
          activeProjectId === 'customer-support-agent' ||
          activeProjectId === 'business-intelligence' ||
          activeProjectId === 'code-assistant' ||
          activeProjectId === 'marketing-intelligence') && (
          <InteractiveProjectsLabPart2 activeProjectId={activeProjectId} />
        )}
      </section>

      {/* STEP 6: 14-Technology Explainer Panel */}
      <TechnologyExplainerPanel activeProjectId={activeProjectId} />
    </div>
  );
}
