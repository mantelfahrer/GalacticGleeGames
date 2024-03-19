import crypto from "crypto";
import { Request, Response } from "express";
import { Post, Thread, User } from "../db/initialize";
import { getAllPostsForThread } from "./posts.controller";
import { Sequelize } from "sequelize";

/**
 *  @description Create thread
 *  @route POST /threads
 */
export const createThread = async (req: Request, res: Response) => {
  const { title, user } = req.body;

  if (!title || !user) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const uuid = crypto.randomUUID();

  const thread = await Thread.create({
    threadID: uuid,
    userID: user.userID,
    title: title,
  });
  if (!thread) {
    return res.status(500).json({ message: "Thread could not be created" });
  }

  return res.status(201).json({ message: "Thread was created", data: thread });
};

/**
 *  @description Get all threads
 *  @route GET /threads
 */
export const getAllThreads = async (req: Request, res: Response) => {
  const threads = await Thread.findAll({
    attributes: {
      include: [
        [Sequelize.fn("COUNT", Sequelize.col("posts.postID")), "postsCount"],
      ],
    },
    include: [
      {
        model: User,
        attributes: { exclude: ["password"] },
      },
      {
        model: Post,
        attributes: [],
      },
    ],
    group: ["Thread.threadID"],
  });

  return res.status(200).json(threads);
};

/**
 *  @description Get single thread
 *  @route GET /threads/:threadID
 */
export const getSingleThread = async (req: Request, res: Response) => {
  const { threadID } = req.params;

  const thread = await Thread.findByPk(threadID);

  if (!thread) {
    return res.status(404).json({ message: "Thread not found" });
  }

  const posts = await getAllPostsForThread(threadID);

  return res.status(200).json({ thread: thread, posts: posts });
};

/**
 * @description Update thread
 * @route PUT /threads/:threadID
 */
export const updateThread = async (req: Request, res: Response) => {
  const { threadID } = req.params;
  const { title, user } = req.body;

  if (!title || !user) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const thread: any = await Thread.findByPk(threadID);

  if (!thread) {
    return res.status(404).json({ message: "Thread not found" });
  }

  if (thread.userID !== user.userID) {
    return res.sendStatus(401);
  }

  if (thread.title === title) {
    return res.status(400).json({ message: "Fields are unchanged" });
  }

  thread.title = title;

  const result = await thread.save();

  if (!result) {
    return res.status(500).json({ message: "Thread could not be updated" });
  }

  return res.status(200).json(result);
};

/**
 * @description Delete thread
 * @route DELETE /threads/:threadID
 */
export const deleteThread = async (req: Request, res: Response) => {
  const { threadID } = req.params;
  const { user } = req.body;

  if (!user) {
    return res.sendStatus(401);
  }

  const thread: any = await Thread.findByPk(threadID);

  if (!thread) {
    return res.status(404).json({ message: "Thread not found" });
  }

  if (thread.userID !== user.userID) {
    return res.sendStatus(401);
  }

  const result = await Thread.destroy({
    where: {
      threadID: threadID,
    },
  });

  if (result < 1) {
    return res.status(500).json({ message: "Thread could not be deleted" });
  }

  return res.sendStatus(200);
};
