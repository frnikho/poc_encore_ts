import {Secret} from "encore.dev/config";
import {Redis} from "ioredis";

export const cache =  (secret: Secret<"REDIS_URL">) => new Redis(secret());