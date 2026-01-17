const transporter = require("config/outlook_config");

const s_send_email_bill = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.OUTLOOK_EMAIL,
            to,
            subject,
            text,
        };
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) { 
        return false;
    }
}

const s_send_email_payment = async (to, subject, text) => {
};

module.exports = {
    s_send_email_bill,
    s_send_email_payment,
};