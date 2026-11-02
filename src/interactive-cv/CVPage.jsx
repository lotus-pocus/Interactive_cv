import { Link, useLocation } from "react-router-dom";

import { resolveConfig } from "./config";
import useRouteFocus from "./hooks/useRouteFocus";
import "./styles/icv.css";
import "./CVPage.css";

// Phase 1 stub so "View CV" always has a destination. Phase 2 adds the full HTML CV.
export default function CVPage(props) {
  const { basePath, pdfUrl } = resolveConfig(props);
  const { state } = useLocation();
  const mainRef = useRouteFocus();

  // Return to the chapter the visitor came from, if they came from the story.
  const from = state?.from;
  const backTo = from?.startsWith(basePath) ? from : basePath;

  return (
    <div className="icv icv-cv">
      <main ref={mainRef} className="icv-cv__main">
        <h1 tabIndex={-1}>Lotus Tay: CV</h1>
        <p>[Placeholder] The full HTML CV arrives in Phase 2.</p>

        {pdfUrl && (
          <p className="icv-actions">
            <a className="icv-button icv-button--primary" href={pdfUrl} download>
              Download PDF
            </a>
            <a
              className="icv-button icv-button--secondary"
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open PDF<span className="icv-visually-hidden"> (opens in a new tab)</span>
            </a>
          </p>
        )}

        <p>
          <Link to={backTo}>Back to the story</Link>
        </p>
      </main>
    </div>
  );
}
