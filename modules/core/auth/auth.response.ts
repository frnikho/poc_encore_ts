import { Header } from "encore.dev/api";
import {UserResponse} from "../users/user.response";

export interface LoginResponse {
  cookie: Header<"Set-Cookie">;
  user: UserResponse
}

export interface RegisterResponse {
  message: string;
}