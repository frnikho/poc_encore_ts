import {init} from "@paralleldrive/cuid2";
import {fromPromise, ResultAsync} from "neverthrow";
import {APIError, ErrCode} from "encore.dev/api";

export const hash = (password: string): ResultAsync<string, APIError> => {
  return fromPromise(Bun.password.hash(password, {
    algorithm: "argon2id",
    memoryCost: 4,
    timeCost: 3,
  }), () => {
    return new APIError(ErrCode.Internal, "Hashing error");
  })
};

export const verify = (password: string, hash: string): ResultAsync<boolean, APIError> => {
  return fromPromise(Bun.password.verify(password, hash, 'argon2id'), () => {
    return new APIError(ErrCode.Internal, "Hash verification error");
  })
};

export const createCode = init({
  length: 22
})