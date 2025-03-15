import {SQLDatabase} from "encore.dev/storage/sqldb";
import {drizzle} from "drizzle-orm/node-postgres";

const db = new SQLDatabase('encore_db', {
  migrations: {
    path: './migrations',
    source: 'drizzle',
  },
});

export const orm = drizzle(db.connectionString);