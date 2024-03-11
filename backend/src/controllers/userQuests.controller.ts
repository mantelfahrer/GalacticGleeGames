import crypto from "crypto";
import { Request, Response } from "express";
import { UserQuest } from "../db/initialize";

/**
 *  @description Create userQuest
 *  @route POST /quests/userQuest
 */
export const createUserQuest = async (req: Request, res: Response) => {
  if (req.body.user.role !== "ADMIN") {
    return res.sendStatus(403);
  }

  const { userID, questID, status } = req.body;

  if (!userID || !questID || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const uuid = crypto.randomUUID();

  const userQuest = await UserQuest.create({
    userQuestID: uuid,
    userID: userID,
    questID: questID,
    status: status,
  });

  if (!userQuest) {
    return res.status(500).json({ message: "UserQuest could not be created" });
  }

  return res
    .status(201)
    .json({ message: "UserQuest was created", data: userQuest });
};

/**
 *  @description Get all quests for user
 *  @route GET /quests/user/:userID
 */
export const getAllQuestsForUser = async (req: Request, res: Response) => {
  const { userID } = req.body;

  const userQuests = await UserQuest.findAll({
    where: {
      userID: userID,
    },
  });

  return res.status(200).json(userQuests);
};

/**
 *  @description Get single userQuest
 *  @route GET /quests/userQuest/:userQuestID
 */
export const getSingleUserQuest = async (req: Request, res: Response) => {
  const { userQuestID } = req.params;

  const userQuest = await UserQuest.findByPk(userQuestID);

  if (!userQuest) {
    return res.status(404).json({ message: "UserQuest not found" });
  }

  return res.status(200).json(userQuest);
};

/**
 * @description Update userQuest
 * @route PUT /quests/userQuest/:userQuestID
 */
export const updateQuest = async (req: Request, res: Response) => {
  if (req.body.user.role !== "ADMIN") {
    return res.sendStatus(403);
  }

  const { userQuestID } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userQuest: any = await UserQuest.findByPk(userQuestID);

  if (!userQuest) {
    return res.status(404).json({ message: "UserQuest not found" });
  }

  if (userQuest.status === status) {
    return res.status(400).json({ message: "Fields are unchanged" });
  }

  userQuest.status = status;

  const result = await userQuest.save();

  if (!result) {
    return res.status(500).json({ message: "UserQuest could not be updated" });
  }

  return res.status(200).json(result);
};

/**
 * @description Delete userQuest
 * @route DELETE /quests/userQuest/:userQuestID
 */
export const deleteUserQuest = async (req: Request, res: Response) => {
  if (req.body.user.role !== "ADMIN") {
    return res.sendStatus(403);
  }

  const { userQuestID } = req.params;

  const userQuest: any = await UserQuest.findByPk(userQuestID);

  if (!userQuest) {
    return res.status(404).json({ message: "UserQuest not found" });
  }

  const result = await UserQuest.destroy({
    where: {
      userQuestID: userQuestID,
    },
  });

  if (result < 1) {
    return res.status(500).json({ message: "UserQuest could not be deleted" });
  }

  return res.sendStatus(200);
};
