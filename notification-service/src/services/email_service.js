const nodemailer = require("config/outlook_config");

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.OUTLOOK_EMAIL,
        to,
        subject,
        text,
    };
    try {
        await nodemailer.sendMail(mailOptions);
        return true
    } catch (error) { 
        return false
    }
}

module.exports = {
    sendEmail
};