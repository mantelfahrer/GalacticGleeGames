import crypto from "crypto";
import { Request, Response } from "express";
import { Quest, UserQuest } from "../db/initialize";
import { Op } from "sequelize";

/**
 *  @description Create userQuest
 *  @returns UserQuest
 */
export const createUserQuest = async (userID: string, questID: string) => {
  const uuid = crypto.randomUUID();

  const [userQuest, created] = await UserQuest.findOrCreate({
    where: {
      [Op.or]: [
        { userQuestID: uuid },
        { [Op.and]: [{ userID: userID }, { questID: questID }] },
      ],
    },
    defaults: {
      userQuestID: uuid,
      userID: userID,
      questID: questID,
      status: "open",
    },
  });

  return { userQuest, created };
};

/**
 *  @description Get single userQuest
 *  @returns UserQuest
 */
export const getSingleUserQuest = async (userQuestID: string) => {
  const userQuest = await UserQuest.findByPk(userQuestID);

  return userQuest;
};

/**
 * @description Update userQuest
 * @route PUT /quests/userQuest/:userQuestID
 */
export const updateUserQuest = async (req: Request, res: Response) => {
  const { userQuestID } = req.params;
  const { status, user } = req.body;

  if (!status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userQuest: any = await UserQuest.findByPk(userQuestID);

  if (!userQuest) {
    return res.status(404).json({ message: "UserQuest not found" });
  }

  if (req.body.user.userID !== userQuest.userID) {
    return res.sendStatus(401);
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
 * @description Update userQuests for user
 * @route PUT /quests/user/:userID
 */
export const updateUserQuestsForUser = async (req: Request, res: Response) => {
  if (req.body.user.role !== "ADMIN") {
    return res.sendStatus(401);
  }

  const { userID } = req.params;

  if (!userID) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // get all recent quests
  const quests: any[] = await Quest.findAll();
  if (!quests) {
    return res
      .status(500)
      .json({ message: "Quests for user could not be created." });
  }

  // create userQuests
  quests.forEach(async (quest) => {
    await createUserQuest(userID, quest.questID);
  });

  return res.status(200).json({ message: "UserQuests for user updated." });
};
