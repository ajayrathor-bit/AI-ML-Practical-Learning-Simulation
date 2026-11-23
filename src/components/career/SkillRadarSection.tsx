import { useEffect, useRef, useState } from 'react';
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { ArrowRight, Compass, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { PROFESSIONS } from '../../data/careerStudioData';
import type { ProfessionId } from '../../types/careerStudio';
import type { LabRouteId } from '../../types/lab';
import {
  buildSkillSpiderComparison,
  CAREER_RADAR_PATHS,
  getProfessionBaselineProfile,
  getRecommendedCareerPathForProfession,
  RADAR_AXES,
  type CareerPathId,
  type RadarDimensionKey,
} from '../../utils/skillSpiderData';

interface SkillRadarSectionProps {
  selectedProfessionId: ProfessionId;
  onNavigateLab: (route: LabRouteId) => void;
}

export function SkillRadarSection({
  selectedProfessionId,
  onNavigateLab,
}: SkillRadarSectionProps) {
  const activeProfession =
    PROFESSIONS.find((p) => p.id === selectedProfessionId) ?? PROFESSIONS[0];

  const [selectedPathId, setSelectedPathId] = useState<CareerPathId>(() =>
    getRecommendedCareerPathForProfession(selectedProfessionId)
  );
  const [professionalScores, setProfessionalScores] = useState<
    Record<RadarDimensionKey, number>
  >(() => getProfessionBaselineProfile(selectedProfessionId));
  const hasCustomEditsRef = useRef(false);

  // Only sync path & unedited baseline when the active industry itself changes
  useEffect(() => {
    setSelectedPathId(getRecommendedCareerPathForProfession(selectedProfessionId));
    if (!hasCustomEditsRef.current) {
      setProfessionalScores(getProfessionBaselineProfile(selectedProfessionId));
    }
  }, [selectedProfessionId]);

  const handleResetBaseline = () => {
    setProfessionalScores(getProfessionBaselineProfile(selectedProfessionId));
    hasCustomEditsRef.current = false;
  };

  const handleSliderChange = (key: RadarDimensionKey, value: number) => {
    hasCustomEditsRef.current = true;
    setProfessionalScores((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const comparison = buildSkillSpiderComparison(selectedPathId, professionalScores);

  return (
    <section
      aria-label="Skill Comparison Radar"
      className="rounded-2xl border border-slate-800/90 bg-[#0D1628] p-6 space-y-6"
    >
      {/* Header */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start border-b border-slate-800/80 pb-5">
        <div className="xl:col-span-7 space-y-1.5 min-w-0">
          <div className="flex items-center gap-2 text-xs font-medium text-cyan-300">
            <Compass className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Interactive Career Spider Analysis · 6 Core Competency Axes</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
            Professional Skills vs. Required AI/ML Technical Skills
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Toggle target AI career paths below to dynamically inspect where your existing {activeProfession.shortTitle} strengths translate directly and which technical capabilities deserve focused study.
          </p>
        </div>

        <div className="xl:col-span-5 flex flex-wrap items-center justify-start xl:justify-end gap-4 text-xs min-w-0">
          <div>
            <div className="text-slate-400">Active Industry Baseline</div>
            <div className="font-semibold text-slate-100">{activeProfession.title}</div>
          </div>
          <button
            type="button"
            onClick={handleResetBaseline}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-slate-700 bg-[#121E36] px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-500/40 whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
            <span>Reset Baseline</span>
          </button>
        </div>
      </div>

      {/* Career Path Segmented Switcher */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-slate-300">
          Select Target Career Path to Compare Requirements
        </div>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Target career path selector"
        >
          {CAREER_RADAR_PATHS.map((path) => {
            const active = path.id === selectedPathId;
            return (
              <button
                key={path.id}
                type="button"
                onClick={() => setSelectedPathId(path.id)}
                aria-pressed={active}
                className={`inline-flex min-h-10 items-center rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'border-purple-400 bg-purple-500/15 text-purple-100'
                    : 'border-slate-800 bg-[#091122] text-slate-300 hover:border-slate-700 hover:text-slate-100'
                }`}
              >
                {path.shortTabLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Two-Zone Sandbox: Spider Chart (Left) + Dynamic Baseline Controls & Summary (Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        {/* Left Zone: Recharts Spider / Radar Chart */}
        <div className="xl:col-span-7 rounded-xl border border-slate-800 bg-[#091122] p-5 flex flex-col justify-between gap-4 min-w-0">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-slate-100">
                {comparison.path.roleTitle}
              </span>
              <span className="font-mono text-purple-300">
                {comparison.path.focusDomain}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {comparison.path.summary}
            </p>
          </div>

          <div className="h-80 sm:h-96 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="70%"
                data={comparison.axes}
              >
                <PolarGrid stroke="#1E293B" />
                <PolarAngleAxis
                  dataKey="axisLabel"
                  tick={{ fill: '#CBD5E1', fontSize: 11 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tickCount={5}
                  tick={{ fill: '#64748B', fontSize: 10 }}
                />
                <Radar
                  name="Current Professional Skills"
                  dataKey="professionalSkills"
                  stroke="#22D3EE"
                  fill="#22D3EE"
                  fillOpacity={0.24}
                  strokeWidth={2}
                />
                <Radar
                  name="Required AI/ML Technical Skills"
                  dataKey="aiTechnicalSkills"
                  stroke="#A855F7"
                  fill="#A855F7"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0D1628',
                    borderColor: '#334155',
                    fontSize: '12px',
                    color: '#E2E8F0',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Numeric Summary Strip */}
          <div className="grid grid-cols-3 gap-3 border-t border-slate-800/80 pt-4 text-xs">
            <div>
              <div className="text-slate-400">Your Skills Avg</div>
              <div className="font-mono text-lg font-bold text-cyan-300 tabular-nums">
                {comparison.averageProfessionalScore} / 100
              </div>
            </div>
            <div>
              <div className="text-slate-400">Path AI/ML Avg</div>
              <div className="font-mono text-lg font-bold text-purple-300 tabular-nums">
                {comparison.averageAiTargetScore} / 100
              </div>
            </div>
            <div>
              <div className="text-slate-400">Avg Skill Gap</div>
              <div className="font-mono text-lg font-bold text-amber-300 tabular-nums">
                -{comparison.averageGap} pts
              </div>
            </div>
          </div>
        </div>

        {/* Right Zone: Interactive Skill Sliders + Priority Gaps */}
        <div className="xl:col-span-5 rounded-xl border border-slate-800 bg-[#091122] p-5 flex flex-col justify-between gap-5 min-w-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-100">
                <SlidersHorizontal className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
                <span>Adjust Your Current Professional Skills</span>
              </div>
              <span className="font-mono text-[11px] text-slate-400 whitespace-nowrap shrink-0">
                0–100 scale
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Drag any axis below to simulate upskilling or match your personal comfort level and watch the spider chart reshape dynamically.
            </p>

            <div className="space-y-3 pt-1">
              {RADAR_AXES.map((axis) => {
                const value = professionalScores[axis.key] ?? 50;
                const req = comparison.path.requirements[axis.key].targetScore;
                return (
                  <div key={axis.key} className="space-y-1">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <label
                        htmlFor={`radar-slider-${axis.key}`}
                        className="font-medium text-slate-200 truncate"
                      >
                        {axis.axisLabel}
                      </label>
                      <span className="font-mono text-[11px] text-slate-300 tabular-nums shrink-0">
                        <span className="text-cyan-300">{value}</span> / {req} req
                      </span>
                    </div>
                    <input
                      id={`radar-slider-${axis.key}`}
                      type="range"
                      min={10}
                      max={100}
                      step={2}
                      value={value}
                      onChange={(e) =>
                        handleSliderChange(axis.key, Number(e.target.value))
                      }
                      className="w-full lab-slider"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4 space-y-2.5">
            <div className="text-xs font-semibold text-amber-300">
              Top 3 Skill Gaps for {comparison.path.shortTabLabel}
            </div>
            <div className="space-y-2">
              {comparison.largestGaps.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-[#0D1628] px-3 py-2 text-xs"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-100 truncate">
                      {item.axisLabel}
                    </div>
                    <div className="font-mono text-[11px] text-slate-400 tabular-nums">
                      Current {item.professionalSkills} · Target {item.aiTechnicalSkills} · Gap -{item.gap}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateLab(item.labRoute)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-300 hover:text-cyan-200 whitespace-nowrap shrink-0"
                  >
                    <span>{item.labTitle}</span>
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 6-Axis Detailed Translation Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {comparison.axes.map((row) => (
          <div
            key={row.key}
            className="rounded-xl border border-slate-800 bg-[#091122] p-4 flex flex-col justify-between gap-3 min-w-0"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                <span
                  className={
                    row.status === 'Ready / Strength'
                      ? 'text-emerald-300'
                      : row.status === 'Moderate Gap'
                      ? 'text-cyan-300'
                      : 'text-amber-300'
                  }
                >
                  {row.status}
                </span>
                <span className="text-slate-400 tabular-nums">
                  {row.professionalSkills} vs. {row.aiTechnicalSkills} ({row.gap === 0 ? 'On Target' : `-${row.gap} pts`})
                </span>
              </div>

              <h3 className="text-sm font-semibold text-slate-100">{row.axisLabel}</h3>

              <div className="space-y-1 text-xs">
                <p className="text-slate-400">
                  <span className="text-cyan-300 font-medium">Professional Base:</span>{' '}
                  {row.professionalBasis}
                </p>
                <p className="text-slate-200">
                  <span className="text-purple-300 font-medium">AI/ML Target:</span>{' '}
                  {row.technicalTarget}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigateLab(row.labRoute)}
              className="inline-flex items-center justify-between gap-2 border-t border-slate-800/80 pt-2.5 text-xs font-medium text-cyan-300 hover:text-cyan-200"
            >
              <span>Practice in {row.labTitle}</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
