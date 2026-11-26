// Copy + timelines for the 3D scroll stories. Placeholder copy: edit freely.
//
// Each page tells its own story as an ordered list of steps. Step i occupies the timeline
// range [i, i + 1] (roughly one screen of scroll); the 3D logo's pose, highlights and the
// HTML panels all follow the list, so pages can reuse steps in any order.
//   landing: the product — what VSM 4.0 does.
//   about:   the brand — what the logo means, and who builds it.
export const STORIES = {
  landing: {
    intro: true, // glass-logo statement before the hero
    steps: ['hero', 'csm', 'improve', 'fsm', 'explode']
  },
  about: {
    intro: false,
    steps: ['aboutHero', 'people', 'process', 'data', 'switch', 'csm', 'improve', 'fsm', 'faber']
  }
};

// Timeline helpers for a story.
export const stepIndex = (story, key) => story.steps.indexOf(key);
export const storyLength = (story) => story.steps.length + 0.4; // last 0.4 holds the final step
export const storyStart = (story) => (story.intro ? -INTRO_LENGTH : 0);

// Kept for the hero's special fade-in at the start of every story.
export const STAGES = { HERO: 0 };

// Intro before the hero: a big statement with the logo in front of it as clear glass.
// It lives at negative timeline positions (-INTRO_LENGTH .. 0), so every stage above keeps its number.
export const INTRO_LENGTH = 1;
export const INTRO_SENTENCE = 'VSM 4.0 is the smarter way to map, analyze and improve every value stream.';

// 0 while the intro holds, 1 once the glass logo has become the black hero logo.
// Stories without an intro are always fully "morphed".
export const introMorph = (t, story) => (story && !story.intro ? 1 : smooth((t + 0.75) / 0.65));

// First meaning: what VSM connects. node = which of the 3 logo nodes it lives on.
export const MEANING_ONE = [
  {
    key: 'people',
    node: 0,
    word: 'People',
    color: '#10b981',
    textClass: 'text-emerald-500',
    headline: 'The team who knows the floor.',
    body: 'Operators, engineers and leaders map together, so the map shows how work really happens, not how the SOP says it should.'
  },
  {
    key: 'process',
    node: 1,
    word: 'Process',
    color: '#f59e0b',
    textClass: 'text-amber-500',
    headline: 'Every step, end to end.',
    body: 'Each station, handoff and queue from supplier to customer, laid out as one connected value stream.'
  },
  {
    key: 'data',
    node: 2,
    word: 'Data',
    color: '#0ea5e9',
    textClass: 'text-sky-500',
    headline: 'Numbers, not guesses.',
    body: 'Cycle time, takt, WIP, uptime and lead time, entered once and calculated live across the whole map.'
  }
];

// Second meaning: how VSM 4.0 moves you forward.
export const MEANING_TWO = [
  {
    key: 'csm',
    image: '/assets/vsm-csm-preview.png', // real app screen shown on the landing page
    node: 0,
    word: 'CSM',
    color: '#06b6d4',
    textClass: 'text-cyan-500',
    headline: 'Current State Map.',
    body: 'See today’s flow as it is: where value is added, where material waits, and how long it really takes.'
  },
  {
    key: 'improve',
    image: '/assets/vsm-smart-improve-preview.png', // real app screen shown on the landing page
    node: 1,
    word: 'Improve',
    color: '#f97316',
    textClass: 'text-orange-500',
    headline: 'Smart Improve.',
    body: 'Compare every step against takt, flag the bottlenecks and rank what to fix first by impact.'
  },
  {
    key: 'fsm',
    image: '/assets/vsm-fsm-preview.png', // real app screen shown on the landing page
    node: 2,
    word: 'FSM',
    color: '#8b5cf6',
    textClass: 'text-violet-500',
    headline: 'Future State Map.',
    body: 'Design the leaner flow with supermarkets, FIFO lanes and pull loops, and plan the Kaizen to get there.'
  }
];

export const STORY_NODES = [...MEANING_ONE, ...MEANING_TWO];
// Node steps by key ('people', 'csm', …).
export const NODE_STEPS = Object.fromEntries(STORY_NODES.map((n) => [n.key, n]));

// Which label set the logo shows at time t: People/Process/Data until the story's
// "second meaning" spin, CSM/Improve/FSM after it (or throughout, if there is no spin).
export const isSecondMeaning = (story, t) => {
  const sw = stepIndex(story, 'switch');
  return sw < 0 ? true : t >= sw + 0.5;
};

// Feature cards the logo explodes into.
export const STORY_FEATURES = [
  {
    id: 'canvas',
    icon: 'Compass',
    tag: 'Digital Canvas',
    title: 'Auto-drawn VSM canvas',
    body: 'Enter process data once and the map draws itself with standard Lean symbols.'
  },
  {
    id: 'takt',
    icon: 'Activity',
    tag: 'Takt & Cycle Time',
    title: 'Bottleneck analysis',
    body: 'Every step checked against takt, with bottlenecks ranked by impact.'
  },
  {
    id: 'planner',
    icon: 'Sparkles',
    tag: 'Future State Planner',
    title: 'Smart improvement planning',
    body: 'Add supermarkets, FIFO lanes and pull loops, then generate the future state.'
  },
  {
    id: 'compare',
    icon: 'BarChart3',
    tag: 'Before & After',
    title: 'Current vs future comparison',
    body: 'Lead time, value-add time, PCE and cost side by side.'
  },
  {
    id: 'reports',
    icon: 'FileText',
    tag: 'Exports',
    title: 'Professional reports',
    body: 'PDF reports and Excel data ready for Kaizen reviews.'
  },
  {
    id: 'teams',
    icon: 'Users',
    tag: 'Collaboration',
    title: 'Teams & organizations',
    body: 'Admin, Editor and Viewer roles with live updates while you edit together.'
  }
];

// ---- 3D layout shared with the HTML overlay ----
// Canvas width (world units at z=0, camera fov 35 at distance 6) the logo poses are designed for.
export const DESIGN_VIEW_WIDTH = 6.8;
export const HERO_LOGO_X = 1.75; // hero pose x in LogoScene POSES[0]
export const HERO_LOGO_SCALE = 0.95; // hero pose zoom in LogoScene POSES[0]
const VIEW_HEIGHT = 2 * 6 * Math.tan((35 / 2) * (Math.PI / 180));

// Where the hero logo sits on screen, as fractions of the canvas width.
export function heroLogoAnchor(canvasWidth, canvasHeight) {
  const vw = VIEW_HEIGHT * (canvasWidth / Math.max(1, canvasHeight));
  const k = vw / DESIGN_VIEW_WIDTH;
  const center = 0.5 + (HERO_LOGO_X * k) / vw;
  // Just past the logo's right edge (both the VSM and Faber sides reach ~1.07 units out).
  const side = 0.5 + (HERO_LOGO_X * k + 1.12 * HERO_LOGO_SCALE * Math.min(1, k)) / vw;
  return { center, side };
}

// ---- timeline helpers (shared by the 3D scene and the HTML overlay) ----

export const clamp01 = (v) => Math.min(1, Math.max(0, v));
export const smooth = (v) => {
  const x = clamp01(v);
  return x * x * (3 - 2 * x);
};

// How visible stage i is at timeline position t (1 = fully on screen).
export const stageVisibility = (t, i) => {
  // The hero fades in at the end of the intro, then holds until it scrolls on.
  if (i === STAGES.HERO && t < 0.5) return smooth((t + 0.4) / 0.35);
  const d = Math.abs(t - (i + 0.5));
  return 1 - clamp01((d - 0.28) / 0.22);
};

// Explosion / card assembly amount (0 → logo intact, 1 → cards in place).
// Only stories with an 'explode' step break the logo apart.
export const explodeAmount = (t, story) => {
  const i = stepIndex(story, 'explode');
  return i < 0 ? 0 : smooth((t - (i + 0.05)) / 0.85);
};
