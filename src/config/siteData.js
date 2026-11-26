export const SITE_DATA = {
  brand: {
    name: 'VSM Cloud',
    tagline: 'AI-Powered Value Stream Mapping',
    company: 'Faber Infinite',
    coreMessage: 'Create. Analyse. Improve. Your Value Stream.',
    copyright: '© 2026 VSM Cloud. All rights reserved.',
  },

  nav: {
    links: [
      { name: 'Product', href: '#product' },
      { name: 'Features', href: '#features' },
      { name: 'How It Works', href: '#how-it-works' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Resources', href: '#faq' },
    ],
    signIn: { label: 'Sign In', href: 'http://localhost:5174/login' },
    primaryCta: { label: 'Start Free Trial', href: '#trial' },
  },

  hero: {
    badge: 'Intelligent Digital VSM Platform',
    headline: 'See your entire production flow. Find where improvement begins.',
    subheadline: 'Create, analyse and improve your manufacturing Value Stream Maps with intelligent digital VSM software.',
    primaryCta: 'Start Free Trial',
    secondaryCta: 'Explore Product',
    trustLine: 'Built for Manufacturing Teams, Lean Consultants and Industrial Engineers.',
  },

  problems: {
    badge: 'The Manufacturing Challenge',
    headline: 'Your factory has data. But can you see the entire flow?',
    subheadline: 'Traditional mapping methods and static spreadsheets leave blind spots across production lines.',
    cards: [
      {
        id: 'disconnected-processes',
        number: '01',
        title: 'Disconnected Processes',
        description: 'Production information is spread across spreadsheets, documents and different teams, making cross-functional alignment slow and fragmented.',
        stat: 'Spreadsheet Sprawl',
        statLabel: 'Data siloed across multiple files'
      },
      {
        id: 'limited-visibility',
        number: '02',
        title: 'Limited Visibility',
        description: 'Bottlenecks, excess inventory and waiting time are difficult to identify when process data is separated from physical material flow.',
        stat: 'Hidden Bottlenecks',
        statLabel: 'WIP accumulation obscured'
      },
      {
        id: 'manual-reporting',
        number: '03',
        title: 'Manual Reporting',
        description: 'Creating, updating and presenting VSM reports takes valuable time away from actual engineering analysis and continuous improvement execution.',
        stat: 'Manual Drafting',
        statLabel: 'Hours spent redrawing static maps'
      }
    ]
  },

  solutions: {
    badge: 'Comprehensive Solution',
    headline: 'Everything you need to understand your value stream.',
    subheadline: 'A structured digital environment replacing whiteboard diagrams and fragmented sheets with living value stream intelligence.',
    cards: [
      {
        id: 'map',
        title: 'Map',
        subtitle: 'Digital Canvas & Symbol Standards',
        description: 'Build digital current-state and future-state Value Stream Maps with an intuitive visual editor designed specifically for manufacturing operations.',
        bullets: [
          'Standard Lean manufacturing symbol palette',
          'Customer, supplier, processes & inventory triangles',
          'Electronic & manual information flow lines',
          'Current state and future state comparisons'
        ]
      },
      {
        id: 'measure',
        title: 'Measure',
        subtitle: 'Automated Lean KPI Engine',
        description: 'Calculate important manufacturing KPIs such as Takt Time, Cycle Time, Lead Time, Work in Progress, and Process Cycle Efficiency automatically.',
        bullets: [
          'Takt Time based on customer demand & shifts',
          'Cycle Time (C/T) & Changeover Time (C/O)',
          'Total Production Lead Time vs Value-Added Time',
          'Process Cycle Efficiency (PCE) & WIP days'
        ]
      },
      {
        id: 'analyse',
        title: 'Analyse',
        subtitle: 'AI-Assisted Operational Insights',
        description: 'Use AI-assisted analysis to understand process performance, benchmark against takt time, and identify potential improvement opportunities.',
        bullets: [
          'Automated bottleneck detection across stations',
          'Capacity balance and uptime analysis',
          'Contextual AI recommendations for flow balance',
          'WIP accumulation hotspot identification'
        ]
      },
      {
        id: 'improve',
        title: 'Improve',
        subtitle: 'Reports & Transformation Roadmap',
        description: 'Compare current and future states, communicate findings with plant stakeholders, and create professional boardroom-ready VSM reports.',
        bullets: [
          'Side-by-side Current State Map vs Future State Map delta metrics',
          'One-click high-resolution PDF & PNG exports',
          'Structured tabular Excel data export',
          'Clear executive presentation summaries'
        ]
      }
    ]
  },

  showcase: {
    badge: 'Product Walkthrough',
    headline: 'A better way to build and manage Value Stream Maps.',
    subheadline: 'Purpose-built for operational excellence teams. Built on proven Lean manufacturing methodologies.',
    blocks: [
      {
        id: 'builder',
        title: 'Visual VSM Builder',
        headline: 'Create and manage digital value streams with a structured visual mapping experience.',
        description: 'Place suppliers, customers, workstations, and inventory buffers on an intelligent canvas. Connect material pushes, pull arrows, and electronic signals with magnetic alignment and standard manufacturing symbols.',
        image: '/assets/vsm-csm-preview.png',
        fallbackImage: '/assets/vsm-current-state.png',
        tag: 'Intuitive Visual Canvas',
        features: [
          'Drag-and-drop standard Lean symbols (Inventory, Process, Truck, Push/Pull)',
          'Dynamic data boxes with Cycle Time, Changeover, Uptime, Batch Size, Shifts',
          'Visual information flow connections (EDI, MRP, Daily Schedule)',
          'Built-in timeline ladder with value-add vs non-value-add steps'
        ]
      },
      {
        id: 'kpis',
        title: 'Manufacturing KPI Insights',
        headline: 'Understand process performance through key manufacturing metrics and clear visual insights.',
        description: 'Stop calculating takt time and lead time manually on calculators. As you configure your process steps and inventory buffers, VSM Cloud computes the entire production timeline in real time.',
        image: '/assets/vsm-kpi-summary.png',
        fallbackImage: '/assets/vsm-smart-improve-preview.png',
        tag: 'Automated Metrics Engine',
        features: [
          'Instant Takt Time calculation against operating time and demand',
          'Automated Total Lead Time vs Value Added Cycle Time breakdown',
          'Process Cycle Efficiency (PCE %) calculation',
          'Station balance chart highlighting stations exceeding takt'
        ]
      },
      {
        id: 'reports',
        title: 'Reports and Exports',
        headline: 'Present your findings with clear, readable and professional VSM reports.',
        description: 'Generate high-resolution exports and structured reports for Kaizen reviews, plant audits, and executive presentations. Keep your stakeholders aligned without redrawing slides in PowerPoint.',
        image: '/assets/vsm-fsm-preview.png',
        fallbackImage: '/assets/vsm-current-state.png',
        tag: 'Executive Reporting',
        features: [
          'Vector-crisp PDF and PNG image exports ready for print or presentations',
          'Structured Excel exports containing all station data and metrics',
          'Future-state comparison summary with projected lead-time reductions',
          'Shareable project records for multi-plant audits and standardization'
        ]
      }
    ]
  },

  aiSection: {
    badge: 'Intelligent Analysis Engine',
    headline: 'Go beyond mapping. Understand your process.',
    description: 'VSM Cloud brings AI-assisted insights into Value Stream Mapping, helping manufacturing professionals understand process data and explore potential improvement opportunities.',
    disclaimer: 'Demonstration example based on simulated process parameters. AI recommendations assist engineering decision-making and require validation by qualified plant personnel.',
    conversation: [
      {
        role: 'user',
        text: 'Where is the biggest bottleneck in this value stream?'
      },
      {
        role: 'assistant',
        text: 'Based on the available process data, Process 3 (Assembly & Test) has the highest cycle time (142s) relative to takt time (120s), resulting in 118% takt utilization. Upstream inventory at Buffer 2 has grown to 3.4 days of WIP. Recommend reviewing machine changeover, station downtime, and rebalancing assembly steps before deciding on capital investment.'
      }
    ],
    sampleQueries: [
      {
        label: 'Bottleneck Analysis',
        query: 'Where is the biggest bottleneck in this value stream?',
        response: 'Process 3 (Assembly & Test) exhibits the highest cycle time (142s) exceeding the 120s Takt Time. Buffer 2 holds 3.4 days of inventory. Focus initial Kaizen on cycle time reduction and uptime improvement at Station 3.'
      },
      {
        label: 'Lead Time Reduction',
        query: 'How can we reduce total manufacturing lead time from 18.5 days?',
        response: 'Inventory buffers contribute 94% of total lead time (17.4 days out of 18.5 days). Implementing a Kanban pull system between Stamping and Welding can reduce intermediate inventory by an estimated 60% without risking starved downstream processes.'
      },
      {
        label: 'Takt Balance Check',
        query: 'Are all stations balanced to customer takt time?',
        response: 'Station 1 operates at 85s (71% takt), Station 2 at 110s (92% takt), Station 3 at 142s (118% takt - overloaded), and Station 4 at 95s (79% takt). Rebalancing 25 seconds of manual inspection work from Station 3 to Station 4 would bring Station 3 within takt.'
      }
    ],
    cta: 'Explore AI-powered VSM'
  },

  howItWorks: {
    badge: 'Methodical Workflow',
    headline: 'From process data to better decisions in four steps.',
    subheadline: 'A streamlined progression from initial plant walk to quantified improvement roadmap.',
    steps: [
      {
        number: '01',
        title: 'Create Your Project',
        description: 'Start a VSM project and enter your manufacturing process information, operating shifts, working hours, and customer demand requirements.',
        badge: 'Setup & Baseline'
      },
      {
        number: '02',
        title: 'Build Your Map',
        description: 'Visualise material flow, information flow and process data using standard Lean symbols, inventory buffers, and process data boxes.',
        badge: 'Visual Mapping'
      },
      {
        number: '03',
        title: 'Analyse Performance',
        description: 'Review KPIs, identify bottlenecks, calculate lead times, and understand your current state with automatic metrics and AI assistance.',
        badge: 'Diagnostic Intelligence'
      },
      {
        number: '04',
        title: 'Plan Improvements',
        description: 'Explore future-state opportunities, model kaizen bursts, compare current vs future performance, and share professional reports.',
        badge: 'Action & Impact'
      }
    ]
  },

  audience: {
    badge: 'Who It Is For',
    headline: 'Engineered for manufacturing leaders and Lean practitioners.',
    subheadline: 'Whether optimizing a single factory line or advising Fortune 500 manufacturing operations.',
    cards: [
      {
        id: 'manufacturing-companies',
        role: 'Manufacturing Companies',
        headline: 'Understand production flow, inventory, bottlenecks and improvement opportunities.',
        description: 'Plant managers and operations directors gain unified visibility into shop floor flow, identifying trapped working capital and freeing capacity without expensive guesswork.',
        useCases: [
          'Reduce work-in-progress (WIP) and inventory carrying cost',
          'Eliminate line starvation and unbalance across work cells',
          'Standardize Lean metrics across plants and business units'
        ]
      },
      {
        id: 'lean-consultants',
        role: 'Lean Consultants',
        headline: 'Create, analyse and present VSM projects for multiple clients.',
        description: 'Deliver high-impact consulting engagements faster. Move from pencil sketches during Gemba walks to digital, presentation-ready maps and quantifiable ROI analyses in minutes.',
        useCases: [
          'Manage multiple client projects under one organized workspace',
          'Generate professional A3 and VSM reports for steering committees',
          'Model future-state scenarios with clear before-and-after metrics'
        ]
      },
      {
        id: 'industrial-engineers',
        role: 'Industrial Engineers',
        headline: 'Visualise process performance and communicate improvement opportunities.',
        description: 'Eliminate tedious manual spreadsheet formulas. Bridge the gap between engineering time studies and management presentations with automated takt and lead-time calculations.',
        useCases: [
          'Calculate accurate Takt, Cycle, and Lead Time metrics instantly',
          'Document line balance and highlight over-takt operations',
          'Maintain clean revision history as process changes occur'
        ]
      }
    ]
  },

  faq: {
    badge: 'Frequently Asked Questions',
    headline: 'Everything you need to know about VSM Cloud.',
    subheadline: 'Clear answers about product capabilities, methodology, exports, and getting started.',
    items: [
      {
        question: 'What is Value Stream Mapping?',
        answer: 'Value Stream Mapping (VSM) is a foundational Lean manufacturing methodology used to document, analyse, and improve the flow of materials and information required to bring a product from raw material to customer delivery. By distinguishing value-adding steps from non-value-adding waste, VSM provides visual clarity on lead times, work-in-progress inventory, and process bottlenecks.'
      },
      {
        question: 'Who can use VSM Cloud?',
        answer: 'VSM Cloud is purpose-built for manufacturing companies, continuous improvement (CI) teams, Lean consultants, industrial engineers, plant managers, and operations executives. It accommodates both individual practitioners running line diagnostics and multi-user manufacturing teams managing continuous improvement across several facilities.'
      },
      {
        question: 'Can I create current-state and future-state maps?',
        answer: 'Yes. VSM Cloud provides dedicated support for both Current State Mapping to capture baseline production reality, and Future State Mapping to design the optimized target flow. Professional and Professional Plus plans include side-by-side comparison tools to quantify expected lead-time cuts and inventory reductions.'
      },
      {
        question: 'Which manufacturing KPIs are supported?',
        answer: 'VSM Cloud automatically calculates core manufacturing metrics: Takt Time (available working time divided by customer demand), Cycle Time (C/T), Changeover Time (C/O), Work in Progress (WIP in units and equivalent days of supply), Total Production Lead Time (PLT), Total Value-Added Time (VAT), and Process Cycle Efficiency (PCE %). Station-level uptime, scrap rate, and operator staffing are also captured.'
      },
      {
        question: 'Does VSM Cloud include AI-assisted analysis?',
        answer: 'Yes. VSM Cloud includes an AI-assisted analysis module that scans your mapped process parameters against calculated takt times and inventory buffers. It highlights station bottlenecks, identifies unbalanced operations, and offers contextual Lean recommendations to guide engineering teams during Kaizen workshops.'
      },
      {
        question: 'Can I export my Value Stream Maps?',
        answer: 'Yes. You can export high-resolution vector PDFs and PNG images suitable for large-format plotting, plant Gemba boards, or executive slide presentations. Higher tiers also support exporting structured process data and KPI calculations to spreadsheet formats for further engineering review.'
      },
      {
        question: 'Can multiple team members collaborate?',
        answer: 'Yes. The Professional Plus and Enterprise plans feature shared workspaces, centralized project libraries, role-based permissions, and team collaboration, allowing engineers, consultants, and plant managers to collaborate seamlessly.'
      },
      {
        question: 'Can I cancel my subscription?',
        answer: 'Yes. You can cancel your subscription at any time directly from your account settings. You will retain full access through the end of your prepaid billing period, and your project data will remain securely archived for export.'
      },
      {
        question: 'Is a free plan or trial available?',
        answer: 'Yes! We offer a 7-day free trial on our Trial plan with no credit card required upfront. After 7 days, the trial expires automatically with zero automatic payment. You will receive expiry notifications to select a paid subscription (Professional, Professional Plus, or Enterprise), and your project data is safely retained for 30 days under our retention policy.'
      }
    ]
  },

  finalCta: {
    headline: 'Make your value stream visible. Make improvement possible.',
    description: 'Start creating better Value Stream Maps with a simpler, smarter digital experience. Eliminate manual drafting and unlock real continuous improvement.',
    primaryButton: 'Start Free Trial',
    secondaryButton: 'Book a Demo'
  },

  footer: {
    columns: [
      {
        title: 'Product',
        links: [
          { name: 'Visual VSM Builder', href: '#features' },
          { name: 'KPI Insights & Engine', href: '#features' },
          { name: 'AI-Assisted Analysis', href: '#ai-section' },
          { name: 'Product Overview', href: '#product' },
          { name: 'Pricing Plans', href: '#pricing' }
        ]
      },
      {
        title: 'Resources',
        links: [
          { name: 'VSM Methodology Guide', href: '#how-it-works' },
          { name: 'Lean Manufacturing Glossary', href: '#faq' },
          { name: 'Frequently Asked Questions', href: '#faq' },
          { name: 'Sample Process Models', href: '#product' },
          { name: 'Contact Engineering Support', href: '#trial' }
        ]
      },
      {
        title: 'Company',
        links: [
          { name: 'About Faber Infinite', href: 'https://faberinfinite.com', external: true },
          { name: 'Global Operational Excellence', href: 'https://faberinfinite.com', external: true },
          { name: 'Privacy Policy', href: '#/privacy' },
          { name: 'Terms and Conditions', href: '#/terms' },
          { name: 'Security & Compliance', href: '#faq' }
        ]
      },
      {
        title: 'Account',
        links: [
          { name: 'Sign In', href: 'http://localhost:5174/login' },
          { name: 'Create Account', href: '#trial' },
          { name: 'Request Enterprise Demo', href: '#trial' },
          { name: 'Billing Portal', href: '#pricing' }
        ]
      }
    ]
  }
};
