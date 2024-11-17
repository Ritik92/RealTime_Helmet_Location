const mongoose = require("mongoose");

const helmetSchema = new mongoose.Schema({
    helmetID: {
        type: String,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    currentLocation: [
        {
            longitude: {
                type: Number,
                required: true
            },
            latitude: {
                type: Number,
                required: true
            },
        },
    ],
    batteryStatus:  {
        type: Number,
        required: true
    },
    connectionStatus: {
        type: Boolean,
        required: true
    },
} ,{timestamps: true})

module.exports = mongoose.model("Helmet", helmetSchema)