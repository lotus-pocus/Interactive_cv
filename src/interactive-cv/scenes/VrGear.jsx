import { fill, isoPoint } from "./iso";
import IsoBox from "./IsoBox";

// Chapter 4: a VR headset resting on a lilac plinth in the back-right corner.
// The headset is drawn flat and front-on (like the plane) at an iso point.

// Front-on headset, all in charcoal, drawn in its own units with the origin at
// the bottom centre of the visor. Each part is drawn twice: a lighter
// charcoal shape, then the part inset on top, so a thin light edge separates
// the parts.
const EDGE = 1.1;

// Visor outline: a wide rounded rectangle with a rounded nose notch cut into
// the middle of its bottom edge.
function visorPath(inset = 0) {
  const left = -25 + inset;
  const right = 25 - inset;
  const top = -24 + inset;
  const bottom = -inset;
  const r = 9 - inset;
  const notchW = 5.5 + inset; // half width of the nose notch
  const notchH = 6 + inset;
  return [
    `M${left + r},${top}`,
    `H${right - r}`,
    `A${r},${r} 0 0 1 ${right},${top + r}`,
    `V${bottom - r}`,
    `A${r},${r} 0 0 1 ${right - r},${bottom}`,
    `H${notchW}`,
    `A${notchW},${notchH} 0 0 0 ${-notchW},${bottom}`,
    `H${left + r}`,
    `A${r},${r} 0 0 1 ${left},${bottom - r}`,
    `V${top + r}`,
    `A${r},${r} 0 0 1 ${left + r},${top}`,
    "Z",
  ].join(" ");
}

// Headband: a thin arch from one side of the visor, up and over, to the other.
// Its feet sit behind the visor.
const ARCH = { foot: -14, rx: 20, ry: 22, thickness: 3.4 };
function archPath(grow = 0) {
  const { foot, rx, ry, thickness } = ARCH;
  const [ox, oy] = [rx + grow, ry + grow];
  const [ix, iy] = [rx - thickness - grow, ry - thickness - grow];
  return `M${-ox},${foot} A${ox},${oy} 0 0 1 ${ox},${foot} L${ix},${foot} A${ix},${iy} 0 0 0 ${-ix},${foot} Z`;
}

function FrontHeadset({ glow }) {
  return (
    <g>
      {/* Headband arch, behind the visor */}
      <path d={archPath(EDGE * 0.6)} style={fill("charcoal-1")} />
      <path d={archPath()} style={fill("charcoal-3")} />
      {/* Short side tabs, barely past the visor's sides */}
      {[-1, 1].map((side) => (
        <g key={side}>
          <rect x={side < 0 ? -27.5 : 24.5} y={-15} width={3} height={7} rx={1.4} style={fill("charcoal-1")} />
          <rect x={side < 0 ? -27 : 25} y={-14.5} width={2} height={6} rx={1} style={fill("charcoal-3")} />
        </g>
      ))}
      {/* Visor, the dominant shape, with a lighter top edge */}
      <path d={visorPath()} style={fill("charcoal-1")} />
      <path d={visorPath(EDGE)} style={fill("charcoal-2")} />
      <rect x={-17} y={-24 + EDGE} width={34} height={2.4} rx={1.2} style={fill("charcoal-1")} />
      {/* Neon slit at the top centre */}
      <rect x={-5} y={-19.6} width={10} height={2.2} rx={1.1} style={fill("neon-pink")} filter={glow} />
    </g>
  );
}

// Headset silhouette relative to its overall centre (local y = CENTRE_Y),
// for fitting it inside the plinth's top face: the tabs' outer corners, the
// visor's lower and upper corners, and points around the headband arch.
const CENTRE_Y = -18.3;
const archPoint = (deg) => {
  const a = (deg * Math.PI) / 180;
  const [rx, ry] = [ARCH.rx + EDGE, ARCH.ry + EDGE];
  return [Math.abs(rx * Math.cos(a)), Math.abs(ARCH.foot - ry * Math.sin(a) - CENTRE_Y)];
};
const FAR_POINTS = [
  [27.5, -8 - CENTRE_Y],
  [25 - 9 * 0.3, -CENTRE_Y],
  [25, -24 + 9 * 0.3 - CENTRE_Y],
  ...[30, 50, 70, 90].map(archPoint),
];
const MARGIN = 0.86; // share of the top face the headset may reach towards each edge

// Wide enough that the headset still reads at 320px while staying inside the top face
const PLINTH = { x: 11.4, y: 0.2, w: 4.4, d: 4, h: 2.4 };

export default function HeadsetOnPlinth({ glow }) {
  // The plinth's top face is a diamond (W wide, H tall on screen). Scale the
  // headset so every far point stays inside it with a clear margin all round.
  const width = (PLINTH.w + PLINTH.d) * Math.cos(Math.PI / 6) * 10;
  const height = (PLINTH.w + PLINTH.d) * 5;
  const reach = Math.max(...FAR_POINTS.map(([px, py]) => px / (width / 2) + Math.abs(py) / (height / 2)));
  const scale = MARGIN / reach;

  // Centre the headset on the middle of the top face
  const [cx, cy] = isoPoint(PLINTH.x + PLINTH.w / 2, PLINTH.y + PLINTH.d / 2, PLINTH.h);
  return (
    <g>
      <IsoBox tone="lilac" {...PLINTH} />
      <g transform={`translate(${cx} ${cy - CENTRE_Y * scale}) scale(${scale})`}>
        <FrontHeadset glow={glow} />
      </g>
    </g>
  );
}
