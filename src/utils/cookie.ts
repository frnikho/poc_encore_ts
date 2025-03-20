import {Header} from "encore.dev/api";
import {err, ok, Result} from "neverthrow";

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

  return cookieParts.join("; ");

}

export const getCookies = (cookie: Header<"Cookie">): [string, string][] => {
  return cookie.split(";").map((cookie) => {
    const [key, value] = cookie.split("=");
    return [key.trim(), value.trim()];
  });
}

export const getCookie = (cookie: Header<"Cookie">, key: string): Result<string, string> => {
  const cookies = getCookies(cookie);
  const findCookie = cookies.find(([cookieKey]) => cookieKey === key);
  if (findCookie) {
    return ok(cookie[1])
  }
  return err("Cookie not found");
}