import {type} from "arktype";

const userResponse = type({
  firstname: String,
  lastname: String,
  email: String,
  created_at: Date,
})

export interface UserResponse {
  firstname: string;
  lastname: string;
  email: string;
  created_at: Date;
}