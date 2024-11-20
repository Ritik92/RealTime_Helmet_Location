const express = require("express");
const expressWs = require("express-ws");
const app = express();
const userRoutes = require("./routes/User");
const collisionRoutes = require("./routes/Collision");
const paymentRoutes = require("./routes/Payment");
const emergencyContactsRoutes = require("./routes/EmergencyContacts");
const contactRoutes = require("./routes/Contact");
const locationRoutes = require("./routes/Location");
const emergencyResponseRoutes = require("./routes/EmergencyResponse");
const dotenv = require("dotenv");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const twilio = require('twilio');
const User = require("./models/User");
const EmergencyContacts = require("./models/EmergencyContacts");
const PORT = process.env.PORT || 4000;
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);
dotenv.config();
database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3001",
        credentials: true,
    })
);

// Initialize express-ws
expressWs(app);

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/collision", collisionRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/emergencycontact", emergencyContactsRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/location", locationRoutes);
app.use("/api/v1/emergencyresponse", emergencyResponseRoutes);
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "App started successfully!",
    });
});

app.post('/api/v1/share-location', async (req, res) => {
  try {
    const { userId, location } = req.body;

    //  Fetch user's emergency contacts from MongoDB
    const user = await User.findById(userId);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    const emergencyContact = await EmergencyContacts.find({
        userId
    })

    if(!emergencyContact){
        return res.status(404).json({
            success: false,
            message: "Emergency contacts not found"
        });
    }
    
    

    //  Send notifications to all emergency contacts
    const notifications = emergencyContact.map(contact => {
      return {
        to: contact.phoneNumber,
        body: `Emergency Alert: ${user.firstName} has shared their location. ` +
              `View at: https://maps.google.com/?q=${location.latitude},${location.longitude}`
      };
    });

    // 4. Send SMS using your preferred service (example using Twilio)
    // for (const notification of notifications) {
    //   await twilioClient.messages.create({
    //     body: notification.body,
    //     to: notification.to,
    //     from: 'YOUR_TWILIO_PHONE_NUMBER'
    //   });
    // }
    
      
    res.status(200).json({ message: notifications });
  } catch (error) {
    console.error('Error sharing location:', error);
    res.status(500).json({ error: 'Failed to share location' });
  }
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});
