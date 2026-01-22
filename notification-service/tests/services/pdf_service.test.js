const {
  generate_bill_PDF, generate_payment_PDF
} = require('../../src/services/pdf_service');

describe('generate_bill_PDF', () => {

    test('generate a invoice PDF and return a Buffer', async () => {
        const details = {
            bill_code: 'INV-001',
            bill_issue_date: '2026-01-01',
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
        };

        const result = await generate_bill_PDF(details);

        expect(result).toBeInstanceOf(Buffer);
        expect(result.length).toBeGreaterThan(0);
    });

    test('generate a payment PDF and return a Buffer', async () => {
        const payment_details = {
            payment_type: 'CREDIT CARD',
            payment_created_at: '2026-01-10',
            payment_total: 113
        };

        const bill_details = {
            bill_code: 'INV-999',
            bill_total: 113,
            bill_total_paid: 113,
            bill_to_pay: 0
        };

        const result = await generate_payment_PDF(payment_details, bill_details);

        expect(result).toBeInstanceOf(Buffer);
        expect(result.length).toBeGreaterThan(0);
    });

});
