const request = require('supertest');
const app = require('../../src/app');

jest.mock('../../src/services/pdf_service', () => ({
    generate_bill_PDF: jest.fn(),
    generate_payment_PDF: jest.fn()
}));
jest.mock('../../src/services/email_service', () => ({
    s_send_email_receipt: jest.fn()
}));
jest.mock('../../src/services/notifications_service', () => ({
    s_save_notification: jest.fn()
}));

const { s_send_email_receipt } = require('../../src/services/email_service');
const { s_save_notification } = require('../../src/services/notifications_service');
const { generate_bill_PDF, generate_payment_PDF } = require('../../src/services/pdf_service');

describe('POST api/notify/bill', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('200 if the email send correctly', async () => {
        generate_bill_PDF.mockResolvedValue(Buffer.from('pdf'));
        s_send_email_receipt.mockResolvedValue(true);
        s_save_notification.mockResolvedValue({});

        const response = await request(app).post('/api/notify/bill').send({
            bill_code: 'INV-999',
            bill_issue_date: '2026-01-01',
            notification_receiver: 'test@.com',
            notification_subject: 'Invoice',
            notification_message: 'This is your invoice',
            reference_id: 1,
            notification_reference_type: 'BILL',
                details: {
                    subtotal: 100,
                    total: 113,
                    products: [
                        {
                            product_name: 'Laptop',
                            product_quantity: 1,
                            product_price: 100,
                            product_subtotal: 100
                        }
                    ]
                }
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true });
        expect(generate_bill_PDF).toHaveBeenCalled();
        expect(s_send_email_receipt).toHaveBeenCalled();
        expect(s_save_notification).toHaveBeenCalledWith(
        expect.any(Object),'SENT');
    });

    test('400 if the email bill failed', async () => {
        generate_bill_PDF.mockResolvedValue(Buffer.from('pdf'));
        s_send_email_receipt.mockResolvedValue(false);
        s_save_notification.mockResolvedValue({});

        const response = await request(app).post('/api/notify/bill').send({
            bill_code: 'INV-001',
            bill_issue_date: '2026-01-01',
            notification_receiver: 'user@test.com',
            notification_subject: 'Invoice',
            notification_message: 'Your invoice',
            reference_id: 1,
            notification_reference_type: 'BILL',
            details: {
                subtotal: 100,
                total: 113,
                products: []
            }
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ 
            message: "Field 'details.products' is required." 
        });
    });
});

describe('POST api/notify/payment', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('200 if the email send correctly', async () => {
        generate_payment_PDF.mockResolvedValue(Buffer.from('pdf'));
        s_send_email_receipt.mockResolvedValue(true);
        s_save_notification.mockResolvedValue({});

        const response = await request(app).post('/api/notify/payment').send({
            notification_receiver: 'test@.com',
            notification_subject: 'Payment receipt',
            notification_message: 'Your payment receipt',
            reference_id: 10,
            notification_reference_type: 'PAYMENT',
            payment: {
                payment_type: 'CARD',
                payment_total: 113,
                payment_created_at: '2026-01-01'
            },
            bill: {
                bill_code: 'INV-001',
                bill_total: 113,
                bill_total_paid: 113,
                bill_to_pay: 0
            }
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true });

        expect(generate_payment_PDF).toHaveBeenCalledWith(expect.any(Object),expect.any(Object));
        expect(s_send_email_receipt).toHaveBeenCalled();
        expect(s_save_notification).toHaveBeenCalledWith(expect.any(Object),'SENT');
    });

    test('500 if the email payment failed', async () => {
        generate_payment_PDF.mockResolvedValue(Buffer.from('pdf'));
        s_send_email_receipt.mockResolvedValue(false);
        s_save_notification.mockResolvedValue({});

        const response = await request(app)
        .post('/api/notify/payment')
        .send({
            notification_receiver: 'test@.com',
            notification_subject: 'Payment receipt',
            notification_message: 'Your payment receipt',
            reference_id: 10,
            notification_reference_type: 'PAYMENT',
            payment: {
            payment_type: 'CARD',
            payment_total: 113,
            payment_created_at: '2026-01-01'
            },
            bill: {
            bill_code: 'INV-001',
            bill_total: 113,
            bill_total_paid: 113,
            bill_to_pay: 0
            }
        });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ success: false });

        expect(s_save_notification).toHaveBeenCalledWith(
        expect.any(Object),
        'FAILED'
        );
    });
});