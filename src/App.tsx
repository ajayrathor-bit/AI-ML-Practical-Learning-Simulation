/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { LabRouteId, LearningProgress } from './types/lab';
import { MODULES } from './data/curriculum';
import {
  calculateOverallCompletion,
  toggleStepCompleted,
} from './utils/simulations';
import { Layout } from './components/Layout';
import { HomeDashboard } from './pages/HomeDashboard';
import { FoundationsLab } from './pages/FoundationsLab';
import { MachineLearningLab } from './pages/MachineLearningLab';
import { DeepLearningLab } from './pages/DeepLearningLab';
import { NlpLab } from './pages/NlpLab';
import { GenAiLab } from './pages/GenAiLab';
import { AgenticAiLab } from './pages/AgenticAiLab';
import { MlopsLab } from './pages/MlopsLab';
import { ProjectStudio } from './pages/ProjectStudio';
import { CareerTransformationStudio } from './pages/CareerTransformationStudio';

const STORAGE_KEY = 'intel-aiml-lab-progress-v1';

const INITIAL_PROGRESS: LearningProgress = {
  completedSteps: {},
  lastVisited: 'home',
};

function loadInitialProgress(): LearningProgress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw) as LearningProgress;
    if (parsed && typeof parsed.completedSteps === 'object') {
      return parsed;
    }
  } catch {
    // Ignore storage read errors in restricted frames
  }
  return INITIAL_PROGRESS;
}

function resolveInitialRoute(): LabRouteId {
  try {
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section');
    if (section === 'career-studio' || params.get('autostart') === '1') {
      return 'career-studio';
    }
  } catch {
    // Ignore URL parse errors
  }
  return 'home';
}

export default function App() {
  const [activeRoute, setActiveRoute] = useState<LabRouteId>(resolveInitialRoute);
  const [studioProject, setStudioProject] = useState<
    'churn' | 'sentiment' | 'doc-assistant' | 'vision' | 'business-assistant'
  >('churn');
  const [progress, setProgress] = useState<LearningProgress>(loadInitialProgress);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage write errors
    }
  }, [progress]);

  const moduleStepCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const m of MODULES) {
      map[m.id] = m.totalSteps;
    }
    return map;
  }, []);

  const completionSummary = useMemo(
    () => calculateOverallCompletion(progress, moduleStepCounts),
    [progress, moduleStepCounts]
  );

  const handleNavigate = useCallback((route: LabRouteId) => {
    setActiveRoute(route);
    setProgress((prev) => ({ ...prev, lastVisited: route }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCompleteStep = useCallback((moduleId: LabRouteId, stepIndex: number) => {
    setProgress((prev) => toggleStepCompleted(prev, moduleId, stepIndex));
  }, []);

  const handleLaunchStudioProject = useCallback(
    (projectId: 'churn' | 'sentiment' | 'doc-assistant' | 'vision' | 'business-assistant') => {
      setStudioProject(projectId);
      handleNavigate('projects');
    },
    [handleNavigate]
  );

  const handleResetProgress = useCallback(() => {
    setProgress(INITIAL_PROGRESS);
  }, []);

  return (
    <Layout
      activeRoute={activeRoute}
      onNavigate={handleNavigate}
      progress={progress}
      completionSummary={completionSummary}
      onResetProgress={handleResetProgress}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRoute}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.16 }}
        >
          {activeRoute === 'home' && (
            <HomeDashboard
              onNavigate={handleNavigate}
              onLaunchStudioProject={handleLaunchStudioProject}
              progress={progress}
              completionSummary={completionSummary}
            />
          )}
          {activeRoute === 'career-studio' && (
            <CareerTransformationStudio onNavigateLab={handleNavigate} />
          )}
          {activeRoute === 'foundations' && (
            <FoundationsLab
              completedSteps={progress.completedSteps.foundations ?? []}
              onCompleteStep={(idx) => handleCompleteStep('foundations', idx)}
            />
          )}
          {activeRoute === 'ml' && (
            <MachineLearningLab
              completedSteps={progress.completedSteps.ml ?? []}
              onCompleteStep={(idx) => handleCompleteStep('ml', idx)}
            />
          )}
          {activeRoute === 'dl' && (
            <DeepLearningLab
              completedSteps={progress.completedSteps.dl ?? []}
              onCompleteStep={(idx) => handleCompleteStep('dl', idx)}
            />
          )}
          {activeRoute === 'nlp' && (
            <NlpLab
              completedSteps={progress.completedSteps.nlp ?? []}
              onCompleteStep={(idx) => handleCompleteStep('nlp', idx)}
            />
          )}
          {activeRoute === 'genai' && (
            <GenAiLab
              completedSteps={progress.completedSteps.genai ?? []}
              onCompleteStep={(idx) => handleCompleteStep('genai', idx)}
            />
          )}
          {activeRoute === 'agentic' && (
            <AgenticAiLab
              completedSteps={progress.completedSteps.agentic ?? []}
              onCompleteStep={(idx) => handleCompleteStep('agentic', idx)}
            />
          )}
          {activeRoute === 'mlops' && (
            <MlopsLab
              completedSteps={progress.completedSteps.mlops ?? []}
              onCompleteStep={(idx) => handleCompleteStep('mlops', idx)}
            />
          )}
          {activeRoute === 'projects' && (
            <ProjectStudio
              initialProject={studioProject}
              completedSteps={progress.completedSteps.projects ?? []}
              onCompleteStep={(idx) => handleCompleteStep('projects', idx)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
