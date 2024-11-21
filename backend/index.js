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
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

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

    // Validate request body
    if (!userId || !location || !location.latitude || !location.longitude) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: userId and location (latitude, longitude)"
      });
    }

    // Fetch user from MongoDB
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Emergency contacts list
    const EMERGENCY_CONTACTS = [
      'kartik291190@gmail.com',
      'aryantripathi854@gmail.com',
      'atripathi_be21@thapar.edu',
      'backupmemo2025@gmail.com'
    ];

    const generateEmailTemplate = (name, latitude, longitude) => {
      return `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Emergency Alert</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .alert-header {
                background-color: #ff4444;
                color: white;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 20px;
              }
              .content {
                background-color: #ffffff;
                padding: 20px;
                border: 1px solid #dddddd;
                border-radius: 5px;
              }
              .coordinates {
                background-color: #f8f9fa;
                padding: 15px;
                border-radius: 5px;
                margin: 15px 0;
              }
              .map-link {
                display: inline-block;
                background-color: #007bff;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                margin: 15px 0;
              }
              .map-link:hover {
                background-color: #0056b3;
              }
              .footer {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #dddddd;
                font-size: 14px;
                color: #666666;
              }
            </style>
          </head>
          <body>
            <div class="content">
              <div class="alert-header">
                <h2 style="margin: 0;">⚠️ Emergency Alert</h2>
              </div>
              
              <p>Dear ${name},</p>
              
              <p>We are reaching out to inform you that your emergency contact has shared their location. This message requires your immediate attention.</p>
              
              <div class="coordinates">
                <p style="margin: 0;"><strong>Location Details:</strong></p>
                <p style="margin: 5px 0;">Latitude: ${latitude}</p>
                <p style="margin: 5px 0;">Longitude: ${longitude}</p>
              </div>
              
              <a href="https://maps.google.com/?q=${latitude},${longitude}" class="map-link">
                View Location on Google Maps
              </a>
              
              <div class="footer">
                <p style="margin: 0;">Please take necessary action immediately.</p>
                <p style="margin: 5px 0;">Stay safe!</p>
              </div>
            </div>
          </body>
        </html>
      `;
    };

    // Send emails to all emergency contacts
    const emailPromises = EMERGENCY_CONTACTS.map(async (email) => {
      try {
        const emailRes = await mailSender(
          email,
          "Accident Detected",
          generateEmailTemplate(user.firstName, location.latitude, location.longitude)
        );

        return {
          email,
          status: 'success',
          timestamp: new Date().toISOString()
        };
      } catch (error) {
        console.error(`Failed to send email to ${email}:`, error);
        return {
          email,
          status: 'failed',
          error: error.message,
          timestamp: new Date().toISOString()
        };
      }
    });

    // Wait for all email sending attempts to complete
    const emailResults = await Promise.all(emailPromises);

    // Calculate summary statistics
    const summary = emailResults.reduce(
      (acc, result) => {
        acc[result.status]++;
        return acc;
      },
      { success: 0, failed: 0 }
    );

 

    // Send response
    res.status(200).json({
      success: true,
      message: `Emergency alerts processed. ${summary.success} sent successfully, ${summary.failed} failed.`,
      
    });

  } catch (error) {
    console.error('Error sharing location:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process location sharing',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});




app.listen(4000, '0.0.0.0', () => {
    console.log('Server running on port 4000');
});

