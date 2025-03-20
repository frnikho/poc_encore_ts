import { Header } from "encore.dev/api";
import {UserResponse} from "../users/user.response";

export interface LoginResponse {
  user_cookie: Header<"Set-Cookie">;
  test_cookie: Header<"Set-Cookie">;
  user: UserResponse
}

export interface RegisterResponse {
  message: string;
}