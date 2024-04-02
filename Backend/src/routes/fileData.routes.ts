import express from "express";
const router = express.Router();
import {
  uploadFileController,
  getDashboardDataController
} from "../controllers/fileData.controller";

router.route("/upload/file").post(uploadFileController);
router.route("/dashboard/data").get(getDashboardDataController);

module.exports = router;
