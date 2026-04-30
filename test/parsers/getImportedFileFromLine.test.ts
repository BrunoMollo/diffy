import { describe, it, expect } from "vitest";
import { getImportedFileFromLine } from "../../src/getImportedFileFromLine.ts";

describe("getImportedFileFromLine", () => {
  it("should return null if the line is not an import", () => {
    const res = getImportedFileFromLine("console.log('hello')");
    expect(res).toBe(null);
  });

  it("should return the imported file if the line is a valid import (single quotes)", () => {
    const res = getImportedFileFromLine("import { hello } from 'hello.ts'");
    expect(res).toBe("hello.ts");
  });

  it("should return the imported file if the line is a valid import", () => {
    const res = getImportedFileFromLine(`import { bye } from "bye.ts"`);
    expect(res).toBe("bye.ts");
  });

  it("should return the imported file if the line is a valid import full (single quotes)", () => {
    const res = getImportedFileFromLine("import hello from 'hello.ts'");
    expect(res).toBe("hello.ts");
  });

  it("should return the imported file if the line is a valid import full (double quotes)", () => {
    const res = getImportedFileFromLine(`import bye from "bye.ts"`);
    expect(res).toBe("bye.ts");
  });

  it("should return the imported file if the line is a valid import with * (single quotes)", () => {
    const res = getImportedFileFromLine("import * as hello from 'hello.ts'");
    expect(res).toBe("hello.ts");
  });

  it("should return the imported file if the line is a valid import with * (double quotes)", () => {
    const res = getImportedFileFromLine(`import * as bye from "bye.ts"`);
    expect(res).toBe("bye.ts");
  });

  it("should return the imported file ignoring the semicolon (single quotes)", () => {
    const res = getImportedFileFromLine("import * as hello from 'hello.ts';");
    expect(res).toBe("hello.ts");
  });

  it("should return the imported file ignoring the semicolon (double quotes)", () => {
    const res = getImportedFileFromLine(`import * as bye from "bye.ts";`);
    expect(res).toBe("bye.ts");
  });

  it("should return the imported file if the line is a valid import with path (double quotes)", () => {
    const res = getImportedFileFromLine(`import * as bye from "./test/bye.ts"`);
    expect(res).toBe("./test/bye.ts");
  });

  it("should return the imported file if the line is a valid import with path (single quotes)", () => {
    const res = getImportedFileFromLine(`import * as bye from './test/bye.ts'`);
    expect(res).toBe("./test/bye.ts");
  });

  it("should return null with empty string", () => {
    const res = getImportedFileFromLine("");
    expect(res).toBe(null);
  });

  it("should return null with spaces", () => {
    const res = getImportedFileFromLine("     ");
    expect(res).toBe(null);
  });

  it("should return null if not an import but has the word import", () => {
    const res = getImportedFileFromLine("const importCounter = 0");
    expect(res).toBe(null);
  });

  it("should return null if not an import at the begining but has the word import", () => {
    const res = getImportedFileFromLine("import please");
    expect(res).toBe(null);
  });

  it("should return null if it is an import without from", () => {
    const res = getImportedFileFromLine("import missing 'missing.ts'");
    expect(res).toBe(null);
  });
});
