const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    locationID: {
        type: String,
        required: true,
        unique: true, 
    },
    helmetID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Helmet",
        required: true, 
    },
    longitude: { 
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return v >= -180 && v <= 180; 
            },
            message: props => `${props.value} is not a valid longitude!`
        }
    },
    latitude: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return v >= -90 && v <= 90;
            },
            message: props => `${props.value} is not a valid latitude!`
        }
    },
    timestamp: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

locationSchema.index({ helmetID: 1, timestamp: -1 });

module.exports = mongoose.model("Location", locationSchema);
