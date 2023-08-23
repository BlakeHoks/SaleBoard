import express from "express";
import { addProfileImage, authUser, registerUser } from "./auth.controller.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.route("/login").post(authUser);
router.route("/register").post(registerUser);
router.route("/image").post(upload.single("file"), addProfileImage);

export default router;
