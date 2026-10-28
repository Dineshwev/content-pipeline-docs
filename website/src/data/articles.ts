export interface Article {
  id: string;
  title: string;
  slug: string;
  track: 'Developer Research' | 'Owner Decisions';
  category: 'Case Studies' | 'Technology Comparisons' | 'Business Decisions';
  readTime: string;
  wordCount: number;
  description: string;
  keyQuestion: string;
  featured?: boolean;
  companionSlug?: string;
  companionTitle?: string;
}

export const articles: Article[] = [
  // --- CASE STUDIES ---
  {
    id: 'dev-case-study-ai-pipeline',
    title: 'How I Built a Human-Gated AI Content Pipeline for an Open-Source Directory',
    slug: '/docs/developer-oriented-articles/case-studies/articled1',
    track: 'Developer Research',
    category: 'Case Studies',
    readTime: '12 min read',
    wordCount: 2350,
    description:
      'A TypeScript workflow that takes human-approved tools, gathers GitHub metadata and web context, prompts Groq for structured fields, validates schemas, and saves records into Supabase.',
    keyQuestion: 'How can an engineering workflow automate repetitive content drafting without ceding editorial authority?',
    featured: true,
    companionSlug: '/docs/owner-oriented-articles/case-studies/articleo1',
    companionTitle: 'Should Your Business Use AI to Maintain a Software Directory?',
  },
  {
    id: 'owner-case-study-ai-pipeline',
    title: 'Should Your Business Use AI to Maintain a Software Directory?',
    slug: '/docs/owner-oriented-articles/case-studies/articleo1',
    track: 'Owner Decisions',
    category: 'Case Studies',
    readTime: '10 min read',
    wordCount: 1900,
    description:
      'A strategic decision framework for evaluating human-gated AI workflows versus manual curation to balance editorial quality, verification risks, and maintenance costs.',
    keyQuestion: 'When is human-gated automation cost-effective for maintaining a high-trust software catalog?',
    featured: true,
    companionSlug: '/docs/developer-oriented-articles/case-studies/articled1',
    companionTitle: 'How I Built a Human-Gated AI Content Pipeline for an Open-Source Directory',
  },

  // --- TECHNOLOGY COMPARISONS: SPREADSHEET VS DEDICATED TOOL ---
  {
    id: 'dev-comparison-spreadsheet',
    title: 'Evaluating Whether a Spreadsheet Is Still the Right Tool',
    slug: '/docs/developer-oriented-articles/comparisons/developer-spreadsheet-right-tool',
    track: 'Developer Research',
    category: 'Technology Comparisons',
    readTime: '15 min read',
    wordCount: 2900,
    description:
      'Engineering benchmarks to test concurrent editing, schema validation, access permissions, audit history, volume, and recovery before migrating away from spreadsheets.',
    keyQuestion: 'What concrete technical requirements determine when a spreadsheet fails as a system of record?',
    featured: true,
    companionSlug: '/docs/owner-oriented-articles/comparisons/owner-spreadsheet-right-tool',
    companionTitle: 'When a Spreadsheet Is Still the Right Business Tool',
  },
  {
    id: 'owner-comparison-spreadsheet',
    title: 'When a Spreadsheet Is Still the Right Business Tool',
    slug: '/docs/owner-oriented-articles/comparisons/owner-spreadsheet-right-tool',
    track: 'Owner Decisions',
    category: 'Technology Comparisons',
    readTime: '12 min read',
    wordCount: 2217,
    description:
      'Why spreadsheets remain the optimal choice for small, changing, low-risk business workflows—and the specific operational breaking points that signal when to upgrade.',
    keyQuestion: 'Is the flexibility of a spreadsheet worth current operational risks and manual data correction?',
    companionSlug: '/docs/developer-oriented-articles/comparisons/developer-spreadsheet-right-tool',
    companionTitle: 'Evaluating Whether a Spreadsheet Is Still the Right Tool',
  },

  // --- TECHNOLOGY COMPARISONS: BUILD VS BUY / HIRE VS TOOL ---
  {
    id: 'dev-comparison-build-buy',
    title: 'Build or Buy: A Technical Evaluation Method',
    slug: '/docs/developer-oriented-articles/comparisons/developer-hire-developer-or-buy-tool',
    track: 'Developer Research',
    category: 'Technology Comparisons',
    readTime: '18 min read',
    wordCount: 3600,
    description:
      'A repeatable engineering evaluation scoring architecture fit, maintenance burden, vendor APIs, security requirements, and long-term technical debt.',
    keyQuestion: 'How should an engineering team measure ongoing maintenance liabilities before building custom software?',
    featured: true,
    companionSlug: '/docs/owner-oriented-articles/comparisons/owner-hire-developer-or-buy-tool',
    companionTitle: 'Should You Hire a Developer or Buy a Tool?',
  },
  {
    id: 'owner-comparison-build-buy',
    title: 'Should You Hire a Developer or Buy a Tool?',
    slug: '/docs/owner-oriented-articles/comparisons/owner-hire-developer-or-buy-tool',
    track: 'Owner Decisions',
    category: 'Technology Comparisons',
    readTime: '18 min read',
    wordCount: 3448,
    description:
      'Guidance for non-technical leaders on when commercial software delivers immediate ROI versus when proprietary workflows justify dedicated engineering hires.',
    keyQuestion: 'Does this problem provide competitive differentiation, or is it standard operational plumbing?',
    companionSlug: '/docs/developer-oriented-articles/comparisons/developer-hire-developer-or-buy-tool',
    companionTitle: 'Build or Buy: A Technical Evaluation Method',
  },

  // --- TECHNOLOGY COMPARISONS: EVALUATING TECH WITHOUT CODE ---
  {
    id: 'dev-comparison-eval-tech',
    title: 'Helping Non-Technical Buyers Evaluate Technology',
    slug: '/docs/developer-oriented-articles/comparisons/developer-choose-technology-without-code',
    track: 'Developer Research',
    category: 'Technology Comparisons',
    readTime: '14 min read',
    wordCount: 2700,
    description:
      'How engineers can translate architectural resilience, vendor viability, API stability, and data export readiness into objective criteria for non-technical buyers.',
    keyQuestion: 'How can technical teams structure vendor audits that non-technical stakeholders can trust?',
    companionSlug: '/docs/owner-oriented-articles/comparisons/owner-choose-technology-without-code',
    companionTitle: 'How to Choose Technology When You Cannot Evaluate the Code',
  },
  {
    id: 'owner-comparison-eval-tech',
    title: 'How to Choose Technology When You Cannot Evaluate the Code',
    slug: '/docs/owner-oriented-articles/comparisons/owner-choose-technology-without-code',
    track: 'Owner Decisions',
    category: 'Technology Comparisons',
    readTime: '12 min read',
    wordCount: 2328,
    description:
      'Evaluating software vendors based on business outcomes, data ownership, contract portability, support SLAs, and real total cost rather than sales buzzwords.',
    keyQuestion: 'How can an executive evaluate a mission-critical tool when they cannot inspect the underlying code?',
    companionSlug: '/docs/developer-oriented-articles/comparisons/developer-choose-technology-without-code',
    companionTitle: 'Helping Non-Technical Buyers Evaluate Technology',
  },

  // --- BUSINESS DECISIONS: PROCESS AUTOMATION ---
  {
    id: 'dev-business-automate-processes',
    title: 'How to Decide Which Business Processes to Automate: An Engineering Method',
    slug: '/docs/developer-oriented-articles/business-decisions/developer-automate-processes',
    track: 'Developer Research',
    category: 'Business Decisions',
    readTime: '12 min read',
    wordCount: 2350,
    description:
      'Score candidate processes by transaction volume, repeatability, input cleanliness, exception rates, failure blast radius, and observability before automating.',
    keyQuestion: 'What quantitative criteria prove a process is mature enough for code-level automation?',
    companionSlug: '/docs/owner-oriented-articles/business-decisions/owner-automate-processes',
    companionTitle: 'How to Decide Which Business Processes to Automate',
  },
  {
    id: 'owner-business-automate-processes',
    title: 'How to Decide Which Business Processes to Automate',
    slug: '/docs/owner-oriented-articles/business-decisions/owner-automate-processes',
    track: 'Owner Decisions',
    category: 'Business Decisions',
    readTime: '12 min read',
    wordCount: 2380,
    description:
      'Strategic prioritization for business owners: identify high-repetition, low-exception workflows where automation provides real leverage rather than new headaches.',
    keyQuestion: 'Which team workflows generate enough predictable volume to justify automation investment?',
    featured: true,
    companionSlug: '/docs/developer-oriented-articles/business-decisions/developer-automate-processes',
    companionTitle: 'How to Decide Which Business Processes to Automate: An Engineering Method',
  },

  // --- BUSINESS DECISIONS: WHEN AUTOMATION CREATES MORE WORK ---
  {
    id: 'dev-business-automation-more-work',
    title: 'Detecting When Automation Creates More Work Than It Saves',
    slug: '/docs/developer-oriented-articles/business-decisions/developer-automation-more-work',
    track: 'Developer Research',
    category: 'Business Decisions',
    readTime: '12 min read',
    wordCount: 2323,
    description:
      'Measure net engineering effort rather than raw execution count by accounting for operator review, edge-case retries, alert fatigue, and schema maintenance.',
    keyQuestion: 'How do you calculate the true net productivity impact of an automated workflow?',
    companionSlug: '/docs/owner-oriented-articles/business-decisions/owner-automation-more-work',
    companionTitle: 'When Automation Creates More Work Than It Saves',
  },
  {
    id: 'owner-business-automation-more-work',
    title: 'When Automation Creates More Work Than It Saves',
    slug: '/docs/owner-oriented-articles/business-decisions/owner-automation-more-work',
    track: 'Owner Decisions',
    category: 'Business Decisions',
    readTime: '12 min read',
    wordCount: 2350,
    description:
      'Recognize warning signs of negative-ROI automation: brittle integrations, high exception handling, and confusing automated steps that slow down your staff.',
    keyQuestion: 'Are automated systems actually freeing up team payroll or just generating unseen maintenance tasks?',
    companionSlug: '/docs/developer-oriented-articles/business-decisions/developer-automation-more-work',
    companionTitle: 'Detecting When Automation Creates More Work Than It Saves',
  },

  // --- BUSINESS DECISIONS: VENDOR LOCK-IN ---
  {
    id: 'dev-business-vendor-lock-in',
    title: 'Measuring Vendor Lock-In Before It Becomes an Incident',
    slug: '/docs/developer-oriented-articles/business-decisions/developer-vendor-lock-in',
    track: 'Developer Research',
    category: 'Business Decisions',
    readTime: '15 min read',
    wordCount: 2916,
    description:
      'Treat architectural portability as an operational capability. Audit proprietary APIs, schema exports, data egress costs, and failover pathways before lock-in crystallizes.',
    keyQuestion: 'How can engineers quantify migration effort and switching friction before adopting proprietary cloud services?',
    featured: true,
    companionSlug: '/docs/owner-oriented-articles/business-decisions/owner-vendor-lock-in',
    companionTitle: 'The Hidden Business Risk of Depending on One Vendor',
  },
  {
    id: 'owner-business-vendor-lock-in',
    title: 'The Hidden Business Risk of Depending on One Vendor',
    slug: '/docs/owner-oriented-articles/business-decisions/owner-vendor-lock-in',
    track: 'Owner Decisions',
    category: 'Business Decisions',
    readTime: '14 min read',
    wordCount: 2695,
    description:
      'Evaluating commercial supplier risk, surprise pricing hikes, platform sunsetting, and migration costs to maintain strategic commercial leverage.',
    keyQuestion: 'What business leverage does your company lose when a single vendor hosts critical operations?',
    companionSlug: '/docs/developer-oriented-articles/business-decisions/developer-vendor-lock-in',
    companionTitle: 'Measuring Vendor Lock-In Before It Becomes an Incident',
  },

  // --- BUSINESS DECISIONS: TOOL COST & VALUE ---
  {
    id: 'dev-business-tool-cost',
    title: 'Measuring the Total Cost and Value of a New Tool',
    slug: '/docs/developer-oriented-articles/business-decisions/developer-measure-tool-cost',
    track: 'Developer Research',
    category: 'Business Decisions',
    readTime: '15 min read',
    wordCount: 2864,
    description:
      'Establish baseline metrics, instrument engineering adoption, and calculate full lifecycle costs including integration, data synchronization, security reviews, and training.',
    keyQuestion: 'What telemetry and instrumentation are required to determine whether developer tooling paid off?',
    companionSlug: '/docs/owner-oriented-articles/business-decisions/owner-measure-tool-cost',
    companionTitle: 'How to Measure Whether a New Tool Is Worth Its Cost',
  },
  {
    id: 'owner-business-tool-cost',
    title: 'How to Measure Whether a New Tool Is Worth Its Cost',
    slug: '/docs/owner-oriented-articles/business-decisions/owner-measure-tool-cost',
    track: 'Owner Decisions',
    category: 'Business Decisions',
    readTime: '15 min read',
    wordCount: 2846,
    description:
      'Why subscription invoices represent only a small fraction of software expenses, and how to verify if a tool generates measurable capacity or reduces business risk.',
    keyQuestion: 'How do you calculate true total cost of ownership across licensing, migration, and team onboarding?',
    companionSlug: '/docs/developer-oriented-articles/business-decisions/developer-measure-tool-cost',
    companionTitle: 'Measuring the Total Cost and Value of a New Tool',
  },

  // --- BUSINESS DECISIONS: KNOWLEDGE RETENTION ---
  {
    id: 'dev-business-lose-knowledge',
    title: 'Building a Knowledge Retention System for a Fast-Growing Team',
    slug: '/docs/developer-oriented-articles/business-decisions/developer-lose-knowledge',
    track: 'Developer Research',
    category: 'Business Decisions',
    readTime: '12 min read',
    wordCount: 2207,
    description:
      'Capture architectural decisions at the point of change, assign explicit documentation ownership, link code commits to specs, and automate stale document detection.',
    keyQuestion: 'How can technical teams preserve institutional knowledge without burdening engineers with useless wikis?',
    companionSlug: '/docs/owner-oriented-articles/business-decisions/owner-lose-knowledge',
    companionTitle: 'Why Fast-Growing Teams Lose Knowledge',
  },
  {
    id: 'owner-business-lose-knowledge',
    title: 'Why Fast-Growing Teams Lose Knowledge',
    slug: '/docs/owner-oriented-articles/business-decisions/owner-lose-knowledge',
    track: 'Owner Decisions',
    category: 'Business Decisions',
    readTime: '11 min read',
    wordCount: 2150,
    description:
      'Prevent critical business knowledge from vanishing when team members depart by establishing lightweight documentation habits, clear ownership, and searchable records.',
    keyQuestion: 'Why do expanding companies repeatedly lose context, and how can leaders protect institutional memory?',
    companionSlug: '/docs/developer-oriented-articles/business-decisions/developer-lose-knowledge',
    companionTitle: 'Building a Knowledge Retention System for a Fast-Growing Team',
  },

  // --- BUSINESS DECISIONS: PROCESS FOR SMALL TEAMS ---
  {
    id: 'dev-business-process-small-team',
    title: 'Designing Lightweight Process for a Small Engineering Team',
    slug: '/docs/developer-oriented-articles/business-decisions/developer-process-small-team',
    track: 'Developer Research',
    category: 'Business Decisions',
    readTime: '11 min read',
    wordCount: 2011,
    description:
      'Establish explicit task ownership, minimal state models, short pull-request checklists, and lightweight decision records before adopting heavy process software.',
    keyQuestion: 'How can small engineering teams ensure consistent code quality without slowing down feature velocity?',
    companionSlug: '/docs/owner-oriented-articles/business-decisions/owner-process-small-team',
    companionTitle: 'How Much Process Is Enough for a Small Team?',
  },
  {
    id: 'owner-business-process-small-team',
    title: 'How Much Process Is Enough for a Small Team?',
    slug: '/docs/owner-oriented-articles/business-decisions/owner-process-small-team',
    track: 'Owner Decisions',
    category: 'Business Decisions',
    readTime: '12 min read',
    wordCount: 2374,
    description:
      'Strike the right balance between operational agility and repeatable delivery: implement enough structure to prevent dropped balls without introducing corporate bureaucracy.',
    keyQuestion: 'How can founders create reliable operations without burying a high-performing team under red tape?',
    companionSlug: '/docs/developer-oriented-articles/business-decisions/developer-process-small-team',
    companionTitle: 'Designing Lightweight Process for a Small Engineering Team',
  },

  // --- BUSINESS DECISIONS: COST OF REWRITING INFORMATION ---
  {
    id: 'dev-business-cost-rewriting',
    title: 'Measuring the Cost of Rewriting the Same Information',
    slug: '/docs/developer-oriented-articles/business-decisions/developer-real-cost-rewriting',
    track: 'Developer Research',
    category: 'Business Decisions',
    readTime: '12 min read',
    wordCount: 2234,
    description:
      'Track repeated technical questions, support handling delays, and source conflicts across team communications to design modular, reusable single-source documentation.',
    keyQuestion: 'How much engineering bandwidth is lost answering the same implementation questions over and over?',
    companionSlug: '/docs/owner-oriented-articles/business-decisions/owner-real-cost-rewriting',
    companionTitle: 'The Real Cost of Rewriting the Same Information',
  },
  {
    id: 'owner-business-cost-rewriting',
    title: 'The Real Cost of Rewriting the Same Information',
    slug: '/docs/owner-oriented-articles/business-decisions/owner-real-cost-rewriting',
    track: 'Owner Decisions',
    category: 'Business Decisions',
    readTime: '11 min read',
    wordCount: 2128,
    description:
      'Repeated explanations cost far more than typing time: they cause project delays, contradictory customer commitments, unnecessary meetings, and reliance on key individuals.',
    keyQuestion: 'What is the true organizational payroll expense of fragmented, repeatedly rewritten business information?',
    companionSlug: '/docs/developer-oriented-articles/business-decisions/developer-real-cost-rewriting',
    companionTitle: 'Measuring the Cost of Rewriting the Same Information',
  },

  // --- BUSINESS DECISIONS: SINGLE SOURCE OF TRUTH ---
  {
    id: 'dev-business-single-source-of-truth',
    title: 'Implementing a Single Source of Truth Without Creating Data Drift',
    slug: '/docs/developer-oriented-articles/business-decisions/developer-single-source-of-truth',
    track: 'Developer Research',
    category: 'Business Decisions',
    readTime: '11 min read',
    wordCount: 2014,
    description:
      'Architectural patterns for canonical data storage, automated view derivation, and explicit synchronization boundaries to prevent silent schema and state drift.',
    keyQuestion: 'How do you design data pipelines so derived views remain provably synchronized with canonical records?',
    companionSlug: '/docs/owner-oriented-articles/business-decisions/owner-single-source-of-truth',
    companionTitle: 'The Business Case for a Single Source of Truth',
  },
  {
    id: 'owner-business-single-source-of-truth',
    title: 'The Business Case for a Single Source of Truth',
    slug: '/docs/owner-oriented-articles/business-decisions/owner-single-source-of-truth',
    track: 'Owner Decisions',
    category: 'Business Decisions',
    readTime: '12 min read',
    wordCount: 2262,
    description:
      'When conflicting data costs real money in shipping mistakes, billing disputes, and mismatched client commitments—and the business strategy to fix the root cause.',
    keyQuestion: 'When does data duplication become an unacceptable business liability rather than a minor inconvenience?',
    companionSlug: '/docs/developer-oriented-articles/business-decisions/developer-single-source-of-truth',
    companionTitle: 'Implementing a Single Source of Truth Without Creating Data Drift',
  },
];
