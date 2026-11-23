import type { ProfessionProfile } from '../types/careerStudio';

export const PROFESSIONS_PART_1: ProfessionProfile[] = [
  {
    id: 'banking-finance',
    title: 'Banking & Finance',
    shortTitle: 'Banking & Finance',
    sectorTag: 'Risk · Credit · Compliance',
    shortDescription:
      'Automate KYC document verification, score credit risk transparently, and detect transaction anomalies in real time.',
    iconKey: 'Landmark',
    accentColor: 'cyan',
    dailyWorkflowExampleTitle: 'Retail Loan Underwriting & Fraud Triage',
    humanOversightStatement:
      'Credit officers and fraud analysts retain final approval authority and review explainable risk factors before taking customer action.',
    recommendedProjects: ['banking-fraud', 'document-intelligence', 'business-intelligence'],
    existingStrengths: [
      'Regulatory compliance & KYC policy knowledge',
      'Financial statement & cash-flow interpretation',
      'Credit risk evaluation & portfolio intuition',
      'Audit trail documentation & stakeholder reporting',
    ],
    newAiSkills: [
      'Anomaly detection & imbalanced classification',
      'Document OCR & structured data extraction',
      'Model explainability (SHAP / risk factor attribution)',
      'SQL feature engineering & regulatory audit logging',
    ],
    skillGapData: [
      { skillArea: 'Domain & Risk Logic', currentBaseline: 85, targetAiReady: 95 },
      { skillArea: 'SQL & Financial Data Prep', currentBaseline: 45, targetAiReady: 85 },
      { skillArea: 'Predictive Risk Modeling', currentBaseline: 20, targetAiReady: 80 },
      { skillArea: 'NLP Document Parsing', currentBaseline: 15, targetAiReady: 75 },
      { skillArea: 'Model Governance & Bias Audit', currentBaseline: 35, targetAiReady: 85 },
    ],
    possiblePathways: [
      {
        roleTitle: 'AI-Enabled Credit Risk Analyst',
        transitionFit: 'Direct upskill within lending & underwriting teams',
        exampleFocus: 'Combines credit policy judgment with calibrated default scoring models.',
      },
      {
        roleTitle: 'Financial Crime & Fraud Analytics Specialist',
        transitionFit: 'Strong progression for operations & compliance professionals',
        exampleFocus: 'Tunes anomaly detection thresholds to reduce false alerts.',
      },
      {
        roleTitle: 'FinTech Product & Analytics Manager',
        transitionFit: 'Cross-functional transition for senior finance leads',
        exampleFocus: 'Owns automated underwriting pipelines and compliance KPIs.',
      },
    ],
    beforeAfterSteps: [
      {
        stepNumber: 1,
        title: 'Document & Application Intake',
        beforeAction: 'Analyst opens PDF bank statements, payslips, and ID scans across folders.',
        beforePainPoint: 'Manual cross-checking takes 35–45 minutes per loan file.',
        afterAction: 'Document Intelligence extracts income, balance ratios, and ID fields.',
        afterSystemNote: 'Automated OCR + entity parser validates completeness in seconds.',
        humanOversightRole: 'Officer confirms flagged discrepancies on edge-case scans.',
      },
      {
        stepNumber: 2,
        title: 'Transaction & Anomaly Screening',
        beforeAction: 'Reviewer scans spreadsheet rows using static threshold rules.',
        beforePainPoint: 'Static rules trigger high false-positive rates and miss subtle spikes.',
        afterAction: 'ML anomaly scorer compares spending velocity against historical baselines.',
        afterSystemNote: 'Outputs calibrated risk score with top contributing features.',
        humanOversightRole: 'Fraud analyst inspects high-risk alerts before card locks.',
      },
      {
        stepNumber: 3,
        title: 'Creditworthiness Assessment',
        beforeAction: 'Officer manually enters ratios into an internal underwriting calculator.',
        beforePainPoint: 'Inconsistent weighting across reviewers delays branch turnaround.',
        afterAction: 'Classification model evaluates debt-to-income, tenure, and repayment history.',
        afterSystemNote: 'Provides transparent factor breakdown for audit compliance.',
        humanOversightRole: 'Senior underwriter signs off final credit decision.',
      },
      {
        stepNumber: 4,
        title: 'Compliance Summary & Audit Log',
        beforeAction: 'Analyst drafts decision rationale memo manually for compliance files.',
        beforePainPoint: 'End-of-day reporting delays queue closure.',
        afterAction: 'AI structures a traceable decision brief referencing verified evidence.',
        afterSystemNote: 'Audit log records inputs, score drivers, and reviewer approval.',
        humanOversightRole: 'Compliance reviewer signs off exceptions and audit exports.',
      },
    ],
    responsibilities: [
      {
        id: 'bf-loan-docs',
        title: 'Loan Documentation Verification',
        summary: 'Extract and cross-check income proofs, tax filings, and KYC forms.',
        currentManualProcess:
          'Staff read multi-page PDFs and re-key salary figures and account numbers into core banking forms.',
        howAiAssists:
          'Document OCR and NLP extract key entities, verify totals, and highlight missing signatures automatically.',
        aiTechnologies: ['Natural Language Processing', 'Computer Vision (OCR)', 'AI Automation'],
        toolsUsed: ['Python', 'Document Parsers', 'SQL Validation Rules'],
        workflow: {
          input: 'Uploaded salary slips, bank statements, and KYC IDs',
          aiProcessing: 'OCR digitization + named-entity extraction',
          mlOrAutomation: 'Field cross-validation & missing-item flagging',
          output: 'Structured JSON profile & confidence score',
          humanReview: 'Loan officer verifies low-confidence fields',
        },
        expectedBenefits: [
          'Cuts initial file preparation time by ~60–70% in repetitive checks',
          'Standardizes audit formatting across branches',
        ],
        skillsRequired: ['Python basics', 'Document Intelligence concepts', 'SQL validation'],
      },
      {
        id: 'bf-tx-monitor',
        title: 'Transaction Monitoring & Fraud Detection',
        summary: 'Spot suspicious card, wire, and merchant spending patterns quickly.',
        currentManualProcess:
          'Investigators inspect rule-based alert queues where 80%+ of alerts turn out benign.',
        howAiAssists:
          'Machine Learning scores velocity, location jump, and merchant mismatch to rank genuine risk first.',
        aiTechnologies: ['Machine Learning', 'Predictive Analytics', 'Model Evaluation'],
        toolsUsed: ['Python', 'Scikit-learn', 'Anomaly Detection Dashboards'],
        workflow: {
          input: 'Real-time transaction stream + cardholder history',
          aiProcessing: 'Feature scaling (amount z-score, geo distance, hour)',
          mlOrAutomation: 'Anomaly & risk classification scoring',
          output: 'Ranked alert queue with top risk drivers',
          humanReview: 'Fraud specialist decides block, verify, or clear',
        },
        expectedBenefits: [
          'Focuses analyst attention on highest-severity anomalies first',
          'Reduces false friction for legitimate customers',
        ],
        skillsRequired: ['Statistics', 'Precision-Recall evaluation', 'Python'],
      },
      {
        id: 'bf-credit-risk',
        title: 'Customer Credit Risk Assessment',
        summary: 'Evaluate borrower repayment capacity using historical and behavioral features.',
        currentManualProcess:
          'Underwriters rely solely on rigid scorecard cutoffs and manual ratio worksheets.',
        howAiAssists:
          'Supervised classification estimates probability of delinquency with transparent feature weights.',
        aiTechnologies: ['Machine Learning', 'Statistics', 'Model Evaluation'],
        toolsUsed: ['Python', 'Logistic Regression / Tree Models', 'Explainability Charts'],
        workflow: {
          input: 'Credit bureau history, income stability, debt ratios',
          aiProcessing: 'Missing-value imputation & feature encoding',
          mlOrAutomation: 'Calibrated risk probability estimation',
          output: 'Risk tier band + positive/negative factor weights',
          humanReview: 'Credit committee approves terms or requests collateral',
        },
        expectedBenefits: [
          'Consistent evaluation benchmarks across teams',
          'Clear feature evidence ready for regulatory audits',
        ],
        skillsRequired: ['Statistics', 'Supervised ML', 'Fairness & Model Evaluation'],
      },
      {
        id: 'bf-fin-reporting',
        title: 'Financial Variance & Regulatory Reporting',
        summary: 'Summarize monthly P&L movements, branch KPIs, and exception logs.',
        currentManualProcess:
          'Analysts merge exports from multiple ledgers in spreadsheets every month-end.',
        howAiAssists:
          'Automated SQL pipelines and BI assistants detect outliers and draft executive commentary.',
        aiTechnologies: ['Data Analysis', 'Data Visualization', 'Large Language Models'],
        toolsUsed: ['SQL', 'Python', 'BI Dashboards'],
        workflow: {
          input: 'General ledger tables & regional revenue CSVs',
          aiProcessing: 'Automated reconciliation & variance computation',
          mlOrAutomation: 'Anomaly highlighting + summary narrative generation',
          output: 'Executive variance pack with visual drill-downs',
          humanReview: 'Finance controller validates numbers prior to board distribution',
        },
        expectedBenefits: [
          'Frees analysts from copy-paste ledger consolidation',
          'Highlights unusual cost spikes earlier in the close cycle',
        ],
        skillsRequired: ['SQL', 'Data Analysis', 'Data Visualization'],
      },
      {
        id: 'bf-wealth-support',
        title: 'Customer Banking Support Triage',
        summary: 'Resolve routine account inquiries, policy lookups, and dispute routing.',
        currentManualProcess:
          'Support agents search internal policy PDFs manually while customers wait on hold.',
        howAiAssists:
          'Intent classification and policy-grounded assistants draft verified replies and route complex disputes.',
        aiTechnologies: ['Natural Language Processing', 'Generative AI', 'Large Language Models'],
        toolsUsed: ['NLP Classifiers', 'RAG Knowledge Search', 'CRM Routing'],
        workflow: {
          input: 'Customer chat or email inquiry',
          aiProcessing: 'Intent classification + sentiment urgency scoring',
          mlOrAutomation: 'Grounded policy retrieval & draft reply synthesis',
          output: 'Suggested response or priority escalation ticket',
          humanReview: 'Relationship agent approves outbound message or handles dispute',
        },
        expectedBenefits: [
          'Faster turnaround on policy & fee inquiries',
          'Automatic escalation for distressed or high-value accounts',
        ],
        skillsRequired: ['NLP fundamentals', 'RAG architecture', 'Escalation design'],
      },
      {
        id: 'bf-aml-screening',
        title: 'KYC / AML Name & Entity Screening',
        summary: 'Match customer records against watchlists without drowning in name collisions.',
        currentManualProcess:
          'Analysts manually inspect hundreds of fuzzy string matches for common names.',
        howAiAssists:
          'Entity resolution models weigh birth year, jurisdiction, and alias embeddings to filter noise.',
        aiTechnologies: ['Natural Language Processing', 'Machine Learning'],
        toolsUsed: ['Python', 'Vector Similarity Search', 'Case Management UI'],
        workflow: {
          input: 'Onboarding profile + sanctions/PEP lists',
          aiProcessing: 'Vector similarity & phonetic normalization',
          mlOrAutomation: 'False-positive suppression scoring',
          output: 'High-priority match shortlist',
          humanReview: 'AML compliance officer makes formal clearance determination',
        },
        expectedBenefits: [
          'Dramatically lowers manual false-positive review workload',
          'Maintains traceable screening evidence',
        ],
        skillsRequired: ['Data Analysis', 'NLP matching', 'Compliance governance'],
      },
    ],
  },
  {
    id: 'hr-recruitment',
    title: 'Human Resources & Recruitment',
    shortTitle: 'HR & Recruitment',
    sectorTag: 'Talent · Retention · People Ops',
    shortDescription:
      'Accelerate resume skill mapping, spot attrition signals early, and streamline HR policy answers with human-centered oversight.',
    iconKey: 'Users',
    accentColor: 'blue',
    dailyWorkflowExampleTitle: 'High-Volume Resume Screening & Shortlisting',
    humanOversightStatement:
      'AI ranks skill relevance and summarizes profiles to save time; hiring managers and HR recruiters always make final shortlisting and hiring decisions.',
    recommendedProjects: ['resume-screening', 'document-intelligence', 'customer-support-agent'],
    existingStrengths: [
      'Candidate interviewing & behavioral assessment',
      'Employer branding & compensation policy fluency',
      'Stakeholder alignment with hiring managers',
      'Employee relations & organizational culture judgment',
    ],
    newAiSkills: [
      'NLP skill extraction & semantic job matching',
      'Attrition risk modeling & cohort analytics',
      'Bias auditing & fairness metrics in hiring pipelines',
      'HR policy RAG assistant design',
    ],
    skillGapData: [
      { skillArea: 'Talent & People Judgment', currentBaseline: 90, targetAiReady: 95 },
      { skillArea: 'People Analytics & SQL', currentBaseline: 35, targetAiReady: 80 },
      { skillArea: 'NLP Skill Matching', currentBaseline: 15, targetAiReady: 75 },
      { skillArea: 'Attrition Prediction ML', currentBaseline: 15, targetAiReady: 75 },
      { skillArea: 'Responsible AI & Bias Audit', currentBaseline: 40, targetAiReady: 90 },
    ],
    possiblePathways: [
      {
        roleTitle: 'People Analytics & Talent Intelligence Specialist',
        transitionFit: 'Natural evolution for HRBPs and recruiters',
        exampleFocus: 'Builds retention dashboards, hiring funnel forecasts, and skills taxonomies.',
      },
      {
        roleTitle: 'AI-Enabled Talent Acquisition Lead',
        transitionFit: 'Direct step-up for corporate recruitment leads',
        exampleFocus: 'Deploys transparent screening workflows with strict fairness audits.',
      },
      {
        roleTitle: 'HR Operations & Automation Architect',
        transitionFit: 'Strong option for HRIS & shared-services professionals',
        exampleFocus: 'Automates onboarding documentation and internal employee Q&A.',
      },
    ],
    beforeAfterSteps: [
      {
        stepNumber: 1,
        title: 'Resume Intake & Parsing',
        beforeAction: 'Recruiter opens 200+ PDF resumes one by one in email or ATS folders.',
        beforePainPoint: 'Hours spent scanning formatting variations before assessing fit.',
        afterAction: 'Resumes enter an NLP parsing pipeline extracting skills, tenure, and domains.',
        afterSystemNote: 'Unstructured text becomes standardized structured candidate profiles.',
        humanOversightRole: 'Recruiter verifies candidate context and non-traditional backgrounds.',
      },
      {
        stepNumber: 2,
        title: 'Skill & Role Matching',
        beforeAction: 'Recruiter mentally compares bullet points against the job description.',
        beforePainPoint: 'Fatigue introduces inconsistency late in the review batch.',
        afterAction: 'Matching model scores overlap across required skills and domain experience.',
        afterSystemNote: 'Highlights matched skills and missing criteria transparently.',
        humanOversightRole: 'Recruiter overrides scores for transferable skills or growth potential.',
      },
      {
        stepNumber: 3,
        title: 'Shortlist Review & Interview Prep',
        beforeAction: 'HR manually copies notes into spreadsheets to share with managers.',
        beforePainPoint: 'Slow manager feedback loops cause top candidates to drop off.',
        afterAction: 'Dashboard displays ranked candidates with tailored interview focus prompts.',
        afterSystemNote: 'Structured summary compares strengths evenly across finalists.',
        humanOversightRole: 'HR & hiring manager jointly select who advances to interviews.',
      },
      {
        stepNumber: 4,
        title: 'Scheduling & Policy Follow-Up',
        beforeAction: 'Coordinator exchanges multiple emails to align panel calendars.',
        beforePainPoint: 'Administrative scheduling delays time-to-offer.',
        afterAction: 'Automation proposes optimal panel slots and sends clear status updates.',
        afterSystemNote: 'Keeps candidate communication timely and documented.',
        humanOversightRole: 'Recruiter handles personal offer calls and sensitive negotiations.',
      },
    ],
    responsibilities: [
      {
        id: 'hr-resume-screen',
        title: 'Resume Screening & Skill Extraction',
        summary: 'Parse large applicant pools and surface relevant skill matches.',
        currentManualProcess:
          'Recruiters manually read hundreds of PDFs and copy qualifications into tracking sheets.',
        howAiAssists:
          'NLP extracts normalized skills and experience bands while flagging gaps against the role brief.',
        aiTechnologies: ['Natural Language Processing', 'Data Analysis', 'Model Evaluation'],
        toolsUsed: ['Python', 'NLP Tokenizers', 'ATS Ranking Dashboards'],
        workflow: {
          input: 'Candidate resumes + structured job description',
          aiProcessing: 'Text normalization, skill entity extraction, synonym mapping',
          mlOrAutomation: 'Weighted skill & experience match scoring',
          output: 'Transparent match score + matched/missing skill list',
          humanReview: 'Recruiter reviews top and borderline profiles before shortlisting',
        },
        expectedBenefits: [
          'Reduces repetitive manual scanning time significantly',
          'Surfaces overlooked transferable skills using synonym matching',
        ],
        skillsRequired: ['NLP concepts', 'Bias & fairness auditing', 'Data Analysis'],
      },
      {
        id: 'hr-shortlisting',
        title: 'Candidate Shortlisting & Calibration',
        summary: 'Standardize candidate comparisons across hiring managers.',
        currentManualProcess:
          'Hiring panels review ad-hoc notes without structured rubric alignment.',
        howAiAssists:
          'Generates uniform skill matrices and highlights criteria alignment across applicants.',
        aiTechnologies: ['Natural Language Processing', 'Data Visualization'],
        toolsUsed: ['Structured Rubric Builders', 'BI Comparison Tables'],
        workflow: {
          input: 'Parsed candidate profiles + hiring rubric weights',
          aiProcessing: 'Criteria normalization & rubric alignment',
          mlOrAutomation: 'Comparative candidate matrix generation',
          output: 'Side-by-side shortlist briefing sheet',
          humanReview: 'Hiring manager & HR finalize interview invitations',
        },
        expectedBenefits: [
          'More structured, auditable shortlisting discussions',
          'Faster manager calibration turnaround',
        ],
        skillsRequired: ['Rubric design', 'People Analytics', 'Explainable scoring'],
      },
      {
        id: 'hr-scheduling',
        title: 'Interview Scheduling & Coordination',
        summary: 'Match interviewer availability with candidate preferences seamlessly.',
        currentManualProcess:
          'Coordinators manually cross-check calendars and reschedule conflicts via email.',
        howAiAssists:
          'Automated scheduling workflows optimize panel load balance and calendar buffers.',
        aiTechnologies: ['AI Automation', 'Generative AI'],
        toolsUsed: ['Workflow Orchestrators', 'Calendar APIs', 'Prompt Templates'],
        workflow: {
          input: 'Interviewer availability + candidate time windows',
          aiProcessing: 'Constraint matching & time-zone conversion',
          mlOrAutomation: 'Automated slot selection & reminder dispatch',
          output: 'Confirmed interview itinerary + prep brief',
          humanReview: 'Coordinator handles VIP exceptions & feedback follow-up',
        },
        expectedBenefits: [
          'Eliminates multi-day email back-and-forth',
          'Prevents interviewer panel fatigue',
        ],
        skillsRequired: ['Workflow automation', 'Prompt engineering'],
      },
      {
        id: 'hr-attrition',
        title: 'Employee Attrition & Retention Analysis',
        summary: 'Identify structural turnover drivers across teams before resignations spike.',
        currentManualProcess:
          'HR reviews lagging exit-interview spreadsheets once quarters have already closed.',
        howAiAssists:
          'Predictive analytics tracks tenure patterns, workload shifts, and engagement trends anonymously.',
        aiTechnologies: ['Machine Learning', 'Predictive Analytics', 'Statistics'],
        toolsUsed: ['Python', 'Retention Survival Charts', 'SQL'],
        workflow: {
          input: 'Aggregated tenure, comp band, mobility & survey metrics',
          aiProcessing: 'Cohort normalization & privacy anonymization',
          mlOrAutomation: 'Department-level attrition driver modeling',
          output: 'Retention risk drivers & focus recommendations',
          humanReview: 'HRBP designs supportive manager coaching & career growth plans',
        },
        expectedBenefits: [
          'Shifts HR from reactive exit surveys to proactive retention planning',
          'Quantifies impact of growth and compensation policies',
        ],
        skillsRequired: ['Statistics', 'Predictive Analytics', 'Data Privacy ethics'],
      },
      {
        id: 'hr-policy-desk',
        title: 'Employee Data & HR Policy Support',
        summary: 'Answer leave, benefits, and onboarding questions consistently.',
        currentManualProcess:
          'HR shared-services teams answer repetitive handbook questions manually every day.',
        howAiAssists:
          'RAG-powered internal assistants cite exact handbook clauses and escalate sensitive requests.',
        aiTechnologies: ['Large Language Models', 'Natural Language Processing'],
        toolsUsed: ['Vector Search (RAG)', 'HR Knowledge Base'],
        workflow: {
          input: 'Employee policy question + handbook PDFs',
          aiProcessing: 'Semantic chunk retrieval from verified policy docs',
          mlOrAutomation: 'Cited summary answer or sensitive-topic escalation',
          output: 'Grounded answer with policy section citation',
          humanReview: 'HR advisor steps in for personal or compliance-sensitive cases',
        },
        expectedBenefits: [
          'Instant answers on routine policy questions across time zones',
          'Frees HR specialists for high-empathy employee conversations',
        ],
        skillsRequired: ['RAG workflows', 'Knowledge curation', 'Escalation guardrails'],
      },
      {
        id: 'hr-reporting',
        title: 'Recruitment Funnel & Diversity Reporting',
        summary: 'Track source quality, time-to-hire, and stage conversion bottlenecks.',
        currentManualProcess:
          'Analysts export CSVs from ATS weekly and build pivot tables manually.',
        howAiAssists:
          'Automated analytics pipelines highlight drop-off stages and source ROI automatically.',
        aiTechnologies: ['Data Analysis', 'Data Visualization', 'SQL'],
        toolsUsed: ['SQL', 'Python', 'Interactive BI Dashboards'],
        workflow: {
          input: 'ATS stage timestamps & sourcing channels',
          aiProcessing: 'SQL funnel aggregation & cohort slicing',
          mlOrAutomation: 'Bottleneck detection & hiring pace forecast',
          output: 'Live talent funnel dashboard',
          humanReview: 'Talent director adjusts sourcing spend & recruiter capacity',
        },
        expectedBenefits: [
          'Real-time visibility into hiring bottlenecks',
          'Data-backed workforce capacity planning',
        ],
        skillsRequired: ['SQL', 'Data Visualization', 'Statistical comparisons'],
      },
    ],
  },
  {
    id: 'sales-bd',
    title: 'Sales & Business Development',
    shortTitle: 'Sales & Business Dev',
    sectorTag: 'Pipeline · Forecasting · Revenue',
    shortDescription:
      'Prioritize high-intent leads, personalize follow-ups, and forecast quarterly revenue pipelines with clarity.',
    iconKey: 'TrendingUp',
    accentColor: 'cyan',
    dailyWorkflowExampleTitle: 'Inbound Lead Scoring & Pipeline Prioritization',
    humanOversightStatement:
      'Sales reps use AI scores to prioritize outreach and prep discovery calls; human relationship trust and negotiation close deals.',
    recommendedProjects: ['sales-lead-scoring', 'business-intelligence', 'marketing-intelligence'],
    existingStrengths: [
      'Consultative discovery & objection handling',
      'Executive relationship building & deal structuring',
      'Territory strategy & CRM pipeline discipline',
      'Negotiation & closing commercial contracts',
    ],
    newAiSkills: [
      'Lead propensity scoring & conversion modeling',
      'Time-series revenue & pipeline forecasting',
      'CRM data hygiene & automated outreach drafting',
      'Customer segmentation & churn risk tracking',
    ],
    skillGapData: [
      { skillArea: 'Consultative Selling', currentBaseline: 92, targetAiReady: 96 },
      { skillArea: 'CRM Data & SQL', currentBaseline: 40, targetAiReady: 80 },
      { skillArea: 'Lead Scoring ML', currentBaseline: 15, targetAiReady: 78 },
      { skillArea: 'Forecast Analytics', currentBaseline: 30, targetAiReady: 82 },
      { skillArea: 'GenAI Sales Workflows', currentBaseline: 35, targetAiReady: 85 },
    ],
    possiblePathways: [
      {
        roleTitle: 'Revenue Operations (RevOps) & AI Strategist',
        transitionFit: 'Ideal progression for top BDRs and sales managers',
        exampleFocus: 'Builds automated lead scoring, territory balancing, and forecast models.',
      },
      {
        roleTitle: 'Enterprise AI Solutions Consultant',
        transitionFit: 'High-impact pivot for consultative B2B sellers',
        exampleFocus: 'Translates client workflows into practical AI business cases.',
      },
      {
        roleTitle: 'Data-Driven Sales Director',
        transitionFit: 'Leadership upskill for regional sales heads',
        exampleFocus: 'Combines coaching intuition with predictive pipeline health alerts.',
      },
    ],
    beforeAfterSteps: [
      {
        stepNumber: 1,
        title: 'Lead Intake & Enrichment',
        beforeAction: 'Rep scans incoming CRM leads alphabetically without intent context.',
        beforePainPoint: 'Reps spend equal effort on cold tire-kickers and urgent buyers.',
        afterAction: 'AI aggregates company size, engagement depth, and role seniority.',
        afterSystemNote: 'Computes real-time lead conversion propensity score (0–100).',
        humanOversightRole: 'Rep reviews top drivers and strategic account fit.',
      },
      {
        stepNumber: 2,
        title: 'Personalized Outreach Prep',
        beforeAction: 'Rep spends 25 minutes researching news and drafting custom emails.',
        beforePainPoint: 'Manual prep slows daily outreach volume.',
        afterAction: 'GenAI drafts tailored talking points grounded in industry pain points.',
        afterSystemNote: 'Matches prospect industry to relevant case themes.',
        humanOversightRole: 'Rep edits tone, adds personal warmth, and sends.',
      },
      {
        stepNumber: 3,
        title: 'Deal Health & Follow-Up Alerts',
        beforeAction: 'Stalled opportunities go unnoticed until end-of-quarter review.',
        beforePainPoint: 'Late discovery causes unexpected forecast slippage.',
        afterAction: 'NLP analyzes call notes and reply cadence to flag slipping deals early.',
        afterSystemNote: 'Highlights missing champion engagement or budget questions.',
        humanOversightRole: 'Account executive plans executive sponsor outreach.',
      },
      {
        stepNumber: 4,
        title: 'Quarterly Revenue Forecast',
        beforeAction: 'Manager guesses commit numbers from subjective rep spreadsheets.',
        beforePainPoint: 'Optimism bias skews inventory and hiring forecasts.',
        afterAction: 'Predictive model weights historical stage conversion probabilities.',
        afterSystemNote: 'Outputs realistic commit, upside, and risk range bands.',
        humanOversightRole: 'Sales leader validates strategic enterprise deals personally.',
      },
    ],
    responsibilities: [
      {
        id: 'sales-lead-gen',
        title: 'Lead Generation & Account Prioritization',
        summary: 'Rank prospective accounts by fit and buying-intent signals.',
        currentManualProcess:
          'Sales reps manually browse LinkedIn and spreadsheets to pick who to call first.',
        howAiAssists:
          'Predictive scoring ranks prospects based on industry match, web engagement, and company growth signals.',
        aiTechnologies: ['Machine Learning', 'Predictive Analytics', 'Data Analysis'],
        toolsUsed: ['Python', 'CRM Scoring Models', 'Enrichment Pipelines'],
        workflow: {
          input: 'Firmographics, email opens, pricing-page visits',
          aiProcessing: 'Feature encoding & engagement recency weighting',
          mlOrAutomation: 'Conversion probability scoring (0–100)',
          output: 'Prioritized daily call list with reason tags',
          humanReview: 'Rep selects strategic outreach angle for each buyer',
        },
        expectedBenefits: [
          'Focuses rep time on responsive, high-fit prospects',
          'Improves speed-to-lead on urgent inquiries',
        ],
        skillsRequired: ['Predictive Analytics', 'CRM data modeling', 'Model calibration'],
      },
      {
        id: 'sales-followups',
        title: 'Customer Follow-Ups & Call Summaries',
        summary: 'Draft structured follow-up recaps and next steps right after discovery calls.',
        currentManualProcess:
          'Reps spend Friday afternoons typing CRM notes and delayed follow-up emails.',
        howAiAssists:
          'LLM summarization turns call notes into action-item checklists and tailored recap drafts.',
        aiTechnologies: ['Large Language Models', 'Natural Language Processing', 'Generative AI'],
        toolsUsed: ['Structured Prompts', 'CRM Integrations'],
        workflow: {
          input: 'Call notes or transcript + prospect profile',
          aiProcessing: 'Action item & objection extraction',
          mlOrAutomation: 'Structured CRM summary + email draft generation',
          output: 'Editable recap email & CRM field updates',
          humanReview: 'Rep verifies commitments and customizes tone before sending',
        },
        expectedBenefits: [
          'Keeps CRM records accurate without manual typing overhead',
          'Speeds up post-meeting buyer follow-through',
        ],
        skillsRequired: ['Prompt engineering', 'NLP extraction', 'CRM workflow design'],
      },
      {
        id: 'sales-qualification',
        title: 'Lead Qualification & Next-Best Action',
        summary: 'Evaluate deal readiness across budget, authority, need, and timeline.',
        currentManualProcess:
          'Managers ask reps verbally in weekly 1-on-1s which leads are genuinely qualified.',
        howAiAssists:
          'Classification models highlight missing qualification criteria compared to won deals.',
        aiTechnologies: ['Machine Learning', 'Model Evaluation'],
        toolsUsed: ['Python', 'Classification Scorecards'],
        workflow: {
          input: 'Interaction count, stakeholder roles, deal stage age',
          aiProcessing: 'Historical win-loss pattern comparison',
          mlOrAutomation: 'Qualification confidence classification',
          output: 'Deal readiness indicator + suggested next step',
          humanReview: 'AE decides whether to advance, nurture, or disqualify',
        },
        expectedBenefits: [
          'Surfaces stalled deals earlier in the quarter',
          'Coaches reps consistently using win-pattern benchmarks',
        ],
        skillsRequired: ['Classification logic', 'Data Analysis', 'Pipeline metrics'],
      },
      {
        id: 'sales-segmentation',
        title: 'Customer & Account Segmentation',
        summary: 'Group customers by purchasing behavior, expansion potential, and retention profile.',
        currentManualProcess:
          'Teams segment accounts purely by company revenue tier in static spreadsheets.',
        howAiAssists:
          'Unsupervised clustering discovers behavioral tiers for tailored upsell campaigns.',
        aiTechnologies: ['Machine Learning', 'Data Analysis', 'Data Visualization'],
        toolsUsed: ['Python', 'K-Means Clustering', 'Segment Dashboards'],
        workflow: {
          input: 'Order frequency, product mix, support volume',
          aiProcessing: 'Feature scaling & cluster centroid discovery',
          mlOrAutomation: 'Behavioral customer segment assignment',
          output: 'Named buyer personas with expansion plays',
          humanReview: 'Account managers design executive account plans per tier',
        },
        expectedBenefits: [
          'Tailors cross-sell plays to real usage behavior',
          'Identifies high-value accounts showing quiet disengagement',
        ],
        skillsRequired: ['Unsupervised clustering', 'Data Visualization', 'SQL'],
      },
      {
        id: 'sales-forecast',
        title: 'Sales Forecasting & Pipeline Hygiene',
        summary: 'Predict quarter-end revenue range accurately from live pipeline movement.',
        currentManualProcess:
          'Weekly spreadsheet rollups rely on subjective rep confidence percentages.',
        howAiAssists:
          'Time-series and stage-velocity models estimate expected close rates transparently.',
        aiTechnologies: ['Predictive Analytics', 'Statistics', 'Data Visualization'],
        toolsUsed: ['Python', 'Recharts / BI Forecast Views', 'SQL'],
        workflow: {
          input: 'Historical win rates, deal age, stage transitions',
          aiProcessing: 'Weighted pipeline & seasonality adjustments',
          mlOrAutomation: 'Projected revenue band calculation',
          output: 'Forecast vs. quota chart with confidence interval',
          humanReview: 'VP Sales combines statistical forecast with exec deal reviews',
        },
        expectedBenefits: [
          'Reduces end-of-quarter forecast surprises',
          'Supports accurate staffing and inventory commitments',
        ],
        skillsRequired: ['Statistics', 'Time-series forecasting', 'SQL'],
      },
      {
        id: 'sales-reporting',
        title: 'CRM Hygiene & Executive Sales Reporting',
        summary: 'Turn raw CRM activity logs into clear weekly leadership briefs.',
        currentManualProcess:
          'Sales ops spends hours cleaning missing deal stages before Monday leadership calls.',
        howAiAssists:
          'Automated checks flag stale deals and summarize win/loss drivers cleanly.',
        aiTechnologies: ['AI Automation', 'Data Visualization', 'Large Language Models'],
        toolsUsed: ['SQL', 'BI Dashboards', 'Automated Summaries'],
        workflow: {
          input: 'CRM activity table + closed-won/lost notes',
          aiProcessing: 'Completeness check + win/loss theme clustering',
          mlOrAutomation: 'Automated weekly KPI snapshot generation',
          output: 'Executive pipeline brief & hygiene action list',
          humanReview: 'Sales operations lead verifies KPI definitions before sharing',
        },
        expectedBenefits: [
          'Eliminates manual Monday morning slide formatting',
          'Reveals top win-loss themes from field notes',
        ],
        skillsRequired: ['SQL', 'Data Analysis', 'Data storytelling'],
      },
    ],
  },
  {
    id: 'marketing-digital',
    title: 'Marketing & Digital Marketing',
    shortTitle: 'Marketing & Digital',
    sectorTag: 'Campaigns · Content · Attribution',
    shortDescription:
      'Optimize ad budget allocation, segment audiences dynamically, and generate testable campaign copy grounded in conversion data.',
    iconKey: 'Megaphone',
    accentColor: 'purple',
    dailyWorkflowExampleTitle: 'Campaign Segmentation & Creative Optimization',
    humanOversightStatement:
      'Marketers set brand voice, ethical guardrails, and strategic positioning while AI accelerates testing and audience insights.',
    recommendedProjects: ['marketing-intelligence', 'sales-lead-scoring', 'business-intelligence'],
    existingStrengths: [
      'Brand positioning, storytelling & creative direction',
      'Multi-channel funnel strategy (SEO, paid, email)',
      'A/B experimentation & campaign attribution thinking',
      'Customer empathy & messaging alignment',
    ],
    newAiSkills: [
      'Audience clustering & lookalike segmentation',
      'Multi-touch attribution & ROI regression modeling',
      'Sentiment mining on social & review feedback',
      'Controlled GenAI copy variation & evaluation',
    ],
    skillGapData: [
      { skillArea: 'Brand & Campaign Strategy', currentBaseline: 90, targetAiReady: 95 },
      { skillArea: 'Analytics & Attribution', currentBaseline: 50, targetAiReady: 88 },
      { skillArea: 'Audience Clustering ML', currentBaseline: 20, targetAiReady: 78 },
      { skillArea: 'NLP & Sentiment Insights', currentBaseline: 25, targetAiReady: 80 },
      { skillArea: 'GenAI Brand Workflows', currentBaseline: 45, targetAiReady: 88 },
    ],
    possiblePathways: [
      {
        roleTitle: 'Growth & AI Marketing Analytics Lead',
        transitionFit: 'Ideal growth path for performance marketers',
        exampleFocus: 'Runs predictive LTV modeling, churn-winback segments, and budget optimizers.',
      },
      {
        roleTitle: 'Customer Intelligence & MarTech Strategist',
        transitionFit: 'Strong move for CRM & lifecycle marketers',
        exampleFocus: 'Connects CDP behavioral signals with personalized retention flows.',
      },
      {
        roleTitle: 'Content Operations & AI Creative Director',
        transitionFit: 'Tailored for brand & content leaders',
        exampleFocus: 'Governs brand-safe GenAI workflows and experimentation calendars.',
      },
    ],
    beforeAfterSteps: [
      {
        stepNumber: 1,
        title: 'Audience Segmentation',
        beforeAction: 'Marketer slices email lists manually by basic age or city filters.',
        beforePainPoint: 'Broad blasts deliver low click-through and high unsubscribes.',
        afterAction: 'Clustering groups users by recency, category affinity, and price sensitivity.',
        afterSystemNote: 'Builds distinct behavioral micro-segments automatically.',
        humanOversightRole: 'Marketer names segments and chooses appropriate campaign tone.',
      },
      {
        stepNumber: 2,
        title: 'Copy & Creative Variation',
        beforeAction: 'Team spends days writing two static headline options per ad group.',
        beforePainPoint: 'Slow creative turnaround limits A/B learning velocity.',
        afterAction: 'GenAI proposes structured headline/CTA angles tailored per segment.',
        afterSystemNote: 'Pre-checks clarity, length limits, and value proposition focus.',
        humanOversightRole: 'Brand editor refines voice, checks claims, and approves creatives.',
      },
      {
        stepNumber: 3,
        title: 'Channel ROI & Budget Shift',
        beforeAction: 'Manager waits until campaign end to export spreadsheets and judge ROAS.',
        beforePainPoint: 'Underperforming ad sets consume budget for weeks.',
        afterAction: 'Predictive attribution tracks marginal conversion gain across channels.',
        afterSystemNote: 'Recommends shifting spend toward higher-converting segments.',
        humanOversightRole: 'Marketing lead approves budget reallocation thresholds.',
      },
      {
        stepNumber: 4,
        title: 'Post-Campaign Insight Brief',
        beforeAction: 'Analyst builds slide decks manually from five ad platform exports.',
        beforePainPoint: 'Creative insights arrive too late for next sprint planning.',
        afterAction: 'AI unifies metrics and summarizes winning hooks vs. fatigue alerts.',
        afterSystemNote: 'Generates visual performance breakdown in real time.',
        humanOversightRole: 'Team plans next month’s creative experiments from verified data.',
      },
    ],
    responsibilities: [
      {
        id: 'mkt-seg',
        title: 'Audience & Persona Segmentation',
        summary: 'Discover behavioral buyer clusters beyond basic demographics.',
        currentManualProcess:
          'Teams manually build static spreadsheet rules like "visited site in 30 days".',
        howAiAssists:
          'Clustering algorithms group users automatically by RFM (Recency, Frequency, Monetary) and content affinity.',
        aiTechnologies: ['Machine Learning', 'Data Analysis', 'Data Visualization'],
        toolsUsed: ['Python', 'K-Means Clustering', 'Customer Data Platforms'],
        workflow: {
          input: 'Session events, purchase history, email engagement',
          aiProcessing: 'RFM feature normalization',
          mlOrAutomation: 'Behavioral cluster discovery',
          output: 'Actionable segment profiles with estimated LTV',
          humanReview: 'Lifecycle marketer crafts tailored value offers per group',
        },
        expectedBenefits: [
          'Higher campaign relevance and lower unsubscribe fatigue',
          'Surfaces underserved high-potential customer niches',
        ],
        skillsRequired: ['Clustering concepts', 'SQL & Analytics', 'Experiment design'],
      },
      {
        id: 'mkt-roi',
        title: 'Campaign ROI & Budget Allocation',
        summary: 'Predict conversion return across paid search, social, and email channels.',
        currentManualProcess:
          'Last-click spreadsheets credit only the final ad interaction before purchase.',
        howAiAssists:
          'Regression and response-curve models show diminishing returns across spend levels.',
        aiTechnologies: ['Predictive Analytics', 'Statistics', 'Machine Learning'],
        toolsUsed: ['Python', 'Regression Models', 'Attribution Dashboards'],
        workflow: {
          input: 'Channel spend, impressions, clicks, assisted conversions',
          aiProcessing: 'Saturation & lag modeling across channels',
          mlOrAutomation: 'Predicted incremental ROI by spend tier',
          output: 'Recommended budget split & expected conversions',
          humanReview: 'Growth lead approves strategic brand vs. performance balance',
        },
        expectedBenefits: [
          'Prevents overspending on saturated ad channels',
          'Justifies marketing budgets with statistical evidence',
        ],
        skillsRequired: ['Statistics', 'Regression modeling', 'Data Visualization'],
      },
      {
        id: 'mkt-copy',
        title: 'Ad Copy & Messaging Experimentation',
        summary: 'Generate structured A/B messaging hypotheses for different personas.',
        currentManualProcess:
          'Copywriters brainstorm variants manually from blank documents under tight deadlines.',
        howAiAssists:
          'LLMs produce controlled headline/CTA variations mapped to persona pain points and length caps.',
        aiTechnologies: ['Generative AI', 'Large Language Models', 'Natural Language Processing'],
        toolsUsed: ['Structured Prompt Libraries', 'A/B Testing Tools'],
        workflow: {
          input: 'Product brief, target segment, tone guidelines',
          aiProcessing: 'Prompt constraint framing & persona conditioning',
          mlOrAutomation: 'Multi-variant headline & CTA generation',
          output: 'Categorized copy candidates ready for A/B testing',
          humanReview: 'Copywriter edits nuance, accuracy, and compliance claims',
        },
        expectedBenefits: [
          'Accelerates A/B creative velocity cleanly',
          'Keeps messaging aligned to specific audience segments',
        ],
        skillsRequired: ['Prompt engineering', 'A/B statistical testing'],
      },
      {
        id: 'mkt-sentiment',
        title: 'Brand Sentiment & Review Mining',
        summary: 'Extract product praise and friction themes from thousands of customer reviews.',
        currentManualProcess:
          'Social managers read sample comments manually and estimate brand mood.',
        howAiAssists:
          'NLP tracks sentiment polarity over time and clusters recurring feature complaints.',
        aiTechnologies: ['Natural Language Processing', 'Data Visualization'],
        toolsUsed: ['Python', 'Sentiment Analyzers', 'Topic Clustering'],
        workflow: {
          input: 'App reviews, social mentions, survey open-text',
          aiProcessing: 'Tokenization, cleaning, aspect extraction',
          mlOrAutomation: 'Sentiment scoring + topic trend aggregation',
          output: 'Voice-of-customer dashboard by product theme',
          humanReview: 'Marketing & product teams validate priorities with user research',
        },
        expectedBenefits: [
          'Catches emerging brand PR issues before they escalate',
          'Turns unstructured comments into concrete messaging hooks',
        ],
        skillsRequired: ['NLP preprocessing', 'Sentiment analysis', 'Insight storytelling'],
      },
      {
        id: 'mkt-seo',
        title: 'SEO Content Clustering & Search Intent',
        summary: 'Organize keyword research by topic intent instead of isolated search terms.',
        currentManualProcess:
          'Analysts sort massive keyword CSVs manually to plan editorial calendars.',
        howAiAssists:
          'Text embeddings group thousands of search queries by semantic meaning automatically.',
        aiTechnologies: ['Natural Language Processing', 'Generative AI'],
        toolsUsed: ['Embeddings', 'Topic Planners'],
        workflow: {
          input: 'Search console query exports + competitor topics',
          aiProcessing: 'Semantic vector embedding generation',
          mlOrAutomation: 'Intent-based topic cluster grouping',
          output: 'Structured pillar-page & content gap roadmap',
          humanReview: 'Editorial lead commissions authoritative human-verified articles',
        },
        expectedBenefits: [
          'Prevents duplicate content cannibalization across blog posts',
          'Reveals high-intent content gaps faster',
        ],
        skillsRequired: ['Embeddings intuition', 'Data Analysis', 'Content strategy'],
      },
      {
        id: 'mkt-churn-winback',
        title: 'Churn Prevention & Lifecycle Triggers',
        summary: 'Trigger timely retention offers when subscriber engagement begins slipping.',
        currentManualProcess:
          'Retention emails go out only after a customer clicks Cancel.',
        howAiAssists:
          'Predictive models detect declining usage cadence weeks earlier for gentle re-engagement.',
        aiTechnologies: ['Predictive Analytics', 'AI Automation'],
        toolsUsed: ['Python', 'Lifecycle Automation Flows'],
        workflow: {
          input: 'Login frequency, feature adoption, email clicks',
          aiProcessing: 'Engagement decay scoring',
          mlOrAutomation: 'Early-warning retention trigger classification',
          output: 'Targeted re-engagement cohort list',
          humanReview: 'CRM manager calibrates offer frequency to avoid spam',
        },
        expectedBenefits: [
          'Improves retention before customers decide to leave',
          'Protects margin by targeting incentives only where needed',
        ],
        skillsRequired: ['Predictive modeling', 'Cohort metrics', 'Lifecycle automation'],
      },
    ],
  },
  {
    id: 'it-software',
    title: 'IT & Software Development',
    shortTitle: 'IT & Software Dev',
    sectorTag: 'Engineering · QA · DevOps',
    shortDescription:
      'Accelerate code reviews, automate unit test synthesis, triage production logs, and engineer reliable LLM/MLOps systems.',
    iconKey: 'Code2',
    accentColor: 'blue',
    dailyWorkflowExampleTitle: 'Code Review, Bug Triage & Automated Test Generation',
    humanOversightStatement:
      'Engineers own system architecture, security verification, and merge approvals; AI acts as an analytical pair-programmer.',
    recommendedProjects: ['code-assistant', 'document-intelligence', 'customer-support-agent'],
    existingStrengths: [
      'Programming fundamentals, APIs & system debugging',
      'Version control, CI/CD pipelines & automated testing',
      'Database design, scalability & security awareness',
      'Translating product requirements into clean code',
    ],
    newAiSkills: [
      'Static + LLM-assisted code review & bug pattern detection',
      'RAG systems over internal docs & codebases',
      'MLOps, model evaluation harnesses & drift monitoring',
      'Building agentic tool-calling workflows cleanly',
    ],
    skillGapData: [
      { skillArea: 'Software Architecture & Code', currentBaseline: 88, targetAiReady: 95 },
      { skillArea: 'Data & ML Foundations', currentBaseline: 45, targetAiReady: 85 },
      { skillArea: 'LLM Integration & RAG', currentBaseline: 30, targetAiReady: 90 },
      { skillArea: 'Eval Harnesses & Testing', currentBaseline: 55, targetAiReady: 90 },
      { skillArea: 'MLOps & Observability', currentBaseline: 40, targetAiReady: 85 },
    ],
    possiblePathways: [
      {
        roleTitle: 'AI Application & RAG Engineer',
        transitionFit: 'Fastest transition for full-stack and backend developers',
        exampleFocus: 'Builds grounded LLM APIs, vector pipelines, and evaluation suites.',
      },
      {
        roleTitle: 'MLOps & AI Platform Engineer',
        transitionFit: 'Natural progression for DevOps and SRE engineers',
        exampleFocus: 'Operates model serving, canary deployments, latency & drift telemetry.',
      },
      {
        roleTitle: 'Applied Machine Learning Engineer',
        transitionFit: 'Strong engineering path with Python + statistics depth',
        exampleFocus: 'Trains, calibrates, and ships domain ML models into production.',
      },
    ],
    beforeAfterSteps: [
      {
        stepNumber: 1,
        title: 'Bug Discovery & Root Cause Triage',
        beforeAction: 'Developer greps thousands of log lines manually across microservices.',
        beforePainPoint: 'Incident root-cause localization consumes hours during outages.',
        afterAction: 'AI clusters anomalous stack traces and pinpoints suspect commits.',
        afterSystemNote: 'Links error bursts directly to recent schema or PR diffs.',
        humanOversightRole: 'Engineer verifies root cause and approves hotfix strategy.',
      },
      {
        stepNumber: 2,
        title: 'Pull Request & Security Inspection',
        beforeAction: 'Reviewer manually checks every line for null edge cases and style slips.',
        beforePainPoint: 'Large PRs lead to reviewer fatigue and missed edge conditions.',
        afterAction: 'Code Assistant flags off-by-one risks, missing validation, and complexity.',
        afterSystemNote: 'Surfaces exact line findings with concise patch explanations.',
        humanOversightRole: 'Senior engineer evaluates architectural trade-offs and merges.',
      },
      {
        stepNumber: 3,
        title: 'Edge-Case Test Coverage',
        beforeAction: 'Tight sprint deadlines tempt teams to skip negative edge-case tests.',
        beforePainPoint: 'Regressions slip into staging because boundary cases went untested.',
        afterAction: 'AI proposes deterministic unit test cases for empty, null, and extreme inputs.',
        afterSystemNote: 'Maps each proposed test to uncovered branches.',
        humanOversightRole: 'Developer inspects assertions so tests validate real business rules.',
      },
      {
        stepNumber: 4,
        title: 'Documentation & Knowledge Search',
        beforeAction: 'New hires hunt through outdated wikis and ask senior engineers on chat.',
        beforePainPoint: 'Repeated onboarding questions interrupt deep engineering work.',
        afterAction: 'RAG Q&A retrieves exact API specs and runbooks with source citations.',
        afterSystemNote: 'Keeps answers synced with repository markdown updates.',
        humanOversightRole: 'Tech leads review critical runbook updates after incidents.',
      },
    ],
    responsibilities: [
      {
        id: 'it-code-review',
        title: 'Code Quality Review & Bug Pattern Detection',
        summary: 'Spot null-safety gaps, SQL injection risks, and logic bugs before merge.',
        currentManualProcess:
          'Developers rely solely on manual PR reading and basic syntax linters.',
        howAiAssists:
          'Pattern analyzers plus LLM inspectors detect semantic edge cases and propose targeted fixes.',
        aiTechnologies: ['Large Language Models', 'AI Automation', 'Model Evaluation'],
        toolsUsed: ['Static Analyzers', 'LLM Code Inspectors', 'CI Hooks'],
        workflow: {
          input: 'Pull request diff + language context',
          aiProcessing: 'AST structure inspection + bug pattern classification',
          mlOrAutomation: 'Risk annotation & patch suggestion generation',
          output: 'Line-level bug report + suggested fix diff',
          humanReview: 'Engineer verifies behavior and avoids blind copy-paste',
        },
        expectedBenefits: [
          'Catches subtle edge-case defects earlier in code review',
          'Frees senior reviewers to focus on architecture and security',
        ],
        skillsRequired: ['Software engineering', 'Prompt safety', 'Automated testing'],
      },
      {
        id: 'it-test-gen',
        title: 'Automated Unit & Regression Test Authoring',
        summary: 'Expand boundary test coverage cleanly without slowing sprint delivery.',
        currentManualProcess:
          'Teams manually scaffold repetitive mock fixtures and boundary test matrices.',
        howAiAssists:
          'Analyzes function signatures and branches to propose realistic happy-path and failure tests.',
        aiTechnologies: ['Generative AI', 'Large Language Models', 'AI Automation'],
        toolsUsed: ['Test Runners', 'Code Parsers'],
        workflow: {
          input: 'Target module code + edge-case specification',
          aiProcessing: 'Branch path identification',
          mlOrAutomation: 'Test case template synthesis',
          output: 'Runnable unit test suite covering boundaries',
          humanReview: 'Developer validates test assertions represent true specs',
        },
        expectedBenefits: [
          'Raises coverage on boundary inputs and error handling',
          'Accelerates regression safety during refactoring',
        ],
        skillsRequired: ['Test design', 'Assertion verification', 'TypeScript / Python'],
      },
      {
        id: 'it-incident-logs',
        title: 'Production Log Clustering & Incident Triage',
        summary: 'Group noisy error spikes into distinct failure signatures automatically.',
        currentManualProcess:
          'On-call engineers scroll raw log streams manually during high-stress incidents.',
        howAiAssists:
          'Anomaly detection and log embeddings cluster new error patterns right after deploys.',
        aiTechnologies: ['Machine Learning', 'Natural Language Processing', 'Predictive Analytics'],
        toolsUsed: ['Python', 'Log Anomaly Detectors', 'Observability Dashboards'],
        workflow: {
          input: 'Application logs, latency percentiles, deploy markers',
          aiProcessing: 'Log template parsing + vector clustering',
          mlOrAutomation: 'Spike anomaly scoring & probable culprit ranking',
          output: 'Incident triage brief with affected endpoints',
          humanReview: 'SRE executes rollback or mitigation runbook',
        },
        expectedBenefits: [
          'Shortens mean time to isolate regressions',
          'Reduces alert fatigue during cascading errors',
        ],
        skillsRequired: ['Telemetry analysis', 'Clustering intuition', 'Observability'],
      },
      {
        id: 'it-rag-docs',
        title: 'Internal Engineering Wiki & API Search (RAG)',
        summary: 'Turn scattered architecture docs and ADRs into cited developer answers.',
        currentManualProcess:
          'Engineers waste time searching fragmented Confluence, GitHub, and ticket threads.',
        howAiAssists:
          'RAG pipelines index technical docs into vector stores for instant cited lookup.',
        aiTechnologies: ['Natural Language Processing', 'Large Language Models', 'Generative AI'],
        toolsUsed: ['Vector Embeddings', 'RAG Retrieval APIs'],
        workflow: {
          input: 'Developer query + indexed markdown / OpenAPI specs',
          aiProcessing: 'Chunk embedding & cosine similarity retrieval',
          mlOrAutomation: 'Grounded answer synthesis with doc links',
          output: 'Direct technical answer citing exact repo sections',
          humanReview: 'Developer checks linked source doc before production changes',
        },
        expectedBenefits: [
          'Cuts onboarding ramp-up time for new team members',
          'Reduces repetitive interruptions in engineering Slack channels',
        ],
        skillsRequired: ['Embeddings & vector DBs', 'RAG architecture', 'API integration'],
      },
      {
        id: 'it-legacy-refactor',
        title: 'Legacy Code Documentation & Migration Prep',
        summary: 'Map undocumented legacy modules before modernizing services.',
        currentManualProcess:
          'Developers spend weeks reverse-engineering undocumented business logic line by line.',
        howAiAssists:
          'Summarizes data flow, side effects, and dependency boundaries into readable diagrams.',
        aiTechnologies: ['Large Language Models', 'Data Analysis'],
        toolsUsed: ['Dependency Analyzers', 'LLM Summarizers'],
        workflow: {
          input: 'Legacy source files & schema definitions',
          aiProcessing: 'Call-graph & state mutation mapping',
          mlOrAutomation: 'Module contract summary generation',
          output: 'Structured module brief & migration risk checklist',
          humanReview: 'Architect validates business invariants with domain owners',
        },
        expectedBenefits: [
          'De-risks legacy system rewrites',
          'Creates clean documentation during modernization',
        ],
        skillsRequired: ['System design', 'Context chunking', 'Verification testing'],
      },
      {
        id: 'it-mlops-ship',
        title: 'AI Feature Evaluation & Drift Monitoring',
        summary: 'Monitor prompt quality, latency, and prediction drift in production apps.',
        currentManualProcess:
          'Teams ship AI features without systematic accuracy regression benchmarks.',
        howAiAssists:
          'Automated evaluation suites score outputs against golden test sets on every release.',
        aiTechnologies: ['Model Evaluation', 'AI Automation', 'Data Visualization'],
        toolsUsed: ['Eval Harnesses', 'Canary Rollouts', 'Python'],
        workflow: {
          input: 'Production prompt/model traces + golden dataset',
          aiProcessing: 'Precision, latency & drift metric computation',
          mlOrAutomation: 'Automated release gate & drift alert',
          output: 'Model health scorecard & rollback trigger',
          humanReview: 'ML/Software engineer audits failed test cases before rollout',
        },
        expectedBenefits: [
          'Prevents silent quality regressions after prompt or model updates',
          'Turns AI prototypes into dependable production software',
        ],
        skillsRequired: ['Model Evaluation', 'MLOps pipelines', 'Software testing'],
      },
    ],
  },
  {
    id: 'healthcare-admin',
    title: 'Healthcare & Medical Administration',
    shortTitle: 'Healthcare Admin',
    sectorTag: 'Operations · Scheduling · Capacity',
    shortDescription:
      'Forecast patient influx, streamline appointment scheduling, and automate medical billing & intake workflows safely.',
    iconKey: 'Stethoscope',
    accentColor: 'cyan',
    dailyWorkflowExampleTitle: 'Hospital Bed Capacity & Readmission Risk Planning',
    humanOversightStatement:
      'Healthcare predictive analytics supports administrative capacity, scheduling, and follow-up triage; clinicians strictly handle all medical diagnoses and patient care decisions.',
    recommendedProjects: ['healthcare-analytics', 'document-intelligence', 'customer-support-agent'],
    existingStrengths: [
      'Hospital operations, intake & EHR workflow mastery',
      'Patient privacy (HIPAA/GDPR) & compliance stewardship',
      'ICD/billing documentation & claims coordination',
      'Cross-department clinic & bed scheduling',
    ],
    newAiSkills: [
      'Patient volume & bed-occupancy forecasting',
      'Appointment no-show risk prediction',
      'Automated claims & intake document extraction',
      'De-identified operational KPI analytics',
    ],
    skillGapData: [
      { skillArea: 'Healthcare Ops & Privacy', currentBaseline: 90, targetAiReady: 95 },
      { skillArea: 'SQL & EHR Analytics', currentBaseline: 35, targetAiReady: 82 },
      { skillArea: 'Capacity Forecasting ML', currentBaseline: 15, targetAiReady: 78 },
      { skillArea: 'Document & Claims OCR', currentBaseline: 20, targetAiReady: 80 },
      { skillArea: 'Ethical AI Governance', currentBaseline: 45, targetAiReady: 92 },
    ],
    possiblePathways: [
      {
        roleTitle: 'Healthcare Operations & Capacity Analytics Lead',
        transitionFit: 'Ideal progression for clinic & hospital administrators',
        exampleFocus: 'Optimizes staffing rosters, theatre slots, and seasonal surge readiness.',
      },
      {
        roleTitle: 'Revenue Cycle & Claims Intelligence Specialist',
        transitionFit: 'Strong upskill for medical billing & coding coordinators',
        exampleFocus: 'Detects incomplete claim fields prior to insurer submission.',
      },
      {
        roleTitle: 'Health Informatics & AI Implementation Coordinator',
        transitionFit: 'Bridge role between clinical staff and health-tech vendors',
        exampleFocus: 'Governs safe administrative AI workflows and privacy audits.',
      },
    ],
    beforeAfterSteps: [
      {
        stepNumber: 1,
        title: 'Clinic Scheduling & No-Show Prep',
        beforeAction: 'Front-desk team books slots sequentially with static phone reminders.',
        beforePainPoint: 'Unexpected no-shows leave specialist slots idle while waitlists grow.',
        afterAction: 'Operational ML flags appointment slots with elevated no-show likelihood.',
        afterSystemNote: 'Suggests proactive confirmation reminders or smart overbooking buffers.',
        humanOversightRole: 'Coordinator calls patients kindly to confirm or reschedule.',
      },
      {
        stepNumber: 2,
        title: 'Admission Surge & Resource Planning',
        beforeAction: 'Nurse managers estimate next week’s staffing from memory and past month averages.',
        beforePainPoint: 'Seasonal spikes catch ward capacity off-guard.',
        afterAction: 'Time-series analytics forecasts 14-day outpatient and bed demand.',
        afterSystemNote: 'Factors local seasonal trends and scheduled procedure volume.',
        humanOversightRole: 'Operations director adjusts shift rosters and supply orders.',
      },
      {
        stepNumber: 3,
        title: 'Intake Forms & Insurance Verification',
        beforeAction: 'Clerks manually transcribe referral letters and insurance cards.',
        beforePainPoint: 'Missing policy codes trigger claim denials weeks later.',
        afterAction: 'Document AI extracts coverage fields and flags incomplete sections immediately.',
        afterSystemNote: 'Validates required fields prior to claim batch submission.',
        humanOversightRole: 'Billing specialist reviews flagged claims before submission.',
      },
      {
        stepNumber: 4,
        title: 'Discharge Follow-Up Coordination',
        beforeAction: 'Care coordinators rely on static checklists to prioritize post-visit check-ins.',
        beforePainPoint: 'High-support administrative needs blend into routine queues.',
        afterAction: 'Analytics surfaces administrative follow-up priorities (transport, appointment booking).',
        afterSystemNote: 'Organizes outreach queue without making clinical diagnoses.',
        humanOversightRole: 'Clinical and care teams manage all medical instructions personally.',
      },
    ],
    responsibilities: [
      {
        id: 'hc-volume-forecast',
        title: 'Patient Volume & Resource Capacity Forecasting',
        summary: 'Predict clinic visits, ER surges, and ward occupancy trends cleanly.',
        currentManualProcess:
          'Administrators copy historical admission totals into static monthly spreadsheets.',
        howAiAssists:
          'Forecasting models blend seasonal curves, day-of-week effects, and scheduled procedures.',
        aiTechnologies: ['Predictive Analytics', 'Statistics', 'Data Visualization'],
        toolsUsed: ['Python', 'Time-Series Models', 'Hospital Ops Dashboards'],
        workflow: {
          input: 'De-identified visit logs, seasonality, planned surgeries',
          aiProcessing: 'Trend & seasonality decomposition',
          mlOrAutomation: 'Multi-day patient volume & bed utilization forecast',
          output: 'Staffing & resource readiness chart by department',
          humanReview: 'Operations managers adjust nurse shifts & equipment staging',
        },
        expectedBenefits: [
          'Reduces last-minute shift shortages during seasonal peaks',
          'Improves clinic room utilization without overburdening staff',
        ],
        skillsRequired: ['Statistics', 'Forecasting analytics', 'Data privacy basics'],
      },
      {
        id: 'hc-noshow',
        title: 'Appointment No-Show Risk & Waitlist Fill',
        summary: 'Identify high-risk missed appointments early to keep specialist calendars full.',
        currentManualProcess:
          'Coordinators send generic SMS blasts 24 hours prior with no prioritization.',
        howAiAssists:
          'Classification weighs lead time, reminder confirmation, and weather/transit patterns.',
        aiTechnologies: ['Machine Learning', 'AI Automation'],
        toolsUsed: ['Python', 'Scheduling Analytics'],
        workflow: {
          input: 'Lead days booked, reminder status, clinic slot hour',
          aiProcessing: 'De-identified attendance feature scoring',
          mlOrAutomation: 'No-show probability classification',
          output: 'Priority outreach list for confirmation team',
          humanReview: 'Front desk reaches out respectfully and offers waitlist slots',
        },
        expectedBenefits: [
          'Shortens patient waitlists by filling cancellations faster',
          'Avoids wasted specialist consultation hours',
        ],
        skillsRequired: ['Classification intuition', 'Operations metrics'],
      },
      {
        id: 'hc-claims',
        title: 'Insurance Claims & Intake Form Checking',
        summary: 'Detect missing billing fields and formatting discrepancies before submission.',
        currentManualProcess:
          'Billing clerks manually check PDFs and re-verify denied claims weeks later.',
        howAiAssists:
          'Document parsers validate policy IDs, dates, and code completeness pre-submission.',
        aiTechnologies: ['Natural Language Processing', 'AI Automation'],
        toolsUsed: ['OCR Parsers', 'Validation Checklists'],
        workflow: {
          input: 'Referral PDFs, intake sheets, claim drafts',
          aiProcessing: 'Field extraction & schema validation',
          mlOrAutomation: 'Missing-field & mismatch anomaly detection',
          output: 'Clean claim readiness report with error highlights',
          humanReview: 'Billing coordinator corrects flagged fields prior to submission',
        },
        expectedBenefits: [
          'Reduces administrative claim rework and payment delays',
          'Frees intake clerks from repetitive re-keying',
        ],
        skillsRequired: ['Document parsing concepts', 'SQL & data QA'],
      },
      {
        id: 'hc-readmission-ops',
        title: 'Operational Readmission & Follow-Up Analytics',
        summary: 'Spot administrative care-coordination gaps (non-diagnostic logistics).',
        currentManualProcess:
          'Quality teams review discharge metrics retrospectively months after discharge.',
        howAiAssists:
          'Highlights scheduling delays or missed follow-up bookings across clinics for admin action.',
        aiTechnologies: ['Predictive Analytics', 'Data Analysis'],
        toolsUsed: ['Python', 'De-identified Cohort Dashboards'],
        workflow: {
          input: 'Follow-up booking status, length of stay band, clinic distance',
          aiProcessing: 'Operational risk factor aggregation',
          mlOrAutomation: 'Administrative coordination priority score',
          output: 'Follow-up outreach checklist for coordinators',
          humanReview: 'Clinicians oversee all medical judgments; admins arrange logistics',
        },
        expectedBenefits: [
          'Ensures timely post-discharge appointment scheduling',
          'Supports hospital quality teams with clearer operational trends',
        ],
        skillsRequired: ['Healthcare data ethics', 'Data Analysis', 'Model Evaluation'],
      },
      {
        id: 'hc-inventory',
        title: 'Medical Supply & Pharmacy Inventory Planning',
        summary: 'Prevent stockouts of routine clinical consumables without excess expiry waste.',
        currentManualProcess:
          'Supply coordinators place fixed weekly reorders manually from shelf counts.',
        howAiAssists:
          'Demand models correlate usage against surgical schedules and seasonal clinic loads.',
        aiTechnologies: ['Predictive Analytics', 'Machine Learning'],
        toolsUsed: ['Python', 'Inventory Forecast Charts'],
        workflow: {
          input: 'Weekly usage logs, surgery calendar, supplier lead time',
          aiProcessing: 'Consumption rate smoothing',
          mlOrAutomation: 'Reorder point & safety stock calculation',
          output: 'Department replenishment schedule',
          humanReview: 'Pharmacy & supply leads authorize purchase orders',
        },
        expectedBenefits: [
          'Minimizes expired sterile stock',
          'Protects departments against sudden supply bottlenecks',
        ],
        skillsRequired: ['Forecasting basics', 'Inventory analytics'],
      },
      {
        id: 'hc-faq-triage',
        title: 'Patient Administrative FAQ & Routing Desk',
        summary: 'Answer clinic hours, parking, prep checklist, and portal inquiries cleanly.',
        currentManualProcess:
          'Call centers spend half their day answering repeatable logistics questions.',
        howAiAssists:
          'Intent routing answers verified logistics FAQs and escalates any clinical symptom immediately.',
        aiTechnologies: ['Natural Language Processing', 'Large Language Models'],
        toolsUsed: ['Intent Classifiers', 'Policy-Grounded Q&A'],
        workflow: {
          input: 'Patient portal or phone transcript inquiry',
          aiProcessing: 'Intent & medical-escalation keyword check',
          mlOrAutomation: 'Approved logistics response OR immediate nurse routing',
          output: 'Verified clinic info or instant clinical desk transfer',
          humanReview: 'Medical staff handle all health questions; zero AI diagnosis',
        },
        expectedBenefits: [
          'Reduces phone hold times for appointment logistics',
          'Strict safety escalation keeps clinical topics with licensed staff',
        ],
        skillsRequired: ['NLP intent routing', 'Safety guardrail design'],
      },
    ],
  },
  {
    id: 'operations-supply',
    title: 'Operations & Supply Chain Management',
    shortTitle: 'Operations & Supply',
    sectorTag: 'Logistics · Inventory · Procurement',
    shortDescription:
      'Replace static reorder spreadsheets with ML demand forecasting, supplier risk tracking, and route efficiency models.',
    iconKey: 'Truck',
    accentColor: 'blue',
    dailyWorkflowExampleTitle: 'Multi-Warehouse Demand Forecasting & Reorder Planning',
    humanOversightStatement:
      'Supply planners validate geopolitical disruptions, vendor contracts, and strategic buffer allocations before committing capital.',
    recommendedProjects: ['inventory-forecasting', 'business-intelligence', 'document-intelligence'],
    existingStrengths: [
      'Inventory turnover, safety stock & lead-time mastery',
      'Vendor negotiation & procurement SLA management',
      'Warehouse fulfillment & logistics routing operations',
      'Root-cause Lean / Six Sigma process optimization',
    ],
    newAiSkills: [
      'ML demand & seasonality forecasting',
      'Supplier delay anomaly & lead-time modeling',
      'Automated PO / invoice extraction & discrepancy checks',
      'Inventory optimization & cost simulation in Python',
    ],
    skillGapData: [
      { skillArea: 'Supply Chain Operations', currentBaseline: 90, targetAiReady: 95 },
      { skillArea: 'SQL & ERP Data Prep', currentBaseline: 45, targetAiReady: 85 },
      { skillArea: 'Demand Forecasting ML', currentBaseline: 20, targetAiReady: 85 },
      { skillArea: 'Optimization & Simulation', currentBaseline: 30, targetAiReady: 80 },
      { skillArea: 'Automation & Doc AI', currentBaseline: 25, targetAiReady: 78 },
    ],
    possiblePathways: [
      {
        roleTitle: 'AI-Driven Demand & Supply Planning Lead',
        transitionFit: 'Direct step-up for inventory & S&OP analysts',
        exampleFocus: 'Replaces static Excel moving averages with seasonal ML forecasts.',
      },
      {
        roleTitle: 'Supply Chain Analytics & Optimization Specialist',
        transitionFit: 'Strong progression for logistics coordinators',
        exampleFocus: 'Models multi-echelon safety stock and carrier SLA reliability.',
      },
      {
        roleTitle: 'Procurement Automation & Risk Manager',
        transitionFit: 'Ideal for vendor & purchasing managers',
        exampleFocus: 'Automates invoice audits and predicts supplier bottleneck risks.',
      },
    ],
    beforeAfterSteps: [
      {
        stepNumber: 1,
        title: 'Demand Signal Gathering',
        beforeAction: 'Planner averages past 4 weeks of shipments in a static Excel sheet.',
        beforePainPoint: 'Static averages lag sudden holiday spikes or promotional surges.',
        afterAction: 'ML ingests historical sales, seasonality, promo calendar, and weather.',
        afterSystemNote: 'Quantifies expected SKU demand curves across upcoming weeks.',
        humanOversightRole: 'Planner incorporates unmodeled product launches or promos.',
      },
      {
        stepNumber: 2,
        title: 'Safety Stock & Reorder Alerting',
        beforeAction: 'Fixed min/max thresholds trigger late rush orders or bloated warehouses.',
        beforePainPoint: 'Working capital gets tied up in slow movers while top SKUs stock out.',
        afterAction: 'Dynamic inventory model balances carrying cost against stockout risk.',
        afterSystemNote: 'Simulates supplier lead-time variance cleanly.',
        humanOversightRole: 'Category manager approves vendor PO splits and MOQ constraints.',
      },
      {
        stepNumber: 3,
        title: 'Vendor Invoice & PO Reconciliation',
        beforeAction: 'Coordinators manually compare packing slips against multi-line invoices.',
        beforePainPoint: 'Billing errors and unit-price mismatches slip through undetected.',
        afterAction: 'Document AI extracts line items and flags quantity or rate variances.',
        afterSystemNote: 'Highlights discrepancies immediately for rapid vendor resolution.',
        humanOversightRole: 'Procurement specialist settles disputes and releases payments.',
      },
      {
        stepNumber: 4,
        title: 'S&OP Executive Alignment',
        beforeAction: 'Team spends 3 days stitching ERP exports into monthly review slides.',
        beforePainPoint: 'Leadership debates outdated numbers during S&OP meetings.',
        afterAction: 'Live dashboard shows forecast vs. actual accuracy and margin impact.',
        afterSystemNote: 'Updates automatically as warehouse scans arrive.',
        humanOversightRole: 'Operations VP aligns manufacturing and sales on shared targets.',
      },
    ],
    responsibilities: [
      {
        id: 'ops-demand',
        title: 'SKU Demand Forecasting',
        summary: 'Predict weekly unit demand accounting for promotions and seasonal shifts.',
        currentManualProcess:
          'Planners use trailing 4-week moving averages in Excel across hundreds of SKUs.',
        howAiAssists:
          'Regression and time-series models weight promotions, calendar seasonality, and trend growth.',
        aiTechnologies: ['Predictive Analytics', 'Machine Learning', 'Statistics'],
        toolsUsed: ['Python', 'Forecasting Models', 'Recharts Comparison'],
        workflow: {
          input: 'Weekly sales history, promo flags, seasonal index',
          aiProcessing: 'Lag feature engineering & trend extraction',
          mlOrAutomation: 'ML demand curve vs. naive baseline forecasting',
          output: 'Weekly unit forecast + predicted stockout buffer',
          humanReview: 'Demand planner adjusts for upcoming wholesale contracts',
        },
        expectedBenefits: [
          'Cuts forecast error noticeably during promotional spikes',
          'Avoids emergency air-freight rush costs',
        ],
        skillsRequired: ['Time-series forecasting', 'Python / SQL', 'Error metrics (MAPE/MAE)'],
      },
      {
        id: 'ops-inventory',
        title: 'Inventory & Safety Stock Optimization',
        summary: 'Balance warehouse holding costs against customer service level targets.',
        currentManualProcess:
          'Teams apply uniform static safety weeks across all items regardless of volatility.',
        howAiAssists:
          'Models SKU demand variability and supplier lead-time variance to size buffers precisely.',
        aiTechnologies: ['Statistics', 'Predictive Analytics', 'Data Visualization'],
        toolsUsed: ['Python', 'Simulation Sliders', 'ERP Data'],
        workflow: {
          input: 'Lead-time variance, holding cost, target service level',
          aiProcessing: 'Demand volatility calculation',
          mlOrAutomation: 'Dynamic reorder point computation',
          output: 'SKU-level reorder trigger & capital savings estimate',
          humanReview: 'Inventory controller confirms warehouse shelf capacity',
        },
        expectedBenefits: [
          'Frees working capital trapped in overstocked SKUs',
          'Protects availability on high-velocity items',
        ],
        skillsRequired: ['Statistics', 'Data Analysis', 'Supply KPI modeling'],
      },
      {
        id: 'ops-supplier-risk',
        title: 'Supplier Delay & Risk Monitoring',
        summary: 'Detect slipping vendor lead times before assembly lines run dry.',
        currentManualProcess:
          'Buyers notice vendor slippage only when shipments miss dock dates.',
        howAiAssists:
          'Tracks partial-shipment rates and transit anomalies to alert early on risky vendors.',
        aiTechnologies: ['Machine Learning', 'Data Analysis'],
        toolsUsed: ['Python', 'Vendor Scorecards', 'SQL'],
        workflow: {
          input: 'PO timestamps, partial fill rates, transit logs',
          aiProcessing: 'Rolling supplier reliability scoring',
          mlOrAutomation: 'Delay probability flagging',
          output: 'At-risk vendor alerts + dual-source suggestions',
          humanReview: 'Procurement manager renegotiates SLAs or splits orders',
        },
        expectedBenefits: [
          'Gives teams extra weeks to shift orders to backup suppliers',
          'Data-driven vendor performance reviews',
        ],
        skillsRequired: ['SQL', 'Data Analysis', 'Risk scoring'],
      },
      {
        id: 'ops-invoice-po',
        title: 'PO, Packing Slip & Freight Invoice Auditing',
        summary: 'Verify three-way matching across purchase orders, receipts, and carrier bills.',
        currentManualProcess:
          'Accounts payable manually checks PDF bills for fuel surcharges and quantity discrepancies.',
        howAiAssists:
          'Document AI parses PDF line items and compares every fee against contracted rate cards.',
        aiTechnologies: ['Natural Language Processing', 'AI Automation'],
        toolsUsed: ['Document Intelligence', 'Validation Rules'],
        workflow: {
          input: 'Vendor PDF invoice + ERP purchase order',
          aiProcessing: 'Line-item OCR extraction & SKU matching',
          mlOrAutomation: 'Automated three-way discrepancy flagging',
          output: 'Approved batch or highlighted mismatch report',
          humanReview: 'AP/Procurement resolves disputed line items',
        },
        expectedBenefits: [
          'Catches duplicate billing and uncontracted surcharges early',
          'Speeds up supplier payment cycles cleanly',
        ],
        skillsRequired: ['Document parsing', 'Automation workflows'],
      },
      {
        id: 'ops-routing',
        title: 'Fleet Dispatch & Delivery Window Planning',
        summary: 'Sequence multi-stop routes considering traffic windows and truck capacity.',
        currentManualProcess:
          'Dispatchers assign delivery zones manually from habit and static maps.',
        howAiAssists:
          'Predictive ETA and routing heuristics reduce empty miles and missed dock windows.',
        aiTechnologies: ['Predictive Analytics', 'Machine Learning', 'AI Automation'],
        toolsUsed: ['Routing Optimizers', 'Telemetry Dashboards'],
        workflow: {
          input: 'Order weights, drop-off time windows, historical transit speed',
          aiProcessing: 'Transit duration prediction per leg',
          mlOrAutomation: 'Clustered stop sequencing',
          output: 'Balanced route manifest with accurate ETAs',
          humanReview: 'Dispatcher adjusts for driver availability and urgent VIP drops',
        },
        expectedBenefits: [
          'Reduces fuel waste and late-delivery penalties',
          'Improves daily stops completed per vehicle',
        ],
        skillsRequired: ['Optimization basics', 'Data Analysis'],
      },
      {
        id: 'ops-sop-bi',
        title: 'S&OP Executive KPI & Bottleneck Reporting',
        summary: 'Track On-Time In-Full (OTIF), fill rate, and warehouse throughput weekly.',
        currentManualProcess:
          'Analysts spend hours cleaning warehouse CSVs before leadership reviews.',
        howAiAssists:
          'Unified BI pipelines surface root causes behind regional OTIF dips automatically.',
        aiTechnologies: ['Data Visualization', 'SQL', 'Large Language Models'],
        toolsUsed: ['SQL', 'BI Dashboards', 'Executive Brief Generators'],
        workflow: {
          input: 'WMS throughput logs + carrier delivery timestamps',
          aiProcessing: 'Automated KPI aggregation & outlier detection',
          mlOrAutomation: 'Variance commentary + drill-down charts',
          output: 'Weekly operations command brief',
          humanReview: 'Ops leaders prioritize warehouse workflow fixes',
        },
        expectedBenefits: [
          'Single source of truth across procurement, warehouse, and sales',
          'Faster identification of regional fulfillment bottlenecks',
        ],
        skillsRequired: ['SQL', 'Data Visualization', 'KPI modeling'],
      },
    ],
  },
  {
    id: 'education-training',
    title: 'Education & Training',
    shortTitle: 'Education & Training',
    sectorTag: 'Pedagogy · EdTech · Learning Ops',
    shortDescription:
      'Spot at-risk learners early, customize practice pathways, and streamline rubric feedback while keeping educators central.',
    iconKey: 'GraduationCap',
    accentColor: 'purple',
    dailyWorkflowExampleTitle: 'Cohort Progress Monitoring & Personalized Study Support',
    humanOversightStatement:
      'AI supports curriculum preparation and early engagement alerts; educators always own mentoring, grading integrity, and student care.',
    recommendedProjects: ['document-intelligence', 'customer-support-agent', 'business-intelligence'],
    existingStrengths: [
      'Curriculum design, scaffolding & Bloom’s taxonomy',
      'Classroom facilitation, mentoring & student empathy',
      'Formative assessment & rubric construction',
      'Cohort engagement & learning outcome tracking',
    ],
    newAiSkills: [
      'Learning analytics & early dropout risk indicators',
      'RAG study assistants grounded strictly in course syllabi',
      'Structured rubric feedback drafting & alignment',
      'Adaptive practice generation & mastery tracking',
    ],
    skillGapData: [
      { skillArea: 'Pedagogy & Curriculum', currentBaseline: 92, targetAiReady: 96 },
      { skillArea: 'Cohort Data Analytics', currentBaseline: 40, targetAiReady: 82 },
      { skillArea: 'GenAI Lesson & Rubric Design', currentBaseline: 35, targetAiReady: 86 },
      { skillArea: 'RAG Course Assistants', currentBaseline: 15, targetAiReady: 76 },
      { skillArea: 'AI Ethics & Integrity', currentBaseline: 50, targetAiReady: 92 },
    ],
    possiblePathways: [
      {
        roleTitle: 'AI Learning Experience & Curriculum Designer',
        transitionFit: 'Natural step-up for teachers and L&D trainers',
        exampleFocus: 'Builds interactive, syllabus-grounded practice modules and simulations.',
      },
      {
        roleTitle: 'Student Success & Learning Analytics Lead',
        transitionFit: 'Strong progression for academic coordinators',
        exampleFocus: 'Uses engagement telemetry to trigger timely human advising.',
      },
      {
        roleTitle: 'Corporate AI Enablement & L&D Strategist',
        transitionFit: 'High-demand pivot into enterprise upskilling teams',
        exampleFocus: 'Designs practical AI literacy programs tailored per department.',
      },
    ],
    beforeAfterSteps: [
      {
        stepNumber: 1,
        title: 'Lesson Prep & Concept Examples',
        beforeAction: 'Instructor searches textbooks manually for varied industry examples.',
        beforePainPoint: 'Preparing differentiated practice problems takes hours each week.',
        afterAction: 'GenAI adapts syllabus examples to different student backgrounds quickly.',
        afterSystemNote: 'Maintains aligned difficulty tiers and solution keys.',
        humanOversightRole: 'Instructor checks factual accuracy and pedagogical clarity.',
      },
      {
        stepNumber: 2,
        title: 'Student Engagement Monitoring',
        beforeAction: 'Educator notices struggling learners only after midterm exam grades drop.',
        beforePainPoint: 'Late detection leaves less time for supportive tutoring.',
        afterAction: 'Analytics tracks assignment delays and quiz mastery trends weekly.',
        afterSystemNote: 'Flags learners who may benefit from early check-in.',
        humanOversightRole: 'Mentor conducts supportive 1-on-1 coaching conversations.',
      },
      {
        stepNumber: 3,
        title: 'Syllabus & Doubts Support Desk',
        beforeAction: 'Instructors repeatedly answer routine deadline and prerequisite questions.',
        beforePainPoint: 'Administrative Q&A crowds out deeper concept mentoring.',
        afterAction: 'RAG course assistant answers policy questions citing syllabus sections.',
        afterSystemNote: 'Routes conceptual struggles to teaching assistants.',
        humanOversightRole: 'Educator leads office hours and nuanced feedback.',
      },
      {
        stepNumber: 4,
        title: 'Rubric Feedback Consistency',
        beforeAction: 'Grading 80 reflections manually causes fatigue toward the final batch.',
        beforePainPoint: 'Late submissions receive shorter written comments.',
        afterAction: 'AI organizes rubric criteria checklists and summarizes common class gaps.',
        afterSystemNote: 'Highlights recurring misconceptions across the cohort.',
        humanOversightRole: 'Educator writes final evaluations and grades personally.',
      },
    ],
    responsibilities: [
      {
        id: 'edu-cohort-risk',
        title: 'Early Student Support & Engagement Tracking',
        summary: 'Spot dipping LMS participation early so mentors can intervene kindly.',
        currentManualProcess:
          'Coordinators notice missing submissions only during end-of-term audits.',
        howAiAssists:
          'Combines attendance, quiz attempts, and pacing lag into early outreach lists.',
        aiTechnologies: ['Predictive Analytics', 'Data Visualization', 'Statistics'],
        toolsUsed: ['LMS Analytics', 'Python', 'Cohort Dashboards'],
        workflow: {
          input: 'Assignment timestamps, quiz trends, forum participation',
          aiProcessing: 'Pacing anomaly computation',
          mlOrAutomation: 'Early-support priority flagging',
          output: 'Weekly mentor check-in roster',
          humanReview: 'Academic advisor reaches out empathetically to remove blockers',
        },
        expectedBenefits: [
          'Enables supportive intervention weeks earlier',
          'Identifies confusing curriculum modules across cohorts',
        ],
        skillsRequired: ['Learning analytics', 'Data Visualization', 'Student privacy ethics'],
      },
      {
        id: 'edu-lesson-adapt',
        title: 'Differentiated Lesson & Practice Authoring',
        summary: 'Adapt core concepts into varied examples for diverse learner speeds.',
        currentManualProcess:
          'Instructors teach one static worksheet regardless of learner background.',
        howAiAssists:
          'GenAI generates scaffolded practice variants grounded in approved lesson notes.',
        aiTechnologies: ['Generative AI', 'Large Language Models'],
        toolsUsed: ['Prompt Templates', 'Curriculum Knowledge Bases'],
        workflow: {
          input: 'Core learning objective + target domain context',
          aiProcessing: 'Difficulty-level scaffolding',
          mlOrAutomation: 'Practice problem & answer explanation drafting',
          output: 'Foundational, intermediate, and applied exercises',
          humanReview: 'Teacher validates technical accuracy before class distribution',
        },
        expectedBenefits: [
          'Makes abstract topics concrete for learners from varied industries',
          'Saves prep time for live facilitation',
        ],
        skillsRequired: ['Structured prompting', 'Curriculum alignment'],
      },
      {
        id: 'edu-syllabus-rag',
        title: '24/7 Syllabus & Resource Q&A Assistant',
        summary: 'Answer course logistics and prerequisite lookups grounded in official handbooks.',
        currentManualProcess:
          'Trainers answer identical questions about schedules and reading lists via email.',
        howAiAssists:
          'RAG retrieves exact syllabus paragraphs and links students to relevant lab sections.',
        aiTechnologies: ['Natural Language Processing', 'Large Language Models'],
        toolsUsed: ['Vector Search (RAG)', 'Course Handbooks'],
        workflow: {
          input: 'Learner question + course syllabus PDFs',
          aiProcessing: 'Semantic chunk retrieval',
          mlOrAutomation: 'Cited syllabus answer generation',
          output: 'Verified response with module & page reference',
          humanReview: 'Instructor audits unanswered questions to improve course docs',
        },
        expectedBenefits: [
          'Immediate clarity for self-paced evening learners',
          'Reduces repetitive inbox load for faculty',
        ],
        skillsRequired: ['RAG setup basics', 'Knowledge structuring'],
      },
      {
        id: 'edu-misconception',
        title: 'Class Misconception & Survey Analysis',
        summary: 'Cluster open-ended exit-ticket feedback to adjust next day’s lecture.',
        currentManualProcess:
          'Trainers skim dozens of text responses quickly and miss subtle confusion themes.',
        howAiAssists:
          'NLP groups student questions by topic and highlights concepts needing live review.',
        aiTechnologies: ['Natural Language Processing', 'Data Analysis'],
        toolsUsed: ['Text Clustering', 'Sentiment Summaries'],
        workflow: {
          input: 'Post-class reflection forms & poll comments',
          aiProcessing: 'Topic extraction & theme frequency count',
          mlOrAutomation: 'Top misconception summary brief',
          output: '3-bullet lecture recap priorities for tomorrow',
          humanReview: 'Educator adapts next session opening examples accordingly',
        },
        expectedBenefits: [
          'Closes the feedback loop between lectures rapidly',
          'Elevates quiet students’ confusion themes visually',
        ],
        skillsRequired: ['NLP clustering', 'Formative assessment design'],
      },
      {
        id: 'edu-rubric',
        title: 'Rubric Consistency & Feedback Drafting',
        summary: 'Organize constructive checklist feedback aligned to learning rubrics.',
        currentManualProcess:
          'Writing detailed structured comments across 100 capstone submissions takes weekends.',
        howAiAssists:
          'Maps draft structure against rubric checklist items to accelerate comment drafting.',
        aiTechnologies: ['Large Language Models', 'Model Evaluation'],
        toolsUsed: ['Rubric Prompts', 'Document Analyzers'],
        workflow: {
          input: 'Project submission + official grading rubric',
          aiProcessing: 'Criteria-by-criteria evidence lookup',
          mlOrAutomation: 'Structured draft checklist feedback',
          output: 'Editable feedback matrix mapped to rubric criteria',
          humanReview: 'Educator reviews submission directly and assigns final marks',
        },
        expectedBenefits: [
          'Keeps feedback detailed even on large cohorts',
          'Maintains fairness across early and late graded papers',
        ],
        skillsRequired: ['Rubric engineering', 'Academic integrity governance'],
      },
      {
        id: 'edu-placement-ops',
        title: 'Curriculum Outcomes & Accreditation Reporting',
        summary: 'Aggregate competency attainment and completion rates cleanly.',
        currentManualProcess:
          'Academic ops manually merges assessment spreadsheets for annual program audits.',
        howAiAssists:
          'Automated SQL pipelines visualize module mastery progression across cohorts.',
        aiTechnologies: ['Data Analysis', 'Data Visualization', 'SQL'],
        toolsUsed: ['SQL', 'BI Outcomes Dashboards'],
        workflow: {
          input: 'Module scores, project evaluations, attendance logs',
          aiProcessing: 'Outcome mapping & cohort normalization',
          mlOrAutomation: 'Automated mastery gap report',
          output: 'Program outcome dashboard ready for academic review',
          humanReview: 'Program directors refine syllabus pacing for weak competencies',
        },
        expectedBenefits: [
          'Replaces manual audit spreadsheet assembly',
          'Tracks real skill progression objectively',
        ],
        skillsRequired: ['SQL', 'Data Visualization', 'Assessment analytics'],
      },
    ],
  },
];
