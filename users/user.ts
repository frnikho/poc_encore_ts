import {api} from "encore.dev/api";
import {SQLDatabase} from "encore.dev/storage/sqldb";
import { drizzle } from "drizzle-orm/node-postgres";
import {users} from "./schema";

const db = new SQLDatabase('encore_prisma_test', {
  migrations: {
    path: './migrations',
    source: 'drizzle',
  },
});

const orm = drizzle(db.connectionString);

export const get = api({expose: true, auth: false, method: 'GET'}, async () => {
  return orm.select().from(users)
});