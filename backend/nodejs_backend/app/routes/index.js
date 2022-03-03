// Bring in the express server
const express = require("express");

// Bring in the Express Router
const router = express.Router();

// Import the Controller
const controller = require("../controllers/index");
const influxDBController = require("../controllers/influxDBController");

// Get Details of the Company
router.get("/company/:id", controller.companyDetails);

// Get all peach-farm
router.get("/all_feeds/:id", influxDBController.getData);
router.get("/get-latest-humidity/:id", influxDBController.getlatestHumidity);
router.get("/get-latest-temparature/:id", influxDBController.getlatestTemparature);
router.get("/get-maximum-temparature/:id", influxDBController.getMaxTemparature);
router.get("/get-avg-temparature/:id", influxDBController.getAVGTemparature);
router.get("/get-total-energy/:id", influxDBController.getTotalEnergy);

module.exports = router;
