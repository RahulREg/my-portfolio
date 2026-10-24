import { useState } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useProjects } from "../../hooks/useProjects";
import styles from "./Projects.module.css";

const ALL = "All";

export default function Projects() {
  const { projects, loading, error } = useProjects();
  const [activeTag, setActiveTag] = useState(ALL);

  const tags = [ALL, ...new Set(projects.flatMap((p) => p.tags))];
  const visible =
    activeTag === ALL
      ? projects
      : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <section className={styles.page}>
      <h1>Projects</h1>
      <p className={styles.intro}>
        A selection of things I've built. Filter by technology to narrow it
        down.
      </p>

      {loading && <p>Loading…</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <>
          <div className={styles.filters} role="group" aria-label="Filter by technology">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={styles.chip}
                aria-pressed={tag === activeTag}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <p>No projects match that filter.</p>
          ) : (
            <div className={styles.grid}>
              {visible.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}