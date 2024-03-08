import express from "express";
import {
  createQuest,
  deleteQuest,
  getAllQuests,
  getSingleQuest,
  updateQuest,
} from "../controllers/quests.controller";
import { authenticateToken } from "../middleware/authentication";

const router = express.Router();

router.route("/").post(authenticateToken, createQuest);
router.route("/").get(getAllQuests);
router.route("/:questID").get(getSingleQuest);
router.route("/:questID").put(authenticateToken, updateQuest);
router.route("/:questID").delete(authenticateToken, deleteQuest);

export default router;
