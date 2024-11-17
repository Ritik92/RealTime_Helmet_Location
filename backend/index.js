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
        origin: "http://localhost:3000",
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
  
      // 1. Fetch user's emergency contacts from MongoDB
    //   const user = await User.findById(userId)
    //     .populate('emergencyContacts');
      
      // 2. Update user's current location
    //   await User.findByIdAndUpdate(userId, {
    //     currentLocation: {
    //       type: 'Point',
    //       coordinates: [location.longitude, location.latitude],
    //       timestamp: location.timestamp
    //     }
    //   });
  
      // 3. Send notifications to all emergency contacts
    //   const notifications = user.emergencyContacts.map(contact => {
    //     return {
    //       to: contact.phoneNumber,
    //       body: `Emergency Alert: ${user.name} has shared their location. ` +
    //             `View at: https://maps.google.com/?q=${location.latitude},${location.longitude}`
    //     };
    //   });
  
      // 4. Send SMS using your preferred service (example using Twilio)
    //   for (const notification of notifications) {
    //     await twilioClient.messages.create({
    //       body: notification.body,
    //       to: notification.to,
    //       from:+14155238886
    //     });
    //   }
    const message='Test'
    const num="+917419279166"
    const twilioMessage = await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: num
    });
    
      res.status(200).json({ message: 'Location shared successfully' });
    } catch (error) {
      console.error('Error sharing location:', error);
      res.status(500).json({ error: 'Failed to share location' });
    }
  });
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});
