import { useId } from "react";

import { face, fill, isoPoint } from "./iso";
import IsoBox from "./IsoBox";
import IsoScene from "./IsoScene";

// Chapter 4: a studio desk with a monitor showing code brackets, a keyboard,
// a mouse and a mug, a VR headset worn by a display head on a plinth beside
// the desk, and a stool.
// 11 shapes: floor, desk, monitor, code brackets (neon), mug, keyboard,
// mouse, plinth, display head, headset, visor edge (neon), stool.
// Drawn back to front, so later shapes sit in front of earlier ones.

const DESK_TOP = 4.5;
const SCREEN_Y = 6.85; // just in front of the monitor's front face

// "< / >" drawn as shapes in the screen's plane: [u (along x), v (height)]
const BRACKETS = [
  [[7.3, 8.5], [6.1, 7.5], [7.3, 6.5], [7.3, 6.95], [6.65, 7.5], [7.3, 8.05]],
  [[7.5, 6.5], [7.9, 6.5], [8.5, 8.5], [8.1, 8.5]],
  [[8.7, 8.5], [9.9, 7.5], [8.7, 6.5], [8.7, 6.95], [9.35, 7.5], [8.7, 8.05]],
];
const onPlane = (y) => (points) => face(...points.map(([u, v]) => [u, y, v]));
const rect = (u0, u1, v0, v1) => [[u0, v1], [u1, v1], [u1, v0], [u0, v0]];
// Display head wearing the VR headset. Like the plane, it's drawn flat in
// screen space (rounded shapes don't suit iso boxes), placed at an iso point on
// the plinth. The head faces the viewer's left, so the visor runs along the
// iso x direction (30° down to the right) and sits towards the front of the head.
const PLINTH_TOP = 3;
const NECK = { x: 13.7, y: 6.7, z: PLINTH_TOP, w: 0.6, d: 0.6, h: 1.1 };
const [HX, HY] = isoPoint(14, 7, PLINTH_TOP + 2.3);
const HEAD = { rx: 11, ry: 13.5 };

function DisplayHead({ glow }) {
  const clipId = useId();
  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <ellipse cx={HX} cy={HY} rx={HEAD.rx} ry={HEAD.ry} />
        </clipPath>
      </defs>
      {/* Head: shade, then the lit side towards the upper left */}
      <ellipse cx={HX} cy={HY} rx={HEAD.rx} ry={HEAD.ry} style={fill("dusk-2")} />
      <ellipse cx={HX - 1.6} cy={HY - 1.8} rx={HEAD.rx - 2} ry={HEAD.ry - 2.2} style={fill("dusk-1")} />
      {/* Straps, clipped to the head: one round the back, one over the top */}
      <g clipPath={`url(#${clipId})`}>
        <rect x={HX - 16} y={HY - 1.8} width={32} height={3.6} transform={`rotate(30 ${HX} ${HY})`} style={fill("lilac-3")} />
        <rect x={HX - 1.6} y={HY - 18} width={3.2} height={18} transform={`rotate(-35 ${HX} ${HY - 1})`} style={fill("lilac-3")} />
      </g>
      {/* Visor: wide, short, rounded; lit top strip; neon edge along the bottom */}
      <g transform={`translate(${HX - 3} ${HY - 0.5}) rotate(30)`}>
        <rect x={-12} y={-4.8} width={24} height={9.6} rx={4.2} style={fill("sky-2")} />
        <rect x={-10.5} y={-4.8} width={21} height={3.2} rx={1.6} style={fill("sky-1")} />
        <rect x={-10} y={3.6} width={20} height={1.7} rx={0.85} style={fill("neon-pink")} filter={glow} />
      </g>
    </g>
  );
}

export default function Studio() {
  return (
    <IsoScene title="A studio desk with a monitor showing code brackets, a keyboard, a mouse and a mug. Beside the desk, a display head on a plinth wears a VR headset. A stool stands in front.">
      {(glow) => (
        <>
          {/* Desk: two side panels and a top */}
          <IsoBox tone="wood" x={3.5} y={5} w={0.4} d={4} h={4} />
          <IsoBox tone="wood" x={12.1} y={5} w={0.4} d={4} h={4} />
          <IsoBox tone="wood" x={3.5} y={5} z={4} w={9} d={4} h={0.5} />

          {/* Monitor: stand, body and dark screen with neon brackets */}
          <IsoBox tone="dusk" x={7.5} y={6} z={DESK_TOP} w={1} d={1} h={1} />
          <IsoBox tone="dusk" x={5} y={6.2} z={5.5} w={6} d={0.6} h={4} />
          <polygon points={onPlane(6.82)(rect(5.4, 10.6, 5.9, 9.1))} style={fill("ground-3")} />
          <g filter={glow}>
            {BRACKETS.map((shape, i) => (
              <polygon key={i} points={onPlane(SCREEN_Y)(shape)} style={fill("neon-cyan")} />
            ))}
          </g>

          {/* Mug, keyboard with two rows of keys, mouse */}
          <IsoBox tone="sky" x={4} y={7} z={DESK_TOP} w={0.8} d={0.8} h={0.9} />
          <IsoBox tone="dusk" x={6} y={7.4} z={DESK_TOP} w={4} d={1.1} h={0.15} />
          {[7.6, 8.0].map((y) => (
            <polygon
              key={y}
              points={face([6.3, y, DESK_TOP + 0.16], [9.7, y, DESK_TOP + 0.16], [9.7, y + 0.22, DESK_TOP + 0.16], [6.3, y + 0.22, DESK_TOP + 0.16])}
              style={fill("cream-2")}
            />
          ))}
          <IsoBox tone="cream" x={10.6} y={7.6} z={DESK_TOP} w={0.6} d={0.8} h={0.25} />

          {/* Display head on a plinth, wearing the VR headset */}
          <IsoBox tone="lilac" x={13} y={6} w={2} d={2} h={PLINTH_TOP} />
          <IsoBox tone="dusk" {...NECK} />
          <DisplayHead glow={glow} />

          {/* Stool */}
          <IsoBox tone="wood" x={7.8} y={12.3} w={0.4} d={0.4} h={2} />
          <IsoBox tone="pink" x={7} y={11.5} z={2} w={2} d={2} h={0.4} />
        </>
      )}
    </IsoScene>
  );
}
