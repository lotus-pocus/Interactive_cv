import { face, fill } from "./iso";
import IsoBox from "./IsoBox";
import IsoScene from "./IsoScene";

// Chapter 4: a studio desk with a monitor showing code brackets, a keyboard,
// a mouse and a mug, a VR headset on a plinth beside it, and a stool.
// 11 shapes: floor, desk, monitor, code brackets (neon), mug, keyboard,
// mouse, plinth, headset (strap, goggle, lens panel), headset edge (neon), stool.
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
// A rectangle with its corners cut, to suggest rounded goggles.
const rounded = (u0, u1, v0, v1, c) => [
  [u0 + c, v1], [u1 - c, v1], [u1, v1 - c], [u1, v0 + c],
  [u1 - c, v0], [u0 + c, v0], [u0, v0 + c], [u0, v1 - c],
];

// Headset: goggle box on a plinth, strap loop rising behind it
const HEADSET = { x: 13.15, y: 6.5, z: 3, w: 1.7, d: 1.1, h: 1.1 };
const FRONT = HEADSET.y + HEADSET.d + 0.02;
const STRAP = [
  [13.35, 3.2], [13.35, 5], [14.65, 5], [14.65, 3.2],
  [14.38, 3.2], [14.38, 4.72], [13.62, 4.72], [13.62, 3.2],
];

export default function Studio() {
  return (
    <IsoScene title="A studio desk with a monitor showing code brackets, a keyboard, a mouse and a mug, a VR headset on a plinth beside the desk, and a stool in front.">
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

          {/* VR headset on a plinth: strap loop, goggle box, pastel lens, neon edge */}
          <IsoBox tone="lilac" x={13} y={6} w={2} d={2} h={3} />
          <polygon points={onPlane(6.6)(STRAP)} style={fill("lilac-3")} />
          <IsoBox tone="dusk" {...HEADSET} />
          <polygon points={onPlane(FRONT)(rounded(13.3, 14.7, 3.14, 4.0, 0.18))} style={fill("sky-1")} />
          <polygon
            points={onPlane(FRONT + 0.01)(rect(13.4, 14.6, 3.03, 3.13))}
            style={fill("neon-pink")}
            filter={glow}
          />

          {/* Stool */}
          <IsoBox tone="wood" x={7.8} y={12.3} w={0.4} d={0.4} h={2} />
          <IsoBox tone="pink" x={7} y={11.5} z={2} w={2} d={2} h={0.4} />
        </>
      )}
    </IsoScene>
  );
}
