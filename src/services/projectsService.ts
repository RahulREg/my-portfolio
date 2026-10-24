import data from "../data/projects.json";
import type { Project } from "../types/project";

export async function getProjects(): Promise<Project[]> {
  return data as Project[];
}