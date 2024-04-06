export function formatDate(dateString: string): string {
  const date: Date = new Date(dateString);
  return date.toISOString().split("T")[0];
}
