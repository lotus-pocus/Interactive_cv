// The one filter scenes may use: a soft glow for neon accents on the dark page.
// Place once inside a scene's <svg> and apply with filter="url(#id)".
export default function NeonGlow({ id }) {
  return (
    <defs>
      <filter id={id} x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}
