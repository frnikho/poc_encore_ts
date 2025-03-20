import {api, APIError, ErrCode} from "encore.dev/api";
import {LoginRequest, RegisterRequest} from "./auth.request";
import {countWhere, findUserByEmail, fullUser, FullUser, insertUser, ReliableUser, user} from "@core/users";
import {createCode, hash, verify} from "@utils/secret";
import {secret} from "encore.dev/config";
import Redis from "ioredis";
import {err, fromPromise, ok, ResultAsync} from "neverthrow";
import {setCookie} from "@utils/cookie";
import {eq} from "drizzle-orm";

const redis_url = secret("REDIS_URL")
const client = new Redis(redis_url());

export const login = api({
  method: 'POST',
  expose: true,
  path: '/auth/login'
}, async (req: LoginRequest) => {
  const userFound = await findUserByEmail(req.email, fullUser)
    .andThen((user) => verifyUser(req.password, user))
    .andThen(([correct, user]) => {
      if (!correct) {
        return err(new APIError(ErrCode.InvalidArgument, "Invalid password"));
      }
      return insertUserToken(user);
    });

  return userFound.match(
    ([token, user]) => ({
      user: user,
      test_cookie: setCookie(`test=abcd`, {httpOnly: false, sameSite: 'None', path: '/'}),
      user_cookie: setCookie(`token=${token}`, {httpOnly: true, sameSite: 'Lax', secure: true, path: '/'}),
    }),
    (err) => {
      throw err;
    }
  )
});

const verifyUser = (password: string, user: FullUser): ResultAsync<[boolean, ReliableUser], APIError> => {
  return verify(password, user.password)
    .map((a) => [a, user]);
};

const insertUserToken = (user: ReliableUser): ResultAsync<[string, ReliableUser], APIError> => {
  const code = createCode();
  return fromPromise(client.set(`token:${code}`, user.id), () => new APIError(ErrCode.Internal, "Redis error"))
    .map(() => [code, user]);
}

const verifyUserAlreadyExists = (email: string) => {
  return countWhere(eq(user.email, email))
    .andThen((res) => {
      if (res.count !== 0) {
        return err(new APIError(ErrCode.InvalidArgument, "Email already exists"));
      }
      return ok();
    })
}

export const register = api({method: 'POST', expose: true, path: '/auth/register'}, async (req: RegisterRequest) => {

  const createdUser = verifyUserAlreadyExists(req.email)
    .andThen(() => hash(req.password))
    .andThen((password) => insertUser({
      email: req.email,
      firstname: req.firstname,
      lastname: req.lastname,
      password: password,
    }));

  return createdUser
    .match((user) => ({
        user: user,
      }),
      andThrow
    );
});

export const andThrow = (err: APIError) => {
  throw err;
}

/*
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
    operations.push(core.create_user_job({users: usersToCreate.slice(i, i + batchSize)}));
  }
  Promise.all(operations).then(r => {
    log.debug('batch completed !');
  }).catch((err) => {
    log.error(err);
  });
  return {
    message: 'batch started !'
  }
});*/
