const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    helmetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Helmet",
    },

    notificationType: {
        type: String,
        required: true,
        enum: ['collision', 'low battery', 'emergency alert', 'helmet removed', 'helmet connected', 'helmet disconnected'],
    },

    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
    },

    status: {
        type: String,
        required: true,
        enum: ['sent', 'delivered', 'failed'], //Sent - notified from our side, delivered - User recieved the notification, failed - User didn't recieve the notification
        default: 'sent',
    }
});

module.exports = mongoose.model("Notification", notificationSchema);
