import { Link, useLocation, useMatch } from "react-router-dom";

import { useConfig } from "../config";
import { chapters } from "../data/chapters";
import Progress from "./Progress";
import "./SiteHeader.css";

// Persistent header on every story screen. View CV must never be hidden.
export default function SiteHeader() {
  const { basePath, cvPath, portfolioUrl } = useConfig();
  const { pathname } = useLocation();
  const match = useMatch(`${basePath}/:chapter`);
  const current = chapters.find(
    (chapter) => String(chapter.number) === match?.params.chapter,
  );

  return (
    <header className="icv-header">
      <a className="icv-header__portfolio" href={portfolioUrl}>
        Back to portfolio
      </a>

      {current && (
        <Progress current={current.number} total={chapters.length} />
      )}

      <Link
        className="icv-button icv-button--primary icv-header__cv"
        to={cvPath}
        state={{ from: pathname }}
      >
        View CV
      </Link>
    </header>
  );
}
