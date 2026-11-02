import { useEffect, useRef, useState } from "react";

import { face, fill, isoPoint } from "./iso";
import Flag from "./Flag";
import IsoBox from "./IsoBox";
import IsoPyramid from "./IsoPyramid";
import IsoScene from "./IsoScene";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

// Chapter 1: London, Borneo and Canada as three small islands spread across
// the floor, each with its flag. A dashed route runs across the island tops
// from landmark to landmark, and a plane loops it London → Borneo → Canada →
// London, landing at the foot of each landmark and waiting there.
// 15 shapes (over 12, agreed for the flags): floor, 3 islands, route (neon),
// London skyline, beacon (neon), Borneo tree, CN Tower, Canada pine, 3 flags,
// plane.

const ISLAND_TOP = 0.6;
const SIZE = 4.5;
// Islands sit in a triangle centred on the floor, with clear floor between them.
const ISLANDS = {
  canada: { x: 2.3, y: 2.3 }, // back
  london: { x: 3.2, y: 10.8 }, // front left
  borneo: { x: 10.8, y: 3.2 }, // front right
};
// Landmarks are placed relative to their island's back corner.
const on = (island, dx, dy) => ({ x: ISLANDS[island].x + dx, y: ISLANDS[island].y + dy });

// London skyline, listed back to front. The tallest (sky) block stands on the
// side facing the other islands; the rest step away from the route.
const SKYLINE = [
  { tone: "lilac", ...on("london", 0.3, 0.3), w: 0.9, d: 0.9, h: 1.8 },
  { tone: "pink", ...on("london", 0.3, 1.7), w: 0.9, d: 0.9, h: 1.2 },
  { tone: "sky", ...on("london", 1.4, 1), w: 1, d: 1, h: 2.8 },
  { tone: "lemon", ...on("london", 1, 2.9), w: 0.9, d: 0.9, h: 1.6 },
];
const TALLEST = SKYLINE[2];

// CN Tower in Canada's back corner, centred on its own axis. The shaft is
// drawn in parts so the disc-shaped pod sits around it: lower shaft, collar,
// pod, then the upper shaft and spire on top.
const TOWER = { cx: ISLANDS.canada.x + 1.2, cy: ISLANDS.canada.y + 1.2 };
const POD_Z = ISLAND_TOP + 5.2;
const towerBox = (width, z, h) => ({
  x: TOWER.cx - width / 2,
  y: TOWER.cy - width / 2,
  z,
  w: width,
  d: width,
  h,
});

// Borneo tree, relative to its island
const TRUNK = { ...on("borneo", 3.3, 0.7), w: 0.4, d: 0.4 };

// The route runs across the island tops, from the base of London's tallest
// block to the base of the CN Tower to the base of the Borneo tree. It's drawn
// after the island slabs and before the landmarks, so each landmark stands in
// front of its end of the route. Between islands it crosses open floor at the
// same height.
const PATH_Z = ISLAND_TOP + 0.02;
const BASES = {
  london: [TALLEST.x + TALLEST.w / 2, TALLEST.y + TALLEST.d / 2],
  borneo: [TRUNK.x + TRUNK.w / 2, TRUNK.y + TRUNK.d / 2],
  canada: [TOWER.cx, TOWER.cy],
};
const ROUTE = [BASES.london, BASES.borneo, BASES.canada, BASES.london];

// The plane lands just in front of each landmark (towards the middle of the
// triangle), never on top of it, and waits there.
const LANDING_OFFSET = 1.6;
const MIDDLE = [0, 1].map((k) => (BASES.london[k] + BASES.borneo[k] + BASES.canada[k]) / 3);
const landing = ([x, y]) => {
  const [dx, dy] = [MIDDLE[0] - x, MIDDLE[1] - y];
  const length = Math.hypot(dx, dy);
  return [x + (dx / length) * LANDING_OFFSET, y + (dy / length) * LANDING_OFFSET];
};
const STOPS = ROUTE.map(landing);
const PLANE_Z = PATH_Z + 0.5;
const PLANE_SCALE = 0.7;
const WAIT = 0.05; // share of each loop spent waiting at a landmark
const TURN = 0.03; // share of each loop spent turning before taking off
const LOOP_MS = 10000;

// Dashes along each leg, in the plane of the island tops.
function routeDashes() {
  const out = [];
  for (let i = 0; i < ROUTE.length - 1; i++) {
    const [x0, y0] = ROUTE[i];
    const [x1, y1] = ROUTE[i + 1];
    const length = Math.hypot(x1 - x0, y1 - y0);
    const [ux, uy] = [(x1 - x0) / length, (y1 - y0) / length];
    const [nx, ny] = [-uy * 0.09, ux * 0.09];
    for (let s = 0.2; s + 0.55 <= length; s += 0.95) {
      const [ax, ay] = [x0 + ux * s, y0 + uy * s];
      const [bx, by] = [ax + ux * 0.55, ay + uy * 0.55];
      out.push(
        face(
          [ax + nx, ay + ny, PATH_Z],
          [bx + nx, by + ny, PATH_Z],
          [bx - nx, by - ny, PATH_Z],
          [ax - nx, ay - ny, PATH_Z],
        ),
      );
    }
  }
  return out;
}

// Plane pose for a leg: position plus a rotation that keeps it upright,
// mirroring the plane when it flies leftwards.
function pose([x, y], [dx, dy]) {
  const [px, py] = isoPoint(x, y, PLANE_Z);
  const left = dx < 0;
  const angle = (Math.atan2(dy, left ? -dx : dx) * 180) / Math.PI;
  return `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px) rotate(${(left ? -angle : angle).toFixed(1)}deg) scale(${(left ? -1 : 1) * PLANE_SCALE}, ${PLANE_SCALE})`;
}

// One loop: fly each leg, land, wait, turn towards the next leg. The loop ends
// back in London turned towards Borneo, so the next loop starts smoothly.
function flightKeyframes() {
  const screen = STOPS.map(([x, y]) => isoPoint(x, y, PLANE_Z));
  const legs = screen.slice(1).map(([x, y], i) => [x - screen[i][0], y - screen[i][1]]);
  const total = legs.reduce((sum, leg) => sum + Math.hypot(...leg), 0);
  const moving = 1 - (WAIT + TURN) * legs.length;

  const frames = [];
  let offset = 0;
  legs.forEach((leg, i) => {
    frames.push({ offset, transform: pose(STOPS[i], leg) });
    offset += (Math.hypot(...leg) / total) * moving;
    frames.push({ offset, transform: pose(STOPS[i + 1], leg) });
    offset += WAIT;
    frames.push({ offset, transform: pose(STOPS[i + 1], leg) });
    offset += TURN;
  });
  frames.push({ offset: 1, transform: pose(STOPS[0], legs[0]) });
  return frames;
}

const DASHES = routeDashes();
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

function Island({ tone, x, y }) {
  return <IsoBox tone={tone} x={x} y={y} w={SIZE} d={SIZE} h={ISLAND_TOP} />;
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
      <IsoScene title="Three small islands spread across the floor, each with its flag: London with a little city skyline, a glowing beacon and the Union Jack; Borneo with a tree and the Sabah flag; and Canada with the CN Tower, a pine tree and the Canadian flag. A dashed route runs across the islands from the foot of London's tallest building to the foot of the Borneo tree and the CN Tower, and a little plane loops it from London to Borneo, on to Canada and back to London, landing beside each landmark.">
        {(glow) => (
          <>
            {/* Island slabs first */}
            <Island tone="mint" {...ISLANDS.canada} />
            <Island tone="lemon" {...ISLANDS.borneo} />
            <Island tone="peach" {...ISLANDS.london} />

            {/* Route across the island tops, before the landmarks */}
            <g filter={glow}>
              {DASHES.map((points) => (
                <polygon key={points} points={points} style={fill("neon-cyan")} />
              ))}
            </g>

            {/* Canada (back): CN Tower, pine, flag on the right corner */}
            <IsoBox tone="cream" {...towerBox(0.4, ISLAND_TOP, 4.95)} />
            <IsoBox tone="sky" {...towerBox(0.75, POD_Z - 0.25, 0.25)} />
            <IsoBox tone="sky" {...towerBox(1.4, POD_Z, 0.4)} />
            <IsoBox tone="cream" {...towerBox(0.4, POD_Z + 0.4, 1.9)} />
            <IsoBox tone="cream" {...towerBox(0.16, POD_Z + 2.3, 1.4)} />
            <IsoPyramid tone="leaf" {...on("canada", 0.1, 2.6)} z={ISLAND_TOP} w={1} d={1} h={1.9} />
            <Flag design="canada" {...on("canada", 3.9, 0.4)} base={ISLAND_TOP} scale={0.8} />

            {/* Borneo (right): Sabah flag on the back corner, tree */}
            <Flag design="sabah" {...on("borneo", 0.2, 0.2)} base={ISLAND_TOP} scale={0.8} />
            <IsoBox tone="wood" {...TRUNK} z={ISLAND_TOP} h={1.2} />
            <IsoBox tone="leaf" {...on("borneo", 2.8, 0.2)} z={ISLAND_TOP + 1.2} w={1.4} d={1.4} h={1.4} />

            {/* London (left): skyline with a beacon on the tallest block, Union Jack */}
            {SKYLINE.map(({ tone, ...block }) => (
              <IsoBox key={`${block.x},${block.y}`} tone={tone} z={ISLAND_TOP} {...block} />
            ))}
            <IsoBox
              solid="neon-pink"
              filter={glow}
              x={TALLEST.x + 0.3}
              y={TALLEST.y + 0.3}
              z={ISLAND_TOP + TALLEST.h}
              w={0.4}
              d={0.4}
              h={0.35}
            />
            <Flag design="uk" {...on("london", 4.1, 4.1)} base={ISLAND_TOP} scale={0.8} />

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
