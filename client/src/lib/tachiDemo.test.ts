import { describe, expect, it } from "vitest";
import { canRunTachiDemo, getTachiDemoContext } from "./tachiDemo";

describe("Tachi hero demo input flow", () => {
  it("creates target-first context for URL input", () => {
    expect(getTachiDemoContext("tachi.dev/docs")).toMatchObject({ kind: "url", resultKey: "source", resultValue: "tachi.dev" });
  });

  it("creates scope-first context for prompt input", () => {
    expect(getTachiDemoContext("find API changelog entries")).toMatchObject({ kind: "prompt", resultKey: "brief", resultValue: "find API changelog entries" });
  });

  it("blocks empty demo input", () => {
    expect(canRunTachiDemo("  ")).toBe(false);
  });
});
