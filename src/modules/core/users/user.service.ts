import {fullUser, InsertUser, ReliableUser, user} from "./user.schema";
import {count, eq, getTableColumns, SQL} from "drizzle-orm";
import {APIError, ErrCode} from "encore.dev/api";
import {err, ok, Result, ResultAsync} from "neverthrow";
import {dbPool, DbPool} from "@utils/encore/db";

const operation = <T> (a: Promise<T>) => {
  return ResultAsync.fromPromise(a, () => new APIError(ErrCode.Internal, "Database error"));
}

const oneOrError = <T> (r: T[]): Result<T, APIError> => {
  if (r.length === 0) {
    return err(new APIError(ErrCode.InvalidArgument, "User not found"));
  }
  return ok(r[0]);
}

export const findUserById = (orm: DbPool, id: string): ResultAsync<ReliableUser, APIError> => {
  return operation(orm.select().from(user).where(eq(user.id, id)))
    .andThen(oneOrError)
}

type UserSelectFields = ReturnType<typeof getTableColumns<typeof user>>;

export const findUserByEmail = <T extends Partial<UserSelectFields>>(email: string, data?: T) => {
  return operation(dbPool.select(data ?? fullUser).from(user).where(eq(user.email, email)))
    .andThen(oneOrError);
}

export const findWhere = <T extends Partial<UserSelectFields>, Z extends SQL>(whereClause: Z, data?: T) => {
  return operation(dbPool.select(data ?? fullUser).from(user).where(whereClause))
    .andThen(oneOrError);
}

export const countWhere = <Z extends SQL>(whereClause: Z) => {
  return operation(dbPool.select({count: count()}).from(user).where(whereClause))
    .andThen(oneOrError);
}

export const insertUser = (body: InsertUser) => {
  return operation(dbPool.insert(user).values(body).returning());
}