const {
    s_send_email_bill, 
    s_send_email_payment,
} = require('../services/email_service');

const {
    s_save_notification
} = require('../services/notifications_service');

const c_notify_user_bill = async (req, res) => {
    const { 
        notification_receiver, 
        notification_subject, 
        notification_message, 
    } = req.body; 

    const result = await s_send_email_bill(notification_receiver, notification_subject, notification_message);

    if (result) {
        await s_save_notification(req.body);
        res.status(200).json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
}

const c_notify_user_payment = async (req, res) => {
}

module.exports = {
    c_notify_user_bill,
    c_notify_user_payment, 
};