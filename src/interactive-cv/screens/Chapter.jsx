import { Link, Navigate, useParams } from "react-router-dom";

import { useConfig } from "../config";
import { chapters } from "../data/chapters";
import ChapterLayout from "../components/ChapterLayout";
import "./Chapter.css";

export default function Chapter() {
  const { basePath } = useConfig();
  const { chapter: param } = useParams();
  const index = chapters.findIndex(
    (chapter) => String(chapter.number) === param,
  );

  if (index === -1) return <Navigate to={basePath} replace />;

  const chapter = chapters[index];
  const isLast = index === chapters.length - 1;
  const backTo = index === 0 ? basePath : `${basePath}/${chapters[index - 1].number}`;
  const nextTo = isLast ? `${basePath}/thanks` : `${basePath}/${chapters[index + 1].number}`;

  return (
    <ChapterLayout>
      <h1 tabIndex={-1}>{chapter.title}</h1>

      {chapter.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <p className="icv-chapter__skills">
        <strong>Skills gained:</strong> {chapter.skills}
      </p>

      <nav className="icv-actions" aria-label="Chapter navigation">
        <Link className="icv-button icv-button--secondary" to={backTo}>
          Back
        </Link>
        <Link className="icv-button icv-button--primary" to={nextTo}>
          {isLast ? "Finish" : "Next chapter"}
        </Link>
      </nav>
    </ChapterLayout>
  );
}
