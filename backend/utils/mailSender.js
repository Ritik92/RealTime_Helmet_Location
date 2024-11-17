const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        // Create transporter with correct SMTP configuration
        let transporter = nodemailer.createTransport({
            service: 'gmail',  // Using Gmail service
            host: 'smtp.gmail.com',
            port: 587,  // Using TLS port
            secure: false,  // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,  // Use App Password, not regular password
            },
        });

        // Send mail
        let info = await transporter.sendMail({
            from: `"mindSHIELD" <${process.env.MAIL_USER}>`,  // Proper sender format
            to: email,
            subject: title,
            html: body,
        });

        console.log("Email sent successfully:", info.messageId);
        return info;

    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error(`Failed to send email: ${error.message}`);
    }
};

module.exports = mailSender;