import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { MLOPS_STEPS } from '../data/curriculum';
import { computeMlopsMetrics } from '../utils/simulations';
import { StepLessonPlayer } from '../components/StepLessonPlayer';
import { ControlSlider } from '../components/ControlSlider';
import { SimulationNotice } from '../components/SimulationNotice';

interface MlopsLabProps {
  completedSteps: number[];
  onCompleteStep: (stepIndex: number) => void;
}

const PIPELINE_STAGES = [
  { x: 65, label: 'Data Versioning', sub: 'Curated snapshots' },
  { x: 205, label: 'Auto Training', sub: 'Experiment runs' },
  { x: 345, label: 'Model Registry', sub: 'Signed artifacts' },
  { x: 485, label: 'Canary Serving', sub: 'Progressive rollout' },
  { x: 625, label: 'Drift Monitor', sub: 'Live telemetry' },
];

export function MlopsLab({ completedSteps, onCompleteStep }: MlopsLabProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [dataDrift, setDataDrift] = useState(10);
  const [canaryPct, setCanaryPct] = useState(15);
  const [modelVersion, setModelVersion] = useState(3);
  const [activeNode, setActiveNode] = useState(0);
  const [replayNonce, setReplayNonce] = useState(0);

  useEffect(() => {
    onCompleteStep(currentStep);
  }, [currentStep, onCompleteStep]);

  useEffect(() => {
    setActiveNode(0);
    const timer = window.setInterval(() => {
      setActiveNode((prev) => (prev < 4 ? prev + 1 : 0));
    }, 1050);
    return () => window.clearInterval(timer);
  }, [replayNonce, modelVersion]);

  const metrics = useMemo(
    () => computeMlopsMetrics(dataDrift, canaryPct),
    [dataDrift, canaryPct]
  );

  const handleTriggerRetrain = () => {
    setDataDrift(6);
    setModelVersion((v) => v + 1);
    setReplayNonce((n) => n + 1);
  };

  const handleReplay = () => setReplayNonce((n) => n + 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs text-cyan-300 font-medium">Module 07 · Production Lifecycle</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
            MLOps Lab
          </h1>
        </div>
        <SimulationNotice />
      </div>

      <StepLessonPlayer
        moduleTitle="MLOps Lab"
        steps={MLOPS_STEPS}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        onReplay={handleReplay}
        completedSteps={completedSteps}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Pipeline SVG + Live Status */}
        <section className="lg:col-span-8 rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-100">
                Continuous Training &amp; Deployment Pipeline
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Active Candidate: Model Build #{modelVersion} · Canary Split: {canaryPct}%
              </p>
            </div>

            {/* Dual-coded status indicator (icon + explicit label) */}
            <div
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                metrics.driftStatus === 'Nominal'
                  ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-200'
                  : metrics.driftStatus === 'Drift Warning'
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-200'
                  : 'border-rose-500/40 bg-rose-500/10 text-rose-200'
              }`}
            >
              {metrics.driftStatus === 'Nominal' ? (
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span>{metrics.driftStatus}</span>
            </div>
          </div>

          <div className="rounded-lg border border-slate-800/80 bg-[#070D19] p-4 overflow-x-auto">
            <svg
              viewBox="0 0 700 185"
              className="w-full min-w-[560px] h-auto"
              role="img"
              aria-label="Animated MLOps lifecycle pipeline diagram"
            >
              {PIPELINE_STAGES.slice(0, -1).map((stage, idx) => {
                const next = PIPELINE_STAGES[idx + 1];
                return (
                  <g key={stage.label}>
                    <line
                      x1={stage.x + 54}
                      y1="65"
                      x2={next.x - 54}
                      y2="65"
                      stroke={activeNode >= idx ? '#22D3EE' : '#1E293B'}
                      strokeWidth="2"
                    />
                    {activeNode === idx && (
                      <motion.circle
                        key={`mlops-${replayNonce}-${idx}`}
                        cx={stage.x + 54}
                        cy="65"
                        r="4"
                        fill="#22D3EE"
                        initial={{ cx: stage.x + 54 }}
                        animate={{ cx: next.x - 54 }}
                        transition={{ duration: 0.85, ease: 'easeInOut' }}
                      />
                    )}
                  </g>
                );
              })}

              {/* Retraining Loop */}
              <path
                d="M 625 102 C 625 162, 65 162, 65 102"
                fill="none"
                stroke={metrics.driftStatus === 'Retrain Triggered' ? '#F43F5E' : '#334155'}
                strokeWidth="2"
                strokeDasharray="6 4"
              />
              <text
                x="345"
                y="168"
                textAnchor="middle"
                fill={metrics.driftStatus === 'Retrain Triggered' ? '#FDA4AF' : '#94A3B8'}
                fontSize="10.5"
              >
                {metrics.driftStatus === 'Retrain Triggered'
                  ? 'Drift Threshold Exceeded -> Automated Retraining Triggered'
                  : 'Automated Retrain Loop on Drift Alert'}
              </text>

              {PIPELINE_STAGES.map((stage, idx) => {
                const active = activeNode === idx;
                return (
                  <g key={stage.label}>
                    <rect
                      x={stage.x - 54}
                      y="30"
                      width="108"
                      height="70"
                      rx="9"
                      fill={active ? '#12223E' : '#0D1628'}
                      stroke={active ? '#22D3EE' : '#1E293B'}
                      strokeWidth={active ? '2' : '1.25'}
                    />
                    <text
                      x={stage.x}
                      y="59"
                      textAnchor="middle"
                      fill={active ? '#67E8F9' : '#F1F5F9'}
                      fontSize="11"
                      fontWeight="600"
                    >
                      {stage.label}
                    </text>
                    <text x={stage.x} y="79" textAnchor="middle" fill="#94A3B8" fontSize="9.5">
                      {stage.sub}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-slate-800 bg-[#091020] p-4">
              <div className="text-xs text-slate-400">Simulated Live Accuracy</div>
              <div className="font-mono text-2xl font-bold text-slate-50 tabular-nums mt-1">
                {metrics.simulatedAccuracy}%
              </div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-[#091020] p-4">
              <div className="text-xs text-slate-400">Simulated P95 Latency</div>
              <div className="font-mono text-2xl font-bold text-slate-50 tabular-nums mt-1">
                {metrics.p95LatencyMs} ms
              </div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-[#091020] p-4">
              <div className="text-xs text-slate-400">Canary Error Rate</div>
              <div className="font-mono text-2xl font-bold text-slate-50 tabular-nums mt-1">
                {metrics.canaryErrorRate}%
              </div>
            </div>
          </div>
        </section>

        {/* Right Controls */}
        <section className="lg:col-span-4 rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 sm:p-6 flex flex-col justify-between gap-5">
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-semibold text-slate-100">
                Production Environment Controls
              </h3>
              <p className="text-xs text-slate-400">
                Simulate incoming feature drift and progressive canary rollout traffic.
              </p>
            </div>

            <ControlSlider
              label="Incoming Data Drift"
              value={dataDrift}
              min={0}
              max={60}
              step={1}
              unit="%"
              onChange={setDataDrift}
            />

            <ControlSlider
              label="Canary Traffic Split"
              value={canaryPct}
              min={5}
              max={100}
              step={5}
              unit="%"
              onChange={setCanaryPct}
            />
          </div>

          <div className="space-y-3 border-t border-slate-800/80 pt-4">
            <button
              type="button"
              onClick={handleTriggerRetrain}
              className="w-full inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition-colors"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              <span>Run Retrain &amp; Deploy Build #{modelVersion + 1}</span>
            </button>
            <p className="text-xs text-slate-400 leading-relaxed">
              Retraining refreshes the model on recent labeled samples and resets simulated distribution drift back to baseline.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
