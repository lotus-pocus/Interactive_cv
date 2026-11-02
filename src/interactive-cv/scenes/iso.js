// Isometric projection helpers for the chapter scenes.
// World axes: x runs down-right, y runs down-left, z runs up, all at 30° to
// the horizontal. One world unit is 10 SVG units.

const COS30 = Math.cos(Math.PI / 6);
const UNIT = 10;

export function iso(x, y, z = 0) {
  const px = (x - y) * COS30 * UNIT;
  const py = (x + y) * 0.5 * UNIT - z * UNIT;
  return `${px.toFixed(1)},${py.toFixed(1)}`;
}

// A polygon "points" string from world-space [x, y, z] corners.
export function face(...corners) {
  return corners.map((corner) => iso(...corner)).join(" ");
}

// The three visible faces of an axis-aligned box.
export function boxFaces({ x, y, z = 0, w, d, h }) {
  return {
    top: face([x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]),
    left: face([x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]),
    right: face([x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]),
  };
}

// Fill from the illustration palette, e.g. fill("pink-1") -> var(--icv-ill-pink-1)
export function fill(token) {
  return { fill: `var(--icv-ill-${token})` };
}
