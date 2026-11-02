import ParchmentCard from "./ParchmentCard";
import "./ChapterLayout.css";

// Illustration beside the card on desktop, stacked above it on mobile.
// The scene is decorative; all meaningful content goes in the card.
export default function ChapterLayout({ scene, children }) {
  return (
    <div className="icv-layout">
      <div className="icv-layout__scene" aria-hidden="true">
        {scene ?? <div className="icv-layout__placeholder" />}
      </div>
      <div className="icv-layout__content">
        <ParchmentCard>{children}</ParchmentCard>
      </div>
    </div>
  );
}
