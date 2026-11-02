import { useId } from "react";

import { face, fill } from "./iso";
import IsoBox from "./IsoBox";
import NeonGlow from "./NeonGlow";
import "./scenes.css";

// Chapter 2: a market stall with a striped awning and stacked stock boxes.
// 12 shapes: ground, counter, back wall, 2 posts, awning, 4 boxes, 2 neon accents.
// Drawn back to front, so later shapes sit in front of earlier ones.

const AWNING = { x0: 1, x1: 13, back: 5, front: 10, high: 13, low: 11, valance: 1 };
const STRIPES = 6;

function Awning() {
  const { x0, x1, back, front, high, low, valance } = AWNING;
  const step = (x1 - x0) / STRIPES;

  return (
    <g>
      {Array.from({ length: STRIPES }, (_, i) => {
        const a = x0 + i * step;
        const b = a + step;
        const tone = i % 2 === 0 ? "pink" : "cream";
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
        style={fill("pink-3")}
      />
    </g>
  );
}

export default function MarketStall() {
  const titleId = useId();
  const glowId = useId();

  return (
    <svg
      className="icv-scene"
      viewBox="-135 -115 320 310"
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>
        A market stall with a pink and cream striped awning, a box on the
        counter and a stack of pastel stock boxes beside it.
      </title>
      <NeonGlow id={glowId} />

      <IsoBox tone="ground" x={0} y={0} z={-1} w={20} d={14} h={1} />

      <IsoBox tone="wood" x={2} y={6} w={10} d={4} h={5} />
      {/* Back wall: stands on the counter's back edge and meets the awning */}
      <IsoBox tone="lilac" x={2} y={6} z={5} w={10} d={0.4} h={7.5} />
      <polygon
        points={face([2, 10, 5], [12, 10, 5], [12, 10, 4.4], [2, 10, 4.4])}
        style={fill("neon-cyan")}
        filter={`url(#${glowId})`}
      />
      <IsoBox tone="sky" x={4} y={7} z={5} w={3} d={2.5} h={2.5} />

      <IsoBox tone="wood" x={2} y={9.4} z={5} w={0.6} d={0.6} h={6} />
      <IsoBox tone="wood" x={11.4} y={9.4} z={5} w={0.6} d={0.6} h={6} />
      <Awning />

      <IsoBox tone="mint" x={14} y={5} w={3} d={3} h={3} />
      <IsoBox tone="pink" x={14} y={8.5} w={3} d={3} h={3} />
      <polygon
        points={face([14.8, 11.5, 2], [16.2, 11.5, 2], [16.2, 11.5, 1.2], [14.8, 11.5, 1.2])}
        style={fill("neon-pink")}
        filter={`url(#${glowId})`}
      />
      <IsoBox tone="lemon" x={14.5} y={6.5} z={3} w={2} d={3} h={2} />
    </svg>
  );
}
