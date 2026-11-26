import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  MEANING_ONE,
  MEANING_TWO,
  NODE_STEPS,
  isSecondMeaning,
  DESIGN_VIEW_WIDTH,
  INTRO_SENTENCE,
  introMorph,
  explodeAmount,
  smooth,
  stageVisibility
} from './storyContent';
import { FABER_SHAPES } from './faberShapes';

// The VSM icon: three ringed nodes in a triangle joined by curved links.
// Positions traced from /assets/vsm-icon-black.png and centred on the origin.
const NODE_POS = [
  new THREE.Vector3(0.15, 0.75, 0), // top
  new THREE.Vector3(-0.9, -0.15, 0), // left
  new THREE.Vector3(0.72, -0.62, 0) // bottom-right
];
const LINKS = [
  [0, 1], // top-left
  [0, 2], // right
  [1, 2] // bottom
];
const RING_RADIUS = 0.26;
const RING_TUBE = 0.085;
const LINK_RADIUS = 0.055;
const CENTER = new THREE.Vector3(0, 0, 0);

// Explosion: which feature-card slot (0-5, row by row) each piece flies into.
// Pieces are [top node, left node, bottom-right node, top-left link, right link, bottom link].
const PIECE_SLOT = [1, 0, 2, 3, 5, 4];

// Logo pose per step: where the focus point sits on screen (P), zoom (s), which point of
// the logo is in focus, the tilt, and which side faces the viewer (flip: 0 VSM, π Faber).
const LEFT = [-1.6, 0.1];
const pose = (P, s, focus, rx, ry, flip = 0) => ({ P, s, focus, rx, ry, flip });
const TAU = Math.PI * 2;
const HERO_POSE = pose([1.75, 0], 0.95, CENTER, 0.15, -0.35); // logo on the right; keep in sync with HERO_LOGO_*
const POSE_BY_STEP = {
  hero: HERO_POSE,
  aboutHero: HERO_POSE,
  people: pose(LEFT, 1.0, NODE_POS[0], 0.12, 0.35),
  process: pose(LEFT, 1.0, NODE_POS[1], -0.12, 0.5),
  data: pose(LEFT, 1.0, NODE_POS[2], 0.2, 0.2),
  switch: pose([0, 0.4], 0.85, CENTER, 0.05, 0), // centred; the full spin is added below
  csm: pose(LEFT, 1.0, NODE_POS[0], 0.12, 0.35),
  improve: pose(LEFT, 1.0, NODE_POS[1], -0.12, 0.5),
  fsm: pose(LEFT, 1.0, NODE_POS[2], 0.2, 0.2),
  explode: pose([0, 0.1], 0.9, CENTER, 0, 0),
  faber: { ...HERO_POSE, ry: 0.35, flip: Math.PI } // back on the right, turned over to the Faber side
};

// A story's poses in order. From the 'switch' step on, everything carries one extra full
// turn, so the logo spins once through the "second meaning" and never spins back.
function buildPoses(story) {
  let turns = 0;
  return story.steps.map((key) => {
    if (key === 'switch') turns += 1;
    const p = POSE_BY_STEP[key];
    return { ...p, ry: p.ry + turns * TAU };
  });
}

const lerp = THREE.MathUtils.lerp;

// Intro pose: in the upper part of the screen above the statement (its bottom ring just
// touching the first line), centred on the logo's own middle, perfectly still and face-on.
const INTRO_POSE = { px: 0, py: 0.62, s: 0.82, fx: -0.09, fy: 0.065, rx: 0, ry: 0, flip: 0 };
function blendPose(a, b, f) {
  const out = {};
  for (const key in a) out[key] = lerp(a[key], b[key], f);
  return out;
}

// ---- Glass (intro) ↔ solid (story) ----
// Settings that never change; applyGlass() moves everything else with the morph.
const GLASS_FIXED = { ior: 1.3, thickness: 0.35, iridescenceIOR: 1.3, specularIntensity: 1, envMapIntensity: 0 };
const WHITE = new THREE.Color('#ffffff');
function applyGlass(mat, g, solidRoughness) {
  // Turning transmission/dispersion/iridescence fully off recompiles the shader once,
  // but saves the extra transmission render pass for the whole story.
  const on = g > 0.002;
  // Part see-through, part mirror: pure glass seen face-on reflects only a few percent,
  // which would hide the flowing colours. This mix reads as liquid chrome-glass.
  mat.transmission = on ? 0.7 * g : 0;
  mat.dispersion = on ? 5 * g : 0; // rainbow fringes where the glass bends what's behind it
  mat.iridescence = on ? 0.5 * g : 0;
  mat.clearcoat = g;
  mat.metalness = lerp(0.35, 0.5, g);
  mat.roughness = lerp(solidRoughness, 0.04, g);
  // Flowing reflections only on the glass; the solid logo keeps its original look.
  mat.envMapIntensity = 1.6 * g;
  mat.color.lerp(WHITE, g);
}

// ---- Flowing Faber-colour reflections (inspired by becomes.co) ----
// The logo itself stays still; what moves is the light on the glass. We paint a soft
// reflection map in light Faber colours (grey-teal, navy, coral) with white highlights,
// then slowly turn it so those colours drift across the glass like liquid chrome.
// Deeper Faber tones (teal, navy, coral) with one pale highlight in the mix.
const FLOW_COLORS = ['#5E7F80', '#34507E', '#C9574B', '#DDE3E8', '#6F84A3', '#D47467'];
const FLOW_SPEED = 0.22; // radians per second the reflections turn

function paintFaberEnvironment() {
  const W = 1024;
  const H = 512;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const g = c.getContext('2d');
  // Soft, bright studio base so the glass stays light.
  const base = g.createLinearGradient(0, 0, 0, H);
  base.addColorStop(0, '#B9C2CB');
  base.addColorStop(0.5, '#DDE2E7');
  base.addColorStop(1, '#A7B1BC');
  g.fillStyle = base;
  g.fillRect(0, 0, W, H);
  // Seeded random, so the pattern is the same on every visit.
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  g.filter = 'blur(18px)';
  for (let i = 0; i < 26; i++) {
    const x = rand() * W;
    const y = H * (0.2 + rand() * 0.6);
    g.globalAlpha = 0.6 + rand() * 0.4;
    g.fillStyle = FLOW_COLORS[i % FLOW_COLORS.length];
    g.beginPath();
    // Long, slanted soft streaks read as liquid reflections on the tubes.
    g.ellipse(x, y, 40 + rand() * 140, 10 + rand() * 40, (rand() - 0.5) * 0.9, 0, Math.PI * 2);
    g.fill();
  }
  // A few soft darker bands give the glass definition, like chrome.
  g.fillStyle = '#374F72'; // Faber navy
  for (let i = 0; i < 6; i++) {
    g.globalAlpha = 0.35;
    g.fillRect(rand() * W, H * (0.3 + rand() * 0.4), 30 + rand() * 60, 8 + rand() * 14);
  }
  g.globalAlpha = 1;
  g.filter = 'none';
  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Only active while the logo is (partly) glass, so nothing after the intro (the solid
// logo, the Faber side) is lit any differently than before.
function FlowingGlassEnvironment({ timeRef }) {
  const { gl, scene } = useThree();
  const env = useRef(null);
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const source = paintFaberEnvironment();
    env.current = pmrem.fromEquirectangular(source).texture;
    source.dispose();
    return () => {
      scene.environment = null;
      env.current?.dispose();
      env.current = null;
      pmrem.dispose();
    };
  }, [gl, scene]);
  useFrame((state) => {
    const glassy = introMorph(timeRef.current) < 0.998;
    const want = glassy ? env.current : null;
    if (scene.environment !== want) scene.environment = want;
    if (glassy) {
      const time = state.clock.elapsedTime;
      // Mostly a slow sideways drift, with a gentle up-and-down sway.
      scene.environmentRotation.set(Math.sin(time * 0.3) * 0.35, time * FLOW_SPEED, 0);
    }
  });
  return null;
}

// Blend between stage poses. Each stage holds around its centre, then eases to the next.
function poseAt(t, poses) {
  const u = Math.min(Math.max(t - 0.5, 0), poses.length - 1);
  const i = Math.max(0, Math.min(Math.floor(u), poses.length - 2));
  const f = poses.length > 1 ? smooth((u - i - 0.25) / 0.5) : 0;
  const a = poses[i];
  const b = poses[Math.min(i + 1, poses.length - 1)];
  return {
    px: lerp(a.P[0], b.P[0], f),
    py: lerp(a.P[1], b.P[1], f),
    s: lerp(a.s, b.s, f),
    fx: lerp(a.focus.x, b.focus.x, f),
    fy: lerp(a.focus.y, b.focus.y, f),
    rx: lerp(a.rx, b.rx, f),
    ry: lerp(a.ry, b.ry, f),
    flip: lerp(a.flip, b.flip, f)
  };
}

// Logo cross-section: a flat band with softly rounded edges (a rounded square), not a
// round tube, like the becomes.co mark. Depth is how thick the logo is front-to-back.
const BAND_DEPTH = 0.12;
const BAND_CORNER = 0.03;

// Ring: a flat annulus, extruded and bevelled so its edges round off.
function makeRingGeometry() {
  const outer = RING_RADIUS + RING_TUBE - BAND_CORNER;
  const inner = RING_RADIUS - RING_TUBE + BAND_CORNER;
  const shape = new THREE.Shape().absarc(0, 0, outer, 0, Math.PI * 2, false);
  shape.holes.push(new THREE.Path().absarc(0, 0, inner, 0, Math.PI * 2, true));
  const depth = BAND_DEPTH - 2 * BAND_CORNER;
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: BAND_CORNER,
    bevelSize: BAND_CORNER,
    bevelSegments: 5,
    curveSegments: 96
  });
  geo.translate(0, 0, -depth / 2);
  geo.computeVertexNormals();
  return geo;
}

// Link: a rounded-square profile swept along the curve (x = across, y = front-to-back).
function makeLinkGeometry(curve) {
  const w = LINK_RADIUS; // half width across the band
  const d = BAND_DEPTH / 2; // half depth
  const r = Math.min(BAND_CORNER, w * 0.6);
  const profile = new THREE.Shape();
  profile.moveTo(-w + r, -d);
  profile.lineTo(w - r, -d);
  profile.quadraticCurveTo(w, -d, w, -d + r);
  profile.lineTo(w, d - r);
  profile.quadraticCurveTo(w, d, w - r, d);
  profile.lineTo(-w + r, d);
  profile.quadraticCurveTo(-w, d, -w, d - r);
  profile.lineTo(-w, -d + r);
  profile.quadraticCurveTo(-w, -d, -w + r, -d);
  return new THREE.ExtrudeGeometry(profile, {
    steps: 80,
    bevelEnabled: false,
    curveSegments: 6,
    extrudePath: curve
  });
}

function useLogoGeometry() {
  return useMemo(() => {
    const ring = makeRingGeometry();
    const core = new THREE.SphereGeometry(RING_RADIUS * 0.55, 32, 32);
    const halo = new THREE.TorusGeometry(RING_RADIUS + RING_TUBE, 0.012, 8, 96);
    const links = LINKS.map(([a, b]) => {
      const A = NODE_POS[a];
      const B = NODE_POS[b];
      const dir = B.clone().sub(A).normalize();
      const start = A.clone().addScaledVector(dir, RING_RADIUS + RING_TUBE * 0.6);
      const end = B.clone().addScaledVector(dir, -(RING_RADIUS + RING_TUBE * 0.6));
      const mid = start.clone().add(end).multiplyScalar(0.5);
      // Bow each link slightly outward, like the brand mark.
      const control = mid.clone().addScaledVector(mid.clone().sub(CENTER).normalize(), 0.16);
      const curve = new THREE.QuadraticBezierCurve3(start, control, end);
      return { geometry: makeLinkGeometry(curve), mid };
    });
    return { ring, core, halo, links };
  }, []);
}

// ---- Faber Infinite mark (back of the logo) ----
// Built from outlines traced off the real logo (see faberShapes.js): each blade is a
// lobe plus a thin crescent, and where two blades cross the logo uses its own darker
// colour. Those overlap pieces are slightly thicker so they cover both blades exactly.
const FABER_PARTS = [
  { key: 'gray', color: '#8BA8A8', overlap: false },
  { key: 'navy', color: '#374F72', overlap: false },
  { key: 'red', color: '#D94438', overlap: false },
  { key: 'gray_red', color: '#843A3B', overlap: true },
  { key: 'gray_navy', color: '#274351', overlap: true },
  { key: 'navy_red', color: '#403835', overlap: true }
];
const FABER_DEPTH = 0.07;
// The small ° ring at the mark's upper right, measured from logo.jpeg in the same
// [-1, 1] frame as FABER_SHAPES (centre 1.028, 0.869; outer radius 0.207, inner 0.103).
// Pulled in and slimmed a touch: the hero tilt brings this corner nearer the camera,
// which made the exact values read larger and further out than in the flat logo.
const FABER_RING = { x: 0.95, y: 0.94, radius: 0.14, tube: 0.045, color: '#D94438' };
const FABER_SETTLE_SECONDS = 1.1;
const FABER_SETTLE_ANGLE = 0.35; // radians: a light swing, not a spin

// Size and place the Faber mark over the same area the VSM logo covers
// (the VSM rings' bounding box), so the two sides of the flip match.
const VSM_EXTENT = (() => {
  const r = RING_RADIUS + RING_TUBE;
  const xs = NODE_POS.map((p) => p.x);
  const ys = NODE_POS.map((p) => p.y);
  const minX = Math.min(...xs) - r;
  const maxX = Math.max(...xs) + r;
  const minY = Math.min(...ys) - r;
  const maxY = Math.max(...ys) + r;
  return { cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, w: maxX - minX, h: maxY - minY };
})();
// Faber outlines fit [-1, 1]; scale them to the average of the VSM logo's width and height.
// The optical nudges below come from measuring both sides on screen: the round Faber mark
// read ~4% smaller and ~0.2 units higher than the triangular VSM logo.
const FABER_SCALE = ((VSM_EXTENT.w + VSM_EXTENT.h) / 4) * 1.04;
const FABER_Y = VSM_EXTENT.cy - 0.2;

// Smooth a traced polygon into a curved THREE.Shape outline.
function smoothShape(points, holes = []) {
  const curve = (pts) =>
    new THREE.CatmullRomCurve3(
      pts.map(([x, y]) => new THREE.Vector3(x, y, 0)),
      true,
      'centripetal'
    )
      .getPoints(pts.length * 6)
      .map((p) => new THREE.Vector2(p.x, p.y));
  const shape = new THREE.Shape(curve(points));
  holes.forEach((h) => shape.holes.push(new THREE.Path(curve(h))));
  return shape;
}

function useFaberGeometry() {
  return useMemo(
    () =>
      FABER_PARTS.map((part) => {
        const shapes = FABER_SHAPES[part.key].map((s) => smoothShape(s.outer, s.holes));
        // Overlaps are a hair thicker so they cover the coplanar blades underneath.
        const depth = FABER_DEPTH + (part.overlap ? 0.008 : 0);
        const geo = new THREE.ExtrudeGeometry(shapes, {
          depth,
          bevelEnabled: true,
          bevelThickness: 0.012,
          bevelSize: 0.008,
          bevelSegments: 3,
          curveSegments: 12
        });
        geo.translate(0, 0, -depth / 2);
        return geo;
      }),
    []
  );
}

const FaberMark = React.forwardRef(function FaberMark(_, spinRef) {
  const geometries = useFaberGeometry();
  const mats = useMemo(
    () =>
      FABER_PARTS.map(
        (p) =>
          new THREE.MeshStandardMaterial({
            color: p.color,
            // A little self-light keeps the brand colours true under the scene lights.
            emissive: p.color,
            emissiveIntensity: 0.28,
            metalness: 0.05,
            roughness: 0.55,
            envMapIntensity: 0 // the studio reflections are for the glass intro only
          })
      ),
    []
  );
  return (
    // Sits on the back of the flip group, so it faces the viewer once flipped.
        // Seen after a 180° flip, x is mirrored, so -cx lands on the VSM logo's centre.
    <group rotation={[0, Math.PI, 0]} scale={FABER_SCALE} position={[-VSM_EXTENT.cx, FABER_Y, 0]}>
      <group ref={spinRef}>
        {FABER_PARTS.map((p, i) => (
          <mesh key={p.key} geometry={geometries[i]} material={mats[i]} />
        ))}
        <mesh position={[FABER_RING.x, FABER_RING.y, 0]}>
          <torusGeometry args={[FABER_RING.radius, FABER_RING.tube, 24, 64]} />
          <meshStandardMaterial
            color={FABER_RING.color}
            emissive={FABER_RING.color}
            emissiveIntensity={0.28}
            metalness={0.05}
            roughness={0.55}
            envMapIntensity={0}
          />
        </mesh>
      </group>
    </group>
  );
});

function Logo({ story, timeRef, dark, cardSlotsRef }) {
  const { ring, core, halo, links } = useLogoGeometry();
  const poses = useMemo(() => buildPoses(story), [story]);

  // Node highlights: for each logo node, the steps that put it in focus.
  const nodeSteps = useMemo(
    () =>
      NODE_POS.map((_, node) =>
        story.steps.map((key, i) => (NODE_STEPS[key]?.node === node ? i : -1)).filter((i) => i >= 0)
      ),
    [story]
  );
  // Node labels show from the first node step to the last one.
  const labelWindow = useMemo(() => {
    const idx = story.steps.map((key, i) => (NODE_STEPS[key] ? i : -1)).filter((i) => i >= 0);
    return idx.length ? [idx[0], idx[idx.length - 1]] : null;
  }, [story]);

  const outer = useRef();
  const rot = useRef();
  const flip = useRef();
  const vsmSide = useRef();
  const faberSide = useRef();
  const showingFaber = useRef(false);
  const faberSpin = useRef();
  const faberSpinStart = useRef(-Infinity);
  const offset = useRef();
  const nodeRefs = useRef([]);
  const coreRefs = useRef([]);
  const haloRefs = useRef([]);
  const linkRefs = useRef([]);
  const labelRefs = useRef([]);
  const smoothT = useRef(timeRef.current);
  const lastMeaning = useRef(-1);

  const base = useMemo(() => new THREE.Color(dark ? '#f5f5f5' : '#111111'), [dark]);

  // One material per piece so each can light up / fade on its own. Physical materials so the
  // same logo can be clear glass in the intro and solid in the story (see applyGlass).
  const nodeMats = useMemo(
    () =>
      NODE_POS.map(
        () =>
          new THREE.MeshPhysicalMaterial({ color: base, metalness: 0.35, roughness: 0.3, transparent: true, ...GLASS_FIXED })
      ),
    [base]
  );
  const coreMats = useMemo(
    () =>
      NODE_POS.map(
        () =>
          new THREE.MeshStandardMaterial({
            color: '#ffffff',
            emissive: '#ffffff',
            emissiveIntensity: 1,
            transparent: true,
            opacity: 0,
            // Never block what's behind it: with depthWrite on, the (invisible) core hid the
            // inside wall of each ring and showed up as white spots in the holes.
            depthWrite: false
          })
      ),
    []
  );
  const haloMats = useMemo(
    () => NODE_POS.map(() => new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })),
    []
  );
  const linkMats = useMemo(
    () =>
      links.map(
        () =>
          new THREE.MeshPhysicalMaterial({ color: base, metalness: 0.35, roughness: 0.35, transparent: true, ...GLASS_FIXED })
      ),
    [links, base]
  );

  // Resting place of every piece, and how it tumbles on the way to its card.
  const pieces = useMemo(
    () =>
      [...NODE_POS, ...links.map((l) => l.mid)].map((home, i) => ({
        home,
        // Whole turns on y, so each piece lands facing the viewer.
        spin: new THREE.Vector3((i % 2 ? 1 : -1) * 0.6, (i % 2 ? -1 : 1) * TAU, ((i % 3) - 1) * 0.8)
      })),
    [links]
  );

  const tmpColor = useMemo(() => new THREE.Color(), []);
  const targets = useMemo(() => pieces.map(() => new THREE.Vector3()), [pieces]);
  const tmpWorld = useMemo(() => new THREE.Vector3(), []);

  // Centre of each feature-card slot, converted from screen pixels into logo space.
  const updateTargets = (state) => {
    const slots = cardSlotsRef?.current;
    const rect = state.gl.domElement.getBoundingClientRect();
    const { width, height } = state.viewport;
    outer.current.updateMatrixWorld(true);
    pieces.forEach((piece, i) => {
      const cell = slots?.[PIECE_SLOT[i]];
      if (!cell || !rect.width) {
        targets[i].copy(piece.home).multiplyScalar(4);
        return;
      }
      const r = cell.getBoundingClientRect();
      const nx = (r.left + r.width / 2 - rect.left) / rect.width;
      const ny = (r.top + r.height / 2 - rect.top) / rect.height;
      tmpWorld.set((nx - 0.5) * width, (0.5 - ny) * height, 0);
      targets[i].copy(offset.current.worldToLocal(tmpWorld));
    });
  };

  useFrame((state, dt) => {
    const k = 1 - Math.exp(-dt * 7);
    smoothT.current = lerp(smoothT.current, timeRef.current, k);
    const t = smoothT.current;
    // Intro → hero: blend from the still, centred glass pose into the story's poses.
    const m = introMorph(t, story);
    const p = blendPose(INTRO_POSE, poseAt(t, poses), m);
    const idle = state.clock.elapsedTime;
    // The gentle idle drift only starts once the logo has left the (still) intro.
    const drift = m;

    // Poses are laid out for a ~16:9 canvas; spread / shrink them for other shapes.
    const spread = state.viewport.width / DESIGN_VIEW_WIDTH;
    outer.current.position.set(p.px * spread, p.py + Math.sin(idle * 0.8) * 0.04 * drift, 0);
    outer.current.scale.setScalar(p.s * Math.min(1, spread));
    rot.current.rotation.set(
      p.rx + Math.sin(idle * 0.5) * 0.05 * drift,
      p.ry + Math.sin(idle * 0.4) * 0.08 * drift,
      0
    );
    offset.current.position.set(-p.fx, -p.fy, 0);
    const glass = 1 - m;

    // Turning over to the Faber side is part of the story (the About page's last step).
    flip.current.rotation.y = p.flip;
    const faber = Math.cos(p.flip) < 0;
    vsmSide.current.visible = !faber;
    faberSide.current.visible = faber;
    if (faber !== showingFaber.current) {
      showingFaber.current = faber;
      if (faber) faberSpinStart.current = idle;
    }
    // Gentle settle after the flip: a small swing that eases out to face the front.
    if (faberSpin.current) {
      const s = Math.min(1, (idle - faberSpinStart.current) / FABER_SETTLE_SECONDS);
      faberSpin.current.rotation.y = FABER_SETTLE_ANGLE * Math.pow(1 - s, 3);
    }

    const e = explodeAmount(t, story);
    if (e > 0.001) updateTargets(state);
    const second = isSecondMeaning(story, t);
    const meaning = second ? MEANING_TWO : MEANING_ONE;

    // Swap the node labels halfway through the spin.
    // (Html labels mount asynchronously, so wait until all three exist.)
    if (lastMeaning.current !== (second ? 1 : 0) && labelRefs.current.filter(Boolean).length === 3) {
      lastMeaning.current = second ? 1 : 0;
      labelRefs.current.forEach((el, i) => {
        el.textContent = meaning[i].word;
        el.style.color = meaning[i].color;
        el.style.borderColor = `${meaning[i].color}55`;
      });
    }

    const labelsOn = labelWindow
      ? smooth((t - (labelWindow[0] - 0.25)) / 0.4) * (1 - smooth((t - (labelWindow[1] + 0.9)) / 0.3))
      : 0;
    // Pieces stay solid while flying, then dissolve as their card appears.
    const fade = 1 - smooth((e - 0.45) / 0.3);

    // Move piece i from its place in the logo to its card slot.
    const fly = (obj, i, baseScale) => {
      const f = smooth((e - i * 0.04) / 0.6);
      const piece = pieces[i];
      obj.position.copy(piece.home).lerp(targets[i], f);
      obj.position.z += Math.sin(f * Math.PI) * 1.2; // arc towards the viewer
      obj.rotation.set(piece.spin.x * f, piece.spin.y * f, piece.spin.z * f);
      obj.scale.setScalar(baseScale * lerp(1, 0.45, f));
    };

    NODE_POS.forEach((_, i) => {
      const h = nodeSteps[i].reduce((best, step) => Math.max(best, stageVisibility(t, step)), 0);
      const accent = meaning[i].color;

      const mat = nodeMats[i];
      mat.color.copy(base).lerp(tmpColor.set(accent), h);
      mat.emissive.set(accent);
      mat.emissiveIntensity = h * 0.45;
      mat.opacity = fade;
      applyGlass(mat, glass, 0.3);

      const cm = coreMats[i];
      cm.color.set(accent);
      cm.emissive.set(accent);
      cm.opacity = h * 0.9 * fade;
      coreRefs.current[i].visible = cm.opacity > 0.01; // only exists while the node is lit
      coreRefs.current[i].scale.setScalar(0.6 + h * 0.4 + Math.sin(idle * 3) * 0.04 * h);

      // Ripple ring that pulses out from the active node.
      const phase = (idle * 0.7) % 1;
      haloMats[i].color.set(accent);
      haloMats[i].opacity = h * (1 - phase) * 0.55 * fade;
      haloRefs.current[i].scale.setScalar(1 + phase * 1.1);
      haloRefs.current[i].visible = haloMats[i].opacity > 0.01;

      fly(nodeRefs.current[i], i, 1 + h * 0.18);

      const label = labelRefs.current[i];
      if (label) {
        label.style.opacity = String(labelsOn * (0.4 + 0.6 * h));
        label.style.transform = `scale(${0.85 + h * 0.3})`;
      }
    });

    links.forEach((_, i) => {
      fly(linkRefs.current[i], NODE_POS.length + i, 1);
      linkMats[i].color.copy(base);
      linkMats[i].opacity = fade;
      applyGlass(linkMats[i], glass, 0.35);
    });
  });

  return (
    <group ref={outer}>
      <group ref={rot}>
        <group ref={flip}>
        <group ref={faberSide} visible={false}>
          <FaberMark ref={faberSpin} />
        </group>
        <group ref={vsmSide}>
        <group ref={offset}>
          {NODE_POS.map((pos, i) => (
            <group key={`node-${i}`} ref={(el) => (nodeRefs.current[i] = el)} position={pos}>
              <mesh geometry={ring} material={nodeMats[i]} />
              <mesh ref={(el) => (coreRefs.current[i] = el)} geometry={core} material={coreMats[i]} />
              <mesh ref={(el) => (haloRefs.current[i] = el)} geometry={halo} material={haloMats[i]} />
              <Html
                center
                position={[0, i === 0 ? 0.62 : -0.62, 0]}
                zIndexRange={[5, 0]}
                style={{ pointerEvents: 'none' }}
              >
                <div
                  ref={(el) => (labelRefs.current[i] = el)}
                  className="font-sans font-bold text-[19px] tracking-tight whitespace-nowrap px-3.5 py-1 rounded-full border bg-white/85 dark:bg-black/60 backdrop-blur-md shadow-sm transition-colors duration-300"
                  style={{ opacity: 0, color: MEANING_ONE[i].color, borderColor: `${MEANING_ONE[i].color}55` }}
                >
                  {MEANING_ONE[i].word}
                </div>
              </Html>
            </group>
          ))}
          {links.map((link, i) => (
            // Geometry is built in logo space, so offset it back by the midpoint
            // and let the parent sit at the midpoint (gives a sensible pivot).
            <group key={`link-${i}`} ref={(el) => (linkRefs.current[i] = el)} position={link.mid}>
              <mesh geometry={link.geometry} material={linkMats[i]} position={link.mid.clone().negate()} />
            </group>
          ))}
        </group>
        </group>
        </group>
      </group>
    </group>
  );
}

// The intro statement, drawn into the 3D scene (not HTML) so the glass logo can refract it.
// It's painted with the page's own font onto a full-screen plane behind the logo.
const BACKDROP_Z = -1;
function IntroBackdrop({ timeRef, dark }) {
  const mesh = useRef();
  const mat = useRef();
  const smoothT = useRef(timeRef.current);
  const { size, camera, viewport } = useThree();
  const vp = viewport.getCurrentViewport(camera, [0, 0, BACKDROP_Z]);
  const bg = dark ? '#0D0D0D' : '#FFFFFF';
  const bgColor = useMemo(() => new THREE.Color(bg), [bg]);
  const texture = useMemo(() => {
    const tex = new THREE.CanvasTexture(document.createElement('canvas'));
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useEffect(() => {
    let cancelled = false;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = Math.round(size.width * dpr);
    const H = Math.round(size.height * dpr);
    // Sized to fit under the logo: a little smaller than the hero headline.
    const fontPx = Math.round(Math.min(Math.max(Math.min(size.width * 0.04, size.height * 0.075), 34), 76) * dpr);
    const font = `800 ${fontPx}px Geist, Inter, system-ui, sans-serif`;
    const draw = () => {
      if (cancelled || !W || !H) return;
      const c = texture.image;
      c.width = W;
      c.height = H;
      const g = c.getContext('2d');
      g.fillStyle = bg;
      g.fillRect(0, 0, W, H);
      g.font = font;
      g.fillStyle = dark ? '#FFFFFF' : '#000000';
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      if ('letterSpacing' in g) g.letterSpacing = `${-0.035 * fontPx}px`; // matches the hero's tracking
      const maxW = Math.min(W * 0.74, fontPx * 13);
      const lines = [];
      let line = '';
      for (const word of INTRO_SENTENCE.split(' ')) {
        const test = line ? `${line} ${word}` : word;
        if (line && g.measureText(test).width > maxW) {
          lines.push(line);
          line = word;
        } else line = test;
      }
      if (line) lines.push(line);
      const lh = fontPx * 1.08;
      // Text block starts just under the logo (logo occupies roughly the top half).
      const y0 = H * 0.6 + lh / 2;
      lines.forEach((l, i) => g.fillText(l, W / 2, y0 + i * lh));
      texture.needsUpdate = true;
    };
    // Draw right away, then again once the web font is ready (never block on it).
    draw();
    document.fonts?.load(font).then(draw, () => {});
    return () => {
      cancelled = true;
    };
  }, [size.width, size.height, dark, bg, texture]);

  useFrame((state, dt) => {
    smoothT.current = lerp(smoothT.current, timeRef.current, 1 - Math.exp(-dt * 7));
    const m = introMorph(smoothT.current);
    // While the logo is (partly) glass, give the scene a solid background so the
    // refraction always has something to sample, even as the text fades out.
    state.scene.background = m < 0.998 ? bgColor : null;
    mesh.current.visible = m < 0.998;
    const wantTransparent = m > 0.001; // opaque while still, so the glass refracts it
    if (mat.current.transparent !== wantTransparent) {
      mat.current.transparent = wantTransparent;
      mat.current.needsUpdate = true;
    }
    mat.current.opacity = 1 - m;
  });

  return (
    <mesh ref={mesh} position={[0, 0, BACKDROP_Z]}>
      <planeGeometry args={[vp.width, vp.height]} />
      <meshBasicMaterial ref={mat} map={texture} toneMapped={false} />
    </mesh>
  );
}

export const LogoScene = React.memo(function LogoScene({ story, timeRef, dark, active, cardSlotsRef }) {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, 6], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      {story.intro && (
        <>
          <FlowingGlassEnvironment timeRef={timeRef} />
          <IntroBackdrop timeRef={timeRef} dark={dark} />
        </>
      )}
      <ambientLight intensity={dark ? 0.5 : 0.8} />
      <directionalLight position={[3, 4, 5]} intensity={dark ? 1.6 : 2.2} />
      <directionalLight position={[-4, -2, 3]} intensity={0.6} />
      <pointLight position={[0, 0, 3]} intensity={dark ? 6 : 3} distance={8} />
      <Logo story={story} timeRef={timeRef} dark={dark} cardSlotsRef={cardSlotsRef} />
    </Canvas>
  );
});

export default LogoScene;
