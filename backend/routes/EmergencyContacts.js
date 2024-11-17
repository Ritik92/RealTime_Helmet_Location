const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions
const {
    createEmergencyContact,
    deleteEmergencyContact,
    updateEmergencyContact,
    EmergencyContact,
} = require("../controllers/EmergencyContacts")

const { auth } = require("../middlewares/auth")

router.post("/createEmergencyContact", auth, createEmergencyContact)
router.delete("/deleteEmergencyContact", auth, deleteEmergencyContact)
router.put("/updateEmergencyContact", auth, updateEmergencyContact)
router.post("/EmergencyContact",  EmergencyContact)

module.exports = router;