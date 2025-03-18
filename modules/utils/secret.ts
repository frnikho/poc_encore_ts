import {init} from "@paralleldrive/cuid2";

export const hash = (password: string) => Bun.password.hash(password, {
  algorithm: "argon2id",
  memoryCost: 4,
  timeCost: 3,
});

export const verify = (password: string, hash: string) => Bun.password.verify(password, hash, 'argon2id');


export const createCode = init({
  length: 22
})