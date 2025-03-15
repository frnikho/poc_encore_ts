import {api} from "encore.dev/api";
import {createId, user} from "./user.schema";
import log from "encore.dev/log";

import {SQLDatabase} from "encore.dev/storage/sqldb";
import {drizzle} from "drizzle-orm/node-postgres";

const db = new SQLDatabase('encore_db');
export const orm = drizzle(db.connectionString);

export const get = api({expose: true, auth: false, method: 'GET'}, async () => {

  const newUser = await orm.insert(user)
    .values({
      name: "John Doe",
      email: `${createId()}@gmail.com`,
      firstname: "ab",
      lastname: "cd",
      password: "ef"
    }).returning();

  log.debug("createdUser", newUser);

  return orm.select().from(user)
});