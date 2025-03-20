import {drizzle, NodePgDatabase} from "drizzle-orm/node-postgres";
import {SQLDatabase} from "encore.dev/storage/sqldb";

export const db = new SQLDatabase("encore_db");
export const dbPool: DbPool = drizzle(db.connectionString);

export type DbPool = NodePgDatabase;
