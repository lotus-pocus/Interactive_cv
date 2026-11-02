import { fill, pyramidFaces } from "./iso";

// A pyramid (mountain, tree tier, roof): left face mid, right face in shade.
export default function IsoPyramid({ tone, ...box }) {
  const faces = pyramidFaces(box);
  return (
    <g>
      <polygon points={faces.left} style={fill(`${tone}-2`)} />
      <polygon points={faces.right} style={fill(`${tone}-3`)} />
    </g>
  );
}
