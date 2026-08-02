import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'



export const users = sqliteTable('users', {
  id: integer({ mode: 'number' }).primaryKey({
    autoIncrement: true,
  }),
  name: text().notNull().unique(),
  email: text().notNull().unique(),
  lastLogin: integer('created_at', { mode: 'timestamp' }).default(
    sql`(unixepoch())`,
  ),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
