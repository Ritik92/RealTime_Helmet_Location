const mongoose = require('mongoose');
const User = require("../models/User");
const EmergencyContacts = require("../models/EmergencyContacts");

// Create a new emergency contact
exports.createEmergencyContact = async (req, res) => {
    try {
            const { name, phoneNumber, userId } = req.body;
        
            // Validate user ID (optional, depending on your validation strategy)
            const validUserId = mongoose.Types.ObjectId.isValid(userId);
            if (!validUserId) {
                return res.status(400).json({
                success: false,
                message: "Invalid user ID format",
                });
            }
        
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                success: false,
                message: "User not found",
                });
            }
        
            // Check for duplicate phone number (optional, depending on your schema)
            const existingContact = await EmergencyContacts.findOne({ phoneNumber });
            if (existingContact) {
                return res.status(409).json({
                success: false,
                message: "Emergency contact with this phone number already exists",
                });
            }
        
            const emergencyContact = new EmergencyContacts({
                name,
                phoneNumber,
                userId,
            });
        
            await emergencyContact.save();

            return res.status(201).json({
                success: true,
                emergencyContact,
                message: "Emergency contact created successfully",
            });
            } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Emergency contact cannot be created. Please try again.",
            });
        }
    };

// Delete an emergency contact
exports.deleteEmergencyContact = async (req, res) => {
    try {
        const { emergencyContactId, userId } = req.body;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
            success: false,
            message: "User not found",
            });
        }
        
        const emergencyContact = await EmergencyContacts.findByIdAndDelete(emergencyContactId);
        if (!emergencyContact) {
            return res.status(404).json({
            success: false,
            message: "Emergency contact not found",
            });
        }
        
            return res.status(200).json({
                success: true,
                message: "Emergency contact deleted successfully",
                data: {
                    emergencyContactId: emergencyContact._id // Include the deleted contact ID for reference
                },
            });
            } catch (error) {
                console.error(error);

                // Check for specific error types and provide more informative messages
                if (error.name === 'CastError') {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid emergency contact ID format",
                    });
                }
            
                return res.status(500).json({
                    success: false,
                    message: "Emergency contact cannot be deleted. Please try again.",
                });
        }
};

// Update an emergency contact
exports.updateEmergencyContact = async(req, res) => {
    try{
        const {name, phoneNumber, userId, emergencyContactId} = req.body;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const emergencyContact = await EmergencyContacts.findByIdAndUpdate(
            emergencyContactId,
            {name, phoneNumber},
            {new: true}
        ); 

        if(!emergencyContact){
            return res.status(404).json({
                success: false,
                message: "Emergency contact not found"
            });
        }

        return res.status(200).json({
            success: true,
            emergencyContact,
            message: "Emergency contact updated successfully"
        });
    } catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Emergency contact cannot be updated. Please try again."
        });
    }
};
exports.EmergencyContact = async(req, res) => {
    try{
        const {userId} = req.body;

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

        return res.status(200).json({
            success: true,
            emergencyContact,
            message: "Emergency contacts fetched successfully"
        });
    } catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Emergency contact cannot be fetched!!"
        });
    }
};