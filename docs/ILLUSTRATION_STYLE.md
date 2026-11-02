# Illustration style

One small original SVG scene per chapter, drawn in code. The PDF images are mood references
only. Don't trace or copy them. Reference implementation: `src/interactive-cv/scenes/MarketStall.jsx`.

**Scenes sit on a near-black page** (`#050505`, the portfolio's background), beside or above the
parchment card. Pastel objects on a deep indigo floor, with small glowing neon touches.

## Projection
- **True isometric, 30°.** Use `iso(x, y, z)` from `scenes/iso.js` for every point. Never place
  points by eye. World x runs down-right, y runs down-left, z runs straight up.
- 1 world unit = 10 SVG units. Keep scenes to roughly 20 × 14 units of floor so they share a scale.
- Every scene sits on one **ground slab** (`ground` tone, 1 unit thick). It anchors the scene and
  makes the chapters read as a set. On black, the slab is a deep indigo floor rather than a light tile.
- Structures need visible support: no floating roofs. Give awnings and canopies posts or a back
  wall (the stall has a lilac back wall standing on the counter).

## Shape and fill
- **Flat fills, no outlines, no gradients, no strokes.** Edges come from the difference between
  face tones.
- **One filter only: `<NeonGlow>`** (`scenes/NeonGlow.jsx`), applied to neon accents and nothing
  else. Place it once per `<svg>` with a `useId()` id and use `filter="url(#id)"`.
- **Max ~12 shapes per scene.** A shape is one object: a box, a post, an awning, a wall. The ground
  slab and each neon accent count. A box is three polygons but counts as one shape. The market
  stall uses 12.
- Prefer boxes (`<IsoBox>`) and flat panels. Keep curves and round shapes rare.
- No text, numbers or logos inside a scene. All meaning is in the HTML card.

## Light
- **Light comes from the upper left.** Every hue has three tones:
  - `-1` **top face** (lit)
  - `-2` **left face** (mid)
  - `-3` **right face** (shade)
- Never swap them, even for flat panels: a panel facing left uses `-2`, a panel facing right uses `-3`.
- No cast shadows.

## Palette
All tokens live on `.icv` in `styles/icv.css`. Use `fill("pink-1")` from `scenes/iso.js`,
never a hex value inside a scene.

Tuned for the dark page. Tones are `-1` top / `-2` left / `-3` right.

| Hue | `-1` | `-2` | `-3` | Use for |
|---|---|---|---|---|
| `pink` | #ffd6e5 | #f7b3cc | #e48aaf | Objects, stock, awning stripes |
| `peach` | #ffe3cc | #fbc9a3 | #eaa77a | Objects and stock |
| `lemon` | #fff4c2 | #fbe596 | #ecd06a | Objects and stock |
| `mint` | #d4f3e6 | #a9e3cb | #7fcbac | Objects and stock |
| `sky` | #d6ebff | #b0d4f5 | #86b6e3 | Objects and stock |
| `lilac` | #e9defc | #d2c0f5 | #b49be6 | Objects, walls |
| `cream` | #f7ecd9 | #e8d8bf | #d4c0a2 | Light alternates (stripes, paper, signs). Warm, never pure white, which glares on black. |
| `wood` | #f0dcc4 | #ddbf9c | #c29f78 | Counters, posts, furniture |
| `ground` | #2c2640 | #221d33 | #181426 | The ground slab only. Deep indigo, so it reads as a floor without glaring. |

Mix 2–4 pastel hues per scene. Keep big pale areas (walls, awnings) to a third of the scene or
less so the black page doesn't flare around them.

| Neon | Value | Rule |
|---|---|---|
| `neon-pink` | #ff3d9a | **Accents only: at most two small touches per scene** (a strip, a tag, a light), always with `<NeonGlow>`. Never a whole face. |
| `neon-cyan` | #1fe0ff | Same. |

**Contrast:** pastels and neons are for fills, never text. Text uses the `--icv-text*` tokens.
On the dark page the only accent colour safe for text is `--icv-accent-text` (#ff7ab8,
8.5:1 on #050505, AA). The parchment card has its own ink tokens (see `ParchmentCard.css`).

## Accessibility
- The scene's `<svg>` has `role="img"` and a `<title>` (via `aria-labelledby` and `useId`) that
  describes what's drawn in one plain sentence. It doesn't repeat the chapter text.
- Scenes are static. Any motion (e.g. the Chapter 1 plane) must be skippable and off under
  `prefers-reduced-motion`.
- On mobile the scene is capped at 15rem tall so the story stays near the top of the screen.

## Adding a scene
1. Create `scenes/<Name>.jsx` following `MarketStall.jsx`, and list its shapes in a comment.
2. Draw back to front: ground, then objects in order of increasing `x + y`, then the nearest objects last.
3. Register it in `scenes/index.js` under its chapter number.
4. Check it at 1280, 390 and 320px.
