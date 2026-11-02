import ParchmentCard from "./ParchmentCard";
import "./ChapterLayout.css";

// Illustration beside the card on desktop, stacked above it on mobile.
// A scene carries its own alt text; all meaningful content goes in the card.
export default function ChapterLayout({ scene, children }) {
  return (
    <div className="icv-layout">
      <div className="icv-layout__scene">
        {scene ?? <div className="icv-layout__placeholder" aria-hidden="true" />}
      </div>
      <div className="icv-layout__content">
        <ParchmentCard>{children}</ParchmentCard>
      </div>
    </div>
  );
}
