import * as p from "drizzle-orm/pg-core";
import {AnyPgColumn,  varchar} from "drizzle-orm/pg-core";
import {init} from "@paralleldrive/cuid2";

export const createId = init({
  length: 8
})

export const uid = () => varchar().$default(() => createId());

export const datesFields = {
  created_at: p.timestamp().defaultNow().notNull(),
  updated_at: p.timestamp(),
  deleted_at: p.timestamp(),
}

export const user = p.pgTable("users", {
  id: uid().primaryKey(),
  name: p.text().notNull(),
  email: p.text().unique().notNull(),
  lastname: p.text().notNull(),
  firstname: p.text().notNull(),
  password: p.text().notNull(),
  updated_by: varchar().references((): AnyPgColumn => user.id, {onDelete: "set null"}).default(null),
  ...datesFields,
});