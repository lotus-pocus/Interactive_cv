import { Link } from "react-router-dom";

import { useConfig } from "../config";
import { chapters, thanks } from "../data/chapters";
import ChapterLayout from "../components/ChapterLayout";

// Optional finale. Not counted as a chapter.
export default function Thanks() {
  const { basePath, cvPath, portfolioUrl, pdfUrl, contactUrl } = useConfig();
  const lastChapter = chapters[chapters.length - 1].number;

  return (
    <ChapterLayout>
      <h1 tabIndex={-1}>{thanks.title}</h1>
      <p>{thanks.lead}</p>

      <p className="icv-actions">
        <Link className="icv-button icv-button--primary" to={cvPath}>
          View CV
        </Link>
        {pdfUrl && (
          <a className="icv-button icv-button--secondary" href={pdfUrl} download>
            Download CV (PDF)
          </a>
        )}
        {contactUrl && (
          <a className="icv-button icv-button--secondary" href={contactUrl}>
            Get in touch
          </a>
        )}
      </p>

      <p className="icv-actions">
        <Link to={`${basePath}/${lastChapter}`}>Back</Link>
        <a href={portfolioUrl}>Back to portfolio</a>
      </p>
    </ChapterLayout>
  );
}
