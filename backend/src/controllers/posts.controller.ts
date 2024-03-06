import { Request, Response } from "express";
import { Post } from "../db/initialize";

/**
 *  @description Create post
 *  @route POST /posts
 */
export const createPost = async (req: Request, res: Response) => {
  const { content, userID, threadID } = req.body;

  if (!content || !userID || !threadID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const uuid = crypto.randomUUID();

  const post = await Post.create({
    postID: uuid,
    userID: userID,
    threadID: threadID,
    content: content,
  });
  if (!post) {
    return res.status(500).json({ message: "Post could not be created" });
  }

  return res.status(201).json({ message: "Post was created", data: post });
};

/**
 *  @description Get all posts
 *  @route GET /posts
 */
export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await Post.findAll();

  return res.status(200).json(posts);
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
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Content must be provided" });
  }

  const post = Post.update(
    { content: content },
    {
      where: {
        postID: postID,
      },
    }
  );

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  return res.status(200).json(post);
};

/**
 * @description Delete post
 * @route DELETE /posts/:postID
 */
export const deletePost = async (req: Request, res: Response) => {
  const { postID } = req.params;
  const { userID } = req.body;

  if (!userID) {
    return res.status(401).json({ message: "userID must be provided" });
  }

  const post: any = await Post.findOne({
    where: {
      postID: postID,
    },
  });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.userID !== userID) {
    return res.status(403);
  }

  const result = await Post.destroy({
    where: {
      postID: postID,
    },
  });

  if (result < 1) {
    return res.status(404).json({ message: "Post not found" });
  }

  return res.status(200);
};
