const bcrypt = require("bcrypt");
const User = require("../models/User");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");

require("dotenv").config();

// Send OTP For Email Verification
exports.sendotp = async (req, res) => {
	try {
		const { email } = req.body;

		// Check if user is already present
		const checkUserPresent = await User.findOne({ email });

		if (checkUserPresent) {
			return res.status(401).json({
				success: false,
				message: `User is Already Registered`,
			});
		}

		var otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
		
        const result = await OTP.findOne({ otp: otp }); // it means otp is not unique
		
        while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
			});

            result = await OTP.findOne({ otp: otp });
		}

		const otpPayload = { email, otp }; // createdAt not added, by default Date.now() since mentioned in the code
		const otpBody = await OTP.create(otpPayload); // using model OTP, adding it in DB
		
        console.log("OTP Body", otpBody);
		res.status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			otp,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
	}
};

exports.signup = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			otp,
		} = req.body;

		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword ||
			!otp
		) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}

		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message:
					"Password and Confirm Password do not match. Please try again.",
			});
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}

		// Find the most recent OTP for the email
		const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1); // -1 -> descending order || limit(1) -> only 1 top most result
		console.log(response);
		if (response.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} else if (otp !== response[0].otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the user
		const user = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			accountType: accountType,
			approved: approved,
		});

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
        
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
		}

		// Generate JWT token and Compare Password
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ email: user.email, id: user._id, accountType: user.accountType },
				process.env.JWT_SECRET,
				{
					expiresIn: "24h",
				}
			);

			// Save token to user document in database
			user.token = token;
			user.password = undefined;
			// Set cookie for token and return success response
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User has been logged in successfully!`,
			});
		} else {
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
		}
	} catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
	}
};

exports.changePassword = async(req, res) => {
    try{
        const userDetails = await User.findById(req.user.id);
        const {oldPassword, newPassword, confirmNewPassword} = req.body;
        
        // check if old password is correct
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );

        if(!isPasswordMatch){
            return res.status(401).json({
                success: false,
                message: "Password is incorrect."
            });
        }

        if(newPassword !== confirmNewPassword){
            return res.status(401).json({
                success: false,
                message: "Password and Confirm Password do not match."
            });
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            {password: encryptedPassword},
            {new: true},
        );

        // send mail
        try{
            const emailResponse = await mailSender(updatedUserDetails.email, passwordUpdated(updatedUserDetails.email),
            `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`)
        } catch(error){
            console.error("Error occured while sending an email", error);
            return res.status(500).json({
                success: false,
                message: "Error occured while sending an email",
                error: error.message,
            });

            return res.status(200).json({
                success: true,
                message: "Password updated successfully!"
            });
        }
    } catch(error){
        console.error("Error occured while updating password: ", error);
        return res.status(500).json({
            success: false,
            message: "Error occured while updating the password",
            error: error.message,
        });
    }
};