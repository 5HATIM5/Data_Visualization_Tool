import express from "express";
import { getChartDataController } from "../controllers/chartData.controller";
const router = express.Router();


router.route("/chart-data").get(getChartDataController);

module.exports = router;
