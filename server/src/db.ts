import { drizzle } from 'drizzle-orm/better-sqlite3'; // Drizzle ORM with better-sqlite3
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'; // Define SQLite tables
import betterSqlite3 from 'better-sqlite3'; // SQLite driver

const sqlite = new betterSqlite3('./mydb.sqlite');
export const db = drizzle(sqlite);

export const ambulance = sqliteTable('ambulance', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  location: text('location').notNull(),
  image: text('image').notNull(),
});

export const doctors = sqliteTable('doctors', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  location: text('location').notNull(),
  image: text('image').notNull(),
});
