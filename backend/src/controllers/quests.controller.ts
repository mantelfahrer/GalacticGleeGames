import crypto from "crypto";
import { Request, Response } from "express";
import { Quest } from "../db/initialize";

/**
 *  @description Create quest
 *  @route POST /quests
 */
export const createQuest = async (req: Request, res: Response) => {
  if (req.body.user.role !== "ADMIN") {
    return res.sendStatus(403);
  }

  const { title, condition, description } = req.body;

  if (!title || !condition || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const uuid = crypto.randomUUID();

  const quest = await Quest.create({
    questID: uuid,
    title: title,
    condition: condition,
    description: description,
  });
  if (!quest) {
    return res.status(500).json({ message: "Quest could not be created" });
  }

  return res.status(201).json({ message: "Quest was created", data: quest });
};

/**
 *  @description Get all quests
 *  @route GET /quests
 */
export const getAllQuests = async (req: Request, res: Response) => {
  const quests = await Quest.findAll();

  return res.status(200).json(quests);
};

/**
 *  @description Get single quest
 *  @route GET /quests/:questID
 */
export const getSingleQuest = async (req: Request, res: Response) => {
  const { questID } = req.params;

  const quest = await Quest.findByPk(questID);

  if (!quest) {
    return res.status(404).json({ message: "Quest not found" });
  }

  return res.status(200).json(quest);
};

/**
 * @description Update quest
 * @route PUT /quests/:questID
 */
export const updateQuest = async (req: Request, res: Response) => {
  if (req.body.user.role !== "ADMIN") {
    return res.sendStatus(403);
  }

  const { questID } = req.params;
  const { title, condition, description } = req.body;

  if (!title || !condition || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const quest: any = await Quest.findByPk(questID);

  if (!quest) {
    return res.status(404).json({ message: "Quest not found" });
  }

  if (
    quest.title === title &&
    quest.condition === condition &&
    quest.description === description
  ) {
    return res.status(400).json({ message: "Fields are unchanged" });
  }

  quest.title = title;
  quest.condition = condition;
  quest.description = description;

  const result = await quest.save();

  if (!result) {
    return res.status(500).json({ message: "Quest could not be updated" });
  }

  return res.status(200).json(result);
};

/**
 * @description Delete quest
 * @route DELETE /quests/:questID
 */
export const deleteQuest = async (req: Request, res: Response) => {
  if (req.body.user.role !== "ADMIN") {
    return res.sendStatus(403);
  }

  const { questID } = req.params;

  const quest: any = await Quest.findByPk(questID);

  if (!quest) {
    return res.status(404).json({ message: "Quest not found" });
  }

  const result = await Quest.destroy({
    where: {
      questID: questID,
    },
  });

  if (result < 1) {
    return res.status(500).json({ message: "Quest could not be deleted" });
  }

  return res.sendStatus(200);
};
