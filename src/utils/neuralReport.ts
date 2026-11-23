import { jsPDF } from 'jspdf';
import {
  getActivationConvergenceNote,
  type ActivationFn,
  type LossFn,
  type TrainingLossPoint,
} from './simulations';

export interface NeuralExperimentReportInput {
  inputCount: number;
  hidden1Count: number;
  hidden2Count: number;
  outputCount: number;
  inputValues: number[];
  bias: number;
  activationFn: ActivationFn;
  lossFn?: LossFn;
  speed: 0.5 | 1 | 2;
  trainingEpoch: number;
  maxEpochs: number;
  lossHistory: TrainingLossPoint[];
  outputProbabilities: number[];
  outputLabels: string[];
  generatedAt?: Date;
}

export interface NeuralExperimentReport {
  experimentId: string;
  generatedAtIso: string;
  generatedAtDisplay: string;
  architecturePattern: string;
  filename: string;
  simulationDisclaimer: string;
  layerBreakdown: {
    input: number;
    hidden1: number;
    hidden2: number;
    output: number;
    totalNeurons: number;
    totalConnections: number;
  };
  hyperparameters: {
    activationFn: ActivationFn;
    activationLabel: 'ReLU' | 'Sigmoid';
    alternateLabel: 'Sigmoid' | 'ReLU';
    lossFn: LossFn;
    lossFnShort: 'BCE' | 'MSE';
    lossFnLabel: 'Binary Cross Entropy (BCE)' | 'Mean Squared Error (MSE)';
    bias: number;
    biasFormatted: string;
    speedLabel: string;
    inputs: Array<{ name: string; value: number }>;
  };
  results: {
    completedEpochs: number;
    maxEpochs: number;
    initialLoss: number;
    finalTrainingLoss: number;
    finalValidationLoss: number;
    alternateFinalLoss: number;
    lossReductionPct: number;
    simulatedAccuracyPct: number;
    topPredictionLabel: string;
    topPredictionPct: number;
    predictions: Array<{ label: string; probabilityPct: number }>;
  };
  convergenceTakeaway: {
    title: string;
    speedLabel: string;
    summary: string;
  };
  lossHistory: TrainingLossPoint[];
}

export function buildNeuralExperimentReport(
  input: NeuralExperimentReportInput
): NeuralExperimentReport {
  const generatedAt = input.generatedAt ?? new Date();
  const architecturePattern = `${input.inputCount}-${input.hidden1Count}-${input.hidden2Count}-${input.outputCount}`;
  const totalNeurons =
    input.inputCount + input.hidden1Count + input.hidden2Count + input.outputCount;
  const totalConnections =
    input.inputCount * input.hidden1Count +
    input.hidden1Count * input.hidden2Count +
    input.hidden2Count * input.outputCount;

  const activationLabel = input.activationFn === 'relu' ? 'ReLU' : 'Sigmoid';
  const alternateLabel = input.activationFn === 'relu' ? 'Sigmoid' : 'ReLU';
  const lossFn: LossFn = input.lossFn ?? 'bce';
  const lossFnShort = lossFn === 'mse' ? 'MSE' : 'BCE';
  const lossFnLabel =
    lossFn === 'mse' ? 'Mean Squared Error (MSE)' : 'Binary Cross Entropy (BCE)';
  const biasFormatted = `${input.bias >= 0 ? '+' : ''}${input.bias.toFixed(2)}`;

  const activeInputs = input.inputValues.slice(0, input.inputCount).map((val, idx) => ({
    name: `x${idx + 1}`,
    value: Number(val.toFixed(2)),
  }));

  const safeHistory = input.lossHistory.length > 0
    ? input.lossHistory
    : [
        {
          epoch: 0,
          trainingLoss: 0.915,
          validationLoss: 0.957,
          alternateLoss: 0.88,
          accuracyPct: 49,
        },
      ];
  const initialPoint = safeHistory[0];
  const finalPoint = safeHistory[safeHistory.length - 1];
  const lossReductionPct =
    initialPoint.trainingLoss > 0
      ? Math.max(
          0,
          Math.round(
            ((initialPoint.trainingLoss - finalPoint.trainingLoss) /
              initialPoint.trainingLoss) *
              100
          )
        )
      : 0;

  const predictions = input.outputProbabilities
    .slice(0, input.outputCount)
    .map((prob, idx) => ({
      label: input.outputLabels[idx] ?? `Class ${idx + 1}`,
      probabilityPct: Math.round(prob * 100),
    }));

  const topPrediction = predictions.reduce(
    (best, curr) => (curr.probabilityPct > best.probabilityPct ? curr : best),
    predictions[0] ?? { label: 'Class A', probabilityPct: 0 }
  );

  const generatedAtIso = generatedAt.toISOString();
  const generatedAtDisplay = generatedAt.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  const experimentId = `NN-${architecturePattern}-${input.activationFn.toUpperCase()}-${lossFnShort}-E${input.trainingEpoch}`;
  const filename = `intel-aiml-lab-nn-report-${architecturePattern}-${input.activationFn}-${lossFn}.pdf`;

  return {
    experimentId,
    generatedAtIso,
    generatedAtDisplay,
    architecturePattern,
    filename,
    simulationDisclaimer:
      'Educational Simulation Report: Metrics, weights, and convergence curves reflect interactive learning simulations rather than real production model training.',
    layerBreakdown: {
      input: input.inputCount,
      hidden1: input.hidden1Count,
      hidden2: input.hidden2Count,
      output: input.outputCount,
      totalNeurons,
      totalConnections,
    },
    hyperparameters: {
      activationFn: input.activationFn,
      activationLabel,
      alternateLabel,
      lossFn,
      lossFnShort,
      lossFnLabel,
      bias: input.bias,
      biasFormatted,
      speedLabel: `${input.speed}x`,
      inputs: activeInputs,
    },
    results: {
      completedEpochs: input.trainingEpoch,
      maxEpochs: input.maxEpochs,
      initialLoss: initialPoint.trainingLoss,
      finalTrainingLoss: finalPoint.trainingLoss,
      finalValidationLoss: finalPoint.validationLoss,
      alternateFinalLoss: finalPoint.alternateLoss,
      lossReductionPct,
      simulatedAccuracyPct: finalPoint.accuracyPct,
      topPredictionLabel: topPrediction.label,
      topPredictionPct: topPrediction.probabilityPct,
      predictions,
    },
    convergenceTakeaway: getActivationConvergenceNote(input.activationFn),
    lossHistory: safeHistory,
  };
}

export function generateNeuralExperimentPdf(
  report: NeuralExperimentReport
): ArrayBuffer {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: false,
  });

  const pageWidth = 210;
  const marginX = 14;
  const contentWidth = pageWidth - marginX * 2; // 182 mm

  // 1. Header Banner (Deep Navy + Cyan Accent)
  doc.setFillColor(7, 13, 25); // #070D19
  doc.rect(0, 0, pageWidth, 29, 'F');
  doc.setFillColor(34, 211, 238); // #22D3EE
  doc.rect(0, 0, 3.5, 29, 'F');

  doc.setTextColor(103, 232, 249);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('INTEL AI/ML INTERACTIVE LAB  |  DEEP LEARNING LAB', marginX, 9.5);

  doc.setTextColor(248, 250, 252);
  doc.setFontSize(15.5);
  doc.text('Neural Network Experiment Summary Report', marginX, 17.5);

  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(
    `Experiment ID: ${report.experimentId}   ·   Generated: ${report.generatedAtDisplay}`,
    marginX,
    24
  );

  // 2. Educational Simulation Disclaimer Banner
  let y = 33;
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(marginX, y, contentWidth, 8.5, 1.5, 1.5, 'FD');
  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text(report.simulationDisclaimer, marginX + 3, y + 5.3);

  // 3. Top KPI Result Cards (4 columns)
  y = 45;
  const kpiGap = 3.5;
  const kpiWidth = (contentWidth - kpiGap * 3) / 4;
  const kpiCards = [
    {
      label: 'FINAL TRAINING LOSS',
      value: report.results.finalTrainingLoss.toFixed(3),
      sub: `Initial: ${report.results.initialLoss.toFixed(3)}`,
      accent: [8, 145, 178] as const,
    },
    {
      label: 'LOSS REDUCTION',
      value: `-${report.results.lossReductionPct}%`,
      sub: `Epoch ${report.results.completedEpochs}/${report.results.maxEpochs}`,
      accent: [124, 58, 237] as const,
    },
    {
      label: 'SIMULATED ACCURACY',
      value: `${report.results.simulatedAccuracyPct}%`,
      sub: `Val Loss: ${report.results.finalValidationLoss.toFixed(3)}`,
      accent: [37, 99, 235] as const,
    },
    {
      label: 'ACTIVE CONFIGURATION',
      value: `${report.hyperparameters.activationLabel} · ${report.hyperparameters.lossFnShort}`,
      sub: `Topology: ${report.architecturePattern}`,
      accent: [15, 118, 110] as const,
    },
  ];

  kpiCards.forEach((card, idx) => {
    const cx = marginX + idx * (kpiWidth + kpiGap);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(cx, y, kpiWidth, 21, 1.8, 1.8, 'FD');
    doc.setFillColor(card.accent[0], card.accent[1], card.accent[2]);
    doc.rect(cx, y, kpiWidth, 1.5, 'F');

    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text(card.label, cx + 3, y + 6.5);

    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(card.value, cx + 3, y + 13.5);

    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text(card.sub, cx + 3, y + 18.5);
  });

  // 4. Two-Column Experiment Configuration Cards
  y = 70;
  const colGap = 4;
  const colWidth = (contentWidth - colGap) / 2;

  // Left Card: Network Architecture
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(marginX, y, colWidth, 34, 1.8, 1.8, 'FD');
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('Network Architecture', marginX + 3.5, y + 6.5);

  const archRows: Array<[string, string]> = [
    ['Layer Topology', report.architecturePattern],
    [
      'Layer Neuron Counts',
      `In ${report.layerBreakdown.input} / H1 ${report.layerBreakdown.hidden1} / H2 ${report.layerBreakdown.hidden2} / Out ${report.layerBreakdown.output}`,
    ],
    ['Total Neurons', `${report.layerBreakdown.totalNeurons}`],
    ['Weighted Connections', `${report.layerBreakdown.totalConnections}`],
  ];
  archRows.forEach(([k, v], idx) => {
    const ry = y + 12.5 + idx * 5.2;
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(k, marginX + 3.5, ry);
    doc.setTextColor(15, 23, 42);
    doc.setFont('courier', 'bold');
    doc.text(v, marginX + colWidth - 3.5, ry, { align: 'right' });
  });

  // Right Card: Hyperparameters & Input Signals
  const rightX = marginX + colWidth + colGap;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(rightX, y, colWidth, 34, 1.8, 1.8, 'FD');
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('Hyperparameters & Input Signals', rightX + 3.5, y + 6.5);

  const inputVecText = report.hyperparameters.inputs
    .map((inp) => `${inp.name}:${inp.value.toFixed(2)}`)
    .join('  ');

  const paramRows: Array<[string, string]> = [
    ['Activation / Loss', `${report.hyperparameters.activationLabel} / ${report.hyperparameters.lossFnShort}`],
    ['Hidden Layer Bias', report.hyperparameters.biasFormatted],
    ['Playback Speed', report.hyperparameters.speedLabel],
    [
      `Alt Baseline (${report.hyperparameters.alternateLabel})`,
      `${report.results.alternateFinalLoss.toFixed(3)} @ Ep ${report.results.completedEpochs}`,
    ],
  ];
  paramRows.forEach(([k, v], idx) => {
    const ry = y + 12.5 + idx * 4.7;
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(k, rightX + 3.5, ry);
    doc.setTextColor(15, 23, 42);
    doc.setFont('courier', 'bold');
    doc.text(v, rightX + colWidth - 3.5, ry, { align: 'right' });
  });
  doc.setTextColor(71, 85, 105);
  doc.setFont('courier', 'normal');
  doc.setFontSize(7.3);
  doc.text(`Inputs: ${inputVecText}`, rightX + 3.5, y + 31.6);

  // 5. Vector Loss Convergence Chart
  y = 108;
  const chartBoxH = 52;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(marginX, y, contentWidth, chartBoxH, 1.8, 1.8, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text(
    `Loss Convergence (${report.hyperparameters.lossFnShort} · ${report.hyperparameters.activationLabel} vs ${report.hyperparameters.alternateLabel})`,
    marginX + 3.5,
    y + 6.5
  );

  // Legend top-right
  const legendItems = [
    { label: `${report.hyperparameters.activationLabel} Train`, color: [8, 145, 178] as const },
    { label: `${report.hyperparameters.activationLabel} Val`, color: [124, 58, 237] as const },
    { label: `${report.hyperparameters.alternateLabel} Base`, color: [217, 119, 6] as const },
  ];
  let lx = marginX + contentWidth - 4;
  legendItems.slice().reverse().forEach((item) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    const w = doc.getTextWidth(item.label);
    lx -= w;
    doc.setTextColor(71, 85, 105);
    doc.text(item.label, lx, y + 6.3);
    lx -= 5;
    doc.setFillColor(item.color[0], item.color[1], item.color[2]);
    doc.rect(lx, y + 4.3, 3.5, 1.8, 'F');
    lx -= 4;
  });

  // Plot area
  const px0 = marginX + 14;
  const py0 = y + 11;
  const pw = contentWidth - 20;
  const ph = 33;
  const maxEpoch = Math.max(1, report.results.maxEpochs);

  // Horizontal grid lines (0.00, 0.25, 0.50, 0.75, 1.00)
  [0, 0.25, 0.5, 0.75, 1.0].forEach((tick) => {
    const gy = py0 + ph - tick * ph;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(px0, gy, px0 + pw, gy);
    doc.setTextColor(100, 116, 139);
    doc.setFont('courier', 'normal');
    doc.setFontSize(7);
    doc.text(tick.toFixed(2), px0 - 2, gy + 1, { align: 'right' });
  });

  // X-axis epoch ticks
  [0, 3, 6, 9, 12].forEach((ep) => {
    const gx = px0 + (ep / maxEpoch) * pw;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(gx, py0, gx, py0 + ph);
    doc.setTextColor(100, 116, 139);
    doc.setFont('courier', 'normal');
    doc.setFontSize(7);
    doc.text(`Ep ${ep}`, gx, py0 + ph + 4, { align: 'center' });
  });

  const drawCurve = (
    extractor: (pt: TrainingLossPoint) => number,
    color: readonly [number, number, number],
    width: number
  ) => {
    doc.setDrawColor(color[0], color[1], color[2]);
    doc.setLineWidth(width);
    for (let i = 1; i < report.lossHistory.length; i++) {
      const prev = report.lossHistory[i - 1];
      const curr = report.lossHistory[i];
      const x1 = px0 + (prev.epoch / maxEpoch) * pw;
      const y1 = py0 + ph - Math.min(1, Math.max(0, extractor(prev))) * ph;
      const x2 = px0 + (curr.epoch / maxEpoch) * pw;
      const y2 = py0 + ph - Math.min(1, Math.max(0, extractor(curr))) * ph;
      doc.line(x1, y1, x2, y2);
    }
  };

  drawCurve((p) => p.alternateLoss, [217, 119, 6], 0.5);
  drawCurve((p) => p.validationLoss, [124, 58, 237], 0.55);
  drawCurve((p) => p.trainingLoss, [8, 145, 178], 0.85);

  // Highlight final training loss point
  const lastPt = report.lossHistory[report.lossHistory.length - 1];
  const lastX = px0 + (lastPt.epoch / maxEpoch) * pw;
  const lastY = py0 + ph - Math.min(1, Math.max(0, lastPt.trainingLoss)) * ph;
  doc.setFillColor(8, 145, 178);
  doc.circle(lastX, lastY, 1.3, 'F');

  // 6. Output Predictions & Activation Takeaway (2 columns)
  y = 164;
  const sectionH = 34;

  // Left: Output Predictions
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(marginX, y, colWidth, sectionH, 1.8, 1.8, 'FD');
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('Output Softmax Predictions', marginX + 3.5, y + 6.5);

  report.results.predictions.forEach((pred, idx) => {
    const py = y + 11.5 + idx * 5.3;
    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', idx === 0 || pred.label === report.results.topPredictionLabel ? 'bold' : 'normal');
    doc.setFontSize(8);
    doc.text(pred.label, marginX + 3.5, py + 2.4);

    const barX = marginX + 22;
    const barW = colWidth - 38;
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(barX, py, barW, 2.8, 1, 1, 'F');
    doc.setFillColor(124, 58, 237);
    const fillW = Math.max(1.5, (pred.probabilityPct / 100) * barW);
    doc.roundedRect(barX, py, fillW, 2.8, 1, 1, 'F');

    doc.setTextColor(15, 23, 42);
    doc.setFont('courier', 'bold');
    doc.text(`${pred.probabilityPct}%`, marginX + colWidth - 3.5, py + 2.4, {
      align: 'right',
    });
  });

  // Right: Convergence Takeaway
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(rightX, y, colWidth, sectionH, 1.8, 1.8, 'FD');
  doc.setTextColor(8, 145, 178);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(
    `${report.convergenceTakeaway.title}`,
    rightX + 3.5,
    y + 6.5
  );
  doc.setTextColor(124, 58, 237);
  doc.setFontSize(8);
  doc.text(
    `Convergence Profile: ${report.convergenceTakeaway.speedLabel}`,
    rightX + 3.5,
    y + 11.5
  );

  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const summaryLines = doc.splitTextToSize(
    report.convergenceTakeaway.summary,
    colWidth - 7
  ) as string[];
  doc.text(summaryLines, rightX + 3.5, y + 17);

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text(
    `Top Predicted Output: ${report.results.topPredictionLabel} (${report.results.topPredictionPct}%)`,
    rightX + 3.5,
    y + 30.8
  );

  // 7. Epoch-by-Epoch Training Results Table
  y = 202;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('Epoch-by-Epoch Training & Loss Log', marginX, y + 4);

  const tableY = y + 6.5;
  const rowH = 4.6;
  const headers = [
    'Epoch',
    `${report.hyperparameters.activationLabel} Train Loss`,
    `${report.hyperparameters.activationLabel} Val Loss`,
    `${report.hyperparameters.alternateLabel} Baseline`,
    'Accuracy',
  ];
  const colPositions = [
    marginX + 3,
    marginX + 32,
    marginX + 74,
    marginX + 116,
    marginX + 162,
  ];

  // Table Header
  doc.setFillColor(15, 23, 42);
  doc.rect(marginX, tableY, contentWidth, 5.5, 'F');
  doc.setTextColor(248, 250, 252);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  headers.forEach((h, i) => {
    doc.text(h, colPositions[i], tableY + 3.9);
  });

  // Table Rows
  report.lossHistory.forEach((pt, idx) => {
    const ry = tableY + 5.5 + idx * rowH;
    const isFinal = idx === report.lossHistory.length - 1;
    if (isFinal) {
      doc.setFillColor(224, 242, 254); // soft cyan tint for final result row
      doc.rect(marginX, ry, contentWidth, rowH, 'F');
    } else if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(marginX, ry, contentWidth, rowH, 'F');
    }
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.15);
    doc.line(marginX, ry + rowH, marginX + contentWidth, ry + rowH);

    doc.setTextColor(isFinal ? 8 : 30, isFinal ? 145 : 41, isFinal ? 178 : 59);
    doc.setFont('courier', isFinal ? 'bold' : 'normal');
    doc.setFontSize(7.5);
    doc.text(`${pt.epoch}`, colPositions[0], ry + 3.3);
    doc.text(pt.trainingLoss.toFixed(3), colPositions[1], ry + 3.3);
    doc.text(pt.validationLoss.toFixed(3), colPositions[2], ry + 3.3);
    doc.text(pt.alternateLoss.toFixed(3), colPositions[3], ry + 3.3);
    doc.text(`${pt.accuracyPct}%`, colPositions[4], ry + 3.3);
  });

  // 8. Footer
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(marginX, 282, marginX + contentWidth, 282);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text(
    'Intel AI/ML Interactive Lab  ·  Simulated Deep Learning Experiment Summary',
    marginX,
    287
  );
  doc.text('Page 1 of 1', marginX + contentWidth, 287, { align: 'right' });

  return doc.output('arraybuffer');
}

export function downloadNeuralExperimentPdf(
  report: NeuralExperimentReport
): { filename: string; byteLength: number } {
  const bytes = generateNeuralExperimentPdf(report);
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = report.filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1500);

  return { filename: report.filename, byteLength: bytes.byteLength };
}
