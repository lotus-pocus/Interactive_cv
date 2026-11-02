import { useId } from "react";

import { fill } from "./iso";
import NeonGlow from "./NeonGlow";
import "./scenes.css";

// Flat, front-facing bust of Lotus for the intro and thanks screens.
// Long centre-parted black hair with a dusk rim light so it reads on black,
// oversized lilac glasses (Mills "Flo" in purple), a neon cherry earring,
// white collar, dark jacket. The "thanks" variant adds a few sparkles.

// Rounded square with a straighter top (small corner radius) than bottom.
function roundedSquare(x, y, w, h, rTop, rBottom) {
  return `M${x + rTop},${y} H${x + w - rTop} A${rTop},${rTop} 0 0 1 ${x + w},${y + rTop} V${y + h - rBottom} A${rBottom},${rBottom} 0 0 1 ${x + w - rBottom},${y + h} H${x + rBottom} A${rBottom},${rBottom} 0 0 1 ${x},${y + h - rBottom} V${y + rTop} A${rTop},${rTop} 0 0 1 ${x + rTop},${y} Z`;
}

// Glasses geometry: two oversized lenses, slightly wider than tall.
const LENS = { y: 82, w: 30, h: 24, rTop: 4, rBottom: 9, rim: 3.6 };
const LENS_X = [68, 102];

// Thick frame drawn as a ring (outer minus inner, no strokes).
function frame(x) {
  const { y, w, h, rTop, rBottom, rim } = LENS;
  return (
    roundedSquare(x, y, w, h, rTop, rBottom) +
    roundedSquare(x + rim, y + rim, w - 2 * rim, h - 2 * rim, Math.max(rTop - rim, 1), rBottom - rim)
  );
}

function lensGlass(x) {
  const { y, w, h, rTop, rBottom, rim } = LENS;
  return roundedSquare(x + rim, y + rim, w - 2 * rim, h - 2 * rim, Math.max(rTop - rim, 1), rBottom - rim);
}

function Glasses() {
  const { y, w, rTop, rim } = LENS;
  return (
    <g>
      {/* Temples run back to the ears, in the frame's shaded tone */}
      <rect x={60} y={y + 5} width={8} height={2.4} style={fill("lilac-3")} />
      <rect x={132} y={y + 5} width={7} height={2.4} style={fill("lilac-3")} />
      {/* A faint lilac tint in the lenses, then the thick frames */}
      {LENS_X.map((x) => (
        <path key={`glass-${x}`} d={lensGlass(x)} style={{ ...fill("lilac-1"), fillOpacity: 0.22 }} />
      ))}
      <path d={LENS_X.map(frame).join(" ")} fillRule="evenodd" style={fill("lilac-2")} />
      {/* Lighter top edge for the light from above */}
      {LENS_X.map((x) => (
        <rect key={`top-${x}`} x={x + rTop} y={y} width={w - 2 * rTop} height={rim * 0.5} style={fill("lilac-1")} />
      ))}
      {/* Slim bridge */}
      <rect x={LENS_X[0] + w} y={y + 6} width={LENS_X[1] - LENS_X[0] - w} height={2} style={fill("lilac-2")} />
    </g>
  );
}

// Four-point sparkle with concave sides.
function sparkle(cx, cy, r) {
  return `M${cx},${cy - r} Q${cx},${cy} ${cx + r},${cy} Q${cx},${cy} ${cx},${cy + r} Q${cx},${cy} ${cx - r},${cy} Q${cx},${cy} ${cx},${cy - r} Z`;
}

const HAIR = "M100,22 C64,22 46,48 46,86 L44,196 L156,196 L154,86 C154,48 136,22 100,22 Z";
const HAIR_RIM = "M100,20.5 C62.5,20.5 44.5,47 44.5,86 L42.5,197.5 L157.5,197.5 L155.5,86 C155.5,47 137.5,20.5 100,20.5 Z";
const LOCK_LEFT = "M50,84 C48,124 50,170 56,206 L74,200 C67,162 66,124 68,88 Z";
const LOCK_RIGHT = "M150,84 C152,124 150,170 144,206 L126,200 C133,162 141,128 139,110 L136,88 Z";

export default function Avatar({ variant = "intro" }) {
  const titleId = useId();
  const glowId = useId();
  const thanks = variant === "thanks";

  return (
    <svg
      className="icv-scene icv-scene--avatar"
      viewBox="0 0 200 220"
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>
        {thanks
          ? "Illustrated portrait of Lotus, surrounded by sparkles: long centre-parted black hair, oversized lilac glasses, a cherry earring, a white collar and a dark jacket."
          : "Illustrated portrait of Lotus: long centre-parted black hair, oversized lilac glasses, a cherry earring, a white collar and a dark jacket."}
      </title>
      <NeonGlow id={glowId} />

      {thanks && (
        <g>
          <path d={sparkle(34, 52, 10)} style={fill("lemon-1")} />
          <path d={sparkle(168, 40, 8)} style={fill("cream-1")} />
          <path d={sparkle(176, 124, 6)} style={fill("lemon-2")} />
          <path d={sparkle(24, 132, 6)} style={fill("neon-cyan")} filter={`url(#${glowId})`} />
        </g>
      )}

      {/* Back hair with a rim light */}
      <path d={HAIR_RIM} style={fill("dusk-2")} />
      <path d={HAIR} style={fill("hair")} />

      {/* Jacket, neck, shirt and collar */}
      <path d="M28,220 C30,180 56,162 100,160 C144,162 170,180 172,220 Z" style={fill("jacket-2")} />
      <path d="M86,128 L114,128 L115,166 L100,180 L85,166 Z" style={fill("skin-2")} />
      <path d="M84,163 L116,163 L100,206 Z" style={fill("cream-1")} />
      <path d="M83,160 L100,178 L93,188 L78,167 Z" style={fill("cream-2")} />
      <path d="M117,160 L100,178 L107,188 L122,167 Z" style={fill("cream-2")} />
      <path d="M78,167 L93,188 L100,214 L64,182 Z" style={fill("jacket-1")} />
      <path d="M122,167 L107,188 L100,214 L136,182 Z" style={fill("jacket-1")} />

      {/* Face */}
      <path
        d="M100,50 C122,50 134,66 134,92 C134,120 120,140 100,143 C80,140 66,120 66,92 C66,66 78,50 100,50 Z"
        style={fill("skin-1")}
      />

      {/* Side locks over the shoulders, rim-lit, then the centre-parted top */}
      <path d={LOCK_LEFT} transform="translate(-1.5 0)" style={fill("dusk-2")} />
      <path d={LOCK_RIGHT} transform="translate(1.5 0)" style={fill("dusk-2")} />
      <path d={LOCK_LEFT} style={fill("hair")} />
      <path d={LOCK_RIGHT} style={fill("hair")} />
      {/* Curtains sweep down from the part, leaving a forehead triangle */}
      <path d="M100,34 C70,34 52,58 52,98 L67,98 C70,72 84,58 100,52 Z" style={fill("hair")} />
      <path d="M100,34 C130,34 148,58 148,98 L133,98 C130,72 116,58 100,52 Z" style={fill("hair")} />
      <path d="M99.3,40 L100.7,40 L100.3,52 L99.7,52 Z" style={fill("skin-3")} />

      {/* Ear, tucked behind the hair, with the cherry earring */}
      <path d="M132,90 C141,88 142,104 133,108 Z" style={fill("skin-2")} />
      <path d="M136.5,107 L138.5,107 L141,118 L139,118.5 Z" style={fill("mint-3")} />
      <g filter={`url(#${glowId})`}>
        <circle cx={137} cy={121} r={3.4} style={fill("neon-pink")} />
        <circle cx={143.5} cy={119.5} r={3.4} style={fill("neon-pink")} />
      </g>

      {/* Brows, eyes, glasses */}
      <path d="M76,80 Q86,74 95,79 L95,81.5 Q86,77.5 76,83 Z" style={fill("hair")} />
      <path d="M124,80 Q114,74 105,79 L105,81.5 Q114,77.5 124,83 Z" style={fill("hair")} />
      <ellipse cx={86} cy={93} rx={3.6} ry={3} style={fill("ink")} />
      <ellipse cx={114} cy={93} rx={3.6} ry={3} style={fill("ink")} />
      <Glasses />

      {/* Freckles (just below the lenses), nose, mouth */}
      <g style={fill("skin-3")}>
        <circle cx={80} cy={109.5} r={0.9} />
        <circle cx={84.5} cy={111.5} r={0.9} />
        <circle cx={89} cy={109.5} r={0.9} />
        <circle cx={111} cy={109.5} r={0.9} />
        <circle cx={115.5} cy={111.5} r={0.9} />
        <circle cx={120} cy={109.5} r={0.9} />
        <ellipse cx={100} cy={113} rx={3} ry={1.5} />
      </g>
      <path d="M93,124 Q100,129 107,124 Q100,126.5 93,124 Z" style={fill("pink-3")} />
    </svg>
  );
}
