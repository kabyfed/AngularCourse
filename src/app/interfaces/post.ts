import { Author } from "./author";

export interface Post {
  id: string;
  body: string;
  title: string;
  tags?: string[];
  image?: string;
  timeCooking: number;
  author: Author;
  createdOn: string;
  updatedOn: string;
}
