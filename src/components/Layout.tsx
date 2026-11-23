import { useState, type ReactNode } from 'react';
import {
  LayoutDashboard,
  Compass,
  TrendingUp,
  Network,
  MessageSquareText,
  Sparkles,
  Bot,
  Activity,
  Briefcase,
  Menu,
  X,
  RotateCcw,
  Rocket,
} from 'lucide-react';
import type { LabRouteId, LearningProgress } from '../types/lab';
import { MODULES } from '../data/curriculum';

interface LayoutProps {
  activeRoute: LabRouteId;
  onNavigate: (route: LabRouteId) => void;
  progress: LearningProgress;
  completionSummary: { completed: number; total: number; percentage: number };
  onResetProgress: () => void;
  children: ReactNode;
}

const ROUTE_ICONS: Record<LabRouteId, typeof LayoutDashboard> = {
  home: LayoutDashboard,
  'career-studio': Rocket,
  foundations: Compass,
  ml: TrendingUp,
  dl: Network,
  nlp: MessageSquareText,
  genai: Sparkles,
  agentic: Bot,
  mlops: Activity,
  projects: Briefcase,
};

export function Layout({
  activeRoute,
  onNavigate,
  progress,
  completionSummary,
  onResetProgress,
  children,
}: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeModule = MODULES.find((m) => m.id === activeRoute);
  const currentBreadcrumb =
    activeRoute === 'career-studio'
      ? 'AI Career Transformation Studio'
      : activeModule
      ? activeModule.title
      : 'Home Dashboard';

  const handleSelectRoute = (route: LabRouteId) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  const navItems: Array<{ id: LabRouteId; label: string; stepCount?: number }> = [
    { id: 'home', label: 'Home Dashboard' },
    { id: 'career-studio', label: 'AI Career Studio' },
    ...MODULES.map((m) => ({
      id: m.id,
      label: m.title,
      stepCount: m.totalSteps,
    })),
  ];

  const renderNavList = () => (
    <nav aria-label="Lab modules" className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
      {navItems.map((item) => {
        const Icon = ROUTE_ICONS[item.id];
        const isActive = activeRoute === item.id;
        const doneCount = item.stepCount
          ? (progress.completedSteps[item.id] ?? []).length
          : 0;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleSelectRoute(item.id)}
            aria-current={isActive ? 'page' : undefined}
            className={`group flex min-h-11 w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
              isActive
                ? 'bg-cyan-500/12 text-cyan-200 border border-cyan-500/30'
                : 'text-slate-300 border border-transparent hover:bg-slate-800/60 hover:text-slate-100'
            }`}
          >
            <span className="flex items-center gap-2.5 min-w-0">
              <Icon
                className={`h-4 w-4 shrink-0 ${
                  isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                }`}
                aria-hidden="true"
              />
              <span className="truncate">{item.label}</span>
            </span>
            {item.stepCount !== undefined && (
              <span className="font-mono text-[11px] tabular-nums text-slate-400 shrink-0">
                {doneCount}/{item.stepCount}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#070D19] text-slate-100 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col border-r border-slate-800/80 bg-[#091122]">
        <div className="flex h-16 items-center border-b border-slate-800/80 px-5">
          <button
            type="button"
            onClick={() => handleSelectRoute('home')}
            className="text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
          >
            <span className="font-display text-base font-bold tracking-tight text-slate-50 whitespace-nowrap">
              Intel AI/ML Lab
            </span>
          </button>
        </div>

        {renderNavList()}

        <div className="border-t border-slate-800/80 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Overall Progress</span>
            <span className="font-mono font-semibold text-cyan-300 tabular-nums">
              {completionSummary.percentage}%
            </span>
          </div>
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800"
            role="progressbar"
            aria-valuenow={completionSummary.percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Overall learning progress"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${completionSummary.percentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-mono tabular-nums">
              {completionSummary.completed} / {completionSummary.total} steps
            </span>
            {completionSummary.completed > 0 && (
              <button
                type="button"
                onClick={onResetProgress}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <RotateCcw className="h-3 w-3" aria-hidden="true" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/70"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative z-10 flex w-72 max-w-[85vw] flex-col border-r border-slate-800 bg-[#091122]">
            <div className="flex h-14 items-center justify-between border-b border-slate-800 px-4">
              <span className="font-display text-base font-bold text-slate-50">
                Intel AI/ML Lab
              </span>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-300 hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {renderNavList()}
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 sm:h-16 items-center justify-between gap-4 border-b border-slate-800/80 bg-[#070D19]/95 px-4 sm:px-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              aria-label="Open navigation menu"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-[#0D1628] text-slate-200 lg:hidden shrink-0"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 text-sm min-w-0">
              <button
                type="button"
                onClick={() => handleSelectRoute('home')}
                className="hidden sm:inline text-slate-400 hover:text-slate-200 transition-colors whitespace-nowrap"
              >
                Interactive Lab
              </button>
              <span className="hidden sm:inline text-slate-600" aria-hidden="true">
                /
              </span>
              <span className="font-medium text-slate-100 truncate">
                {currentBreadcrumb}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeRoute !== 'career-studio' && (
              <button
                type="button"
                onClick={() => handleSelectRoute('career-studio')}
                className="hidden sm:inline-flex min-h-9 items-center rounded-lg border border-purple-500/40 bg-purple-500/12 px-3 py-1.5 text-xs font-medium text-purple-200 transition-colors hover:bg-purple-500/20 whitespace-nowrap shrink-0"
              >
                Career Studio
              </button>
            )}
            {activeRoute !== 'projects' ? (
              <button
                type="button"
                onClick={() => handleSelectRoute('projects')}
                className="inline-flex min-h-9 items-center rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-medium text-cyan-200 transition-colors hover:bg-cyan-500/20 whitespace-nowrap shrink-0"
              >
                Open Project Studio
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleSelectRoute('home')}
                className="inline-flex min-h-9 items-center rounded-lg border border-slate-700 bg-[#0D1628] px-3.5 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-800 whitespace-nowrap shrink-0"
              >
                Back to Dashboard
              </button>
            )}
          </div>
        </header>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-[1280px] w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
