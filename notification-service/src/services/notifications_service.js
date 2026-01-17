const notifications = require("models/notifications");

const nSaveNoitification = async (notificationData) => {
    return await notifications.create(notificationData);
}

module.exports = {
    nSaveNoitification
};