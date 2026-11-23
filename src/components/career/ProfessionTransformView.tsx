import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Code2,
  Compass,
  Factory,
  GraduationCap,
  Headset,
  Kanban,
  Landmark,
  Megaphone,
  Pause,
  Play,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  Truck,
  Users,
  CheckCircle2,
  Cpu,
  UserCheck,
} from 'lucide-react';
import { PROFESSIONS } from '../../data/careerStudioData';
import type { ProfessionId, ProjectLabId } from '../../types/careerStudio';

const ICON_MAP: Record<string, typeof Landmark> = {
  Landmark,
  Users,
  TrendingUp: BarChart3,
  Megaphone,
  Code2,
  Stethoscope,
  Truck,
  GraduationCap,
  Factory,
  ShoppingBag,
  Kanban,
  Headset,
  Briefcase,
  BarChart3,
  Compass,
};

interface ProfessionTransformViewProps {
  selectedProfessionId: ProfessionId;
  onSelectProfession: (id: ProfessionId) => void;
  onLaunchProject: (projectId: ProjectLabId) => void;
}

export function ProfessionTransformView({
  selectedProfessionId,
  onSelectProfession,
  onLaunchProject,
}: ProfessionTransformViewProps) {
  const prefersReducedMotion = useReducedMotion();
  const profession =
    PROFESSIONS.find((p) => p.id === selectedProfessionId) ?? PROFESSIONS[0];

  const [beforeAfterStepIdx, setBeforeAfterStepIdx] = useState(0);
  const [isPlayingComparison, setIsPlayingComparison] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState(
    profession.responsibilities[0].id
  );

  // Sync active task & reset animation step when switching professions
  useEffect(() => {
    setSelectedTaskId(profession.responsibilities[0].id);
    setBeforeAfterStepIdx(0);
  }, [profession]);

  // Auto-cycle Before/After comparison steps when playing
  useEffect(() => {
    if (!isPlayingComparison || prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setBeforeAfterStepIdx((prev) => (prev + 1) % profession.beforeAfterSteps.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [isPlayingComparison, prefersReducedMotion, profession.beforeAfterSteps.length]);

  const activeComparison =
    profession.beforeAfterSteps[beforeAfterStepIdx] ?? profession.beforeAfterSteps[0];
  const activeTask =
    profession.responsibilities.find((r) => r.id === selectedTaskId) ??
    profession.responsibilities[0];

  return (
    <div className="space-y-8">
      {/* STEP 2: 15-Industry Interactive Selector */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-100">
              Select Your Profession (15 Industry Tracks)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Choose any background below to dynamically load tailored daily responsibilities, Before vs. After AI workflows, task breakdowns, and career pathways.
            </p>
          </div>
          <span className="font-mono text-xs text-cyan-300">
            Selected: {profession.title}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {PROFESSIONS.map((item) => {
            const Icon = ICON_MAP[item.iconKey] ?? Briefcase;
            const isSelected = item.id === profession.id;
            return (
              <motion.button
                key={item.id}
                type="button"
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                onClick={() => onSelectProfession(item.id)}
                aria-pressed={isSelected}
                className={`group flex flex-col justify-between rounded-xl border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-500/12'
                    : 'border-slate-800/90 bg-[#0D1628] hover:border-cyan-500/40 hover:bg-[#111C33]'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border ${
                        isSelected
                          ? 'border-cyan-400/50 bg-cyan-500/15 text-cyan-300'
                          : 'border-slate-700/80 bg-[#121E36] text-slate-300 group-hover:text-cyan-300'
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <span className="text-[11px] text-slate-400 truncate">
                      {item.sectorTag.split('·')[0].trim()}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-slate-100 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {item.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium">
                  <span className={isSelected ? 'text-cyan-300' : 'text-slate-300 group-hover:text-cyan-300'}>
                    {isSelected ? 'Active Track' : 'Explore AI'}
                  </span>
                  <ArrowRight
                    className={`h-3.5 w-3.5 transition-transform ${
                      isSelected ? 'text-cyan-300 translate-x-0.5' : 'text-slate-400 group-hover:translate-x-0.5'
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* STEP 3A: Understand Your Current Job (5-8 Responsibilities) */}
      <section className="rounded-2xl border border-slate-800/90 bg-[#0D1628] p-6 space-y-5">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
          <div className="xl:col-span-7 space-y-1 min-w-0">
            <div className="text-xs font-medium text-cyan-300">
              {profession.title} · {profession.sectorTag}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-100">
              A. Understand Your Current Job ({profession.responsibilities.length} Core Responsibilities)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              These everyday tasks form the backbone of your role. Click any responsibility to examine its exact AI automation breakdown below.
            </p>
          </div>

          <div className="xl:col-span-5 flex items-start gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 min-w-0">
            <ShieldCheck className="h-4 w-4 text-emerald-300 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs text-emerald-100 leading-relaxed">
              {profession.humanOversightStatement}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {profession.responsibilities.map((resp, idx) => {
            const isSelected = resp.id === activeTask.id;
            return (
              <button
                key={resp.id}
                type="button"
                onClick={() => setSelectedTaskId(resp.id)}
                aria-pressed={isSelected}
                className={`rounded-xl border p-4 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-500/10'
                    : 'border-slate-800 bg-[#091122] hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-mono text-cyan-300 tabular-nums">0{idx + 1}</span>
                  <span className="text-[11px] text-slate-400">
                    {resp.aiTechnologies[0]}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-100 mb-1">{resp.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{resp.summary}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* STEP 3B: Before AI vs After AI Split-Screen Animated Transformation */}
      <section className="rounded-2xl border border-slate-800/90 bg-[#0D1628] p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-100">
              B. Before AI vs. After AI — {profession.dailyWorkflowExampleTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Compare manual execution against an AI-assisted human-in-the-loop workflow step by step.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsPlayingComparison(false);
                setBeforeAfterStepIdx((prev) =>
                  prev === 0 ? profession.beforeAfterSteps.length - 1 : prev - 1
                );
              }}
              aria-label="Previous workflow stage"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-[#121E36] text-slate-200 hover:border-cyan-500/40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsPlayingComparison((p) => !p)}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/12 px-3 py-1.5 text-xs font-medium text-cyan-200 hover:bg-cyan-500/20"
            >
              {isPlayingComparison ? (
                <>
                  <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Pause Demo</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Play Demo</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsPlayingComparison(false);
                setBeforeAfterStepIdx(
                  (prev) => (prev + 1) % profession.beforeAfterSteps.length
                );
              }}
              aria-label="Next workflow stage"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-[#121E36] text-slate-200 hover:border-cyan-500/40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Step selector pills (explicit clickable tabs) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {profession.beforeAfterSteps.map((step, idx) => {
            const active = idx === beforeAfterStepIdx;
            return (
              <button
                key={step.stepNumber}
                type="button"
                onClick={() => {
                  setIsPlayingComparison(false);
                  setBeforeAfterStepIdx(idx);
                }}
                aria-pressed={active}
                className={`rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
                  active
                    ? 'border-cyan-400 bg-cyan-500/12 text-slate-100'
                    : 'border-slate-800 bg-[#091122] text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="font-mono text-[11px] text-cyan-300 mr-1.5">
                  0{step.stepNumber}
                </span>
                <span className="font-medium">{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Split-Screen Visual Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* LEFT: Traditional Working (Before AI) */}
          <div className="rounded-xl border border-amber-500/30 bg-[#091122] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Before AI · Traditional Manual Workflow
              </span>
              <span className="font-mono text-xs text-slate-400 tabular-nums">
                Step 0{activeComparison.stepNumber}
              </span>
            </div>

            <svg
              viewBox="0 0 380 110"
              className="w-full h-auto rounded-lg bg-[#070D19] border border-slate-800/80"
              role="img"
              aria-label="Traditional manual workflow bottleneck diagram"
            >
              <rect x="18" y="30" width="84" height="50" rx="6" fill="#131D31" stroke="#475569" />
              <text x="60" y="52" textAnchor="middle" fill="#CBD5E1" fontSize="9.5">Raw Queue</text>
              <text x="60" y="66" textAnchor="middle" fill="#94A3B8" fontSize="8">Files / Rows</text>

              <line x1="102" y1="55" x2="148" y2="55" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
              {!prefersReducedMotion && (
                <motion.circle
                  r="3.5"
                  fill="#F59E0B"
                  animate={{ cx: [104, 146] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
                  cy="55"
                />
              )}

              <rect x="150" y="24" width="110" height="62" rx="8" fill="#1E1B16" stroke="#F59E0B" strokeOpacity="0.65" />
              <text x="205" y="48" textAnchor="middle" fill="#FDE68A" fontSize="9.5" fontWeight="600">
                Manual Reading
              </text>
              <text x="205" y="64" textAnchor="middle" fill="#CBD5E1" fontSize="8">
                1 Item at a Time
              </text>

              <line x1="260" y1="55" x2="294" y2="55" stroke="#64748B" strokeWidth="1.5" />
              <rect x="296" y="32" width="70" height="46" rx="6" fill="#131D31" stroke="#475569" />
              <text x="331" y="53" textAnchor="middle" fill="#CBD5E1" fontSize="9">Slow</text>
              <text x="331" y="66" textAnchor="middle" fill="#94A3B8" fontSize="8">Backlog</text>
            </svg>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-100">
                {activeComparison.beforeAction}
              </p>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                Friction: {activeComparison.beforePainPoint}
              </p>
            </div>
          </div>

          {/* RIGHT: AI-Powered Working (After AI) */}
          <div className="rounded-xl border border-cyan-500/40 bg-[#091122] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                After AI · Intelligent Human-Reviewed Flow
              </span>
              <span className="font-mono text-xs text-cyan-300 tabular-nums">
                Step 0{activeComparison.stepNumber}
              </span>
            </div>

            <svg
              viewBox="0 0 380 110"
              className="w-full h-auto rounded-lg bg-[#070D19] border border-slate-800/80"
              role="img"
              aria-label="AI-assisted workflow with human review verification"
            >
              <rect x="14" y="30" width="72" height="50" rx="6" fill="#0F1C34" stroke="#22D3EE" strokeOpacity="0.5" />
              <text x="50" y="52" textAnchor="middle" fill="#E2E8F0" fontSize="9.5">Data Feed</text>
              <text x="50" y="66" textAnchor="middle" fill="#67E8F9" fontSize="8">Normalized</text>

              <line x1="86" y1="55" x2="122" y2="55" stroke="#22D3EE" strokeWidth="2" />
              {!prefersReducedMotion && (
                <motion.circle
                  r="4"
                  fill="#22D3EE"
                  animate={{ cx: [88, 250] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  cy="55"
                />
              )}

              <rect x="124" y="24" width="102" height="62" rx="8" fill="#0E223D" stroke="#38BDF8" />
              <text x="175" y="48" textAnchor="middle" fill="#67E8F9" fontSize="9.5" fontWeight="600">
                AI Processing
              </text>
              <text x="175" y="64" textAnchor="middle" fill="#CBD5E1" fontSize="8">
                Scores &amp; Extracts
              </text>

              <line x1="226" y1="55" x2="258" y2="55" stroke="#3B82F6" strokeWidth="2" />
              <rect x="260" y="24" width="106" height="62" rx="8" fill="#102925" stroke="#34D399" />
              <text x="313" y="48" textAnchor="middle" fill="#A7F3D0" fontSize="9.5" fontWeight="600">
                Human Review
              </text>
              <text x="313" y="64" textAnchor="middle" fill="#CBD5E1" fontSize="8">
                Final Decision
              </text>
            </svg>

            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-100">
                {activeComparison.afterAction}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                System: {activeComparison.afterSystemNote}
              </p>
              <div className="flex items-start gap-1.5 text-xs text-emerald-300">
                <UserCheck className="h-3.5 w-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Human Oversight: {activeComparison.humanOversightRole}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 3C: Interactive Task Automation Breakdown */}
      <section className="rounded-2xl border border-slate-800/90 bg-[#0D1628] p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-100">
              C. Task Automation Breakdown — {activeTask.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Select another responsibility in Section A above or inspect how this specific task maps to an AI/ML architecture.
            </p>
          </div>
          {profession.recommendedProjects[0] && (
            <button
              type="button"
              onClick={() => onLaunchProject(profession.recommendedProjects[0])}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/12 px-3.5 py-1.5 text-xs font-semibold text-cyan-200 hover:bg-cyan-500/20 whitespace-nowrap"
            >
              <span>Try Related Live Project</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* 5-Stage Visual Workflow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
          {[
            { label: '1. INPUT', val: activeTask.workflow.input, accent: 'border-slate-700' },
            { label: '2. AI PROCESSING', val: activeTask.workflow.aiProcessing, accent: 'border-cyan-500/40' },
            { label: '3. ML / AUTOMATION', val: activeTask.workflow.mlOrAutomation, accent: 'border-blue-500/40' },
            { label: '4. OUTPUT', val: activeTask.workflow.output, accent: 'border-purple-500/40' },
            { label: '5. HUMAN REVIEW', val: activeTask.workflow.humanReview, accent: 'border-emerald-500/50' },
          ].map((node) => (
            <div
              key={node.label}
              className={`rounded-xl border ${node.accent} bg-[#091122] p-3.5 space-y-1.5`}
            >
              <div className="font-mono text-[11px] font-semibold text-cyan-300">
                {node.label}
              </div>
              <div className="text-xs text-slate-200 leading-relaxed">{node.val}</div>
            </div>
          ))}
        </div>

        {/* 7-Point Task Detail Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-800 bg-[#091122] p-4 space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              How Task Is Currently Performed
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {activeTask.currentManualProcess}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#091122] p-4 space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
              How AI Assists Your Role
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {activeTask.howAiAssists}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#091122] p-4 space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Technologies &amp; Tools Involved
            </h3>
            <div className="text-xs text-slate-200 flex items-start gap-2">
              <Cpu className="h-4 w-4 text-cyan-300 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{activeTask.aiTechnologies.join(' · ')}</span>
            </div>
            <div className="text-xs text-slate-400">
              Stack: <span className="text-slate-200">{activeTask.toolsUsed.join(', ')}</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#091122] p-4 space-y-2 md:col-span-1 xl:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
              Expected Business Benefits
            </h3>
            <ul className="space-y-1.5">
              {activeTask.expectedBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#091122] p-4 space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-300">
              Skills Required to Build This
            </h3>
            <ul className="space-y-1 text-xs sm:text-sm text-slate-200">
              {activeTask.skillsRequired.map((skill) => (
                <li key={skill} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" aria-hidden="true" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
