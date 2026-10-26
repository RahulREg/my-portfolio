import { useEffect, useState } from "react";
import { getProjects } from "../services/projectsService";
import type { Project } from "../types/project";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  // Starts true so the first render shows a loading state, not an empty list.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Guard against updating state after the component has unmounted.
    let cancelled = false;

    getProjects()
      .then((result) => {
        if (!cancelled) setProjects(result);
      })
      .catch(() => {
        // A user-facing message rather than the raw error, which would mean
        // nothing to a visitor. Add console.error here when debugging.
        if (!cancelled) setError("Couldn't load projects.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    // Cleanup runs on unmount, flipping the flag so late results are ignored.
    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, loading, error };
}