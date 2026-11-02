import { Link } from "react-router-dom";
import "./Home.css";

// Stub for the portfolio home page.
export default function Home({ basePath, cvPath }) {
  return (
    <main className="shell-home">
      <p className="shell-home__kicker">Test site</p>
      <h1>Portfolio home (stub)</h1>
      <p>
        This page stands in for the portfolio. The interactive CV is the part
        being tested.
      </p>
      <ul className="shell-home__links">
        <li>
          <Link to={basePath}>My story (interactive CV)</Link>
        </li>
        <li>
          <Link to={cvPath}>CV</Link>
        </li>
      </ul>
    </main>
  );
}
