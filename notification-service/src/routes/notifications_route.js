const express = require('express');
const router = express.Router();

const {
    c_notify_user_bill, 
    c_notify_user_bill
} = require('../controllers/notifications_controller');

router.post('/notify/bill', c_notify_user_bill);
router.post('/notify/payment', c_notify_user_bill);

module.exports = router;