import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const db = vi.hoisted(() => ({
  createExtractionRun: vi.fn(),
  createProject: vi.fn(),
  getProjectByIdForUser: vi.fn(),
  listProjectsByUserId: vi.fn(),
  listRunsByUserId: vi.fn(),
}));

vi.mock("./db", () => db);

import { appRouter } from "./routers";

function context(): TrpcContext {
  return {
    user: {
      id: 7,
      openId: "tachi-test-user",
      email: "test@tachi.dev",
      name: "Tachi Test",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Tachi project and run procedures", () => {
  beforeEach(() => vi.resetAllMocks());

  it("creates and lists authenticated projects", async () => {
    db.createProject.mockResolvedValue({ id: 13 });
    db.listProjectsByUserId.mockResolvedValue([{ id: 13, name: "Docs", rootUrl: "https://tachi.dev" }]);
    const caller = appRouter.createCaller(context());

    await expect(caller.projects.create({ name: "Docs", rootUrl: "tachi.dev" })).resolves.toEqual({ id: 13 });
    await expect(caller.projects.list()).resolves.toEqual([{ id: 13, name: "Docs", rootUrl: "https://tachi.dev" }]);
    expect(db.createProject).toHaveBeenCalledWith(expect.objectContaining({ userId: 7, name: "Docs", status: "active" }));
    expect(db.listProjectsByUserId).toHaveBeenCalledWith(7);
  });

  it("rejects inaccessible projects", async () => {
    db.getProjectByIdForUser.mockResolvedValue(undefined);
    const caller = appRouter.createCaller(context());
    await expect(caller.projects.get({ id: 99 })).rejects.toMatchObject({ code: "NOT_FOUND" });
  });

  it("creates completed runs with deterministic metrics", async () => {
    db.getProjectByIdForUser.mockResolvedValue({ id: 13, userId: 7 });
    db.createExtractionRun.mockResolvedValue({ id: 31 });
    const caller = appRouter.createCaller(context());

    await expect(caller.runs.create({ projectId: 13, mode: "crawl", target: "tachi.dev/docs" })).resolves.toEqual({ id: 31, status: "completed" });
    expect(db.createExtractionRun).toHaveBeenCalledWith(expect.objectContaining({
      userId: 7,
      projectId: 13,
      mode: "crawl",
      target: "https://tachi.dev/docs",
      pagesProcessed: 24,
      status: "completed",
    }));
  });

  it("returns typed errors for invalid targets and inaccessible run projects", async () => {
    const caller = appRouter.createCaller(context());
    await expect(caller.runs.create({ mode: "extract", target: "invalid target" })).rejects.toBeDefined();
    db.getProjectByIdForUser.mockResolvedValue(undefined);
    await expect(caller.runs.create({ projectId: 55, mode: "extract", target: "tachi.dev" })).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
});
