import express from "express";
import {
  registerUser,
  getAllUsers,
  getSingleUser,
} from "../controllers/users.controller";

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:userID").get(getSingleUser);
router.route("/signup").post(registerUser);

export default router;
