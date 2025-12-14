// utils/cleanText.ts
export function cleanText(text: string): string {
  return text.trim().toLowerCase().replace(/[^\w\s]/gi, "");
}
