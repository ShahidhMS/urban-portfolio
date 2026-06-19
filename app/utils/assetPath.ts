export const getAssetPath = (path: string | undefined): string => {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  const basePath = "/urban-portfolio";
  if (path.startsWith(basePath)) return path;
  return `${basePath}${path}`;
};
