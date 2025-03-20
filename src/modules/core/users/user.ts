import {api} from "encore.dev/api";
import {user} from "./user.schema";
import log from "encore.dev/log";
import {createId} from "@utils/db";
import { getAuthData } from "~encore/auth";
import {SQLDatabase} from "encore.dev/storage/sqldb";
import {DbPool} from "@utils/encore/db";
import {drizzle} from "drizzle-orm/node-postgres";

interface Response {
  data: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
  }[];
}

export const db = new SQLDatabase("encore_db");
const orm: DbPool = drizzle(db.connectionString);

export const get = api({expose: true, auth: false, method: 'GET'},
  async (): Promise<Response> => {

  const newUser = await orm.insert(user)
    .values({
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
    id: user.id,
  }).from(user);

  return {
    data: users
  }
});

interface CreateUserJob {
  users: {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
  }[];
}

export const create_user_job = api({}, async (req: CreateUserJob) => {
  log.debug(`Creating users from batch.... (${req.users.length})`);
  return orm.insert(user).values(req.users).returning();
})

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const testUser = api({expose: true, auth: true, method: 'POST', path: '/user.test'}, async () => {
  /*log.debug("Starting blocking test");
  await timeout(10000)
  log.debug("Finish blocking test");
  return {
    done: true
  }*/
})