import { face, fill } from "./iso";
import IsoBox from "./IsoBox";
import IsoScene, { FLOOR } from "./IsoScene";

// Chapter 3: a press office corner with wall cuttings, a clothes rail,
// a hat box, a camera and a potted plant.
// 14 shapes: floor, 2 walls, magazine cover, newspaper cutting, second
// magazine, wall light (neon), rail, garments, hat box, plinth, camera,
// camera flash (neon), potted plant.
// Drawn back to front, so later shapes sit in front of earlier ones.

const WALL = 0.4;
const WALL_HEIGHT = 7;
// Panels on the walls' visible faces, in each wall's own (u along, v up) plane.
const onBackWall = ([u, v]) => [u, WALL + 0.02, v];
const onSideWall = ([u, v]) => [WALL + 0.02, u, v];
const rect = (u0, u1, v0, v1) => [[u0, v1], [u1, v1], [u1, v0], [u0, v0]];
// The newspaper cutting is pinned at a slight tilt.
const tilt = ([u, v]) => [u, v + (u - 14.1) * 0.2];

const POSTERS = [
  // Magazine cover on the back wall: masthead and cover picture
  { wall: onBackWall, tone: "pink-1", shape: rect(11.5, 13.8, 2.6, 5.6) },
  { wall: onBackWall, tone: "lilac-2", shape: rect(11.7, 13.6, 4.9, 5.4) },
  { wall: onBackWall, tone: "lemon-1", shape: rect(12, 13.3, 3, 4.6) },
  // Newspaper cutting: headline and two columns, tilted
  { wall: onBackWall, tone: "cream-1", shape: rect(14.1, 15.6, 3, 5).map(tilt) },
  { wall: onBackWall, tone: "cream-3", shape: rect(14.3, 15.4, 4.4, 4.75).map(tilt) },
  { wall: onBackWall, tone: "cream-2", shape: rect(14.3, 14.8, 3.3, 4.2).map(tilt) },
  { wall: onBackWall, tone: "cream-2", shape: rect(14.95, 15.4, 3.3, 4.2).map(tilt) },
  { wall: onBackWall, tone: "pink-3", shape: rect(14.78, 14.92, 4.95, 5.1).map(tilt) },
  // Second magazine on the side wall: masthead and two columns
  { wall: onSideWall, tone: "sky-1", shape: rect(10, 12.6, 2.8, 5.4) },
  { wall: onSideWall, tone: "pink-2", shape: rect(10.2, 12.4, 4.8, 5.25) },
  { wall: onSideWall, tone: "cream-1", shape: rect(10.3, 11.2, 3.1, 4.5) },
  { wall: onSideWall, tone: "cream-1", shape: rect(11.4, 12.3, 3.1, 4.5) },
];

const GARMENTS = [
  { tone: "pink", x: 3.8 },
  { tone: "mint", x: 5.9 },
  { tone: "lemon", x: 8 },
];

export default function PressOffice() {
  return (
    <IsoScene title="The corner of a fashion press office: magazine covers and a pinned newspaper cutting on the walls, a clothes rail with three garments, a hat box, a camera on a stand and a potted plant.">
      {(glow) => (
        <>
          {/* Corner walls, with cuttings and a neon light strip */}
          <IsoBox tone="dusk" x={0} y={0} w={WALL} d={FLOOR} h={WALL_HEIGHT} />
          <IsoBox tone="dusk" x={WALL} y={0} w={FLOOR - WALL} d={WALL} h={WALL_HEIGHT} />
          {POSTERS.map(({ wall, tone, shape }, i) => (
            <polygon key={i} points={face(...shape.map(wall))} style={fill(tone)} />
          ))}
          <polygon
            points={face(...rect(4, 8.5, 5.1, 5.6).map(onSideWall))}
            style={fill("neon-pink")}
            filter={glow}
          />

          {/* Clothes rail and garments */}
          <IsoBox tone="wood" x={3} y={2.5} w={0.4} d={0.4} h={5.5} />
          <IsoBox tone="wood" x={3} y={2.5} z={5.2} w={7.4} d={0.4} h={0.3} />
          {GARMENTS.map(({ tone, x }) => (
            <IsoBox key={tone} tone={tone} x={x} y={2.3} z={2} w={1.8} d={0.8} h={3.1} />
          ))}
          <IsoBox tone="wood" x={10} y={2.5} w={0.4} d={0.4} h={5.5} />

          {/* Hat box with a ribbon band and lid */}
          <IsoBox tone="pink" x={5} y={9} w={3} d={3} h={2} />
          <IsoBox tone="lilac" x={4.95} y={8.95} z={0.8} w={3.1} d={3.1} h={0.35} />
          <IsoBox tone="cream" x={4.8} y={8.8} z={2} w={3.4} d={3.4} h={0.6} />

          {/* Potted plant */}
          <IsoBox tone="peach" x={1.6} y={13.1} w={1.2} d={1.2} h={1.2} />
          <IsoBox tone="leaf" x={1.4} y={12.9} z={1.2} w={1.6} d={1.6} h={1.4} />
          <IsoBox tone="leaf" x={1.8} y={13.3} z={2.6} w={0.8} d={0.8} h={0.7} />

          {/* Camera on a plinth, with a glowing flash */}
          <IsoBox tone="lilac" x={11} y={10} w={2} d={2} h={2.5} />
          <IsoBox tone="sky" x={11.1} y={10.1} z={2.5} w={1.8} d={1.6} h={1.3} />
          <IsoBox tone="cream" x={11.55} y={11.7} z={2.7} w={0.9} d={1} h={0.9} />
          <IsoBox
            solid="neon-cyan"
            filter={glow}
            x={11.3}
            y={10.3}
            z={3.8}
            w={0.5}
            d={0.5}
            h={0.3}
          />
        </>
      )}
    </IsoScene>
  );
}
