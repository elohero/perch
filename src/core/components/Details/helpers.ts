export function formatDescription(value?: string): string {
  return value?.replace('%empty%', '') ?? '';
}