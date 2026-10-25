function formatMonth(value: string): string {
    const [month, year] = value.split("-").map(Number);
    return new Date(year, (month ?? 1) - 1).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
}

export function formatRange(
    start?: string | null,
    end?: string | null
): string {
    if (start && end) return `${formatMonth(start)} – ${formatMonth(end)}`;
    if (start) return `${formatMonth(start)} – Present`;
    if (end) return formatMonth(end);
    return "";
}