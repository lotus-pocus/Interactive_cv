import { boxFaces, fill } from "./iso";

// One isometric shape: top face lit, left face mid, right face in shade.
export default function IsoBox({ tone, ...box }) {
  const faces = boxFaces(box);
  return (
    <g>
      <polygon points={faces.left} style={fill(`${tone}-2`)} />
      <polygon points={faces.right} style={fill(`${tone}-3`)} />
      <polygon points={faces.top} style={fill(`${tone}-1`)} />
    </g>
  );
}
