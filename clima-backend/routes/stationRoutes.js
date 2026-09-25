const express = require("express");
const router = express.Router();
const StationController = require("../controllers/stationController");

// estaciones
router.get("/stations", StationController.getStations);
router.get("/stations/:id", StationController.getStationById);

// datos
router.get("/data/:id", StationController.getLatestData);
router.get("/history/:id", StationController.getHistory);


module.exports = router;