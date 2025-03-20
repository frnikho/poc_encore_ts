import {Subscription} from "encore.dev/pubsub";
import {LoginEvent, logins} from "./auth.topic";
import {authHistory} from "./auth.schema";
import log from "encore.dev/log";
import {SQLDatabase} from "encore.dev/storage/sqldb";
import {DbPool} from "@utils/encore/db";
import {drizzle} from "drizzle-orm/node-postgres";

/*
export const db = new SQLDatabase("encore_db");
const orm: DbPool = drizzle(db.connectionString);

new Subscription(logins, "login_history", {
  handler: async (evt: LoginEvent) => {
    log.debug("insert new auth_history", evt);
    return orm.insert(authHistory).values({
      userId: evt.userId,
      message: evt.message,
      status: evt.status,
    })
  }
});*/
