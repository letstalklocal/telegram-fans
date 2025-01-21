import { pgTable, text, serial, integer, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const creators = pgTable("creators", {
  id: serial("id").primaryKey(),
  telegramId: text("telegram_id").unique().notNull(),
  name: text("name").notNull(),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  creatorId: integer("creator_id").references(() => creators.id),
  title: text("title").notNull(),
  description: text("description"),
  price: doublePrecision("price").notNull(),
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  createdAt: timestamp("created_at").defaultNow(),
  duration: integer("duration"),
});

export const purchases = pgTable("purchases", {
  id: serial("id").primaryKey(),
  videoId: integer("video_id").references(() => videos.id),
  buyerId: text("buyer_id").notNull(), // Telegram user ID
  amount: doublePrecision("amount").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  status: text("status").notNull(), // pending, completed, failed
});

export type Creator = typeof creators.$inferSelect;
export type NewCreator = typeof creators.$inferInsert;
export type Video = typeof videos.$inferSelect;
export type NewVideo = typeof videos.$inferInsert;
export type Purchase = typeof purchases.$inferSelect;
export type NewPurchase = typeof purchases.$inferInsert;
