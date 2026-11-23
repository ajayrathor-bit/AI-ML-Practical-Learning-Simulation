import {
  ArrowRight,
  Compass,
  TrendingUp,
  Network,
  MessageSquareText,
  Sparkles,
  Bot,
  Activity,
  Briefcase,
  Play,
  CheckCircle2,
  Rocket,
} from 'lucide-react';
import { motion } from 'motion/react';
import type { LabRouteId, LearningProgress } from '../types/lab';
import { MODULES, STUDIO_PROJECTS } from '../data/curriculum';

interface HomeDashboardProps {
  onNavigate: (route: LabRouteId) => void;
  onLaunchStudioProject: (
    projectId: 'churn' | 'sentiment' | 'doc-assistant' | 'vision' | 'business-assistant'
  ) => void;
  progress: LearningProgress;
  completionSummary: { completed: number; total: number; percentage: number };
}

const MODULE_ICONS: Record<string, typeof Compass> = {
  foundations: Compass,
  ml: TrendingUp,
  dl: Network,
  nlp: MessageSquareText,
  genai: Sparkles,
  agentic: Bot,
  mlops: Activity,
  projects: Briefcase,
};

const FEATURED_EXPERIMENTS: Array<{
  title: string;
  moduleLabel: string;
  route: LabRouteId;
  description: string;
}> = [
  {
    title: 'Gradient Descent Line Fitter',
    moduleLabel: 'Machine Learning Lab',
    route: 'ml',
    description:
      'Step through epochs and watch Mean Squared Error drop as the regression line aligns with sample points.',
  },
  {
    title: 'Forward-Propagation Signal Explorer',
    moduleLabel: 'Deep Learning Lab',
    route: 'dl',
    description:
      'Adjust input weights and switch ReLU vs. Sigmoid activations to watch neural signals fire across layers.',
  },
  {
    title: 'RAG Retrieval & Prompt Playground',
    moduleLabel: 'Generative AI Lab',
    route: 'genai',
    description:
      'Tune temperature and Top-K sampling, inspect 2D vector embeddings, and trace grounded RAG synthesis.',
  },
];

export function HomeDashboard({
  onNavigate,
  onLaunchStudioProject,
  progress,
  completionSummary,
}: HomeDashboardProps) {
  const nextModule =
    MODULES.find(
      (m) => (progress.completedSteps[m.id] ?? []).length < m.totalSteps
    ) ?? MODULES[0];

  const hasStarted = completionSummary.completed > 0;

  return (
    <div className="space-y-8">
      {/* 1. Welcome Hero & Progress Overview */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 rounded-xl border border-slate-800/90 bg-[#0D1628] p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-cyan-300 font-medium">
              <span>Interactive Visual Curriculum</span>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <span className="text-slate-400">8 Guided Modules</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-50 [text-wrap:balance]">
              Explore Artificial Intelligence &amp; Machine Learning Through Live Visual Experiments
            </h1>
            <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300">
              Built for live interactive demonstrations. Step through core AI architectures, manipulate model parameters in real time, and observe how data becomes intelligent predictions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate(hasStarted ? nextModule.id : 'foundations')}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 whitespace-nowrap"
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              <span>
                {hasStarted ? `Continue: ${nextModule.shortTitle}` : 'Start Learning Journey'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('career-studio')}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-purple-500/45 bg-purple-500/12 px-5 py-2.5 text-sm font-medium text-purple-100 transition-colors hover:bg-purple-500/20 whitespace-nowrap"
            >
              <Rocket className="h-4 w-4 text-purple-300" aria-hidden="true" />
              <span>AI Career Studio (15 Industries)</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-700 bg-[#121E36] px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-cyan-500/40 hover:text-cyan-200 whitespace-nowrap"
            >
              <span>Explore Project Studio</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Learning Progress Card */}
        <div className="lg:col-span-4 rounded-xl border border-slate-800/90 bg-[#0D1628] p-6 flex flex-col justify-between gap-5">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-slate-100">Learning Progress</h2>
            <p className="text-xs text-slate-400">
              Tracks interactive lesson steps explored across all lab modules.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-3xl font-bold text-slate-50 tabular-nums">
                {completionSummary.percentage}%
              </span>
              <span className="font-mono text-xs text-slate-400 tabular-nums">
                {completionSummary.completed} of {completionSummary.total} steps
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${completionSummary.percentage}%` }}
              />
            </div>
          </div>

          <div className="space-y-2 border-t border-slate-800/80 pt-4">
            <div className="text-xs font-medium text-slate-300">Module Completion</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              {MODULES.map((mod) => {
                const done = (progress.completedSteps[mod.id] ?? []).length;
                const complete = done >= mod.totalSteps;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => onNavigate(mod.id)}
                    className="flex items-center justify-between text-left text-slate-400 hover:text-cyan-300 transition-colors py-0.5"
                  >
                    <span className="truncate pr-2">{mod.shortTitle}</span>
                    <span
                      className={`font-mono tabular-nums ${
                        complete ? 'text-cyan-300' : 'text-slate-500'
                      }`}
                    >
                      {done}/{mod.totalSteps}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive AI/ML Learning Journey Map */}
      <section className="rounded-xl border border-slate-800/90 bg-[#0D1628] p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-slate-100">
              AI &amp; Machine Learning Pathway
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Follow the progression from foundational intelligence concepts to production MLOps and applied prototypes.
            </p>
          </div>
          <span className="text-xs text-slate-400">Click any stage to open its interactive lab</span>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="min-w-[820px]">
            <svg
              viewBox="0 0 960 130"
              className="w-full h-auto"
              role="img"
              aria-label="Interactive AI and ML learning pathway diagram"
            >
              <defs>
                <linearGradient
                  id="pathwayGrad"
                  x1="60"
                  y1="48"
                  x2="900"
                  y2="48"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.65" />
                  <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.75" />
                </linearGradient>
              </defs>

              <line
                x1="60"
                y1="48"
                x2="900"
                y2="48"
                stroke="url(#pathwayGrad)"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <motion.circle
                cx="60"
                cy="48"
                r="5"
                fill="#22D3EE"
                animate={{ cx: [60, 900] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
              />

              {MODULES.map((mod, idx) => {
                const cx = 60 + idx * 120;
                const done = (progress.completedSteps[mod.id] ?? []).length;
                const isComplete = done >= mod.totalSteps;
                const isStarted = done > 0;
                const strokeColor =
                  mod.accentColor === 'cyan'
                    ? '#22D3EE'
                    : mod.accentColor === 'blue'
                    ? '#3B82F6'
                    : '#A78BFA';

                return (
                  <g
                    key={mod.id}
                    onClick={() => onNavigate(mod.id)}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${mod.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onNavigate(mod.id);
                      }
                    }}
                  >
                    <circle
                      cx={cx}
                      cy="48"
                      r="18"
                      fill={isComplete ? strokeColor : '#0B1324'}
                      stroke={strokeColor}
                      strokeWidth={isStarted ? '2.5' : '1.5'}
                    />
                    <text
                      x={cx}
                      y="52"
                      textAnchor="middle"
                      fill={isComplete ? '#070D19' : '#E2E8F0'}
                      fontSize="11"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="600"
                    >
                      0{mod.order}
                    </text>
                    <text
                      x={cx}
                      y="88"
                      textAnchor="middle"
                      fill="#E2E8F0"
                      fontSize="11.5"
                      fontWeight="600"
                    >
                      {mod.shortTitle}
                    </text>
                    <text
                      x={cx}
                      y="105"
                      textAnchor="middle"
                      fill="#94A3B8"
                      fontSize="10"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {done}/{mod.totalSteps} steps
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </section>

      {/* 3. Interactive Module Cards */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-semibold text-slate-100">Interactive Curriculum Modules</h2>
          <span className="text-xs text-slate-400">
            Select a module to launch its visual stage and controls
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {MODULES.map((mod) => {
            const Icon = MODULE_ICONS[mod.id] ?? Compass;
            const done = (progress.completedSteps[mod.id] ?? []).length;
            const complete = done >= mod.totalSteps;

            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => onNavigate(mod.id)}
                className="group flex flex-col justify-between rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 text-left transition-all hover:border-cyan-500/50 hover:bg-[#101C33] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/80 bg-[#121E36] text-cyan-300 group-hover:border-cyan-500/40">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs text-slate-400 tabular-nums">
                      0{mod.order}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-slate-400">
                      {mod.category} · {mod.duration}
                    </div>
                    <h3 className="text-base font-semibold text-slate-100 group-hover:text-cyan-200 transition-colors">
                      {mod.title}
                    </h3>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-400">
                    {mod.summary}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs">
                  <span className="flex items-center gap-1.5 font-mono tabular-nums text-slate-400">
                    {complete && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                    )}
                    <span>
                      {done}/{mod.totalSteps} steps
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-cyan-300 group-hover:translate-x-0.5 transition-transform">
                    <span>Open Lab</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Featured Practical Experiments & Project Showcase */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 rounded-xl border border-slate-800/90 bg-[#0D1628] p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-100">
              Featured Practical Experiments
            </h2>
            <p className="text-xs text-slate-400">
              Jump straight to high-impact visual sandboxes during live demonstrations.
            </p>
          </div>

          <div className="divide-y divide-slate-800/80">
            {FEATURED_EXPERIMENTS.map((exp) => (
              <div
                key={exp.title}
                className="py-3.5 first:pt-1 last:pb-1 flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="text-xs font-medium text-cyan-300">{exp.moduleLabel}</div>
                  <h3 className="text-sm font-semibold text-slate-100">{exp.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{exp.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate(exp.route)}
                  className="shrink-0 inline-flex min-h-9 items-center gap-1 rounded-lg border border-slate-700 bg-[#121E36] px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-500/50 hover:text-cyan-200 transition-colors whitespace-nowrap"
                >
                  <span>Launch</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 rounded-xl border border-slate-800/90 bg-[#0D1628] p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold text-slate-100">Project Studio Showcase</h2>
              <p className="text-xs text-slate-400">
                Five applied industry scenarios using simulated sample inputs.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="text-xs font-medium text-cyan-300 hover:text-cyan-200 whitespace-nowrap"
            >
              View All 5
            </button>
          </div>

          <div className="divide-y divide-slate-800/80">
            {STUDIO_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-4"
              >
                <div className="min-w-0 space-y-0.5">
                  <div className="text-[11px] text-slate-400">{proj.domain}</div>
                  <h3 className="text-sm font-semibold text-slate-100 truncate">{proj.title}</h3>
                  <p className="text-xs text-slate-400 truncate">{proj.summary}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onLaunchStudioProject(proj.id)}
                  className="shrink-0 inline-flex min-h-9 items-center gap-1 rounded-lg border border-slate-700 bg-[#121E36] px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-blue-500/50 hover:text-blue-200 transition-colors whitespace-nowrap"
                >
                  <span>Try Demo</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
