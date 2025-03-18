import * as p from "drizzle-orm/pg-core";
import {AnyPgColumn} from "drizzle-orm/pg-core";
import {uid} from "@utils/db";
import {sql} from "drizzle-orm";

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