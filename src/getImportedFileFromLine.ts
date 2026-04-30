import { removeWithSpace } from "./utils";

export function getImportedFileFromLine(line: string): string | null {
  const trimmedLine = removeWithSpace(line);
  if (!trimmedLine.startsWith("import")) {
    return null;
  }
  const matchImportStructure = /^\s*import\s+.+\s+from\s+['"].+['"]/.test(line);

  if (!matchImportStructure) {
    return null;
  }

  const fromIndex = line.indexOf("from");
  if (fromIndex === -1) {
    return null;
  }

  const afterFrom = line.slice(fromIndex + 4).trim();

  const importUrl = afterFrom.replace(/'|"|;/g, ""); // remove quotes and semicolon

  return importUrl;
}
