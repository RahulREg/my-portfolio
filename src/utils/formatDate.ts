/**
 * Converts a stored "MM-YYYY" string (e.g. "08-2026") into a readable label
 * such as "Aug 2026".
 */
function formatMonth(value: string): string {
    const [month, year] = value.split("-").map(Number);
    // The `?? 1` is a defensive default if the string has no month part.
    return new Date(year, (month ?? 1) - 1).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
}

/**
 * Builds the date range label shown under a job or degree.
 *
 * Both arguments are optional because real-world data is incomplete:
 *   start + end  ->  "Aug 2023 - Apr 2025"
 *   start only   ->  "Aug 2026 - Present"   (an ongoing role)
 *   end only     ->  "May 2019"             (e.g. school, where only the year of completion matters)
 *   neither      ->  ""                
 */
export function formatRange(
    start?: string | null,
    end?: string | null
): string {
    if (start && end) return `${formatMonth(start)} - ${formatMonth(end)}`;
    if (start) return `${formatMonth(start)} - Present`;
    if (end) return formatMonth(end);
    return "";
}