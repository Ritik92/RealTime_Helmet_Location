const mongoose = require('mongoose');

const accidentSchema = new mongoose.Schema({
    accidentID: {
        type: String,
        required: true,
        unique: true, 
    },
    helmetID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Helmet',
        required: true, 
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location', 
        required: true, 
    },
    timestamp: {
        type: Date, 
        required: true,
    },
    severity: {
        type: String,
        enum: ['Minor', 'Moderate', 'Severe', 'Critical'], // Define possible severity levels
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Accident', accidentSchema);
