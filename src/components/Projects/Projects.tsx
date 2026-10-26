/**
 * Projects page: every project, filterable by technology tag.
 *
 * Data comes from useProjects. The only state owned here is which filter chip
 * is active. Everything else (tag list, visible projects) is derived from
 * that state and the data on each render.
 */
import { useState } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useProjects } from "../../hooks/useProjects";
import styles from "./Projects.module.css";

// Sentinel for "no filter". Kept as a constant so the chip label and the
// comparison below can never drift apart.
const ALL = "All";

export default function Projects() {
  const { projects, loading, error } = useProjects();
  const [activeTag, setActiveTag] = useState(ALL);

  // The chips are built from the data, so adding a project with a new tag
  // creates its chip automatically. Set removes duplicates across projects.
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