import express from "express";
import {
  createBadge,
  deleteBadge,
  getAllBadges,
  getSingleBadge,
  updateBadge,
} from "../controllers/badges.controller";
import { authenticateToken } from "../middleware/authentication";

const router = express.Router();

router.route("/").post(authenticateToken, createBadge);
router.route("/").get(getAllBadges);
router.route("/:badgeID").get(getSingleBadge);
router.route("/:badgeID").put(authenticateToken, updateBadge);
router.route("/:badgeID").delete(authenticateToken, deleteBadge);

export default router;
