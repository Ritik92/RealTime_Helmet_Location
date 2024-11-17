const {instance} = require("../config/razorpay");
const Helmet = require("../models/Helmet");
const User = require("../models/User");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
const mongoose = require("mongoose");
const {paymentSuccessEmail} = require("../mail/templates/paymentSuccessEmail");

exports.capturePayment = async (req, res) => {
    // Extract helmet array from request body and user ID from authenticated user
    const { helmets } = req.body;
    const userId = req.user.id;

    if (helmets.length === 0) {
        return res.json({
            success: false,
            message: 'Please provide valid Helmet ID',
        });
    }

    let totalAmount = 0;

    // Iterate over each helmet ID provided in the request
    for (const helmetId of helmets) {
        try {
            // Find the helmet by its ID in the database
            let helmet = await Helmet.findById(helmetId);

            // If the helmet is not found, return a 404 response
            if (!helmet) {
                return res.status(404).json({
                    success: false,
                    message: "Helmet not found",
                });
            }

            // Convert the userId to a MongoDB ObjectId
            const uId = new mongoose.Types.ObjectId(userId);

            // Add the course price to the total amount to be paid
            totalAmount += course.price;

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Define payment options for the payment gateway
    const options = {
        amount: totalAmount * 100, 
        currency: "INR",
        receipt: Math.random(Date.now()).toString(), 
    };

    try {
        // Create a new payment order using the payment gateway instance
        const paymentResponse = await instance.orders.create(options);

        // Return the payment order details in the response
        return res.status(200).json({
            success: true,
            data: paymentResponse,
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Could not initiate order",
        });
    }
};

exports.verifyPayment = async (req, res) => {
    // Extract the payment details from the request body
    const razorpay_order_id = req.body.razorpay_order_id;
    const razorpay_payment_id = req.body.razorpay_payment_id;
    const razorpay_signature = req.body.razorpay_signature;
    const userId = req.user.id;
    const helmets = req.body.helmets;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !helmets || !userId) {
        return res.status(400).json({
            success: false,
            message: "Invalid request",
        });
    }

    let body = raxorpay_order_id + "|" + razorpay_payment_id;

    // Create a hash of the body string using the RAZORPAY_SECRET key
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");   

    if(expectedSignature === razorpay_signature) {
        return res.status(200).json({
            success: true,
            message: "Payment verified!",
        });
    }
    
    return res.status(400).json({
        success: false,
        message: "Payment verification failed",
    });
};

exports.sendPaymentSuccessEmail = async (req, res) => {
    const {orderId, paymentId, amount} = req.body;
    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "Invalid request",
        });
    }

    try{
        const customer = await User.findById(userId);

        await mailSender(
            customer.email,
            'Payment Successful',
            paymentSuccessEmail(`{$customer.firstName} ${customer.lastName}`, amount/100, orderId, paymentId)
        )
    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Could not send email",
        });
    }
};