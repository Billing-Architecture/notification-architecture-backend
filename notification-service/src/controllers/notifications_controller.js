const { s_send_email_receipt } = require('../services/email_service');
const { s_save_notification } = require('../services/notifications_service');
const { generate_bill_PDF, generate_payment_PDF } = require('../services/pdf_service');

const c_notify_user_bill = async (req, res) => {
    const { 
        notification_receiver, 
        notification_subject, 
        notification_message, 
    } = req.body;
    
    const pdf = await generate_bill_PDF(req.body);
    const result = await s_send_email_receipt("bill", notification_receiver, notification_subject, notification_message, pdf);

    if (result) {
        await s_save_notification(req.body, 'SENT');
        res.status(200).json({ success: true });
    } else {
        await s_save_notification(req.body, 'FAILED');
        res.status(500).json({ success: false });
    }
}

const c_notify_user_payment = async (req, res) => {
    const {
        notification_receiver, 
        notification_subject, 
        notification_message,
        payment,
        bill,
    } = req.body;
    
    const pdf = await generate_payment_PDF(payment, bill);
    const result = await s_send_email_receipt("payment_receipt", notification_receiver, notification_subject, notification_message, pdf);

    if (result) {
        await s_save_notification(req.body, 'SENT');
        res.status(200).json({ success: true });
    } else {
        await s_save_notification(req.body, 'FAILED');
        res.status(500).json({ success: false });
    }
}

module.exports = {
    c_notify_user_bill,
    c_notify_user_payment, 
};