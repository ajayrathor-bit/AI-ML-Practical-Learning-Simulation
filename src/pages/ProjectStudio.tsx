import { useEffect, useMemo, useState } from 'react';
import {
  Users,
  MessageSquareText,
  FileSearch,
  ScanEye,
  BarChart3,
  Lightbulb,
} from 'lucide-react';
import { STUDIO_PROJECTS, RAG_DOCUMENT_CHUNKS } from '../data/curriculum';
import { analyzeNlpText, computeChurnRisk } from '../utils/simulations';
import { ControlSlider } from '../components/ControlSlider';
import { SimulationNotice } from '../components/SimulationNotice';

type ProjectId = 'churn' | 'sentiment' | 'doc-assistant' | 'vision' | 'business-assistant';

interface ProjectStudioProps {
  initialProject?: ProjectId;
  completedSteps: number[];
  onCompleteStep: (stepIndex: number) => void;
}

const VISION_DETECTIONS = [
  { id: 'd1', label: 'PCB Capacitor OK', x: 65, y: 75, w: 120, h: 90, conf: 0.94, defect: false },
  { id: 'd2', label: 'Solder Joint Defect', x: 240, y: 95, w: 115, h: 85, conf: 0.82, defect: true },
  { id: 'd3', label: 'Connector Pin OK', x: 405, y: 65, w: 110, h: 105, conf: 0.68, defect: false },
  { id: 'd4', label: 'Micro-Scratch Alert', x: 280, y: 205, w: 130, h: 55, conf: 0.48, defect: true },
];

const BI_SCENARIOS = [
  {
    id: 'q1',
    question: 'Which customer cohort showed the highest Q3 retention?',
    sql: 'SELECT cohort_name, ROUND(AVG(retention_pct), 1) FROM cohort_metrics GROUP BY 1 ORDER BY 2 DESC LIMIT 3;',
    answer:
      'Annual Workshop Subscribers achieved 91.4% retention in Q3, outperforming monthly trial cohorts (68.2%) by +23.2 percentage points.',
    metrics: [
      { label: 'Annual Cohort', val: '91.4%' },
      { label: 'Team Plan Cohort', val: '84.7%' },
      { label: 'Monthly Trial', val: '68.2%' },
    ],
  },
  {
    id: 'q2',
    question: 'How did support ticket volume affect renewal conversion?',
    sql: 'SELECT ticket_bucket, COUNT(*) AS accounts, ROUND(AVG(renewed)*100, 1) AS renew_pct FROM accounts GROUP BY 1;',
    answer:
      'Accounts with 0–1 support tickets renewed at 88.5%, whereas accounts logging 4+ unresolved tickets dropped to 54.0% renewal.',
    metrics: [
      { label: '0–1 Tickets', val: '88.5%' },
      { label: '2–3 Tickets', val: '74.1%' },
      { label: '4+ Tickets', val: '54.0%' },
    ],
  },
];

const PROJECT_ICONS: Record<ProjectId, typeof Users> = {
  churn: Users,
  sentiment: MessageSquareText,
  'doc-assistant': FileSearch,
  vision: ScanEye,
  'business-assistant': BarChart3,
};

export function ProjectStudio({
  initialProject = 'churn',
  onCompleteStep,
}: ProjectStudioProps) {
  const [activeId, setActiveId] = useState<ProjectId>(initialProject);

  // 1. Churn state
  const [tenure, setTenure] = useState(8);
  const [monthlySpend, setMonthlySpend] = useState(95);
  const [tickets, setTickets] = useState(3);

  // 2. Sentiment state
  const [feedbackText, setFeedbackText] = useState(
    'The interactive labs are clear and intuitive, though loading large datasets felt slightly slow.'
  );

  // 3. Document assistant state
  const [selectedDocIdx, setSelectedDocIdx] = useState(0);

  // 4. Computer vision threshold
  const [confThreshold, setConfThreshold] = useState(0.65);

  // 5. Business assistant state
  const [biScenarioId, setBiScenarioId] = useState('q1');

  useEffect(() => {
    setActiveId(initialProject);
  }, [initialProject]);

  useEffect(() => {
    const idx = STUDIO_PROJECTS.findIndex((p) => p.id === activeId);
    if (idx >= 0) onCompleteStep(idx);
  }, [activeId, onCompleteStep]);

  const activeMeta =
    STUDIO_PROJECTS.find((p) => p.id === activeId) ?? STUDIO_PROJECTS[0];

  const churn = useMemo(
    () => computeChurnRisk(tenure, monthlySpend, tickets),
    [tenure, monthlySpend, tickets]
  );

  const sentiment = useMemo(() => analyzeNlpText(feedbackText), [feedbackText]);

  const visibleDetections = useMemo(
    () => VISION_DETECTIONS.filter((d) => d.conf >= confThreshold),
    [confThreshold]
  );

  const activeBi =
    BI_SCENARIOS.find((b) => b.id === biScenarioId) ?? BI_SCENARIOS[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs text-blue-300 font-medium">Module 08 · Applied Use Cases</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
            Project Studio
          </h1>
        </div>
        <SimulationNotice label="Interactive Showcase Prototypes · Sample Business Data" />
      </div>

      {/* Project Selector Tabs */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
        role="tablist"
        aria-label="Project Studio demonstrations"
      >
        {STUDIO_PROJECTS.map((proj) => {
          const Icon = PROJECT_ICONS[proj.id];
          const active = proj.id === activeId;
          return (
            <button
              key={proj.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveId(proj.id)}
              className={`rounded-xl border p-3.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                active
                  ? 'border-cyan-500/60 bg-cyan-500/12 text-slate-50'
                  : 'border-slate-800/90 bg-[#0D1628] text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 text-xs text-cyan-300 font-medium">
                <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{proj.domain}</span>
              </div>
              <div className="mt-1 text-sm font-semibold truncate">{proj.title}</div>
            </button>
          );
        })}
      </div>

      {/* Active Project Workspace */}
      <section className="rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 sm:p-6 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="space-y-1">
            <div className="text-xs text-slate-400">{activeMeta.domain}</div>
            <h2 className="text-xl font-bold text-slate-50">{activeMeta.title}</h2>
            <p className="text-sm text-slate-300 max-w-3xl">{activeMeta.summary}</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-[#091020] px-3.5 py-2.5 max-w-sm">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-purple-300">
              <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
              <span>What This Demonstrates</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">{activeMeta.demonstrates}</p>
          </div>
        </div>

        {/* 1. Customer Churn Prediction */}
        {activeId === 'churn' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-6 space-y-4">
              <ControlSlider
                label="Customer Tenure"
                value={tenure}
                min={1}
                max={48}
                step={1}
                unit=" mos"
                onChange={setTenure}
              />
              <ControlSlider
                label="Monthly Plan Spend"
                value={monthlySpend}
                min={25}
                max={180}
                step={5}
                formatValue={(v) => `$${v}`}
                onChange={setMonthlySpend}
              />
              <ControlSlider
                label="Recent Support Tickets"
                value={tickets}
                min={0}
                max={8}
                step={1}
                onChange={setTickets}
              />
            </div>

            <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-[#070D19] p-5 flex flex-col justify-between gap-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-slate-400">Simulated Churn Probability</div>
                  <div className="font-mono text-3xl font-bold text-slate-50 tabular-nums mt-1">
                    {churn.riskScore}%
                  </div>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    churn.riskLevel === 'High Risk'
                      ? 'text-rose-300'
                      : churn.riskLevel === 'Moderate Risk'
                      ? 'text-amber-300'
                      : 'text-cyan-300'
                  }`}
                >
                  {churn.riskLevel}
                </span>
              </div>

              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    churn.riskLevel === 'High Risk'
                      ? 'bg-rose-400'
                      : churn.riskLevel === 'Moderate Risk'
                      ? 'bg-amber-400'
                      : 'bg-cyan-400'
                  }`}
                  style={{ width: `${churn.riskScore}%` }}
                />
              </div>

              <div className="space-y-1.5 border-t border-slate-800 pt-3">
                <div className="text-xs font-medium text-slate-300">Primary Simulated Drivers</div>
                <ul className="space-y-1 text-xs text-slate-400">
                  {churn.drivers.map((d) => (
                    <li key={d}>• {d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 2. Sentiment Analysis */}
        {activeId === 'sentiment' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 space-y-3">
              <label htmlFor="studio-sentiment" className="text-sm font-medium text-slate-200 block">
                Customer Review Input
              </label>
              <textarea
                id="studio-sentiment"
                rows={3}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-[#070D19] p-3 text-sm text-slate-100 focus:border-cyan-400 focus:outline-none"
              />
              <div className="flex flex-wrap gap-2">
                {sentiment.tokens.map((t, idx) => (
                  <span
                    key={`${t.normalized}-${idx}`}
                    className={`rounded-md border px-2.5 py-1 font-mono text-xs ${
                      t.sentiment === 'positive'
                        ? 'border-cyan-500/50 bg-cyan-500/12 text-cyan-200'
                        : t.sentiment === 'negative'
                        ? 'border-rose-500/50 bg-rose-500/12 text-rose-200'
                        : 'border-slate-800 bg-[#091020] text-slate-400'
                    }`}
                  >
                    {t.raw}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-[#070D19] p-5 space-y-4">
              <div className="text-xs text-slate-400">Overall Sentiment</div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-slate-50">{sentiment.label}</span>
                <span className="font-mono text-lg text-cyan-300 tabular-nums">
                  {sentiment.score > 0 ? `+${sentiment.score}` : sentiment.score}
                </span>
              </div>
              <div className="text-xs text-slate-400">
                Positive signals: {sentiment.positiveCount} · Negative signals:{' '}
                {sentiment.negativeCount}
              </div>
            </div>
          </div>
        )}

        {/* 3. AI Document Assistant */}
        {activeId === 'doc-assistant' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-2">
              <div className="text-xs font-medium text-slate-300">
                Select a Sample Question to Query Knowledge Base
              </div>
              {RAG_DOCUMENT_CHUNKS.map((chunk, idx) => (
                <button
                  key={chunk.id}
                  type="button"
                  onClick={() => setSelectedDocIdx(idx)}
                  className={`w-full rounded-lg border p-3.5 text-left transition-colors ${
                    selectedDocIdx === idx
                      ? 'border-cyan-500/50 bg-cyan-500/10 text-slate-100'
                      : 'border-slate-800 bg-[#070D19] text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-semibold text-cyan-300">{chunk.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{chunk.source}</div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-[#070D19] p-5 space-y-4">
              <div>
                <div className="text-xs text-purple-300 font-medium">Retrieved Source Excerpt</div>
                <p className="mt-1 rounded-lg border border-slate-800 bg-[#0D1628] p-3 text-xs leading-relaxed text-slate-300">
                  &ldquo;{RAG_DOCUMENT_CHUNKS[selectedDocIdx].content}&rdquo;
                </p>
              </div>
              <div>
                <div className="text-xs text-cyan-300 font-medium">Grounded Assistant Answer</div>
                <p className="mt-1 text-sm leading-relaxed text-slate-100">
                  Based on {RAG_DOCUMENT_CHUNKS[selectedDocIdx].source}:{' '}
                  {RAG_DOCUMENT_CHUNKS[selectedDocIdx].content}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. Computer Vision */}
        {activeId === 'vision' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-8 rounded-xl border border-slate-800 bg-[#070D19] p-4">
              <svg
                viewBox="0 0 580 290"
                className="w-full h-auto"
                role="img"
                aria-label="Simulated circuit board inspection frame with adjustable bounding box confidence threshold"
              >
                {/* Circuit board schematic background */}
                <rect x="20" y="20" width="540" height="250" rx="8" fill="#0B1424" stroke="#1E293B" />
                <path
                  d="M 40 140 L 180 140 L 210 110 L 390 110 M 110 50 L 110 230 M 440 45 L 440 240"
                  stroke="#1E293B"
                  strokeWidth="3"
                  fill="none"
                />
                <rect x="85" y="95" width="80" height="50" rx="4" fill="#162238" />
                <rect x="255" y="115" width="85" height="45" rx="4" fill="#162238" />
                <rect x="420" y="85" width="75" height="65" rx="4" fill="#162238" />

                {/* Filtered Bounding Boxes */}
                {visibleDetections.map((det) => {
                  const textLabel = `${det.label} (${Math.round(det.conf * 100)}%)`;
                  const pillWidth = Math.max(det.w + 18, textLabel.length * 6.4 + 14);
                  return (
                    <g key={det.id}>
                      <rect
                        x={det.x}
                        y={det.y}
                        width={det.w}
                        height={det.h}
                        fill="none"
                        stroke={det.defect ? '#F43F5E' : '#22D3EE'}
                        strokeWidth="2"
                        strokeDasharray={det.defect ? 'none' : '5 3'}
                      />
                      <rect
                        x={det.x}
                        y={det.y - 20}
                        width={pillWidth}
                        height="20"
                        fill={det.defect ? '#F43F5E' : '#22D3EE'}
                        rx="3"
                      />
                      <text
                        x={det.x + 6}
                        y={det.y - 6}
                        fill="#070D19"
                        fontSize="10"
                        fontWeight="700"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {textLabel}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="lg:col-span-4 space-y-5">
              <ControlSlider
                label="Confidence Threshold"
                value={confThreshold}
                min={0.35}
                max={0.95}
                step={0.05}
                formatValue={(v) => `${Math.round(v * 100)}%`}
                onChange={setConfThreshold}
              />

              <div className="rounded-lg border border-slate-800 bg-[#070D19] p-4 space-y-2">
                <div className="text-xs font-medium text-slate-300">
                  Visible Detections ({visibleDetections.length} of {VISION_DETECTIONS.length})
                </div>
                {visibleDetections.length === 0 ? (
                  <p className="text-xs text-slate-500">
                    No detections pass the current confidence threshold. Lower the slider to inspect candidates.
                  </p>
                ) : (
                  <ul className="space-y-1.5 text-xs">
                    {visibleDetections.map((d) => (
                      <li key={d.id} className="flex justify-between font-mono">
                        <span className={d.defect ? 'text-rose-300' : 'text-cyan-300'}>
                          {d.label}
                        </span>
                        <span className="text-slate-400 tabular-nums">
                          {Math.round(d.conf * 100)}%
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 5. AI Business Assistant */}
        {activeId === 'business-assistant' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {BI_SCENARIOS.map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setBiScenarioId(sc.id)}
                  className={`rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors ${
                    biScenarioId === sc.id
                      ? 'border-cyan-500/60 bg-cyan-500/15 text-cyan-200'
                      : 'border-slate-700 bg-[#121E36] text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {sc.question}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-6 rounded-lg border border-slate-800 bg-[#070D19] p-4 space-y-2">
                <div className="text-xs font-medium text-blue-300">
                  Step 1 · Generated Structured Query
                </div>
                <pre className="whitespace-pre-wrap font-mono text-xs text-slate-200 leading-relaxed">
                  {activeBi.sql}
                </pre>
              </div>

              <div className="lg:col-span-6 rounded-lg border border-slate-800 bg-[#070D19] p-4 space-y-3">
                <div className="text-xs font-medium text-cyan-300">
                  Step 2 · Executive Summary
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">{activeBi.answer}</p>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {activeBi.metrics.map((m) => (
                    <div key={m.label} className="rounded-md border border-slate-800 bg-[#0D1628] p-2.5">
                      <div className="text-[11px] text-slate-400">{m.label}</div>
                      <div className="font-mono text-sm font-bold text-cyan-300 tabular-nums">
                        {m.val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
