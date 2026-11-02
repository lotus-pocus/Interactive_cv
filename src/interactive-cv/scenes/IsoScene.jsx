import { useId } from "react";

import IsoBox from "./IsoBox";
import NeonGlow from "./NeonGlow";
import "./scenes.css";

// Every chapter scene shares one stage: the same viewBox and the same square
// floor in the same place, so flicking between chapters feels steady.
// Scenes draw within x, y 0–FLOOR and below z ≈ 10.
export const FLOOR = 16;
const VIEWBOX = "-150 -90 300 270";

// children is a function that receives the neon glow filter, e.g. url(#…).
export default function IsoScene({ title, children }) {
  const titleId = useId();
  const glowId = useId();

  return (
    <svg
      className="icv-scene"
      viewBox={VIEWBOX}
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>{title}</title>
      <NeonGlow id={glowId} />
      <IsoBox tone="ground" x={0} y={0} z={-1} w={FLOOR} d={FLOOR} h={1} />
      {children(`url(#${glowId})`)}
    </svg>
  );
}
