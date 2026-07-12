import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { upload, singleUpload } from "../middlewares/multer.js";
import {
  login,
  logout,
  register,
  updateProfile,
  saveJob,
  unsaveJob,
  getSavedJobs,
} from "../controllers/user.controller.js";
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(
  isAuthenticated,
  upload,
  updateProfile
);

router.route("/save/:id").post(isAuthenticated, saveJob);

router.route("/unsave/:id").post(isAuthenticated, unsaveJob);

router.route("/saved").get(isAuthenticated, getSavedJobs);
export default router;

