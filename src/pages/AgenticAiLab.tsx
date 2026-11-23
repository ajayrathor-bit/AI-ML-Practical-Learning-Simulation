import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { AGENTIC_STEPS, AGENT_SCENARIOS } from '../data/curriculum';
import { StepLessonPlayer } from '../components/StepLessonPlayer';
import { SimulationNotice } from '../components/SimulationNotice';

interface AgenticAiLabProps {
  completedSteps: number[];
  onCompleteStep: (stepIndex: number) => void;
}

export function AgenticAiLab({ completedSteps, onCompleteStep }: AgenticAiLabProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [scenarioKey, setScenarioKey] = useState<'incident' | 'research'>('incident');
  const [archMode, setArchMode] = useState<'single' | 'multi'>('single');
  const [traceIdx, setTraceIdx] = useState(0);
  const [replayNonce, setReplayNonce] = useState(0);

  useEffect(() => {
    onCompleteStep(currentStep);
    if (currentStep === 3) {
      setArchMode('multi');
    }
  }, [currentStep, onCompleteStep]);

  const scenario = AGENT_SCENARIOS[scenarioKey];

  useEffect(() => {
    setTraceIdx(0);
    const timer = window.setInterval(() => {
      setTraceIdx((prev) => (prev < scenario.steps.length - 1 ? prev + 1 : 0));
    }, 1250);
    return () => window.clearInterval(timer);
  }, [replayNonce, scenarioKey, archMode, scenario.steps.length]);

  const activeTrace = scenario.steps[traceIdx] ?? scenario.steps[0];
  const handleReplay = () => setReplayNonce((n) => n + 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs text-purple-300 font-medium">Module 06 · Autonomous Workflows</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
            Agentic AI Lab
          </h1>
        </div>
        <SimulationNotice label="Simulated Execution Trace · Sample Agentic Scenarios" />
      </div>

      <StepLessonPlayer
        moduleTitle="Agentic AI Lab"
        steps={AGENTIC_STEPS}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        onReplay={handleReplay}
        completedSteps={completedSteps}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Interactive SVG Agentic Architecture Stage */}
        <section className="lg:col-span-8 rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-100">
                {archMode === 'single'
                  ? 'ReAct Agent Loop (Plan · Reason · Tool · Observe)'
                  : 'Multi-Agent Orchestration Workflow'}
              </h3>
              <p className="text-xs text-slate-400">Goal: {scenario.goal}</p>
            </div>

            <div className="inline-flex rounded-lg border border-slate-800 bg-[#070D19] p-1">
              <button
                type="button"
                onClick={() => setArchMode('single')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                  archMode === 'single'
                    ? 'bg-purple-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Single Agent Loop
              </button>
              <button
                type="button"
                onClick={() => setArchMode('multi')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                  archMode === 'multi'
                    ? 'bg-cyan-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Multi-Agent Team
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-slate-800/80 bg-[#070D19] p-4 overflow-x-auto">
            {archMode === 'single' ? (
              <svg
                viewBox="0 0 700 240"
                className="w-full min-w-[560px] h-auto"
                role="img"
                aria-label="Single AI agent planning, reasoning, and tool execution loop"
              >
                {/* Connecting arrows */}
                <line x1="145" y1="80" x2="215" y2="80" stroke="#334155" strokeWidth="2" />
                <line x1="335" y1="80" x2="405" y2="80" stroke="#334155" strokeWidth="2" />
                <line x1="525" y1="80" x2="575" y2="80" stroke="#334155" strokeWidth="2" />
                <path
                  d="M 465 118 C 465 190, 275 190, 275 118"
                  fill="none"
                  stroke={traceIdx === 4 ? '#22D3EE' : '#334155'}
                  strokeWidth="2"
                  strokeDasharray="5 4"
                />
                <text x="370" y="205" textAnchor="middle" fill="#94A3B8" fontSize="10.5">
                  Observation Feedback Loop
                </text>

                {/* Animated Packet */}
                <motion.circle
                  key={`single-${replayNonce}-${traceIdx}`}
                  cx={85}
                  cy={80}
                  r="4.5"
                  fill="#22D3EE"
                  initial={{ cx: 85, cy: 80 }}
                  animate={{
                    cx:
                      traceIdx === 0
                        ? 85
                        : traceIdx === 1
                        ? 275
                        : traceIdx === 2
                        ? 275
                        : traceIdx === 3
                        ? 465
                        : traceIdx === 4
                        ? 370
                        : 630,
                    cy: traceIdx === 4 ? 172 : 80,
                  }}
                  transition={{ duration: 0.45 }}
                />

                {[
                  { x: 25, label: '1. Goal & Plan', active: traceIdx <= 1 },
                  { x: 215, label: '2. Reasoning', active: traceIdx === 2 || traceIdx === 4 },
                  { x: 405, label: '3. Tool Call', active: traceIdx === 3 },
                ].map((box) => (
                  <g key={box.label}>
                    <rect
                      x={box.x}
                      y="45"
                      width="120"
                      height="70"
                      rx="9"
                      fill={box.active ? '#12223E' : '#0D1628'}
                      stroke={box.active ? '#22D3EE' : '#1E293B'}
                      strokeWidth={box.active ? '2' : '1.25'}
                    />
                    <text
                      x={box.x + 60}
                      y="84"
                      textAnchor="middle"
                      fill={box.active ? '#67E8F9' : '#E2E8F0'}
                      fontSize="11.5"
                      fontWeight="600"
                    >
                      {box.label}
                    </text>
                  </g>
                ))}

                <rect
                  x="575"
                  y="45"
                  width="105"
                  height="70"
                  rx="9"
                  fill={traceIdx === 5 ? '#12223E' : '#0D1628'}
                  stroke={traceIdx === 5 ? '#A78BFA' : '#1E293B'}
                  strokeWidth={traceIdx === 5 ? '2' : '1.25'}
                />
                <text
                  x="627"
                  y="84"
                  textAnchor="middle"
                  fill={traceIdx === 5 ? '#DDD6FE' : '#E2E8F0'}
                  fontSize="11.5"
                  fontWeight="600"
                >
                  4. Output
                </text>
              </svg>
            ) : (
              <svg
                viewBox="0 0 700 240"
                className="w-full min-w-[560px] h-auto"
                role="img"
                aria-label="Multi-agent orchestration workflow diagram"
              >
                {/* Edges from Orchestrator */}
                <line x1="210" y1="120" x2="310" y2="55" stroke="#3B82F6" strokeWidth="1.8" />
                <line x1="210" y1="120" x2="310" y2="120" stroke="#22D3EE" strokeWidth="1.8" />
                <line x1="210" y1="120" x2="310" y2="185" stroke="#A78BFA" strokeWidth="1.8" />
                <line x1="460" y1="55" x2="545" y2="120" stroke="#334155" strokeWidth="1.5" />
                <line x1="460" y1="120" x2="545" y2="120" stroke="#334155" strokeWidth="1.5" />
                <line x1="460" y1="185" x2="545" y2="120" stroke="#334155" strokeWidth="1.5" />

                {/* Orchestrator */}
                <rect
                  x="40"
                  y="84"
                  width="170"
                  height="72"
                  rx="10"
                  fill={traceIdx <= 1 ? '#12223E' : '#0D1628'}
                  stroke={traceIdx <= 1 ? '#22D3EE' : '#3B82F6'}
                  strokeWidth="1.8"
                />
                <text x="125" y="116" textAnchor="middle" fill="#F8FAFC" fontSize="12" fontWeight="600">
                  Orchestrator Agent
                </text>
                <text x="125" y="135" textAnchor="middle" fill="#94A3B8" fontSize="10">
                  Decomposes &amp; routes tasks
                </text>

                {/* Specialist Agents */}
                {[
                  { y: 25, title: 'Planner Agent', sub: 'Task dependencies', active: traceIdx === 1 },
                  { y: 90, title: 'Tool / Data Agent', sub: 'Queries APIs & DB', active: traceIdx === 2 || traceIdx === 3 },
                  { y: 155, title: 'Critic / Reviewer', sub: 'Verifies accuracy', active: traceIdx === 4 },
                ].map((agent) => (
                  <g key={agent.title}>
                    <rect
                      x="310"
                      y={agent.y}
                      width="150"
                      height="58"
                      rx="9"
                      fill={agent.active ? '#12223E' : '#0D1628'}
                      stroke={agent.active ? '#22D3EE' : '#1E293B'}
                      strokeWidth={agent.active ? '2' : '1.25'}
                    />
                    <text x="385" y={agent.y + 26} textAnchor="middle" fill="#F1F5F9" fontSize="11.5" fontWeight="600">
                      {agent.title}
                    </text>
                    <text x="385" y={agent.y + 43} textAnchor="middle" fill="#94A3B8" fontSize="9.5">
                      {agent.sub}
                    </text>
                  </g>
                ))}

                {/* Final Synthesis */}
                <rect
                  x="545"
                  y="84"
                  width="130"
                  height="72"
                  rx="10"
                  fill={traceIdx === 5 ? '#12223E' : '#0D1628'}
                  stroke={traceIdx === 5 ? '#A78BFA' : '#1E293B'}
                  strokeWidth={traceIdx === 5 ? '2' : '1.25'}
                />
                <text x="610" y="116" textAnchor="middle" fill="#F8FAFC" fontSize="12" fontWeight="600">
                  Verified Output
                </text>
                <text x="610" y="135" textAnchor="middle" fill="#94A3B8" fontSize="10">
                  Actionable brief
                </text>
              </svg>
            )}
          </div>

          <div className="rounded-lg border border-slate-800/80 bg-[#091020] p-4 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-cyan-300">
                Active Phase: {activeTrace.phase} ({activeTrace.actor})
              </span>
              <span className="font-mono text-slate-400 tabular-nums">
                Step {traceIdx + 1}/{scenario.steps.length}
              </span>
            </div>
            <div className="text-sm font-medium text-slate-100">{activeTrace.summary}</div>
            <div className="text-xs text-slate-400">{activeTrace.detail}</div>
          </div>
        </section>

        {/* Right Scenario & Trace List */}
        <section className="lg:col-span-4 rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 sm:p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-slate-100">Agent Scenario</h3>
            <div className="grid grid-cols-2 gap-2">
              {(['incident', 'research'] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setScenarioKey(key)}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                    scenarioKey === key
                      ? 'border-cyan-500/60 bg-cyan-500/15 text-cyan-200'
                      : 'border-slate-700 bg-[#121E36] text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {AGENT_SCENARIOS[key].label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-medium text-slate-400">
              Click any execution step to inspect:
            </div>
            <div className="space-y-1.5">
              {scenario.steps.map((step, idx) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setTraceIdx(idx)}
                  className={`w-full rounded-lg border px-3 py-2 text-left transition-colors ${
                    traceIdx === idx
                      ? 'border-cyan-500/50 bg-cyan-500/10 text-slate-100'
                      : 'border-slate-800 bg-[#091020] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-cyan-300">{step.phase}</span>
                    <span>{step.actor}</span>
                  </div>
                  <div className="text-xs mt-0.5 truncate">{step.summary}</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
