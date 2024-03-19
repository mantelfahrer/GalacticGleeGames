import express from "express";
import {
  registerUser,
  getAllUsers,
  getSingleUser,
  loginUser,
  refreshToken,
} from "../controllers/users.controller";
import { authenticateToken } from "../middleware/authentication";

const router = express.Router();

router.route("/").get(authenticateToken, getAllUsers);
router.route("/:userID").get(authenticateToken, getSingleUser);
router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh").post(refreshToken);

export default router;
