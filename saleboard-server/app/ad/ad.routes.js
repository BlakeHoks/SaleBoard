import express from "express";
import {
  createAd,
  deleteAd,
  getAdByAuthorId,
  getAdByCategory,
  getAdById,
  getAds,
  updateAd,
  updateAdStatus,
} from "./ad.controller.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../saleboard-client/public/uploads/ads-images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.route("/").post(upload.array("images", 10), createAd);
router.route("/page/:page").get(getAds);
router
  .route("/:id")
  .get(getAdById)
  .put(updateAd)
  .patch(updateAdStatus)
  .delete(deleteAd);
router.route("/user/:id").get(getAdByAuthorId);
router.route("/category/:category_name/page/:page").get(getAdByCategory);
export default router;
