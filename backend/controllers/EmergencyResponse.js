const User = require("../models/User");
const Helmet = require("../models/Helmet");
const Location = require("../models/Location");
const Accident = require("../models/Accident");
const Sensor = require("../models/Sensor");
const Notification = require("../models/Notification");
const EmergencyContacts = require("../models/EmergencyContacts");
const {generateAccidentID} = require("../utils/AccidentID");
const determineSeverity = require("../utils/determineSeverity");
const sendSMS = require("../utils/sendSMS");
const sendWhatsApp = require("../utils/sendWhatsApp");

exports.emergencyResponse = async(req, res) => {
    try{
        const helmetID = req.body.helmetID;
        const helmet = await Helmet.findById(helmetID);

        if(!helmet){
            return res.status(404).json({
                success: false,
                message: "Helmet not found"
            });
        }

        const location = await Location.findOne({helmetID}).sort({timestamp: -1});
        if(!location){
            return res.status(404).json({
                success: false,
                message: "Location not found"
            });
        }

        const emergencyContacts = await EmergencyContacts.find({userId: helmet.userID});
        if(!emergencyContacts){
            return res.status(404).json({
                success: false,
                message: "Emergency contacts not found"
            });
        }

        const sensorData = await Sensor.findOne({helmetID}).sort({timestamp: -1});
        if(!sensorData){
            return res.status(404).json({
                success: false,
                message: "Sensor data not found"
            });
        }

        const severity = determineSeverity(sensorData.angleChange, sensorData.velocityChange);

        const accident = new Accident({
            accidentID: generateAccidentID(),
            helmetID,
            location: location.locationID,
            timestamp: Date.now(),
            severity
        });
        await accident.save();

        const notification = new Notification({
            helmetID,
            notificationType: "emergency alert",
            timestamp: Date.now(),
            status: "sent",
        });
        await notification.save();

        const user = await User.findById(helmet.userID);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const userName = user.firstName + " " + user.lastName;
        const googleMapsLink = `https://maps.google.com/?q=${location.latitude},${location.longitude}`;

        // Send SOS to emergency contacts
        for(const contact of emergencyContacts){
            const message = `Alert, ${userName} has met with an accident with severity level of ${severity}. 
                            Current live location: ${googleMapsLink}`;
            try{
                // Priortising whatsapp over sms
                await sendWhatsApp(contact.phoneNumber, message);
                console.log(`WhatsApp message sent.`);
            } catch(error){
                console.error(`Error sending WhatsApp message: ${error}`);
                try{
                    await sendSMS(contact.phoneNumber, message);
                    console.log(`SMS sent.`);
                } catch(error){
                    console.error(`Error sending SMS: ${error}`);
                }
            }
        }

        return res.status(200).json({
            success: true,
            message: "Emergency response sent successfully"
        });
    } catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error sending emergency response. Please try again."
        });
    }
};