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
    map: true, // CSM / Improve / FSM show the real product screens instead of the logo
    heroFlip: true, // visitors can drag/click the hero logo over to the Faber Infinite side
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

// Feature cards the logo explodes into. Every card is a feature that ships in the VSM 4.0 app
// (checked against the app's code), not a roadmap item.
export const STORY_FEATURES = [
  {
    id: 'builder',
    icon: 'Table2',
    tag: 'Process Builder',
    title: 'Import steps from Excel',
    body: 'Bring in process steps with cycle time, changeover, OEE, rework, rejection and inventory, or build them by hand.'
  },
  {
    id: 'canvas',
    icon: 'Workflow',
    tag: 'Auto-drawn maps',
    title: 'The map draws itself',
    body: 'Enter the data once and the CSM appears with standard Lean symbols, lead time and value-add time.'
  },
  {
    id: 'levels',
    icon: 'Layers',
    tag: 'Three map levels',
    title: 'Process, Facility, Extended',
    body: 'Map one line, a whole plant, or the chain from supplier to customer, each with its own CSM and FSM.'
  },
  {
    id: 'improve',
    icon: 'Sparkles',
    tag: 'Smart Improve',
    title: 'Rules plus AI recommendations',
    body: 'Every step checked against takt, balance loss and yield, and AI reads your floor notes. Client names never leave.'
  },
  {
    id: 'exports',
    icon: 'FileText',
    tag: 'Exports',
    title: 'PDF, SVG and Excel',
    body: 'Multi-page PDF maps with print preview, SVG for slides, and an Excel summary sheet of improvements.'
  },
  {
    id: 'teams',
    icon: 'Users',
    tag: 'Collaboration',
    title: 'Roles and edit locks',
    body: 'Admin, Editor and Viewer roles. One editor at a time per value stream, and everyone else sees changes live.'
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

// ---- Product screens (stories with `map: true`) ----
// How much of the screen card is on screen: it takes over from the logo as the CSM step
// arrives and hands back to the logo after FSM (just before it bursts into the feature cards).
export const mapVisibility = (t, story) => {
  if (!story.map) return 0;
  const first = stepIndex(story, 'csm');
  const last = stepIndex(story, 'fsm');
  return smooth((t - first) / 0.4) * (1 - smooth((t - (last + 0.72)) / 0.33));
};
// 0 → 1 as the Improve step (AI highlights) and the FSM step (future state) arrive.
export const improveAmount = (t, story) => smooth((t - (stepIndex(story, 'improve') + 0.05)) / 0.4);
export const fsmAmount = (t, story) => smooth((t - (stepIndex(story, 'fsm') + 0.05)) / 0.4);

// Explosion / card assembly amount (0 → logo intact, 1 → cards in place).
// Only stories with an 'explode' step break the logo apart.
export const explodeAmount = (t, story) => {
  const i = stepIndex(story, 'explode');
  return i < 0 ? 0 : smooth((t - (i + 0.05)) / 0.85);
};
