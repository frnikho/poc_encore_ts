import {IsEmail, MaxLen, MinLen} from "encore.dev/validate";

export interface RegisterRequest {
  firstname: string & (MinLen<2> & MaxLen<64>);
  lastname: string & (MinLen<2> & MaxLen<64>);
  email: string & (IsEmail);
  password: string & (MinLen<8> & MaxLen<128>);
}

export interface LoginRequest {
  email: string & (IsEmail);
  password: string & (MinLen<8> & MaxLen<128>);
}

export interface ForgotPasswordRequest {
  email: string & (IsEmail);
}

export interface ResetPasswordRequest {
  token: string;
  password: string & (MinLen<8> & MaxLen<128>);
}