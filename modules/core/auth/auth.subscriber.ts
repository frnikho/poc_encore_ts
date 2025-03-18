import {Subscription} from "encore.dev/pubsub";
import {LoginEvent, logins, RegisterEvent, registers} from "./auth.topic";
import orm from '@utils/encore/db';
import {authHistory} from "./auth.schema";
import log from "encore.dev/log";

new Subscription(logins, "login_history", {
  handler: async (evt: LoginEvent) => {
    log.debug("insert new auth_history", evt);
    return orm.insert(authHistory).values({
      userId: evt.userId,
      message: evt.message,
      status: evt.status,
    })
  }
});

new Subscription(registers, "register_history", {
  handler: async (evt: RegisterEvent) => {

  }
})
