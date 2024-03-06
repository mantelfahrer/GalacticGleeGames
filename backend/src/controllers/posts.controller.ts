import { Request, Response } from "express";
import { Post } from "../db/initialize";

/**
 *  @description Create post
 *  @route POST /posts
 */
export const createPost = async (req: Request, res: Response) => {
  const { content, user, threadID } = req.body;

  if (!content || !user|| !threadID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const uuid = crypto.randomUUID();

  const post = await Post.create({
    postID: uuid,
    userID: user.userID,
    threadID: threadID,
    content: content,
  });
  if (!post) {
    return res.status(500).json({ message: "Post could not be created" });
  }

  return res.status(201).json({ message: "Post was created", data: post });
};

/**
 *  @description Get all posts for thread
 *  @return posts
 */
export const getAllPostsForThread = async (threadID: string) => {
  const posts = await Post.findAll({ where: { threadID: threadID } });

  return posts;
};

/**
 *  @description Get single post
 *  @route GET /posts/:postID
 */
export const getSinglePost = async (req: Request, res: Response) => {
  const { postID } = req.params;

  const post = await Post.findOne({
    where: {
      postID: postID,
    },
  });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  return res.status(200).json(post);
};

/**
 * @description Update post
 * @route PUT /posts/:postID
 */
export const updatePost = async (req: Request, res: Response) => {
  const { postID } = req.params;
  const { content, user } = req.body;

  if (!content || !user) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const post: any = await Post.findOne({
    where: {
      postID: postID,
    },
  });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.userID !== user.userID) {
    return res.status(403);
  }

  const result = Post.update(
    { content: content },
    {
      where: {
        postID: postID,
      },
    }
  );

  if (!result) {
    return res.status(500).json({ message: "Post could not be updated" });
  }

  return res.status(200).json(result);
};

/**
 * @description Delete post
 * @route DELETE /posts/:postID
 */
export const deletePost = async (req: Request, res: Response) => {
  const { postID } = req.params;
  const { user } = req.body;

  if (!user) {
    return res.status(401);
  }

  const post: any = await Post.findOne({
    where: {
      postID: postID,
    },
  });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.userID !== user.userID) {
    return res.status(403);
  }

  const result = await Post.destroy({
    where: {
      postID: postID,
    },
  });

  if (result < 1) {
    return res.status(500).json({ message: "Post could not be deleted" });
  }

  return res.status(200);
};
