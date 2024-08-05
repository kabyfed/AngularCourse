import { Login } from "./login";

export interface Register  extends Login{
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
}
