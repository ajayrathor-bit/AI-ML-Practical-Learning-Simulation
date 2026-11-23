import { ChevronLeft, ChevronRight, RotateCcw, BookOpen, Wrench, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { LessonStep } from '../types/lab';

interface StepLessonPlayerProps {
  moduleTitle: string;
  steps: LessonStep[];
  currentStep: number;
  onStepChange: (nextStep: number) => void;
  onReplay?: () => void;
  completedSteps: number[];
}

export function StepLessonPlayer({
  moduleTitle,
  steps,
  currentStep,
  onStepChange,
  onReplay,
  completedSteps,
}: StepLessonPlayerProps) {
  const step = steps[currentStep] ?? steps[0];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  return (
    <section
      aria-label={`${moduleTitle} step-by-step lesson`}
      className="rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 sm:p-6"
    >
      {/* Top step bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Guided Lesson</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-cyan-300">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="flex items-center gap-1.5 pt-1" role="tablist" aria-label="Lesson steps">
            {steps.map((item, idx) => {
              const active = idx === currentStep;
              const visited = completedSteps.includes(idx);
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Step ${idx + 1}: ${item.title}`}
                  onClick={() => onStepChange(idx)}
                  className={`h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                    active
                      ? 'w-8 bg-cyan-400'
                      : visited
                      ? 'w-3.5 bg-blue-500/70 hover:bg-blue-400'
                      : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                  }`}
                />
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onReplay && (
            <button
              type="button"
              onClick={onReplay}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-slate-700/90 bg-[#121E36] px-3.5 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-cyan-500/50 hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 whitespace-nowrap shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Replay Simulation</span>
            </button>
          )}
          <button
            type="button"
            disabled={isFirst}
            onClick={() => onStepChange(Math.max(0, currentStep - 1))}
            className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-slate-700/90 bg-[#121E36] px-3.5 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 whitespace-nowrap shrink-0"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span>Previous</span>
          </button>
          <button
            type="button"
            disabled={isLast}
            onClick={() => onStepChange(Math.min(steps.length - 1, currentStep + 1))}
            className="inline-flex min-h-10 items-center gap-1 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 whitespace-nowrap shrink-0"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="pt-5 space-y-5"
        >
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-50 tracking-tight">
              {step.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="space-y-2 rounded-lg border border-slate-800/80 bg-[#091020] p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                <BookOpen className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Concept & Theory</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-300">{step.theory}</p>
            </div>

            <div className="space-y-2 rounded-lg border border-slate-800/80 bg-[#091020] p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-300">
                <Wrench className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Practical Experiment</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-300">{step.practical}</p>
            </div>

            <div className="space-y-2 rounded-lg border border-slate-800/80 bg-[#091020] p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-300">
                <Lightbulb className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>What This Demonstrates</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-300">{step.demonstrates}</p>
              <p className="pt-1 text-xs font-medium text-slate-400">
                Key takeaway: <span className="text-slate-200">{step.keyTakeaway}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
