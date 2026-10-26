/**
 * Experience page: work history, education and skills, rendered from
 * experience.json.
 *
 * Content lives in JSON so updating a job or adding a skill never requires
 * touching this component. Entries are shown in the order they appear in the
 * file.
 */
import { useExperience } from "../../hooks/useExperience";
import { formatRange } from "../../utils/formatDate";
import styles from "./Experience.module.css";

export default function Experience() {
  const { data, loading, error } = useExperience();

  return (
    <section className={styles.page}>
      <h1>Experience & Skills</h1>

      {loading && <p>Loading…</p>}
      {error && <p role="alert">{error}</p>}

      {data && (
        <>
          <section aria-labelledby="work-heading">
            <h2 id="work-heading">Work</h2>
            <ol className={styles.timeline}>
              {data.work.map((job) => (
                <li key={job.id} className={styles.entry}>
                  <div className={styles.head}>
                    <h3>
                      {job.role} · {job.company}
                    </h3>
                    <p className={styles.meta}>
                      {formatRange(job.start, job.end)}
                      {job.location && ` · ${job.location}`}
                    </p>
                  </div>
                  <ul className={styles.highlights}>
                    {job.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  {job.tech && (
                    <ul className={styles.chips} aria-label="Technologies">
                      {job.tech.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="edu-heading">
            <h2 id="edu-heading">Education</h2>
            <ol className={styles.timeline}>
              {data.education.map((ed) => (
                <li key={ed.id} className={styles.entry}>
                  <h3>{ed.degree}</h3>
                  {/* formatRange handles a missing start date (school entries
                      show only the completion month). */}
                  <p className={styles.meta}>
                    {ed.school} · {formatRange(ed.start, ed.end)}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="skills-heading">
            <h2 id="skills-heading">Skills</h2>
            <div className={styles.skillGrid}>
              {data.skills.map((group) => (
                <div key={group.category}>
                  <h3>{group.category}</h3>
                  <ul className={styles.chips}>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </section>
  );
}