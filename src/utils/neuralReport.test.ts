import test from 'node:test';
import assert from 'node:assert/strict';
import { buildTrainingLossHistory } from './simulations';
import {
  buildNeuralExperimentReport,
  generateNeuralExperimentPdf,
} from './neuralReport';

test('buildNeuralExperimentReport formats architecture, hyperparameters, and final loss metrics', () => {
  const history = buildTrainingLossHistory(12, 'sigmoid', 15);
  const report = buildNeuralExperimentReport({
    inputCount: 4,
    hidden1Count: 5,
    hidden2Count: 4,
    outputCount: 2,
    inputValues: [0.9, 0.5, 0.3, 0.7, 0.4, 0.7],
    bias: -0.25,
    activationFn: 'sigmoid',
    speed: 2,
    trainingEpoch: 12,
    maxEpochs: 12,
    lossHistory: history,
    outputProbabilities: [0.64, 0.36],
    outputLabels: ['Class A', 'Class B'],
    generatedAt: new Date('2026-11-23T10:30:00Z'),
  });

  assert.equal(report.architecturePattern, '4-5-4-2');
  assert.equal(report.experimentId, 'NN-4-5-4-2-SIGMOID-BCE-E12');
  assert.equal(report.filename, 'intel-aiml-lab-nn-report-4-5-4-2-sigmoid-bce.pdf');
  assert.equal(report.layerBreakdown.totalNeurons, 15);
  assert.equal(report.layerBreakdown.totalConnections, 4 * 5 + 5 * 4 + 4 * 2);
  assert.equal(report.hyperparameters.activationLabel, 'Sigmoid');
  assert.equal(report.hyperparameters.lossFnShort, 'BCE');
  assert.equal(report.hyperparameters.biasFormatted, '-0.25');
  assert.equal(report.hyperparameters.inputs.length, 4);
  assert.equal(report.results.finalTrainingLoss, history[12].trainingLoss);
  assert.equal(report.results.topPredictionLabel, 'Class A');
  assert.equal(report.results.topPredictionPct, 64);
  assert.ok(report.results.lossReductionPct > 60);
});

test('generateNeuralExperimentPdf produces valid PDF binary containing experiment configuration and final loss', () => {
  const history = buildTrainingLossHistory(12, 'relu', 13, 'mse');
  const report = buildNeuralExperimentReport({
    inputCount: 3,
    hidden1Count: 4,
    hidden2Count: 4,
    outputCount: 2,
    inputValues: [0.85, 0.55, 0.35],
    bias: 0.1,
    activationFn: 'relu',
    lossFn: 'mse',
    speed: 1,
    trainingEpoch: 12,
    maxEpochs: 12,
    lossHistory: history,
    outputProbabilities: [0.72, 0.28],
    outputLabels: ['Class A', 'Class B'],
    generatedAt: new Date('2026-11-23T10:30:00Z'),
  });

  assert.equal(report.filename, 'intel-aiml-lab-nn-report-3-4-4-2-relu-mse.pdf');
  assert.equal(report.hyperparameters.lossFnShort, 'MSE');

  const buffer = generateNeuralExperimentPdf(report);
  assert.ok(buffer.byteLength > 2000, 'PDF buffer should contain full report content');

  const pdfText = new TextDecoder('latin1').decode(new Uint8Array(buffer));
  assert.ok(pdfText.startsWith('%PDF-'), 'PDF output must begin with %PDF- signature');
  assert.ok(pdfText.includes('%%EOF'), 'PDF output must end cleanly with %%EOF');
  assert.ok(
    pdfText.includes('Neural Network Experiment Summary Report'),
    'PDF must include report title'
  );
  assert.ok(pdfText.includes('3-4-4-2'), 'PDF must include architecture pattern');
  assert.ok(pdfText.includes('MSE'), 'PDF must include active loss function');
  assert.ok(
    pdfText.includes(report.results.finalTrainingLoss.toFixed(3)),
    'PDF must include final training loss value'
  );
});
