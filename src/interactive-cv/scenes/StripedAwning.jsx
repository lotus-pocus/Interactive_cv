import { face, fill } from "./iso";

// A striped awning facing the viewer's left (+y): a sloping top from `back`
// (height `high`) to `front` (height `low`), a valance hanging from the front
// edge, and a shaded end on the right. Stripes alternate the two tones.
export default function StripedAwning({
  x0,
  x1,
  back,
  front,
  high,
  low,
  valance,
  stripes = 6,
  tones = ["pink", "cream"],
}) {
  const step = (x1 - x0) / stripes;

  return (
    <g>
      {Array.from({ length: stripes }, (_, i) => {
        const a = x0 + i * step;
        const b = a + step;
        const tone = tones[i % 2];
        return (
          <g key={i}>
            <polygon
              points={face([a, back, high], [b, back, high], [b, front, low], [a, front, low])}
              style={fill(`${tone}-1`)}
            />
            <polygon
              points={face([a, front, low], [b, front, low], [b, front, low - valance], [a, front, low - valance])}
              style={fill(`${tone}-2`)}
            />
          </g>
        );
      })}
      <polygon
        points={face([x1, back, high], [x1, front, low], [x1, front, low - valance], [x1, back, high - valance])}
        style={fill(`${tones[0]}-3`)}
      />
    </g>
  );
}
