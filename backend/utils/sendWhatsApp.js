const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

const sendWhatsApp = async(phoneNumber, message) => {
    try{
        const response = await client.messages.create({
            from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
            body: message,
            to: phoneNumber,
        });
    } catch(error){
        console.error("Error sending WhatsApp",error);
    }
};

module.exports = sendWhatsApp;