
const mailSender = require("../utils/mailSender");

exports.contactUsController = async (req, res) => {
    const {email, firstName, lastName, message, phoneNo} = req.body;

    try{
        const emailRes = await mailSender(
            email,
            "Your query has been received",
            contactUsEmail(email, firstName, lastName, message, phoneNo)
        )

        return res.status(200).json({
            success: true,
            message: "Email sent successfully",
        });
    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Could not send email",
        });
    }
};
// Function to generate email template for contact form submissions
const contactUsEmail = (email, firstName, lastName, message, phoneNo) => {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title> Query Received</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .container {
                        background-color: #f9f9f9;
                        border-radius: 5px;
                        padding: 20px;
                        margin-top: 20px;
                    }
                    .header {
                        background-color: #007bff;
                        color: white;
                        padding: 10px;
                        text-align: center;
                        border-radius: 5px;
                        margin-bottom: 20px;
                    }
                    .message-box {
                        background-color: white;
                        padding: 15px;
                        border-radius: 5px;
                        border: 1px solid #ddd;
                        margin-top: 15px;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        font-size: 0.9em;
                        color: #666;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>Contact Form Submission Received</h2>
                    </div>
                    
                    <p>Dear ${firstName} ${lastName},</p>
                    
                    <p>Thank you for contacting us. We have received your message and will get back to you as soon as possible.</p>
                    
                    <p>Here's a summary of your submission:</p>
                    
                    <div class="message-box">
                        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phoneNo}</p>
                        <p><strong>Message:</strong></p>
                        <p>${message}</p>
                    </div>
                    
                    <p>We typically respond to inquiries within 24-48 business hours.</p>
                    
                    <div class="footer">
                        <p>This is an automated response. Please do not reply to this email.</p>
                    </div>
                </div>
            </body>
        </html>
    `;
};
