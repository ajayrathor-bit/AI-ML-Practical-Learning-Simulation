import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Pause, Play, Sparkles, UserCheck } from 'lucide-react';
import { AI_PIPELINE_STAGES } from '../../data/careerStudioData';

interface PipelineVisualizerProps {
  onExploreProfession: () => void;
  onExploreProjects: () => void;
}

export function PipelineVisualizer({
  onExploreProfession,
  onExploreProjects,
}: PipelineVisualizerProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveStageIdx((prev) => (prev + 1) % AI_PIPELINE_STAGES.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying, prefersReducedMotion]);

  const activeStage = AI_PIPELINE_STAGES[activeStageIdx];

  return (
    <div className="space-y-6">
      {/* Step 1: Welcome Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800/90 bg-[#0D1628] p-6 sm:p-8 lg:p-10">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/8 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-blue-600/8 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-8 items-center">
          <div className="xl:col-span-7 space-y-5 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-cyan-300">
              <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>AI Career Transformation Studio</span>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <span className="text-slate-400">15 Industries · 10 Live Simulations</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-50 [text-wrap:balance]">
              Your Industry Experience Is Valuable. AI Can Make It More Powerful.
            </h1>

            <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-slate-300">
              Discover how Artificial Intelligence and Machine Learning can transform your existing
              job responsibilities into intelligent, automated and data-driven workflows.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onExploreProfession}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 whitespace-nowrap"
              >
                <span>Explore My Profession</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onExploreProjects}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-700 bg-[#121E36] px-5 py-2.5 text-sm font-medium text-slate-100 transition-colors hover:border-cyan-500/50 hover:text-cyan-200 whitespace-nowrap"
              >
                <span>Explore AI Projects</span>
              </button>
            </div>
          </div>

          {/* Animated Domain-to-AI Transformation Illustration */}
          <div className="xl:col-span-5 min-w-0 rounded-xl border border-slate-800/80 bg-[#091122] p-5">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
              <span className="font-medium text-slate-200">Domain + AI Multiplier Model</span>
              <span className="font-mono text-cyan-300">HUMAN IN THE LOOP</span>
            </div>

            <svg
              viewBox="0 0 420 210"
              className="w-full h-auto"
              role="img"
              aria-label="Illustration showing domain expertise combining with AI data processing and human review to create measurable business outcomes"
            >
              <defs>
                <linearGradient id="careerBridgeGrad" x1="40" y1="105" x2="380" y2="105" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Connecting lines */}
              <path
                d="M 88 72 C 145 72, 145 105, 196 105"
                fill="none"
                stroke="#22D3EE"
                strokeOpacity="0.45"
                strokeWidth="2"
                strokeDasharray="5 4"
              />
              <path
                d="M 88 140 C 145 140, 145 105, 196 105"
                fill="none"
                stroke="#3B82F6"
                strokeOpacity="0.45"
                strokeWidth="2"
                strokeDasharray="5 4"
              />
              <line
                x1="226"
                y1="105"
                x2="328"
                y2="105"
                stroke="url(#careerBridgeGrad)"
                strokeWidth="2.5"
              />

              {!prefersReducedMotion && (
                <>
                  <motion.circle
                    r="4"
                    fill="#22D3EE"
                    animate={{ cx: [88, 196, 328], cy: [72, 105, 105] }}
                    transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.circle
                    r="4"
                    fill="#60A5FA"
                    animate={{ cx: [88, 196, 328], cy: [140, 105, 105] }}
                    transition={{ duration: 3.4, delay: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </>
              )}

              {/* Left Nodes */}
              <rect x="14" y="46" width="110" height="52" rx="8" fill="#0D1628" stroke="#22D3EE" strokeOpacity="0.6" />
              <text x="69" y="68" textAnchor="middle" fill="#E2E8F0" fontSize="10.5" fontWeight="600">
                Your Experience
              </text>
              <text x="69" y="84" textAnchor="middle" fill="#94A3B8" fontSize="9">
                Domain Judgment
              </text>

              <rect x="14" y="114" width="110" height="52" rx="8" fill="#0D1628" stroke="#3B82F6" strokeOpacity="0.6" />
              <text x="69" y="136" textAnchor="middle" fill="#E2E8F0" fontSize="10.5" fontWeight="600">
                Workflow Data
              </text>
              <text x="69" y="152" textAnchor="middle" fill="#94A3B8" fontSize="9">
                Docs, Tables & Logs
              </text>

              {/* Center Engine */}
              <circle cx="210" cy="105" r="34" fill="#101D36" stroke="#38BDF8" strokeWidth="2" />
              <text x="210" y="101" textAnchor="middle" fill="#67E8F9" fontSize="11" fontWeight="700">
                AI / ML
              </text>
              <text x="210" y="116" textAnchor="middle" fill="#CBD5E1" fontSize="9">
                Pattern Engine
              </text>

              {/* Right Node */}
              <rect x="294" y="68" width="114" height="74" rx="10" fill="#111C33" stroke="#A78BFA" strokeOpacity="0.7" />
              <text x="351" y="92" textAnchor="middle" fill="#F8FAFC" fontSize="10.5" fontWeight="600">
                Human-Reviewed
              </text>
              <text x="351" y="107" textAnchor="middle" fill="#C4B5FD" fontSize="10.5" fontWeight="600">
                Smart Output
              </text>
              <text x="351" y="126" textAnchor="middle" fill="#94A3B8" fontSize="9">
                Speed + Accountability
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* Interactive 7-Stage AI Transformation Pipeline */}
      <section className="rounded-2xl border border-slate-800/90 bg-[#0D1628] p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-slate-100">
              How Any Workplace Task Becomes AI-Enabled
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Click any stage in the 7-step transformation pipeline to inspect what flows in, how AI helps, and where human review remains essential.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-slate-700 bg-[#121E36] px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-500/40 hover:text-cyan-200 transition-colors whitespace-nowrap"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Pause Flow</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Auto-Cycle Stages</span>
              </>
            )}
          </button>
        </div>

        {/* Interactive Clickable Pipeline Track */}
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-2.5">
          {AI_PIPELINE_STAGES.map((stage, idx) => {
            const isActive = idx === activeStageIdx;
            const isHumanStage = stage.id === 'human-task' || stage.id === 'human-review';
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveStageIdx(idx);
                }}
                aria-pressed={isActive}
                className={`group relative flex flex-col justify-between rounded-xl border p-3 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                  isActive
                    ? 'border-cyan-400 bg-cyan-500/12 text-slate-50 shadow-sm shadow-cyan-500/10'
                    : 'border-slate-800 bg-[#091122] text-slate-300 hover:border-slate-700 hover:bg-[#101B33]'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span
                    className={`font-mono text-[11px] font-semibold tabular-nums ${
                      isActive ? 'text-cyan-300' : 'text-slate-500'
                    }`}
                  >
                    0{stage.order}
                  </span>
                  {isHumanStage && (
                    <UserCheck
                      className={`h-3.5 w-3.5 ${isActive ? 'text-cyan-300' : 'text-slate-500'}`}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold leading-snug">{stage.label}</div>
                  <div className="text-[11px] text-slate-400 leading-tight">{stage.shortRole}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Inspection Panel */}
        <div className="rounded-xl border border-slate-800/90 bg-[#091122] p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7 space-y-2 min-w-0">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
              <span>STAGE 0{activeStage.order} / 07</span>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <span className="text-slate-400 uppercase">{activeStage.shortRole}</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-100">
              {activeStage.label}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">{activeStage.description}</p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 min-w-0">
            <div className="rounded-lg border border-slate-800 bg-[#0D1628] p-3.5 space-y-1">
              <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Real Workplace Example
              </div>
              <div className="text-xs text-slate-200 leading-relaxed">
                {activeStage.exampleByRole}
              </div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-[#0D1628] p-3.5 space-y-1">
              <div className="text-[11px] font-medium text-cyan-300 uppercase tracking-wider">
                Output Artifact at This Stage
              </div>
              <div className="font-mono text-xs text-slate-200">{activeStage.dataArtifact}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
