import ButtonLink from "../ButtonLink/ButtonLink";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useProjects } from "../../hooks/useProjects.ts";
import styles from "./Home.module.css";

export default function Home() {
  const { projects, loading } = useProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <section className={styles.hero}>
        <h1>Hi, I'm Rahul Ram</h1>
        <p className={styles.lead}>
          Todo add short intro
        </p>
        <div className={styles.actions}>
          <ButtonLink to="/projects">View my projects</ButtonLink>
          <ButtonLink to="/contact" variant="secondary">
            Get in touch
          </ButtonLink>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2>Featured projects</h2>
          <ButtonLink to="/projects" variant="secondary">
            All projects →
          </ButtonLink>
        </div>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <div className={styles.grid}>
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2>Experience & skills</h2>
          <ButtonLink to="/experience" variant="secondary">
            Full experience →
          </ButtonLink>
        </div>
        <p>
          Todo add experience and skills summary
        </p>
      </section>

      <section className={`${styles.block} ${styles.cta}`}>
        <h2>Let's work together</h2>
        <p>Have a role or project in mind? I'd love to hear about it.</p>
        <ButtonLink to="/contact">Contact me</ButtonLink>
      </section>
    </>
  );
}