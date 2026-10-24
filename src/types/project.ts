export interface Project {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  status: "complete" | "in-progress";
}