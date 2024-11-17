const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		accountType: {
			type: String,
			enum: ["Admin", "Customer"],
			required: false,
		},
		token: {
			type: String,
		},
		resetPasswordExpires: {
			type: Date,
		},

		emergencyContacts: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "EmergencyContacts",
			required: false,
		},

		helmetId: {
			type: String,
			required: false,
			unique: false,
		},
		// Add timestamps for when the document is created and last modified
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);