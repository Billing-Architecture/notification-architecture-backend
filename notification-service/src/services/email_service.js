const transporter = require("../config/gmail_config");

const s_send_email_receipt = async (filename, to, subject, text, pdf) => {
    try {
        const mailOptions = {
            from: `"Billing Service" <${process.env.GMAIL_USER}>`,
            to,
            subject,
            text,
            attachments: [
                {
                    filename: `${filename}.pdf`,
                    content: pdf, 
                }
            ],
        };
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) { 
        return false;
    }
};

module.exports = {
    s_send_email_receipt,
};