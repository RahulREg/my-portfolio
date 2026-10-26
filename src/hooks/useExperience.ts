/**
 * Loads work history, education and skills for Home and Experience.
 *
 * Same pattern as useProjects (see that file for the reasoning). The two are
 * intentionally not merged into a generic hook yet: with only two consumers,
 * the duplication is cheaper than the abstraction. If a third data source
 * appears, extract a shared `useAsync(fetcher)`.
 */
import { useEffect, useState } from "react";
import { getExperience } from "../services/experienceService";
import type { ExperienceData } from "../types/experience";

export function useExperience() {
  // null means "not loaded yet", which is distinct from loaded-but-empty.
  const [data, setData] = useState<ExperienceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ignore results that arrive after unmount.
    let cancelled = false;

    getExperience()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load experience.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}