import { Request, Response } from "express";
import { Thread } from "../db/initialize";
import { getAllPostsForThread } from "./posts.controller";

/**
 *  @description Create thread
 *  @route POST /threads
 */
export const createThread = async (req: Request, res: Response) => {
  const { title, userID } = req.body;

  if (!title || !userID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const uuid = crypto.randomUUID();

  const thread = await Thread.create({
    threadID: uuid,
    userID: userID,
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
  const threads = await Thread.findAll();

  return res.status(200).json(threads);
};

/**
 *  @description Get single thread
 *  @route GET /threads/:threadID
 */
export const getSingleThread = async (req: Request, res: Response) => {
  const { threadID } = req.params;

  const thread = await Thread.findOne({
    where: {
      threadID: threadID,
    },
  });

  if (!thread) {
    return res.status(404).json({ message: "Thread not found" });
  }

  const posts = getAllPostsForThread(threadID);

  return res.status(200).json({ thread: thread, posts: posts });
};

/**
 * @description Update thread
 * @route PUT /threads/:threadID
 */
export const updateThread = async (req: Request, res: Response) => {
  const { threadID } = req.params;
  const { title, userID } = req.body;

  if (!title || !userID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const thread: any = await Thread.findOne({
    where: {
      threadID: threadID,
    },
  });

  if (!thread) {
    return res.status(404).json({ message: "Thread not found" });
  }

  if (thread.userID !== userID) {
    return res.status(403);
  }

  const result = Thread.update(
    { title: title },
    {
      where: {
        threadID: threadID,
      },
    }
  );

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
  const { userID } = req.body;

  if (!userID) {
    return res.status(401).json({ message: "userID must be provided" });
  }

  const thread: any = await Thread.findOne({
    where: {
      threadID: threadID,
    },
  });

  if (!thread) {
    return res.status(404).json({ message: "Thread not found" });
  }

  if (thread.userID !== userID) {
    return res.status(403);
  }

  const result = await Thread.destroy({
    where: {
      threadID: threadID,
    },
  });

  if (result < 1) {
    return res.status(500).json({ message: "Thread could not be deleted" });
  }

  return res.status(200);
};