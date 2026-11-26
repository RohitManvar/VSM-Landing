// The worked example behind the landing page's Map / Analyze / Improve steps.
// These are real screens from VSM 4.0 (public/assets/vsm-gr24-*.webp), captured from a
// realistic sample value stream built in the app — every number below is what the app shows:
//   CSM:        16.5 days lead time, 156 s value-add, takt 28.2 s (45,000 pcs/month, 24 days, 2 shifts)
//   FS Planner: Smart Improve flags Gear Hobbing (31 s > 28.2 s takt) as the bottleneck
//   FSM:        Gear Hobbing balanced to 26 s, FIFO lanes + a supermarket → 10.3 days, 151 s

export const VSM_EXAMPLE = {
  line: 'Transmission gear — GR-24 family',
  context: 'Example · Transmission gear GR-24',
  taktSeconds: 28.2,
  leadTimeDays: 16.5,
  fsmLeadTimeDays: 10.3,
  valueAddSeconds: 156,
  fsmValueAddSeconds: 151,

  // Smart Improve's top findings for this line, as the FS Planner shows them.
  recommendations: [
    {
      title: 'Bottleneck at Gear Hobbing',
      detail: '31 s cycle time is over the 28.2 s takt. Add a parallel workstation or cut 2.8 s.',
      impact: 'High'
    },
    {
      title: 'High breakdown at Gear Hobbing',
      detail: '18% breakdown eats available time. Planned preventive maintenance.',
      impact: 'High'
    },
    {
      title: 'High breakdown at CNC Turning',
      detail: '12% breakdown on the first step. Planned preventive maintenance.',
      impact: 'Medium'
    }
  ]
};

const pct = Math.round((1 - VSM_EXAMPLE.fsmLeadTimeDays / VSM_EXAMPLE.leadTimeDays) * 100);
export const LEAD_TIME_REDUCTION = pct; // 38

// The real product screen shown for each step (w/h: the capture's pixel size).
export const MAP_STEP_SCREENS = {
  csm: {
    src: '/assets/vsm-gr24-csm.webp',
    w: 2400,
    h: 823,
    label: 'Current state',
    tone: 'bg-cyan-500 text-white',
    dot: 'bg-cyan-500',
    hint: 'Enter the process data once. The map draws itself.',
    // Screen recording of this flow (public/assets/video/). null until the clip is added.
    video: null,
    alt: 'Current state map of the GR-24 line in VSM 4.0'
  },
  improve: {
    src: '/assets/vsm-gr24-fsplanner.webp',
    w: 2400,
    h: 1459,
    label: 'Smart Improve',
    tone: 'bg-orange-500 text-white',
    dot: 'bg-orange-500',
    hint: 'Smart Improve flags the bottleneck. Apply it in one click.',
    // Screen recording of this flow (public/assets/video/). null until the clip is added.
    video: null,
    alt: 'VSM 4.0 Future State Planner with AI Smart Recommendations for the GR-24 line'
  },
  fsm: {
    src: '/assets/vsm-gr24-fsm.webp',
    w: 2400,
    h: 646,
    label: 'Future state',
    tone: 'bg-emerald-500 text-white',
    dot: 'bg-emerald-500',
    hint: 'Future state recalculated: lead time 16.5 → 10.3 days.',
    // Screen recording of this flow (public/assets/video/). null until the clip is added.
    video: null,
    alt: 'Future state map of the GR-24 line in VSM 4.0'
  }
};

// Where each screen zooms in once its step is on screen, and the pins it shows there.
// x / y are fractions of the screenshot (0..1). `side` is which way a pin's label points.
// Smart Improve has one focus per finding card visible in the capture (hovering a finding
// in the list moves the zoom to its card).
export const SCREEN_FOCUS = {
  csm: [
    {
      zoom: 2.4,
      x: 0.247,
      y: 0.546,
      pins: [
        // On the box's top edge, so the label sits in the empty space above the process boxes
        { x: 0.247, y: 0.279, label: '31 s cycle, over the 28.2 s takt', tone: 'red', side: 'right' },
        // On the timeline's waiting step before Gear Hobbing
        { x: 0.189, y: 0.783, label: '1.5 days of stock waiting', tone: 'amber', side: 'right' }
      ]
    }
  ],
  improve: [
    {
      zoom: 1.9,
      x: 0.69,
      y: 0.576,
      box: { x0: 0.819, x1: 0.991, y0: 0.437, y1: 0.699 },
      pins: [
        { x: 0.832, y: 0.459, label: 'Top finding, ranked by impact', tone: 'red', side: 'left' },
        { x: 0.904, y: 0.67, label: 'One click applies it to the future state', tone: 'violet', side: 'left' }
      ]
    },
    {
      zoom: 1.9,
      x: 0.69,
      y: 0.73,
      box: { x0: 0.819, x1: 0.991, y0: 0.711, y1: 0.989 },
      pins: [{ x: 0.832, y: 0.732, label: 'Second finding: breakdown at Gear Hobbing', tone: 'red', side: 'left' }]
    }
  ],
  fsm: [
    {
      zoom: 2.2,
      x: 0.28,
      y: 0.5,
      pins: [
        // On the timeline's 26 s under Gear Hobbing, clear of the process boxes
        { x: 0.247, y: 0.77, label: 'Gear Hobbing balanced: 31 → 26 s', tone: 'green', side: 'right' },
        { x: 0.191, y: 0.39, label: 'FIFO lane replaces push stock', tone: 'green', side: 'left' },
        { x: 0.4175, y: 0.39, label: 'Supermarket', tone: 'green', side: 'right' }
      ]
    }
  ]
};

// Right-hand explanation for each step on the landing page.
export const MAP_STEP_COPY = {
  csm: {
    word: 'Map',
    textClass: 'text-cyan-500',
    headline: 'See the line as it really runs.',
    body: 'Enter your process data once and VSM 4.0 draws the current state map: process boxes, inventory, information flow and the timeline, with takt and lead time calculated for you.',
    stats: [
      { label: 'Lead time', value: `${VSM_EXAMPLE.leadTimeDays.toFixed(1)} days` },
      { label: 'Value-add', value: `${VSM_EXAMPLE.valueAddSeconds} s` },
      { label: 'Takt', value: `${VSM_EXAMPLE.taktSeconds} s` }
    ]
  },
  improve: {
    word: 'Analyze',
    textClass: 'text-orange-500',
    headline: 'AI finds where the flow breaks.',
    body: 'Smart Improve checks every step against takt, breakdown and changeover, and ranks what to fix first. One click applies a finding to your future state.'
  },
  fsm: {
    word: 'Improve',
    textClass: 'text-emerald-500',
    headline: 'Design the leaner line.',
    body: 'Balance the bottleneck, swap push inventory for FIFO lanes and a supermarket, and VSM 4.0 recalculates the whole stream.',
    stats: [
      { label: 'Lead time', value: `${VSM_EXAMPLE.leadTimeDays} → ${VSM_EXAMPLE.fsmLeadTimeDays} days` },
      { label: 'Reduction', value: `−${pct}%` },
      { label: 'Gear Hobbing', value: '31 → 26 s' }
    ]
  }
};
