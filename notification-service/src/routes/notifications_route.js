const express = require('express');
const router = express.Router();
const { c_notify_user_bill, c_notify_user_payment } = require('../controllers/notifications_controller');

router.post('/bill', c_notify_user_bill);
router.post('/payment', c_notify_user_payment);

module.exports = router;