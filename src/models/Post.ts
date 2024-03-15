import { User } from "./User";

export type Post = {
    postID: number;
    threadID: string;
    User: User;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}