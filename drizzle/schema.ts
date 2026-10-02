import { index, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const projects = mysqlTable(
  "projects",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 160 }).notNull(),
    rootUrl: varchar("rootUrl", { length: 2048 }).notNull(),
    description: text("description"),
    status: mysqlEnum("status", ["active", "paused"]).default("active").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({ userIdIdx: index("projects_user_id_idx").on(table.userId) }),
);

export const extractionRuns = mysqlTable(
  "extractionRuns",
  {
    id: int("id").autoincrement().primaryKey(),
    projectId: int("projectId").references(() => projects.id, { onDelete: "set null" }),
    userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    mode: mysqlEnum("mode", ["extract", "crawl"]).notNull(),
    target: varchar("target", { length: 2048 }).notNull(),
    status: mysqlEnum("status", ["queued", "running", "completed", "failed"]).default("queued").notNull(),
    pagesDiscovered: int("pagesDiscovered").default(0).notNull(),
    pagesProcessed: int("pagesProcessed").default(0).notNull(),
    extractedFields: int("extractedFields").default(0).notNull(),
    resultSummary: text("resultSummary"),
    errorMessage: text("errorMessage"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    completedAt: timestamp("completedAt"),
  },
  table => ({
    userIdIdx: index("runs_user_id_idx").on(table.userId),
    projectIdIdx: index("runs_project_id_idx").on(table.projectId),
  }),
);

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;
export type ExtractionRun = typeof extractionRuns.$inferSelect;
export type InsertExtractionRun = typeof extractionRuns.$inferInsert;
