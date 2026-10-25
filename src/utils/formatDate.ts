function formatMonth(value: string): string {
  const [month, year] = value.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function formatRange(start: string, end: string | null): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : "Present"}`;
}