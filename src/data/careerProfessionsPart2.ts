import type { ProfessionProfile } from '../types/careerStudio';

export const PROFESSIONS_PART_2: ProfessionProfile[] = [
  {
    id: 'manufacturing-prod',
    title: 'Manufacturing & Production',
    shortTitle: 'Manufacturing',
    sectorTag: 'Quality · Maintenance · Yield',
    shortDescription:
      'Prevent unplanned equipment downtime with sensor anomaly alerts, automate visual defect inspection, and improve line yield.',
    iconKey: 'Factory',
    accentColor: 'cyan',
    dailyWorkflowExampleTitle: 'Predictive Maintenance & Assembly Quality Inspection',
    humanOversightStatement:
      'Plant engineers and quality supervisors govern safety lockouts, root-cause engineering fixes, and final lot release decisions.',
    recommendedProjects: ['inventory-forecasting', 'document-intelligence', 'business-intelligence'],
    existingStrengths: [
      'Lean manufacturing, OEE & Six Sigma quality control',
      'PLC/SCADA sensor intuition & plant floor safety',
      'Preventive maintenance scheduling & BOM planning',
      'Root-cause failure analysis (FMEA)',
    ],
    newAiSkills: [
      'Time-series vibration/temperature anomaly detection',
      'Computer vision defect classification & thresholding',
      'Production yield regression & scrap root-cause ML',
      'Automated maintenance SOP retrieval (RAG)',
    ],
    skillGapData: [
      { skillArea: 'Plant Ops & Quality (OEE)', currentBaseline: 92, targetAiReady: 96 },
      { skillArea: 'Sensor & Historian Data', currentBaseline: 45, targetAiReady: 84 },
      { skillArea: 'Predictive Maintenance ML', currentBaseline: 15, targetAiReady: 80 },
      { skillArea: 'Computer Vision Inspection', currentBaseline: 20, targetAiReady: 76 },
      { skillArea: 'Data Visualization & Yield', currentBaseline: 40, targetAiReady: 85 },
    ],
    possiblePathways: [
      {
        roleTitle: 'Smart Factory & Predictive Maintenance Specialist',
        transitionFit: 'Ideal progression for reliability & maintenance engineers',
        exampleFocus: 'Monitors vibration/thermal drift models to schedule planned repairs.',
      },
      {
        roleTitle: 'AI Quality & Yield Engineering Lead',
        transitionFit: 'Natural step-up for QA & process engineers',
        exampleFocus: 'Pairs vision inspection thresholds with root-cause scrap analytics.',
      },
      {
        roleTitle: 'Industrial Data & Industry 4.0 Coordinator',
        transitionFit: 'Bridge role for production supervisors',
        exampleFocus: 'Connects shop-floor telemetry to live OEE and spare-parts forecasting.',
      },
    ],
    beforeAfterSteps: [
      {
        stepNumber: 1,
        title: 'Equipment Health Monitoring',
        beforeAction: 'Technicians replace bearings on fixed calendar schedules—or after breakdown.',
        beforePainPoint: 'Unplanned mid-shift line stops cost hours of lost throughput.',
        afterAction: 'Anomaly model tracks motor vibration, temperature, and current draw.',
        afterSystemNote: 'Flags early bearing wear days before catastrophic failure.',
        humanOversightRole: 'Maintenance planner schedules repair during planned changeover.',
      },
      {
        stepNumber: 2,
        title: 'Visual Surface Inspection',
        beforeAction: 'Human inspectors visually check hundreds of parts per hour under bright lamps.',
        beforePainPoint: 'Eye fatigue causes inconsistent defect catch rates late in shifts.',
        afterAction: 'Vision model inspects every part at line speed and marks defect bounding boxes.',
        afterSystemNote: 'Routes borderline scores to human audit bins cleanly.',
        humanOversightRole: 'Quality lead verifies calibration and calibrates confidence thresholds.',
      },
      {
        stepNumber: 3,
        title: 'Scrap & Yield Root-Cause Analysis',
        beforeAction: 'Engineers pull CSVs manually from three shift logs to guess why scrap rose.',
        beforePainPoint: 'Process drift persists across shifts before correlations emerge.',
        afterAction: 'ML correlates humidity, oven temperature, and line speed against defect spikes.',
        afterSystemNote: 'Ranks top process parameters drifting outside ideal window.',
        humanOversightRole: 'Process engineer tunes machine setpoints safely.',
      },
      {
        stepNumber: 4,
        title: 'Maintenance Manual & Spare Parts Lookup',
        beforeAction: 'Technicians flip through thick binders when rare PLC fault codes appear.',
        beforePainPoint: 'Long troubleshooting hunts prolong line downtime.',
        afterAction: 'RAG assistant retrieves exact fault-code repair steps & torque specs.',
        afterSystemNote: 'Cites machine manual page numbers and checks spare stock.',
        humanOversightRole: 'Certified technician performs lockout-tagout and repairs safely.',
      },
    ],
    responsibilities: [
      {
        id: 'mfg-pred-maint',
        title: 'Predictive Equipment Maintenance',
        summary: 'Detect subtle vibration or thermal drift before motors fail mid-run.',
        currentManualProcess:
          'Teams follow rigid calendar intervals regardless of actual machine wear.',
        howAiAssists:
          'Time-series anomaly detection flags abnormal frequency signatures days ahead.',
        aiTechnologies: ['Machine Learning', 'Predictive Analytics', 'Statistics'],
        toolsUsed: ['Python', 'Sensor Telemetry Dashboards', 'Alert Pipelines'],
        workflow: {
          input: 'Vibration RMS, spindle temp, amperage logs',
          aiProcessing: 'Rolling baseline normalization',
          mlOrAutomation: 'Health degradation scoring',
          output: 'Early warning alert with estimated days-to-service',
          humanReview: 'Reliability engineer schedules inspection & orders spare bearings',
        },
        expectedBenefits: [
          'Reduces surprise mid-shift line shutdowns',
          'Extends healthy component life safely',
        ],
        skillsRequired: ['Sensor data analysis', 'Anomaly detection', 'Statistics'],
      },
      {
        id: 'mfg-vision-qa',
        title: 'Automated Surface & Assembly Inspection',
        summary: 'Catch scratches, misalignments, and missing fasteners consistently.',
        currentManualProcess:
          'Inspectors sample batches manually at the end of production lines.',
        howAiAssists:
          'Computer Vision scores every unit in real time and flags marginal parts for review.',
        aiTechnologies: ['Computer Vision', 'Deep Learning', 'Model Evaluation'],
        toolsUsed: ['Vision Detectors', 'Confidence Threshold Tuners'],
        workflow: {
          input: 'High-resolution assembly camera frames',
          aiProcessing: 'Image normalization & feature extraction',
          mlOrAutomation: 'Defect bounding-box classification',
          output: 'Pass / Flagged Rework routing signal + visual overlay',
          humanReview: 'QA supervisor audits flagged rejects to tune threshold balance',
        },
        expectedBenefits: [
          'Consistent 100% unit screening across shifts',
          'Feeds defect images back to trace upstream tooling wear',
        ],
        skillsRequired: ['Computer Vision concepts', 'Precision vs. Recall calibration'],
      },
      {
        id: 'mfg-yield',
        title: 'Production Yield & Scrap Optimization',
        summary: 'Pinpoint which machine settings explain elevated scrap rates.',
        currentManualProcess:
          'Shift leads review summary scrap counts without correlating ambient parameters.',
        howAiAssists:
          'Regression feature importance highlights subtle temperature or pressure interactions.',
        aiTechnologies: ['Machine Learning', 'Data Analysis', 'Data Visualization'],
        toolsUsed: ['Python', 'Feature Importance Charts', 'SQL'],
        workflow: {
          input: 'Line speed, pressure, material lot, defect counts',
          aiProcessing: 'Multi-variable feature correlation',
          mlOrAutomation: 'Yield driver ranking model',
          output: 'Optimal parameter window recommendation',
          humanReview: 'Process engineer validates adjustments on controlled trial lot',
        },
        expectedBenefits: [
          'Lowers material waste and rework hours',
          'Uncovers hidden vendor raw-material batch differences',
        ],
        skillsRequired: ['Regression modeling', 'Data Analysis', 'Six Sigma integration'],
      },
      {
        id: 'mfg-spares',
        title: 'Spare Parts & Material Forecasting',
        summary: 'Forecast consumables and critical spares aligned to production schedules.',
        currentManualProcess:
          'Storerooms over-hold expensive spares or wait days for emergency shipments.',
        howAiAssists:
          'Combines machine run-hours with failure risk forecasts to right-size spare stock.',
        aiTechnologies: ['Predictive Analytics', 'AI Automation'],
        toolsUsed: ['Python', 'Inventory Forecast Models'],
        workflow: {
          input: 'Machine runtime hours, BOM usage, vendor lead times',
          aiProcessing: 'Consumption & wear rate projection',
          mlOrAutomation: 'Dynamic reorder point alert',
          output: 'Optimized spare-parts replenishment list',
          humanReview: 'Maintenance supervisor approves critical safety stock',
        },
        expectedBenefits: [
          'Prevents stalled repairs waiting on parts',
          'Reduces obsolete storeroom inventory',
        ],
        skillsRequired: ['Forecasting basics', 'ERP data fluency'],
      },
      {
        id: 'mfg-sop-assistant',
        title: 'Technician Fault-Code & SOP Assistant',
        summary: 'Surface verified repair guides and safety checklists quickly on tablets.',
        currentManualProcess:
          'Technicians walk back to offices to hunt through PDF equipment manuals.',
        howAiAssists:
          'RAG search pulls exact repair steps and lockout reminders per machine model.',
        aiTechnologies: ['Large Language Models', 'Natural Language Processing'],
        toolsUsed: ['RAG Search', 'PDF Manual Indexing'],
        workflow: {
          input: 'Error code or symptom query + OEM manuals',
          aiProcessing: 'Semantic chunk retrieval',
          mlOrAutomation: 'Step-by-step repair checklist with page citations',
          output: 'Grounded repair brief + safety precautions',
          humanReview: 'Certified technician executes physical checks safely',
        },
        expectedBenefits: [
          'Cuts mean time to repair on unfamiliar equipment faults',
          'Standardizes safety checklist adherence across shifts',
        ],
        skillsRequired: ['RAG workflows', 'Technical documentation hygiene'],
      },
      {
        id: 'mfg-oee-reporting',
        title: 'Shift Handover & OEE Reporting',
        summary: 'Summarize availability, performance, and quality loss across shifts cleanly.',
        currentManualProcess:
          'Supervisors spend 45 minutes compiling shift handover logs manually.',
        howAiAssists:
          'Automated data pipelines compute OEE loss buckets and draft crisp shift handovers.',
        aiTechnologies: ['Data Visualization', 'SQL', 'Large Language Models'],
        toolsUsed: ['SQL', 'OEE Dashboards'],
        workflow: {
          input: 'Downtime reason codes, cycle times, good/scrap counts',
          aiProcessing: 'Automated OEE decomposition',
          mlOrAutomation: 'Shift summary brief generation',
          output: 'Live OEE cockpit & top-3 downtime focus items',
          humanReview: 'Incoming shift lead reviews machine notes with outgoing lead',
        },
        expectedBenefits: [
          'Eliminates manual shift tally sheets',
          'Focuses morning standups on highest-impact bottlenecks',
        ],
        skillsRequired: ['SQL', 'Data Visualization', 'Manufacturing KPIs'],
      },
    ],
  },
  {
    id: 'retail-ecommerce',
    title: 'Retail & E-commerce',
    shortTitle: 'Retail & E-commerce',
    sectorTag: 'Merchandising · Pricing · CX',
    shortDescription:
      'Personalize product discovery, balance dynamic markdowns, forecast regional demand, and summarize buyer reviews at scale.',
    iconKey: 'ShoppingBag',
    accentColor: 'blue',
    dailyWorkflowExampleTitle: 'Omnichannel Demand Planning & Customer Segmentation',
    humanOversightStatement:
      'Merchandisers and category managers govern brand pricing floor rules, vendor relationships, and seasonal assortment curation.',
    recommendedProjects: ['inventory-forecasting', 'marketing-intelligence', 'customer-support-agent'],
    existingStrengths: [
      'Category merchandising, margins & assortment mix',
      'Seasonal promotions, markdowns & basket economics',
      'Omnichannel storefront conversion optimization',
      'Customer return reduction & sizing insights',
    ],
    newAiSkills: [
      'Basket affinity & recommendation modeling',
      'Price elasticity & promotion lift analytics',
      'NLP review mining for fit/quality defects',
      'Regional SKU demand forecasting',
    ],
    skillGapData: [
      { skillArea: 'Merchandising & Margin', currentBaseline: 90, targetAiReady: 95 },
      { skillArea: 'SQL & Transaction Data', currentBaseline: 40, targetAiReady: 84 },
      { skillArea: 'Demand & Price Modeling', currentBaseline: 20, targetAiReady: 80 },
      { skillArea: 'NLP Review & Search AI', currentBaseline: 20, targetAiReady: 78 },
      { skillArea: 'Segmentation & LTV ML', currentBaseline: 30, targetAiReady: 82 },
    ],
    possiblePathways: [
      {
        roleTitle: 'AI Merchandising & Pricing Analytics Manager',
        transitionFit: 'Direct progression for retail buyers & planners',
        exampleFocus: 'Optimizes seasonal buys, store allocations, and clearance curves.',
      },
      {
        roleTitle: 'E-Commerce Personalization & Search Strategist',
        transitionFit: 'Ideal for digital storefront & UX leads',
        exampleFocus: 'Improves semantic product search and basket recommendations.',
      },
      {
        roleTitle: 'Retail Customer Intelligence Lead',
        transitionFit: 'Strong move for loyalty & CRM managers',
        exampleFocus: 'Connects cohort churn prevention with VIP retention plays.',
      },
    ],
    beforeAfterSteps: [
      {
        stepNumber: 1,
        title: 'Storefront Search & Discovery',
        beforeAction: 'Shopper searching "breathable running tee" gets 0 hits if title says "mesh jersey".',
        beforePainPoint: 'Rigid keyword matching causes silent search abandonment.',
        afterAction: 'Semantic embeddings match shopper intent to synonyms and attributes.',
        afterSystemNote: 'Ranks relevant items factoring stock availability.',
        humanOversightRole: 'Merchandiser curates seasonal hero collections.',
      },
      {
        stepNumber: 2,
        title: 'Regional Inventory Allocation',
        beforeAction: 'Planner splits stock evenly across stores without local climate signals.',
        beforePainPoint: 'Coats pile up in warm regions while northern stores sell out.',
        afterAction: 'Forecasting models allocate inventory using store-level demand curves.',
        afterSystemNote: 'Balances store velocity and transfer costs.',
        humanOversightRole: 'Allocation lead approves flagship launch reserves.',
      },
      {
        stepNumber: 3,
        title: 'Product Return & Review Insights',
        beforeAction: 'Buyers realize a shoe runs small only after return costs surge.',
        beforePainPoint: 'Manual review reading misses early defect trends across 1,000 SKUs.',
        afterAction: 'NLP monitors return notes and flags "tight toe box" or zipper defects fast.',
        afterSystemNote: 'Alerts buyers after first 15 negative pattern matches.',
        humanOversightRole: 'QA & sizing team updates size guide or contacts supplier.',
      },
      {
        stepNumber: 4,
        title: 'Promotion & Markdown Timing',
        beforeAction: 'Storewide 30% discounts erode margin on full-price bestsellers.',
        beforePainPoint: 'Blanket markdowns train shoppers to wait for sales.',
        afterAction: 'Elasticity models target discounts toward slow-moving tail inventory.',
        afterSystemNote: 'Estimates margin preservation vs. sell-through speed.',
        humanOversightRole: 'Category director sets minimum margin guardrails.',
      },
    ],
    responsibilities: [
      {
        id: 'ret-forecast',
        title: 'Regional & Seasonal Demand Forecasting',
        summary: 'Allocate the right quantities per store and fulfillment hub.',
        currentManualProcess:
          'Planners copy last year’s store proportions manually into spreadsheets.',
        howAiAssists:
          'Models weigh recent velocity, weather shifts, and promotional calendars per region.',
        aiTechnologies: ['Predictive Analytics', 'Machine Learning', 'Data Visualization'],
        toolsUsed: ['Python', 'Store Allocation Models', 'Recharts'],
        workflow: {
          input: 'Store POS sales, promo flags, regional weather',
          aiProcessing: 'Store cluster seasonality adjustment',
          mlOrAutomation: 'SKU-store weekly demand forecast',
          output: 'Automated transfer & replenishment plan',
          humanReview: 'Merchandising planner adjusts for local store events',
        },
        expectedBenefits: [
          'Cuts regional stockouts and end-of-season clearance losses',
          'Improves inventory turn velocity',
        ],
        skillsRequired: ['Demand forecasting', 'SQL', 'Retail KPI modeling'],
      },
      {
        id: 'ret-reviews',
        title: 'Review & Return Reason Mining',
        summary: 'Detect sizing, fabric, or packaging issues immediately from customer text.',
        currentManualProcess:
          'Category managers check star ratings without reading thousands of comments.',
        howAiAssists:
          'NLP extracts specific product aspects ("sizing", "stitching", "shipping") and sentiment trends.',
        aiTechnologies: ['Natural Language Processing', 'Data Analysis'],
        toolsUsed: ['Python', 'Aspect Sentiment Analyzers'],
        workflow: {
          input: 'Product reviews & return reason free-text',
          aiProcessing: 'Aspect keyword extraction + polarity scoring',
          mlOrAutomation: 'Early quality/sizing alert clustering',
          output: 'SKU issue scorecard for buyers & UX pages',
          humanReview: 'Buyer pauses defective lots or updates PDP size charts',
        },
        expectedBenefits: [
          'Lowers costly return shipping rates',
          'Protects SKU star ratings early',
        ],
        skillsRequired: ['NLP preprocessing', 'Sentiment analysis'],
      },
      {
        id: 'ret-recommend',
        title: 'Personalized Product & Bundle Recommendations',
        summary: 'Surface complementary accessories and style matches tailored to shoppers.',
        currentManualProcess:
          'Merchandisers hand-curate 3 static "related items" per top SKU.',
        howAiAssists:
          'Collaborative filtering and embeddings learn real co-purchase patterns dynamically.',
        aiTechnologies: ['Machine Learning', 'Natural Language Processing'],
        toolsUsed: ['Embedding Similarity', 'Basket Analysis'],
        workflow: {
          input: 'Cart contents, browsing sequence, catalog attributes',
          aiProcessing: 'Co-purchase & vector similarity scoring',
          mlOrAutomation: 'Real-time bundle & alternative ranking',
          output: 'In-stock complementary item suggestions',
          humanReview: 'Merchandiser enforces brand compatibility rules',
        },
        expectedBenefits: [
          'Lifts average order value organically',
          'Helps shoppers discover out-of-stock alternatives',
        ],
        skillsRequired: ['Similarity search', 'A/B uplift measurement'],
      },
      {
        id: 'ret-pricing',
        title: 'Markdown & Promotion Elasticity Modeling',
        summary: 'Discount only sluggish SKUs instead of slashing margin across entire categories.',
        currentManualProcess:
          'Uniform end-of-season markdown tiers clear goods too cheaply.',
        howAiAssists:
          'Price-sensitivity estimates predict sell-through uplift at 10%, 20%, or 30% off.',
        aiTechnologies: ['Statistics', 'Predictive Analytics'],
        toolsUsed: ['Python', 'Elasticity Curves'],
        workflow: {
          input: 'Weeks of stock on hand, price history, sell-through speed',
          aiProcessing: 'Price elasticity estimation',
          mlOrAutomation: 'Optimal markdown cadence simulation',
          output: 'SKU markdown ladder maximizing gross margin',
          humanReview: 'Pricing lead enforces MAP policies and brand floors',
        },
        expectedBenefits: [
          'Protects gross margin dollars during clearance',
          'Clears seasonal shelf space cleanly',
        ],
        skillsRequired: ['Statistics', 'Regression intuition', 'Margin analysis'],
      },
      {
        id: 'ret-catalog',
        title: 'Catalog Tagging & Product Copy Standardization',
        summary: 'Extract structured attributes (collar, fabric, fit) from supplier sheets fast.',
        currentManualProcess:
          'Content teams manually retype messy vendor spreadsheet specs for every launch.',
        howAiAssists:
          'Vision + LLMs normalize attributes and draft structured PDP bullet points.',
        aiTechnologies: ['Generative AI', 'Computer Vision', 'AI Automation'],
        toolsUsed: ['Multimodal Prompts', 'Catalog Validation Rules'],
        workflow: {
          input: 'Vendor CSV + product packshot images',
          aiProcessing: 'Attribute extraction & taxonomy mapping',
          mlOrAutomation: 'Draft standardized product descriptions',
          output: 'Clean filter-ready catalog entry',
          humanReview: 'Catalog editor approves material claims and photography',
        },
        expectedBenefits: [
          'Launches seasonal assortments days faster',
          'Makes faceted search filters consistently accurate',
        ],
        skillsRequired: ['Taxonomy engineering', 'Prompt engineering'],
      },
      {
        id: 'ret-support',
        title: 'Order Tracking & Return Policy Assistant',
        summary: 'Resolve WISMO ("Where is my order?") and exchange queries instantaneously.',
        currentManualProcess:
          'Support teams manually look up courier links and copy-paste return windows.',
        howAiAssists:
          'Support agent integrates order lookups with intent + sentiment escalation.',
        aiTechnologies: ['Natural Language Processing', 'Large Language Models', 'AI Automation'],
        toolsUsed: ['Support Agents', 'Order API Connectors'],
        workflow: {
          input: 'Customer order message + tracking state',
          aiProcessing: 'Intent & frustration sentiment detection',
          mlOrAutomation: 'Verified status reply or damage escalation',
          output: 'Instant tracking update or exchange label link',
          humanReview: 'Agent steps in for lost parcels or VIP goodwill credits',
        },
        expectedBenefits: [
          'Handles peak holiday ticket surges smoothly',
          'Keeps empathetic human agents focused on complex escalations',
        ],
        skillsRequired: ['NLP routing', 'RAG policy grounding'],
      },
    ],
  },
  {
    id: 'project-management',
    title: 'Project Management',
    shortTitle: 'Project Management',
    sectorTag: 'Delivery · Risk · PMO',
    shortDescription:
      'Predict timeline slippage early, synthesize stakeholder updates cleanly, and spot cross-team dependency bottlenecks.',
    iconKey: 'Kanban',
    accentColor: 'purple',
    dailyWorkflowExampleTitle: 'Sprint Slippage Forecasting & Risk Register Triage',
    humanOversightStatement:
      'Project managers lead stakeholder alignment, trade-off negotiations, and team morale; AI handles status aggregation and schedule risk signals.',
    recommendedProjects: ['business-intelligence', 'document-intelligence', 'code-assistant'],
    existingStrengths: [
      'Agile/Waterfall planning, critical path & dependencies',
      'Risk mitigation, scope control & budget governance',
      'Cross-functional facilitation & executive communication',
      'Vendor milestone management & change control',
    ],
    newAiSkills: [
      'Schedule slippage & velocity predictive modeling',
      'Automated meeting transcript -> RAID log extraction',
      'Scope & specification gap auditing with LLMs',
      'Resource capacity & bottleneck visualization',
    ],
    skillGapData: [
      { skillArea: 'Delivery & Stakeholder Leadership', currentBaseline: 92, targetAiReady: 96 },
      { skillArea: 'Project Data & Metrics', currentBaseline: 50, targetAiReady: 86 },
      { skillArea: 'Schedule Risk Prediction', currentBaseline: 20, targetAiReady: 78 },
      { skillArea: 'GenAI PMO Workflows', currentBaseline: 35, targetAiReady: 88 },
      { skillArea: 'AI Program Governance', currentBaseline: 30, targetAiReady: 84 },
    ],
    possiblePathways: [
      {
        roleTitle: 'AI Program & Transformation Manager',
        transitionFit: 'High-demand progression for senior PMs & Scrum Masters',
        exampleFocus: 'Leads cross-functional AI product delivery, data readiness, and rollout.',
      },
      {
        roleTitle: 'PMO Intelligence & Delivery Analytics Lead',
        transitionFit: 'Ideal for portfolio & governance specialists',
        exampleFocus: 'Builds predictive delivery health cockpits across enterprise initiatives.',
      },
      {
        roleTitle: 'AI Product Operations Manager',
        transitionFit: 'Strong lateral move into tech & SaaS companies',
        exampleFocus: 'Coordinates evaluation cycles, release readiness, and stakeholder comms.',
      },
    ],
    beforeAfterSteps: [
      {
        stepNumber: 1,
        title: 'Meeting Notes -> Action Items',
        beforeAction: 'PM spends 45 minutes after steering calls typing RAID logs and emails.',
        beforePainPoint: 'Details slip or updates go out a day late.',
        afterAction: 'LLM extracts owners, due dates, risks, and decisions cleanly.',
        afterSystemNote: 'Maps actions directly to Jira/Asana ticket fields.',
        humanOversightRole: 'PM verifies owner commitments and tone before sending.',
      },
      {
        stepNumber: 2,
        title: 'Milestone Slippage Early Warning',
        beforeAction: 'Teams report "Green" status until a dependency misses its deadline.',
        beforePainPoint: 'Watermelon reporting hides creeping scope and blocked tickets.',
        afterAction: 'Predictive analytics tracks carryover rate, PR wait times, and churn.',
        afterSystemNote: 'Flags Amber/Red delivery probability 2 sprints early.',
        humanOversightRole: 'PM facilitates scope cut or resource pairing with tech leads.',
      },
      {
        stepNumber: 3,
        title: 'Executive Status Consolidation',
        beforeAction: 'PMO chases 8 squad leads every Thursday to copy-paste slide bullets.',
        beforePainPoint: 'Reporting consumes half of Friday without adding delivery insight.',
        afterAction: 'BI pipeline aggregates velocity, burnup, and blockers automatically.',
        afterSystemNote: 'Drafts crisp executive summary highlighting key decisions needed.',
        humanOversightRole: 'PM frames strategic context and executive asks personally.',
      },
      {
        stepNumber: 4,
        title: 'Contract & SOW Requirement Audit',
        beforeAction: 'PM reads 40-page vendor SOWs manually looking for hidden deliverables.',
        beforePainPoint: 'Ambiguous acceptance criteria cause mid-project scope disputes.',
        afterAction: 'Document AI extracts deliverables, dates, and missing acceptance clauses.',
        afterSystemNote: 'Generates clean milestone checklist ready for kickoff.',
        humanOversightRole: 'PM negotiates clear boundaries with client and legal.',
      },
    ],
    responsibilities: [
      {
        id: 'pm-slippage',
        title: 'Schedule Slippage & Velocity Forecasting',
        summary: 'Predict milestone completion dates probabilistically instead of static guesses.',
        currentManualProcess:
          'PMs rely on optimistic fixed estimates without accounting for historical carryover.',
        howAiAssists:
          'Monte Carlo and velocity regression estimate P50/P85 delivery dates cleanly.',
        aiTechnologies: ['Predictive Analytics', 'Statistics', 'Data Visualization'],
        toolsUsed: ['Python', 'Jira Metrics', 'Burnup Charts'],
        workflow: {
          input: 'Sprint velocity history, scope creep rate, open blocker count',
          aiProcessing: 'Cycle-time distribution modeling',
          mlOrAutomation: 'Delivery date confidence band forecasting',
          output: 'Milestone risk probability & critical-path alerts',
          humanReview: 'PM negotiates scope priorities with product & engineering',
        },
        expectedBenefits: [
          'Replaces surprise deadline misses with early trade-off options',
          'Builds executive trust through calibrated date ranges',
        ],
        skillsRequired: ['Statistics basics', 'Delivery analytics', 'Risk communication'],
      },
      {
        id: 'pm-raid',
        title: 'Automated RAID Log & Action Extraction',
        summary: 'Turn workshop transcripts into structured Risks, Assumptions, Issues & Decisions.',
        currentManualProcess:
          'PMs juggle facilitating calls while frantically typing messy meeting notes.',
        howAiAssists:
          'NLP summarizes decisions, assigns owners, and highlights unresolved dependencies.',
        aiTechnologies: ['Large Language Models', 'Natural Language Processing', 'AI Automation'],
        toolsUsed: ['Structured Extraction Prompts', 'PM Issue Trackers'],
        workflow: {
          input: 'Meeting notes or call summary',
          aiProcessing: 'Action-item, owner, and risk classification',
          mlOrAutomation: 'Structured RAID table generation',
          output: 'Ready-to-review recap & blocker list',
          humanReview: 'PM confirms owner agreement and sensitive wording',
        },
        expectedBenefits: [
          'Lets PMs stay 100% present during complex negotiations',
          'Maintains consistent audit trails across multi-month programs',
        ],
        skillsRequired: ['Prompt structuring', 'Workflow automation'],
      },
      {
        id: 'pm-sow',
        title: 'SOW & Requirements Completeness Review',
        summary: 'Flag ambiguous acceptance criteria and conflicting timelines before kickoff.',
        currentManualProcess:
          'Teams discover missing dependencies mid-build inside lengthy PDFs.',
        howAiAssists:
          'Document AI extracts every obligation, date, and sign-off dependency into a table.',
        aiTechnologies: ['Natural Language Processing', 'Generative AI'],
        toolsUsed: ['Document Intelligence', 'Checklist Generators'],
        workflow: {
          input: 'SOW PDF, RFP requirements, project charter',
          aiProcessing: 'Clause extraction & ambiguity check',
          mlOrAutomation: 'Milestone & gap checklist synthesis',
          output: 'Structured deliverable matrix + clarification questions',
          humanReview: 'PM & legal validate terms prior to contract signature',
        },
        expectedBenefits: [
          'Prevents costly unpriced scope creep',
          'Speeds up project kickoff preparation',
        ],
        skillsRequired: ['Document parsing', 'Requirements engineering'],
      },
      {
        id: 'pm-resource',
        title: 'Workload & Dependency Bottleneck Analysis',
        summary: 'Spot shared specialists overloaded across multiple concurrent streams.',
        currentManualProcess:
          'Managers check static allocation percentages without seeing ticket wait queues.',
        howAiAssists:
          'Analyzes cross-board ticket handoffs to spot bottleneck reviewers or teams.',
        aiTechnologies: ['Data Analysis', 'Data Visualization', 'SQL'],
        toolsUsed: ['Python', 'Dependency Graphs', 'BI Dashboards'],
        workflow: {
          input: 'Cross-team ticket handoffs, PR wait times, capacity rosters',
          aiProcessing: 'Queue wait-time aggregation',
          mlOrAutomation: 'Bottleneck node detection',
          output: 'Resource contention heatmap across streams',
          humanReview: 'PM re-sequences milestones or cross-trains backups',
        },
        expectedBenefits: [
          'Uncovers invisible handoff bottlenecks slowing delivery',
          'Protects key specialists from silent burnout',
        ],
        skillsRequired: ['Data Analysis', 'Flow metrics', 'SQL'],
      },
      {
        id: 'pm-comms',
        title: 'Tailored Stakeholder Executive Reporting',
        summary: 'Translate technical ticket progress into clear business-outcome updates.',
        currentManualProcess:
          'PMs rewrite identical milestone data into three formats for different audiences.',
        howAiAssists:
          'Summarizes verified metrics at executive, client, and engineering detail levels.',
        aiTechnologies: ['Large Language Models', 'Data Visualization'],
        toolsUsed: ['BI Feeds', 'Executive Brief Prompts'],
        workflow: {
          input: 'Verified sprint metrics, milestone status, key risks',
          aiProcessing: 'Audience-level abstraction',
          mlOrAutomation: 'Executive brief drafting grounded strictly in KPI input',
          output: 'Board-ready progress & decision summary',
          humanReview: 'PM verifies numbers and owns stakeholder dialogue',
        },
        expectedBenefits: [
          'Cuts weekly status deck assembly drastically',
          'Keeps leadership focused on key decisions needed',
        ],
        skillsRequired: ['Data storytelling', 'Grounded prompting'],
      },
      {
        id: 'pm-retro',
        title: 'Retrospective Theme Clustering & Continuous Improvement',
        summary: 'Track recurring delivery friction across multiple quarters objectively.',
        currentManualProcess:
          'Retro boards get archived after each sprint with recurring themes forgotten.',
        howAiAssists:
          'NLP clusters retro feedback over 6 months to prove systemic pain points.',
        aiTechnologies: ['Natural Language Processing', 'Data Analysis'],
        toolsUsed: ['Topic Clustering', 'Sentiment Trends'],
        workflow: {
          input: 'Retrospective sticky notes across squads',
          aiProcessing: 'Semantic grouping & trend counting',
          mlOrAutomation: 'Recurring systemic blocker report',
          output: 'Quarterly improvement business case',
          humanReview: 'PMO & engineering leads fund tooling or process fixes',
        },
        expectedBenefits: [
          'Turns team feedback into quantifiable leadership action',
          'Tracks whether process changes actually reduced friction',
        ],
        skillsRequired: ['NLP clustering', 'Trend analysis'],
      },
    ],
  },
  {
    id: 'customer-support',
    title: 'Customer Support & Customer Success',
    shortTitle: 'Customer Support & CX',
    sectorTag: 'Support · Retention · Triage',
    shortDescription:
      'Automate intent routing, detect distressed accounts early, draft grounded replies, and spot churn signals proactively.',
    iconKey: 'Headset',
    accentColor: 'cyan',
    dailyWorkflowExampleTitle: 'Intelligent Ticket Triage & Empathetic Escalation',
    humanOversightStatement:
      'AI resolves routine lookups and detects urgency; human agents handle sensitive disputes, refunds, and relationship trust.',
    recommendedProjects: ['customer-support-agent', 'document-intelligence', 'business-intelligence'],
    existingStrengths: [
      'Customer empathy, de-escalation & communication clarity',
      'Product troubleshooting & SLA queue prioritization',
      'Account onboarding, QBRs & renewal risk spotting',
      'Knowledge base curation & bug reproduction',
    ],
    newAiSkills: [
      'Intent classification & sentiment urgency detection',
      'RAG help-center assistant grounding & citation',
      'Customer health & churn propensity modeling',
      'Escalation guardrails & QA conversation analytics',
    ],
    skillGapData: [
      { skillArea: 'Customer Empathy & CX', currentBaseline: 94, targetAiReady: 96 },
      { skillArea: 'Support Data & SLA SQL', currentBaseline: 40, targetAiReady: 82 },
      { skillArea: 'NLP Intent & Sentiment', currentBaseline: 20, targetAiReady: 84 },
      { skillArea: 'RAG Knowledge Systems', currentBaseline: 20, targetAiReady: 85 },
      { skillArea: 'Churn & Health Modeling', currentBaseline: 25, targetAiReady: 80 },
    ],
    possiblePathways: [
      {
        roleTitle: 'AI Support Operations & Automation Lead',
        transitionFit: 'Natural step-up for Tier-2/3 leads & team managers',
        exampleFocus: 'Tunes intent routing, escalation thresholds, and knowledge coverage.',
      },
      {
        roleTitle: 'Data-Driven Customer Success Manager',
        transitionFit: 'Strong progression for CSMs & account managers',
        exampleFocus: 'Uses product health scores and sentiment signals to drive renewals.',
      },
      {
        roleTitle: 'Conversational AI & Knowledge Architect',
        transitionFit: 'Creative career pivot for technical writers & CX leads',
        exampleFocus: 'Curates high-accuracy RAG help docs and tests support bot safety.',
      },
    ],
    beforeAfterSteps: [
      {
        stepNumber: 1,
        title: 'Incoming Ticket Classification',
        beforeAction: 'Agents manually open every email in FIFO order regardless of urgency.',
        beforePainPoint: 'Billing outage tickets sit behind routine password resets.',
        afterAction: 'NLP classifies intent, product area, and frustration sentiment on arrival.',
        afterSystemNote: 'Routes urgent billing/outage tickets straight to priority queue.',
        humanOversightRole: 'Senior specialist handles priority escalations immediately.',
      },
      {
        stepNumber: 2,
        title: 'Knowledge Lookup & Draft Reply',
        beforeAction: 'Agent opens 5 browser tabs searching old help docs to assemble an answer.',
        beforePainPoint: 'Average handle time climbs and answers vary across agents.',
        afterAction: 'RAG drafts a concise, policy-cited reply anchored in current docs.',
        afterSystemNote: 'Includes links to exact troubleshooting steps.',
        humanOversightRole: 'Agent personalizes opening empathy and verifies account specifics.',
      },
      {
        stepNumber: 3,
        title: 'Proactive Escalation Detection',
        beforeAction: 'Churn risk surfaces only when a furious customer demands cancellation.',
        beforePainPoint: 'Managers miss subtle repeat-ticket frustration across weeks.',
        afterAction: 'Conversation analytics tracks repeat contacts and declining CSAT.',
        afterSystemNote: 'Alerts CSMs before renewal conversations derail.',
        humanOversightRole: 'CSM leads executive recovery outreach personally.',
      },
      {
        stepNumber: 4,
        title: 'Ticket Root-Cause Feedback to Product',
        beforeAction: 'Support tags 40% of tickets loosely as "General Inquiry".',
        beforePainPoint: 'Product teams underestimate recurring UX bugs.',
        afterAction: 'AI clusters exact friction themes with revenue impact counts.',
        afterSystemNote: 'Surfaces top 5 self-serve doc gaps weekly.',
        humanOversightRole: 'CX lead prioritizes roadmap fixes with product managers.',
      },
    ],
    responsibilities: [
      {
        id: 'cx-triage',
        title: 'Ticket Intent Routing & Priority Scoring',
        summary: 'Classify topic, urgency, and language automatically at ticket intake.',
        currentManualProcess:
          'Shift leads manually read subject lines and drag tickets into team queues.',
        howAiAssists:
          'NLP classifiers detect billing, bug, refund, or enterprise SLA urgency instantly.',
        aiTechnologies: ['Natural Language Processing', 'Machine Learning'],
        toolsUsed: ['Intent Classifiers', 'Helpdesk Routing Rules'],
        workflow: {
          input: 'Inbound chat/email text + account tier',
          aiProcessing: 'Tokenization, intent & sentiment scoring',
          mlOrAutomation: 'Queue & priority SLA assignment',
          output: 'Tagged ticket routed to best-fit specialist',
          humanReview: 'Queue lead overrides edge cases and coaches model tags',
        },
        expectedBenefits: [
          'Cuts first-response time dramatically on urgent outages',
          'Reduces misrouted ticket ping-pong between teams',
        ],
        skillsRequired: ['NLP classification', 'Taxonomy design', 'Precision tuning'],
      },
      {
        id: 'cx-copilot',
        title: 'Grounded Agent Reply Assistant (RAG)',
        summary: 'Draft accurate troubleshooting replies citing verified help articles.',
        currentManualProcess:
          'Agents write repetitive explanations from scratch or outdated personal macros.',
        howAiAssists:
          'RAG retrieves current policy clauses and structures a clear draft reply.',
        aiTechnologies: ['Large Language Models', 'Generative AI', 'Natural Language Processing'],
        toolsUsed: ['Vector Help-Center Store', 'Agent Assist UI'],
        workflow: {
          input: 'Customer message + verified knowledge base',
          aiProcessing: 'Semantic article retrieval',
          mlOrAutomation: 'Policy-grounded draft reply synthesis',
          output: 'Editable response draft + cited help links',
          humanReview: 'Human agent edits tone, checks account logs, and hits send',
        },
        expectedBenefits: [
          'Cuts onboarding ramp time for new support reps',
          'Ensures policy consistency across shifts',
        ],
        skillsRequired: ['RAG workflows', 'Knowledge base maintenance'],
      },
      {
        id: 'cx-escalation',
        title: 'Sentiment & Escalation Early Warning',
        summary: 'Catch rising customer frustration across multi-turn conversations.',
        currentManualProcess:
          'Team leads spot upset threads only after negative CSAT surveys arrive.',
        howAiAssists:
          'Real-time sentiment scoring flags negative turns or legal/churn keywords immediately.',
        aiTechnologies: ['Natural Language Processing', 'Predictive Analytics'],
        toolsUsed: ['Sentiment Pipelines', 'Escalation Triggers'],
        workflow: {
          input: 'Live chat turns + repeat-contact counter',
          aiProcessing: 'Polarity shift & escalation phrase detection',
          mlOrAutomation: 'Auto-escalation trigger & manager alert',
          output: 'Priority handoff card with conversation recap',
          humanReview: 'Supervisor steps in empathetically to resolve root issue',
        },
        expectedBenefits: [
          'Turns potential churn escalations into loyalty wins',
          'Supports junior agents before conversations boil over',
        ],
        skillsRequired: ['Sentiment analysis', 'Escalation threshold calibration'],
      },
      {
        id: 'cx-health',
        title: 'Customer Health & Renewal Risk Scoring',
        summary: 'Combine ticket load, product usage, and NPS into proactive CSM plays.',
        currentManualProcess:
          'CSMs manually check 4 dashboards before quarterly business reviews.',
        howAiAssists:
          'Predictive scoring ranks accounts showing silent adoption drop or unresolved bugs.',
        aiTechnologies: ['Predictive Analytics', 'Machine Learning', 'Data Visualization'],
        toolsUsed: ['Python', 'Customer Health Dashboards', 'SQL'],
        workflow: {
          input: 'Usage frequency, open P1 tickets, sentiment average',
          aiProcessing: 'Weighted health & churn risk modeling',
          mlOrAutomation: 'Account health tier classification',
          output: 'Renewal watchlist + recommended success play',
          humanReview: 'CSM schedules executive alignment call and training',
        },
        expectedBenefits: [
          'Prevents surprise last-minute renewal cancellations',
          'Targets CSM coaching toward accounts that need help most',
        ],
        skillsRequired: ['Predictive Analytics', 'SQL', 'Retention KPIs'],
      },
      {
        id: 'cx-kb-gaps',
        title: 'Knowledge Base Gap & Self-Serve Analytics',
        summary: 'Identify which missing help articles drive the highest avoidable ticket volume.',
        currentManualProcess:
          'Docs get updated ad-hoc when agents remember to flag them.',
        howAiAssists:
          'Clusters resolved tickets lacking matching help articles to prioritize doc updates.',
        aiTechnologies: ['Natural Language Processing', 'Data Analysis'],
        toolsUsed: ['Topic Clustering', 'Search Analytics'],
        workflow: {
          input: 'Resolved ticket subjects + zero-result help searches',
          aiProcessing: 'Topic clustering & deflection potential scoring',
          mlOrAutomation: 'Top doc-gap priority ranking',
          output: 'Weekly article outline suggestions',
          humanReview: 'Technical writer publishes verified guide & screenshots',
        },
        expectedBenefits: [
          'Keeps self-service help portals synchronized with product changes',
          'Lowers repetitive "how do I" ticket load naturally',
        ],
        skillsRequired: ['Topic clustering', 'Content operations'],
      },
      {
        id: 'cx-qa',
        title: '100% Conversation QA & Coaching Insights',
        summary: 'Evaluate support quality trends across all tickets instead of 2% random samples.',
        currentManualProcess:
          'QA managers score 4 random tickets per agent per month manually.',
        howAiAssists:
          'Checks policy adherence, greeting clarity, and resolution completeness across threads.',
        aiTechnologies: ['Model Evaluation', 'Natural Language Processing', 'Data Visualization'],
        toolsUsed: ['QA Rubrics', 'Analytics Dashboards'],
        workflow: {
          input: 'Closed conversation transcripts + QA rubric',
          aiProcessing: 'Checklist adherence classification',
          mlOrAutomation: 'Aggregate team coaching trend report',
          output: 'Coaching highlights & calibration samples',
          humanReview: 'Team lead runs supportive 1-on-1 coaching sessions',
        },
        expectedBenefits: [
          'Fairer, data-backed coaching across full ticket volume',
          'Spots systemic onboarding training gaps fast',
        ],
        skillsRequired: ['Evaluation rubrics', 'CX analytics'],
      },
    ],
  },
  {
    id: 'business-management',
    title: 'Business Management',
    shortTitle: 'Business Management',
    sectorTag: 'Strategy · P&L · Executive Ops',
    shortDescription:
      'Turn fragmented department spreadsheets into unified KPI intelligence, scenario forecasts, and strategic decision briefs.',
    iconKey: 'Briefcase',
    accentColor: 'blue',
    dailyWorkflowExampleTitle: 'Cross-Department KPI Intelligence & Scenario Planning',
    humanOversightStatement:
      'Executives and business leaders make strategic trade-offs, capital bets, and organizational commitments; AI illuminates cross-functional patterns.',
    recommendedProjects: ['business-intelligence', 'sales-lead-scoring', 'inventory-forecasting'],
    existingStrengths: [
      'P&L ownership, unit economics & margin strategy',
      'Cross-departmental alignment (Sales, Ops, Finance)',
      'Strategic planning, market positioning & OKRs',
      'Decision-making under uncertainty & risk management',
    ],
    newAiSkills: [
      'Executive BI KPI querying & anomaly diagnosis',
      'Scenario sensitivity & forecasting modeling',
      'AI ROI evaluation & build-vs-buy governance',
      'Cross-functional AI transformation roadmapping',
    ],
    skillGapData: [
      { skillArea: 'Strategy & P&L Leadership', currentBaseline: 94, targetAiReady: 96 },
      { skillArea: 'SQL & Metric Literacy', currentBaseline: 42, targetAiReady: 80 },
      { skillArea: 'Predictive Scenario Modeling', currentBaseline: 25, targetAiReady: 82 },
      { skillArea: 'AI ROI & Feasibility Audit', currentBaseline: 30, targetAiReady: 88 },
      { skillArea: 'Data-Driven Decision Ops', currentBaseline: 48, targetAiReady: 88 },
    ],
    possiblePathways: [
      {
        roleTitle: 'AI Transformation & Strategy Leader',
        transitionFit: 'Ideal executive path for general managers & unit heads',
        exampleFocus: 'Prioritizes high-ROI department AI use cases and governance.',
      },
      {
        roleTitle: 'Chief of Staff / Strategic BI Operations Lead',
        transitionFit: 'Strong progression for operations & strategy managers',
        exampleFocus: 'Connects live revenue, cost, and customer metrics into weekly decisions.',
      },
      {
        roleTitle: 'AI Product & Venture General Manager',
        transitionFit: 'Entrepreneurial path for P&L leaders',
        exampleFocus: 'Launches data-driven services combining domain expertise and ML.',
      },
    ],
    beforeAfterSteps: [
      {
        stepNumber: 1,
        title: 'Weekly Cross-Department KPI Sync',
        beforeAction: 'Managers spend Monday morning reconciling conflicting Excel totals.',
        beforePainPoint: 'Half the leadership meeting debates whose spreadsheet is accurate.',
        afterAction: 'Unified BI layer computes single-source revenue, margin, and churn KPIs.',
        afterSystemNote: 'Highlights significant week-over-week variances automatically.',
        humanOversightRole: 'Leadership team spends meetings solving root causes instead.',
      },
      {
        stepNumber: 2,
        title: 'Ad-Hoc Executive Question Answering',
        beforeAction: 'GM emails analyst "Why did margin dip in Region West?" and waits 2 days.',
        beforePainPoint: 'Decision latency slows corrective pricing or cost actions.',
        afterAction: 'BI Assistant translates plain-English questions into audited data slices.',
        afterSystemNote: 'Shows underlying query logic and breakdown table transparently.',
        humanOversightRole: 'Manager inspects regional drivers with local leads.',
      },
      {
        stepNumber: 3,
        title: 'Quarterly Scenario Planning',
        beforeAction: 'Finance updates 3 static Excel tabs manually whenever assumptions change.',
        beforePainPoint: 'Teams struggle to compare hiring vs. margin scenarios live.',
        afterAction: 'Interactive forecast sliders project revenue & cost impacts in real time.',
        afterSystemNote: 'Displays conservative, base, and upside trend lines.',
        humanOversightRole: 'Executive committee debates strategic appetite and commits budgets.',
      },
      {
        stepNumber: 4,
        title: 'Competitive & Market Signal Synthesis',
        beforeAction: 'Strategy team reads dozens of PDFs manually once per quarter.',
        beforePainPoint: 'Early customer shift signals get buried in long reports.',
        afterAction: 'Document & sentiment AI distills verified customer + market themes.',
        afterSystemNote: 'Links every insight directly back to source data.',
        humanOversightRole: 'Leadership decides positioning and investment bets.',
      },
    ],
    responsibilities: [
      {
        id: 'bm-kpi-bi',
        title: 'Executive KPI & Variance Intelligence',
        summary: 'Monitor revenue, margin, CAC, and retention in one unified decision layer.',
        currentManualProcess:
          'Department heads bring separate static slide decks with mismatched definitions.',
        howAiAssists:
          'Automated SQL pipelines unify KPIs and spotlight unexpected variances automatically.',
        aiTechnologies: ['Data Analysis', 'Data Visualization', 'SQL'],
        toolsUsed: ['BI Executive Suite', 'SQL', 'Anomaly Alerts'],
        workflow: {
          input: 'Sales, finance, support, and ops warehouse tables',
          aiProcessing: 'Metric standardization & variance decomposition',
          mlOrAutomation: 'Automated anomaly & root-cause breakdown',
          output: 'Executive KPI cockpit with clear driver attribution',
          humanReview: 'General manager convenes department leads on outlier drivers',
        },
        expectedBenefits: [
          'Eliminates conflicting spreadsheet numbers in board meetings',
          'Surfaces margin erosion weeks earlier',
        ],
        skillsRequired: ['KPI architecture', 'Data Visualization', 'SQL literacy'],
      },
      {
        id: 'bm-forecast',
        title: 'Revenue, Cost & Scenario Forecasting',
        summary: 'Simulate hiring, pricing, and demand scenarios before committing capital.',
        currentManualProcess:
          'Static annual budgets break as soon as market demand shifts.',
        howAiAssists:
          'Rolling predictive models project cash flow and capacity curves under varied assumptions.',
        aiTechnologies: ['Predictive Analytics', 'Statistics'],
        toolsUsed: ['Python', 'Forecast Charts', 'Scenario Sliders'],
        workflow: {
          input: 'Historical P&L, pipeline velocity, unit costs',
          aiProcessing: 'Driver-based regression & seasonality adjustment',
          mlOrAutomation: 'Multi-scenario quarterly projection',
          output: 'Base / upside / downside revenue & margin curves',
          humanReview: 'Leadership sets risk buffers and hiring pace checkpoints',
        },
        expectedBenefits: [
          'Improves capital allocation agility across quarters',
          'Quantifies downside sensitivity clearly',
        ],
        skillsRequired: ['Statistics', 'Forecast interpretation', 'Unit economics'],
      },
      {
        id: 'bm-ai-roi',
        title: 'AI Use-Case Prioritization & ROI Evaluation',
        summary: 'Distinguish high-value practical ML workflows from hype.',
        currentManualProcess:
          'Teams chase flashy AI tools without measuring baseline hours or error tolerance.',
        howAiAssists:
          'Structured feasibility frameworks score data readiness, cost, and human oversight.',
        aiTechnologies: ['Model Evaluation', 'AI Automation'],
        toolsUsed: ['ROI Calculators', 'Pilot Evaluation Rubrics'],
        workflow: {
          input: 'Department pain points, data availability, error cost',
          aiProcessing: 'Feasibility & value-to-effort matrix scoring',
          mlOrAutomation: 'Prioritized pilot roadmap & success metrics',
          output: 'Executive AI investment portfolio brief',
          humanReview: 'Leadership sponsors measurable 8-week pilot proofs',
        },
        expectedBenefits: [
          'Avoids wasted spend on ungrounded AI experiments',
          'Aligns technical teams directly to measurable business KPIs',
        ],
        skillsRequired: ['AI literacy', 'Model Evaluation criteria', 'Change management'],
      },
      {
        id: 'bm-nl-query',
        title: 'Natural-Language Business Question Answering',
        summary: 'Ask operational questions in plain language and inspect underlying tables.',
        currentManualProcess:
          'Managers wait days in analyst ticket queues for simple regional cuts.',
        howAiAssists:
          'Translates governed metric questions into transparent SQL queries and charts.',
        aiTechnologies: ['Large Language Models', 'SQL', 'Data Visualization'],
        toolsUsed: ['BI Query Copilots', 'Governed Semantic Layers'],
        workflow: {
          input: 'Manager question + governed warehouse schema',
          aiProcessing: 'Schema-grounded SQL generation',
          mlOrAutomation: 'Automated chart + metric brief synthesis',
          output: 'Verified metric table, chart & SQL audit preview',
          humanReview: 'Manager verifies slice filters before executive sharing',
        },
        expectedBenefits: [
          'Frees analysts from routine ad-hoc data pulls',
          'Speeds up daily management decisions safely',
        ],
        skillsRequired: ['Metric governance', 'SQL inspection basics'],
      },
      {
        id: 'bm-doc-brief',
        title: 'Board Deck, Contract & Market Brief Synthesis',
        summary: 'Distill lengthy vendor proposals and customer feedback into clear briefs.',
        currentManualProcess:
          'Managers read dozens of long PDFs late at night before board meetings.',
        howAiAssists:
          'Document intelligence extracts risks, financial terms, and comparative tables.',
        aiTechnologies: ['Natural Language Processing', 'Generative AI'],
        toolsUsed: ['Document Intelligence', 'RAG Summaries'],
        workflow: {
          input: 'Market reports, board memos, customer survey exports',
          aiProcessing: 'Cross-document theme extraction',
          mlOrAutomation: 'Structured comparison brief with citations',
          output: 'Executive one-pager linking back to source pages',
          humanReview: 'Executive verifies nuance and strategic implications',
        },
        expectedBenefits: [
          'Increases breadth of market evidence reviewed safely',
          'Standardizes executive pre-read clarity',
        ],
        skillsRequired: ['RAG comprehension', 'Critical source verification'],
      },
      {
        id: 'bm-risk-ops',
        title: 'Operational Risk & Vendor Compliance Oversight',
        summary: 'Monitor SLA breaches, cost overruns, and policy exceptions proactively.',
        currentManualProcess:
          'Annual manual audits discover contract leakage months too late.',
        howAiAssists:
          'Continuous anomaly checks scan spend, vendor SLAs, and exception rates.',
        aiTechnologies: ['Data Analysis', 'AI Automation'],
        toolsUsed: ['SQL Monitoring', 'Exception Dashboards'],
        workflow: {
          input: 'Vendor invoices, SLA logs, approval records',
          aiProcessing: 'Threshold & pattern deviation scoring',
          mlOrAutomation: 'Automated governance exception alert',
          output: 'Prioritized compliance review queue',
          humanReview: 'Operations & legal leads enforce corrective vendor actions',
        },
        expectedBenefits: [
          'Prevents silent budget leakage across departments',
          'Strengthens audit readiness year-round',
        ],
        skillsRequired: ['Governance analytics', 'Anomaly monitoring'],
      },
    ],
  },
  {
    id: 'data-analytics',
    title: 'Data & Analytics',
    shortTitle: 'Data & Analytics',
    sectorTag: 'BI · SQL · Predictive ML',
    shortDescription:
      'Bridge the gap from descriptive dashboards and SQL reporting to predictive machine learning, NLP, and production evaluation.',
    iconKey: 'BarChart3',
    accentColor: 'purple',
    dailyWorkflowExampleTitle: 'Transitioning from Descriptive BI to Predictive ML Models',
    humanOversightStatement:
      'Data professionals define valid causal hypotheses, prevent data leakage, and interpret business impact responsibly.',
    recommendedProjects: ['business-intelligence', 'sales-lead-scoring', 'inventory-forecasting'],
    existingStrengths: [
      'SQL querying, joins, ETL & data warehouse modeling',
      'Descriptive statistics, A/B testing & cohort analysis',
      'BI dashboards & executive data storytelling',
      'Data quality profiling & metric definitions',
    ],
    newAiSkills: [
      'Supervised & unsupervised ML in Python (scikit-learn)',
      'Time-series forecasting & cross-validation discipline',
      'Text/embedding analytics & LLM evaluation pipelines',
      'Model drift monitoring & feature engineering',
    ],
    skillGapData: [
      { skillArea: 'SQL & BI Storytelling', currentBaseline: 90, targetAiReady: 96 },
      { skillArea: 'Python Data Pipelines', currentBaseline: 55, targetAiReady: 92 },
      { skillArea: 'Applied ML & Forecasting', currentBaseline: 30, targetAiReady: 88 },
      { skillArea: 'NLP & Vector Analytics', currentBaseline: 20, targetAiReady: 80 },
      { skillArea: 'Model Validation & MLOps', currentBaseline: 25, targetAiReady: 86 },
    ],
    possiblePathways: [
      {
        roleTitle: 'Applied Data Scientist',
        transitionFit: 'Classic progression for BI & SQL analysts adding Python + ML',
        exampleFocus: 'Builds predictive churn, pricing, and propensity models end-to-end.',
      },
      {
        roleTitle: 'Analytics Engineer & AI Pipeline Lead',
        transitionFit: 'Ideal for warehouse-focused analysts',
        exampleFocus: 'Ships clean feature tables and automated evaluation datasets.',
      },
      {
        roleTitle: 'Machine Learning Operations & Evaluation Analyst',
        transitionFit: 'Growing niche ensuring models stay calibrated in production',
        exampleFocus: 'Monitors drift, bias metrics, and A/B model lift.',
      },
    ],
    beforeAfterSteps: [
      {
        stepNumber: 1,
        title: 'From Past Summaries to Future Prediction',
        beforeAction: 'Analyst answers "What happened last quarter?" via SQL pivot tables.',
        beforePainPoint: 'Stakeholders still must guess what happens next month.',
        afterAction: 'Analyst pairs SQL feature tables with calibrated ML regression/classification.',
        afterSystemNote: 'Quantifies risk probabilities and confidence bounds cleanly.',
        humanOversightRole: 'Analyst checks for target leakage and validates baseline lift.',
      },
      {
        stepNumber: 2,
        title: 'From Structured Tables to Unstructured Text',
        beforeAction: 'Analyst ignores 50,000 open-text survey comments or tags 200 manually.',
        beforePainPoint: 'Qualitative "why" stays disconnected from quantitative KPIs.',
        afterAction: 'NLP embeddings & sentiment scoring quantify customer themes automatically.',
        afterSystemNote: 'Joins text themes directly into BI churn cohorts.',
        humanOversightRole: 'Analyst audits sample comments to verify cluster meaning.',
      },
      {
        stepNumber: 3,
        title: 'Manual Exploratory Profiling -> Automated QA',
        beforeAction: 'Hours spent writing repetitive null/outlier SQL checks on every new table.',
        beforePainPoint: 'Silent upstream schema changes break weekly dashboards.',
        afterAction: 'Automated anomaly monitors flag distribution drift & missing keys early.',
        afterSystemNote: 'Generates clean data-health profile before modeling runs.',
        humanOversightRole: 'Analyst decides imputation rules with data engineers.',
      },
      {
        stepNumber: 4,
        title: 'Static Reports -> Interactive Decision Simulators',
        beforeAction: 'Stakeholders request 12 follow-up cuts via email after every presentation.',
        beforePainPoint: 'Analyst gets stuck running slight SQL variations all week.',
        afterAction: 'Interactive BI + ML what-if simulators let leaders test levers live.',
        afterSystemNote: 'Grounded in governed metrics with visible assumptions.',
        humanOversightRole: 'Analyst coaches business teams on correlation vs. causation.',
      },
    ],
    responsibilities: [
      {
        id: 'da-predictive',
        title: 'Predictive Modeling (Churn, Lead & Risk)',
        summary: 'Extend SQL feature tables into supervised classification and regression models.',
        currentManualProcess:
          'Analysts build rule-based threshold buckets like "no login in 30 days".',
        howAiAssists:
          'Trains calibrated multi-feature models capturing subtle interaction effects.',
        aiTechnologies: ['Python', 'Machine Learning', 'Model Evaluation'],
        toolsUsed: ['Python', 'Scikit-learn', 'SQL Feature Views'],
        workflow: {
          input: 'Historical customer features + target outcome labels',
          aiProcessing: 'Train/test split, scaling & cross-validation',
          mlOrAutomation: 'Gradient/tree or logistic model fitting',
          output: 'Calibrated probability scores + ROC/PR metrics',
          humanReview: 'Analyst audits feature leakage & threshold business cost',
        },
        expectedBenefits: [
          'Dramatically sharper targeting than static SQL rules',
          'Positions analyst directly at strategic revenue impact',
        ],
        skillsRequired: ['Python', 'Statistics', 'Model Evaluation metrics'],
      },
      {
        id: 'da-forecasting',
        title: 'Time-Series Forecasting & Seasonality',
        summary: 'Forecast weekly revenue, tickets, or inventory beyond simple YoY averages.',
        currentManualProcess:
          'Applying flat +10% YoY multipliers inside finance spreadsheets.',
        howAiAssists:
          'Separates trend, calendar seasonality, and promotional lift quantitatively.',
        aiTechnologies: ['Predictive Analytics', 'Statistics', 'Data Visualization'],
        toolsUsed: ['Python', 'Forecast Models', 'Confidence Bands'],
        workflow: {
          input: 'Clean historical time series + holiday/promo calendar',
          aiProcessing: 'Stationarity & seasonality decomposition',
          mlOrAutomation: 'Backtested multi-horizon forecast',
          output: 'Predicted curve with P10–P90 uncertainty intervals',
          humanReview: 'Analyst explains forecast assumptions to finance & ops',
        },
        expectedBenefits: [
          'Transparent uncertainty intervals rather than false single-point guesses',
          'Proven accuracy via rolling time-series backtesting',
        ],
        skillsRequired: ['Statistics', 'Time-series cross-validation', 'Python'],
      },
      {
        id: 'da-nlp-mix',
        title: 'Unstructured Text & Feedback Quantification',
        summary: 'Integrate support tickets, notes, and reviews into quantitative dashboards.',
        currentManualProcess:
          'Analysts drop free-text columns during ETL because SQL charts need numbers.',
        howAiAssists:
          'Uses embeddings and topic/sentiment scoring to turn text into trackable metrics.',
        aiTechnologies: ['Natural Language Processing', 'Data Analysis'],
        toolsUsed: ['Python', 'Embeddings', 'Sentiment Pipelines'],
        workflow: {
          input: 'Support transcripts, NPS verbatims, sales notes',
          aiProcessing: 'Text cleaning, embedding & cluster assignment',
          mlOrAutomation: 'Theme + sentiment KPI table creation',
          output: 'Quantitative text trends joined to revenue/churn',
          humanReview: 'Analyst reads top cluster examples to validate labeling',
        },
        expectedBenefits: [
          'Unlocks hidden "why" signals already sitting in company warehouses',
          'Bridges qualitative UX and quantitative BI',
        ],
        skillsRequired: ['NLP pipelines', 'Clustering', 'Python'],
      },
      {
        id: 'da-etl-qa',
        title: 'Automated Data Profiling & Anomaly Detection',
        summary: 'Catch broken pipelines and silent schema drift before executives open reports.',
        currentManualProcess:
          'Executives message analysts when dashboard charts look suspiciously flat.',
        howAiAssists:
          'Statistical monitors compare daily distributions against rolling historical baselines.',
        aiTechnologies: ['Statistics', 'AI Automation', 'MLOps'],
        toolsUsed: ['SQL Tests', 'Drift Detectors'],
        workflow: {
          input: 'Daily warehouse table row counts & column distributions',
          aiProcessing: 'Z-score & null-rate baseline comparison',
          mlOrAutomation: 'Automated pipeline anomaly alerting',
          output: 'Data health alert pinning exact upstream column shift',
          humanReview: 'Analyst/engineer fixes ingestion before reports refresh',
        },
        expectedBenefits: [
          'Protects stakeholder trust in enterprise dashboards',
          'Saves hours of reactive pipeline debugging',
        ],
        skillsRequired: ['SQL testing', 'Statistical monitoring'],
      },
      {
        id: 'da-ab-causal',
        title: 'Experimentation & Uplift Analysis',
        summary: 'Design clean A/B tests and detect heterogeneous segment effects.',
        currentManualProcess:
          'Teams peek at p-values early or compare only overall averages.',
        howAiAssists:
          'Automates power calculations, guardrail checks, and segment-level uplift slices.',
        aiTechnologies: ['Statistics', 'Data Visualization', 'Model Evaluation'],
        toolsUsed: ['Python', 'Statistical Testing Frameworks'],
        workflow: {
          input: 'Randomized test/control assignments + outcome metrics',
          aiProcessing: 'Sample-ratio mismatch & variance checks',
          mlOrAutomation: 'Confidence interval & segment uplift computation',
          output: 'Clear ship / iterate / rollback experiment scorecard',
          humanReview: 'Analyst guards against novelty effects & metric gaming',
        },
        expectedBenefits: [
          'Prevents shipping false-positive product changes',
          'Reveals which user segments benefit most',
        ],
        skillsRequired: ['Experimental statistics', 'Python / SQL'],
      },
      {
        id: 'da-bi-copilot',
        title: 'Governed Semantic Layers for Self-Serve BI',
        summary: 'Build clean metric layers so business teams explore data safely.',
        currentManualProcess:
          'Analysts rewrite minor SQL filters repeatedly for every department.',
        howAiAssists:
          'Pairs certified metric definitions with natural-language BI assistants.',
        aiTechnologies: ['SQL', 'Large Language Models', 'Data Visualization'],
        toolsUsed: ['Semantic Layers', 'BI Assistants'],
        workflow: {
          input: 'Business user question + documented metric catalog',
          aiProcessing: 'Metric & dimension resolution',
          mlOrAutomation: 'Verified SQL generation & visualization',
          output: 'Auditable chart + exact SQL query view',
          humanReview: 'Analyst maintains metric catalog & audits complex queries',
        },
        expectedBenefits: [
          'Empowers managers while preserving one definition of revenue/churn',
          'Frees analysts for high-impact modeling projects',
        ],
        skillsRequired: ['Data modeling', 'SQL', 'Metric governance'],
      },
    ],
  },
  {
    id: 'other-backgrounds',
    title: 'Other Professional Backgrounds',
    shortTitle: 'Other Backgrounds',
    sectorTag: 'Legal · Media · Consulting · Cross-Domain',
    shortDescription:
      'Discover how transferable domain judgment from legal, consulting, media, real estate, or public sector pairs with practical AI skills.',
    iconKey: 'Compass',
    accentColor: 'cyan',
    dailyWorkflowExampleTitle: 'Research Synthesis, Document Review & Workflow Automation',
    humanOversightStatement:
      'Every profession relies on human judgment, accountability, and ethics; AI acts as a structured research and workflow accelerator.',
    recommendedProjects: ['document-intelligence', 'customer-support-agent', 'business-intelligence'],
    existingStrengths: [
      'Deep domain context & real-world problem framing',
      'Client communication, research & structured writing',
      'Compliance, ethics & stakeholder coordination',
      'Process improvement intuition from daily operations',
    ],
    newAiSkills: [
      'Structured data literacy & SQL/Python essentials',
      'RAG document research & source-grounded workflows',
      'Prompt engineering with strict verification habits',
      'No-code/low-code AI workflow automation & evaluation',
    ],
    skillGapData: [
      { skillArea: 'Domain & Problem Framing', currentBaseline: 88, targetAiReady: 95 },
      { skillArea: 'Data & Spreadsheet Literacy', currentBaseline: 45, targetAiReady: 82 },
      { skillArea: 'AI/ML Core Concepts', currentBaseline: 15, targetAiReady: 78 },
      { skillArea: 'Document & RAG Workflows', currentBaseline: 20, targetAiReady: 82 },
      { skillArea: 'Applied Python & Eval', currentBaseline: 10, targetAiReady: 72 },
    ],
    possiblePathways: [
      {
        roleTitle: 'AI-Enabled Domain Specialist / Consultant',
        transitionFit: 'Immediate leverage in your existing industry without starting over',
        exampleFocus: 'Automates research, document checks, and reporting inside your niche.',
      },
      {
        roleTitle: 'AI Workflow & Operations Analyst',
        transitionFit: 'Accessible bridge role for non-coding professionals learning data skills',
        exampleFocus: 'Connects business SOPs with document intelligence and analytics dashboards.',
      },
      {
        roleTitle: 'Applied Data & AI Solutions Associate',
        transitionFit: 'Structured transition path after building core Python & ML projects',
        exampleFocus: 'Translates client problems into tested data and AI prototypes.',
      },
    ],
    beforeAfterSteps: [
      {
        stepNumber: 1,
        title: 'Document & Research Gathering',
        beforeAction: 'Professional reads dozens of PDFs, briefs, and emails manually for key facts.',
        beforePainPoint: 'Information hunting consumes hours before real analysis starts.',
        afterAction: 'Document Intelligence & RAG index files and retrieve cited key sections.',
        afterSystemNote: 'Extracts dates, obligations, metrics, and missing fields cleanly.',
        humanOversightRole: 'Professional verifies source citations and nuances personally.',
      },
      {
        stepNumber: 2,
        title: 'Pattern & Spreadsheet Analysis',
        beforeAction: 'Working with static tables manually to guess trends or exceptions.',
        beforePainPoint: 'Time limits how many variables get examined.',
        afterAction: 'Data analysis & forecasting tools highlight outliers and future trends.',
        afterSystemNote: 'Presents clear visual charts ready for non-technical review.',
        humanOversightRole: 'Domain expert interprets real-world context behind the numbers.',
      },
      {
        stepNumber: 3,
        title: 'Structured Communication & Drafting',
        beforeAction: 'Starting complex client proposals or SOPs from a blank screen every time.',
        beforePainPoint: 'Formatting repetitive boilerplate takes focus away from strategy.',
        afterAction: 'GenAI structures clear outlines and first drafts from your bullet points.',
        afterSystemNote: 'Adapts structure to your domain terminology.',
        humanOversightRole: 'Author injects lived expertise, checks accuracy, and owns final prose.',
      },
      {
        stepNumber: 4,
        title: 'Routine Triage & Process Automation',
        beforeAction: 'Manually forwarding intake emails and copying fields between tools.',
        beforePainPoint: 'Administrative busywork steals time from creative or client work.',
        afterAction: 'AI classifies requests, extracts key details, and prepares clean summaries.',
        afterSystemNote: 'Queues exceptions for human review cleanly.',
        humanOversightRole: 'Professional handles client relationships and final decisions.',
      },
    ],
    responsibilities: [
      {
        id: 'oth-doc-review',
        title: 'Long Document & Contract Intelligence',
        summary: 'Extract obligations, clauses, dates, and missing items from dense PDFs.',
        currentManualProcess:
          'Reading 50-page reports or agreements manually with highlighter pens.',
        howAiAssists:
          'OCR and NLP extract structured summaries and flag missing sections with source page numbers.',
        aiTechnologies: ['Natural Language Processing', 'Generative AI', 'AI Automation'],
        toolsUsed: ['Document Intelligence', 'RAG Search'],
        workflow: {
          input: 'PDF agreements, policy docs, research briefs',
          aiProcessing: 'Chunking, entity extraction & clause comparison',
          mlOrAutomation: 'Structured summary & gap detection',
          output: 'Extracted checklist + cited source links',
          humanReview: 'Domain professional verifies exact wording before sign-off',
        },
        expectedBenefits: [
          'Cuts initial document triage time substantially',
          'Prevents overlooking buried dates or missing clauses',
        ],
        skillsRequired: ['Document AI concepts', 'Verification habits'],
      },
      {
        id: 'oth-knowledge',
        title: 'Private Knowledge & Precedent Search (RAG)',
        summary: 'Search years of past proposals, SOPs, or case files by meaning instead of exact keywords.',
        currentManualProcess:
          'Digging through shared network folders hoping file names match memory.',
        howAiAssists:
          'Vector embeddings retrieve past precedents relevant to a new client scenario.',
        aiTechnologies: ['Large Language Models', 'Natural Language Processing'],
        toolsUsed: ['Embeddings', 'RAG Assistants'],
        workflow: {
          input: 'New project question + past archive documents',
          aiProcessing: 'Semantic similarity matching',
          mlOrAutomation: 'Relevant precedent retrieval & brief synthesis',
          output: 'Top matching historical examples with citations',
          humanReview: 'Professional adapts precedent responsibly to current context',
        },
        expectedBenefits: [
          'Turns organizational archives into reusable team memory',
          'Speeds up research and proposal scoping',
        ],
        skillsRequired: ['Embeddings intuition', 'RAG fundamentals'],
      },
      {
        id: 'oth-data-decisions',
        title: 'Spreadsheet-to-Insight Data Analysis',
        summary: 'Spot trends, outliers, and simple forecasts inside operational CSV exports.',
        currentManualProcess:
          'Struggling with broken spreadsheet formulas and manual chart formatting.',
        howAiAssists:
          'Guides clean data summaries, visual trend charts, and anomaly flags transparently.',
        aiTechnologies: ['Data Analysis', 'Data Visualization', 'Predictive Analytics'],
        toolsUsed: ['Python basics', 'BI Charts'],
        workflow: {
          input: 'Department CSV exports (costs, schedules, surveys)',
          aiProcessing: 'Cleaning, aggregation & trend smoothing',
          mlOrAutomation: 'Outlier & short-horizon projection',
          output: 'Clean visual dashboard & summary metrics',
          humanReview: 'Professional checks business assumptions behind outliers',
        },
        expectedBenefits: [
          'Builds confidence backing proposals with clean evidence',
          'Spots cost leaks or demand shifts early',
        ],
        skillsRequired: ['Data literacy', 'Statistics fundamentals', 'Visualization'],
      },
      {
        id: 'oth-intake-triage',
        title: 'Client Intake & Request Routing',
        summary: 'Sort incoming client inquiries, extract details, and draft prompt responses.',
        currentManualProcess:
          'Manually reading inbox queues and retyping details into trackers.',
        howAiAssists:
          'Intent + entity extraction categorizes requests and prepares structured intake cards.',
        aiTechnologies: ['Natural Language Processing', 'AI Automation'],
        toolsUsed: ['Intent Classifiers', 'Automated Summaries'],
        workflow: {
          input: 'Client emails, intake forms, support tickets',
          aiProcessing: 'Topic classification & urgency check',
          mlOrAutomation: 'Structured CRM/tracker entry + draft reply',
          output: 'Prioritized queue & draft acknowledgement',
          humanReview: 'Professional leads personal consultation and approvals',
        },
        expectedBenefits: [
          'Improves response speed without sacrificing quality',
          'Eliminates manual intake copy-pasting',
        ],
        skillsRequired: ['Automation workflows', 'Prompt engineering'],
      },
      {
        id: 'oth-writing',
        title: 'Structured Proposal & Report Drafting',
        summary: 'Convert rough research notes into well-organized executive drafts.',
        currentManualProcess:
          'Spending hours organizing structure before polishing final recommendations.',
        howAiAssists:
          'Transforms verified bullet points into clear, audience-tailored structures.',
        aiTechnologies: ['Generative AI', 'Large Language Models'],
        toolsUsed: ['Structured Prompting', 'Fact-Check Checklists'],
        workflow: {
          input: 'Your verified bullets, audience brief & tone rules',
          aiProcessing: 'Outline structuring & clarity refinement',
          mlOrAutomation: 'Draft section synthesis',
          output: 'Structured draft ready for domain polish',
          humanReview: 'Professional fact-checks every claim and owns voice',
        },
        expectedBenefits: [
          'Overcomes blank-page friction quickly',
          'Frees time for strategic client thinking',
        ],
        skillsRequired: ['Structured prompt design', 'Critical AI verification'],
      },
      {
        id: 'oth-workflow-audit',
        title: 'Identifying & Measuring AI Opportunities at Work',
        summary: 'Evaluate which repetitive workflows in your team genuinely benefit from AI.',
        currentManualProcess:
          'Guessing which tools to try without tracking time saved or error risks.',
        howAiAssists:
          'Applies structured pipeline thinking (Input -> AI -> Output -> Human Review) to any job.',
        aiTechnologies: ['AI Automation', 'Model Evaluation'],
        toolsUsed: ['Workflow Mapping', 'ROI Pilots'],
        workflow: {
          input: 'Team task inventory + weekly time logs',
          aiProcessing: 'Repetition vs. judgment-risk scoring',
          mlOrAutomation: 'Automation suitability ranking',
          output: 'Practical 90-day team AI pilot roadmap',
          humanReview: 'Team leads test pilots safely with human checkpoints',
        },
        expectedBenefits: [
          'Positions you as a practical AI champion in your industry',
          'Avoids brittle over-automation of high-judgment tasks',
        ],
        skillsRequired: ['AI workflow architecture', 'Evaluation mindset'],
      },
    ],
  },
];
