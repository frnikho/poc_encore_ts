import {api, APIError, ErrCode} from "encore.dev/api";
import orm from "@utils/encore/db";
import {LoginRequest, RegisterRequest} from "./auth.request";
import {LoginResponse} from "./auth.response";
import {logins} from "./auth.topic";
import {user} from "../users/user.schema";
import {count, eq} from "drizzle-orm";
import {match} from "ts-pattern";
import {createCode, hash, verify} from "@utils/secret";

import {setCookie} from "@utils/cookie";
import {findUserByEmail} from "../users/user.service";
import {secret} from "encore.dev/config";
import {cache} from "@utils/cache";
import {createId} from "@utils/db";
import { users } from "~encore/clients";
import log from "encore.dev/log";

export const client = cache(secret("REDIS_URL"));

export const login = api(
  {method: 'POST', expose: true, path: '/auth/login'}, async (req: LoginRequest): Promise<LoginResponse> => {
  const user = await findUserByEmail(req.email);

  if (!await verify(req.password, user.password)) {
    await logins.publish({message: 'Invalid password', status: 'failed', userId: user.id});
    throw new APIError(ErrCode.InvalidArgument, "Invalid password");
  }

  const token = await insertUserToken(user.id);

  await logins.publish({message: 'Success login !', status: 'success', userId: user.id});
  return {
    user: user,
    cookie: setCookie(`token=${token}`, {httpOnly: true, sameSite: 'Strict', secure: true}),
  }
});

const insertUserToken = async (userId: string): Promise<string> => {
  const code = createCode();
  await client.set(code, userId);
  return code;
}

export const register = api({method: 'POST', expose: true, path: '/auth/register'}, async (req: RegisterRequest) => {
  const users = await orm.select({count: count()}).from(user).where(eq(user.email, req.email));
  return match(users[0].count).with(0, async () => {
    return orm.insert(user)
      .values({
        email: req.email,
        firstname: req.firstname,
        lastname: req.lastname,
        password: await hash(req.password),
      }).returning();
  }).otherwise(() => {
    throw new APIError(ErrCode.InvalidArgument, "Email already exists").withDetails({email: req.email});
  });
});

export const forgotPassword = api({method: 'POST', expose: true, path: '/auth/forgot-password'}, async (req) => {

});

export const resetPassword = api({method: 'POST', expose: true, path: '/auth/reset-password'}, async (req) => {

});

export const test = api({expose: true}, async () => {
  const usersPromises = Array.from(Array(50000).keys()).map(async () => {
    return {
      email: `${createId()}@gmail.com`,
      firstname: createId(),
      lastname: createId(),
      password: await hash(createId()),
    }
  });

  const usersToCreate = await Promise.all(usersPromises);

  const batchSize = 2000;

  const operations = [];
  for (let i = 0; i < usersToCreate.length; i += batchSize) {
    operations.push(users.create_user_job({users: usersToCreate.slice(i, i + batchSize)}));
  }
  Promise.all(operations).then(r => {
    log.debug('batch completed !');
  }).catch((err) => {
    log.error(err);
  });
  return {
    message: 'batch started !'
  }
});