# Illustration style

One small original SVG scene per chapter, drawn in code. The PDF images are mood references
only. Don't trace or copy them. Reference implementation: `src/interactive-cv/scenes/MarketStall.jsx`.

## Projection
- **True isometric, 30°.** Use `iso(x, y, z)` from `scenes/iso.js` for every point. Never place
  points by eye. World x runs down-right, y runs down-left, z runs straight up.
- 1 world unit = 10 SVG units. Keep scenes to roughly 20 × 14 units of floor so they share a scale.
- Every scene sits on one **ground slab** (`ground` tone, 1 unit thick). It anchors the scene and
  makes the chapters read as a set.

## Shape and fill
- **Flat fills, no outlines, no gradients, no strokes, no filters.** Edges come from the
  difference between face tones.
- **Max ~12 shapes per scene.** A shape is one object: a box, a post, an awning. The ground slab
  counts. A box is three polygons but counts as one shape. The market stall uses 11.
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

| Hue | Use for |
|---|---|
| `pink`, `peach`, `lemon`, `mint`, `sky`, `lilac` | Objects and stock. Mix 2–4 per scene. |
| `cream` | Light alternates (awning stripes, paper, signs) |
| `wood` | Counters, posts, furniture |
| `ground` | The ground slab only |
| `neon-pink`, `neon-cyan` | **Accents only: at most two small touches per scene** (a strip, a tag, a light). Never a whole face. |

**Contrast:** pastels and neons are for fills, never text. Text uses the `--icv-text*` tokens.
The only accent colour safe for text is `--icv-accent-text` (#b0126a, 6.2:1 on the page
background, AA).

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
