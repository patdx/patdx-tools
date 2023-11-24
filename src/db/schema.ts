import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const dates = sqliteTable('dates', {
  id: text('id').primaryKey(),
  name: text('name'),
  emoji: text('emoji'),
  date: text('date').notNull(), // YYYY-MM-DD or MM-DD
  nextEvent: text('next_event').notNull(), // YYYY-MM-DD, used for sorting
});

export type SelectDate = typeof dates.$inferSelect;
export type InsertDate = typeof dates.$inferInsert;
