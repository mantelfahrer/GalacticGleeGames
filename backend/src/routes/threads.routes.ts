import express from "express";
import {
  createThread,
  deleteThread,
  getAllThreads,
  getSingleThread,
  updateThread,
} from "../controllers/threads.controller";
import { authenticateToken } from "../middleware/authentication";

const router = express.Router();

router.route("/").post(authenticateToken, createThread);
router.route("/").get(getAllThreads);
router.route("/:threadID").get(getSingleThread);
router.route("/:threadID").put(authenticateToken, updateThread);
router.route("/:threadID").delete(authenticateToken, deleteThread);

export default router;
