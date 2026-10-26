import ButtonLink from "../ButtonLink/ButtonLink";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useProjects } from "../../hooks/useProjects.ts";
import { useExperience } from "../../hooks/useExperience";
import { formatRange } from "../../utils/formatDate";
import styles from "./Home.module.css";

export default function Home() {
  const { projects, loading } = useProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const { data: experience } = useExperience();
  const latest = experience?.work[0];
  const topSkills = experience?.skills.flatMap((g) => g.items).slice(0, 8) ?? [];

  return (
    <>
      <section className={styles.hero}>
        <h1>Hi, I'm Rahul Ram</h1>
        <p className={styles.lead}>
          Software Engineer passionate about building reliable software and
          intuitive web experiences. I work with C#, React, and TypeScript,
          and enjoy solving problems through clean, maintainable code.
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
        {/* Renders nothing until the data has loaded. */}
        {latest && (
          <p className={styles.latest}>
            <strong>
              {latest.role} · {latest.company}
            </strong>
            <br />
            <span className={styles.muted}>
              {formatRange(latest.start, latest.end)}
            </span>
          </p>
        )}
        <ul className={styles.skills} aria-label="Top skills">
          {topSkills.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section className={`${styles.block} ${styles.cta}`}>
        <h2>Let's work together</h2>
        <p>Have a role or project in mind? I'd love to hear about it.</p>
        <ButtonLink to="/contact">Contact me</ButtonLink>
      </section>
    </>
  );
}