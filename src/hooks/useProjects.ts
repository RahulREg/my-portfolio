import { useEffect, useState } from "react";
import { getProjects } from "../services/projectsService";
import type { Project } from "../types/project";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getProjects()
      .then((result) => {
        if (!cancelled) setProjects(result);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load projects.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, loading, error };
}