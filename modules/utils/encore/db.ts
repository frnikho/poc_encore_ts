import {SQLDatabase} from "encore.dev/storage/sqldb";
import {drizzle} from "drizzle-orm/node-postgres";
import {APIError, ErrCode} from "encore.dev/api";

export const db = new SQLDatabase("encore_db");
export default drizzle(db.connectionString);

export const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
  if (values.length >= 1) {
    return values[0]!
  }
  throw new APIError(ErrCode.Internal, "Expected exactly one value, got none !");
}
