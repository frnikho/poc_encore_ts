import {api} from "encore.dev/api";
import {SQLDatabase} from "encore.dev/storage/sqldb";
import { drizzle } from "drizzle-orm/node-postgres";
import {users} from "./user.schema";
import {orm} from "../../db";

export const get = api({expose: true, auth: false, method: 'GET'}, async () => {
  return orm.select().from(users)
});