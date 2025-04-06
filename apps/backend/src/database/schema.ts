import {
    integer,
    sqliteTable,
    text
} from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
    id: integer().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    email: text().notNull().unique(),
});
export type UserInferSelect = typeof usersTable.$inferSelect;
