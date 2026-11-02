import { boxFaces, fill } from "./iso";

// One isometric shape: top face lit, left face mid, right face in shade.
// `solid` paints every face one colour instead (for neon lights), and
// `filter` applies e.g. the NeonGlow.
export default function IsoBox({ tone, solid, filter, ...box }) {
  const faces = boxFaces(box);
  const tint = (n) => fill(solid ?? `${tone}-${n}`);
  return (
    <g filter={filter}>
      <polygon points={faces.left} style={tint(2)} />
      <polygon points={faces.right} style={tint(3)} />
      <polygon points={faces.top} style={tint(1)} />
    </g>
  );
}
