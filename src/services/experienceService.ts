import data from "../data/experience.json";
import type { ExperienceData } from "../types/experience";

export async function getExperience(): Promise<ExperienceData> {
  return data as ExperienceData;
}