import { boolean, integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const blocks = pgTable("blocks", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull().unique(),
  title: text("title").notNull(),
  ministry: text("ministry").notNull().default(""),
  worldName: text("world_name").notNull().default(""),
  description: text("description").notNull().default(""),
  theme: text("theme").notNull().default("congreso"),
  bossName: text("boss_name").notNull().default("Jefe final"),
  bossIntro: text("boss_intro").notNull().default(""),
  bossStyle: text("boss_style").notNull().default("quorum"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  blockId: integer("block_id")
    .notNull()
    .references(() => blocks.id, { onDelete: "cascade" }),
  position: integer("position").notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull().default(""),
  npcName: text("npc_name").notNull().default("Profesor/a"),
  npcRole: text("npc_role").notNull().default(""),
  npcLines: jsonb("npc_lines").$type<string[]>().notNull().default([]),
  tipName: text("tip_name").notNull().default("Compañero/a"),
  tipRole: text("tip_role").notNull().default(""),
  tipLines: jsonb("tip_lines").$type<string[]>().notNull().default([]),
  boeIds: jsonb("boe_ids").$type<string[]>().notNull().default([]),
  needsReview: boolean("needs_review").notNull().default(false),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  blockId: integer("block_id")
    .notNull()
    .references(() => blocks.id, { onDelete: "cascade" }),
  topicId: integer("topic_id").references(() => topics.id, { onDelete: "cascade" }),
  prompt: text("prompt").notNull(),
  options: jsonb("options").$type<string[]>().notNull(),
  answer: integer("answer").notNull(),
  explanation: text("explanation").notNull().default(""),
  reference: text("reference"),
});

export const boeSources = pgTable("boe_sources", {
  id: serial("id").primaryKey(),
  boeId: text("boe_id").notNull().unique(),
  shortName: text("short_name").notNull().default(""),
  title: text("title").notNull().default(""),
  url: text("url"),
  status: text("status").notNull().default("pendiente"),
  lastUpdate: text("last_update"),
  reformCount: integer("reform_count").notNull().default(0),
  changed: boolean("changed").notNull().default(false),
  lastCheckedAt: timestamp("last_checked_at", { withTimezone: true }),
});

export const playerProgress = pgTable("player_progress", {
  playerId: text("player_id").primaryKey(),
  completed: jsonb("completed").$type<string[]>().notNull().default([]),
  testScores: jsonb("test_scores")
    .$type<Record<string, { score: number; total: number }>>()
    .notNull()
    .default({}),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
