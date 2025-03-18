import {init} from "@paralleldrive/cuid2";
import * as p from "drizzle-orm/pg-core";

export const createId = init({
  length: 8
})

export const uid = () => p.varchar().$default(() => createId());