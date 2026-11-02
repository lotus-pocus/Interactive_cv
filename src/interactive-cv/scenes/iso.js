// Isometric projection helpers for the chapter scenes.
// World axes: x runs down-right, y runs down-left, z runs up, all at 30° to
// the horizontal. One world unit is 10 SVG units.

const COS30 = Math.cos(Math.PI / 6);
const UNIT = 10;

// Screen position of a world point, as numbers.
export function isoPoint(x, y, z = 0) {
  return [(x - y) * COS30 * UNIT, (x + y) * 0.5 * UNIT - z * UNIT];
}

export function iso(x, y, z = 0) {
  const [px, py] = isoPoint(x, y, z);
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

// The two visible faces of a square-based pyramid.
export function pyramidFaces({ x, y, z = 0, w, d, h }) {
  const apex = [x + w / 2, y + d / 2, z + h];
  return {
    left: face([x, y + d, z], [x + w, y + d, z], apex),
    right: face([x + w, y, z], [x + w, y + d, z], apex),
  };
}

// A small flat diamond lying on the plane at height z, e.g. a dot on a path.
export function dot(x, y, z, r = 0.2) {
  return face([x - r, y, z], [x, y - r, z], [x + r, y, z], [x, y + r, z]);
}

// Fill from the illustration palette, e.g. fill("pink-1") -> var(--icv-ill-pink-1)
export function fill(token) {
  return { fill: `var(--icv-ill-${token})` };
}
