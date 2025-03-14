import { api } from "encore.dev/api";
import { hello } from "~encore/clients";

interface Response {
  greeting: string;
}

export const greeting = api(
  {expose: true, method: 'GET', path: '/greeting/:name'},
  async ({ name }: {name: string}) => {
    const {message} = await hello.get();
    return {greeting: `${message} ${name}!`};
  }
)