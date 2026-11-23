import { useRef, useState, useEffect } from 'react';
import { Briefcase, ClipboardCheck, Compass, FlaskConical, Layers, Share2, Target, CheckCircle2 } from 'lucide-react';
import { PROFESSIONS, PROJECT_LABS_META } from '../data/careerStudioData';
import type { ProfessionId, ProjectLabId } from '../types/careerStudio';
import type { LabRouteId } from '../types/lab';
import { PipelineVisualizer } from '../components/career/PipelineVisualizer';
import { AiReadinessQuiz } from '../components/career/AiReadinessQuiz';
import { SkillRadarSection } from '../components/career/SkillRadarSection';
import { ProfessionTransformView } from '../components/career/ProfessionTransformView';
import { InteractiveProjectsLab } from '../components/career/InteractiveProjectsLab';
import { CareerPathwaySection } from '../components/career/CareerPathwaySection';

interface CareerTransformationStudioProps {
  onNavigateLab: (route: LabRouteId) => void;
}

type StudioSectionTab =
  | 'overview'
  | 'quiz'
  | 'radar'
  | 'professions'
  | 'projects'
  | 'roadmap';

export function CareerTransformationStudio({
  onNavigateLab,
}: CareerTransformationStudioProps) {
  const [selectedProfessionId, setSelectedProfessionId] = useState<ProfessionId>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const prof = params.get('profession') as ProfessionId;
      if (prof && PROFESSIONS.some((p) => p.id === prof)) {
        return prof;
      }
    } catch {
      // fallback
    }
    return 'banking-finance';
  });

  const [activeProjectId, setActiveProjectId] = useState<ProjectLabId>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const proj = params.get('project') as ProjectLabId;
      if (proj && PROJECT_LABS_META.some((m) => m.id === proj)) {
        return proj;
      }
    } catch {
      // fallback
    }
    return 'resume-screening';
  });

  const [activeTab, setActiveTab] = useState<StudioSectionTab>('overview');
  const [shareCopied, setShareCopied] = useState(false);

  const quizRef = useRef<HTMLDivElement | null>(null);
  const radarRef = useRef<HTMLDivElement | null>(null);
  const professionsRef = useRef<HTMLDivElement | null>(null);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const roadmapRef = useRef<HTMLDivElement | null>(null);

  const selectedProfession =
    PROFESSIONS.find((p) => p.id === selectedProfessionId) ?? PROFESSIONS[0];

  const handleSelectProfession = (id: ProfessionId) => {
    setSelectedProfessionId(id);
    const prof = PROFESSIONS.find((p) => p.id === id);
    if (prof?.recommendedProjects[0]) {
      setActiveProjectId(prof.recommendedProjects[0]);
    }
  };

  const scrollToRef = (ref: { current: HTMLDivElement | null }, tab: StudioSectionTab) => {
    setActiveTab(tab);
    window.requestAnimationFrame(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleLaunchProject = (projectId: ProjectLabId) => {
    setActiveProjectId(projectId);
    scrollToRef(projectsRef, 'projects');
  };

  const handleShareExperience = async () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('section', 'career-studio');
      url.searchParams.set('profession', selectedProfessionId);
      url.searchParams.set('project', activeProjectId);
      await navigator.clipboard.writeText(url.toString());
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 4000);
    } catch {
      // Fallback if clipboard API restricted
    }
  };

  return (
    <div className="space-y-8">
      {/* Studio Section Sub-Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800/90 bg-[#091122] px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'overview' as const, label: '1. Welcome & Pipeline', icon: Compass },
            { id: 'quiz' as const, label: 'AI Readiness Quiz', icon: ClipboardCheck },
            { id: 'radar' as const, label: 'Skill Spider Chart', icon: Target },
            { id: 'professions' as const, label: '2. 15 Professions', icon: Briefcase },
            { id: 'projects' as const, label: '3. 10 AI Projects & Tech', icon: FlaskConical },
            { id: 'roadmap' as const, label: '4. Career Plan & Counselling', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  if (tab.id === 'overview') {
                    setActiveTab('overview');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else if (tab.id === 'quiz') {
                    scrollToRef(quizRef, 'quiz');
                  } else if (tab.id === 'radar') {
                    scrollToRef(radarRef, 'radar');
                  } else if (tab.id === 'professions') {
                    scrollToRef(professionsRef, 'professions');
                  } else if (tab.id === 'projects') {
                    scrollToRef(projectsRef, 'projects');
                  } else {
                    scrollToRef(roadmapRef, 'roadmap');
                  }
                }}
                aria-pressed={active}
                className={`inline-flex min-h-9 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                  active
                    ? 'border-cyan-400 bg-cyan-500/15 text-cyan-100'
                    : 'border-slate-800 bg-[#0D1628] text-slate-300 hover:border-slate-700'
                }`}
              >
                <Icon className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="font-mono text-xs text-slate-400 hidden sm:block">
            Active: <span className="text-cyan-300">{selectedProfession.shortTitle}</span>
          </div>
          <button
            type="button"
            onClick={handleShareExperience}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-200 hover:bg-cyan-500/20 whitespace-nowrap"
          >
            <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Share Experience</span>
          </button>
        </div>
      </div>

      {shareCopied && (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
            <span>Shareable deep-link URL with your selected profession and project progress copied to clipboard!</span>
          </div>
          <span className="font-mono text-[11px] text-emerald-300">Ready to paste</span>
        </div>
      )}

      {/* Step 1: Welcome Hero & 7-Stage Pipeline */}
      <PipelineVisualizer
        onExploreProfession={() => scrollToRef(professionsRef, 'professions')}
        onExploreProjects={() => scrollToRef(projectsRef, 'projects')}
      />

      {/* Interactive AI Readiness Quiz & Customized Skill-Gap Report */}
      <div ref={quizRef} className="scroll-mt-20">
        <AiReadinessQuiz
          selectedProfessionId={selectedProfessionId}
          onSelectProfession={handleSelectProfession}
          onLaunchProject={handleLaunchProject}
          onNavigateLab={onNavigateLab}
        />
      </div>

      {/* Interactive Career Path Spider / Radar Skill Comparison */}
      <div ref={radarRef} className="scroll-mt-20">
        <SkillRadarSection
          selectedProfessionId={selectedProfessionId}
          onNavigateLab={onNavigateLab}
        />
      </div>

      {/* Step 2 & 3: 15-Industry Selector + Profession Transformation Experience */}
      <div ref={professionsRef} className="scroll-mt-20">
        <ProfessionTransformView
          selectedProfessionId={selectedProfessionId}
          onSelectProfession={handleSelectProfession}
          onLaunchProject={handleLaunchProject}
        />
      </div>

      {/* Step 4 & 6: 10 Interactive Projects + 14-Technology Explainer */}
      <div ref={projectsRef} className="scroll-mt-20">
        <InteractiveProjectsLab
          selectedProfessionId={selectedProfessionId}
          activeProjectId={activeProjectId}
          onSelectProject={setActiveProjectId}
        />
      </div>

      {/* Step 7, 8 & 9: Personalized Career Dashboard, Customize Modal, PDF Report & Counselling */}
      <div ref={roadmapRef} className="scroll-mt-20">
        <CareerPathwaySection
          selectedProfessionId={selectedProfessionId}
          onSelectProfession={handleSelectProfession}
          onLaunchProject={handleLaunchProject}
          onExploreProgram={() => onNavigateLab('foundations')}
        />
      </div>
    </div>
  );
}
