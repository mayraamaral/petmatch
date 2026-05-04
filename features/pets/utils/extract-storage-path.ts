export function extractStoragePath(rawPath: string): string {
  if (!rawPath.includes("http")) return rawPath;

  try {
    const url = new URL(rawPath);
    const pathParts = url.pathname.split("/").filter(Boolean);
    if (pathParts.length >= 2) {
      const fileName = pathParts[pathParts.length - 1];
      const folder = pathParts[pathParts.length - 2];
      return `${folder}/${fileName}`;
    }
  } catch {
    const sanitized = rawPath.split("?")[0];
    const parts = sanitized.split("/").filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
    }
  }

  return rawPath;
}
