import { face, fill } from "./iso";
import IsoBox from "./IsoBox";

// A small static flag on a thin pole. The flag hangs in the plane facing the
// viewer's left, flying away from the pole along +x. Designs are drawn in the
// flag's own units: u along (0–W), v up (0–H).
const W = 1.8;
const H = 1.1;
const POLE = 0.12;

const rect = (u0, u1, v0, v1) => [[u0, v0], [u1, v0], [u1, v1], [u0, v1]];

// Diagonal band from corner to corner, `t` wide along u.
const diagonal = (t, rising) => {
  const th = (t * H) / W;
  return rising
    ? [[0, 0], [t, 0], [W, H - th], [W, H], [W - t, H], [0, th]]
    : [[0, H], [t, H], [W, th], [W, 0], [W - t, 0], [0, H - th]];
};

// Simplified maple leaf around (0, 0), v up.
const LEAF = [
  [0, 1], [0.18, 0.62], [0.42, 0.75], [0.34, 0.4], [0.62, 0.42], [0.45, 0.15], [0.55, 0],
  [0.12, -0.1], [0.08, -0.55], [-0.08, -0.55], [-0.12, -0.1], [-0.55, 0], [-0.45, 0.15],
  [-0.62, 0.42], [-0.34, 0.4], [-0.42, 0.75], [-0.18, 0.62],
];
const leafAt = (cu, cv, s) => LEAF.map(([u, v]) => [cu + u * s, cv + v * s]);

// Each design is a list of [tone, polygon] layers, drawn in order.
const DESIGNS = {
  // Union Jack: chunky white saltire, white cross, red cross on navy
  uk: [
    ["flag-navy", rect(0, W, 0, H)],
    ["cream-1", diagonal(0.32, true)],
    ["cream-1", diagonal(0.32, false)],
    ["cream-1", rect(W / 2 - 0.2, W / 2 + 0.2, 0, H)],
    ["cream-1", rect(0, W, H / 2 - 0.2, H / 2 + 0.2)],
    ["flag-red", rect(W / 2 - 0.11, W / 2 + 0.11, 0, H)],
    ["flag-red", rect(0, W, H / 2 - 0.11, H / 2 + 0.11)],
  ],
  // Canada: red / white / red with a simple red maple leaf
  canada: [
    ["flag-red", rect(0, W, 0, H)],
    ["cream-1", rect(W / 4, (3 * W) / 4, 0, H)],
    ["flag-red", leafAt(W / 2, H / 2 - 0.12, 0.46)],
  ],
  // Sabah: light blue / white / red bands, royal blue hoist panel with Mount Kinabalu
  sabah: [
    ["flag-red", rect(0, W, 0, H / 3)],
    ["cream-1", rect(0, W, H / 3, (2 * H) / 3)],
    ["sky-2", rect(0, W, (2 * H) / 3, H)],
    ["flag-royal", rect(0, W * 0.34, 0, H)],
    [
      "sky-1",
      [
        [0.04, 0.28], [0.12, 0.55], [0.18, 0.46], [0.27, 0.74], [0.34, 0.52],
        [0.42, 0.64], [0.56, 0.28],
      ],
    ],
  ],
};

// `scale` shrinks the whole flag and pole with smaller islands.
export default function Flag({ design, x, y, base, height = 3, scale = 1 }) {
  const pole = POLE * scale;
  const poleHeight = height * scale;
  const top = base + poleHeight;
  const z0 = top - H * scale;
  const x0 = x + pole;
  const onFlag = (points) =>
    face(...points.map(([u, v]) => [x0 + u * scale, y + pole, z0 + v * scale]));

  return (
    <g>
      <IsoBox tone="cream" x={x} y={y} z={base} w={pole} d={pole} h={poleHeight} />
      {DESIGNS[design].map(([tone, points], i) => (
        <polygon key={i} points={onFlag(points)} style={fill(tone)} />
      ))}
    </g>
  );
}
