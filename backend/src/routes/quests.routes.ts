import express from "express";
import {
  createQuest,
  deleteQuest,
  getAllQuests,
  getSingleQuest,
  updateQuest,
} from "../controllers/quests.controller";
import { authenticateToken } from "../middleware/authentication";
import {
  updateUserQuest,
  updateUserQuestsForUser,
} from "../controllers/userQuests.controller";

const router = express.Router();

router.route("/").post(authenticateToken, createQuest);
router.route("/").get(getAllQuests);
router.route("/:questID").get(getSingleQuest);
router.route("/:questID").put(authenticateToken, updateQuest);
router.route("/:questID").delete(authenticateToken, deleteQuest);
router.route("/userQuest/:userQuestID").put(authenticateToken, updateUserQuest);
router.route("/user/:userID").post(authenticateToken, updateUserQuestsForUser);

export default router;
