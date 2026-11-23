import test from 'node:test';
import assert from 'node:assert/strict';
import type { LearningProgress } from '../types/lab';
import {
  toggleStepCompleted,
  calculateOverallCompletion,
  computeRegressionMSE,
  stepGradientDescent,
  computeClassificationAccuracy,
  assignKMeansClusters,
  simulateStudentOutcomePrediction,
  computeNeuralForwardPass,
  computeDynamicNeuralNetwork,
  computeTrainingLossPoint,
  buildTrainingLossHistory,
  getEdgeLegendInfo,
  getLossFunctionGuide,
  getNodeLegendInfo,
  getLayerCapacityTooltip,
  getInputFeatureTooltip,
  getBiasSliderTooltip,
  formatConnectionWeight,
  computeEdgeLabelPosition,
  layoutStageEdgeLabels,
  analyzeNlpText,
  computeSoftmaxTokenDistribution,
  cosineSimilarity,
  retrieveTopChunks,
  computeMlopsMetrics,
  computeChurnRisk,
} from './simulations';

test('progress helpers record unique completed steps and compute percentage', () => {
  let progress: LearningProgress = { completedSteps: {}, lastVisited: 'home' };
  progress = toggleStepCompleted(progress, 'foundations', 0);
  progress = toggleStepCompleted(progress, 'foundations', 0); // duplicate ignored
  progress = toggleStepCompleted(progress, 'foundations', 2);

  assert.deepEqual(progress.completedSteps.foundations, [0, 2]);

  const summary = calculateOverallCompletion(progress, {
    foundations: 4,
    ml: 4,
  });
  assert.equal(summary.completed, 2);
  assert.equal(summary.total, 8);
  assert.equal(summary.percentage, 25);
});

test('regression MSE and gradient descent move closer to linear fit', () => {
  const points = [
    { id: 1, x: 1, y: 3 },
    { id: 2, x: 2, y: 5 },
    { id: 3, x: 3, y: 7 },
    { id: 4, x: 4, y: 9 },
  ];
  assert.equal(computeRegressionMSE(points, 2, 1), 0);

  const initialMSE = computeRegressionMSE(points, 0.5, 0);
  const next = stepGradientDescent(points, 0.5, 0, 0.05);
  assert.ok(next.mse < initialMSE, 'gradient descent should decrease MSE');
});

test('classification accuracy evaluates boundary labels correctly', () => {
  const points = [
    { id: 1, x: 2, y: 8, label: 1 as const },
    { id: 2, x: 3, y: 9, label: 1 as const },
    { id: 3, x: 2, y: 1, label: 0 as const },
    { id: 4, x: 4, y: 2, label: 0 as const },
  ];
  const result = computeClassificationAccuracy(points, 0.5, 4);
  assert.equal(result.accuracy, 100);
  assert.equal(result.correct, 4);
});

test('k-means assigns nearest centroids and updates centroid positions', () => {
  const points = [
    { id: 1, x: 1, y: 1 },
    { id: 2, x: 2, y: 1 },
    { id: 3, x: 8, y: 8 },
    { id: 4, x: 9, y: 8 },
  ];
  const res = assignKMeansClusters(points, [
    { x: 0, y: 0 },
    { x: 10, y: 10 },
  ]);
  assert.deepEqual(res.assignments, [0, 0, 1, 1]);
  assert.deepEqual(res.nextCentroids[0], { x: 1.5, y: 1 });
  assert.deepEqual(res.nextCentroids[1], { x: 8.5, y: 8 });
});

test('student prediction simulator bounds score and returns classification', () => {
  const high = simulateStudentOutcomePrediction(9, 95);
  assert.equal(high.classification, 'Likely Pass');
  assert.ok(high.passProbability > 80);

  const low = simulateStudentOutcomePrediction(1, 55);
  assert.equal(low.classification, 'Needs Support');
});

test('neural forward pass outputs normalized probabilities summing to ~1', () => {
  const res = computeNeuralForwardPass([0.8, 0.6, 0.2], 0.1, 'relu');
  const sum = res.outputProbabilities[0] + res.outputProbabilities[1];
  assert.ok(Math.abs(sum - 1) < 0.01);
});

test('dynamic 4-layer neural network adapts to variable layer counts and sums output probabilities to ~1', () => {
  const res = computeDynamicNeuralNetwork({
    inputValues: [0.9, 0.4, 0.7, 0.2],
    hidden1Size: 5,
    hidden2Size: 3,
    outputSize: 4,
    hiddenBias: 0.1,
    activationFn: 'sigmoid',
  });
  assert.equal(res.inputs.length, 4);
  assert.equal(res.hidden1Activated.length, 5);
  assert.equal(res.hidden2Activated.length, 3);
  assert.equal(res.outputProbabilities.length, 4);
  const probSum = res.outputProbabilities.reduce((a, b) => a + b, 0);
  assert.ok(Math.abs(probSum - 1) < 0.02);
  assert.ok(res.hidden1Activated.every((v) => v > 0 && v < 1));
});

test('training loss decreases across epochs and updates neuron weights/activations', () => {
  const epoch0 = computeTrainingLossPoint(0, 'relu', 13);
  const epoch6 = computeTrainingLossPoint(6, 'relu', 13);
  const epoch12 = computeTrainingLossPoint(12, 'relu', 13);

  assert.ok(epoch6.trainingLoss < epoch0.trainingLoss);
  assert.ok(epoch12.trainingLoss < epoch6.trainingLoss);
  assert.ok(epoch12.accuracyPct > epoch0.accuracyPct);

  const netStart = computeDynamicNeuralNetwork({
    inputValues: [0.85, 0.55, 0.35],
    hidden1Size: 4,
    hidden2Size: 4,
    outputSize: 2,
    hiddenBias: 0.1,
    activationFn: 'relu',
    trainingEpoch: 0,
  });
  const netTrained = computeDynamicNeuralNetwork({
    inputValues: [0.85, 0.55, 0.35],
    hidden1Size: 4,
    hidden2Size: 4,
    outputSize: 2,
    hiddenBias: 0.1,
    activationFn: 'relu',
    trainingEpoch: 12,
  });
  assert.notDeepEqual(netStart.outputProbabilities, netTrained.outputProbabilities);
});

test('ReLU converges faster to lower loss than Sigmoid and history rebuilds cleanly across epochs', () => {
  const reluHistory = buildTrainingLossHistory(12, 'relu', 13);
  const sigmoidHistory = buildTrainingLossHistory(12, 'sigmoid', 13);

  assert.equal(reluHistory.length, 13);
  assert.equal(sigmoidHistory.length, 13);

  const reluMid = reluHistory[6];
  const sigmoidMid = sigmoidHistory[6];
  const reluEnd = reluHistory[12];
  const sigmoidEnd = sigmoidHistory[12];

  assert.ok(reluMid.trainingLoss < sigmoidMid.trainingLoss, 'ReLU should descend faster by epoch 6');
  assert.ok(reluEnd.trainingLoss < sigmoidEnd.trainingLoss, 'ReLU should converge to lower final loss than Sigmoid');
  assert.equal(reluEnd.alternateLoss, sigmoidEnd.trainingLoss);
  assert.equal(sigmoidEnd.alternateLoss, reluEnd.trainingLoss);
});

test('MSE vs BCE loss curves and guides reflect problem types and gradient scales', () => {
  const bceHistory = buildTrainingLossHistory(12, 'relu', 13, 'bce');
  const mseHistory = buildTrainingLossHistory(12, 'relu', 13, 'mse');

  assert.ok(
    bceHistory[0].trainingLoss > mseHistory[0].trainingLoss,
    'BCE log-loss should start higher than squared error MSE on [0,1] bounds'
  );
  assert.ok(bceHistory[12].trainingLoss < bceHistory[0].trainingLoss);
  assert.ok(mseHistory[12].trainingLoss < mseHistory[0].trainingLoss);

  const bceGuide = getLossFunctionGuide('bce');
  const mseGuide = getLossFunctionGuide('mse');
  assert.equal(bceGuide.shortLabel, 'BCE');
  assert.ok(bceGuide.bestFor.includes('Classification'));
  assert.equal(mseGuide.shortLabel, 'MSE');
  assert.ok(mseGuide.bestFor.includes('Regression'));
});

test('hover legend helpers describe edge weight polarity and node activation states', () => {
  const posEdge = getEdgeLegendInfo({
    stage: 1,
    fromLabel: 'x1',
    toLabel: 'H1 #1',
    weight: 0.72,
  });
  assert.equal(posEdge.kind, 'edge');
  assert.equal(posEdge.badgeText, 'Weight +0.72');
  assert.equal(posEdge.accentColor, '#22D3EE');
  assert.ok(posEdge.colorMeanings.some((m) => m.label.includes('Cyan Line')));

  const negEdge = getEdgeLegendInfo({
    stage: 2,
    fromLabel: 'H1 #1',
    toLabel: 'H2 #2',
    weight: -0.45,
  });
  assert.equal(negEdge.accentColor, '#F472B6');
  assert.equal(negEdge.badgeText, 'Weight -0.45');

  const quietNode = getNodeLegendInfo({
    layer: 'hidden1',
    label: 'Neuron #1',
    valueText: '0.00',
    firing: false,
    activationFn: 'relu',
  });
  assert.equal(quietNode.kind, 'node');
  assert.equal(quietNode.badgeText, 'RELU 0.00');
  assert.equal(quietNode.accentColor, '#64748B');
});

test('control tooltip helpers return informative titles and training impact copy', () => {
  const addHidden = getLayerCapacityTooltip('Hidden Layer 1', 'increase');
  assert.equal(addHidden.title, 'Add Hidden Layer 1 Neuron');
  assert.ok(addHidden.trainingEffect.includes('capacity'));

  const addOut = getLayerCapacityTooltip('Output Layer', 'increase');
  assert.equal(addOut.title, 'Add Output Layer Class');

  const inputTip = getInputFeatureTooltip(0);
  assert.equal(inputTip.title, 'Input Signal x1');
  assert.ok(inputTip.trainingEffect.includes('Softmax'));

  const biasTip = getBiasSliderTooltip();
  assert.equal(biasTip.title, 'Hidden Layer Bias');
  assert.ok(biasTip.trainingEffect.includes('ReLU'));
});

test('edge weight labels format signed numbers and stagger along connection span', () => {
  assert.equal(formatConnectionWeight(0.76), '+0.76');
  assert.equal(formatConnectionWeight(-0.4), '-0.40');
  assert.equal(formatConnectionWeight(0), '0.00');

  const p0 = computeEdgeLabelPosition({
    x1: 136,
    y1: 74,
    x2: 284,
    y2: 159,
    fromIdx: 0,
    toIdx: 1,
    toCount: 4,
  });
  const p1 = computeEdgeLabelPosition({
    x1: 136,
    y1: 159,
    x2: 284,
    y2: 159,
    fromIdx: 1,
    toIdx: 1,
    toCount: 4,
  });
  assert.ok(p0.x > 136 && p0.x < 284);
  assert.notEqual(p0.x, p1.x);
  assert.notEqual(p0.y, p1.y);

  const ys = [74, 159, 245, 330];
  const edges4x4 = ys.flatMap((y1, fromIdx) =>
    ys.map((y2, toIdx) => ({
      edgeKey: `e-${fromIdx}-${toIdx}`,
      x1: 326,
      y1,
      x2: 474,
      y2,
      fromIdx,
      toIdx,
      toCount: 4,
    }))
  );
  const layout = layoutStageEdgeLabels(edges4x4);
  const coords = Object.values(layout);
  assert.equal(coords.length, 16);
  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const overlaps =
        Math.abs(coords[i].x - coords[j].x) < 35 &&
        Math.abs(coords[i].y - coords[j].y) < 15;
      assert.equal(overlaps, false, `Labels ${i} and ${j} should not overlap`);
    }
  }
});

test('NLP analyzer tokenizes, marks stopwords, and classifies sentiment', () => {
  const pos = analyzeNlpText('The platform is fast, intuitive, and reliable.');
  assert.equal(pos.label, 'Positive');
  assert.ok(pos.positiveCount >= 3);
  assert.ok(pos.tokens.some((t) => t.normalized === 'the' && t.isStopword));

  const neg = analyzeNlpText('Very slow and confusing interface with errors.');
  assert.equal(neg.label, 'Negative');
  assert.ok(neg.negativeCount >= 3);
});

test('softmax token distribution respects top-K cutoff and sums to ~100%', () => {
  const dist = computeSoftmaxTokenDistribution(
    [
      { token: 'predict', baseLogit: 4.2 },
      { token: 'classify', baseLogit: 3.1 },
      { token: 'cluster', baseLogit: 1.8 },
      { token: 'ignore', baseLogit: 0.4 },
    ],
    0.7,
    2
  );
  assert.equal(dist[2].probability, 0);
  assert.equal(dist[3].probability, 0);
  const activeSum = dist[0].probability + dist[1].probability;
  assert.ok(Math.abs(activeSum - 100) < 0.5);
});

test('cosine similarity and RAG retrieval rank closest vector first', () => {
  assert.equal(cosineSimilarity([1, 0], [1, 0]), 1);
  assert.equal(cosineSimilarity([1, 0], [0, 1]), 0);

  const chunks = [
    {
      id: 'c1',
      title: 'Chunk 1',
      source: 'Doc A',
      content: 'Unrelated content',
      vector: [0.1, 0.9] as [number, number],
      keywords: ['a'],
    },
    {
      id: 'c2',
      title: 'Chunk 2',
      source: 'Doc B',
      content: 'Matching content',
      vector: [0.95, 0.15] as [number, number],
      keywords: ['b'],
    },
  ];
  const ranked = retrieveTopChunks([0.9, 0.1], chunks, 1);
  assert.equal(ranked[0].chunk.id, 'c2');
});

test('MLOps metrics transition to Retrain Triggered at high drift', () => {
  const nominal = computeMlopsMetrics(8, 15);
  assert.equal(nominal.driftStatus, 'Nominal');

  const highDrift = computeMlopsMetrics(42, 25);
  assert.equal(highDrift.driftStatus, 'Retrain Triggered');
  assert.ok(highDrift.simulatedAccuracy < nominal.simulatedAccuracy);
});

test('churn risk calculator differentiates low vs high risk profiles', () => {
  const low = computeChurnRisk(36, 55, 0);
  assert.equal(low.riskLevel, 'Low Risk');

  const high = computeChurnRisk(3, 130, 5);
  assert.equal(high.riskLevel, 'High Risk');
});
