const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/share-location', async (req, res) => {
  try {
    const client=Twilio
    const { userId, location } = req.body;

    // 1. Fetch user's emergency contacts from MongoDB
    // const user = await User.findById(userId)
    //   .populate('emergencyContacts');
    
    // 2. Update user's current location
    // await User.findByIdAndUpdate(userId, {
    //   currentLocation: {
    //     type: 'Point',
    //     coordinates: [location.longitude, location.latitude],
    //     timestamp: location.timestamp
    //   }
    // });

    // 3. Send notifications to all emergency contacts
    // const notifications = user.emergencyContacts.map(contact => {
    //   return {
    //     to: contact.phoneNumber,
    //     body: `Emergency Alert: ${user.name} has shared their location. ` +
    //           `View at: https://maps.google.com/?q=${location.latitude},${location.longitude}`
    //   };
    // });

    // 4. Send SMS using your preferred service (example using Twilio)
    // for (const notification of notifications) {
    //   await twilioClient.messages.create({
    //     body: notification.body,
    //     to: notification.to,
    //     from: 'YOUR_TWILIO_PHONE_NUMBER'
    //   });
    // }
    

    res.status(200).json({ message: 'Location shared successfully' });
  } catch (error) {
    console.error('Error sharing location:', error);
    res.status(500).json({ error: 'Failed to share location' });
  }
});
module.exports=router