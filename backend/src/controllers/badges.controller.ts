import crypto from "crypto";
import { Request, Response } from "express";
import { Badge } from "../db/initialize";

/**
 *  @description Create badge
 *  @route POST /badges
 */
export const createBadge = async (req: Request, res: Response) => {
  if (req.body.user.role !== "ADMIN") {
    return res.sendStatus(403);
  }

  const { questID, name, description } = req.body;

  if (!questID || !name || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const uuid = crypto.randomUUID();

  const badge = await Badge.create({
    badgeID: uuid,
    questID: questID,
    name: name,
    description: description,
  });
  if (!badge) {
    return res.status(500).json({ message: "Badge could not be created" });
  }

  return res.status(201).json({ message: "Badge was created", data: badge });
};

/**
 *  @description Get all badges
 *  @route GET /badges
 */
export const getAllBadges = async (req: Request, res: Response) => {
  const badges = await Badge.findAll();

  return res.status(200).json(badges);
};

/**
 *  @description Get single badge
 *  @route GET /badges/:badgeID
 */
export const getSingleBadge = async (req: Request, res: Response) => {
  const { badgeID } = req.params;

  const badge = await Badge.findByPk(badgeID);

  if (!badge) {
    return res.status(404).json({ message: "Badge not found" });
  }

  return res.status(200).json(badge);
};

/**
 * @description Update badge
 * @route PUT /badges/:badgeID
 */
export const updateBadge = async (req: Request, res: Response) => {
  if (req.body.user.role !== "ADMIN") {
    return res.sendStatus(403);
  }

  const { badgeID } = req.params;

  const { questID, name, description } = req.body;

  if (!questID || !name || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const badge: any = await Badge.findByPk(badgeID);

  if (!badge) {
    return res.status(404).json({ message: "Badge not found" });
  }

  if (
    badge.questID === questID &&
    badge.name === name &&
    badge.description === description
  ) {
    return res.status(400).json({ message: "Fields are unchanged" });
  }

  badge.questID = questID;
  badge.name = name;
  badge.description = description;

  const result = await badge.save();

  if (!result) {
    return res.status(500).json({ message: "Badge could not be updated" });
  }

  return res.status(200).json(result);
};

/**
 * @description Delete badge
 * @route DELETE /badges/:badgeID
 */
export const deleteBadge = async (req: Request, res: Response) => {
  if (req.body.user.role !== "ADMIN") {
    return res.sendStatus(403);
  }

  const { badgeID } = req.params;

  const badge: any = await Badge.findByPk(badgeID);

  if (!badge) {
    return res.status(404).json({ message: "Badge not found" });
  }

  const result = await Badge.destroy({
    where: {
      badgeID: badgeID,
    },
  });

  if (result < 1) {
    return res.status(500).json({ message: "Badge could not be deleted" });
  }

  return res.sendStatus(200);
};
