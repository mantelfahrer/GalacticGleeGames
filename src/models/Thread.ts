import { Post } from "./Post";
import { User } from "./User";

export type Thread = {
  threadID: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  User: User;
  postsCount: number;
};
