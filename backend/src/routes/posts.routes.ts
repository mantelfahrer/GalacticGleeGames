import express from "express";
import {
  createPost,
  deletePost,
  getSinglePost,
  updatePost,
} from "../controllers/posts.controller";
import { authenticateToken } from "../middleware/authentication";

const router = express.Router();

router.route("/").post(authenticateToken, createPost);
router.route("/:threadID").get(getSinglePost);
router.route("/:threadID").put(authenticateToken, updatePost);
router.route("/:threadID").delete(authenticateToken, deletePost);

export default router;
