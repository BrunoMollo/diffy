import { describe, it, expect } from "vitest";
import { createExtensionValidator } from "../../src/checkIfExtensionValid.ts";

const extensionValidator = createExtensionValidator([
  ".ts",
  ".js",
  ".jsx",
  ".tsx",
]);

describe("checkIfExtensionValid", () => {
  it("should return true if the extension is valid (ts file)", () => {
    expect(extensionValidator("index.ts")).toBe(true);
  });

  it("should return true if the extension is valid (jsx file)", () => {
    expect(extensionValidator("component.jsx")).toBe(true);
  });

  it("should return false if the extension is not valid (php file)", () => {
    expect(extensionValidator("view.php")).toBe(false);
  });

  it("should throw an error if no extensions are provided", () => {
    expect(() => createExtensionValidator([])).toThrowError(
      "No extensions provided",
    );
  });

  it("should return false if the it get passed an empty string", () => {
    expect(extensionValidator("")).toBe(false);
  });

  it("should return false if the it get passed an string witout extension", () => {
    expect(extensionValidator("license")).toBe(false);
  });

  it("should consider the last extension as valid", () => {
    expect(extensionValidator("something.test.js")).toBe(true);
  });

  it("should no consider what is before the last extension", () => {
    expect(extensionValidator("mixed.ts.blade")).toBe(false);
  });

  it("if it get passed only the extension with a period, is valid", () => {
    expect(extensionValidator(".ts")).toBe(true);
  });

  it("if it get passed only the extension without a period, is invalidvalid", () => {
    expect(extensionValidator("ts")).toBe(false);
  });

  it("concatenation of extensions is not valid", () => {
    expect(extensionValidator("hecky.tsts")).toBe(false);
    expect(extensionValidator("hecky.jsts")).toBe(false);
    expect(extensionValidator("hecky.jsxts")).toBe(false);
  });
});
