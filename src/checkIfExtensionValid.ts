export function createExtensionValidator(extensions: Array<string>) {
  if (!extensions || extensions.length === 0) {
    throw new Error("No extensions provided");
  }

  const cleanExtensions = extensions.map((e) => e.replace(".", "").trim());

  return (fileName: string) => {
    const split = fileName.split(".");
    if (split.length < 2) {
      return false;
    }
    const ext = split.pop();
    if (!ext) return false;

    if (cleanExtensions.includes(ext)) {
      return true;
    } else {
      return false;
    }
  };
}
