export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location?: string;
  start: string;       // "YYYY-MM"
  end: string | null;  // null means "Present"
  highlights: string[];
  tech?: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  start: string;       // "YYYY-MM"
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