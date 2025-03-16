import {api} from "encore.dev/api";
import {createId, user} from "./user.schema";
import log from "encore.dev/log";

import {SQLDatabase} from "encore.dev/storage/sqldb";
import {drizzle} from "drizzle-orm/node-postgres";

const db = new SQLDatabase('encore_db');
export const orm = drizzle(db.connectionString);

interface Response {
  data: {
    id: string;
    name: string;
    email: string;
    firstname: string;
    lastname: string;
  }[];
}

export const get = api({expose: true, auth: false, method: 'GET'},
  async (): Promise<Response> => {

  const newUser = await orm.insert(user)
    .values({
      name: "John Doe",
      email: `${createId()}@gmail.com`,
      firstname: "ab",
      lastname: "cd",
      password: "ef"
    }).returning();

  log.debug("createdUser", newUser);

  const users = await orm.select({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    name: user.name,
    id: user.id,
  }).from(user);

  return {
    data: users
  }
});