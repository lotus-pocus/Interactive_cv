import { face, fill } from "./iso";
import IsoBox from "./IsoBox";
import IsoScene from "./IsoScene";
import StripedAwning from "./StripedAwning";

// Chapter 2: a small market stall beside a fashion boutique with stock boxes.
// 16 shapes (over the usual 12, agreed for this scene): floor, stall counter,
// stall back wall, sky box, 2 posts, stall awning, counter strip (neon),
// boutique, window with a dress, door, boutique awning, roofline strip (neon),
// 3 stock boxes.

// The stall is drawn in its own units and scaled into the front-left corner.
const S = 0.55;
const OX = 0.5;
const OY = 7.5;
const sx = (x) => OX + x * S;
const sy = (y) => OY + y * S;
const sz = (z) => z * S;
const stall = (x, y, z, w, d, h) => ({ x: sx(x), y: sy(y), z: sz(z), w: w * S, d: d * S, h: h * S });
const stallFace = (...corners) => face(...corners.map(([x, y, z]) => [sx(x), sy(y), sz(z)]));

// The boutique's front faces the viewer's left, at y = SHOP_FRONT.
const SHOP_FRONT = 7;
const onShopFront = (u0, u1, v0, v1) =>
  face([u0, SHOP_FRONT + 0.02, v1], [u1, SHOP_FRONT + 0.02, v1], [u1, SHOP_FRONT + 0.02, v0], [u0, SHOP_FRONT + 0.02, v0]);
const shopFrontShape = (points) => face(...points.map(([u, v]) => [u, SHOP_FRONT + 0.03, v]));

const DRESS = [[10, 2.85], [10.6, 2.85], [10.8, 2.2], [11.3, 1.0], [9.3, 1.0], [9.8, 2.2]];
const HANGER = [[9.75, 2.9], [10.85, 2.9], [10.3, 3.15]];

export default function MarketStall() {
  return (
    <IsoScene title="A small market stall with a pink and cream striped awning, next to a fashion boutique with a lilac striped awning, a dress on a hanger in the shop window, a door, and a stack of stock boxes beside the shop.">
      {(glow) => (
        <>
          {/* Boutique: shop block, window with a dress, door, awning, neon roofline */}
          <IsoBox tone="peach" x={8} y={2} w={6.5} d={SHOP_FRONT - 2} h={5} />
          <polygon points={onShopFront(8.8, 11.8, 0.8, 3.15)} style={fill("ground-3")} />
          <polygon points={shopFrontShape(HANGER)} style={fill("cream-1")} />
          <polygon points={shopFrontShape(DRESS)} style={fill("pink-1")} />
          <polygon points={onShopFront(12.4, 13.8, 0, 3.2)} style={fill("lilac-3")} />
          <polygon points={onShopFront(13.45, 13.65, 1.5, 1.7)} style={fill("cream-1")} />
          <polygon points={onShopFront(8, 14.5, 4.75, 5)} style={fill("neon-pink")} filter={glow} />
          {/* Shallow awning, so its valance clears the top of the window */}
          <StripedAwning
            x0={8.4}
            x1={14.1}
            back={SHOP_FRONT}
            front={SHOP_FRONT + 1}
            high={4.5}
            low={4}
            valance={0.35}
            tones={["lilac", "cream"]}
          />

          {/* Stock boxes stacked against the side of the shop */}
          <IsoBox tone="sky" x={14.8} y={3.2} w={1.1} d={1.3} h={1.1} />
          <IsoBox tone="mint" x={14.8} y={4.6} w={1.1} d={1.3} h={1.1} />
          <IsoBox tone="lemon" x={14.9} y={3.9} z={1.1} w={0.9} d={1.3} h={1} />

          {/* Market stall, scaled down */}
          <IsoBox tone="wood" {...stall(2, 6, 0, 10, 4, 5)} />
          <IsoBox tone="lilac" {...stall(2, 6, 5, 10, 0.4, 7.5)} />
          <polygon
            points={stallFace([2, 10, 5], [12, 10, 5], [12, 10, 4.4], [2, 10, 4.4])}
            style={fill("neon-cyan")}
            filter={glow}
          />
          <IsoBox tone="sky" {...stall(4, 7, 5, 3, 2.5, 2.5)} />
          <IsoBox tone="wood" {...stall(2, 9.4, 5, 0.6, 0.6, 6)} />
          <IsoBox tone="wood" {...stall(11.4, 9.4, 5, 0.6, 0.6, 6)} />
          <StripedAwning
            x0={sx(1)}
            x1={sx(13)}
            back={sy(5)}
            front={sy(10)}
            high={sz(13)}
            low={sz(11)}
            valance={sz(1)}
          />
        </>
      )}
    </IsoScene>
  );
}
