const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	gender: {
		type: String,
	},
	dateOfBirth: {
		type: Date,
	},
	about: {
		type: String,
		trim: true,
	},
	contactNumber: {
		type: String,
		trim: true,
	},
    profilePicture: {
        type: String,
    },
    address: {
		street: {
			type: String,
		},
		city: {
			type: String,
		},
		state: {
			type: String,
		},
		country: {
			type: String,
		},
		postalCode: {
			type: String,
		},
	},
},
{timestamps: true}
);

// Export the Profile model
module.exports = mongoose.model("Profile", profileSchema);
