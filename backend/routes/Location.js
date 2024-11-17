const express = require("express");
const router = express.Router();

const {liveLocation} = require("../controllers/LiveLocation")

router.post("/liveLocation", liveLocation)

module.exports = router;