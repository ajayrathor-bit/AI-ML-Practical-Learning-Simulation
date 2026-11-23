import type {
  DocumentChunk,
  LearningProgress,
  ScatterPoint,
  SentimentResult,
  TokenAnalysis,
  RagSearchResult,
} from '../types/lab';

// ==========================================
// 1. Progress Helpers
// ==========================================

export function toggleStepCompleted(
  progress: LearningProgress,
  moduleId: string,
  stepIndex: number
): LearningProgress {
  const existing = progress.completedSteps[moduleId] ?? [];
  if (existing.includes(stepIndex)) {
    return progress;
  }
  return {
    ...progress,
    completedSteps: {
      ...progress.completedSteps,
      [moduleId]: [...existing, stepIndex].sort((a, b) => a - b),
    },
  };
}

export function calculateOverallCompletion(
  progress: LearningProgress,
  moduleStepCounts: Record<string, number>
): { completed: number; total: number; percentage: number } {
  const entries = Object.entries(moduleStepCounts);
  let completed = 0;
  let total = 0;
  for (const [id, stepTotal] of entries) {
    total += stepTotal;
    const done = (progress.completedSteps[id] ?? []).filter(
      (idx) => idx >= 0 && idx < stepTotal
    );
    completed += done.length;
  }
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, total, percentage };
}

// ==========================================
// 2. Machine Learning Simulation Math
// ==========================================

export function computeRegressionMSE(
  points: ScatterPoint[],
  slope: number,
  intercept: number
): number {
  if (points.length === 0) return 0;
  let sumSq = 0;
  for (const p of points) {
    const predicted = slope * p.x + intercept;
    const err = p.y - predicted;
    sumSq += err * err;
  }
  return Number((sumSq / points.length).toFixed(2));
}

export function stepGradientDescent(
  points: ScatterPoint[],
  slope: number,
  intercept: number,
  learningRate: number
): { slope: number; intercept: number; mse: number } {
  if (points.length === 0) {
    return { slope, intercept, mse: 0 };
  }
  const n = points.length;
  let dSlope = 0;
  let dIntercept = 0;

  for (const p of points) {
    const pred = slope * p.x + intercept;
    const error = pred - p.y;
    dSlope += (2 / n) * error * p.x;
    dIntercept += (2 / n) * error;
  }

  const nextSlope = Number((slope - learningRate * dSlope).toFixed(3));
  const nextIntercept = Number((intercept - learningRate * dIntercept).toFixed(3));
  const mse = computeRegressionMSE(points, nextSlope, nextIntercept);
  return { slope: nextSlope, intercept: nextIntercept, mse };
}

export function computeClassificationAccuracy(
  points: ScatterPoint[],
  slope: number,
  intercept: number
): { accuracy: number; correct: number; total: number } {
  const labeled = points.filter((p) => p.label !== undefined);
  if (labeled.length === 0) return { accuracy: 0, correct: 0, total: 0 };
  let correct = 0;
  for (const p of labeled) {
    const boundaryY = slope * p.x + intercept;
    const predictedLabel: 0 | 1 = p.y >= boundaryY ? 1 : 0;
    if (predictedLabel === p.label) {
      correct += 1;
    }
  }
  return {
    accuracy: Math.round((correct / labeled.length) * 100),
    correct,
    total: labeled.length,
  };
}

export function assignKMeansClusters(
  points: ScatterPoint[],
  centroids: Array<{ x: number; y: number }>
): {
  assignments: number[];
  nextCentroids: Array<{ x: number; y: number }>;
  inertia: number;
} {
  if (points.length === 0 || centroids.length === 0) {
    return { assignments: [], nextCentroids: centroids, inertia: 0 };
  }

  const assignments: number[] = [];
  let inertia = 0;

  for (const p of points) {
    let bestIdx = 0;
    let bestDistSq = Infinity;
    for (let c = 0; c < centroids.length; c++) {
      const dx = p.x - centroids[c].x;
      const dy = p.y - centroids[c].y;
      const distSq = dx * dx + dy * dy;
      if (distSq < bestDistSq) {
        bestDistSq = distSq;
        bestIdx = c;
      }
    }
    assignments.push(bestIdx);
    inertia += bestDistSq;
  }

  const nextCentroids = centroids.map((centroid, cIdx) => {
    const members = points.filter((_, pIdx) => assignments[pIdx] === cIdx);
    if (members.length === 0) return centroid;
    const avgX = members.reduce((acc, m) => acc + m.x, 0) / members.length;
    const avgY = members.reduce((acc, m) => acc + m.y, 0) / members.length;
    return {
      x: Number(avgX.toFixed(2)),
      y: Number(avgY.toFixed(2)),
    };
  });

  return {
    assignments,
    nextCentroids,
    inertia: Number(inertia.toFixed(2)),
  };
}

export function simulateStudentOutcomePrediction(
  studyHours: number,
  attendancePct: number
): { predictedScore: number; passProbability: number; classification: 'Likely Pass' | 'Needs Support' } {
  const rawScore = 22 + studyHours * 5.8 + (attendancePct - 50) * 0.42;
  const predictedScore = Math.max(15, Math.min(99, Math.round(rawScore)));
  const logit = (predictedScore - 60) / 10;
  const passProbability = Math.round((1 / (1 + Math.exp(-logit))) * 100);
  return {
    predictedScore,
    passProbability,
    classification: passProbability >= 55 ? 'Likely Pass' : 'Needs Support',
  };
}

// ==========================================
// 3. Deep Learning Forward Pass Math
// ==========================================

export type ActivationFn = 'relu' | 'sigmoid';

export function applyActivation(value: number, fn: ActivationFn): number {
  if (fn === 'relu') {
    return Number(Math.max(0, value).toFixed(3));
  }
  return Number((1 / (1 + Math.exp(-value))).toFixed(3));
}

export interface NeuralForwardResult {
  inputs: [number, number, number];
  hiddenRaw: [number, number, number, number];
  hiddenActivated: [number, number, number, number];
  outputRaw: [number, number];
  outputProbabilities: [number, number];
}

const HIDDEN_WEIGHTS: number[][] = [
  [0.7, 0.4, -0.3],
  [-0.2, 0.8, 0.5],
  [0.5, -0.4, 0.6],
  [0.3, 0.3, 0.4],
];

const OUTPUT_WEIGHTS: number[][] = [
  [0.65, 0.5, -0.35, 0.4],
  [-0.45, -0.3, 0.7, 0.25],
];

export function computeNeuralForwardPass(
  inputs: [number, number, number],
  hiddenBias: number,
  activationFn: ActivationFn
): NeuralForwardResult {
  const hiddenRaw = HIDDEN_WEIGHTS.map((weights) => {
    const sum =
      weights[0] * inputs[0] +
      weights[1] * inputs[1] +
      weights[2] * inputs[2] +
      hiddenBias;
    return Number(sum.toFixed(3));
  }) as [number, number, number, number];

  const hiddenActivated = hiddenRaw.map((v) =>
    applyActivation(v, activationFn)
  ) as [number, number, number, number];

  const outputRaw = OUTPUT_WEIGHTS.map((weights) => {
    const sum = weights.reduce(
      (acc, w, idx) => acc + w * hiddenActivated[idx],
      0
    );
    return Number(sum.toFixed(3));
  }) as [number, number];

  // Softmax normalization
  const exp0 = Math.exp(outputRaw[0]);
  const exp1 = Math.exp(outputRaw[1]);
  const denom = exp0 + exp1;
  const prob0 = Number((exp0 / denom).toFixed(3));
  const prob1 = Number((1 - prob0).toFixed(3));

  return {
    inputs,
    hiddenRaw,
    hiddenActivated,
    outputRaw,
    outputProbabilities: [prob0, prob1],
  };
}

export interface DynamicNetworkConfig {
  inputValues: number[];
  hidden1Size: number;
  hidden2Size: number;
  outputSize: number;
  hiddenBias: number;
  activationFn: ActivationFn;
  trainingEpoch?: number;
}

export interface DynamicNetworkResult {
  inputs: number[];
  hidden1Raw: number[];
  hidden1Activated: number[];
  hidden2Raw: number[];
  hidden2Activated: number[];
  outputRaw: number[];
  outputProbabilities: number[];
  weightsInputToH1: number[][];
  weightsH1ToH2: number[][];
  weightsH2ToOutput: number[][];
}

export function deterministicWeight(
  layerStage: 1 | 2 | 3,
  toIdx: number,
  fromIdx: number,
  trainingEpoch = 0
): number {
  const baseSeed = Math.sin((layerStage * 19 + toIdx * 7 + fromIdx * 13 + 3) * 1.37);
  // Subtle deterministic weight refinement during training epochs so neurons visibly update
  const targetShift =
    toIdx === 0
      ? 0.24
      : toIdx % 2 === 1
      ? -0.18
      : 0.14;
  const progress = Math.min(1, Math.max(0, trainingEpoch) / 12);
  const weight = baseSeed * 0.85 + targetShift * progress;
  return Number(Math.max(-0.98, Math.min(0.98, weight)).toFixed(2));
}

export function computeDynamicNeuralNetwork(
  config: DynamicNetworkConfig
): DynamicNetworkResult {
  const epoch = config.trainingEpoch ?? 0;
  const inputs = config.inputValues.map((v) =>
    Number(Math.max(0, Math.min(1, v)).toFixed(2))
  );
  const h1Count = Math.max(1, Math.min(6, Math.round(config.hidden1Size)));
  const h2Count = Math.max(1, Math.min(6, Math.round(config.hidden2Size)));
  const outCount = Math.max(1, Math.min(4, Math.round(config.outputSize)));

  const weightsInputToH1: number[][] = Array.from({ length: h1Count }, (_, h1Idx) =>
    inputs.map((_, inIdx) => deterministicWeight(1, h1Idx, inIdx, epoch))
  );

  const hidden1Raw = weightsInputToH1.map((weights) => {
    const sum =
      weights.reduce((acc, w, idx) => acc + w * inputs[idx], 0) +
      config.hiddenBias;
    return Number(sum.toFixed(3));
  });

  const hidden1Activated = hidden1Raw.map((val) =>
    applyActivation(val, config.activationFn)
  );

  const weightsH1ToH2: number[][] = Array.from({ length: h2Count }, (_, h2Idx) =>
    hidden1Activated.map((_, h1Idx) => deterministicWeight(2, h2Idx, h1Idx, epoch))
  );

  const hidden2Raw = weightsH1ToH2.map((weights) => {
    const sum =
      weights.reduce((acc, w, idx) => acc + w * hidden1Activated[idx], 0) +
      config.hiddenBias;
    return Number(sum.toFixed(3));
  });

  const hidden2Activated = hidden2Raw.map((val) =>
    applyActivation(val, config.activationFn)
  );

  const weightsH2ToOutput: number[][] = Array.from({ length: outCount }, (_, oIdx) =>
    hidden2Activated.map((_, h2Idx) => deterministicWeight(3, oIdx, h2Idx, epoch))
  );

  const outputRaw = weightsH2ToOutput.map((weights) => {
    const sum = weights.reduce(
      (acc, w, idx) => acc + w * hidden2Activated[idx],
      0
    );
    return Number(sum.toFixed(3));
  });

  const maxLogit = Math.max(...outputRaw);
  const exps = outputRaw.map((v) => Math.exp(v - maxLogit));
  const sumExps = exps.reduce((a, b) => a + b, 0);
  const outputProbabilities = exps.map((e) => Number((e / sumExps).toFixed(3)));

  return {
    inputs,
    hidden1Raw,
    hidden1Activated,
    hidden2Raw,
    hidden2Activated,
    outputRaw,
    outputProbabilities,
    weightsInputToH1,
    weightsH1ToH2,
    weightsH2ToOutput,
  };
}

export type LossFn = 'bce' | 'mse';

export interface TrainingLossPoint {
  epoch: number;
  trainingLoss: number;
  validationLoss: number;
  alternateLoss: number;
  accuracyPct: number;
}

export function computeTrainingLossPoint(
  epoch: number,
  activationFn: ActivationFn,
  totalNeurons: number,
  lossFn: LossFn = 'bce'
): TrainingLossPoint {
  const safeEpoch = Math.max(0, epoch);
  const capacityFactor = Math.max(0.86, Math.min(1.12, 1 - (totalNeurons - 13) * 0.012));

  const calcForFn = (fn: ActivationFn): number => {
    if (lossFn === 'mse') {
      // Mean Squared Error squares errors in [0, 1], starting numerically smaller (~0.45)
      // with gentler quadratic gradient updates that plateau slightly slower on probabilities.
      if (fn === 'relu') {
        const oscillation = safeEpoch === 0 ? 0 : Math.sin(safeEpoch * 1.2) * 0.005;
        return Number(
          Math.max(
            0.032,
            0.41 * Math.exp(-0.21 * safeEpoch) * capacityFactor + 0.032 + oscillation
          ).toFixed(3)
        );
      }
      const oscillation = safeEpoch === 0 ? 0 : Math.cos(safeEpoch * 1.05) * 0.005;
      return Number(
        Math.max(
          0.095,
          0.36 * Math.exp(-0.11 * safeEpoch) * capacityFactor + 0.095 + oscillation
        ).toFixed(3)
      );
    }

    // Binary Cross Entropy penalizes confident misclassifications logarithmically,
    // yielding steeper early gradients and rapid descent when paired with ReLU.
    if (fn === 'relu') {
      const oscillation = safeEpoch === 0 ? 0 : Math.sin(safeEpoch * 1.35) * 0.01;
      return Number(
        Math.max(
          0.055,
          0.86 * Math.exp(-0.28 * safeEpoch) * capacityFactor + 0.055 + oscillation
        ).toFixed(3)
      );
    }
    // Sigmoid exhibits slower initial descent (vanishing-gradient lag) and a higher asymptotic floor
    const earlyLag = safeEpoch === 0 ? 0 : 0.075 * Math.exp(-0.22 * safeEpoch);
    const oscillation = safeEpoch === 0 ? 0 : Math.cos(safeEpoch * 1.15) * 0.008;
    return Number(
      Math.max(
        0.16,
        0.72 * Math.exp(-0.15 * safeEpoch) * capacityFactor + 0.16 + earlyLag + oscillation
      ).toFixed(3)
    );
  };

  const trainingLoss = calcForFn(activationFn);
  const alternateFn: ActivationFn = activationFn === 'relu' ? 'sigmoid' : 'relu';
  const alternateLoss = calcForFn(alternateFn);

  const valGap =
    lossFn === 'mse'
      ? activationFn === 'relu'
        ? 0.024
        : 0.036
      : activationFn === 'relu'
      ? 0.042
      : 0.058;
  const validationLoss = Number(
    Math.max(
      trainingLoss + (lossFn === 'mse' ? 0.012 : 0.02),
      trainingLoss + valGap + Math.cos(safeEpoch * 1.1) * (lossFn === 'mse' ? 0.005 : 0.009)
    ).toFixed(3)
  );
  const accuracyScale = lossFn === 'mse' ? 96 : 52;
  const accuracyPct = Math.min(
    97,
    Math.max(46, Math.round(97 - trainingLoss * accuracyScale))
  );

  return {
    epoch: safeEpoch,
    trainingLoss,
    validationLoss,
    alternateLoss,
    accuracyPct,
  };
}

export function buildTrainingLossHistory(
  upToEpoch: number,
  activationFn: ActivationFn,
  totalNeurons: number,
  lossFn: LossFn = 'bce'
): TrainingLossPoint[] {
  const maxEpoch = Math.max(0, Math.round(upToEpoch));
  return Array.from({ length: maxEpoch + 1 }, (_, epoch) =>
    computeTrainingLossPoint(epoch, activationFn, totalNeurons, lossFn)
  );
}

export interface LossFunctionGuide {
  id: LossFn;
  shortLabel: 'BCE' | 'MSE';
  fullName: string;
  formula: string;
  bestFor: string;
  gradientBehavior: string;
  learningEffect: string;
  examples: string[];
}

export function getLossFunctionGuide(lossFn: LossFn): LossFunctionGuide {
  if (lossFn === 'mse') {
    return {
      id: 'mse',
      shortLabel: 'MSE',
      fullName: 'Mean Squared Error (MSE)',
      formula: 'L = (1 / n) · Σ (y - ŷ)²',
      bestFor: 'Regression & Continuous Numerical Predictions',
      gradientBehavior:
        'Squares the gap between target and prediction, giving larger numerical outliers heavier weight while producing smaller, gentler gradients near 0–1 probability bounds.',
      learningEffect:
        'Ideal when output magnitude matters (e.g., predicting dollars or temperatures). On classification tasks, squared error slows down early probability updates compared to log-loss.',
      examples: ['House price prediction', 'Demand & temperature forecasting', 'Continuous sensor readings'],
    };
  }
  return {
    id: 'bce',
    shortLabel: 'BCE',
    fullName: 'Binary Cross Entropy (BCE)',
    formula: 'L = -[y·log(ŷ) + (1 - y)·log(1 - ŷ)]',
    bestFor: 'Binary Classification & Probability Estimation',
    gradientBehavior:
      'Applies a logarithmic penalty that spikes sharply whenever the network is confidently wrong, keeping gradients strong even when predicted probabilities start far from the label.',
      learningEffect:
        'Drives rapid early probability separation toward 0% or 100%, making classification networks converge faster and avoid flat gradient plateaus.',
    examples: ['Spam vs. legitimate email', 'Customer churn (Yes / No)', 'Medical screening confidence'],
  };
}

export function getActivationConvergenceNote(activationFn: ActivationFn): {
  title: string;
  speedLabel: string;
  summary: string;
} {
  if (activationFn === 'relu') {
    return {
      title: 'ReLU (Rectified Linear Unit)',
      speedLabel: 'Fast Convergence',
      summary:
        'Passes positive signals straight through (max(0, x)), preserving gradient strength so loss drops rapidly toward a lower floor.',
    };
  }
  return {
    title: 'Sigmoid (Logistic Curve)',
    speedLabel: 'Gradual / Early Plateau',
    summary:
      'Compresses every weighted sum between 0 and 1, shrinking gradients at the extremes and causing slower loss reduction and a higher plateau.',
  };
}

export interface HoverLegendInfo {
  kind: 'node' | 'edge';
  title: string;
  badgeText: string;
  accentColor: string;
  primaryLine: string;
  colorMeanings: Array<{ color: string; label: string; detail: string }>;
}

export function getEdgeLegendInfo(params: {
  stage: 1 | 2 | 3;
  fromLabel: string;
  toLabel: string;
  weight: number;
}): HoverLegendInfo {
  const { stage, fromLabel, toLabel, weight } = params;
  const positive = weight >= 0;
  const positiveColor =
    stage === 1 ? '#22D3EE' : stage === 2 ? '#3B82F6' : '#A78BFA';
  const positiveColorName =
    stage === 1 ? 'Cyan' : stage === 2 ? 'Electric Blue' : 'Purple';
  const accentColor = positive ? positiveColor : '#F472B6';
  const formattedWeight = `${weight >= 0 ? '+' : ''}${weight.toFixed(2)}`;
  const strength =
    Math.abs(weight) >= 0.6
      ? 'Strong'
      : Math.abs(weight) >= 0.3
      ? 'Moderate'
      : 'Light';

  return {
    kind: 'edge',
    title: `Connection · ${fromLabel} → ${toLabel}`,
    badgeText: `Weight ${formattedWeight}`,
    accentColor,
    primaryLine: positive
      ? `${strength} positive weight amplifies the signal carried forward.`
      : `${strength} negative weight suppresses or pushes against the target neuron.`,
    colorMeanings: [
      {
        color: positiveColor,
        label: `${positiveColorName} Line`,
        detail: `Positive Stage ${stage} weight boosts neuron activation.`,
      },
      {
        color: '#F472B6',
        label: 'Pink Line',
        detail: 'Negative weight inhibits or lowers the weighted sum.',
      },
      {
        color: '#475569',
        label: 'Line Width & Slate',
        detail: 'Thicker stroke = larger |weight|; slate = unselected path.',
      },
    ],
  };
}

export function getNodeLegendInfo(params: {
  layer: 'input' | 'hidden1' | 'hidden2' | 'output';
  label: string;
  valueText: string;
  firing: boolean;
  activationFn: ActivationFn;
}): HoverLegendInfo {
  const { layer, label, valueText, firing, activationFn } = params;

  if (layer === 'input') {
    return {
      kind: 'node',
      title: `Input Node · ${label}`,
      badgeText: `Value ${valueText}`,
      accentColor: '#3B82F6',
      primaryLine: 'Raw normalized feature (0.00–1.00) fed into Hidden Layer 1.',
      colorMeanings: [
        {
          color: '#3B82F6',
          label: 'Blue Ring',
          detail: 'Input neuron holding a user-adjusted feature signal.',
        },
        {
          color: '#22D3EE',
          label: 'Cyan Ring',
          detail: 'Currently selected neuron shown in the Neuron Inspector.',
        },
      ],
    };
  }

  if (layer === 'output') {
    return {
      kind: 'node',
      title: `Output Node · ${label}`,
      badgeText: `Prob ${valueText}`,
      accentColor: '#A78BFA',
      primaryLine: 'Softmax normalizes raw scores into final class probabilities.',
      colorMeanings: [
        {
          color: '#A78BFA',
          label: 'Violet Ring',
          detail: 'Output prediction node displaying class confidence %.',
        },
        {
          color: '#22D3EE',
          label: 'Cyan Ring',
          detail: 'Selected neuron highlighting incoming weighted lines.',
        },
      ],
    };
  }

  const layerTitle = layer === 'hidden1' ? 'Hidden Layer 1' : 'Hidden Layer 2';
  const activeColor = layer === 'hidden1' ? '#22D3EE' : '#6366F1';
  const activeColorName = layer === 'hidden1' ? 'Cyan Border' : 'Indigo Border';

  return {
    kind: 'node',
    title: `${layerTitle} · ${label}`,
    badgeText: `${activationFn.toUpperCase()} ${valueText}`,
    accentColor: firing ? activeColor : '#64748B',
    primaryLine: firing
      ? 'Neuron is active (firing) and passing non-zero signal downstream.'
      : 'Neuron output is near zero (muted or clipped by activation).',
    colorMeanings: [
      {
        color: activeColor,
        label: activeColorName,
        detail: 'Firing neuron (activation > 0.04) contributing forward.',
      },
      {
        color: '#334155',
        label: 'Slate Border',
        detail: 'Inactive/quiet neuron (e.g., negative sum clipped to 0 by ReLU).',
      },
    ],
  };
}

export interface SimulatorControlTooltip {
  title: string;
  description: string;
  trainingEffect: string;
}

export function getLayerCapacityTooltip(
  layerLabel: string,
  action: 'increase' | 'decrease'
): SimulatorControlTooltip {
  const verb = action === 'increase' ? 'Add' : 'Remove';
  if (layerLabel === 'Input Layer') {
    return {
      title: `${verb} ${layerLabel} Neuron`,
      description: `${action === 'increase' ? 'Adds' : 'Removes'} a normalized input feature channel (x1–x6) entering the model.`,
      trainingEffect:
        action === 'increase'
          ? 'More input features expand incoming weights to Hidden Layer 1 and enrich feature signals.'
          : 'Fewer input features simplify the incoming feature vector and reduce connection count.',
    };
  }
  if (layerLabel === 'Output Layer') {
    return {
      title: `${verb} ${layerLabel} Class`,
      description: `${action === 'increase' ? 'Adds' : 'Removes'} a target classification category in the Softmax output layer.`,
      trainingEffect:
        'Changes how probability mass splits across classes (probabilities always sum to 100%).',
    };
  }
  return {
    title: `${verb} ${layerLabel} Neuron`,
    description: `${action === 'increase' ? 'Adds' : 'Removes'} a processing unit inside ${layerLabel}.`,
    trainingEffect:
      action === 'increase'
        ? 'Increases representational capacity and parameters, helping lower final training loss.'
        : 'Reduces network parameters for lighter, simpler feature transformations.',
  };
}

export function getInputFeatureTooltip(featureIndex: number): SimulatorControlTooltip {
  return {
    title: `Input Signal x${featureIndex + 1}`,
    description: `Scales input feature x${featureIndex + 1} between 0.00 and 1.00 before multiplying by Hidden Layer 1 weights.`,
    trainingEffect:
      'Immediately alters every downstream weighted sum, neuron activation, and final Softmax prediction.',
  };
}

export function getBiasSliderTooltip(): SimulatorControlTooltip {
  return {
    title: 'Hidden Layer Bias',
    description: 'Shifts the activation threshold (-0.80 to +0.80) added to every hidden neuron weighted sum.',
    trainingEffect:
      'Positive bias helps more neurons fire (especially under ReLU); negative bias suppresses weak signals.',
  };
}

export function formatConnectionWeight(weight: number): string {
  if (Math.abs(weight) < 0.005) return '0.00';
  return `${weight > 0 ? '+' : ''}${weight.toFixed(2)}`;
}

export function computeEdgeLabelPosition(params: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  fromIdx: number;
  toIdx: number;
  toCount: number;
}): { x: number; y: number } {
  const { x1, y1, x2, y2, fromIdx, toIdx, toCount } = params;
  const baseT = toCount <= 1 ? 0.5 : 0.22 + (toIdx / (toCount - 1)) * 0.56;
  const stagger = fromIdx % 2 === 0 ? -0.05 : 0.05;
  const t = Math.max(0.18, Math.min(0.82, baseT + stagger));
  return {
    x: Number((x1 + (x2 - x1) * t).toFixed(1)),
    y: Number((y1 + (y2 - y1) * t).toFixed(1)),
  };
}

export interface StageEdgeInput {
  edgeKey: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  fromIdx: number;
  toIdx: number;
  toCount: number;
}

export function layoutStageEdgeLabels(
  edges: StageEdgeInput[],
  minDx = 35,
  minDy = 15
): Record<string, { x: number; y: number }> {
  const placed: Array<{ x: number; y: number }> = [];
  const result: Record<string, { x: number; y: number }> = {};

  const offsets = [0, 0.14, -0.14, 0.26, -0.26, 0.36, -0.36, 0.44, -0.44];

  for (const edge of edges) {
    const baseT =
      edge.toCount <= 1 ? 0.5 : 0.22 + (edge.toIdx / (edge.toCount - 1)) * 0.56;
    const stagger = edge.fromIdx % 2 === 0 ? -0.05 : 0.05;

    let chosen: { x: number; y: number } | null = null;
    for (const off of offsets) {
      const t = Math.max(0.14, Math.min(0.86, baseT + stagger + off));
      const cx = edge.x1 + (edge.x2 - edge.x1) * t;
      const cy = edge.y1 + (edge.y2 - edge.y1) * t;
      const collides = placed.some(
        (p) => Math.abs(p.x - cx) < minDx && Math.abs(p.y - cy) < minDy
      );
      if (!collides) {
        chosen = { x: Number(cx.toFixed(1)), y: Number(cy.toFixed(1)) };
        break;
      }
    }

    if (!chosen) {
      chosen = computeEdgeLabelPosition(edge);
    }

    placed.push(chosen);
    result[edge.edgeKey] = chosen;
  }

  return result;
}

// ==========================================
// 4. NLP Preprocessing & Sentiment Lexicon
// ==========================================

const STOPWORDS = new Set([
  'the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but', 'in',
  'with', 'to', 'for', 'of', 'it', 'this', 'that', 'was', 'are', 'be', 'very',
  'my', 'our', 'we', 'i', 'has', 'have',
]);

const POSITIVE_WORDS: Record<string, number> = {
  fast: 0.7,
  great: 0.85,
  excellent: 0.95,
  intuitive: 0.8,
  helpful: 0.75,
  reliable: 0.8,
  smooth: 0.7,
  clear: 0.65,
  love: 0.9,
  impressive: 0.85,
  accurate: 0.8,
  responsive: 0.75,
  easy: 0.65,
  amazing: 0.95,
};

const NEGATIVE_WORDS: Record<string, number> = {
  slow: -0.75,
  confusing: -0.8,
  broken: -0.9,
  delay: -0.65,
  delayed: -0.7,
  crash: -0.95,
  crashed: -0.95,
  frustrating: -0.85,
  poor: -0.8,
  bad: -0.75,
  error: -0.7,
  errors: -0.7,
  hard: -0.5,
  expensive: -0.6,
  issue: -0.6,
  issues: -0.6,
};

function simpleStem(word: string): string {
  if (word.length <= 4) return word;
  if (word.endsWith('ing')) return word.slice(0, -3);
  if (word.endsWith('ed')) return word.slice(0, -2);
  if (word.endsWith('ly')) return word.slice(0, -2);
  if (word.endsWith('es')) return word.slice(0, -2);
  if (word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
  return word;
}

export function analyzeNlpText(text: string): SentimentResult {
  const rawParts = text.trim().split(/\s+/).filter(Boolean);
  const tokens: TokenAnalysis[] = [];

  let totalWeight = 0;
  let sentimentHits = 0;
  let positiveCount = 0;
  let negativeCount = 0;
  let neutralCount = 0;

  for (const raw of rawParts) {
    const normalized = raw.toLowerCase().replace(/[^a-z0-9'-]/g, '');
    if (!normalized) continue;
    const isStopword = STOPWORDS.has(normalized);
    const stem = simpleStem(normalized);

    let weight = 0;
    if (POSITIVE_WORDS[normalized] !== undefined) {
      weight = POSITIVE_WORDS[normalized];
    } else if (NEGATIVE_WORDS[normalized] !== undefined) {
      weight = NEGATIVE_WORDS[normalized];
    }

    let sentiment: TokenAnalysis['sentiment'] = 'neutral';
    if (weight > 0) {
      sentiment = 'positive';
      positiveCount += 1;
      sentimentHits += 1;
      totalWeight += weight;
    } else if (weight < 0) {
      sentiment = 'negative';
      negativeCount += 1;
      sentimentHits += 1;
      totalWeight += weight;
    } else if (!isStopword) {
      neutralCount += 1;
    }

    tokens.push({
      raw,
      normalized,
      isStopword,
      stem,
      sentiment,
      weight,
    });
  }

  const score =
    sentimentHits === 0
      ? 0
      : Number(Math.max(-1, Math.min(1, totalWeight / Math.max(1.5, sentimentHits))).toFixed(2));

  const label: SentimentResult['label'] =
    score >= 0.15 ? 'Positive' : score <= -0.15 ? 'Negative' : 'Neutral';

  return {
    tokens,
    score,
    label,
    positiveCount,
    negativeCount,
    neutralCount,
  };
}

// ==========================================
// 5. Generative AI: Token Sampling & RAG Similarity
// ==========================================

export interface TokenCandidate {
  token: string;
  baseLogit: number;
  probability: number;
}

export function computeSoftmaxTokenDistribution(
  candidates: Array<{ token: string; baseLogit: number }>,
  temperature: number,
  topK: number
): TokenCandidate[] {
  const safeTemp = Math.max(0.1, temperature);
  const sorted = [...candidates].sort((a, b) => b.baseLogit - a.baseLogit);
  const active = sorted.slice(0, Math.max(1, topK));

  const maxLogit = active[0]?.baseLogit ?? 0;
  const exps = active.map((c) => Math.exp((c.baseLogit - maxLogit) / safeTemp));
  const sumExps = exps.reduce((a, b) => a + b, 0);

  return sorted.map((c, idx) => {
    if (idx >= active.length) {
      return { ...c, probability: 0 };
    }
    return {
      ...c,
      probability: Number(((exps[idx] / sumExps) * 100).toFixed(1)),
    };
  });
}

export function cosineSimilarity(a: [number, number], b: [number, number]): number {
  const dot = a[0] * b[0] + a[1] * b[1];
  const magA = Math.hypot(a[0], a[1]);
  const magB = Math.hypot(b[0], b[1]);
  if (magA === 0 || magB === 0) return 0;
  return Number((dot / (magA * magB)).toFixed(3));
}

export function retrieveTopChunks(
  queryVector: [number, number],
  chunks: DocumentChunk[],
  topN = 2
): RagSearchResult[] {
  return chunks
    .map((chunk) => ({
      chunk,
      similarity: cosineSimilarity(queryVector, chunk.vector),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topN);
}

// ==========================================
// 6. MLOps Drift & Rollout Simulator
// ==========================================

export interface MlopsMetrics {
  simulatedAccuracy: number;
  driftStatus: 'Nominal' | 'Drift Warning' | 'Retrain Triggered';
  p95LatencyMs: number;
  canaryErrorRate: number;
}

export function computeMlopsMetrics(
  dataDriftPct: number,
  canaryTrafficPct: number
): MlopsMetrics {
  const simulatedAccuracy = Number(
    Math.max(62, 94.2 - dataDriftPct * 0.42).toFixed(1)
  );
  const driftStatus: MlopsMetrics['driftStatus'] =
    dataDriftPct >= 35
      ? 'Retrain Triggered'
      : dataDriftPct >= 18
      ? 'Drift Warning'
      : 'Nominal';
  const p95LatencyMs = Math.round(38 + canaryTrafficPct * 0.24 + dataDriftPct * 0.15);
  const canaryErrorRate = Number((0.4 + dataDriftPct * 0.06).toFixed(2));

  return {
    simulatedAccuracy,
    driftStatus,
    p95LatencyMs,
    canaryErrorRate,
  };
}

// ==========================================
// 7. Project Studio: Customer Churn & Vision Filter
// ==========================================

export function computeChurnRisk(
  tenureMonths: number,
  monthlySpend: number,
  supportTickets: number
): { riskScore: number; riskLevel: 'Low Risk' | 'Moderate Risk' | 'High Risk'; drivers: string[] } {
  const tenureFactor = Math.max(0, (24 - tenureMonths) * 1.4);
  const ticketFactor = supportTickets * 9.5;
  const spendFactor = monthlySpend > 110 ? 12 : monthlySpend < 45 ? 4 : 7;

  const raw = 12 + tenureFactor + ticketFactor + spendFactor;
  const riskScore = Math.max(5, Math.min(96, Math.round(raw)));

  const riskLevel =
    riskScore >= 65 ? 'High Risk' : riskScore >= 38 ? 'Moderate Risk' : 'Low Risk';

  const drivers: string[] = [];
  if (tenureMonths < 10) drivers.push('Short customer tenure (< 10 months)');
  if (supportTickets >= 3) drivers.push('Elevated recent support tickets');
  if (monthlySpend > 110) drivers.push('High monthly plan sensitivity');
  if (drivers.length === 0) drivers.push('Stable engagement and long tenure');

  return { riskScore, riskLevel, drivers };
}
