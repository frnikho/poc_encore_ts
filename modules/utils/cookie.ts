import {Header} from "encore.dev/api";

export type CookieSameSite = 'None' | 'Strict' | 'Lax';

interface CookieOptions {
  domain?: string;
  expires?: Date;
  httpOnly?: boolean;
  maxAge?: number;
  path?: string;
  sameSite?: CookieSameSite;
  secure?: boolean;
}

export const setCookie = (cookie: string, options?: CookieOptions): Header<"Set-Cookie"> => {
  const cookieParts = [
    cookie,
    options?.domain && `Domain=${options.domain}`,
    options?.expires && `Expires=${options.expires.toUTCString()}`,
    options?.httpOnly ? "HttpOnly" : "",
    options?.maxAge && `Max-Age=${options.maxAge}`,
    options?.path && `Path=${options.path}`,
    options?.sameSite && `SameSite=${options.sameSite}`,
    options?.secure ? "Secure" : ""
  ].filter(Boolean);

  return `Set-Cookie: ${cookieParts.join("; ")}`;
}