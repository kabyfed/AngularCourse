import { Register } from "./register";

export interface AuthUser extends Register {
  id: string;
  role: "admin" | "user" | "guest";
  jwtToken: string;
  expiresIn?: number;
}
