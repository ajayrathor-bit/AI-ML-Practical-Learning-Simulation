import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  Play,
  Pause,
  RotateCcw,
  RefreshCw,
  Minus,
  Plus,
  BookOpen,
  TrendingDown,
  FileDown,
  CheckCircle2,
} from 'lucide-react';
import {
  buildTrainingLossHistory,
  computeDynamicNeuralNetwork,
  computeTrainingLossPoint,
  formatConnectionWeight,
  getActivationConvergenceNote,
  getBiasSliderTooltip,
  getEdgeLegendInfo,
  getInputFeatureTooltip,
  getLayerCapacityTooltip,
  getLossFunctionGuide,
  getNodeLegendInfo,
  layoutStageEdgeLabels,
  type ActivationFn,
  type HoverLegendInfo,
  type LossFn,
  type TrainingLossPoint,
} from '../utils/simulations';
import {
  NEURAL_CONCEPT_GUIDES,
  NEURAL_STAGE_EXPLANATIONS,
} from '../data/curriculum';
import {
  buildNeuralExperimentReport,
  downloadNeuralExperimentPdf,
} from '../utils/neuralReport';
import { ControlSlider } from './ControlSlider';
import { HoverTooltip } from './HoverTooltip';

interface NeuralNetworkSimulatorProps {
  externalReplayNonce?: number;
}

type LayerKey = 'input' | 'hidden1' | 'hidden2' | 'output';
type SimStatus = 'idle' | 'running' | 'paused' | 'complete';

const MAX_TRAINING_EPOCHS = 12;
const DEFAULT_INPUTS = [0.85, 0.55, 0.35, 0.65, 0.45, 0.75];
const OUTPUT_LABELS = ['Class A', 'Class B', 'Class C', 'Class D'];

function getColumnPositions(
  x: number,
  count: number,
  topY = 74,
  bottomY = 330
): Array<{ x: number; y: number }> {
  if (count === 1) {
    return [{ x, y: (topY + bottomY) / 2 }];
  }
  const span = bottomY - topY;
  const step = span / (count - 1);
  return Array.from({ length: count }, (_, idx) => ({
    x,
    y: Math.round(topY + idx * step),
  }));
}

export function NeuralNetworkSimulator({
  externalReplayNonce = 0,
}: NeuralNetworkSimulatorProps) {
  const [inputCount, setInputCount] = useState(3);
  const [hidden1Count, setHidden1Count] = useState(4);
  const [hidden2Count, setHidden2Count] = useState(4);
  const [outputCount, setOutputCount] = useState(2);

  const [inputValues, setInputValues] = useState<number[]>(DEFAULT_INPUTS);
  const [bias, setBias] = useState(0.1);
  const [activationFn, setActivationFn] = useState<ActivationFn>('relu');
  const [lossFn, setLossFn] = useState<LossFn>('bce');
  const [speed, setSpeed] = useState<0.5 | 1 | 2>(1);

  const [simStatus, setSimStatus] = useState<SimStatus>('idle');
  const [activeStage, setActiveStage] = useState<0 | 1 | 2 | 3>(0);
  const [trainingEpoch, setTrainingEpoch] = useState(0);
  const [lossHistory, setLossHistory] = useState<TrainingLossPoint[]>(() => [
    computeTrainingLossPoint(0, 'relu', 13, 'bce'),
  ]);
  const [pulseNonce, setPulseNonce] = useState(0);
  const [showComparisonCurve, setShowComparisonCurve] = useState(true);
  const [lastExportInfo, setLastExportInfo] = useState<{
    filename: string;
    timestamp: string;
  } | null>(null);

  const [selectedNode, setSelectedNode] = useState<{
    layer: LayerKey;
    index: number;
  }>({ layer: 'hidden1', index: 0 });

  const svgWrapperRef = useRef<HTMLDivElement | null>(null);
  const [hoverLegend, setHoverLegend] = useState<{
    info: HoverLegendInfo;
    x: number;
    y: number;
    targetKey: string;
  } | null>(null);

  const totalNeurons = inputCount + hidden1Count + hidden2Count + outputCount;

  // Keep loss history synced with active architecture, activation, & loss function at current epoch
  useEffect(() => {
    setLossHistory(buildTrainingLossHistory(trainingEpoch, activationFn, totalNeurons, lossFn));
    setLastExportInfo(null);
  }, [activationFn, totalNeurons, lossFn]);

  // Trigger replay when parent lesson player requests Replay Simulation
  useEffect(() => {
    if (externalReplayNonce > 0) {
      setActiveStage(0);
      setTrainingEpoch(0);
      setLossHistory([computeTrainingLossPoint(0, activationFn, totalNeurons, lossFn)]);
      setSimStatus('running');
      setLastExportInfo(null);
      setPulseNonce((n) => n + 1);
    }
  }, [externalReplayNonce]);

  // Real-time training loop: sweeps layer pulses while advancing epochs and updating weights + loss chart
  useEffect(() => {
    if (simStatus !== 'running') return;

    const tickDurationMs = Math.round(700 / speed);
    const timer = window.setTimeout(() => {
      const nextEpoch = Math.min(MAX_TRAINING_EPOCHS, trainingEpoch + 1);
      const nextStage = ((activeStage + 1) % 4) as 0 | 1 | 2 | 3;

      setActiveStage(nextStage);
      setPulseNonce((n) => n + 1);

      if (trainingEpoch < MAX_TRAINING_EPOCHS) {
        setTrainingEpoch(nextEpoch);
        setLossHistory((prev) => {
          if (prev.some((p) => p.epoch === nextEpoch)) return prev;
          return [
            ...prev,
            computeTrainingLossPoint(nextEpoch, activationFn, totalNeurons, lossFn),
          ];
        });
      }

      if (nextEpoch >= MAX_TRAINING_EPOCHS && nextStage === 3) {
        setSimStatus('complete');
      }
    }, tickDurationMs);

    return () => window.clearTimeout(timer);
  }, [simStatus, activeStage, trainingEpoch, speed, activationFn, totalNeurons, lossFn]);

  const activeInputs = useMemo(
    () => inputValues.slice(0, inputCount),
    [inputValues, inputCount]
  );

  const network = useMemo(
    () =>
      computeDynamicNeuralNetwork({
        inputValues: activeInputs,
        hidden1Size: hidden1Count,
        hidden2Size: hidden2Count,
        outputSize: outputCount,
        hiddenBias: bias,
        activationFn,
        trainingEpoch,
      }),
    [
      activeInputs,
      hidden1Count,
      hidden2Count,
      outputCount,
      bias,
      activationFn,
      trainingEpoch,
    ]
  );

  const inputPos = useMemo(() => getColumnPositions(115, inputCount), [inputCount]);
  const hidden1Pos = useMemo(() => getColumnPositions(305, hidden1Count), [hidden1Count]);
  const hidden2Pos = useMemo(() => getColumnPositions(495, hidden2Count), [hidden2Count]);
  const outputPos = useMemo(() => getColumnPositions(685, outputCount, 100, 304), [outputCount]);

  // Keep selectedNode index within bounds when layer sizes shrink
  useEffect(() => {
    setSelectedNode((prev) => {
      const limit =
        prev.layer === 'input'
          ? inputCount
          : prev.layer === 'hidden1'
          ? hidden1Count
          : prev.layer === 'hidden2'
          ? hidden2Count
          : outputCount;
      if (prev.index >= limit) {
        return { layer: prev.layer, index: Math.max(0, limit - 1) };
      }
      return prev;
    });
  }, [inputCount, hidden1Count, hidden2Count, outputCount]);

  const handleStartOrPause = () => {
    if (simStatus === 'running') {
      setSimStatus('paused');
      return;
    }
    if (simStatus === 'complete' || simStatus === 'idle') {
      setActiveStage(0);
      setTrainingEpoch(0);
      setLossHistory([computeTrainingLossPoint(0, activationFn, totalNeurons, lossFn)]);
      setLastExportInfo(null);
    }
    setPulseNonce((n) => n + 1);
    setSimStatus('running');
  };

  const handleReplay = () => {
    setActiveStage(0);
    setTrainingEpoch(0);
    setLossHistory([computeTrainingLossPoint(0, activationFn, totalNeurons, lossFn)]);
    setLastExportInfo(null);
    setPulseNonce((n) => n + 1);
    setSimStatus('running');
  };

  const handleReset = () => {
    setInputCount(3);
    setHidden1Count(4);
    setHidden2Count(4);
    setOutputCount(2);
    setInputValues(DEFAULT_INPUTS);
    setBias(0.1);
    setActivationFn('relu');
    setLossFn('bce');
    setSpeed(1);
    setActiveStage(0);
    setTrainingEpoch(0);
    setLossHistory([computeTrainingLossPoint(0, 'relu', 13, 'bce')]);
    setSimStatus('idle');
    setLastExportInfo(null);
    setSelectedNode({ layer: 'hidden1', index: 0 });
    setPulseNonce((n) => n + 1);
  };

  const handleInputSliderChange = (idx: number, val: number) => {
    setLastExportInfo(null);
    setInputValues((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  };

  const handleActivationChange = (nextFn: ActivationFn) => {
    setActivationFn(nextFn);
    setLastExportInfo(null);
    setLossHistory(buildTrainingLossHistory(trainingEpoch, nextFn, totalNeurons, lossFn));
  };

  const handleLossFnChange = (nextLoss: LossFn) => {
    setLossFn(nextLoss);
    setLastExportInfo(null);
    setLossHistory(
      buildTrainingLossHistory(trainingEpoch, activationFn, totalNeurons, nextLoss)
    );
  };

  const handleHoverShow = (
    e: MouseEvent<SVGGElement | SVGLineElement>,
    targetKey: string,
    info: HoverLegendInfo
  ) => {
    const container = svgWrapperRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    const tooltipW = 280;
    const tooltipH = 175;
    const x =
      rawX + 16 + tooltipW <= rect.width
        ? rawX + 16
        : Math.max(10, rawX - tooltipW - 14);
    const y =
      rawY + 14 + tooltipH <= rect.height
        ? rawY + 14
        : Math.max(10, rawY - tooltipH - 10);

    setHoverLegend({ info, x, y, targetKey });
  };

  const totalConnections =
    inputCount * hidden1Count +
    hidden1Count * hidden2Count +
    hidden2Count * outputCount;
  const pulseDurationSec = Number((0.65 / speed).toFixed(2));
  const stageInfo = NEURAL_STAGE_EXPLANATIONS[activeStage];
  const convergenceNote = getActivationConvergenceNote(activationFn);
  const bceGuide = getLossFunctionGuide('bce');
  const mseGuide = getLossFunctionGuide('mse');
  const activeLossGuide = lossFn === 'bce' ? bceGuide : mseGuide;
  const activeLossLabel = activeLossGuide.shortLabel;
  const activeFnLabel = activationFn === 'relu' ? 'ReLU' : 'Sigmoid';
  const alternateFnLabel = activationFn === 'relu' ? 'Sigmoid' : 'ReLU';
  const latestLossPoint = lossHistory[lossHistory.length - 1] ?? lossHistory[0];
  const initialLossPoint = lossHistory[0];
  const lossReductionPct =
    initialLossPoint && initialLossPoint.trainingLoss > 0
      ? Math.max(
          0,
          Math.round(
            ((initialLossPoint.trainingLoss - latestLossPoint.trainingLoss) /
              initialLossPoint.trainingLoss) *
              100
          )
        )
      : 0;

  const neuronRadius =
    Math.max(inputCount, hidden1Count, hidden2Count) >= 6 ? 18 : 21;
  const showConnectionWeights = simStatus !== 'idle';
  const isExperimentComplete =
    simStatus === 'complete' && trainingEpoch >= MAX_TRAINING_EPOCHS;

  const handleDownloadPdfReport = () => {
    if (!isExperimentComplete) return;
    const report = buildNeuralExperimentReport({
      inputCount,
      hidden1Count,
      hidden2Count,
      outputCount,
      inputValues,
      bias,
      activationFn,
      lossFn,
      speed,
      trainingEpoch,
      maxEpochs: MAX_TRAINING_EPOCHS,
      lossHistory,
      outputProbabilities: network.outputProbabilities,
      outputLabels: OUTPUT_LABELS,
    });
    const { filename } = downloadNeuralExperimentPdf(report);
    setLastExportInfo({
      filename,
      timestamp: report.generatedAtDisplay,
    });
  };

  const edgeLabelPositions = useMemo(() => {
    const s1 = layoutStageEdgeLabels(
      inputPos.flatMap((inp, iIdx) =>
        hidden1Pos.map((h1, h1Idx) => ({
          edgeKey: `edge-1-${iIdx}-${h1Idx}`,
          x1: inp.x + neuronRadius,
          y1: inp.y,
          x2: h1.x - neuronRadius,
          y2: h1.y,
          fromIdx: iIdx,
          toIdx: h1Idx,
          toCount: hidden1Pos.length,
        }))
      )
    );
    const s2 = layoutStageEdgeLabels(
      hidden1Pos.flatMap((h1, h1Idx) =>
        hidden2Pos.map((h2, h2Idx) => ({
          edgeKey: `edge-2-${h1Idx}-${h2Idx}`,
          x1: h1.x + neuronRadius,
          y1: h1.y,
          x2: h2.x - neuronRadius,
          y2: h2.y,
          fromIdx: h1Idx,
          toIdx: h2Idx,
          toCount: hidden2Pos.length,
        }))
      )
    );
    const s3 = layoutStageEdgeLabels(
      hidden2Pos.flatMap((h2, h2Idx) =>
        outputPos.map((out, oIdx) => ({
          edgeKey: `edge-3-${h2Idx}-${oIdx}`,
          x1: h2.x + neuronRadius,
          y1: h2.y,
          x2: out.x - 24,
          y2: out.y,
          fromIdx: h2Idx,
          toIdx: oIdx,
          toCount: outputPos.length,
        }))
      )
    );
    return { ...s1, ...s2, ...s3 };
  }, [inputPos, hidden1Pos, hidden2Pos, outputPos, neuronRadius]);

  return (
    <div className="space-y-6">
      {/* Main Interactive Simulator Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        {/* Left/Center: Interactive SVG Stage + Stage Explainer */}
        <section
          aria-label="Interactive Neural Network Simulator"
          className="xl:col-span-8 min-w-0 rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 sm:p-6 flex flex-col justify-between gap-5"
        >
          {/* Simulator Controls Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-100">
                4-Layer Neural Network Simulator ({inputCount}–{hidden1Count}–{hidden2Count}–
                {outputCount})
              </h2>
              <p className="text-xs text-slate-400 font-mono tabular-nums">
                {totalNeurons} neurons · {totalConnections} weighted connections · Status:{' '}
                <span className="text-cyan-300 capitalize">{simStatus}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <HoverTooltip
                placement="bottom"
                align="start"
                tooltip={
                  simStatus === 'running'
                    ? {
                        title: 'Pause Training Simulation',
                        description:
                          'Pauses forward-propagation pulses and epoch updates at the current training step.',
                        trainingEffect:
                          'Freezes weights and the loss curve so you can inspect individual neuron math mid-training.',
                      }
                    : {
                        title: 'Start Training Simulation',
                        description:
                          'Runs animated forward-propagation signals across all 4 layers for Epochs 0 through 12.',
                        trainingEffect:
                          'Iteratively refines connection weights, updates neuron activations, and plots loss reduction in real time.',
                      }
                }
              >
                <button
                  type="button"
                  onClick={handleStartOrPause}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 whitespace-nowrap"
                >
                  {simStatus === 'running' ? (
                    <>
                      <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Start Simulation</span>
                    </>
                  )}
                </button>
              </HoverTooltip>

              <HoverTooltip
                placement="bottom"
                align="center"
                tooltip={{
                  title: 'Replay From Epoch 0',
                  description:
                    'Restarts the full 12-epoch forward-propagation sweep while keeping your current layers, sliders, and activation choice.',
                  trainingEffect:
                    'Clears the loss history back to Epoch 0 and replays weight updates from the start.',
                }}
              >
                <button
                  type="button"
                  onClick={handleReplay}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-slate-700 bg-[#121E36] px-3.5 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-cyan-500/50 hover:text-cyan-200 whitespace-nowrap"
                >
                  <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Replay</span>
                </button>
              </HoverTooltip>

              <HoverTooltip
                placement="bottom"
                align="end"
                tooltip={{
                  title: 'Reset Entire Simulator',
                  description:
                    'Restores the default 3–4–4–2 network architecture, input signals, 0.1 bias, ReLU activation, and 1x speed.',
                  trainingEffect:
                    'Resets learned weights and clears the convergence chart back to the baseline Epoch 0 state.',
                }}
              >
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-slate-700 bg-[#121E36] px-3.5 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800 whitespace-nowrap"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Reset</span>
                </button>
              </HoverTooltip>

              <HoverTooltip
                placement="bottom"
                align="end"
                tooltip={
                  isExperimentComplete
                    ? {
                        title: 'Export Completed Experiment PDF',
                        description:
                          'Downloads a formatted PDF report with your architecture, activation parameters, output predictions, and epoch loss table.',
                        trainingEffect: `Saves your completed Epoch ${MAX_TRAINING_EPOCHS} final loss result (${latestLossPoint.trainingLoss.toFixed(3)}) for student review.`,
                      }
                    : {
                        title: 'PDF Report Unlocks at Epoch 12',
                        description:
                          'Generates a printable PDF summary of your completed neural network architecture, hyperparameters, and final loss.',
                        trainingEffect:
                          'Run the simulation to completion (Epoch 12/12) so the report captures your converged final loss.',
                      }
                }
              >
                <button
                  type="button"
                  aria-label="Export PDF"
                  disabled={!isExperimentComplete}
                  onClick={handleDownloadPdfReport}
                  className={`inline-flex min-h-10 items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                    isExperimentComplete
                      ? 'border-emerald-400/50 bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25'
                      : 'border-slate-800 bg-[#091020] text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Export PDF</span>
                </button>
              </HoverTooltip>
            </div>
          </div>

          {/* Speed & Activation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-medium text-slate-300">Animation Speed:</span>
              <div
                className="inline-flex rounded-lg border border-slate-800 bg-[#070D19] p-1"
                role="group"
                aria-label="Animation speed"
              >
                {([0.5, 1, 2] as const).map((spd) => (
                  <HoverTooltip
                    key={spd}
                    placement="bottom"
                    align={spd === 0.5 ? 'start' : 'center'}
                    tooltip={{
                      title: `${spd}x Simulation Speed`,
                      description:
                        spd === 0.5
                          ? 'Slows signal pulses to half speed for detailed step-by-step walkthroughs.'
                          : spd === 1
                          ? 'Runs signal pulses and epoch progression at standard demonstration pace.'
                          : 'Doubles animation cadence to reach Epoch 12 convergence twice as fast.',
                      trainingEffect:
                        'Changes playback timing only; final learned weights and loss values stay identical.',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setSpeed(spd)}
                      className={`rounded-md px-2.5 py-1 text-xs font-mono font-medium transition-colors whitespace-nowrap ${
                        speed === spd
                          ? 'bg-blue-500 text-slate-950 font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {spd}x
                    </button>
                  </HoverTooltip>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-xs font-medium text-slate-300">Activation:</span>
              <div
                className="inline-flex rounded-lg border border-slate-800 bg-[#070D19] p-1"
                role="group"
                aria-label="Simulator activation function"
              >
                {(['relu', 'sigmoid'] as const).map((fn) => (
                  <HoverTooltip
                    key={fn}
                    placement="bottom"
                    align="end"
                    tooltip={
                      fn === 'relu'
                        ? {
                            title: 'ReLU Activation',
                            description:
                              'Outputs max(0, x): zeros out negative totals and passes positive values unchanged.',
                            trainingEffect:
                              'Preserves strong gradients so training loss drops faster toward a lower floor.',
                          }
                        : {
                            title: 'Sigmoid Activation',
                            description:
                              'Smoothly squashes every neuron sum into the range (0.00, 1.00).',
                            trainingEffect:
                              'Flattens extreme gradients, causing slower early convergence and a higher loss plateau.',
                          }
                    }
                  >
                    <button
                      type="button"
                      aria-pressed={activationFn === fn}
                      onClick={() => handleActivationChange(fn)}
                      className={`rounded-md px-3 py-1 text-xs font-medium uppercase tracking-wide transition-colors ${
                        activationFn === fn
                          ? 'bg-purple-500 text-slate-950 font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {fn}
                    </button>
                  </HoverTooltip>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-xs font-medium text-slate-300">Loss Function:</span>
              <div
                className="inline-flex rounded-lg border border-slate-800 bg-[#070D19] p-1"
                role="group"
                aria-label="Simulator loss function"
              >
                {(['bce', 'mse'] as const).map((fn) => (
                  <HoverTooltip
                    key={`sim-loss-${fn}`}
                    placement="bottom"
                    align="end"
                    tooltip={
                      fn === 'bce'
                        ? {
                            title: 'Binary Cross Entropy (BCE)',
                            description:
                              'Logarithmic probability loss built for classification tasks (0 vs. 1 outcomes).',
                            trainingEffect:
                              'Penalizes confident wrong predictions strongly, driving steeper early gradient corrections.',
                          }
                        : {
                            title: 'Mean Squared Error (MSE)',
                            description:
                              'Quadratic error loss built for continuous numerical regression targets.',
                            trainingEffect:
                              'Produces gentler squared-error steps, starting numerically lower but converging slower on probabilities.',
                          }
                    }
                  >
                    <button
                      type="button"
                      aria-pressed={lossFn === fn}
                      onClick={() => handleLossFnChange(fn)}
                      className={`rounded-md px-3 py-1 text-xs font-medium uppercase tracking-wide transition-colors ${
                        lossFn === fn
                          ? 'bg-cyan-500 text-slate-950 font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {fn.toUpperCase()}
                    </button>
                  </HoverTooltip>
                ))}
              </div>
            </div>
          </div>

          {/* Original Interactive 4-Layer SVG Canvas + Floating Legend Tooltip */}
          <div
            ref={svgWrapperRef}
            onMouseLeave={() => setHoverLegend(null)}
            className="relative rounded-lg border border-slate-800/80 bg-[#070D19]"
          >
            <div className="p-3 sm:p-4 overflow-x-auto">
              <svg
                viewBox="0 0 820 375"
                className="w-full min-w-[640px] h-auto"
                role="img"
                aria-label={`Interactive neural network SVG diagram with ${inputCount} input, ${hidden1Count} hidden layer 1, ${hidden2Count} hidden layer 2, and ${outputCount} output neurons`}
              >
                {/* Layer Column Headers */}
                <text x="115" y="28" textAnchor="middle" fill="#93C5FD" fontSize="11.5" fontWeight="600">
                  Input Layer ({inputCount})
                </text>
                <text x="305" y="28" textAnchor="middle" fill="#67E8F9" fontSize="11.5" fontWeight="600">
                  Hidden Layer 1 ({hidden1Count})
                </text>
                <text x="495" y="28" textAnchor="middle" fill="#818CF8" fontSize="11.5" fontWeight="600">
                  Hidden Layer 2 ({hidden2Count})
                </text>
                <text x="685" y="28" textAnchor="middle" fill="#C4B5FD" fontSize="11.5" fontWeight="600">
                  Output Layer ({outputCount})
                </text>

                {/* Stage 1 Connections: Input -> Hidden 1 */}
                {inputPos.map((inp, iIdx) =>
                  hidden1Pos.map((h1, h1Idx) => {
                    const weight = network.weightsInputToH1[h1Idx]?.[iIdx] ?? 0;
                    const edgeKey = `edge-1-${iIdx}-${h1Idx}`;
                    const isHovered = hoverLegend?.targetKey === edgeKey;
                    const isSelected =
                      (selectedNode.layer === 'input' && selectedNode.index === iIdx) ||
                      (selectedNode.layer === 'hidden1' && selectedNode.index === h1Idx);
                    const stageActive = simStatus === 'running' && activeStage === 0;
                    const positive = weight >= 0;
                    const edgeLegend = getEdgeLegendInfo({
                      stage: 1,
                      fromLabel: `x${iIdx + 1}`,
                      toLabel: `H1 #${h1Idx + 1}`,
                      weight,
                    });

                    return (
                      <g
                        key={`i-h1-${iIdx}-${h1Idx}`}
                        data-edge-id={edgeKey}
                        className="cursor-help"
                        onMouseEnter={(e) => handleHoverShow(e, edgeKey, edgeLegend)}
                        onMouseMove={(e) => handleHoverShow(e, edgeKey, edgeLegend)}
                        onMouseLeave={() =>
                          setHoverLegend((prev) =>
                            prev?.targetKey === edgeKey ? null : prev
                          )
                        }
                      >
                        <line
                          x1={inp.x + neuronRadius}
                          y1={inp.y}
                          x2={h1.x - neuronRadius}
                          y2={h1.y}
                          stroke={
                            isHovered || isSelected || stageActive
                              ? positive
                                ? '#22D3EE'
                                : '#F472B6'
                              : '#1E293B'
                          }
                          strokeWidth={
                            isHovered
                              ? Math.max(2.6, Math.abs(weight) * 3.6)
                              : isSelected
                              ? Math.max(1.8, Math.abs(weight) * 3)
                              : stageActive
                              ? 1.7
                              : 1.15
                          }
                          strokeOpacity={
                            isHovered ? 1 : isSelected ? 0.95 : stageActive ? 0.78 : 0.65
                          }
                          strokeDasharray={stageActive ? '5 4' : undefined}
                        />
                        <line
                          x1={inp.x + neuronRadius}
                          y1={inp.y}
                          x2={h1.x - neuronRadius}
                          y2={h1.y}
                          stroke="transparent"
                          strokeWidth={12}
                        />
                        {stageActive && (
                          <motion.circle
                            key={`pulse-s0-${pulseNonce}-${iIdx}-${h1Idx}`}
                            cx={inp.x + neuronRadius}
                            cy={inp.y}
                            r="3.2"
                            fill={positive ? '#22D3EE' : '#F472B6'}
                            initial={{ cx: inp.x + neuronRadius, cy: inp.y, opacity: 1 }}
                            animate={{ cx: h1.x - neuronRadius, cy: h1.y, opacity: 0.25 }}
                            transition={{ duration: pulseDurationSec, ease: 'easeInOut' }}
                          />
                        )}
                      </g>
                    );
                  })
                )}

                {/* Stage 2 Connections: Hidden 1 -> Hidden 2 */}
                {hidden1Pos.map((h1, h1Idx) =>
                  hidden2Pos.map((h2, h2Idx) => {
                    const weight = network.weightsH1ToH2[h2Idx]?.[h1Idx] ?? 0;
                    const edgeKey = `edge-2-${h1Idx}-${h2Idx}`;
                    const isHovered = hoverLegend?.targetKey === edgeKey;
                    const isSelected =
                      (selectedNode.layer === 'hidden1' && selectedNode.index === h1Idx) ||
                      (selectedNode.layer === 'hidden2' && selectedNode.index === h2Idx);
                    const stageActive = simStatus === 'running' && activeStage === 1;
                    const positive = weight >= 0;
                    const edgeLegend = getEdgeLegendInfo({
                      stage: 2,
                      fromLabel: `H1 #${h1Idx + 1}`,
                      toLabel: `H2 #${h2Idx + 1}`,
                      weight,
                    });

                    return (
                      <g
                        key={`h1-h2-${h1Idx}-${h2Idx}`}
                        data-edge-id={edgeKey}
                        className="cursor-help"
                        onMouseEnter={(e) => handleHoverShow(e, edgeKey, edgeLegend)}
                        onMouseMove={(e) => handleHoverShow(e, edgeKey, edgeLegend)}
                        onMouseLeave={() =>
                          setHoverLegend((prev) =>
                            prev?.targetKey === edgeKey ? null : prev
                          )
                        }
                      >
                        <line
                          x1={h1.x + neuronRadius}
                          y1={h1.y}
                          x2={h2.x - neuronRadius}
                          y2={h2.y}
                          stroke={
                            isHovered || isSelected || stageActive
                              ? positive
                                ? '#3B82F6'
                                : '#F472B6'
                              : '#1E293B'
                          }
                          strokeWidth={
                            isHovered
                              ? Math.max(2.6, Math.abs(weight) * 3.6)
                              : isSelected
                              ? Math.max(1.8, Math.abs(weight) * 3)
                              : stageActive
                              ? 1.7
                              : 1.15
                          }
                          strokeOpacity={
                            isHovered ? 1 : isSelected ? 0.95 : stageActive ? 0.78 : 0.65
                          }
                          strokeDasharray={stageActive ? '5 4' : undefined}
                        />
                        <line
                          x1={h1.x + neuronRadius}
                          y1={h1.y}
                          x2={h2.x - neuronRadius}
                          y2={h2.y}
                          stroke="transparent"
                          strokeWidth={12}
                        />
                        {stageActive && (
                          <motion.circle
                            key={`pulse-s1-${pulseNonce}-${h1Idx}-${h2Idx}`}
                            cx={h1.x + neuronRadius}
                            cy={h1.y}
                            r="3.2"
                            fill={positive ? '#60A5FA' : '#F472B6'}
                            initial={{ cx: h1.x + neuronRadius, cy: h1.y, opacity: 1 }}
                            animate={{ cx: h2.x - neuronRadius, cy: h2.y, opacity: 0.25 }}
                            transition={{ duration: pulseDurationSec, ease: 'easeInOut' }}
                          />
                        )}
                      </g>
                    );
                  })
                )}

                {/* Stage 3 Connections: Hidden 2 -> Output */}
                {hidden2Pos.map((h2, h2Idx) =>
                  outputPos.map((out, oIdx) => {
                    const weight = network.weightsH2ToOutput[oIdx]?.[h2Idx] ?? 0;
                    const edgeKey = `edge-3-${h2Idx}-${oIdx}`;
                    const isHovered = hoverLegend?.targetKey === edgeKey;
                    const isSelected =
                      (selectedNode.layer === 'hidden2' && selectedNode.index === h2Idx) ||
                      (selectedNode.layer === 'output' && selectedNode.index === oIdx);
                    const stageActive = simStatus === 'running' && activeStage === 2;
                    const positive = weight >= 0;
                    const edgeLegend = getEdgeLegendInfo({
                      stage: 3,
                      fromLabel: `H2 #${h2Idx + 1}`,
                      toLabel: OUTPUT_LABELS[oIdx],
                      weight,
                    });

                    return (
                      <g
                        key={`h2-o-${h2Idx}-${oIdx}`}
                        data-edge-id={edgeKey}
                        className="cursor-help"
                        onMouseEnter={(e) => handleHoverShow(e, edgeKey, edgeLegend)}
                        onMouseMove={(e) => handleHoverShow(e, edgeKey, edgeLegend)}
                        onMouseLeave={() =>
                          setHoverLegend((prev) =>
                            prev?.targetKey === edgeKey ? null : prev
                          )
                        }
                      >
                        <line
                          x1={h2.x + neuronRadius}
                          y1={h2.y}
                          x2={out.x - 24}
                          y2={out.y}
                          stroke={
                            isHovered || isSelected || stageActive
                              ? positive
                                ? '#A78BFA'
                                : '#F472B6'
                              : '#1E293B'
                          }
                          strokeWidth={
                            isHovered
                              ? Math.max(2.6, Math.abs(weight) * 3.6)
                              : isSelected
                              ? Math.max(1.8, Math.abs(weight) * 3)
                              : stageActive
                              ? 1.7
                              : 1.15
                          }
                          strokeOpacity={
                            isHovered ? 1 : isSelected ? 0.95 : stageActive ? 0.8 : 0.65
                          }
                          strokeDasharray={stageActive ? '5 4' : undefined}
                        />
                        <line
                          x1={h2.x + neuronRadius}
                          y1={h2.y}
                          x2={out.x - 24}
                          y2={out.y}
                          stroke="transparent"
                          strokeWidth={12}
                        />
                        {stageActive && (
                          <motion.circle
                            key={`pulse-s2-${pulseNonce}-${h2Idx}-${oIdx}`}
                            cx={h2.x + neuronRadius}
                            cy={h2.y}
                            r="3.4"
                            fill={positive ? '#A78BFA' : '#F472B6'}
                            initial={{ cx: h2.x + neuronRadius, cy: h2.y, opacity: 1 }}
                            animate={{ cx: out.x - 24, cy: out.y, opacity: 0.25 }}
                            transition={{ duration: pulseDurationSec, ease: 'easeInOut' }}
                          />
                        )}
                      </g>
                    );
                  })
                )}

                {/* Individual Numerical Weight Multipliers (Shown when active or paused) */}
                {showConnectionWeights && (
                  <g aria-label="Connection weight multiplier values" style={{ pointerEvents: 'none' }}>
                    {inputPos.map((inp, iIdx) =>
                      hidden1Pos.map((h1, h1Idx) => {
                        const weight = network.weightsInputToH1[h1Idx]?.[iIdx] ?? 0;
                        const edgeKey = `edge-1-${iIdx}-${h1Idx}`;
                        const emphasized =
                          hoverLegend?.targetKey === edgeKey ||
                          (selectedNode.layer === 'input' && selectedNode.index === iIdx) ||
                          (selectedNode.layer === 'hidden1' && selectedNode.index === h1Idx) ||
                          (simStatus === 'running' && activeStage === 0);
                        const pos = edgeLabelPositions[edgeKey] ?? {
                          x: (inp.x + h1.x) / 2,
                          y: (inp.y + h1.y) / 2,
                        };
                        const color = weight >= 0 ? '#22D3EE' : '#F472B6';

                        return (
                          <g key={`w-lbl-1-${iIdx}-${h1Idx}`} data-weight-label={edgeKey}>
                            <rect
                              x={pos.x - 16.5}
                              y={pos.y - 6.5}
                              width={33}
                              height={13}
                              rx={3}
                              fill="#070D19"
                              fillOpacity={emphasized ? 0.96 : 0.85}
                              stroke={emphasized ? color : '#1E293B'}
                              strokeWidth={emphasized ? 0.85 : 0.6}
                            />
                            <text
                              x={pos.x}
                              y={pos.y + 3}
                              textAnchor="middle"
                              fill={emphasized ? color : '#94A3B8'}
                              fontSize="8.2"
                              fontWeight={emphasized ? '600' : '500'}
                              fontFamily="JetBrains Mono, monospace"
                            >
                              {formatConnectionWeight(weight)}
                            </text>
                          </g>
                        );
                      })
                    )}

                    {hidden1Pos.map((h1, h1Idx) =>
                      hidden2Pos.map((h2, h2Idx) => {
                        const weight = network.weightsH1ToH2[h2Idx]?.[h1Idx] ?? 0;
                        const edgeKey = `edge-2-${h1Idx}-${h2Idx}`;
                        const emphasized =
                          hoverLegend?.targetKey === edgeKey ||
                          (selectedNode.layer === 'hidden1' && selectedNode.index === h1Idx) ||
                          (selectedNode.layer === 'hidden2' && selectedNode.index === h2Idx) ||
                          (simStatus === 'running' && activeStage === 1);
                        const pos = edgeLabelPositions[edgeKey] ?? {
                          x: (h1.x + h2.x) / 2,
                          y: (h1.y + h2.y) / 2,
                        };
                        const color = weight >= 0 ? '#60A5FA' : '#F472B6';

                        return (
                          <g key={`w-lbl-2-${h1Idx}-${h2Idx}`} data-weight-label={edgeKey}>
                            <rect
                              x={pos.x - 16.5}
                              y={pos.y - 6.5}
                              width={33}
                              height={13}
                              rx={3}
                              fill="#070D19"
                              fillOpacity={emphasized ? 0.96 : 0.85}
                              stroke={emphasized ? color : '#1E293B'}
                              strokeWidth={emphasized ? 0.85 : 0.6}
                            />
                            <text
                              x={pos.x}
                              y={pos.y + 3}
                              textAnchor="middle"
                              fill={emphasized ? color : '#94A3B8'}
                              fontSize="8.2"
                              fontWeight={emphasized ? '600' : '500'}
                              fontFamily="JetBrains Mono, monospace"
                            >
                              {formatConnectionWeight(weight)}
                            </text>
                          </g>
                        );
                      })
                    )}

                    {hidden2Pos.map((h2, h2Idx) =>
                      outputPos.map((out, oIdx) => {
                        const weight = network.weightsH2ToOutput[oIdx]?.[h2Idx] ?? 0;
                        const edgeKey = `edge-3-${h2Idx}-${oIdx}`;
                        const emphasized =
                          hoverLegend?.targetKey === edgeKey ||
                          (selectedNode.layer === 'hidden2' && selectedNode.index === h2Idx) ||
                          (selectedNode.layer === 'output' && selectedNode.index === oIdx) ||
                          (simStatus === 'running' && activeStage === 2);
                        const pos = edgeLabelPositions[edgeKey] ?? {
                          x: (h2.x + out.x) / 2,
                          y: (h2.y + out.y) / 2,
                        };
                        const color = weight >= 0 ? '#A78BFA' : '#F472B6';

                        return (
                          <g key={`w-lbl-3-${h2Idx}-${oIdx}`} data-weight-label={edgeKey}>
                            <rect
                              x={pos.x - 16.5}
                              y={pos.y - 6.5}
                              width={33}
                              height={13}
                              rx={3}
                              fill="#070D19"
                              fillOpacity={emphasized ? 0.96 : 0.85}
                              stroke={emphasized ? color : '#1E293B'}
                              strokeWidth={emphasized ? 0.85 : 0.6}
                            />
                            <text
                              x={pos.x}
                              y={pos.y + 3}
                              textAnchor="middle"
                              fill={emphasized ? color : '#94A3B8'}
                              fontSize="8.2"
                              fontWeight={emphasized ? '600' : '500'}
                              fontFamily="JetBrains Mono, monospace"
                            >
                              {formatConnectionWeight(weight)}
                            </text>
                          </g>
                        );
                      })
                    )}
                  </g>
                )}

                {/* Input Layer Circular Neurons */}
                {inputPos.map((pos, idx) => {
                  const selected = selectedNode.layer === 'input' && selectedNode.index === idx;
                  const stageLit = activeStage >= 0;
                  const val = network.inputs[idx] ?? 0;
                  const nodeKey = `node-input-${idx}`;
                  const nodeLegend = getNodeLegendInfo({
                    layer: 'input',
                    label: `x${idx + 1}`,
                    valueText: val.toFixed(2),
                    firing: true,
                    activationFn,
                  });
                  return (
                    <g
                      key={`in-${idx}`}
                      data-node-id={nodeKey}
                      onClick={() => setSelectedNode({ layer: 'input', index: idx })}
                      onMouseEnter={(e) => handleHoverShow(e, nodeKey, nodeLegend)}
                      onMouseMove={(e) => handleHoverShow(e, nodeKey, nodeLegend)}
                      onMouseLeave={() =>
                        setHoverLegend((prev) =>
                          prev?.targetKey === nodeKey ? null : prev
                        )
                      }
                      className="cursor-pointer"
                    >
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={neuronRadius}
                        fill={stageLit ? '#10203C' : '#0D1628'}
                        stroke={
                          hoverLegend?.targetKey === nodeKey || selected
                            ? '#22D3EE'
                            : '#3B82F6'
                        }
                        strokeWidth={
                          hoverLegend?.targetKey === nodeKey || selected ? '2.5' : '1.6'
                        }
                      />
                      <text
                        x={pos.x}
                        y={pos.y + 4}
                        textAnchor="middle"
                        fill="#F8FAFC"
                        fontSize="10.5"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {val.toFixed(2)}
                      </text>
                      <text x={pos.x - neuronRadius - 10} y={pos.y + 4} textAnchor="end" fill="#94A3B8" fontSize="10.5">
                        x{idx + 1}
                      </text>
                    </g>
                  );
                })}

                {/* Hidden Layer 1 Circular Neurons */}
                {hidden1Pos.map((pos, idx) => {
                  const selected = selectedNode.layer === 'hidden1' && selectedNode.index === idx;
                  const val = network.hidden1Activated[idx] ?? 0;
                  const reached = simStatus === 'idle' || activeStage >= 1;
                  const firing = reached && val > 0.04;
                  const nodeKey = `node-hidden1-${idx}`;
                  const nodeLegend = getNodeLegendInfo({
                    layer: 'hidden1',
                    label: `Neuron #${idx + 1}`,
                    valueText: reached ? val.toFixed(2) : '--',
                    firing,
                    activationFn,
                  });
                  return (
                    <g
                      key={`h1-${idx}`}
                      data-node-id={nodeKey}
                      onClick={() => setSelectedNode({ layer: 'hidden1', index: idx })}
                      onMouseEnter={(e) => handleHoverShow(e, nodeKey, nodeLegend)}
                      onMouseMove={(e) => handleHoverShow(e, nodeKey, nodeLegend)}
                      onMouseLeave={() =>
                        setHoverLegend((prev) =>
                          prev?.targetKey === nodeKey ? null : prev
                        )
                      }
                      className="cursor-pointer"
                    >
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={neuronRadius}
                        fill={firing ? '#112945' : '#0B1221'}
                        stroke={
                          hoverLegend?.targetKey === nodeKey || selected
                            ? '#67E8F9'
                            : firing
                            ? '#22D3EE'
                            : '#334155'
                        }
                        strokeWidth={
                          hoverLegend?.targetKey === nodeKey || selected ? '2.5' : '1.6'
                        }
                      />
                      <text
                        x={pos.x}
                        y={pos.y + 4}
                        textAnchor="middle"
                        fill={firing ? '#E2E8F0' : '#64748B'}
                        fontSize="10.5"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {reached ? val.toFixed(2) : '--'}
                      </text>
                    </g>
                  );
                })}

                {/* Hidden Layer 2 Circular Neurons */}
                {hidden2Pos.map((pos, idx) => {
                  const selected = selectedNode.layer === 'hidden2' && selectedNode.index === idx;
                  const val = network.hidden2Activated[idx] ?? 0;
                  const reached = simStatus === 'idle' || activeStage >= 2;
                  const firing = reached && val > 0.04;
                  const nodeKey = `node-hidden2-${idx}`;
                  const nodeLegend = getNodeLegendInfo({
                    layer: 'hidden2',
                    label: `Neuron #${idx + 1}`,
                    valueText: reached ? val.toFixed(2) : '--',
                    firing,
                    activationFn,
                  });
                  return (
                    <g
                      key={`h2-${idx}`}
                      data-node-id={nodeKey}
                      onClick={() => setSelectedNode({ layer: 'hidden2', index: idx })}
                      onMouseEnter={(e) => handleHoverShow(e, nodeKey, nodeLegend)}
                      onMouseMove={(e) => handleHoverShow(e, nodeKey, nodeLegend)}
                      onMouseLeave={() =>
                        setHoverLegend((prev) =>
                          prev?.targetKey === nodeKey ? null : prev
                        )
                      }
                      className="cursor-pointer"
                    >
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={neuronRadius}
                        fill={firing ? '#19224B' : '#0B1221'}
                        stroke={
                          hoverLegend?.targetKey === nodeKey || selected
                            ? '#22D3EE'
                            : firing
                            ? '#6366F1'
                            : '#334155'
                        }
                        strokeWidth={
                          hoverLegend?.targetKey === nodeKey || selected ? '2.5' : '1.6'
                        }
                      />
                      <text
                        x={pos.x}
                        y={pos.y + 4}
                        textAnchor="middle"
                        fill={firing ? '#E2E8F0' : '#64748B'}
                        fontSize="10.5"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {reached ? val.toFixed(2) : '--'}
                      </text>
                    </g>
                  );
                })}

                {/* Output Layer Circular Neurons */}
                {outputPos.map((pos, idx) => {
                  const selected = selectedNode.layer === 'output' && selectedNode.index === idx;
                  const reached = simStatus === 'idle' || activeStage >= 3;
                  const prob = Math.round((network.outputProbabilities[idx] ?? 0) * 100);
                  const nodeKey = `node-output-${idx}`;
                  const nodeLegend = getNodeLegendInfo({
                    layer: 'output',
                    label: OUTPUT_LABELS[idx],
                    valueText: reached ? `${prob}%` : '--',
                    firing: reached,
                    activationFn,
                  });
                  return (
                    <g
                      key={`out-${idx}`}
                      data-node-id={nodeKey}
                      onClick={() => setSelectedNode({ layer: 'output', index: idx })}
                      onMouseEnter={(e) => handleHoverShow(e, nodeKey, nodeLegend)}
                      onMouseMove={(e) => handleHoverShow(e, nodeKey, nodeLegend)}
                      onMouseLeave={() =>
                        setHoverLegend((prev) =>
                          prev?.targetKey === nodeKey ? null : prev
                        )
                      }
                      className="cursor-pointer"
                    >
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={24}
                        fill={reached ? '#1B1A3C' : '#0B1221'}
                        stroke={
                          hoverLegend?.targetKey === nodeKey || selected
                            ? '#22D3EE'
                            : reached
                            ? '#A78BFA'
                            : '#334155'
                        }
                        strokeWidth={
                          hoverLegend?.targetKey === nodeKey || selected ? '2.5' : '1.8'
                        }
                      />
                      <text
                        x={pos.x}
                        y={pos.y + 4}
                        textAnchor="middle"
                        fill={reached ? '#F8FAFC' : '#64748B'}
                        fontSize="11"
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight="600"
                      >
                        {reached ? `${prob}%` : '--'}
                      </text>
                      <text x={pos.x + 34} y={pos.y + 4} textAnchor="start" fill="#CBD5E1" fontSize="11">
                        {OUTPUT_LABELS[idx]}
                      </text>
                    </g>
                  );
                })}

                {/* Legend */}
                <text x="24" y="362" textAnchor="start" fill="#64748B" fontSize="10">
                  {showConnectionWeights
                    ? 'Numbers on lines = weight multipliers (signal × weight) · Cyan/Blue/Purple = +, Pink = −'
                    : 'Line colors: Cyan/Blue = positive weight · Pink = negative weight'}
                </text>
                <text x="796" y="362" textAnchor="end" fill="#64748B" fontSize="10">
                  {showConnectionWeights
                    ? 'Hover lines/nodes for legend · Click neuron to inspect math'
                    : 'Start or pause simulation to reveal line weight multipliers'}
                </text>
              </svg>
            </div>

            {hoverLegend && (
              <div
                role="tooltip"
                aria-label="Neural network floating legend tooltip"
                style={{ left: hoverLegend.x, top: hoverLegend.y }}
                className="pointer-events-none absolute z-20 w-[272px] rounded-xl border border-slate-700/90 bg-[#091020]/95 p-3 shadow-2xl shadow-slate-950/90 backdrop-blur-sm space-y-2"
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5">
                  <span className="text-[11px] font-semibold text-slate-100 truncate">
                    {hoverLegend.info.title}
                  </span>
                  <span
                    className="font-mono text-[10.5px] font-semibold px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700/80 whitespace-nowrap tabular-nums"
                    style={{ color: hoverLegend.info.accentColor }}
                  >
                    {hoverLegend.info.badgeText}
                  </span>
                </div>
                <p className="text-[11px] leading-snug text-slate-300">
                  {hoverLegend.info.primaryLine}
                </p>
                <div className="space-y-1.5 pt-0.5">
                  {hoverLegend.info.colorMeanings.map((item) => (
                    <div key={item.label} className="flex items-start gap-2 text-[10.5px] leading-snug">
                      <span
                        aria-hidden="true"
                        className="mt-1 h-2.5 w-2.5 shrink-0 rounded-sm"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <span className="font-semibold text-slate-200">{item.label}: </span>
                        <span className="text-slate-400">{item.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Stage-by-Stage Educational Explanation */}
          <div className="rounded-lg border border-slate-800/90 bg-[#091020] p-4 space-y-3">
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Simulation stages">
              {NEURAL_STAGE_EXPLANATIONS.map((item) => {
                const isActive = activeStage === item.stage;
                return (
                  <button
                    key={item.stage}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setSimStatus('paused');
                      setActiveStage(item.stage);
                    }}
                    className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-cyan-500/18 text-cyan-200 border border-cyan-500/50'
                        : 'text-slate-400 border border-slate-800 bg-[#0D1628] hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-sm font-semibold text-slate-100">{stageInfo.headline}</h3>
              <span className="font-mono text-[11px] text-cyan-300">{stageInfo.formulaNote}</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
              {stageInfo.explanation}
            </p>
          </div>

          {/* Selected Neuron Inspector */}
          <div className="rounded-lg border border-slate-800/80 bg-[#091020] p-4 space-y-1.5">
            <div className="text-xs font-semibold text-blue-300">
              Neuron Inspector ·{' '}
              {selectedNode.layer === 'input'
                ? `Input Neuron x${selectedNode.index + 1}`
                : selectedNode.layer === 'hidden1'
                ? `Hidden Layer 1 · Neuron #${selectedNode.index + 1}`
                : selectedNode.layer === 'hidden2'
                ? `Hidden Layer 2 · Neuron #${selectedNode.index + 1}`
                : `Output Layer · ${OUTPUT_LABELS[selectedNode.index]}`}
            </div>
            <div className="font-mono text-xs text-slate-300 tabular-nums leading-relaxed">
              {selectedNode.layer === 'input' &&
                `Input Value = ${(network.inputs[selectedNode.index] ?? 0).toFixed(
                  2
                )} · Outgoing weights to Hidden 1: [${(
                  network.weightsInputToH1.map((row) => row[selectedNode.index]?.toFixed(2))
                ).join(', ')}]`}
              {selectedNode.layer === 'hidden1' &&
                `Incoming Weights = [${(
                  network.weightsInputToH1[selectedNode.index] ?? []
                )
                  .map((w) => (w >= 0 ? `+${w.toFixed(2)}` : w.toFixed(2)))
                  .join(', ')}] · Sum + Bias = ${(
                  network.hidden1Raw[selectedNode.index] ?? 0
                ).toFixed(3)} -> ${activationFn.toUpperCase()} = ${(
                  network.hidden1Activated[selectedNode.index] ?? 0
                ).toFixed(3)}`}
              {selectedNode.layer === 'hidden2' &&
                `Incoming Weights = [${(
                  network.weightsH1ToH2[selectedNode.index] ?? []
                )
                  .map((w) => (w >= 0 ? `+${w.toFixed(2)}` : w.toFixed(2)))
                  .join(', ')}] · Sum + Bias = ${(
                  network.hidden2Raw[selectedNode.index] ?? 0
                ).toFixed(3)} -> ${activationFn.toUpperCase()} = ${(
                  network.hidden2Activated[selectedNode.index] ?? 0
                ).toFixed(3)}`}
              {selectedNode.layer === 'output' &&
                `Incoming Weights = [${(
                  network.weightsH2ToOutput[selectedNode.index] ?? []
                )
                  .map((w) => (w >= 0 ? `+${w.toFixed(2)}` : w.toFixed(2)))
                  .join(', ')}] · Raw Score = ${(
                  network.outputRaw[selectedNode.index] ?? 0
                ).toFixed(3)} -> Softmax = ${Math.round(
                  (network.outputProbabilities[selectedNode.index] ?? 0) * 100
                )}%`}
            </div>
          </div>
        </section>

        {/* Right Control Deck */}
        <section className="xl:col-span-4 min-w-0 space-y-5">
          {/* Layer Size Builder */}
          <div className="rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 space-y-3.5">
            <div>
              <h3 className="text-base font-semibold text-slate-100">Layer Architecture</h3>
              <p className="text-xs text-slate-400">
                Add or remove circular neurons in every layer to reshape the network.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  label: 'Input Layer',
                  count: inputCount,
                  min: 2,
                  max: 6,
                  setCount: setInputCount,
                },
                {
                  label: 'Hidden Layer 1',
                  count: hidden1Count,
                  min: 2,
                  max: 6,
                  setCount: setHidden1Count,
                },
                {
                  label: 'Hidden Layer 2',
                  count: hidden2Count,
                  min: 2,
                  max: 6,
                  setCount: setHidden2Count,
                },
                {
                  label: 'Output Layer',
                  count: outputCount,
                  min: 2,
                  max: 4,
                  setCount: setOutputCount,
                },
              ].map((layer) => (
                <div
                  key={layer.label}
                  className="flex items-center justify-between rounded-lg border border-slate-800 bg-[#091020] px-3 py-2"
                >
                  <span className="text-xs font-medium text-slate-200">{layer.label}</span>
                  <div className="flex items-center gap-2">
                    <HoverTooltip
                      placement="top"
                      align="end"
                      tooltip={getLayerCapacityTooltip(layer.label, 'decrease')}
                    >
                      <button
                        type="button"
                        aria-label={`Decrease ${layer.label} neurons`}
                        disabled={layer.count <= layer.min}
                        onClick={() => layer.setCount((c) => Math.max(layer.min, c - 1))}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-700 bg-[#121E36] text-slate-200 hover:border-cyan-500/50 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                    </HoverTooltip>
                    <span className="w-6 text-center font-mono text-sm font-semibold text-cyan-300 tabular-nums">
                      {layer.count}
                    </span>
                    <HoverTooltip
                      placement="top"
                      align="end"
                      tooltip={getLayerCapacityTooltip(layer.label, 'increase')}
                    >
                      <button
                        type="button"
                        aria-label={`Increase ${layer.label} neurons`}
                        disabled={layer.count >= layer.max}
                        onClick={() => layer.setCount((c) => Math.min(layer.max, c + 1))}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-700 bg-[#121E36] text-slate-200 hover:border-cyan-500/50 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </HoverTooltip>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Signal Sliders & Bias */}
          <div className="rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 space-y-3.5">
            <h3 className="text-base font-semibold text-slate-100">Input Values &amp; Bias</h3>
            <div className="space-y-3">
              {activeInputs.map((val, idx) => (
                <ControlSlider
                  key={`slider-x-${idx}`}
                  label={`Input Signal x${idx + 1}`}
                  value={val}
                  min={0}
                  max={1}
                  step={0.05}
                  onChange={(nextVal) => handleInputSliderChange(idx, nextVal)}
                  tooltip={getInputFeatureTooltip(idx)}
                />
              ))}
              <ControlSlider
                label="Hidden Layer Bias"
                value={bias}
                min={-0.8}
                max={0.8}
                step={0.05}
                onChange={(nextBias) => {
                  setBias(nextBias);
                  setLastExportInfo(null);
                }}
                tooltip={getBiasSliderTooltip()}
              />
            </div>
          </div>

          {/* Live Output Probabilities */}
          <div className="rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 space-y-3.5">
            <h3 className="text-base font-semibold text-slate-100">Output Predictions</h3>
            <div className="space-y-2.5">
              {network.outputProbabilities.map((prob, idx) => {
                const pct = Math.round(prob * 100);
                return (
                  <div key={OUTPUT_LABELS[idx]} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-200 font-medium">{OUTPUT_LABELS[idx]}</span>
                      <span className="font-mono text-cyan-300 tabular-nums">{pct}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Real-Time Recharts Training Loss Reduction Chart */}
      <section
        aria-label="Training Loss Reduction Chart"
        className="min-w-0 rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 sm:p-6 space-y-5"
      >
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-cyan-400" aria-hidden="true" />
              <h2 className="text-base sm:text-lg font-semibold text-slate-100">
                Real-Time Training Loss Reduction ({activeFnLabel} · {activeLossLabel})
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Toggle activation (ReLU vs. Sigmoid) and loss function (BCE vs. MSE) at any epoch to compare convergence speed, gradient behavior, and final loss.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              className="inline-flex rounded-lg border border-slate-800 bg-[#070D19] p-1"
              role="group"
              aria-label="Chart loss function"
            >
              {(['bce', 'mse'] as const).map((fn) => (
                <HoverTooltip
                  key={`chart-loss-${fn}`}
                  placement="top"
                  align="end"
                  tooltip={
                    fn === 'bce'
                      ? {
                          title: 'Switch Loss Metric to BCE',
                          description:
                            'Plots Binary Cross Entropy (log-loss) for classification confidence calibration.',
                          trainingEffect:
                            'Steep logarithmic penalty drives sharper early loss drop on probability outputs.',
                        }
                      : {
                          title: 'Switch Loss Metric to MSE',
                          description:
                            'Plots Mean Squared Error for continuous regression error measurement.',
                          trainingEffect:
                            'Squares raw differences, creating a lower starting value with gentler slope.',
                        }
                  }
                >
                  <button
                    type="button"
                    aria-pressed={lossFn === fn}
                    onClick={() => handleLossFnChange(fn)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      lossFn === fn
                        ? 'bg-purple-500 text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {fn.toUpperCase()}
                  </button>
                </HoverTooltip>
              ))}
            </div>

            <div
              className="inline-flex rounded-lg border border-slate-800 bg-[#070D19] p-1"
              role="group"
              aria-label="Chart activation function"
            >
              {(['relu', 'sigmoid'] as const).map((fn) => (
                <HoverTooltip
                  key={`chart-${fn}`}
                  placement="top"
                  align="end"
                  tooltip={
                    fn === 'relu'
                      ? {
                          title: 'Switch Chart to ReLU',
                          description:
                            'Recalculates neuron activations and loss convergence using ReLU (max(0, x)).',
                          trainingEffect:
                            'Demonstrates sharper early gradient descent and lower final training loss.',
                        }
                      : {
                          title: 'Switch Chart to Sigmoid',
                          description:
                            'Recalculates neuron activations and loss convergence using the smooth Sigmoid curve.',
                          trainingEffect:
                            'Demonstrates gentler early slope and a higher loss floor from vanishing gradients.',
                        }
                  }
                >
                  <button
                    type="button"
                    aria-pressed={activationFn === fn}
                    onClick={() => handleActivationChange(fn)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      activationFn === fn
                        ? 'bg-cyan-500 text-slate-950 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {fn === 'relu' ? 'ReLU' : 'Sigmoid'}
                  </button>
                </HoverTooltip>
              ))}
            </div>

            <HoverTooltip
              placement="top"
              align="end"
              tooltip={{
                title: `Toggle ${alternateFnLabel} Baseline`,
                description:
                  'Shows or hides the dashed amber reference curve for the alternate activation function.',
                trainingEffect:
                  'Makes it easy to compare convergence speed and final loss gap side by side.',
              }}
            >
              <button
                type="button"
                aria-pressed={showComparisonCurve}
                onClick={() => setShowComparisonCurve((v) => !v)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                  showComparisonCurve
                    ? 'border-amber-500/40 bg-amber-500/10 text-amber-200'
                    : 'border-slate-700 bg-[#091020] text-slate-400 hover:text-slate-200'
                }`}
              >
                {showComparisonCurve ? `Overlaying ${alternateFnLabel}` : `Compare ${alternateFnLabel}`}
              </button>
            </HoverTooltip>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-lg border border-slate-800/80 bg-[#091020] px-4 py-3 text-xs">
          <div>
            <div className="text-slate-400">Training Epoch</div>
            <div className="font-mono text-base font-semibold text-slate-100 tabular-nums">
              {trainingEpoch} / {MAX_TRAINING_EPOCHS}
            </div>
          </div>
          <div>
            <div className="text-slate-400">
              Current Loss ({activeFnLabel} · {activeLossLabel})
            </div>
            <div className="font-mono text-base font-semibold text-cyan-300 tabular-nums">
              {latestLossPoint.trainingLoss.toFixed(3)}
            </div>
          </div>
          <div>
            <div className="text-slate-400">Loss Reduction</div>
            <div className="font-mono text-base font-semibold text-purple-300 tabular-nums">
              -{lossReductionPct}%
            </div>
          </div>
          <div>
            <div className="text-slate-400">Simulated Accuracy</div>
            <div className="font-mono text-base font-semibold text-blue-300 tabular-nums">
              {latestLossPoint.accuracyPct}%
            </div>
          </div>
        </div>

        <div className="h-64 w-full rounded-lg border border-slate-800/80 bg-[#070D19] p-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={lossHistory}
              margin={{ top: 10, right: 20, left: 0, bottom: 8 }}
            >
              <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" />
              <XAxis
                dataKey="epoch"
                type="number"
                domain={[0, MAX_TRAINING_EPOCHS]}
                tickCount={7}
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
                label={{
                  value: 'Training Epoch',
                  position: 'insideBottom',
                  offset: -4,
                  fill: '#94A3B8',
                  fontSize: 11,
                }}
              />
              <YAxis
                domain={[0, 1]}
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
                width={44}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#091020',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: '#F1F5F9',
                }}
                labelFormatter={(val) => `Epoch ${val}`}
              />
              <Legend
                verticalAlign="top"
                height={28}
                wrapperStyle={{ fontSize: '12px', color: '#CBD5E1' }}
              />
              <Line
                type="monotone"
                dataKey="trainingLoss"
                name={`${activeFnLabel} Training Loss`}
                stroke="#22D3EE"
                strokeWidth={2.5}
                dot={{ r: 3.5, fill: '#22D3EE', strokeWidth: 0 }}
                activeDot={{ r: 5, fill: '#67E8F9' }}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="validationLoss"
                name={`${activeFnLabel} Validation Loss`}
                stroke="#A78BFA"
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={{ r: 3, fill: '#A78BFA', strokeWidth: 0 }}
                activeDot={{ r: 4.5, fill: '#C4B5FD' }}
                isAnimationActive={false}
              />
              {showComparisonCurve && (
                <Line
                  type="monotone"
                  dataKey="alternateLoss"
                  name={`${alternateFnLabel} Baseline`}
                  stroke="#F59E0B"
                  strokeWidth={1.75}
                  strokeDasharray="3 3"
                  dot={false}
                  activeDot={{ r: 4, fill: '#FBBF24' }}
                  isAnimationActive={false}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-slate-800/80 bg-[#091020] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="text-xs font-semibold text-cyan-300">
              {convergenceNote.title} · {convergenceNote.speedLabel}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {convergenceNote.summary}
            </p>
          </div>
          <div className="font-mono text-xs text-amber-300 tabular-nums whitespace-nowrap">
            {alternateFnLabel} ({activeLossLabel}) @ Epoch {trainingEpoch}:{' '}
            {latestLossPoint.alternateLoss.toFixed(3)}
          </div>
        </div>

        {/* Educational Guide: How BCE vs MSE Shapes Learning Across Problem Types */}
        <div
          data-testid="loss-function-comparison"
          className="rounded-lg border border-slate-800/90 bg-[#091020] p-4 space-y-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-slate-100">
                How Loss Functions Affect Learning: Binary Cross Entropy (BCE) vs. Mean Squared Error (MSE)
              </h3>
              <p className="text-xs text-slate-400">
                The loss function defines how the model scores mistakes and scales the weight-update gradients during backpropagation.
              </p>
            </div>
            <span className="rounded border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-cyan-200 whitespace-nowrap">
              Active: {activeLossGuide.fullName}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {[bceGuide, mseGuide].map((guide) => {
              const isSelected = guide.id === lossFn;
              return (
                <div
                  key={guide.id}
                  className={`rounded-lg border p-3.5 space-y-2 transition-colors ${
                    isSelected
                      ? guide.id === 'bce'
                        ? 'border-cyan-500/60 bg-cyan-950/20'
                        : 'border-purple-500/60 bg-purple-950/20'
                      : 'border-slate-800/80 bg-[#0D1628]/70 opacity-90'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`text-xs font-semibold ${
                        isSelected
                          ? guide.id === 'bce'
                            ? 'text-cyan-300'
                            : 'text-purple-300'
                          : 'text-slate-200'
                      }`}
                    >
                      {guide.fullName}
                    </span>
                    <span className="font-mono text-[10.5px] text-slate-300 bg-[#070D19] border border-slate-800 px-2 py-0.5 rounded">
                      {guide.formula}
                    </span>
                  </div>

                  <div className="text-[11px] font-medium text-blue-300">
                    Best For: <span className="text-slate-200">{guide.bestFor}</span>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-300">
                    <span className="font-semibold text-slate-100">Gradient Behavior: </span>
                    {guide.gradientBehavior}
                  </p>

                  <p className="text-xs leading-relaxed text-slate-400">
                    <span className="font-semibold text-slate-200">Impact on Learning: </span>
                    {guide.learningEffect}
                  </p>

                  <div className="pt-1 border-t border-slate-800/80 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">Use Cases: </span>
                    {guide.examples.join(' · ')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Completed Experiment PDF Summary Export Bar */}
        <div
          data-testid="pdf-report-panel"
          className={`rounded-lg border px-4 py-3.5 flex flex-wrap items-center justify-between gap-4 transition-colors ${
            isExperimentComplete
              ? 'border-emerald-500/40 bg-emerald-950/20'
              : 'border-slate-800/80 bg-[#091020]'
          }`}
        >
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-xs font-semibold ${
                  isExperimentComplete ? 'text-emerald-300' : 'text-slate-200'
                }`}
              >
                {isExperimentComplete
                  ? 'Experiment Complete — PDF Summary Report Ready'
                  : 'Experiment Summary PDF Report'}
              </span>
              <span className="rounded border border-slate-700/80 bg-[#0D1628] px-2 py-0.5 font-mono text-[10.5px] text-slate-300 tabular-nums">
                {inputCount}–{hidden1Count}–{hidden2Count}–{outputCount} · {activeFnLabel} ·{' '}
                {activeLossLabel} · Epoch {trainingEpoch}/{MAX_TRAINING_EPOCHS}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {isExperimentComplete
                ? `Final Training Loss ${latestLossPoint.trainingLoss.toFixed(3)} (-${lossReductionPct}%) · Simulated Accuracy ${latestLossPoint.accuracyPct}% · Bias ${bias >= 0 ? '+' : ''}${bias.toFixed(2)}`
                : 'Start and complete all 12 training epochs to generate a downloadable PDF summary of your configuration and final loss.'}
            </p>
            {lastExportInfo && (
              <div
                role="status"
                className="inline-flex items-center gap-1.5 pt-1 text-xs font-medium text-emerald-300"
              >
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Downloaded {lastExportInfo.filename}</span>
              </div>
            )}
          </div>

          <HoverTooltip
            placement="top"
            align="end"
            tooltip={
              isExperimentComplete
                ? {
                    title: 'Download PDF Summary Report',
                    description:
                      'Creates an A4 PDF containing your architecture, input signals, bias, loss chart, output probabilities, and epoch log.',
                    trainingEffect: `Records your final converged loss (${latestLossPoint.trainingLoss.toFixed(3)}) for offline student or counsellor review.`,
                  }
                : {
                    title: 'Waiting for Final Epoch',
                    description:
                      'PDF export becomes active once the neural network finishes Epoch 12/12.',
                    trainingEffect:
                      'Ensures every downloaded report captures a complete training run and final converged loss.',
                  }
            }
          >
            <button
              type="button"
              disabled={!isExperimentComplete}
              onClick={handleDownloadPdfReport}
              className={`inline-flex min-h-10 items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                isExperimentComplete
                  ? 'bg-emerald-400 text-slate-950 hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300'
                  : 'border border-slate-700/80 bg-[#121E36] text-slate-500 cursor-not-allowed'
              }`}
            >
              <FileDown className="h-4 w-4" aria-hidden="true" />
              <span>Download PDF Report</span>
            </button>
          </HoverTooltip>
        </div>
      </section>

      {/* Plain-Language Guide: Input, Weights, Activation Functions & Output */}
      <section className="rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-cyan-400" aria-hidden="true" />
          <h2 className="text-base sm:text-lg font-semibold text-slate-100">
            How a Neural Network Works in Simple Language
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {NEURAL_CONCEPT_GUIDES.map((guide, idx) => (
            <div
              key={guide.id}
              className="rounded-lg border border-slate-800/80 bg-[#091020] p-4 space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-cyan-300">
                  0{idx + 1}. {guide.title}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-200">{guide.simpleSummary}</p>
              <p className="text-xs leading-relaxed text-slate-400 border-t border-slate-800/80 pt-2">
                {guide.analogy}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
