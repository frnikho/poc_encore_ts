import { api } from "encore.dev/api";
import log from "encore.dev/log";
import { getAuthData } from "~encore/auth";

interface Response {
  message: string;
}

export const get = api(
  {
    method: 'GET',
    expose: true,
    auth: true,
    path: '/admin'
  },
  async () => {
    const userID = getAuthData()!.userID;
    log.info("User ID", {userID});
    return {
      message: 'hello'
    }
  }
)