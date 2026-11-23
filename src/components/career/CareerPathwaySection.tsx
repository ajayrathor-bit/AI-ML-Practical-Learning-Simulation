import { useState, type FormEvent } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ArrowRight,
  Award,
  CalendarCheck,
  CheckCircle2,
  Compass,
  Download,
  GraduationCap,
  Layers,
  MessageSquare,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import { PROFESSIONS, PROJECT_LABS_META } from '../../data/careerStudioData';
import type {
  CustomUserProfile,
  PersonalizedTransformationPlan,
  ProfessionId,
  ProjectLabId,
} from '../../types/careerStudio';
import {
  buildPersonalizedTransformation,
  downloadCareerTransformationPdf,
} from '../../utils/careerSimulations';

interface CareerPathwaySectionProps {
  selectedProfessionId: ProfessionId;
  onSelectProfession: (id: ProfessionId) => void;
  onLaunchProject: (id: ProjectLabId) => void;
  onExploreProgram: () => void;
}

const TECH_CHECKBOX_OPTIONS = [
  'Excel / Spreadsheets',
  'SQL',
  'Python',
  'BI Dashboards',
  'Statistics',
  'Prompting Tools',
];

export function CareerPathwaySection({
  selectedProfessionId,
  onSelectProfession,
  onLaunchProject,
  onExploreProgram,
}: CareerPathwaySectionProps) {
  const profession =
    PROFESSIONS.find((p) => p.id === selectedProfessionId) ?? PROFESSIONS[0];

  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [customPlan, setCustomPlan] = useState<PersonalizedTransformationPlan | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [lastPdfName, setLastPdfName] = useState<string | null>(null);

  // Customize Form State
  const [designation, setDesignation] = useState('');
  const [formIndustry, setFormIndustry] = useState<ProfessionId>(profession.id);
  const [yearsExp, setYearsExp] = useState(5);
  const [responsibilitiesInput, setResponsibilitiesInput] = useState('');
  const [timeConsumingInput, setTimeConsumingInput] = useState('');
  const [techSkillsInput, setTechSkillsInput] = useState<string[]>(['Excel / Spreadsheets']);
  const [careerObjective, setCareerObjective] =
    useState<CustomUserProfile['careerObjective']>('upskill-current-role');

  // Counselling Inquiry Form State
  const [isCounsellorOpen, setIsCounsellorOpen] = useState(false);
  const [counsellorName, setCounsellorName] = useState('');
  const [counsellorEmail, setCounsellorEmail] = useState('');
  const [counsellorSlot, setCounsellorSlot] = useState('Weekday Evening (6–8 PM)');
  const [counsellorNote, setCounsellorNote] = useState('');
  const [counsellorError, setCounsellorError] = useState<string | null>(null);
  const [submittedConsultation, setSubmittedConsultation] = useState<{
    name: string;
    email: string;
    slot: string;
    professionTitle: string;
  } | null>(null);

  const [showRoadmapPreview, setShowRoadmapPreview] = useState(false);

  const activePlan =
    customPlan ??
    buildPersonalizedTransformation(
      {
        designation: `${profession.shortTitle} Specialist`,
        industry: profession.id,
        yearsExperience: 5,
        keyResponsibilities: profession.responsibilities
          .slice(0, 2)
          .map((r) => r.title)
          .join(', '),
        timeConsumingTasks: profession.responsibilities
          .slice(2, 4)
          .map((r) => r.title)
          .join(', '),
        existingTechnicalSkills: ['Domain Fluency'],
        careerObjective: 'upskill-current-role',
      },
      profession
    );

  const openCustomizeModal = () => {
    setFormIndustry(profession.id);
    setFormError(null);
    setIsCustomizeOpen(true);
  };

  const handleToggleSkill = (skill: string) => {
    setTechSkillsInput((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmitPersonalization = (e: FormEvent) => {
    e.preventDefault();
    if (!designation.trim()) {
      setFormError('Please enter your current job title or designation.');
      return;
    }
    if (!timeConsumingInput.trim() && !responsibilitiesInput.trim()) {
      setFormError('Please list at least one key responsibility or time-consuming task.');
      return;
    }

    const chosenProfession =
      PROFESSIONS.find((p) => p.id === formIndustry) ?? profession;
    onSelectProfession(chosenProfession.id);

    const profile: CustomUserProfile = {
      designation: designation.trim(),
      industry: chosenProfession.id,
      yearsExperience: yearsExp,
      keyResponsibilities: responsibilitiesInput.trim(),
      timeConsumingTasks: timeConsumingInput.trim(),
      existingTechnicalSkills: techSkillsInput,
      careerObjective,
    };

    const generated = buildPersonalizedTransformation(profile, chosenProfession);
    setCustomPlan(generated);
    setFormError(null);
    setIsCustomizeOpen(false);
    setShowRoadmapPreview(true);
  };

  const handleDownloadPdf = () => {
    const filename = downloadCareerTransformationPdf(activePlan, profession);
    setLastPdfName(filename);
  };

  const handleSubmitCounsellor = (e: FormEvent) => {
    e.preventDefault();
    if (!counsellorName.trim()) {
      setCounsellorError('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(counsellorEmail.trim())) {
      setCounsellorError('Please enter a valid email address.');
      return;
    }
    setCounsellorError(null);
    setSubmittedConsultation({
      name: counsellorName.trim(),
      email: counsellorEmail.trim(),
      slot: counsellorSlot,
      professionTitle: profession.title,
    });
    setIsCounsellorOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* STEP 7: Personalized Career Transformation Dashboard + Skill Gap Chart */}
      <section className="rounded-2xl border border-slate-800/90 bg-[#0D1628] p-6 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-medium text-cyan-300">
              <Compass className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Step 7 &amp; 8 · Career Transformation Dashboard</span>
            </div>
            <h2 className="text-xl font-bold text-slate-100">
              {customPlan
                ? `Personalized Plan for ${customPlan.profile.designation}`
                : `${profession.title} · Career Evolution & Skill Gap View`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
              Compare your existing domain leverage against target AI capabilities, explore high-fit projects, or tailor this profile to your exact role.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={openCustomizeModal}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400 whitespace-nowrap"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Customize My AI Experience</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-700 bg-[#121E36] px-4 py-2 text-xs font-medium text-slate-100 hover:border-cyan-500/40 whitespace-nowrap"
            >
              <Download className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
              <span>Download PDF Report</span>
            </button>
          </div>
        </div>

        {lastPdfName && (
          <div className="rounded-lg border border-emerald-500/35 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Generated and downloaded {lastPdfName} with your current career plan.</span>
          </div>
        )}

        {/* Top 3 Columns: Existing Skills | New AI Skills | Skill Gap Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-3 rounded-xl border border-slate-800 bg-[#091122] p-4 space-y-3 min-w-0">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
              Your Existing Leverage
            </h3>
            <ul className="space-y-2 text-xs text-slate-200">
              {profession.existingStrengths.map((strength) => (
                <li key={strength} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 rounded-xl border border-slate-800 bg-[#091122] p-4 space-y-3 min-w-0">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
              Priority AI/ML Skills to Add
            </h3>
            <ul className="space-y-2 text-xs text-slate-200">
              {activePlan.prioritySkillsToLearn.map((skill) => (
                <li key={skill} className="flex items-start gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-[#091122] p-4 space-y-2 min-w-0">
            <div className="flex items-center justify-between text-xs">
              <h3 className="font-semibold text-slate-100">
                Visual Skill Gap Analysis (Illustrative Baseline vs. AI-Ready Target)
              </h3>
            </div>
            <div className="h-56 w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={profession.skillGapData} layout="vertical" margin={{ left: 12, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis type="number" domain={[0, 100]} stroke="#94A3B8" fontSize={11} />
                  <YAxis type="category" dataKey="skillArea" stroke="#CBD5E1" fontSize={11} width={145} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0D1628', borderColor: '#334155', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="currentBaseline" name="Typical Current" fill="#475569" radius={[0, 3, 3, 0]} />
                  <Bar dataKey="targetAiReady" name="AI-Ready Target" fill="#22D3EE" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Automation Opportunities & Recommended Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-[#091122] p-5 space-y-3 min-w-0">
            <h3 className="text-sm font-semibold text-slate-100">
              {customPlan ? 'Your Tailored Workflow Automation Opportunities' : 'High-Impact Workflow Opportunities'}
            </h3>
            <div className="divide-y divide-slate-800/80">
              {activePlan.automationOpportunities.map((opp) => (
                <div key={opp.task} className="py-3 first:pt-1 last:pb-1 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-slate-100">
                      {opp.task}
                    </span>
                    <span className="font-mono text-[11px] text-cyan-300 tabular-nums">
                      Est. ~{opp.estimatedHoursSavedWeekly} hrs/wk manual effort reduced
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{opp.aiApproach}</p>
                  <p className="text-[11px] text-emerald-300">Human Oversight: {opp.humanControl}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-[#091122] p-5 space-y-4 min-w-0">
            <div>
              <h3 className="text-sm font-semibold text-slate-100">
                Recommended Applied Portfolio Projects
              </h3>
              <p className="text-xs text-slate-400">
                Launch any sandbox below to test how these projects work in practice.
              </p>
            </div>

            <div className="space-y-2.5">
              {activePlan.recommendedProjects.map((pid) => {
                const proj = PROJECT_LABS_META.find((m) => m.id === pid);
                if (!proj) return null;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => onLaunchProject(proj.id)}
                    className="w-full flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-[#0D1628] p-3 text-left hover:border-cyan-400/60 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-100 truncate">
                        {proj.title}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {proj.industryTag}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-cyan-300 shrink-0" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Possible Career Pathways + Optional Expanded Roadmap */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-slate-100">
              Possible Career Evolution Pathways (Exploratory Examples — Not Guaranteed Outcomes)
            </h3>
            <span className="text-[11px] text-slate-400">
              Building verified projects + domain judgment opens adjacent AI-enabled roles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {activePlan.suggestedPathways.map((path) => (
              <div
                key={path.roleTitle}
                className="rounded-xl border border-slate-800 bg-[#091122] p-4 space-y-1.5"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                  <Award className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{path.roleTitle}</span>
                </div>
                <div className="text-[11px] text-slate-400">{path.transitionFit}</div>
                <p className="text-xs text-slate-200 leading-relaxed">{path.exampleFocus}</p>
              </div>
            ))}
          </div>

          {showRoadmapPreview && (
            <div className="rounded-xl border border-cyan-500/40 bg-[#091122] p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-cyan-200 flex items-center gap-2">
                  <Layers className="h-4 w-4" aria-hidden="true" />
                  <span>Suggested Structured Learning Sequence</span>
                </h4>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-300 hover:text-cyan-200"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Export Roadmap PDF</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {activePlan.learningRoadmapWeeks.map((phase) => (
                  <div
                    key={phase.phase}
                    className="rounded-lg border border-slate-800 bg-[#0D1628] p-3.5 space-y-1.5 text-xs"
                  >
                    <div className="font-mono text-cyan-300 font-semibold">{phase.phase}</div>
                    <div className="text-slate-100 font-medium">{phase.focus}</div>
                    <div className="text-slate-400">Outcome: {phase.deliverable}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* STEP 9: Sales Counselling & Conversion Section */}
      <section className="rounded-2xl border border-cyan-500/35 bg-[#0D1628] p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-3 min-w-0">
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
              Step 9 · Guided Career Counselling Summary
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-50">
              Ready to Add AI Skills to Your Professional Experience?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Review your selected {profession.title} exploration summary or connect with an educational career advisor to map out a structured learning sequence tailored to your schedule.
            </p>

            {/* 3 Functional Conversion CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onExploreProgram}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400 whitespace-nowrap"
              >
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                <span>Explore AI/ML Program</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCounsellorError(null);
                  setIsCounsellorOpen(true);
                }}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-cyan-500/45 bg-cyan-500/12 px-5 py-2.5 text-sm font-medium text-cyan-100 hover:bg-cyan-500/20 whitespace-nowrap"
              >
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                <span>Talk to a Career Counsellor</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowRoadmapPreview(true);
                  handleDownloadPdf();
                }}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-700 bg-[#121E36] px-5 py-2.5 text-sm font-medium text-slate-100 hover:border-cyan-500/40 whitespace-nowrap"
              >
                <CalendarCheck className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                <span>Request a Personalized Learning Roadmap</span>
              </button>
            </div>

            {submittedConsultation && (
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs text-emerald-100 space-y-1">
                <div className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                  <span>Counselling Session Request Recorded (Local Demo Preview)</span>
                </div>
                <p>
                  Thank you, {submittedConsultation.name}. Your exploratory inquiry for{' '}
                  <strong>{submittedConsultation.professionTitle}</strong> ({submittedConsultation.slot}) has been logged for {submittedConsultation.email}.
                </p>
              </div>
            )}
          </div>

          {/* Live Summary Snapshot Card */}
          <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-[#091122] p-5 space-y-3 text-xs min-w-0">
            <div className="font-semibold text-slate-100 text-sm">Your Exploration Snapshot</div>
            <div className="space-y-2">
              <div className="flex justify-between gap-2 border-b border-slate-800/80 pb-1.5">
                <span className="text-slate-400">Selected Profession</span>
                <span className="font-medium text-cyan-300 text-right">{profession.title}</span>
              </div>
              <div className="border-b border-slate-800/80 pb-1.5">
                <span className="text-slate-400 block mb-0.5">AI Applications Explored</span>
                <span className="text-slate-200">
                  {profession.responsibilities.slice(0, 3).map((r) => r.title).join(' · ')}
                </span>
              </div>
              <div className="border-b border-slate-800/80 pb-1.5">
                <span className="text-slate-400 block mb-0.5">Matched Portfolio Projects</span>
                <span className="text-slate-200">
                  {activePlan.recommendedProjects
                    .map((id) => PROJECT_LABS_META.find((p) => p.id === id)?.title ?? id)
                    .join(' · ')}
                </span>
              </div>
              <div className="border-b border-slate-800/80 pb-1.5">
                <span className="text-slate-400 block mb-0.5">Priority Skills</span>
                <span className="text-slate-200">
                  {activePlan.prioritySkillsToLearn.slice(0, 3).join(' · ')}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Exploratory Pathways</span>
                <span className="text-slate-200">
                  {activePlan.suggestedPathways.map((p) => p.roleTitle).join(' · ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customize My AI Experience Modal */}
      {isCustomizeOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="customize-modal-title"
        >
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-[#0D1628] p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3">
              <div>
                <h3 id="customize-modal-title" className="text-lg font-bold text-slate-100">
                  Customize My AI Experience
                </h3>
                <p className="text-xs text-slate-400">
                  No sign-up required. Personalize your automation opportunities and PDF roadmap in your browser.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close personalization form"
                onClick={() => setIsCustomizeOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitPersonalization} className="space-y-4">
              {formError && (
                <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-200">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="custom-designation" className="block text-xs font-medium text-slate-300 mb-1">
                    Current Job Designation *
                  </label>
                  <input
                    id="custom-designation"
                    type="text"
                    placeholder="e.g., Senior Operations Manager"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-[#091122] px-3 py-2 text-sm text-slate-100"
                  />
                </div>

                <div>
                  <label htmlFor="custom-industry" className="block text-xs font-medium text-slate-300 mb-1">
                    Industry Track
                  </label>
                  <select
                    id="custom-industry"
                    value={formIndustry}
                    onChange={(e) => setFormIndustry(e.target.value as ProfessionId)}
                    className="w-full rounded-lg border border-slate-700 bg-[#091122] px-3 py-2 text-sm text-slate-100"
                  >
                    {PROFESSIONS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label htmlFor="custom-years" className="font-medium text-slate-300">
                    Years of Professional Experience
                  </label>
                  <span className="font-mono text-cyan-300 tabular-nums">{yearsExp} years</span>
                </div>
                <input
                  id="custom-years"
                  type="range"
                  min={0}
                  max={25}
                  value={yearsExp}
                  onChange={(e) => setYearsExp(Number(e.target.value))}
                  className="w-full lab-slider"
                />
              </div>

              <div>
                <label htmlFor="custom-tasks" className="block text-xs font-medium text-slate-300 mb-1">
                  Most Time-Consuming Tasks (comma separated) *
                </label>
                <input
                  id="custom-tasks"
                  type="text"
                  placeholder="e.g., Weekly spreadsheet consolidation, Invoice verification, Client reporting"
                  value={timeConsumingInput}
                  onChange={(e) => setTimeConsumingInput(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-[#091122] px-3 py-2 text-sm text-slate-100"
                />
              </div>

              <div>
                <label htmlFor="custom-resp" className="block text-xs font-medium text-slate-300 mb-1">
                  Key Daily Responsibilities (optional)
                </label>
                <input
                  id="custom-resp"
                  type="text"
                  placeholder="e.g., Team capacity planning, Vendor reviews"
                  value={responsibilitiesInput}
                  onChange={(e) => setResponsibilitiesInput(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-[#091122] px-3 py-2 text-sm text-slate-100"
                />
              </div>

              <div>
                <div className="text-xs font-medium text-slate-300 mb-2">
                  Existing Technical Familiarity
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TECH_CHECKBOX_OPTIONS.map((skill) => (
                    <label
                      key={skill}
                      className="flex items-center gap-2 rounded-lg border border-slate-800 bg-[#091122] px-3 py-2 text-xs text-slate-200 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={techSkillsInput.includes(skill)}
                        onChange={() => handleToggleSkill(skill)}
                        className="accent-cyan-400"
                      />
                      <span>{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="custom-goal" className="block text-xs font-medium text-slate-300 mb-1">
                  Primary Career Objective
                </label>
                <select
                  id="custom-goal"
                  value={careerObjective}
                  onChange={(e) =>
                    setCareerObjective(e.target.value as CustomUserProfile['careerObjective'])
                  }
                  className="w-full rounded-lg border border-slate-700 bg-[#091122] px-3 py-2 text-sm text-slate-100"
                >
                  <option value="upskill-current-role">Automate workflows &amp; grow in current profession</option>
                  <option value="lead-ai-projects">Lead cross-functional AI initiatives &amp; strategy</option>
                  <option value="transition-ai-role">Transition into an applied Data / AI role</option>
                </select>
              </div>

              <div className="flex flex-wrap justify-end gap-3 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCustomizeOpen(false)}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-cyan-500 px-5 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400"
                >
                  Generate Personalized Transformation Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Career Counsellor Request Modal */}
      {isCounsellorOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="counsellor-modal-title"
        >
          <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-[#0D1628] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3">
              <div>
                <h3 id="counsellor-modal-title" className="text-lg font-bold text-slate-100">
                  Schedule Career Guidance Session
                </h3>
                <p className="text-xs text-slate-400">
                  Share your goals so a counsellor can walk through a practical {profession.shortTitle} AI roadmap.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close counsellor modal"
                onClick={() => setIsCounsellorOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitCounsellor} className="space-y-3.5">
              {counsellorError && (
                <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-200">
                  {counsellorError}
                </div>
              )}

              <div>
                <label htmlFor="c-name" className="block text-xs font-medium text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  id="c-name"
                  type="text"
                  value={counsellorName}
                  onChange={(e) => setCounsellorName(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-[#091122] px-3 py-2 text-sm text-slate-100"
                />
              </div>

              <div>
                <label htmlFor="c-email" className="block text-xs font-medium text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  id="c-email"
                  type="email"
                  value={counsellorEmail}
                  onChange={(e) => setCounsellorEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-[#091122] px-3 py-2 text-sm text-slate-100"
                />
              </div>

              <div>
                <label htmlFor="c-slot" className="block text-xs font-medium text-slate-300 mb-1">
                  Preferred Time Window
                </label>
                <select
                  id="c-slot"
                  value={counsellorSlot}
                  onChange={(e) => setCounsellorSlot(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-[#091122] px-3 py-2 text-sm text-slate-100"
                >
                  <option value="Weekday Evening (6–8 PM)">Weekday Evening (6–8 PM)</option>
                  <option value="Weekday Lunchtime (12–2 PM)">Weekday Lunchtime (12–2 PM)</option>
                  <option value="Saturday Morning (10 AM–12 PM)">Saturday Morning (10 AM–12 PM)</option>
                </select>
              </div>

              <div>
                <label htmlFor="c-note" className="block text-xs font-medium text-slate-300 mb-1">
                  Questions or Goals (Optional)
                </label>
                <textarea
                  id="c-note"
                  rows={2}
                  value={counsellorNote}
                  onChange={(e) => setCounsellorNote(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-[#091122] p-2.5 text-sm text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCounsellorOpen(false)}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-cyan-500 px-5 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400"
                >
                  Submit Counselling Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
