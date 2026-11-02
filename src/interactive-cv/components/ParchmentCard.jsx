import "./ParchmentCard.css";

// Narrative card. Plain for now; Phase 4 adds the parchment treatment.
export default function ParchmentCard({ children }) {
  return <div className="icv-card">{children}</div>;
}
