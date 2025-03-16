import {api} from "encore.dev/api";
import {Subscription} from "encore.dev/pubsub";

export const loginHandler = api({method: 'POST', expose: true, path: '/auth/login'}, async () => {

});

export const registerHandler = api({method: 'POST', expose: true, path: '/auth/register'}, async () => {
  console.log('register');
});