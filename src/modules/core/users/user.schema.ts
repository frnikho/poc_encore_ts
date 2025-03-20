import * as p from "drizzle-orm/pg-core";
import {AnyPgColumn} from "drizzle-orm/pg-core";
import {uid} from "@utils/db";
import {getTableColumns, InferInsertModel, InferSelectModel, sql} from "drizzle-orm";

export const user = p.pgTable("users", {
  id: uid().primaryKey(),
  email: p.varchar({length: 256}).unique().notNull(),
  lastname: p.varchar({length: 64}).notNull(),
  firstname: p.varchar({length: 64}).notNull(),
  password: p.varchar({length: 256}).notNull(),
  updated_by: p.varchar().references((): AnyPgColumn => user.id, {onDelete: "set null"}).default(sql`NULL`),
  created_at: p.timestamp().defaultNow().notNull(),
  updated_at: p.timestamp(),
  deleted_at: p.timestamp(),
});

export type FullUser = InferSelectModel<typeof user>;
export type ReliableUser = Omit<InferSelectModel<typeof user>, "password">;
export type InsertUser = InferInsertModel<typeof user>;

const { password, ...reliableUser } = getTableColumns(user);

export { reliableUser };
export const fullUser = getTableColumns(user);

export const user_history = p.pgTable("users_history", {
  id: uid().primaryKey(),
  user_id: p.varchar().references((): AnyPgColumn => user.id, {onDelete: "cascade"}).notNull(),
  field: p.varchar().notNull(),
  old_value: p.varchar(),
  new_value: p.varchar(),
  updated_by: p.varchar().references((): AnyPgColumn => user.id, {onDelete: "set null"}).default(sql`NULL`),
  created_at: p.timestamp().defaultNow().notNull(),
});