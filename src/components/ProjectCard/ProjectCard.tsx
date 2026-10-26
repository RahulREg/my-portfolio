/**
 * Presentational card for one project.
 *
 * "Presentational" means it receives data through props and owns no state or
 * data fetching, so it is reused unchanged on Home (featured) and Projects
 * (all). Keeping it free of loading logic makes it trivial to test and reuse.
 */
import type { Project } from "../../types/project";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      {project.status === "in-progress" && (
        <span className={styles.badge}>In progress</span>
      )}
      <ul className={styles.tags} aria-label="Technologies">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div className={styles.links}>
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noreferrer">
            Code
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            Live demo
          </a>
        )}
      </div>
    </article>
  );
}