import type {
  AgentStepItem,
  DocumentChunk,
  LessonStep,
  ModuleMeta,
  ScatterPoint,
  StudioProjectMeta,
} from '../types/lab';

export const MODULES: ModuleMeta[] = [
  {
    id: 'foundations',
    order: 1,
    title: 'AI Foundations',
    shortTitle: 'AI Foundations',
    category: 'Core Concepts',
    duration: '12 min demo',
    summary:
      'Explore how Artificial Intelligence differs from rule-based software, compare Narrow vs General AI, and trace a live AI workflow.',
    accentColor: 'cyan',
    totalSteps: 4,
    featuredExperiment: 'Animated AI Signal Pipeline',
  },
  {
    id: 'ml',
    order: 2,
    title: 'Machine Learning Lab',
    shortTitle: 'Machine Learning',
    category: 'Classical ML',
    duration: '18 min demo',
    summary:
      'Visualize supervised regression, decision boundaries, unsupervised clustering, and step-by-step gradient descent.',
    accentColor: 'blue',
    totalSteps: 4,
    featuredExperiment: 'Interactive Training & Prediction Simulator',
  },
  {
    id: 'dl',
    order: 3,
    title: 'Deep Learning Lab',
    shortTitle: 'Deep Learning',
    category: 'Neural Networks',
    duration: '15 min demo',
    summary:
      'Inspect input, hidden, and output layers, adjust input weights, and watch activation signals propagate across neurons.',
    accentColor: 'purple',
    totalSteps: 4,
    featuredExperiment: 'Forward-Propagation Signal Explorer',
  },
  {
    id: 'nlp',
    order: 4,
    title: 'NLP Lab',
    shortTitle: 'NLP Lab',
    category: 'Language Processing',
    duration: '14 min demo',
    summary:
      'Transform raw sentences through cleaning, tokenization, stopword filtering, stemming, and lexicon sentiment scoring.',
    accentColor: 'cyan',
    totalSteps: 4,
    featuredExperiment: 'Live Text Tokenizer & Sentiment Analyzer',
  },
  {
    id: 'genai',
    order: 5,
    title: 'Generative AI Lab',
    shortTitle: 'Generative AI',
    category: 'LLMs & RAG',
    duration: '16 min demo',
    summary:
      'Experiment with prompt structure, sampling temperature, vector embeddings, and Retrieval-Augmented Generation (RAG).',
    accentColor: 'blue',
    totalSteps: 4,
    featuredExperiment: 'RAG Architecture & Prompt Playground',
  },
  {
    id: 'agentic',
    order: 6,
    title: 'Agentic AI Lab',
    shortTitle: 'Agentic AI',
    category: 'Autonomous Workflows',
    duration: '15 min demo',
    summary:
      'Step through goal decomposition, tool selection, observation feedback loops, and multi-agent orchestration.',
    accentColor: 'purple',
    totalSteps: 4,
    featuredExperiment: 'Single & Multi-Agent Loop Trace',
  },
  {
    id: 'mlops',
    order: 7,
    title: 'MLOps Lab',
    shortTitle: 'MLOps Lab',
    category: 'Production Lifecycle',
    duration: '12 min demo',
    summary:
      'Simulate continuous training pipelines, canary deployments, incoming data drift, and automated retraining triggers.',
    accentColor: 'cyan',
    totalSteps: 4,
    featuredExperiment: 'Drift Monitor & Canary Rollout Simulator',
  },
  {
    id: 'projects',
    order: 8,
    title: 'Project Studio',
    shortTitle: 'Project Studio',
    category: 'Applied Use Cases',
    duration: '20 min demo',
    summary:
      'Demonstrate five practical industry scenarios: churn prediction, sentiment monitoring, document Q&A, vision, and business insights.',
    accentColor: 'blue',
    totalSteps: 5,
    featuredExperiment: '5 Interactive Industry Prototypes',
  },
];

// ==========================================
// Module 1: AI Foundations
// ==========================================

export const FOUNDATIONS_STEPS: LessonStep[] = [
  {
    id: 'what-is-ai',
    title: '01. What Is Artificial Intelligence?',
    theory:
      'Traditional software follows explicit if-then rules written by a programmer. Artificial Intelligence learns patterns from examples so it can interpret new inputs and make decisions without hard-coded instructions for every case.',
    practical:
      'Step through the animated workflow to see how raw observations enter the system, get transformed into measurable features, and produce an actionable output.',
    demonstrates:
      'Shows the shift from static rule execution to data-driven pattern recognition across a repeatable 5-stage pipeline.',
    keyTakeaway: 'AI systems infer decision rules from data rather than relying solely on manually authored branches.',
  },
  {
    id: 'types-of-ai',
    title: '02. Capability Spectrum: Narrow, General & Theoretical Super AI',
    theory:
      'Modern production AI falls under Narrow AI (ANI)—systems tuned for specific tasks such as translation, fraud detection, or medical image triage. Artificial General Intelligence (AGI) remains an active research frontier.',
    practical:
      'Toggle between Narrow AI and General AI profiles below the diagram to compare task scope, training data needs, and real-world deployment readiness.',
    demonstrates:
      'Clarifies realistic expectations for learners by distinguishing today’s specialized Narrow AI from conceptual General Intelligence.',
    keyTakeaway: 'Every commercial AI system today is Narrow AI excelling within well-defined boundaries.',
  },
  {
    id: 'real-world-apps',
    title: '03. Real-World Industry Applications',
    theory:
      'AI adapts across sectors by pairing domain data with specialized architectures: tabular models in finance, vision networks in manufacturing, and language models in customer support.',
    practical:
      'Select an industry domain card to update the workflow diagram with domain-specific inputs, model tasks, and measurable outcomes.',
    demonstrates:
      'Connects abstract AI pipelines to tangible careers and industry problems prospective students recognize.',
    keyTakeaway: 'The core AI pipeline stays consistent while data modalities and evaluation criteria change per industry.',
  },
  {
    id: 'feedback-loop',
    title: '04. Continuous Feedback & Human Oversight',
    theory:
      'An AI system does not stop after producing one prediction. Human reviewers and outcome logs feed corrected examples back into the dataset so future iterations improve.',
    practical:
      'Replay the full workflow with the feedback loop active to observe how misclassifications update future model behavior.',
    demonstrates:
      'Highlights why human domain experts remain essential to supervising, auditing, and refining AI systems.',
    keyTakeaway: 'Human-in-the-loop feedback closes the cycle between model output and continuous improvement.',
  },
];

export const AI_INDUSTRY_APPLICATIONS = [
  {
    id: 'healthcare',
    name: 'Healthcare Triage',
    inputSample: 'Radiology scan + patient vitals',
    modelTask: 'Anomaly screening & priority scoring',
    outputSample: 'Flagged review queue for radiologist',
    impact: 'Helps clinicians prioritize urgent scans earlier in the shift.',
  },
  {
    id: 'finance',
    name: 'Payment Fraud Screening',
    inputSample: 'Transaction amount, merchant & geolocation',
    modelTask: 'Real-time risk classification',
    outputSample: 'Approve or trigger step-up verification',
    impact: 'Reduces false declines while catching unusual spending patterns.',
  },
  {
    id: 'manufacturing',
    name: 'Factory Quality Inspection',
    inputSample: 'High-speed assembly line camera feed',
    modelTask: 'Surface defect detection',
    outputSample: 'Automated part routing to rework bin',
    impact: 'Inspects components consistently at production-line speed.',
  },
  {
    id: 'retail',
    name: 'Demand & Inventory Planning',
    inputSample: 'Historical sales, seasonality & promotions',
    modelTask: 'Multi-week demand forecasting',
    outputSample: 'Regional warehouse restock quantities',
    impact: 'Balances stock availability against storage overhead.',
  },
];

// ==========================================
// Module 2: Machine Learning Lab
// ==========================================

export const ML_STEPS: LessonStep[] = [
  {
    id: 'supervised',
    title: '01. Supervised Learning Foundations',
    theory:
      'In supervised learning, every training example includes both input features (X) and a known target answer (Y). The algorithm adjusts internal parameters until its predictions closely match historical answers.',
    practical:
      'Inspect the labeled sample dataset in the coordinate stage. Notice how each data point carries an explicit target value or class.',
    demonstrates:
      'Visualizes the relationship between input features and ground-truth labels in a supervised dataset.',
    keyTakeaway: 'Supervised models learn a mapping function from labeled input-output pairs.',
  },
  {
    id: 'regression',
    title: '02. Linear Regression & Error Minimization',
    theory:
      'Regression predicts continuous numeric quantities (such as exam scores or housing prices). The model searches for a slope and intercept that minimize Mean Squared Error (MSE) across all data points.',
    practical:
      'Drag the Slope and Intercept sliders—or run Step Gradient Descent—to watch vertical error residuals shrink and MSE drop.',
    demonstrates:
      'Makes the math of loss minimization visible: better line alignment directly lowers Mean Squared Error.',
    keyTakeaway: 'Training a regression model means iteratively reducing the distance between predictions and actual values.',
  },
  {
    id: 'classification',
    title: '03. Classification & Decision Boundaries',
    theory:
      'Classification assigns inputs into discrete categories (e.g., Likely Pass vs. Needs Support). Instead of fitting through points, the model positions a decision boundary separating classes.',
    practical:
      'Switch to Classification mode and adjust the boundary slope and offset to maximize classification accuracy across the two groups.',
    demonstrates:
      'Illustrates how a geometric boundary separates two labeled classes and how misclassified points affect accuracy.',
    keyTakeaway: 'Classification boundaries divide feature space into distinct decision regions.',
  },
  {
    id: 'unsupervised',
    title: '04. Unsupervised Learning (K-Means Clustering)',
    theory:
      'Unsupervised learning works without target labels. Clustering algorithms like K-Means group similar records together based on distance in feature space, uncovering natural customer or behavioral segments.',
    practical:
      'Switch to Unsupervised mode and click Run Cluster Step to watch centroids relocate to the center of their assigned points.',
    demonstrates:
      'Shows how structure emerges automatically from unlabeled data through iterative centroid updates.',
    keyTakeaway: 'Unsupervised learning discovers hidden groupings when labeled outcomes do not exist.',
  },
];

export const ML_REGRESSION_POINTS: ScatterPoint[] = [
  { id: 1, x: 1.5, y: 34 },
  { id: 2, x: 2.2, y: 41 },
  { id: 3, x: 3.0, y: 48 },
  { id: 4, x: 3.8, y: 55 },
  { id: 5, x: 4.5, y: 58 },
  { id: 6, x: 5.4, y: 66 },
  { id: 7, x: 6.2, y: 71 },
  { id: 8, x: 7.1, y: 78 },
  { id: 9, x: 8.0, y: 84 },
  { id: 10, x: 9.0, y: 92 },
];

export const ML_CLASSIFICATION_POINTS: ScatterPoint[] = [
  { id: 1, x: 1.5, y: 3.0, label: 0 },
  { id: 2, x: 2.0, y: 2.2, label: 0 },
  { id: 3, x: 2.8, y: 3.5, label: 0 },
  { id: 4, x: 3.5, y: 2.8, label: 0 },
  { id: 5, x: 4.4, y: 4.0, label: 0 },
  { id: 6, x: 5.2, y: 3.2, label: 0 },
  { id: 7, x: 4.8, y: 7.4, label: 1 },
  { id: 8, x: 5.8, y: 6.8, label: 1 },
  { id: 9, x: 6.5, y: 8.1, label: 1 },
  { id: 10, x: 7.4, y: 7.0, label: 1 },
  { id: 11, x: 8.2, y: 8.6, label: 1 },
  { id: 12, x: 8.8, y: 7.8, label: 1 },
];

export const ML_CLUSTER_POINTS: ScatterPoint[] = [
  { id: 1, x: 1.8, y: 2.2 },
  { id: 2, x: 2.4, y: 2.9 },
  { id: 3, x: 2.9, y: 1.9 },
  { id: 4, x: 2.1, y: 3.4 },
  { id: 5, x: 5.0, y: 7.6 },
  { id: 6, x: 5.8, y: 8.2 },
  { id: 7, x: 4.7, y: 8.5 },
  { id: 8, x: 6.1, y: 7.4 },
  { id: 9, x: 8.1, y: 3.0 },
  { id: 10, x: 8.8, y: 2.4 },
  { id: 11, x: 7.6, y: 2.1 },
  { id: 12, x: 8.5, y: 3.7 },
];

// ==========================================
// Module 3: Deep Learning Lab
// ==========================================

export const DL_STEPS: LessonStep[] = [
  {
    id: 'input-layer',
    title: '01. Input Layer: Encoding Signals',
    theory:
      'Every neural network starts with an Input Layer that receives normalized numeric values representing features—such as pixel intensity, sensor readings, or structured tabular measurements.',
    practical:
      'Adjust the three Input Signal sliders (x₁, x₂, x₃) and click Replay Forward Pass to watch initial signals enter the network.',
    demonstrates:
      'Shows how real-world attributes enter a network as scaled numeric activations between 0 and 1.',
    keyTakeaway: 'Neural networks process numbers, so every input modality must be numerically encoded.',
  },
  {
    id: 'hidden-layer',
    title: '02. Hidden Layers & Weighted Connections',
    theory:
      'Each connection carries a learned weight. Hidden neurons multiply incoming signals by their weights, add a bias term, and combine them—allowing the network to detect intermediate feature combinations.',
    practical:
      'Click any neuron in the SVG network to inspect its incoming weights and weighted sum calculation.',
    demonstrates:
      'Reveals that "deep" learning is built from layered weighted sums rather than black-box magic.',
    keyTakeaway: 'Weights amplify or suppress specific input combinations as signals move deeper.',
  },
  {
    id: 'activation-fn',
    title: '03. Activation Functions (ReLU vs. Sigmoid)',
    theory:
      'Without non-linear activation functions, stacked layers collapse into a simple linear equation. ReLU zeroes out negative sums, while Sigmoid squashes values smoothly between 0 and 1.',
    practical:
      'Switch between ReLU and Sigmoid and tune the Hidden Bias slider to observe how neurons fire or stay dormant.',
    demonstrates:
      'Demonstrates how non-linear activation gates control which signals survive forward propagation.',
    keyTakeaway: 'Activation functions introduce non-linearity so networks can model complex patterns.',
  },
  {
    id: 'output-layer',
    title: '04. Output Layer & Class Probabilities',
    theory:
      'The final layer converts raw hidden activations into interpretable scores—often normalized via Softmax into probabilities summing to 100% across target classes.',
    practical:
      'Start the simulation and watch the signal wave travel across both hidden layers into the output probability bars.',
    demonstrates:
      'Connects internal neuron states directly to the final predicted probability distribution.',
    keyTakeaway: 'Forward propagation transforms raw inputs step-by-step into calibrated output probabilities.',
  },
];

export interface NeuralStageExplanation {
  stage: 0 | 1 | 2 | 3;
  label: string;
  headline: string;
  explanation: string;
  formulaNote: string;
}

export const NEURAL_STAGE_EXPLANATIONS: NeuralStageExplanation[] = [
  {
    stage: 0,
    label: 'Stage 1 · Input Layer',
    headline: 'Raw Features Enter as Numbers',
    explanation:
      'Each circular input neuron holds a single scaled number between 0.00 and 1.00—such as brightness of a pixel, sensor voltage, or hours studied. No math happens here yet; this layer simply passes your input values forward along every outgoing connection.',
    formulaNote: 'Input signal = xᵢ (scaled 0.00 to 1.00)',
  },
  {
    stage: 1,
    label: 'Stage 2 · Hidden Layer 1',
    headline: 'Weights Multiply Inputs & Activation Decides What Fires',
    explanation:
      'Signals travel along weighted SVG lines into Hidden Layer 1. Positive weights boost an input, negative weights suppress it, and a shared bias nudges the total. The activation function (ReLU or Sigmoid) then decides how strongly each neuron fires.',
    formulaNote: 'h₁ = Activation( Σ(w · x) + bias )',
  },
  {
    stage: 2,
    label: 'Stage 3 · Hidden Layer 2',
    headline: 'Combining Simple Patterns into Deeper Concepts',
    explanation:
      'Having a second hidden layer is what makes a network "deep." Neurons in Hidden Layer 2 combine the outputs of Hidden Layer 1—turning basic edges or clues into richer composite patterns before making a final decision.',
    formulaNote: 'h₂ = Activation( Σ(w · h₁) + bias )',
  },
  {
    stage: 3,
    label: 'Stage 4 · Output Layer',
    headline: 'Final Scores & Probability Prediction',
    explanation:
      'The Output Layer gathers signals from Hidden Layer 2 and converts them into confidence percentages using Softmax. All output percentages add up to 100%, showing which class the simulated network favors most.',
    formulaNote: 'P(Class) = Softmax( Σ(w · h₂) )',
  },
];

export interface NeuralConceptGuide {
  id: 'input' | 'weights' | 'activation' | 'output';
  title: string;
  simpleSummary: string;
  analogy: string;
}

export const NEURAL_CONCEPT_GUIDES: NeuralConceptGuide[] = [
  {
    id: 'input',
    title: 'Input',
    simpleSummary:
      'Inputs are the clues we hand to the network—converted into numbers between 0 and 1 so math can work on them.',
    analogy: 'Think of inputs like ingredients measured on a kitchen scale before cooking.',
  },
  {
    id: 'weights',
    title: 'Weights',
    simpleSummary:
      'Weights act like importance dials on every connecting line. Larger positive weights amplify a signal; negative weights push against it.',
    analogy: 'Like adjusting volume sliders on a sound mixer—some channels matter more than others.',
  },
  {
    id: 'activation',
    title: 'Activation Functions',
    simpleSummary:
      'An activation function is a gate inside each hidden neuron. ReLU drops negative totals to 0, while Sigmoid squeezes any number smoothly between 0 and 1.',
    analogy: 'Like a dimmer switch or threshold sensor that decides whether a signal is strong enough to pass forward.',
  },
  {
    id: 'output',
    title: 'Output',
    simpleSummary:
      'The output layer translates the network’s final calculations into human-readable confidence percentages for each possible answer.',
    analogy: 'Like a weather forecast giving 70% chance of sun vs. 30% chance of rain.',
  },
];

// ==========================================
// Module 4: NLP Lab
// ==========================================

export const NLP_STEPS: LessonStep[] = [
  {
    id: 'raw-cleaning',
    title: '01. Text Normalization & Cleaning',
    theory:
      'Human text contains inconsistent casing, punctuation, and formatting noise. Preprocessing standardizes text—lowercasing words and stripping punctuation—so identical concepts map consistently.',
    practical:
      'Choose a sample message or type your own sentence, then toggle Lowercase & Clean to inspect normalized text.',
    demonstrates:
      'Illustrates why consistent normalization prevents models from treating "Fast" and "fast!" as unrelated symbols.',
    keyTakeaway: 'Clean text normalization shrinks vocabulary noise before any model sees the data.',
  },
  {
    id: 'tokenization',
    title: '02. Tokenization: Splitting Language into Units',
    theory:
      'Models cannot read raw strings directly; tokenizers split sentences into discrete tokens (words, subwords, or punctuation units) that can be indexed into numerical IDs.',
    practical:
      'Observe how your sentence breaks into individual visual token chips in the NLP pipeline diagram.',
    demonstrates:
      'Shows the bridge between unstructured prose and countable discrete language units.',
    keyTakeaway: 'Tokenization converts continuous text into structured sequences of model-ready units.',
  },
  {
    id: 'stopwords-stemming',
    title: '03. Stopword Filtering & Stemming',
    theory:
      'High-frequency filler words ("the", "is", "and") carry little topical meaning in classical NLP pipelines. Stemming trims suffixes so variants like "delayed" and "delay" share a root form.',
    practical:
      'Toggle Stopword Removal and Stemming in the pipeline controls to watch filtered filler words dim and roots simplify.',
    demonstrates:
      'Highlights how classical NLP reduces dimensionality by focusing on high-signal content words.',
    keyTakeaway: 'Removing low-signal words and normalizing word endings sharpens downstream analysis.',
  },
  {
    id: 'sentiment',
    title: '04. Lexicon Sentiment Attribution',
    theory:
      'Sentiment models evaluate how positive and negative terms combine to express overall tone. In this transparent demo, lexicon weights let us trace exactly which words pushed the score.',
    practical:
      'Edit the text input with words like "intuitive", "reliable", "slow", or "confusing" and watch the sentiment gauge update live.',
    demonstrates:
      'Provides transparent word-level attribution explaining how text features yield a sentiment classification.',
    keyTakeaway: 'Sentiment analysis aggregates word and phrase signals into an actionable polarity score.',
  },
];

export const NLP_SAMPLE_PRESETS = [
  {
    id: 'positive-review',
    label: 'Product Feedback',
    text: 'The new analytics dashboard is fast, intuitive, and very reliable for daily reviews.',
  },
  {
    id: 'support-ticket',
    label: 'Support Escalation',
    text: 'Checkout export was slow and confusing, and the report crashed with an error.',
  },
  {
    id: 'mixed-note',
    label: 'Balanced Survey',
    text: 'Onboarding documentation is clear and helpful, though initial setup was slightly hard.',
  },
];

// ==========================================
// Module 5: Generative AI Lab
// ==========================================

export const GENAI_STEPS: LessonStep[] = [
  {
    id: 'prompt-engineering',
    title: '01. Structured Prompt Engineering',
    theory:
      'Large Language Models respond strongly to instruction clarity. Specifying a Role, Domain Context, and Output Constraints narrows the probability distribution toward accurate, structured responses.',
    practical:
      'Toggle Role, Context, and Output Format modifiers in the Prompt Playground to compare vague vs. engineered prompts.',
    demonstrates:
      'Shows how prompt structure directly guides output specificity and formatting reliability.',
    keyTakeaway: 'Clear roles, context, and constraints turn open-ended generation into predictable outputs.',
  },
  {
    id: 'token-sampling',
    title: '02. Next-Token Probabilities, Temperature & Top-K',
    theory:
      'LLMs generate text one token at a time by sampling from a probability distribution. Lower temperature sharpens focus onto top candidates; higher temperature flattens odds for creative variation.',
    practical:
      'Adjust the Temperature and Top-K sliders and watch the candidate token probability bars reshape immediately.',
    demonstrates:
      'Demystifies LLM creativity vs. determinism through real softmax probability scaling.',
    keyTakeaway: 'Temperature and Top-K balance factual consistency against creative diversity during decoding.',
  },
  {
    id: 'embeddings',
    title: '03. Vector Embeddings & Semantic Similarity',
    theory:
      'Embeddings map text into geometric coordinates where similar meanings sit close together. Instead of exact keyword matching, vector search measures cosine similarity between query and document vectors.',
    practical:
      'Select different user queries in the 2D Vector Space plot to see how cosine similarity ranks nearby document chunks.',
    demonstrates:
      'Visualizes semantic search in coordinate space so learners grasp how embeddings capture meaning.',
    keyTakeaway: 'Embeddings convert meaning into geometry so related concepts can be retrieved mathematically.',
  },
  {
    id: 'rag-architecture',
    title: '04. RAG Architecture (Retrieval-Augmented Generation)',
    theory:
      'RAG grounds an LLM in up-to-date private documents. A query retrieves relevant chunks from a vector store, injects them into the prompt context, and instructs the model to synthesize a cited answer.',
    practical:
      'Step through or replay the animated 5-stage RAG architecture diagram to follow the query from search to grounded answer.',
    demonstrates:
      'Explains how enterprises reduce hallucinations and keep AI answers anchored to verified source material.',
    keyTakeaway: 'RAG combines semantic retrieval with LLM synthesis for accurate, auditable answers.',
  },
];

export const RAG_DOCUMENT_CHUNKS: DocumentChunk[] = [
  {
    id: 'chunk-onboarding',
    title: 'Curriculum Prerequisites Guide',
    source: 'Program Handbook · Sec 2.1',
    content:
      'Prospective learners begin with Python fundamentals and statistics before advancing to supervised models and neural architectures.',
    vector: [0.92, 0.24],
    keywords: ['prerequisites', 'python', 'curriculum', 'begin'],
  },
  {
    id: 'chunk-rag',
    title: 'Enterprise RAG Deployment Patterns',
    source: 'Architecture Notes · Sec 4.3',
    content:
      'Chunking documents into 400-token windows with overlap preserves context while vector indexing keeps retrieval latency under 50ms.',
    vector: [0.32, 0.94],
    keywords: ['rag', 'chunking', 'vector', 'retrieval'],
  },
  {
    id: 'chunk-mlops',
    title: 'Production Model Monitoring Checklist',
    source: 'Operations Playbook · Sec 6.2',
    content:
      'Track feature distribution drift weekly and route 10% canary traffic before promoting newly retrained checkpoints.',
    vector: [0.64, 0.72],
    keywords: ['monitoring', 'drift', 'canary', 'production'],
  },
];

export const GENAI_QUERY_PRESETS = [
  {
    id: 'q-curriculum',
    query: 'What skills do new students need before starting machine learning?',
    vector: [0.91, 0.21] as [number, number],
  },
  {
    id: 'q-rag',
    query: 'How should we index enterprise PDFs for low-latency vector retrieval?',
    vector: [0.28, 0.95] as [number, number],
  },
  {
    id: 'q-ops',
    query: 'How do teams safely roll out an updated model and watch for drift?',
    vector: [0.62, 0.74] as [number, number],
  },
];

// ==========================================
// Module 6: Agentic AI Lab
// ==========================================

export const AGENTIC_STEPS: LessonStep[] = [
  {
    id: 'goal-planning',
    title: '01. Goal Intake & Task Decomposition',
    theory:
      'Unlike single-turn chatbots, an AI Agent receives a high-level objective and decomposes it into ordered sub-tasks, identifying dependencies and required external capabilities.',
    practical:
      'Pick a scenario and step forward to see the agent break a broad goal into concrete executable milestones.',
    demonstrates:
      'Distinguishes single-prompt generation from autonomous multi-step planning.',
    keyTakeaway: 'Planning turns an open-ended objective into a structured execution checklist.',
  },
  {
    id: 'reasoning-tools',
    title: '02. Reasoning & Dynamic Tool Selection',
    theory:
      'At each step, the agent reasons about what information is missing and selects an appropriate tool—such as a SQL database query, calendar API, or calculator—with structured arguments.',
    practical:
      'Observe the active reasoning trace and tool schema call highlighted in the animated execution stage.',
    demonstrates:
      'Shows how agents overcome static knowledge limits by invoking external deterministic tools.',
    keyTakeaway: 'Tool calling equips language models to query live systems and perform exact operations.',
  },
  {
    id: 'observation-loop',
    title: '03. Observation, Verification & Self-Correction',
    theory:
      'After executing a tool, the agent inspects the returned observation. If data is incomplete or an error occurs, the loop lets the agent adjust parameters and retry before answering.',
    practical:
      'Follow the feedback arrow from Tool Execution back to Reasoning to see how observations shape the next decision.',
    demonstrates:
      'Illustrates the ReAct (Reason + Act + Observe) feedback cycle that improves reliability.',
    keyTakeaway: 'Agents verify tool results iteratively rather than assuming the first step succeeded.',
  },
  {
    id: 'multi-agent',
    title: '04. Multi-Agent Collaboration',
    theory:
      'Complex workflows often split responsibilities across specialist agents—such as a Planner, Research Agent, Analyst Agent, and Reviewer—coordinated by an orchestrator.',
    practical:
      'Toggle to Multi-Agent Architecture mode and replay the sequence to watch specialized agents exchange structured handoffs.',
    demonstrates:
      'Demonstrates why modular specialist agents scale better than one monolithic prompt on complex tasks.',
    keyTakeaway: 'Multi-agent systems divide labor into focused roles with clear verification handoffs.',
  },
];

export const AGENT_SCENARIOS: Record<
  string,
  { label: string; goal: string; steps: AgentStepItem[] }
> = {
  incident: {
    label: 'Incident Triage Agent',
    goal: 'Investigate checkout latency spike and draft a mitigation summary.',
    steps: [
      {
        id: 's1',
        phase: 'Goal',
        actor: 'User / Alert Trigger',
        summary: 'P95 API latency crossed 850ms threshold.',
        detail: 'Objective: diagnose root cause, verify recent deployments, and propose rollback.',
      },
      {
        id: 's2',
        phase: 'Plan',
        actor: 'Planner',
        summary: 'Create 3-step investigation checklist.',
        detail: '1) Fetch error logs, 2) Check recent deploy diff, 3) Draft incident summary.',
      },
      {
        id: 's3',
        phase: 'Reason',
        actor: 'Reasoning Engine',
        summary: 'Need telemetry metrics from the past 30 minutes.',
        detail: 'Selecting query_metrics_db(service="checkout-api", window="30m").',
      },
      {
        id: 's4',
        phase: 'Tool Call',
        actor: 'Telemetry Tool',
        summary: 'Executed query_metrics_db -> returned DB pool saturation.',
        detail: 'Result: connection_pool_wait = 680ms following build #418.',
      },
      {
        id: 's5',
        phase: 'Observation',
        actor: 'Reviewer',
        summary: 'Root cause confirmed; safe to recommend build #417 rollback.',
        detail: 'Cross-checked build #417 baseline latency (42ms) with zero regressions.',
      },
      {
        id: 's6',
        phase: 'Response',
        actor: 'Orchestrator',
        summary: 'Delivered structured mitigation plan to on-call engineer.',
        detail: 'Summary includes root cause, evidence metrics, and one-click rollback command.',
      },
    ],
  },
  research: {
    label: 'Curriculum Advisor Agent',
    goal: 'Build a personalized 8-week AI study roadmap for a working analyst.',
    steps: [
      {
        id: 'r1',
        phase: 'Goal',
        actor: 'Prospective Student',
        summary: 'Has SQL experience, 6 hrs/week, wants applied ML skills.',
        detail: 'Objective: tailor sequence balancing theory, labs, and capstone project.',
      },
      {
        id: 'r2',
        phase: 'Plan',
        actor: 'Planner',
        summary: 'Map skill gaps against module prerequisites.',
        detail: '1) Audit Python readiness, 2) Select core labs, 3) Assign capstone.',
      },
      {
        id: 'r3',
        phase: 'Reason',
        actor: 'Advisor Agent',
        summary: 'Check syllabus hours per module before scheduling.',
        detail: 'Calling get_module_catalog(track="applied-ml", max_hours=48).',
      },
      {
        id: 'r4',
        phase: 'Tool Call',
        actor: 'Catalog Tool',
        summary: 'Retrieved 4 core modules + 2 studio capstones (44 hrs total).',
        detail: 'Fits within 8 weeks at 5.5 hours/week buffer.',
      },
      {
        id: 'r5',
        phase: 'Observation',
        actor: 'Curriculum Critic',
        summary: 'Verified Python refresher precedes Deep Learning module.',
        detail: 'Prerequisite dependency check passed with zero schedule conflicts.',
      },
      {
        id: 'r6',
        phase: 'Response',
        actor: 'Orchestrator',
        summary: 'Presented week-by-week interactive study plan.',
        detail: 'Includes weekly lab milestones and Churn Prediction capstone.',
      },
    ],
  },
};

// ==========================================
// Module 7: MLOps Lab
// ==========================================

export const MLOPS_STEPS: LessonStep[] = [
  {
    id: 'training-pipeline',
    title: '01. Reproducible Data & Training Pipelines',
    theory:
      'In production, models are trained via automated pipelines that version datasets, track hyperparameters, and log evaluation benchmarks—ensuring every model artifact can be audited and reproduced.',
    practical:
      'Step through the MLOps lifecycle diagram and trigger a simulated Pipeline Run to watch artifacts move from training to registry.',
    demonstrates:
      'Shows why production AI relies on repeatable software engineering discipline rather than one-off notebooks.',
    keyTakeaway: 'Versioned data and automated training pipelines make model iterations reproducible.',
  },
  {
    id: 'canary-deployment',
    title: '02. Canary Rollout & Model Serving',
    theory:
      'Deploying a new model directly to 100% of users carries risk. Teams use canary rollouts—routing a small slice of live traffic (e.g. 10%) to the new candidate while comparing latency and error rates.',
    practical:
      'Adjust the Canary Traffic Split slider to watch simulated P95 latency and traffic routing update across the serving cluster.',
    demonstrates:
      'Visualizes safe progressive delivery that protects end-users during model upgrades.',
    keyTakeaway: 'Canary deployments validate real-world performance before full traffic cutover.',
  },
  {
    id: 'drift-monitoring',
    title: '03. Data Drift & Accuracy Degradation',
    theory:
      'Real-world customer behavior shifts over time. When incoming feature distributions diverge from training data (data drift), model accuracy silently erodes even if the code never crashed.',
    practical:
      'Increase the Incoming Data Drift slider above 20% and 35% to observe status transitions from Nominal to Drift Warning and Retrain Triggered.',
    demonstrates:
      'Explains why monitoring input distributions is just as critical as monitoring server uptime.',
    keyTakeaway: 'Data drift degrades accuracy silently unless continuous statistical monitors are active.',
  },
  {
    id: 'continuous-retraining',
    title: '04. Automated Retraining & Rollback Loops',
    theory:
      'When drift crosses an alert threshold, MLOps orchestrators automatically assemble fresh labeled samples, retrain a candidate model, evaluate it against benchmarks, or roll back safely if needed.',
    practical:
      'Trigger a Retrain & Reset simulation when drift is elevated to restore nominal accuracy on the pipeline diagram.',
    demonstrates:
      'Closes the production loop by showing how monitoring triggers automated model renewal.',
    keyTakeaway: 'Continuous monitoring and retraining keep deployed AI reliable over months and years.',
  },
];

// ==========================================
// Module 8: Project Studio
// ==========================================

export const STUDIO_PROJECTS: StudioProjectMeta[] = [
  {
    id: 'churn',
    title: 'Customer Churn Prediction',
    domain: 'Tabular ML · Retention',
    summary:
      'Estimate subscriber retention risk from tenure, monthly spend, and support ticket volume with transparent risk drivers.',
    demonstrates:
      'Demonstrates how structured tabular features combine into an actionable customer retention score.',
  },
  {
    id: 'sentiment',
    title: 'Sentiment Analysis Monitor',
    domain: 'NLP · Voice of Customer',
    summary:
      'Analyze customer feedback batches and live text entries with token-level positive/negative polarity attribution.',
    demonstrates:
      'Demonstrates real-time text scoring and keyword attribution for product and support teams.',
  },
  {
    id: 'doc-assistant',
    title: 'AI Document Assistant',
    domain: 'RAG · Knowledge Search',
    summary:
      'Query policy and technical handbooks, inspect retrieved vector chunks, and review grounded citation responses.',
    demonstrates:
      'Demonstrates how retrieval-augmented systems surface exact source excerpts before synthesizing answers.',
  },
  {
    id: 'vision',
    title: 'Computer Vision Inspector',
    domain: 'Vision · Quality Control',
    summary:
      'Adjust the model confidence threshold over an industrial inspection frame to filter bounding-box detections.',
    demonstrates:
      'Demonstrates the precision-vs-recall tradeoff controlled by confidence thresholds in object detection.',
  },
  {
    id: 'business-assistant',
    title: 'AI Business Assistant',
    domain: 'Agentic BI · Analytics',
    summary:
      'Run natural-language business questions and trace the simulated SQL query, metric aggregation, and executive brief.',
    demonstrates:
      'Demonstrates how AI assistants bridge natural-language questions and structured enterprise KPI tables.',
  },
];
