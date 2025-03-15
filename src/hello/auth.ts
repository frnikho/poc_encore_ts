import {authHandler} from "encore.dev/auth";
import {Header, Gateway} from "encore.dev/api";

interface AuthParams {
  authorization: Header<"Authorization">;
}

interface AuthData {
  userID: string;
}

export const auth = authHandler<AuthParams, AuthData>(async (params) => {
  return {
    userID: "123"
  }
})

export const gateway = new Gateway({
  authHandler: auth,
})
