import { useEffect, useRef, useState } from "react";

import { fill, isoPoint } from "./iso";
import Flag from "./Flag";
import IsoBox from "./IsoBox";
import IsoPyramid from "./IsoPyramid";
import IsoScene from "./IsoScene";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

// Chapter 1: London, Borneo and Canada as three islands with their flags, and a
// plane looping a dashed triangle London → Borneo → Canada → London.
// 15 shapes (over 12, agreed for the flags): floor, 3 islands, London skyline,
// beacon (neon), Borneo tree, CN Tower, Canada pine, 3 flags, flight path
// (neon), plane.

const ISLAND_TOP = 0.8;
const ISLANDS = {
  london: { x: 2, y: 10, size: 5.5 }, // front left
  borneo: { x: 10, y: 2, size: 5.5 }, // front right
  canada: { x: 3, y: 3, size: 5 }, // back
};
const centre = ({ x, y, size }) => [x + size / 2, y + size / 2];

// The path flies at a fixed altitude above the tallest landmark (the CN Tower
// spire, z ≈ 8.8) and is drawn on top of the scene. The altitude is high
// enough that even the front leg (London → Borneo) passes above the spire on
// screen, so the dashes never cross a building. Each corner sits straight
// above its island.
const ALTITUDE = 13.5;
const STOPS = [
  centre(ISLANDS.london),
  centre(ISLANDS.borneo),
  centre(ISLANDS.canada),
  centre(ISLANDS.london),
];
const TURN = 0.03; // share of each loop spent turning at a corner
const LOOP_MS = 9000;

// London skyline: blocks of different heights in the island's back corner,
// listed back to front.
const SKYLINE = [
  { tone: "lilac", x: 2.2, y: 10.3, w: 1.2, d: 1.2, h: 2.4 },
  { tone: "sky", x: 3.6, y: 10.2, w: 1.3, d: 1.3, h: 3.8 },
  { tone: "pink", x: 2.4, y: 11.8, w: 1.3, d: 1.3, h: 1.6 },
  { tone: "cream", x: 5.1, y: 10.4, w: 0.9, d: 1, h: 2 },
  { tone: "lemon", x: 3.9, y: 11.8, w: 1.4, d: 1.4, h: 2.8 },
];

// CN Tower on the Canada island's axis. The shaft is drawn in two parts so
// the pod sits around it: lower shaft, collar, pod (a flat disc), then the
// upper shaft and spire on top.
const TOWER = { cx: 5.5, cy: 5.5 };
const POD_Z = ISLAND_TOP + 4.7; // about two-thirds of the way up
const towerBox = (width, z, h) => ({
  x: TOWER.cx - width / 2,
  y: TOWER.cy - width / 2,
  z,
  w: width,
  d: width,
  h,
});

// Dashed path in screen space: short dashes along each straight leg.
function dashes() {
  const pts = STOPS.map(([x, y]) => isoPoint(x, y, ALTITUDE));
  const out = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const length = Math.hypot(x1 - x0, y1 - y0);
    const [ux, uy] = [(x1 - x0) / length, (y1 - y0) / length];
    const [nx, ny] = [-uy * 0.9, ux * 0.9];
    for (let s = 6; s + 5 <= length - 6; s += 9) {
      const [ax, ay] = [x0 + ux * s, y0 + uy * s];
      const [bx, by] = [ax + ux * 5, ay + uy * 5];
      out.push(
        [[ax + nx, ay + ny], [bx + nx, by + ny], [bx - nx, by - ny], [ax - nx, ay - ny]]
          .map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`)
          .join(" "),
      );
    }
  }
  return out;
}

// Plane pose for a leg: position plus a rotation that keeps it upright,
// mirroring the plane when it flies leftwards.
function pose([x, y], [dx, dy]) {
  const [px, py] = isoPoint(x, y, ALTITUDE);
  const left = dx < 0;
  const angle = (Math.atan2(dy, left ? -dx : dx) * 180) / Math.PI;
  return `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px) rotate(${(left ? -angle : angle).toFixed(1)}deg) scale(${left ? -1 : 1}, 1)`;
}

// One loop: fly each leg, turning briefly at each corner, ending turned
// back towards Borneo so the next loop starts smoothly.
function flightKeyframes() {
  const screen = STOPS.map(([x, y]) => isoPoint(x, y, ALTITUDE));
  const legs = screen.slice(1).map(([x, y], i) => [x - screen[i][0], y - screen[i][1]]);
  const total = legs.reduce((sum, leg) => sum + Math.hypot(...leg), 0);
  const moving = 1 - TURN * legs.length;

  const frames = [];
  let offset = 0;
  legs.forEach((leg, i) => {
    if (i > 0) offset += TURN;
    frames.push({ offset, transform: pose(STOPS[i], leg) });
    offset += (Math.hypot(...leg) / total) * moving;
    frames.push({ offset, transform: pose(STOPS[i + 1], leg) });
  });
  frames.push({ offset: 1, transform: pose(STOPS[0], legs[0]) });
  return frames;
}

const DASHES = dashes();
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

function Island({ tone, x, y, size }) {
  return <IsoBox tone={tone} x={x} y={y} w={size} d={size} h={ISLAND_TOP} />;
}

export default function Journey() {
  const planeRef = useRef(null);
  const flightRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(true);

  // Loop the flight. Under reduced motion it never starts: the plane waits over London.
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
      <IsoScene title="Three islands, each with its flag: London as a small city skyline with a glowing beacon and the Union Jack, Borneo with a tree and the Sabah flag, and Canada with the CN Tower, a pine tree and the Canadian flag. High above them, a little plane loops a dashed triangle from London to Borneo, on to Canada and back to London.">
        {(glow) => (
          <>
            {/* Canada (back): island, pine, CN Tower, flag on the left corner */}
            <Island tone="mint" {...ISLANDS.canada} />
            <IsoPyramid tone="leaf" x={6.4} y={3.4} z={ISLAND_TOP} w={1.4} d={1.4} h={2.4} />
            <IsoBox tone="cream" {...towerBox(0.5, ISLAND_TOP, 4.4)} />
            <IsoBox tone="sky" {...towerBox(0.9, POD_Z - 0.3, 0.3)} />
            <IsoBox tone="sky" {...towerBox(1.7, POD_Z, 0.45)} />
            <IsoBox tone="cream" {...towerBox(0.5, POD_Z + 0.45, 1.6)} />
            <IsoBox tone="cream" {...towerBox(0.2, POD_Z + 2.05, 1.2)} />
            <Flag design="canada" x={3.3} y={7.3} base={ISLAND_TOP} />

            {/* Borneo (front right): island, tree, Sabah flag */}
            <Island tone="lemon" {...ISLANDS.borneo} />
            <IsoBox tone="wood" x={12.45} y={4.45} z={ISLAND_TOP} w={0.6} d={0.6} h={1.6} />
            <IsoBox tone="leaf" x={11.75} y={3.75} z={ISLAND_TOP + 1.6} w={2} d={2} h={2} />
            <Flag design="sabah" x={10.4} y={7} base={ISLAND_TOP} />

            {/* London (front left): island, skyline with a beacon, Union Jack */}
            <Island tone="peach" {...ISLANDS.london} />
            {SKYLINE.map(({ tone, ...block }) => (
              <IsoBox key={`${block.x},${block.y}`} tone={tone} z={ISLAND_TOP} {...block} />
            ))}
            <IsoBox
              solid="neon-pink"
              filter={glow}
              x={4}
              y={10.6}
              z={ISLAND_TOP + 3.8}
              w={0.5}
              d={0.5}
              h={0.45}
            />
            <Flag design="uk" x={2.3} y={15.2} base={ISLAND_TOP} />

            {/* Flight path on top of everything, then the plane */}
            <g filter={glow}>
              {DASHES.map((points) => (
                <polygon key={points} points={points} style={fill("neon-cyan")} />
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
