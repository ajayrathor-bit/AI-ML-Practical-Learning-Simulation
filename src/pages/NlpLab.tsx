import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { NLP_SAMPLE_PRESETS, NLP_STEPS } from '../data/curriculum';
import { analyzeNlpText } from '../utils/simulations';
import { StepLessonPlayer } from '../components/StepLessonPlayer';
import { SimulationNotice } from '../components/SimulationNotice';

interface NlpLabProps {
  completedSteps: number[];
  onCompleteStep: (stepIndex: number) => void;
}

export function NlpLab({ completedSteps, onCompleteStep }: NlpLabProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputText, setInputText] = useState(NLP_SAMPLE_PRESETS[0].text);
  const [removeStopwords, setRemoveStopwords] = useState(true);
  const [applyStemming, setApplyStemming] = useState(true);
  const [replayNonce, setReplayNonce] = useState(0);

  useEffect(() => {
    onCompleteStep(currentStep);
  }, [currentStep, onCompleteStep]);

  const analysis = useMemo(() => analyzeNlpText(inputText), [inputText]);

  const visibleTokens = useMemo(() => {
    return analysis.tokens.filter((t) => !(removeStopwords && t.isStopword));
  }, [analysis.tokens, removeStopwords]);

  const sentimentPercent = Math.round(((analysis.score + 1) / 2) * 100);

  const handleReplay = () => setReplayNonce((n) => n + 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs text-cyan-300 font-medium">Module 04 · Language Processing</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
            Natural Language Processing Lab
          </h1>
        </div>
        <SimulationNotice label="Lexicon-Based Educational Simulation · Transparent Token Scoring" />
      </div>

      <StepLessonPlayer
        moduleTitle="NLP Lab"
        steps={NLP_STEPS}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        onReplay={handleReplay}
        completedSteps={completedSteps}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Input & Tokenization Stage */}
        <section className="lg:col-span-8 rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 sm:p-6 space-y-5">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label htmlFor="nlp-input" className="text-sm font-semibold text-slate-100">
                Sample Text Input
              </label>
              <div className="flex flex-wrap gap-1.5">
                {NLP_SAMPLE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setInputText(preset.text)}
                    className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                      inputText === preset.text
                        ? 'border-cyan-500/60 bg-cyan-500/15 text-cyan-200'
                        : 'border-slate-700 bg-[#121E36] text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
            <textarea
              id="nlp-input"
              rows={2}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter a review, support note, or sentence to tokenize..."
              className="w-full rounded-lg border border-slate-700/80 bg-[#070D19] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Animated NLP Pipeline SVG */}
          <div className="rounded-lg border border-slate-800/80 bg-[#070D19] p-3 overflow-x-auto">
            <svg
              viewBox="0 0 740 110"
              className="w-full min-w-[560px] h-auto"
              role="img"
              aria-label="Animated NLP preprocessing pipeline"
            >
              {[
                { x: 20, label: '1. Raw Text', val: `${inputText.length} chars`, active: true },
                { x: 200, label: '2. Tokenize', val: `${analysis.tokens.length} tokens`, active: true },
                {
                  x: 380,
                  label: '3. Filter & Stem',
                  val: `${visibleTokens.length} kept`,
                  active: removeStopwords || applyStemming,
                },
                { x: 560, label: '4. Sentiment', val: analysis.label, active: true },
              ].map((stage, idx) => (
                <g key={stage.label}>
                  {idx < 3 && (
                    <>
                      <line
                        x1={stage.x + 150}
                        y1="55"
                        x2={stage.x + 180}
                        y2="55"
                        stroke="#22D3EE"
                        strokeWidth="2"
                      />
                      <motion.circle
                        key={`${replayNonce}-${idx}`}
                        cx={stage.x + 150}
                        cy="55"
                        r="3.5"
                        fill="#22D3EE"
                        initial={{ cx: stage.x + 150 }}
                        animate={{ cx: stage.x + 180 }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.8 }}
                      />
                    </>
                  )}
                  <rect
                    x={stage.x}
                    y="20"
                    width="150"
                    height="70"
                    rx="8"
                    fill="#0D1628"
                    stroke={stage.active ? '#3B82F6' : '#1E293B'}
                    strokeWidth="1.5"
                  />
                  <text x={stage.x + 75} y="48" textAnchor="middle" fill="#F1F5F9" fontSize="11.5" fontWeight="600">
                    {stage.label}
                  </text>
                  <text
                    x={stage.x + 75}
                    y="70"
                    textAnchor="middle"
                    fill="#22D3EE"
                    fontSize="11"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {stage.val}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Token Stream Output */}
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-slate-100">
                Processed Token Stream ({visibleTokens.length} active tokens)
              </h3>
              <div className="flex items-center gap-4 text-xs text-slate-300">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={removeStopwords}
                    onChange={(e) => setRemoveStopwords(e.target.checked)}
                    className="accent-cyan-400 h-4 w-4"
                  />
                  <span>Remove Stopwords</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={applyStemming}
                    onChange={(e) => setApplyStemming(e.target.checked)}
                    className="accent-cyan-400 h-4 w-4"
                  />
                  <span>Apply Stemming</span>
                </label>
              </div>
            </div>

            {analysis.tokens.length === 0 ? (
              <div className="rounded-lg border border-slate-800 bg-[#091020] p-4 text-xs text-slate-400">
                Enter text above to inspect tokens and sentiment weights.
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 rounded-lg border border-slate-800 bg-[#091020] p-4">
                {analysis.tokens.map((tok, idx) => {
                  const filteredOut = removeStopwords && tok.isStopword;
                  const displayWord = applyStemming ? tok.stem : tok.normalized;
                  const toneClass =
                    tok.sentiment === 'positive'
                      ? 'border-cyan-500/50 bg-cyan-500/12 text-cyan-200'
                      : tok.sentiment === 'negative'
                      ? 'border-rose-500/50 bg-rose-500/12 text-rose-200'
                      : filteredOut
                      ? 'border-slate-800 bg-slate-900/40 text-slate-600 line-through'
                      : 'border-slate-700/80 bg-[#121E36] text-slate-200';

                  return (
                    <span
                      key={`${tok.normalized}-${idx}`}
                      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs ${toneClass}`}
                    >
                      <span>{displayWord}</span>
                      {tok.weight !== 0 && (
                        <span className="text-[10px] opacity-80">
                          {tok.weight > 0 ? `+${tok.weight}` : tok.weight}
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Right Sentiment Breakdown */}
        <section className="lg:col-span-4 rounded-xl border border-slate-800/90 bg-[#0D1628] p-5 sm:p-6 flex flex-col justify-between gap-5">
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-slate-100">
              Sentiment Analysis Readout
            </h3>

            <div className="rounded-lg border border-slate-800 bg-[#091020] p-4 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-400">Classification</span>
                <span
                  className={`text-sm font-semibold ${
                    analysis.label === 'Positive'
                      ? 'text-cyan-300'
                      : analysis.label === 'Negative'
                      ? 'text-rose-300'
                      : 'text-slate-200'
                  }`}
                >
                  {analysis.label}
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-400">Polarity Score (-1 to +1)</span>
                <span className="font-mono text-lg font-bold text-slate-100 tabular-nums">
                  {analysis.score > 0 ? `+${analysis.score}` : analysis.score}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-400 via-slate-400 to-cyan-400 transition-all duration-300"
                    style={{ width: `${sentimentPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>Negative</span>
                  <span>Neutral</span>
                  <span>Positive</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg border border-slate-800 bg-[#091020] p-3">
                <div className="font-mono text-lg font-bold text-cyan-300 tabular-nums">
                  {analysis.positiveCount}
                </div>
                <div className="text-[11px] text-slate-400">Positive</div>
              </div>
              <div className="rounded-lg border border-slate-800 bg-[#091020] p-3">
                <div className="font-mono text-lg font-bold text-slate-200 tabular-nums">
                  {analysis.neutralCount}
                </div>
                <div className="text-[11px] text-slate-400">Content</div>
              </div>
              <div className="rounded-lg border border-slate-800 bg-[#091020] p-3">
                <div className="font-mono text-lg font-bold text-rose-300 tabular-nums">
                  {analysis.negativeCount}
                </div>
                <div className="text-[11px] text-slate-400">Negative</div>
              </div>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-slate-400 border-t border-slate-800/80 pt-4">
            Try typing words like <span className="text-cyan-300 font-mono">excellent</span>,{' '}
            <span className="text-cyan-300 font-mono">clear</span>,{' '}
            <span className="text-rose-300 font-mono">delayed</span>, or{' '}
            <span className="text-rose-300 font-mono">confusing</span> to watch token attribution shift immediately.
          </p>
        </section>
      </div>
    </div>
  );
}
