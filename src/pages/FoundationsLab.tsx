import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FOUNDATIONS_STEPS, AI_INDUSTRY_APPLICATIONS } from '../data/curriculum';
import { StepLessonPlayer } from '../components/StepLessonPlayer';
import { SimulationNotice } from '../components/SimulationNotice';

interface FoundationsLabProps {
  completedSteps: number[];
  onCompleteStep: (stepIndex: number) => void;
}

const WORKFLOW_NODES = [
  { id: 'data', x: 70, label: 'Input Data', sub: 'Raw observations' },
  { id: 'features', x: 250, label: 'Feature Extraction', sub: 'Measurable signals' },
  { id: 'model', x: 430, label: 'AI Model', sub: 'Pattern reasoning' },
  { id: 'decision', x: 610, label: 'Decision Output', sub: 'Scored prediction' },
  { id: 'feedback', x: 790, label: 'Feedback Loop', sub: 'Human verification' },
];

export function FoundationsLab({
  completedSteps,
  onCompleteStep,
}: FoundationsLabProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedIndustry, setSelectedIndustry] = useState(AI_INDUSTRY_APPLICATIONS[0].id);
  const [aiScope, setAiScope] = useState<'narrow' | 'general'>('narrow');
  const [activeStage, setActiveStage] = useState(0);
  const [replayNonce, setReplayNonce] = useState(0);

  useEffect(() => {
    onCompleteStep(currentStep);
  }, [currentStep, onCompleteStep]);

  useEffect(() => {
    setActiveStage(0);
    const timer = window.setInterval(() => {
      setActiveStage((prev) => (prev < 4 ? prev + 1 : 0));
    }, 1150);
    return () => window.clearInterval(timer);
  }, [replayNonce, currentStep]);

  const industry =
    AI_INDUSTRY_APPLICATIONS.find((a) => a.id === selectedIndustry) ??
    AI_INDUSTRY_APPLICATIONS[0];

  const handleReplay = () => {
    setReplayNonce((n) => n + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs text-cyan-300 font-medium">Module 01 · Core Concepts</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
            AI Foundations Lab
          </h1>
        </div>
        <SimulationNotice label="Interactive Conceptual Model · Domain Example Simulation" />
      </div>

      <StepLessonPlayer
        moduleTitle="AI Foundations"
        steps={FOUNDATIONS_STEPS}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        onReplay={handleReplay}
        completedSteps={completedSteps}
      />

      {/* Interactive Stage + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Animated SVG Workflow Stage */}
        <section className="lg:col-span-8 rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 sm:p-6 flex flex-col justify-between gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-100">
                Animated AI Signal Workflow
              </h3>
              <p className="text-xs text-slate-400">
                Active domain: <span className="text-cyan-300 font-medium">{industry.name}</span> · Stage {activeStage + 1} of 5
              </p>
            </div>
            <div className="inline-flex rounded-lg border border-slate-800 bg-[#070D19] p-1">
              <button
                type="button"
                onClick={() => setAiScope('narrow')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                  aiScope === 'narrow'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Narrow AI (Applied)
              </button>
              <button
                type="button"
                onClick={() => setAiScope('general')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                  aiScope === 'general'
                    ? 'bg-purple-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                General AI (Research)
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-slate-800/80 bg-[#070D19] p-4 overflow-x-auto">
            <svg
              viewBox="0 0 880 220"
              className="w-full min-w-[660px] h-auto"
              role="img"
              aria-label="Animated five-stage AI workflow diagram"
            >
              {/* Connecting lines */}
              {WORKFLOW_NODES.slice(0, -1).map((node, idx) => {
                const next = WORKFLOW_NODES[idx + 1];
                const active = activeStage >= idx;
                return (
                  <g key={node.id}>
                    <line
                      x1={node.x + 54}
                      y1="88"
                      x2={next.x - 54}
                      y2="88"
                      stroke={active ? '#22D3EE' : '#1E293B'}
                      strokeWidth="2.5"
                    />
                    {activeStage === idx && (
                      <motion.circle
                        key={`${replayNonce}-${idx}`}
                        cx={node.x + 54}
                        cy="88"
                        r="5"
                        fill="#22D3EE"
                        initial={{ cx: node.x + 54 }}
                        animate={{ cx: next.x - 54 }}
                        transition={{ duration: 0.9, ease: 'easeInOut' }}
                      />
                    )}
                  </g>
                );
              })}

              {/* Feedback return arc */}
              <path
                d="M 790 128 C 790 190, 70 190, 70 128"
                fill="none"
                stroke={currentStep === 3 || activeStage === 4 ? '#8B5CF6' : '#1E293B'}
                strokeWidth="2"
                strokeDasharray="6 5"
              />
              <text
                x="430"
                y="198"
                textAnchor="middle"
                fill={currentStep === 3 || activeStage === 4 ? '#C4B5FD' : '#64748B'}
                fontSize="11"
                fontFamily="JetBrains Mono, monospace"
              >
                Continuous Feedback &amp; Re-evaluation Loop
              </text>

              {/* Stage Nodes */}
              {WORKFLOW_NODES.map((node, idx) => {
                const isActive = activeStage === idx;
                const isDone = activeStage > idx;
                return (
                  <g
                    key={node.id}
                    onClick={() => setActiveStage(idx)}
                    className="cursor-pointer"
                  >
                    <rect
                      x={node.x - 56}
                      y="50"
                      width="112"
                      height="76"
                      rx="10"
                      fill={isActive ? '#12223E' : '#0D1628'}
                      stroke={
                        isActive ? '#22D3EE' : isDone ? '#3B82F6' : '#1E293B'
                      }
                      strokeWidth={isActive ? '2' : '1.25'}
                    />
                    <text
                      x={node.x}
                      y="78"
                      textAnchor="middle"
                      fill={isActive ? '#67E8F9' : '#F1F5F9'}
                      fontSize="12"
                      fontWeight="600"
                    >
                      {node.label}
                    </text>
                    <text
                      x={node.x}
                      y="100"
                      textAnchor="middle"
                      fill="#94A3B8"
                      fontSize="10"
                    >
                      {node.sub}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Live Domain Mapping Readout */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-slate-800/80 bg-[#091020] p-3.5 space-y-1">
              <div className="text-[11px] font-medium text-cyan-300">Sample Input</div>
              <div className="text-xs text-slate-200">{industry.inputSample}</div>
            </div>
            <div className="rounded-lg border border-slate-800/80 bg-[#091020] p-3.5 space-y-1">
              <div className="text-[11px] font-medium text-blue-300">Model Task</div>
              <div className="text-xs text-slate-200">{industry.modelTask}</div>
            </div>
            <div className="rounded-lg border border-slate-800/80 bg-[#091020] p-3.5 space-y-1">
              <div className="text-[11px] font-medium text-purple-300">Actionable Output</div>
              <div className="text-xs text-slate-200">{industry.outputSample}</div>
            </div>
          </div>
        </section>

        {/* Right Control & Comparison Panel */}
        <section className="lg:col-span-4 rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 sm:p-6 flex flex-col justify-between gap-5">
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-semibold text-slate-100">
                Real-World Industry Selector
              </h3>
              <p className="text-xs text-slate-400">
                Switch sectors to inspect how the same AI pipeline adapts to different data.
              </p>
            </div>

            <div className="space-y-2">
              {AI_INDUSTRY_APPLICATIONS.map((app) => {
                const selected = app.id === selectedIndustry;
                return (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => setSelectedIndustry(app.id)}
                    className={`w-full rounded-lg border p-3 text-left transition-colors ${
                      selected
                        ? 'border-cyan-500/50 bg-cyan-500/10 text-slate-100'
                        : 'border-slate-800 bg-[#091020] text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-sm font-medium">{app.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{app.impact}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800/80 bg-[#091020] p-4 space-y-2">
            <div className="text-xs font-semibold text-slate-200">
              {aiScope === 'narrow'
                ? 'Narrow AI Profile (Production Today)'
                : 'Artificial General Intelligence (Theoretical)'}
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              {aiScope === 'narrow'
                ? 'Trained on curated domain examples to perform one well-scoped task reliably—such as defect inspection, speech transcription, or risk scoring.'
                : 'A hypothetical system capable of transferring reasoning across arbitrary unfamiliar domains without task-specific retraining.'}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
