const nodemailer = require("nodemailer");

const mailSender = async(email, title, body) => {
    try{
        // to send mail, use transporter function of nodemailer
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })

        let info = await transporter.sendMail({
            from: 'mindSHIELD',
            to:`${email}`,
            subject: `${title}`,
            html: `${body}`,
        })
        console.log(info);
        return info;

    } catch(error){
        console.log(error.message);
    }
}

module.exports = mailSender;