import { useEffect, useState } from "react";
import { getProjects } from "../services/projectsService";
import type { Project } from "../types/project";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then((result) => {
      setProjects(result);
      setLoading(false);
    });
  }, []);

  return { projects, loading };
}