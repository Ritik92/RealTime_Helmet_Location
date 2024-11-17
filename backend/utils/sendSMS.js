const textbelt = require("textbelt");

const sendSMS = async(phoneNumber, message) => {
    try{
        const response = await textbelt.sendText({
            phone: phoneNumber,
            message: message,
            key: process.env.TEXTBELT_API_KEY,
        });
    } catch(error){
        console.error("Error sending SMS",error);
    }
}

module.exports = sendSMS;