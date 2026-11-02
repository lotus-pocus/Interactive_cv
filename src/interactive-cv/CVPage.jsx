import { Link, useLocation } from "react-router-dom";

import { resolveConfig } from "./config";
import { cv } from "./data/cv";
import useRouteFocus from "./hooks/useRouteFocus";
import ExternalLink from "./components/ExternalLink";
import InlineList from "./components/InlineList";
import "./styles/icv.css";
import "./CVPage.css";

function Dates({ start, end }) {
  return (
    <p className="icv-cv__dates">
      <time dateTime={start.iso}>{start.text}</time>
      {" – "}
      {end.iso ? <time dateTime={end.iso}>{end.text}</time> : end.text}
    </p>
  );
}

function Entry({ entry }) {
  return (
    <article className="icv-cv__entry">
      <h3>{entry.heading}</h3>
      <p className="icv-cv__subheading">{entry.subheading}</p>
      {entry.start && <Dates start={entry.start} end={entry.end} />}
      <ul>
        {entry.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </article>
  );
}

function Section({ id, title, children }) {
  return (
    <section className="icv-cv__section" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      {children}
    </section>
  );
}

// Plain, accessible HTML CV. All content comes from data/cv.js.
export default function CVPage(props) {
  const { basePath, pdfUrl } = resolveConfig(props);
  const { state } = useLocation();
  const mainRef = useRouteFocus();

  // Return to the chapter the visitor came from, if they came from the story.
  const from = state?.from;
  const cameFromStory = Boolean(from?.startsWith(basePath));

  return (
    <div className="icv icv-cv">
      <main ref={mainRef} className="icv-cv__main">
        <header className="icv-cv__header">
          <p className="icv-cv__kicker">CV</p>
          <h1 tabIndex={-1}>{cv.name}</h1>
          <InlineList
            className="icv-cv__headline"
            items={cv.headline}
            label="Specialisms"
          />

          <address className="icv-cv__contact">
            <ul>
              <li>{cv.location}</li>
              <li>
                <a href={`mailto:${cv.email}`}>{cv.email}</a>
              </li>
              {cv.links.map((link) => (
                <li key={link.href}>
                  {link.label}:{" "}
                  <ExternalLink href={link.href}>{link.text}</ExternalLink>
                </li>
              ))}
            </ul>
          </address>

          {pdfUrl && (
            <p className="icv-actions icv-cv__actions">
              <a
                className="icv-button icv-button--primary"
                href={pdfUrl}
                download="Lotus_Tay_CV.pdf"
              >
                Download PDF
              </a>
              <ExternalLink
                className="icv-button icv-button--secondary"
                href={pdfUrl}
              >
                Open PDF
              </ExternalLink>
            </p>
          )}
        </header>

        <Section id="icv-cv-profile" title="Professional Profile">
          {cv.profile.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Section>

        <Section id="icv-cv-skills" title="Core Skills">
          <div className="icv-cv__skills">
            {cv.skills.map((group) => (
              <div key={group.group}>
                <h3>{group.group}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="icv-cv-projects" title="Selected Creative Projects">
          {cv.projects.map((project) => (
            <article className="icv-cv__entry" key={project.title}>
              <h3>{project.title}</h3>
              <InlineList
                className="icv-cv__stack"
                items={project.stack}
                label="Built with"
              />
              <ul>
                {project.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <ul className="icv-cv__links">
                {project.links.map((link) => (
                  <li key={link.href}>
                    {link.label}:{" "}
                    <ExternalLink href={link.href}>{link.href}</ExternalLink>
                  </li>
                ))}
              </ul>
              {project.note && (
                <p className="icv-cv__note">
                  <em>{project.note}</em>
                </p>
              )}
            </article>
          ))}
        </Section>

        <Section id="icv-cv-experience" title="Professional Experience">
          {cv.experience.map((entry) => (
            <Entry key={entry.heading} entry={entry} />
          ))}
        </Section>

        <Section id="icv-cv-previous" title="Previous Experience">
          {cv.previousExperience.map((entry) => (
            <Entry key={entry.heading} entry={entry} />
          ))}
        </Section>

        <Section id="icv-cv-education" title="Education">
          {cv.education.map((item) => (
            <article className="icv-cv__entry" key={item.title}>
              <h3>{item.title}</h3>
              <p className="icv-cv__subheading">{item.provider}</p>
              <InlineList items={item.topics} label="Topics" />
            </article>
          ))}
        </Section>

        <Section id="icv-cv-interests" title="Interests">
          <InlineList items={cv.interests} label="Interests" />
        </Section>

        <p className="icv-cv__back">
          <Link to={cameFromStory ? from : basePath}>
            {cameFromStory ? "Back to the story" : "Explore the interactive story"}
          </Link>
        </p>
      </main>
    </div>
  );
}
