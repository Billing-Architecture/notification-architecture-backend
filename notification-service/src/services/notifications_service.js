const notifications = require("models/notifications");

const s_save_notification = async (notification_data, state) => {
    return await notifications.create({
        notification_receiver: notification_data.notification_receiver,
        notification_subject: notification_data.notification_subject,
        reference_id: notification_data.reference_id,
        notification_message: notification_data.notification_message,
        notification_reference_type: notification_data.notification_reference_type,
        notification_sender: process.env.OUTLOOK_EMAIL,
        notification_state: state,
    });
};

module.exports = {
    s_save_notification
};