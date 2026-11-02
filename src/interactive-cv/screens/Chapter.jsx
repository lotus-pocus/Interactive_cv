import { Link, Navigate, useParams } from "react-router-dom";

import { useConfig } from "../config";
import { chapters } from "../data/chapters";
import ChapterLayout from "../components/ChapterLayout";
import { scenes } from "../scenes";

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
  const Scene = scenes[chapter.number];

  return (
    <ChapterLayout scene={Scene && <Scene />}>
      <h1 tabIndex={-1}>{chapter.title}</h1>

      {chapter.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <section className="icv-card__reveal" aria-labelledby="icv-skills">
        <h2 className="icv-card__eyebrow" id="icv-skills">
          Skills gained
        </h2>
        <p>{chapter.skills}</p>
      </section>

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
