export interface User {
  username: string;
  role: "admin" | "user";
  firstName: string;
  lastName: string;
  middleName?: string | null;
  avatar?: string[];
  createdOn?: string | null;
  updatedOn?: string | null;
  lastEntry?: string | null;
  isActive: boolean;
  id: string;
}
