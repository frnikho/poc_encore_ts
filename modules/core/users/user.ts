import {api} from "encore.dev/api";
import {user} from "./user.schema";
import log from "encore.dev/log";
import orm from "@utils/encore/db";
import {createId} from "@utils/db";

interface Response {
  data: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
  }[];
}

export const get = api({expose: true, auth: false, method: 'GET'},
  async (): Promise<Response> => {

  const newUser = await orm.insert(user)
    .values({
      email: `${createId()}@gmail.com`,
      firstname: "ab",
      lastname: "cd",
      password: "ef"
    }).returning();

  log.debug("createdUser", newUser);

  const users = await orm.select({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    id: user.id,
  }).from(user);

  return {
    data: users
  }
});

interface CreateUserJob {
  users: {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
  }[];
}

export const create_user_job = api({}, async (req: CreateUserJob) => {
  log.debug(`Creating users from batch.... (${req.users.length})`);
  return orm.insert(user).values(req.users).returning();
})