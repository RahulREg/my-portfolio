import type { Project } from "../../types/project";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
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