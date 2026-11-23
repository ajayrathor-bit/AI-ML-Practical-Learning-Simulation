import { useEffect, useMemo, useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import {
  ML_STEPS,
  ML_REGRESSION_POINTS,
  ML_CLASSIFICATION_POINTS,
  ML_CLUSTER_POINTS,
} from '../data/curriculum';
import {
  assignKMeansClusters,
  computeClassificationAccuracy,
  computeRegressionMSE,
  simulateStudentOutcomePrediction,
  stepGradientDescent,
} from '../utils/simulations';
import { StepLessonPlayer } from '../components/StepLessonPlayer';
import { ControlSlider } from '../components/ControlSlider';
import { SimulationNotice } from '../components/SimulationNotice';

interface MachineLearningLabProps {
  completedSteps: number[];
  onCompleteStep: (stepIndex: number) => void;
}

type MlMode = 'regression' | 'classification' | 'clustering';

const CLUSTER_COLORS = ['#22D3EE', '#3B82F6', '#A78BFA'];

export function MachineLearningLab({
  completedSteps,
  onCompleteStep,
}: MachineLearningLabProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [mode, setMode] = useState<MlMode>('regression');

  // Regression parameters
  const [regSlope, setRegSlope] = useState(3.5);
  const [regIntercept, setRegIntercept] = useState(40);
  const [epoch, setEpoch] = useState(0);

  // Classification parameters
  const [clfSlope, setClfSlope] = useState(0.5);
  const [clfIntercept, setClfIntercept] = useState(2.8);

  // Clustering centroids
  const [centroids, setCentroids] = useState<Array<{ x: number; y: number }>>([
    { x: 4.5, y: 1.5 },
    { x: 4.0, y: 6.0 },
    { x: 6.5, y: 5.5 },
  ]);
  const [clusterStep, setClusterStep] = useState(0);

  // Prediction simulator inputs
  const [studyHours, setStudyHours] = useState(6);
  const [attendance, setAttendance] = useState(85);

  useEffect(() => {
    onCompleteStep(currentStep);
    if (currentStep === 0 || currentStep === 1) setMode('regression');
    else if (currentStep === 2) setMode('classification');
    else if (currentStep === 3) setMode('clustering');
  }, [currentStep, onCompleteStep]);

  const mse = useMemo(
    () => computeRegressionMSE(ML_REGRESSION_POINTS, regSlope, regIntercept),
    [regSlope, regIntercept]
  );

  const clfStats = useMemo(
    () => computeClassificationAccuracy(ML_CLASSIFICATION_POINTS, clfSlope, clfIntercept),
    [clfSlope, clfIntercept]
  );

  const clusterResult = useMemo(
    () => assignKMeansClusters(ML_CLUSTER_POINTS, centroids),
    [centroids]
  );

  const prediction = useMemo(
    () => simulateStudentOutcomePrediction(studyHours, attendance),
    [studyHours, attendance]
  );

  const handleGradientStep = () => {
    const next = stepGradientDescent(ML_REGRESSION_POINTS, regSlope, regIntercept, 0.025);
    setRegSlope(next.slope);
    setRegIntercept(next.intercept);
    setEpoch((e) => e + 1);
  };

  const handleAutoFit = () => {
    let s = regSlope;
    let b = regIntercept;
    for (let i = 0; i < 20; i++) {
      const next = stepGradientDescent(ML_REGRESSION_POINTS, s, b, 0.025);
      s = next.slope;
      b = next.intercept;
    }
    setRegSlope(s);
    setRegIntercept(b);
    setEpoch((e) => e + 20);
  };

  const handleClusterStep = () => {
    setCentroids(clusterResult.nextCentroids);
    setClusterStep((c) => c + 1);
  };

  const handleReplay = () => {
    setRegSlope(3.5);
    setRegIntercept(40);
    setEpoch(0);
    setClfSlope(0.5);
    setClfIntercept(2.8);
    setCentroids([
      { x: 4.5, y: 1.5 },
      { x: 4.0, y: 6.0 },
      { x: 6.5, y: 5.5 },
    ]);
    setClusterStep(0);
  };

  // Coordinate helpers for SVG (viewBox 0 0 600 340)
  const mapX = (x: number) => 55 + (x / 10) * 510;
  const mapYReg = (y: number) => 295 - (y / 100) * 255;
  const mapYUnit = (y: number) => 295 - (y / 10) * 255;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs text-blue-300 font-medium">Module 02 · Classical ML</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
            Machine Learning Lab
          </h1>
        </div>
        <SimulationNotice />
      </div>

      <StepLessonPlayer
        moduleTitle="Machine Learning Lab"
        steps={ML_STEPS}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        onReplay={handleReplay}
        completedSteps={completedSteps}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Interactive Scatter & Model Training Stage */}
        <section className="lg:col-span-8 rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-100">
                Interactive Model Training Visualization
              </h3>
              <p className="text-xs text-slate-400">
                {mode === 'regression'
                  ? `Linear Regression · Epoch ${epoch} · Mean Squared Error: ${mse}`
                  : mode === 'classification'
                  ? `Binary Classification · Accuracy: ${clfStats.accuracy}% (${clfStats.correct}/${clfStats.total})`
                  : `K-Means Clustering · Step ${clusterStep} · Inertia: ${clusterResult.inertia}`}
              </p>
            </div>

            <div className="inline-flex rounded-lg border border-slate-800 bg-[#070D19] p-1">
              {(
                [
                  { id: 'regression', label: 'Regression' },
                  { id: 'classification', label: 'Classification' },
                  { id: 'clustering', label: 'Unsupervised' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMode(tab.id)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                    mode === tab.id
                      ? 'bg-blue-500 text-slate-950 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800/80 bg-[#070D19] p-3">
            <svg
              viewBox="0 0 600 340"
              className="w-full h-auto"
              role="img"
              aria-label={`Interactive ${mode} coordinate plot`}
            >
              {/* Grid lines */}
              {[0, 2, 4, 6, 8, 10].map((tick) => (
                <g key={tick}>
                  <line
                    x1={mapX(tick)}
                    y1="40"
                    x2={mapX(tick)}
                    y2="295"
                    stroke="#1E293B"
                    strokeWidth="1"
                    strokeDasharray="3 4"
                  />
                  <text
                    x={mapX(tick)}
                    y="315"
                    textAnchor="middle"
                    fill="#64748B"
                    fontSize="10"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {tick}
                  </text>
                </g>
              ))}

              {/* Axes */}
              <line x1="55" y1="40" x2="55" y2="295" stroke="#475569" strokeWidth="1.5" />
              <line x1="55" y1="295" x2="565" y2="295" stroke="#475569" strokeWidth="1.5" />

              {mode === 'regression' && (
                <>
                  {/* Residual error bars */}
                  {ML_REGRESSION_POINTS.map((p) => {
                    const predY = regSlope * p.x + regIntercept;
                    const cx = mapX(p.x);
                    const cy = mapYReg(p.y);
                    const py = mapYReg(Math.max(0, Math.min(100, predY)));
                    return (
                      <g key={p.id}>
                        <line
                          x1={cx}
                          y1={cy}
                          x2={cx}
                          y2={py}
                          stroke="#8B5CF6"
                          strokeWidth="1.5"
                          strokeOpacity="0.6"
                          strokeDasharray="3 2"
                        />
                        <circle cx={cx} cy={cy} r="5.5" fill="#22D3EE" />
                      </g>
                    );
                  })}
                  {/* Regression Line */}
                  <line
                    x1={mapX(0)}
                    y1={mapYReg(Math.max(0, Math.min(105, regIntercept)))}
                    x2={mapX(10)}
                    y2={mapYReg(Math.max(0, Math.min(105, regSlope * 10 + regIntercept)))}
                    stroke="#3B82F6"
                    strokeWidth="3"
                  />
                </>
              )}

              {mode === 'classification' && (
                <>
                  <line
                    x1={mapX(0)}
                    y1={mapYUnit(Math.max(0, Math.min(10, clfIntercept)))}
                    x2={mapX(10)}
                    y2={mapYUnit(Math.max(0, Math.min(10, clfSlope * 10 + clfIntercept)))}
                    stroke="#22D3EE"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />
                  {ML_CLASSIFICATION_POINTS.map((p) => (
                    <circle
                      key={p.id}
                      cx={mapX(p.x)}
                      cy={mapYUnit(p.y)}
                      r="6"
                      fill={p.label === 1 ? '#22D3EE' : '#A78BFA'}
                      stroke="#070D19"
                      strokeWidth="1.5"
                    />
                  ))}
                </>
              )}

              {mode === 'clustering' && (
                <>
                  {ML_CLUSTER_POINTS.map((p, idx) => {
                    const clusterIdx = clusterResult.assignments[idx] ?? 0;
                    const centroid = centroids[clusterIdx];
                    return (
                      <g key={p.id}>
                        <line
                          x1={mapX(p.x)}
                          y1={mapYUnit(p.y)}
                          x2={mapX(centroid.x)}
                          y2={mapYUnit(centroid.y)}
                          stroke={CLUSTER_COLORS[clusterIdx]}
                          strokeWidth="1.2"
                          strokeOpacity="0.4"
                        />
                        <circle
                          cx={mapX(p.x)}
                          cy={mapYUnit(p.y)}
                          r="5.5"
                          fill={CLUSTER_COLORS[clusterIdx]}
                        />
                      </g>
                    );
                  })}
                  {centroids.map((c, idx) => (
                    <g key={idx}>
                      <circle
                        cx={mapX(c.x)}
                        cy={mapYUnit(c.y)}
                        r="10"
                        fill="#070D19"
                        stroke={CLUSTER_COLORS[idx]}
                        strokeWidth="2.5"
                      />
                      <text
                        x={mapX(c.x)}
                        y={mapYUnit(c.y) + 3.5}
                        textAnchor="middle"
                        fill={CLUSTER_COLORS[idx]}
                        fontSize="10"
                        fontWeight="700"
                      >
                        C{idx + 1}
                      </text>
                    </g>
                  ))}
                </>
              )}

              <text x="310" y="334" textAnchor="middle" fill="#94A3B8" fontSize="11">
                {mode === 'regression'
                  ? 'Study Hours (Feature X)'
                  : mode === 'classification'
                  ? 'Engagement Score (Feature X1)'
                  : 'Feature Dimension X1'}
              </text>
            </svg>
          </div>
        </section>

        {/* Right Controls + Prediction Simulator */}
        <section className="lg:col-span-4 space-y-6">
          <div className="rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 space-y-4">
            <h3 className="text-base font-semibold text-slate-100">
              {mode === 'regression'
                ? 'Model Parameters & Training'
                : mode === 'classification'
                ? 'Decision Boundary Controls'
                : 'K-Means Clustering Controls'}
            </h3>

            {mode === 'regression' && (
              <div className="space-y-4">
                <ControlSlider
                  label="Slope (Weight w)"
                  value={regSlope}
                  min={0}
                  max={12}
                  step={0.1}
                  onChange={setRegSlope}
                />
                <ControlSlider
                  label="Intercept (Bias b)"
                  value={regIntercept}
                  min={0}
                  max={60}
                  step={1}
                  onChange={setRegIntercept}
                />
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleGradientStep}
                    className="flex-1 min-h-10 rounded-lg border border-blue-500/40 bg-blue-500/15 px-3 py-2 text-xs font-medium text-blue-200 hover:bg-blue-500/25 transition-colors whitespace-nowrap"
                  >
                    Step Gradient Descent
                  </button>
                  <button
                    type="button"
                    onClick={handleAutoFit}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-cyan-500 px-3.5 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition-colors whitespace-nowrap"
                  >
                    <Play className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Train 20 Epochs</span>
                  </button>
                </div>
              </div>
            )}

            {mode === 'classification' && (
              <div className="space-y-4">
                <ControlSlider
                  label="Boundary Slope"
                  value={clfSlope}
                  min={-1}
                  max={2}
                  step={0.05}
                  onChange={setClfSlope}
                />
                <ControlSlider
                  label="Boundary Offset"
                  value={clfIntercept}
                  min={0}
                  max={8}
                  step={0.1}
                  onChange={setClfIntercept}
                />
                <div className="rounded-lg border border-slate-800 bg-[#091020] p-3 text-xs text-slate-300 flex items-center justify-between">
                  <span>Simulated Accuracy</span>
                  <span className="font-mono font-semibold text-cyan-300 tabular-nums">
                    {clfStats.accuracy}%
                  </span>
                </div>
              </div>
            )}

            {mode === 'clustering' && (
              <div className="space-y-4">
                <p className="text-xs leading-relaxed text-slate-400">
                  Each iteration assigns points to their nearest centroid (C1–C3), then moves each centroid to the cluster mean.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleClusterStep}
                    className="flex-1 min-h-10 rounded-lg bg-cyan-500 px-3.5 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition-colors"
                  >
                    Run Cluster Step
                  </button>
                  <button
                    type="button"
                    onClick={handleReplay}
                    aria-label="Reset centroids"
                    className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-700 bg-[#121E36] px-3 text-slate-200 hover:bg-slate-800"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Prediction Simulator */}
          <div className="rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 space-y-4">
            <div>
              <h3 className="text-base font-semibold text-slate-100">Prediction Simulator</h3>
              <p className="text-xs text-slate-400">
                Test how a trained model predicts outcomes on unseen student inputs.
              </p>
            </div>

            <ControlSlider
              label="Weekly Study Hours"
              value={studyHours}
              min={1}
              max={12}
              step={1}
              unit=" hrs"
              onChange={setStudyHours}
            />
            <ControlSlider
              label="Session Attendance"
              value={attendance}
              min={50}
              max={100}
              step={1}
              unit="%"
              onChange={setAttendance}
            />

            <div className="rounded-lg border border-slate-800 bg-[#091020] p-4 grid grid-cols-2 gap-3">
              <div>
                <div className="text-[11px] text-slate-400">Simulated Score</div>
                <div className="font-mono text-xl font-bold text-slate-50 tabular-nums">
                  {prediction.predictedScore}/100
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400">Predicted Class</div>
                <div
                  className={`text-sm font-semibold mt-1 ${
                    prediction.classification === 'Likely Pass'
                      ? 'text-cyan-300'
                      : 'text-amber-300'
                  }`}
                >
                  {prediction.classification}
                </div>
                <div className="font-mono text-[11px] text-slate-500 tabular-nums">
                  {prediction.passProbability}% confidence
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
