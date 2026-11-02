# Illustration style

One small original SVG scene per chapter, drawn in code. The PDF images are mood references
only. Don't trace or copy them. Reference implementation: `src/interactive-cv/scenes/MarketStall.jsx`.

**Scenes sit on a near-black page** (`#050505`, the portfolio's background), beside or above the
parchment card. Pastel objects on a deep indigo floor, with small glowing neon touches.

## Projection
- **True isometric, 30°.** Use `iso(x, y, z)` from `scenes/iso.js` for every point. Never place
  points by eye. World x runs down-right, y runs down-left, z runs straight up.
- 1 world unit = 10 SVG units.

## The stage (shared by every chapter)
- **Every scene is wrapped in `<IsoScene>`** (`scenes/IsoScene.jsx`). It draws the same
  **square floor**, 16 × 16 units (`FLOOR`), at the same place in the same viewBox
  (`-150 -90 300 270`). Its two visible edges are equal, and flicking between chapters doesn't jump.
  Never draw your own floor or change the viewBox.
- Draw everything within x, y 0–16 and below about z 10. Walls (Ch3) run along the floor's two back
  edges, so a room sits on the same footprint.
- `<IsoScene>` also provides the title (alt text) and the neon glow: its child is a function that
  receives the glow filter, `{(glow) => …}`.
- On black, the floor is a deep indigo slab rather than a light tile.
- Structures need visible support: no floating roofs. Give awnings and canopies posts or a back
  wall (the stall has a lilac back wall standing on the counter).

## Shape and fill
- **Flat fills, no outlines, no gradients, no strokes.** Edges come from the difference between
  face tones.
- **One filter only: `<NeonGlow>`** (`scenes/NeonGlow.jsx`), applied to neon accents and nothing
  else. `<IsoScene>` places it; apply the `glow` it passes you with `filter={glow}`.
- **Max ~12 shapes per scene.** A shape is one object: a box, a post, an awning, a wall. The floor
  and each neon accent count. A box is three polygons but counts as one shape. Agreed exceptions:
  Chapter 1 (islands + flags) uses 15, Chapter 2 (stall + boutique) 16. Keep any scene over 12
  uncluttered.
- Prefer boxes (`<IsoBox>`), pyramids (`<IsoPyramid>`), striped awnings (`<StripedAwning>`) and
  flat panels drawn with `face()`.
- **Small rounded objects are drawn flat, front-on** (screen space) at an `isoPoint()`, not as iso
  boxes: the plane, the Ch4 display head and visor, the Ch5 seedlings. Round shapes stay rare and
  small. Clip details to a rounded shape with a `<clipPath>` (the head's straps) rather than
  approximating curves with boxes.
- **Something that passes through a ring** (the CN Tower shaft through its pod) is drawn in parts:
  the part below, then the ring, then the part above, so the ring's top face doesn't hide it.
- **Flat details on a face** (shop windows, posters, a screen, key rows) are polygons in that
  face's plane, nudged 0.02 units out so they sit on top. Posters can tilt slightly, like a
  pinned clipping, by skewing their height along the wall.
- A neon light that is a small block uses `<IsoBox solid="neon-pink" filter=…>`, so all faces glow
  one colour.
- An object built from a few parts (a rail with two uprights, a desk with legs, a camera with a
  lens) counts as one shape.
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
| `leaf` | #c8f0b4 | #9edc86 | #74c063 | Trees and plants, everywhere. A fresh pastel green: `mint` is too blue for foliage. |
| `ground` | #2c2640 | #221d33 | #181426 | The ground slab only. Deep indigo, so it reads as a floor without glaring. `ground-3` also works as a dark screen. |
| `dusk` | #5a4f7a | #463d63 | #362f4e | Walls and other large panels, monitor bodies. Muted so big areas don't glare. |

Mix 2–4 pastel hues per scene. Keep big pale areas (walls, awnings) to a third of the scene or
less so the black page doesn't flare around them.

| Neon | Value | Rule |
|---|---|---|
| `neon-pink` | #ff3d9a | **Accents only: at most two small touches per scene** (a strip, a tag, a light), always with `<NeonGlow>`. Never a whole face. |
| `neon-cyan` | #1fe0ff | Same. |

## Flags
`scenes/Flag.jsx` draws a small, static flag on a thin cream pole, hanging in the plane that faces
the viewer's left (flying along +x). Flags are simplified to read at about 15px wide:
- **Union Jack:** navy field, chunky white saltire, white cross, red cross (no thin red saltire).
- **Canada:** red / white / red with a simple stylised maple leaf.
- **Sabah (Borneo):** light blue / white / red bands with a royal blue panel at the hoist and a
  light Mount Kinabalu silhouette.

Flag colours are softened towards the palette: whites use `cream-1` and light blues use `sky`,
plus three flag-only tokens: `flag-navy` #3e4f99, `flag-royal` #4b68c2, `flag-red` #e05a6d.
Put a flag on a free corner of its island, away from landmarks and other islands' flags.

**Contrast:** pastels and neons are for fills, never text. Text uses the `--icv-text*` tokens.
On the dark page the only accent colour safe for text is `--icv-accent-text` (#ff7ab8,
8.5:1 on #050505, AA). The parchment card has its own ink tokens (see `ParchmentCard.css`).

## Avatar
`scenes/Avatar.jsx` is the one non-isometric illustration: a flat, front-facing bust for the intro
and thanks screens (`variant="thanks"` adds four sparkles, one of them neon cyan).
- Same rules otherwise: flat fills, no strokes, palette tokens only, at most two neon accents
  (the cherry earring, plus a sparkle on the thanks version).
- Curves are fine here. Glasses are drawn as filled rings (`fill-rule="evenodd"`), not strokes.
- **Glasses are Lotus's own (Mills "Flo" in purple):** oversized rounded-square lenses, wider
  than tall, with a straighter top than bottom (corner radius 4 top, 9 bottom). Thick `lilac-2`
  frames with a `lilac-1` top edge for the light, a faint `lilac-1` tint in the lenses, a slim
  bridge, and `lilac-3` temples running back to the ears. Never dark frames.
- Avatar-only tokens: `skin-1/2/3` (#e2b48c, #cf9a70, #b07b55), `hair` (#141118), `ink` (#2a2129,
  eyes), `jacket-1/2` (#4a4058, #3a3247).
- **Rim light:** black hair would vanish on the black page, so the hair and side locks sit on a
  copy of themselves offset by about 1.5 units in `dusk-2`. Keep it subtle: thicker or brighter
  reads as an outline.
- Capped at 22rem wide so the portrait doesn't fill the desktop column.

## Motion
- Scenes are static, except the Chapter 1 plane, which **loops** the dotted path
  London → Borneo → Canada → London (9 seconds a loop) until paused.
- Motion uses the browser's Web Animations API (`element.animate`) with keyframes computed from
  `isoPoint()`, so the plane follows the iso path exactly. No animation library.
- **Anything that moves for more than 5 seconds gets a Pause/Play button** under the scene
  (WCAG 2.2.2): a real `<button>`, keyboard operable, with an `aria-label` that names the
  action ("Pause the plane animation" / "Play the plane animation").
- **Reduced motion** (`usePrefersReducedMotion`, which follows the setting live): the animation
  never starts, the plane is drawn waiting in London, and there's no button. The static state
  is always the default render.
- **Flight paths are clean straight dashed legs**, one corner per place, with the plane turning
  at each corner. To keep them off buildings, the whole path flies at one fixed altitude above
  the tallest landmark (Ch1: z 13.5, high enough that even the front leg clears the CN Tower on
  screen), with each corner straight above its island. It's drawn after everything else, then
  the plane. Don't bend routes around buildings.

## Accessibility
- The scene's `<svg>` has `role="img"` and a `<title>` (via `aria-labelledby` and `useId`) that
  describes what's drawn in one plain sentence. It doesn't repeat the chapter text.
- On mobile the scene is capped at 15rem tall so the story stays near the top of the screen.

## Adding a scene
1. Create `scenes/<Name>.jsx` wrapped in `<IsoScene title="…">`, following `PressOffice.jsx`,
   and list its shapes in a comment.
2. Draw back to front: objects in order of increasing `x + y`, nearest objects last (the floor
   is already drawn).
3. Register it in `scenes/index.js` under its chapter number.
4. Check it at 1280, 390 and 320px.
