const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    userId: { //emergency contacts of which user
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }
});

module.exports = mongoose.model('EmergencyContacts', emergencyContactSchema);