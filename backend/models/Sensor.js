const mongoose = require("mongoose");

const sensorDataSchema = new mongoose.Schema({
    helmetId: {
        type: String,
        required: true,
    },

    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
    },

    accelerometer: {
        x: {
            type: Number,
            required: true,
        },
        y: {
            type: Number,
            required: true,
        },
        z: {
            type: Number,
            required: true,
        },
    },

    gyroscope: {
        x: {
            type: Number,
            required: true,
        },
        y: {
            type: Number,
            required: true,
        },
        z: {
            type: Number,
            required: true,
        },
    },

    // INCLUDE MORE SENSORS HERE AS NEEDED

    angleChange: {
        type: Number,
        required: true,
    },

    velocityChange: {
        type: Number,
        required: true,
    },

    collisionDetected: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model("Sensor", sensorDataSchema);