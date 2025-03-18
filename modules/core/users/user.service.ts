import orm from "@utils/encore/db";
import {user} from "./user.schema";
import {eq} from "drizzle-orm";
import {match} from "ts-pattern";
import {APIError, ErrCode} from "encore.dev/api";

export const findUserByEmail = async (email: string) => {
  const users = await orm.select().from(user).where(eq(user.email, email));
  return match(users.length)
    .with(1, () => users[0])
    .otherwise(() => {
      throw new APIError(ErrCode.InvalidArgument, "User not found");
    });
}