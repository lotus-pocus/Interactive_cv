import "./ExternalLink.css";

// Opens in a new tab, safely, with a visible arrow and a screen-reader cue.
export default function ExternalLink({ href, className, children }) {
  return (
    <a
      className={["icv-external", className].filter(Boolean).join(" ")}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <span className="icv-external__icon" aria-hidden="true">↗</span>
      <span className="icv-visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
