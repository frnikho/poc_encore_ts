import {pgEnum, pgTable} from "drizzle-orm/pg-core";
import {uid} from "@utils/db";
import {user} from "@core/users";
import * as p from 'drizzle-orm/pg-core'

export const authStatus = pgEnum("auth_status", ["success", "failed"]);

export const authHistory = pgTable("login_history", {
  id: uid().primaryKey(),
  userId: uid().references(() => user.id, {onDelete: "cascade"}).notNull(),
  status: authStatus().notNull(),
  message: p.varchar({length: 256}),
  created_at: p.timestamp().defaultNow().notNull(),
});