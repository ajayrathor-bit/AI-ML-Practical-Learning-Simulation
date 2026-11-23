import { useEffect, useState } from 'react';
import { DL_STEPS } from '../data/curriculum';
import { StepLessonPlayer } from '../components/StepLessonPlayer';
import { SimulationNotice } from '../components/SimulationNotice';
import { NeuralNetworkSimulator } from '../components/NeuralNetworkSimulator';

interface DeepLearningLabProps {
  completedSteps: number[];
  onCompleteStep: (stepIndex: number) => void;
}

export function DeepLearningLab({
  completedSteps,
  onCompleteStep,
}: DeepLearningLabProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [replayNonce, setReplayNonce] = useState(0);

  useEffect(() => {
    onCompleteStep(currentStep);
  }, [currentStep, onCompleteStep]);

  const handleReplay = () => setReplayNonce((n) => n + 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs text-purple-300 font-medium">Module 03 · Neural Networks</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
            Deep Learning Lab
          </h1>
        </div>
        <SimulationNotice />
      </div>

      <StepLessonPlayer
        moduleTitle="Deep Learning Lab"
        steps={DL_STEPS}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        onReplay={handleReplay}
        completedSteps={completedSteps}
      />

      <NeuralNetworkSimulator externalReplayNonce={replayNonce} />
    </div>
  );
}
