import {authHandler} from "encore.dev/auth";
import {APIError, ErrCode, Header} from "encore.dev/api";
import {getCookie} from "@utils/cookie";
import {secret} from "encore.dev/config";
import Redis from "ioredis";
import {findUserById} from "@core/users";
import {err, errAsync, ok, okAsync, Result} from "neverthrow";

/*
interface AuthParams {
  cookie: Header<"Cookie">;
  authorization?: Header<"Authorization">;
}

interface AuthResponse {
  user?: {
    id: string
    email: string;
    firstname: string;
    lastname: string;
  };
  userID: string;
}

const redis_url = secret("REDIS_URL")
const client = new Redis(redis_url());

export const basicAuthHandler = authHandler(async (params: AuthParams): Promise<AuthResponse> => {

  const token = getCookie(params.cookie, "token");
  if (!token) {
    throw new APIError(ErrCode.Unauthenticated, "Cookie token not found");
  }

  const userID = await client.get(token);
  if (!userID) {
    throw new APIError(ErrCode.Unauthenticated, "Invalid token");
  }

  const foundUser = await findUserById(userID);

  return {
    userID: foundUser.id,
    user: foundUser
  }
});

export const cookieAuth = async (params: AuthParams): Promise<Result<AuthResponse, APIError>> => {

  const token = getCookie(params.cookie, "token");

  const userID = await token.asyncMap(async (token) => {
    const userID = await client.get(token);
    if (!userID) {
      return errAsync(new APIError(ErrCode.Unauthenticated, "Invalid token"));
    }
    return userID;
  });

  const a = token.asyncAndThen(async (token) => {
    const userID = await client.get(token);
    if (!userID) {
      return err(new APIError(ErrCode.Unauthenticated, "Invalid token"));
    }
    return ok(userID)
  })

  return ok({userID: "abc"})
}*/
