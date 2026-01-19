const transporter = require("../config/gmail_config");

const s_send_email_bill = async (to, subject, text, pdf) => {
    try {
        const mailOptions = {
            from: `"Billing Service" <${process.env.GMAIL_USER}>`,
            to,
            subject,
            text,
            attachments: [
                { 
                    filename: "invoice.pdf", 
                    content: pdf, 
                }
            ],
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