import { dot, face, fill, isoPoint } from "./iso";
import IsoBox from "./IsoBox";
import IsoScene from "./IsoScene";

// Chapter 5: a small fruit tree on a meadow, with a folded map and a map pin
// (a nod to Grown on Trees).
// 8 shapes: floor, meadow, trunk, canopy, fruit, map, pin ring (neon), pin (neon).
// Drawn back to front, so later shapes sit in front of earlier ones.

const PIN = [13.2, 12];
const MAP_PANELS = [
  { x: 11, tone: "cream-1" },
  { x: 12.5, tone: "sky-1" },
  { x: 14, tone: "cream-2" },
];
const FRUIT = [
  { tone: "pink", x: 6, y: 8, z: 4.5 },
  { tone: "peach", x: 8, y: 8, z: 5.2 },
  { tone: "pink", x: 9, y: 5.5, z: 4.2 },
];

// A classic map pin, upright in screen space with its tip at the given point.
function pinPath([px, py]) {
  return `M${px},${py} L${px - 5.5},${py - 16} A7,7 0 1 1 ${px + 5.5},${py - 16} Z`;
}

export default function TreePin() {
  const tip = isoPoint(PIN[0], PIN[1], 0.05);

  return (
    <IsoScene title="A small green tree with pink and peach fruit on a sunny meadow, next to a folded map with a glowing map pin.">
      {(glow) => (
        <>
          <IsoBox tone="lemon" x={2} y={2} w={10} d={8} h={0.6} />

          {/* Tree: trunk, two-tier canopy and fruit */}
          <IsoBox tone="wood" x={6.6} y={5.6} z={0.6} w={0.8} d={0.8} h={3} />
          <IsoBox tone="leaf" x={5} y={4} z={3.2} w={4} d={4} h={2.8} />
          <IsoBox tone="leaf" x={5.8} y={4.8} z={6} w={2.4} d={2.4} h={1.4} />
          {FRUIT.map(({ tone, x, y, z }) => (
            <IsoBox key={`${x},${y}`} tone={tone} x={x} y={y} z={z} w={0.45} d={0.45} h={0.45} />
          ))}

          {/* Folded map lying on the ground */}
          {MAP_PANELS.map(({ x, tone }) => (
            <polygon
              key={x}
              points={face([x, 10.5, 0.02], [x + 1.5, 10.5, 0.02], [x + 1.5, 13.5, 0.02], [x, 13.5, 0.02])}
              style={fill(tone)}
            />
          ))}

          {/* Map pin with a glowing ring where it lands */}
          <polygon points={dot(PIN[0], PIN[1], 0.05, 0.8)} style={fill("neon-cyan")} filter={glow} />
          <g filter={glow}>
            <path d={pinPath(tip)} style={fill("neon-pink")} />
            <circle cx={tip[0]} cy={tip[1] - 20} r={2.6} style={fill("ink")} />
          </g>
        </>
      )}
    </IsoScene>
  );
}
