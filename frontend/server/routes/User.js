const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions
const {
    login,
    signup,
    sendotp,
    changePassword,
} = require("../controllers/Auth")
const {
    resetPasswordToken,
    resetPassword,
} = require("../controllers/ResetPassword")

const { auth } = require("../middlewares/auth")

router.post("/login", login)
router.post("/signup", signup)
router.post("/sendotp", sendotp)
router.post("/changepassword", auth, changePassword)

// token generation
router.post("/reset-password-token", resetPasswordToken)
// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

module.exports = router;