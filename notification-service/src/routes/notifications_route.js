const express = require('express');
const router = express.Router();
const { c_notify_user_bill, c_notify_user_payment } = require('../controllers/notifications_controller');
const { validate_empty_fields } = require('../middlewares/body_error')

router.post(
    '/bill', 
    validate_empty_fields([
        'bill_code',
        'bill_issue_date',
        'notification_receiver',
        'notification_subject',
        'reference_id',
        'notification_message',
        'notification_reference_type',
        'details.products',
        'details.subtotal',
        'details.total'
    ]),
    c_notify_user_bill
);

router.post(
    '/payment', 
    validate_empty_fields([
        'notification_receiver',
        'notification_subject',
        'reference_id',
        'notification_message',
        'notification_reference_type',
        'payment.payment_type',
        'payment.payment_total',
        'payment.payment_created_at',
        'bill.bill_code',
        'bill.bill_total',
        'bill.bill_total_paid',
        'bill.bill_to_pay'
    ]),
    c_notify_user_payment
);

module.exports = router;