import { useEffect, useRef, useState } from "react";

import { dot, fill, isoPoint } from "./iso";
import IsoBox from "./IsoBox";
import IsoPyramid from "./IsoPyramid";
import IsoScene from "./IsoScene";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

// Chapter 1: London, Borneo and Canada as three islands, a dotted flight path
// London → Borneo → Canada → London, and a plane that loops it until paused.
// 13 shapes: floor, 3 islands, London skyline, beacon (neon), Borneo tree
// (trunk + canopy), CN Tower (shaft, pod, spire), Canada pine, flight path
// (neon), plane.

// Layout: London on the left, Borneo on the right, Canada at the back.
// The plane waits beside each landmark, never over it, and the route bends
// once (the unnamed point) so the Canada → London leg passes in front of the
// CN Tower instead of through it. No leg crosses the skyline or the tower.
// Low enough that each stop reads as beside its island, not floating above the scene.
const FLIGHT_HEIGHT = 2;
const ROUTE = [
  [6.5, 12.5], // London: over the island, right of the skyline
  [10.5, 5.5], // Borneo: over the island, left of the tree
  [6.5, 4], // Canada: right of the CN Tower
  [7.5, 7.5], // swing out in front of the CN Tower
  [6.5, 12.5], // back to London
];
const TURN = 0.025; // share of each loop spent turning at a point
const LOOP_MS = 9000;

// London skyline: blocks of different heights, packed into the island's back
// corner, listed back to front.
const SKYLINE = [
  { tone: "lilac", x: 0.8, y: 8.3, w: 1.2, d: 1.2, h: 2.4 },
  { tone: "sky", x: 2.2, y: 8.3, w: 1.3, d: 1.3, h: 3.8 },
  { tone: "pink", x: 0.9, y: 9.9, w: 1.3, d: 1.3, h: 1.6 },
  { tone: "cream", x: 2.6, y: 10, w: 0.9, d: 1, h: 2 },
  { tone: "lemon", x: 1.2, y: 11.4, w: 1.4, d: 1.3, h: 2.8 },
];
const ISLAND_TOP = 0.8;

function pathDots() {
  const dots = [];
  for (let i = 0; i < ROUTE.length - 1; i++) {
    const [x0, y0] = ROUTE[i];
    const [x1, y1] = ROUTE[i + 1];
    const steps = Math.round(Math.hypot(x1 - x0, y1 - y0) / 0.9);
    for (let s = 1; s < steps; s++) {
      dots.push([x0 + ((x1 - x0) * s) / steps, y0 + ((y1 - y0) * s) / steps]);
    }
  }
  return dots;
}

// Plane pose for a leg: position plus a rotation that keeps it upright,
// mirroring the plane when it flies leftwards.
function pose([x, y], [dx, dy]) {
  const [px, py] = isoPoint(x, y, FLIGHT_HEIGHT);
  const left = dx < 0;
  const angle = (Math.atan2(dy, left ? -dx : dx) * 180) / Math.PI;
  return `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px) rotate(${(left ? -angle : angle).toFixed(1)}deg) scale(${left ? -1 : 1}, 1)`;
}

// One loop: fly each leg, turning briefly at each point, ending turned
// back towards Borneo so the next loop starts smoothly.
function flightKeyframes() {
  const screen = ROUTE.map(([x, y]) => isoPoint(x, y, FLIGHT_HEIGHT));
  const legs = screen.slice(1).map(([x, y], i) => [x - screen[i][0], y - screen[i][1]]);
  const total = legs.reduce((sum, leg) => sum + Math.hypot(...leg), 0);
  const moving = 1 - TURN * legs.length;

  const frames = [];
  let offset = 0;
  legs.forEach((leg, i) => {
    if (i > 0) offset += TURN;
    frames.push({ offset, transform: pose(ROUTE[i], leg) });
    offset += (Math.hypot(...leg) / total) * moving;
    frames.push({ offset, transform: pose(ROUTE[i + 1], leg) });
  });
  frames.push({ offset: 1, transform: pose(ROUTE[0], legs[0]) });
  return frames;
}

const DOTS = pathDots();
const FRAMES = flightKeyframes();
const IN_LONDON = FRAMES[0].transform;

function Plane({ planeRef }) {
  return (
    <g ref={planeRef} style={{ transform: IN_LONDON }}>
      <polygon points="0,-1 -5,-9 -8,-9 -4,-1" style={fill("sky-3")} />
      <polygon points="-10,-2.5 6,-3 10,0 6,3 -10,2.5" style={fill("sky-1")} />
      <polygon points="0,1 -5,9 -8,9 -4,1" style={fill("sky-2")} />
      <polygon points="-10,-2 -13,-7 -11,-7 -7,-2" style={fill("pink-2")} />
    </g>
  );
}

export default function Journey() {
  const planeRef = useRef(null);
  const flightRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(true);

  // Loop the flight. Under reduced motion it never starts: the plane waits in London.
  useEffect(() => {
    const plane = planeRef.current;
    if (!plane?.animate || reduced) return undefined;
    const flight = plane.animate(FRAMES, {
      duration: LOOP_MS,
      delay: 500,
      iterations: Infinity,
      easing: "linear",
      fill: "backwards",
    });
    flightRef.current = flight;
    return () => {
      flight.cancel();
      flightRef.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    const flight = flightRef.current;
    if (!flight) return;
    if (playing) flight.play();
    else flight.pause();
  }, [playing, reduced]);

  return (
    <>
      <IsoScene title="Three islands joined by a dotted flight path: London as a small city skyline with a glowing beacon, Borneo with a tree, and Canada with the CN Tower and a pine tree. A little plane loops from London to Borneo, on to Canada and back to London.">
        {(glow) => (
          <>
            {/* London: island and skyline, with a beacon on the tallest block */}
            {/* Canada (back): island, CN Tower (shaft, pod two-thirds up, spire) and a pine */}
            <IsoBox tone="mint" x={1} y={1} w={5} d={5} h={ISLAND_TOP} />
            <IsoBox tone="cream" x={3.15} y={3.15} z={ISLAND_TOP} w={0.5} d={0.5} h={8} />
            <IsoBox tone="sky" x={2.8} y={2.8} z={ISLAND_TOP + 5.4} w={1.2} d={1.2} h={0.7} />
            <IsoBox tone="cream" x={3.3} y={3.3} z={ISLAND_TOP + 8} w={0.2} d={0.2} h={1.5} />
            <IsoPyramid tone="leaf" x={1.4} y={4.2} z={ISLAND_TOP} w={1.4} d={1.4} h={2.4} />

            {/* Borneo (right): sandy island and a tree */}
            <IsoBox tone="lemon" x={10} y={1} w={5} d={5} h={ISLAND_TOP} />
            <IsoBox tone="wood" x={12.2} y={3.2} z={ISLAND_TOP} w={0.6} d={0.6} h={1.6} />
            <IsoBox tone="leaf" x={11.5} y={2.5} z={ISLAND_TOP + 1.6} w={2} d={2} h={2} />

            {/* London (left): island and skyline, with a beacon on the tallest block */}
            <IsoBox tone="peach" x={0.5} y={8} w={5.5} d={5.5} h={ISLAND_TOP} />
            {SKYLINE.map(({ tone, ...block }) => (
              <IsoBox key={`${block.x},${block.y}`} tone={tone} z={ISLAND_TOP} {...block} />
            ))}
            <IsoBox
              solid="neon-pink"
              filter={glow}
              x={2.6}
              y={8.7}
              z={ISLAND_TOP + 3.8}
              w={0.5}
              d={0.5}
              h={0.45}
            />

            <g filter={glow}>
              {DOTS.map(([x, y]) => (
                <polygon key={`${x},${y}`} points={dot(x, y, FLIGHT_HEIGHT)} style={fill("neon-cyan")} />
              ))}
            </g>

            <Plane planeRef={planeRef} />
          </>
        )}
      </IsoScene>

      {!reduced && (
        <p className="icv-scene-control">
          <button
            type="button"
            className="icv-button icv-button--secondary"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? "Pause the plane animation" : "Play the plane animation"}
          >
            <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
            {playing ? "Pause" : "Play"}
          </button>
        </p>
      )}
    </>
  );
}
