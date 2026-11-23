import { useState, type ChangeEvent } from 'react';
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
  AlertTriangle,
  Bot,
  Code2,
  Cpu,
  Download,
  FileText,
  Send,
  ShieldAlert,
  Sparkles,
  Upload,
} from 'lucide-react';
import {
  SAMPLE_CODE_SNIPPETS,
  SAMPLE_INVOICES,
  TECH_EXPLAINERS,
} from '../../data/careerStudioData';
import type { ProjectLabId, TechExplainerId } from '../../types/careerStudio';
import {
  analyzeCodeForBugs,
  analyzeSupportMessage,
  downloadDocumentExtractPdf,
  parseStructuredDocument,
  simulateBusinessIntelligence,
  simulateMarketingIntelligence,
} from '../../utils/careerSimulations';

interface Part2Props {
  activeProjectId:
    | 'document-intelligence'
    | 'customer-support-agent'
    | 'business-intelligence'
    | 'code-assistant'
    | 'marketing-intelligence';
}

export function InteractiveProjectsLabPart2({ activeProjectId }: Part2Props) {
  // Project 6: Document Intelligence
  const [selectedDocId, setSelectedDocId] = useState(SAMPLE_INVOICES[0].id);
  const [docRawText, setDocRawText] = useState(SAMPLE_INVOICES[0].rawText);
  const [docSourceLabel, setDocSourceLabel] = useState(SAMPLE_INVOICES[0].label);

  // Project 7: Support Agent
  const [supportDraft, setSupportDraft] = useState(
    'We were charged twice on our monthly invoice and the export feature keeps throwing a 500 error!'
  );
  const [conversationLog, setConversationLog] = useState<
    Array<{ id: string; userMsg: string; analysis: ReturnType<typeof analyzeSupportMessage> }>
  >(() => [
    {
      id: 'init-1',
      userMsg: 'Can you share where to update our SSO domain configuration?',
      analysis: analyzeSupportMessage('Can you share where to update our SSO domain configuration?'),
    },
  ]);

  // Project 8: Business Intelligence
  const [growthLever, setGrowthLever] = useState(14);
  const [costEfficiency, setCostEfficiency] = useState(6);
  const [churnReduction, setChurnReduction] = useState(2);

  // Project 9: Code Assistant
  const [selectedCodeId, setSelectedCodeId] = useState(SAMPLE_CODE_SNIPPETS[0].id);
  const [codeEditorText, setCodeEditorText] = useState(SAMPLE_CODE_SNIPPETS[0].code);

  // Project 10: Marketing Intelligence
  const [mktBudget, setMktBudget] = useState(65);
  const [mktEmailMix, setMktEmailMix] = useState(30);
  const [mktSegment, setMktSegment] = useState<
    'High-Intent Repeat Buyers' | 'Mid-Funnel Evaluators' | 'Price-Sensitive Browsers'
  >('High-Intent Repeat Buyers');

  const parsedDoc = parseStructuredDocument(docRawText);
  const biResult = simulateBusinessIntelligence({
    growthTargetPct: growthLever,
    costEfficiencyPct: costEfficiency,
    churnReductionPts: churnReduction,
  });
  const codeResult = analyzeCodeForBugs(codeEditorText);
  const mktResult = simulateMarketingIntelligence({
    monthlyBudgetK: mktBudget,
    audienceSegment: mktSegment,
    channelMixEmailPct: mktEmailMix,
  });

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setDocRawText(reader.result.slice(0, 6000));
        setDocSourceLabel(file.name);
        setSelectedDocId('custom-upload');
      }
    };
    reader.readAsText(file);
  };

  const handleSendSupport = () => {
    const trimmed = supportDraft.trim();
    if (!trimmed) return;
    const analysis = analyzeSupportMessage(trimmed);
    setConversationLog((prev) => [
      { id: String(Date.now()), userMsg: trimmed, analysis },
      ...prev,
    ]);
    setSupportDraft('');
  };

  return (
    <>
      {/* PROJECT 6: AI DOCUMENT INTELLIGENCE */}
      {activeProjectId === 'document-intelligence' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-medium text-slate-300">Preloaded Sample Invoices &amp; Claims</span>
              <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-700 bg-[#091122] px-3 py-1.5 text-xs text-cyan-200 hover:border-cyan-500/40">
                <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Upload .txt / .csv</span>
                <input
                  type="file"
                  accept=".txt,.csv,.json,.md"
                  onChange={handleFileUpload}
                  className="sr-only"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-2">
              {SAMPLE_INVOICES.map((inv) => (
                <button
                  key={inv.id}
                  type="button"
                  onClick={() => {
                    setSelectedDocId(inv.id);
                    setDocRawText(inv.rawText);
                    setDocSourceLabel(inv.label);
                  }}
                  className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                    selectedDocId === inv.id
                      ? 'border-cyan-400 bg-cyan-500/12 text-slate-100'
                      : 'border-slate-800 bg-[#091122] text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {inv.label}
                </button>
              ))}
            </div>

            <div>
              <label htmlFor="doc-raw-input" className="block text-xs font-medium text-slate-300 mb-1.5">
                Raw Document Text (Edit or delete a line like &quot;PO NUMBER:&quot; to see live detection)
              </label>
              <textarea
                id="doc-raw-input"
                rows={9}
                value={docRawText}
                onChange={(e) => setDocRawText(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-[#091122] p-3 font-mono text-xs text-slate-100 leading-relaxed"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 min-w-0 rounded-xl border border-slate-800 bg-[#091122] p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-xs text-slate-400">Extracted Structured Record</div>
                <div className="font-mono text-lg font-bold text-cyan-300 tabular-nums">
                  {parsedDoc.confidencePct}% Schema Completeness
                </div>
              </div>
              <button
                type="button"
                onClick={() => downloadDocumentExtractPdf(parsedDoc, docSourceLabel)}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-cyan-500 px-3.5 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Download PDF Report</span>
              </button>
            </div>

            {parsedDoc.missingFields.length > 0 && (
              <div className="flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-200">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Missing Required Fields Flagged: {parsedDoc.missingFields.join(', ')}
                </span>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <tbody className="divide-y divide-slate-800">
                  {[
                    ['Vendor', parsedDoc.vendorName],
                    ['Document ID', parsedDoc.documentId],
                    ['Issue Date', parsedDoc.documentDate],
                    ['PO / Reference', parsedDoc.poNumber],
                    ['Subtotal', parsedDoc.subtotal],
                    ['Tax Amount', parsedDoc.taxAmount],
                    ['Total Due', parsedDoc.totalDue],
                    ['Payment Terms', parsedDoc.paymentTerms],
                  ].map(([label, val]) => (
                    <tr key={label}>
                      <td className="py-2 pr-3 font-medium text-slate-400">{label}</td>
                      <td className="py-2 font-mono text-slate-100">
                        {val ?? <span className="text-amber-300">MISSING — NEEDS REVIEW</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT 7: AI CUSTOMER SUPPORT AGENT */}
      {activeProjectId === 'customer-support-agent' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4 min-w-0">
            <div className="flex flex-wrap gap-2">
              {[
                'We were charged twice on our invoice and need an urgent refund!',
                'Export keeps crashing with 500 error since this morning.',
                'Thanks! Can you remind me where to download our monthly receipt?',
              ].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSupportDraft(preset)}
                  className="rounded-lg border border-slate-800 bg-[#091122] px-2.5 py-1.5 text-left text-[11px] text-slate-300 hover:border-cyan-500/40"
                >
                  {preset}
                </button>
              ))}
            </div>

            <div>
              <label htmlFor="support-msg-input" className="block text-xs font-medium text-slate-300 mb-1.5">
                Simulate Incoming Customer Message
              </label>
              <textarea
                id="support-msg-input"
                rows={4}
                value={supportDraft}
                onChange={(e) => setSupportDraft(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-[#091122] p-3 text-xs sm:text-sm text-slate-100"
              />
            </div>

            <button
              type="button"
              onClick={handleSendSupport}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-cyan-400"
            >
              <Send className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Analyze &amp; Generate Agent Draft</span>
            </button>
          </div>

          <div className="lg:col-span-6 space-y-3 min-w-0 rounded-xl border border-slate-800 bg-[#091122] p-5 max-h-[420px] overflow-y-auto">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Bot className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                <span>Conversation Analytics &amp; Triage Feed ({conversationLog.length})</span>
              </span>
              <span className="font-mono text-[11px] text-slate-400">Simulated NLP Demo</span>
            </div>

            {conversationLog.map((entry) => (
              <div
                key={entry.id}
                className="rounded-lg border border-slate-800 bg-[#0D1628] p-3.5 space-y-2 text-xs"
              >
                <div className="text-slate-300 italic">&ldquo;{entry.userMsg}&rdquo;</div>
                <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
                  <span className="text-cyan-300">Intent: {entry.analysis.intent}</span>
                  <span
                    className={
                      entry.analysis.sentiment === 'Distressed / Urgent'
                        ? 'text-rose-300'
                        : 'text-emerald-300'
                    }
                  >
                    Sentiment: {entry.analysis.sentiment}
                  </span>
                  <span className="text-slate-400">Conf: {entry.analysis.confidencePct}%</span>
                </div>
                {entry.analysis.escalationRequired && (
                  <div className="flex items-center gap-1.5 text-[11px] text-amber-300">
                    <ShieldAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{entry.analysis.escalationReason}</span>
                  </div>
                )}
                <div className="border-t border-slate-800 pt-2 text-slate-200">
                  Draft Reply: {entry.analysis.suggestedReply}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PROJECT 8: BUSINESS INTELLIGENCE SUITE */}
      {activeProjectId === 'business-intelligence' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4 min-w-0">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <label htmlFor="bi-growth" className="text-slate-300">Target Top-Line Growth Lever</label>
                <span className="font-mono text-cyan-300 tabular-nums">
                  {growthLever >= 0 ? '+' : ''}{growthLever}%
                </span>
              </div>
              <input
                id="bi-growth"
                type="range"
                min={-10}
                max={35}
                value={growthLever}
                onChange={(e) => setGrowthLever(Number(e.target.value))}
                className="w-full lab-slider"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <label htmlFor="bi-cost" className="text-slate-300">Automation Cost Efficiency</label>
                <span className="font-mono text-cyan-300 tabular-nums">+{costEfficiency}%</span>
              </div>
              <input
                id="bi-cost"
                type="range"
                min={0}
                max={20}
                value={costEfficiency}
                onChange={(e) => setCostEfficiency(Number(e.target.value))}
                className="w-full lab-slider"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <label htmlFor="bi-churn" className="text-slate-300">Annual Retention Lift</label>
                <span className="font-mono text-cyan-300 tabular-nums">-{churnReduction} pts churn</span>
              </div>
              <input
                id="bi-churn"
                type="range"
                min={0}
                max={5}
                value={churnReduction}
                onChange={(e) => setChurnReduction(Number(e.target.value))}
                className="w-full lab-slider"
              />
            </div>

            <div className="rounded-lg border border-slate-800 bg-[#091122] p-3.5 space-y-2">
              <div className="text-xs font-semibold text-cyan-300">Auto-Generated Executive Brief</div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {biResult.executiveInsights.map((insight) => (
                  <li key={insight}>• {insight}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 min-w-0 rounded-xl border border-slate-800 bg-[#091122] p-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-slate-800 bg-[#0D1628] p-3">
                <div className="text-[11px] text-slate-400">Projected Annual Revenue</div>
                <div className="font-mono text-2xl font-bold text-cyan-300 tabular-nums">
                  ${(biResult.annualProjectedRevenueK / 1000).toFixed(2)}M
                </div>
              </div>
              <div className="rounded-lg border border-slate-800 bg-[#0D1628] p-3">
                <div className="text-[11px] text-slate-400">Avg EBITDA Margin</div>
                <div className="font-mono text-2xl font-bold text-emerald-300 tabular-nums">
                  {biResult.projectedAvgMarginPct}%
                </div>
              </div>
            </div>

            <div className="h-56 w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={biResult.quarters}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis dataKey="quarter" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0D1628', borderColor: '#334155', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="revenueK" name="Baseline ($K)" fill="#475569" radius={[4, 4, 0, 0]} />
                  <Bar
                    dataKey="projectedRevenueK"
                    name="Scenario Projection ($K)"
                    fill="#22D3EE"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT 9: AI CODE ASSISTANT & BUG DETECTION */}
      {activeProjectId === 'code-assistant' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4 min-w-0">
            <div className="flex flex-wrap gap-2">
              {SAMPLE_CODE_SNIPPETS.map((snip) => (
                <button
                  key={snip.id}
                  type="button"
                  onClick={() => {
                    setSelectedCodeId(snip.id);
                    setCodeEditorText(snip.code);
                  }}
                  className={`rounded-lg border px-3 py-1.5 text-xs text-left transition-colors ${
                    selectedCodeId === snip.id
                      ? 'border-cyan-400 bg-cyan-500/12 text-slate-100'
                      : 'border-slate-800 bg-[#091122] text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {snip.title}
                </button>
              ))}
            </div>

            <div>
              <label htmlFor="code-editor-area" className="block text-xs font-medium text-slate-300 mb-1.5">
                Inspect or Edit Code Snippet Live
              </label>
              <textarea
                id="code-editor-area"
                rows={8}
                value={codeEditorText}
                onChange={(e) => setCodeEditorText(e.target.value)}
                spellCheck={false}
                className="w-full rounded-lg border border-slate-700 bg-[#091122] p-3 font-mono text-xs text-cyan-100 leading-relaxed"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4 min-w-0 rounded-xl border border-slate-800 bg-[#091122] p-5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-100 flex items-center gap-1.5">
                <Code2 className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                <span>Automated Static &amp; Semantic Inspection</span>
              </span>
              <span className="font-mono text-amber-300">{codeResult.findings.length} Finding(s)</span>
            </div>

            <div className="text-xs text-slate-300">{codeResult.readinessSummary}</div>

            <div className="space-y-3">
              {codeResult.findings.map((finding) => (
                <div
                  key={finding.title}
                  className="rounded-lg border border-slate-800 bg-[#0D1628] p-3.5 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-100">{finding.title}</span>
                    <span
                      className={`font-mono text-[11px] ${
                        finding.severity === 'High' ? 'text-rose-300' : 'text-amber-300'
                      }`}
                    >
                      {finding.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-slate-400">{finding.explanation}</p>
                  <p className="text-emerald-300">Suggested Fix: {finding.suggestedFix}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-slate-800 bg-[#070D19] p-3">
              <div className="text-[11px] font-medium text-cyan-300 mb-1">
                Generated Regression Test Starter
              </div>
              <pre className="font-mono text-[11px] text-slate-200 overflow-x-auto">
                {codeResult.generatedTestSnippet}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT 10: AI MARKETING CAMPAIGN INTELLIGENCE */}
      {activeProjectId === 'marketing-intelligence' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4 min-w-0">
            <div>
              <label htmlFor="mkt-segment" className="block text-xs font-medium text-slate-300 mb-1.5">
                Target Cluster Segment
              </label>
              <select
                id="mkt-segment"
                value={mktSegment}
                onChange={(e) =>
                  setMktSegment(
                    e.target.value as
                      | 'High-Intent Repeat Buyers'
                      | 'Mid-Funnel Evaluators'
                      | 'Price-Sensitive Browsers'
                  )
                }
                className="w-full rounded-lg border border-slate-700 bg-[#091122] px-3 py-2 text-sm text-slate-100"
              >
                <option value="High-Intent Repeat Buyers">High-Intent Repeat Buyers</option>
                <option value="Mid-Funnel Evaluators">Mid-Funnel Evaluators</option>
                <option value="Price-Sensitive Browsers">Price-Sensitive Browsers</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <label htmlFor="mkt-budget" className="text-slate-300">Monthly Campaign Spend</label>
                <span className="font-mono text-cyan-300 tabular-nums">${mktBudget}K</span>
              </div>
              <input
                id="mkt-budget"
                type="range"
                min={10}
                max={150}
                step={5}
                value={mktBudget}
                onChange={(e) => setMktBudget(Number(e.target.value))}
                className="w-full lab-slider"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <label htmlFor="mkt-email" className="text-slate-300">Lifecycle Email Retention Share</label>
                <span className="font-mono text-cyan-300 tabular-nums">{mktEmailMix}%</span>
              </div>
              <input
                id="mkt-email"
                type="range"
                min={10}
                max={60}
                value={mktEmailMix}
                onChange={(e) => setMktEmailMix(Number(e.target.value))}
                className="w-full lab-slider"
              />
            </div>

            <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/8 p-3.5 space-y-1.5 text-xs">
              <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Segment Copy Suggestion (Human Review Before Publish)</span>
              </div>
              <div className="text-slate-100 font-medium">{mktResult.suggestedHeadline}</div>
              <div className="text-slate-400">Primary CTA: {mktResult.suggestedCta}</div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 min-w-0 rounded-xl border border-slate-800 bg-[#091122] p-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-slate-800 bg-[#0D1628] p-3">
                <div className="text-[11px] text-slate-400">Est. Monthly Conversions</div>
                <div className="font-mono text-2xl font-bold text-cyan-300 tabular-nums">
                  {mktResult.estimatedConversions}
                </div>
              </div>
              <div className="rounded-lg border border-slate-800 bg-[#0D1628] p-3">
                <div className="text-[11px] text-slate-400">Predicted Blended ROAS</div>
                <div className="font-mono text-2xl font-bold text-emerald-300 tabular-nums">
                  {mktResult.estimatedBlendedRoas}×
                </div>
              </div>
            </div>

            <div className="h-56 w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mktResult.segments}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis dataKey="segment" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0D1628', borderColor: '#334155', fontSize: '12px' }}
                  />
                  <Bar dataKey="projectedConversions" name="Conversions" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ==========================================
// STEP 6: 14-Technology Explainer Component
// ==========================================

export function TechnologyExplainerPanel({
  activeProjectId,
}: {
  activeProjectId: ProjectLabId;
}) {
  const [selectedTechId, setSelectedTechId] = useState<TechExplainerId>('python');

  const activeTech =
    TECH_EXPLAINERS.find((t) => t.id === selectedTechId) ?? TECH_EXPLAINERS[0];

  return (
    <section className="rounded-2xl border border-slate-800/90 bg-[#0D1628] p-6 space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-medium text-cyan-300">
            <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Step 6 · Under the Hood (14 Core AI/ML Technologies)</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-100">
            Technologies Powering Real AI Systems
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
            Click any of the 14 technologies below to see what it does, why production systems require it, and what you actually need to learn.
          </p>
        </div>

        <div className="rounded-lg border border-purple-500/35 bg-purple-500/10 px-4 py-2.5 text-xs text-purple-100 max-w-md leading-relaxed">
          Important Distinction: Typing casual prompts into ChatGPT is useful productivity, but it is NOT Machine Learning Engineering. Real workplace AI requires clean data pipelines (Python &amp; SQL), statistics, model evaluation, and safe human-in-the-loop integration.
        </div>
      </div>

      {/* Interactive 14-Tech Buttons */}
      <div className="flex flex-wrap gap-2">
        {TECH_EXPLAINERS.map((tech) => {
          const isSelected = tech.id === activeTech.id;
          const usedHere = tech.usedInProjects.includes(activeProjectId);
          return (
            <button
              key={tech.id}
              type="button"
              onClick={() => setSelectedTechId(tech.id)}
              aria-pressed={isSelected}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                isSelected
                  ? 'border-cyan-400 bg-cyan-500/15 text-cyan-100'
                  : usedHere
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-100 hover:border-cyan-400'
                  : 'border-slate-800 bg-[#091122] text-slate-300 hover:border-slate-700'
              }`}
            >
              <span>{tech.name}</span>
              {usedHere && (
                <span className="font-mono text-[10px] text-emerald-300" title="Used in current project">
                  ●
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Technology Breakdown */}
      <div className="rounded-xl border border-slate-800 bg-[#091122] p-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="space-y-1.5">
          <div className="text-[11px] font-mono text-cyan-300 uppercase">
            {activeTech.category}
          </div>
          <h4 className="text-base font-bold text-slate-100">{activeTech.name}</h4>
          <p className="text-xs text-slate-300 leading-relaxed">{activeTech.whatItDoes}</p>
        </div>

        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-slate-200">Why Used in Industry</div>
          <p className="text-xs text-slate-400 leading-relaxed">{activeTech.whyUsed}</p>
        </div>

        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-cyan-300">Role in These Projects</div>
          <p className="text-xs text-slate-300 leading-relaxed">{activeTech.projectContribution}</p>
        </div>

        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            <span>What Learners Should Master</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{activeTech.whatLearnerNeeds}</p>
        </div>
      </div>
    </section>
  );
}
