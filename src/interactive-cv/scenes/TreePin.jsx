import { fill, isoPoint } from "./iso";
import IsoBox from "./IsoBox";
import IsoScene from "./IsoScene";

// Chapter 5: a small fruit tree on a meadow, with three tiny seedlings
// sprouting beside it (a nod to the seeds in Grown on Trees).
// 6 shapes: floor, meadow, trunk, canopy, fruit, seedlings.
// Drawn back to front, so later shapes sit in front of earlier ones.

const MEADOW_TOP = 0.6;
const FRUIT = [
  { tone: "pink", x: 7, y: 10, z: 4.5 },
  { tone: "peach", x: 9, y: 10, z: 5.2 },
  { tone: "pink", x: 10, y: 6.5, z: 4.2 },
];
// Seedlings, listed back to front
const SEEDLINGS = [
  [11.6, 10.4],
  [5, 11.4],
  [10.3, 11.8],
];

// A tiny sprout drawn flat at an iso point: a stem and two leaves.
function Seedling({ at: [x, y] }) {
  const [px, py] = isoPoint(x, y, MEADOW_TOP);
  return (
    <g>
      <rect x={px - 0.6} y={py - 6} width={1.2} height={6} style={fill("leaf-3")} />
      <ellipse cx={px - 2.8} cy={py - 6.2} rx={3} ry={1.5} transform={`rotate(-30 ${px - 2.8} ${py - 6.2})`} style={fill("leaf-2")} />
      <ellipse cx={px + 2.8} cy={py - 7.2} rx={3} ry={1.5} transform={`rotate(30 ${px + 2.8} ${py - 7.2})`} style={fill("leaf-1")} />
    </g>
  );
}

export default function TreePin() {
  return (
    <IsoScene title="A small green tree with pink and peach fruit on a sunny meadow, with three tiny seedlings sprouting beside it.">
      {() => (
        <>
          <IsoBox tone="lemon" x={3} y={3} w={10} d={10} h={MEADOW_TOP} />

          {/* Tree: trunk, two-tier canopy and fruit */}
          <IsoBox tone="wood" x={7.6} y={7.6} z={MEADOW_TOP} w={0.8} d={0.8} h={3} />
          <IsoBox tone="leaf" x={6} y={6} z={3.2} w={4} d={4} h={2.8} />
          <IsoBox tone="leaf" x={6.8} y={6.8} z={6} w={2.4} d={2.4} h={1.4} />
          {FRUIT.map(({ tone, x, y, z }) => (
            <IsoBox key={`${x},${y}`} tone={tone} x={x} y={y} z={z} w={0.45} d={0.45} h={0.45} />
          ))}

          {SEEDLINGS.map((at) => (
            <Seedling key={at.join()} at={at} />
          ))}
        </>
      )}
    </IsoScene>
  );
}
