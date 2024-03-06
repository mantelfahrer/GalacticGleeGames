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
router.route("/:postID").get(getSinglePost);
router.route("/:postID").put(authenticateToken, updatePost);
router.route("/:postID").delete(authenticateToken, deletePost);

export default router;
