import { Link } from "react-router-dom";

import { useConfig } from "../config";
import { intro } from "../data/chapters";
import ChapterLayout from "../components/ChapterLayout";

export default function Intro() {
  const { basePath, cvPath } = useConfig();

  return (
    <ChapterLayout>
      <h1 tabIndex={-1}>{intro.title}</h1>
      <p>{intro.lead}</p>
      <p>{intro.body}</p>

      <p className="icv-actions">
        <Link className="icv-button icv-button--primary" to={`${basePath}/1`}>
          Start story
        </Link>
        <Link className="icv-button icv-button--secondary" to={cvPath}>
          Skip story, view CV
        </Link>
      </p>
    </ChapterLayout>
  );
}
