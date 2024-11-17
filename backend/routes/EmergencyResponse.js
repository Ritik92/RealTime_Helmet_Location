const express = require("express");
const router = express.Router();

const {emergencyResponse} = require("../controllers/EmergencyResponse")

router.post("/emergencyResponse", emergencyResponse)

module.exports = router;