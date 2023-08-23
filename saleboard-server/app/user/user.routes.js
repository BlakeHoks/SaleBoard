import express from "express";
import { addProfileImage, getUserProfile } from "./user.controller.js";
import { authCheck } from "../middleware/auth.middleware.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../saleboard-client/public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.route("/profile").get(authCheck, getUserProfile);
router
  .route("/change-image")
  .post(authCheck, upload.single("file"), addProfileImage);

export default router;
