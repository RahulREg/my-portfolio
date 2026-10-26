/**
 * Types for src/data/experience.json.
 *
 * Date fields are stored as "MM-YYYY" strings (for example "08-2026") rather
 * than Date objects. JSON has no date type, and a string avoids timezone
 * surprises. Conversion to a display format happens in utils/formatDate.ts.
 */

/** One job. Keep entries in the JSON ordered newest first. */
export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location?: string;
  start: string;
  end: string | null;  // null means "Present"
  highlights: string[];
  tech?: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  start: string | null;
  end: string | null;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceData {
  work: WorkExperience[];
  education: Education[];
  skills: SkillGroup[];
}