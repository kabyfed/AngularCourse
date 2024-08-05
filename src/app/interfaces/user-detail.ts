
import { UserComment } from "./user-comment";
import { User } from "./user";
import { Post } from "./post";

export interface UserDetail extends User {
  id: string;
  posts: Post[];
  comments: UserComment[];

}
