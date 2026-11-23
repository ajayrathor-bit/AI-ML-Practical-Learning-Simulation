import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  GENAI_QUERY_PRESETS,
  GENAI_STEPS,
  RAG_DOCUMENT_CHUNKS,
} from '../data/curriculum';
import {
  computeSoftmaxTokenDistribution,
  retrieveTopChunks,
} from '../utils/simulations';
import { StepLessonPlayer } from '../components/StepLessonPlayer';
import { ControlSlider } from '../components/ControlSlider';
import { SimulationNotice } from '../components/SimulationNotice';

interface GenAiLabProps {
  completedSteps: number[];
  onCompleteStep: (stepIndex: number) => void;
}

const NEXT_TOKEN_CANDIDATES = [
  { token: 'retrieval', baseLogit: 4.4 },
  { token: 'prediction', baseLogit: 3.6 },
  { token: 'forecast', baseLogit: 2.7 },
  { token: 'summary', baseLogit: 2.1 },
  { token: 'hypothesis', baseLogit: 1.4 },
];

const RAG_FLOW_NODES = [
  { x: 75, label: 'User Query', sub: 'Natural question' },
  { x: 225, label: 'Embedding', sub: 'Vector encoding' },
  { x: 375, label: 'Vector Store', sub: 'Cosine top-k' },
  { x: 525, label: 'Augmented Prompt', sub: 'Context + query' },
  { x: 675, label: 'LLM Synthesis', sub: 'Cited answer' },
];

export function GenAiLab({ completedSteps, onCompleteStep }: GenAiLabProps) {
  const [currentStep, setCurrentStep] = useState(0);

  // Prompt engineering toggles
  const [includeRole, setIncludeRole] = useState(true);
  const [includeContext, setIncludeContext] = useState(true);
  const [includeConstraints, setIncludeConstraints] = useState(false);

  // Sampling parameters
  const [temperature, setTemperature] = useState(0.7);
  const [topK, setTopK] = useState(4);

  // RAG query selection
  const [selectedQueryId, setSelectedQueryId] = useState(GENAI_QUERY_PRESETS[0].id);
  const [ragStage, setRagStage] = useState(0);
  const [replayNonce, setReplayNonce] = useState(0);

  useEffect(() => {
    onCompleteStep(currentStep);
  }, [currentStep, onCompleteStep]);

  useEffect(() => {
    setRagStage(0);
    const timer = window.setInterval(() => {
      setRagStage((prev) => (prev < 4 ? prev + 1 : 0));
    }, 1100);
    return () => window.clearInterval(timer);
  }, [replayNonce, selectedQueryId]);

  const tokenDistribution = useMemo(
    () => computeSoftmaxTokenDistribution(NEXT_TOKEN_CANDIDATES, temperature, topK),
    [temperature, topK]
  );

  const activeQuery =
    GENAI_QUERY_PRESETS.find((q) => q.id === selectedQueryId) ?? GENAI_QUERY_PRESETS[0];

  const ragMatches = useMemo(
    () => retrieveTopChunks(activeQuery.vector, RAG_DOCUMENT_CHUNKS, 2),
    [activeQuery]
  );

  const assembledPrompt = useMemo(() => {
    const parts: string[] = [];
    if (includeRole) parts.push('Role: Act as a concise AI curriculum mentor.');
    if (includeContext)
      parts.push('Context: Explaining supervised vs unsupervised learning to a beginner.');
    parts.push('Task: Explain how models learn from examples.');
    if (includeConstraints)
      parts.push('Constraint: Use 2 bullet points and one concrete analogy.');
    return parts.join('\n');
  }, [includeRole, includeContext, includeConstraints]);

  const handleReplay = () => setReplayNonce((n) => n + 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs text-blue-300 font-medium">Module 05 · LLMs &amp; RAG</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
            Generative AI Lab
          </h1>
        </div>
        <SimulationNotice />
      </div>

      <StepLessonPlayer
        moduleTitle="Generative AI Lab"
        steps={GENAI_STEPS}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        onReplay={handleReplay}
        completedSteps={completedSteps}
      />

      {/* Row 1: Prompt Playground + Token Sampling */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <section className="lg:col-span-6 rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 sm:p-6 space-y-4">
          <div>
            <h3 className="text-base font-semibold text-slate-100">
              Prompt Engineering Playground
            </h3>
            <p className="text-xs text-slate-400">
              Toggle structured prompt components to see how instruction design narrows output quality.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { label: 'System Role', active: includeRole, toggle: () => setIncludeRole((v) => !v) },
              {
                label: 'Domain Context',
                active: includeContext,
                toggle: () => setIncludeContext((v) => !v),
              },
              {
                label: 'Format Constraints',
                active: includeConstraints,
                toggle: () => setIncludeConstraints((v) => !v),
              },
            ].map((mod) => (
              <button
                key={mod.label}
                type="button"
                onClick={mod.toggle}
                aria-pressed={mod.active}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                  mod.active
                    ? 'border-cyan-500/60 bg-cyan-500/15 text-cyan-200'
                    : 'border-slate-700 bg-[#121E36] text-slate-400 hover:text-slate-200'
                }`}
              >
                {mod.active ? 'Enabled: ' : 'Add '}
                {mod.label}
              </button>
            ))}
          </div>

          <div className="rounded-lg border border-slate-800 bg-[#070D19] p-3.5 space-y-1.5">
            <div className="text-[11px] font-medium text-slate-400">Constructed Prompt</div>
            <pre className="whitespace-pre-wrap font-mono text-xs text-slate-200 leading-relaxed">
              {assembledPrompt}
            </pre>
          </div>

          <div className="rounded-lg border border-slate-800 bg-[#091020] p-3.5 space-y-1.5">
            <div className="text-[11px] font-medium text-cyan-300">
              Simulated Response Style Preview
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              {includeConstraints
                ? '• Supervised learning studies labeled answer keys.\n• Unsupervised learning groups similar records without labels—like sorting books by topic without reading the spine titles.'
                : includeRole && includeContext
                ? 'Think of supervised learning as practicing with an answer key, while unsupervised learning explores patterns on its own without pre-labeled answers.'
                : 'Models adjust parameters using training algorithms on datasets to generate outputs.'}
            </p>
          </div>
        </section>

        <section className="lg:col-span-6 rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 sm:p-6 space-y-4">
          <div>
            <h3 className="text-base font-semibold text-slate-100">
              Next-Token Sampling Distribution
            </h3>
            <p className="text-xs text-slate-400">
              Adjust Temperature and Top-K to reshape candidate token probabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ControlSlider
              label="Temperature"
              value={temperature}
              min={0.2}
              max={1.8}
              step={0.1}
              onChange={setTemperature}
            />
            <ControlSlider
              label="Top-K Cutoff"
              value={topK}
              min={1}
              max={5}
              step={1}
              unit=" tokens"
              onChange={setTopK}
            />
          </div>

          <div className="space-y-2.5 pt-1">
            {tokenDistribution.map((item) => (
              <div key={item.token} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className={item.probability > 0 ? 'text-slate-200' : 'text-slate-600'}>
                    &ldquo;{item.token}&rdquo;
                  </span>
                  <span
                    className={`tabular-nums ${
                      item.probability > 0 ? 'text-cyan-300' : 'text-slate-600'
                    }`}
                  >
                    {item.probability}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
                    style={{ width: `${item.probability}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Row 2: RAG Architecture Animated SVG + Vector Space Embeddings */}
      <section className="rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 sm:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-100">
              Embeddings &amp; RAG Architecture Visualizer
            </h3>
            <p className="text-xs text-slate-400">
              Select a user query to see 2D vector similarity matching and grounded RAG synthesis.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {GENAI_QUERY_PRESETS.map((q, idx) => (
              <button
                key={q.id}
                type="button"
                onClick={() => setSelectedQueryId(q.id)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedQueryId === q.id
                    ? 'border-blue-500/60 bg-blue-500/15 text-blue-200'
                    : 'border-slate-700 bg-[#121E36] text-slate-300 hover:border-slate-600'
                }`}
              >
                Query {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Animated RAG Pipeline SVG */}
        <div className="rounded-lg border border-slate-800/80 bg-[#070D19] p-3 overflow-x-auto">
          <svg
            viewBox="0 0 760 120"
            className="w-full min-w-[600px] h-auto"
            role="img"
            aria-label="Animated RAG retrieval and synthesis diagram"
          >
            {RAG_FLOW_NODES.slice(0, -1).map((node, idx) => {
              const next = RAG_FLOW_NODES[idx + 1];
              return (
                <g key={node.label}>
                  <line
                    x1={node.x + 56}
                    y1="60"
                    x2={next.x - 56}
                    y2="60"
                    stroke={ragStage >= idx ? '#22D3EE' : '#1E293B'}
                    strokeWidth="2"
                  />
                  {ragStage === idx && (
                    <motion.circle
                      key={`rag-${replayNonce}-${idx}`}
                      cx={node.x + 56}
                      cy="60"
                      r="4"
                      fill="#22D3EE"
                      initial={{ cx: node.x + 56 }}
                      animate={{ cx: next.x - 56 }}
                      transition={{ duration: 0.85, ease: 'easeInOut' }}
                    />
                  )}
                </g>
              );
            })}

            {RAG_FLOW_NODES.map((node, idx) => {
              const active = ragStage === idx;
              return (
                <g key={node.label}>
                  <rect
                    x={node.x - 56}
                    y="24"
                    width="112"
                    height="72"
                    rx="9"
                    fill={active ? '#12223E' : '#0D1628'}
                    stroke={active ? '#22D3EE' : '#1E293B'}
                    strokeWidth={active ? '2' : '1.25'}
                  />
                  <text
                    x={node.x}
                    y="54"
                    textAnchor="middle"
                    fill={active ? '#67E8F9' : '#F1F5F9'}
                    fontSize="11.5"
                    fontWeight="600"
                  >
                    {node.label}
                  </text>
                  <text x={node.x} y="74" textAnchor="middle" fill="#94A3B8" fontSize="10">
                    {node.sub}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* 2D Vector Space Plot */}
          <div className="lg:col-span-5 rounded-lg border border-slate-800/80 bg-[#070D19] p-4 space-y-2">
            <div className="text-xs font-medium text-slate-300">
              2D Embedding Space (Cosine Proximity)
            </div>
            <svg viewBox="0 0 260 200" className="w-full h-auto" role="img" aria-label="2D vector embedding similarity plot">
              <line x1="25" y1="175" x2="245" y2="175" stroke="#334155" strokeWidth="1" />
              <line x1="25" y1="20" x2="25" y2="175" stroke="#334155" strokeWidth="1" />
              {RAG_DOCUMENT_CHUNKS.map((chunk, i) => {
                const cx = 25 + chunk.vector[0] * 200;
                const cy = 175 - chunk.vector[1] * 145;
                const qx = 25 + activeQuery.vector[0] * 200;
                const qy = 175 - activeQuery.vector[1] * 145;
                const isTop = ragMatches[0]?.chunk.id === chunk.id;
                return (
                  <g key={chunk.id}>
                    <line
                      x1={qx}
                      y1={qy}
                      x2={cx}
                      y2={cy}
                      stroke={isTop ? '#22D3EE' : '#334155'}
                      strokeWidth={isTop ? '2' : '1'}
                      strokeDasharray="4 3"
                    />
                    <circle cx={cx} cy={cy} r="6" fill={isTop ? '#22D3EE' : '#64748B'} />
                    <text x={cx + 8} y={cy + 3} fill="#CBD5E1" fontSize="9.5">
                      Doc {i + 1}
                    </text>
                  </g>
                );
              })}
              {/* Query Vector */}
              <circle
                cx={25 + activeQuery.vector[0] * 200}
                cy={175 - activeQuery.vector[1] * 145}
                r="7"
                fill="#A78BFA"
                stroke="#070D19"
                strokeWidth="1.5"
              />
              <text
                x={25 + activeQuery.vector[0] * 200}
                y={175 - activeQuery.vector[1] * 145 - 10}
                textAnchor="middle"
                fill="#DDD6FE"
                fontSize="10"
                fontWeight="600"
              >
                Query
              </text>
            </svg>
          </div>

          {/* Retrieved Context & Synthesized Answer */}
          <div className="lg:col-span-7 space-y-3">
            <div className="rounded-lg border border-slate-800 bg-[#091020] p-3.5">
              <div className="text-[11px] text-purple-300 font-medium">Active User Query</div>
              <div className="text-sm font-medium text-slate-100 mt-0.5">{activeQuery.query}</div>
            </div>

            <div className="space-y-2">
              {ragMatches.map((match, idx) => (
                <div
                  key={match.chunk.id}
                  className={`rounded-lg border p-3.5 ${
                    idx === 0
                      ? 'border-cyan-500/40 bg-cyan-500/8'
                      : 'border-slate-800 bg-[#091020]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-slate-100">{match.chunk.title}</span>
                    <span className="font-mono text-cyan-300 tabular-nums">
                      sim {match.similarity.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{match.chunk.content}</p>
                  <div className="text-[11px] text-slate-500 mt-1">{match.chunk.source}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
