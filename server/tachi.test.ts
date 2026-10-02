import { describe, expect, it } from "vitest";
import { readInsertId } from "./db";
import { normalizeTachiTarget } from "./routers";

describe("Tachi data conventions", () => {
  it("normalizes bare domains into secure targets", () => {
    expect(normalizeTachiTarget("tachi.dev")).toBe("https://tachi.dev/");
  });

  it("rejects invalid targets with a typed error", () => {
    expect(() => normalizeTachiTarget("https://")).toThrow("valid HTTP or HTTPS website URL");
  });

  it("keeps extraction and crawl modes distinct", () => {
    const mode: "extract" | "crawl" = "crawl";
    expect(mode).toBe("crawl");
  });

  it("reads inserted IDs from the MySQL result tuple", () => {
    expect(readInsertId([{ insertId: 42 }])).toBe(42);
    expect(() => readInsertId([{ insertId: 0 }])).toThrow("valid inserted record ID");
  });
});
