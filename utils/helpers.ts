export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

/**
 * Get uppercase initials from a full name string.
 * 
 * Examples:
 *  - "John Doe" ➜ "JD"
 *  - "  alice  " ➜ "A"
 *  - "Mary-Jane Watson" ➜ "MW"
 *  - "Dr. Stephen Vincent Strange" ➜ "SS"
 *  - "el niño" ➜ "EN"
 *  - "" ➜ ""
 *  - null / undefined ➜ ""
 */
export function getInitials(fullName?: string | null): string {
  if (!fullName || typeof fullName !== "string") return "";

  // Normalize whitespace and remove unwanted characters
  const cleanName = fullName
    .trim()
    .replace(/\s+/g, " ")           // multiple spaces -> single space
    .replace(/[^a-zA-ZÀ-ÿ\s'-]/g, ""); // allow letters + hyphens + apostrophes

  if (!cleanName) return "";

  const parts = cleanName.split(" ").filter(Boolean);

  if (parts.length === 1) {
    // Single name case: take first 2 meaningful letters (handle hyphen too)
    const firstWord = parts[0].replace(/[-']/g, "");
    return firstWord.slice(0, 2).toUpperCase();
  }

  // Multi-word name: take first letter of first and last words
  const firstInitial = parts[0][0] || "";
  const lastInitial = parts[parts.length - 1][0] || "";

  return (firstInitial + lastInitial).toUpperCase();
}
