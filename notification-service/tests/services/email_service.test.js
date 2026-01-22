jest.mock("../../src/config/gmail_config", () => ({
    sendMail: jest.fn()
}));
const transporter = require("../../src/config/gmail_config");
const { s_send_email_receipt } = require("../../src/services/email_service")

describe('s_send_email_receipt', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.GMAIL_USER = 'test.admin@.com';
    });

    test('return true if send a email is corretly', async () => {
        transporter.sendMail.mockResolvedValue(true);

        const result = await s_send_email_receipt(
            'File',
            'test.user@.com', 
            'Invoice',
            'Thanks to shop with us!',
            Buffer.from('pdf-content')
        )

        expect(result).toBe(true);
        expect(transporter.sendMail).toHaveBeenCalledTimes(1);
    })

    test('return false if send a email is not corretly', async () => {
        transporter.sendMail.mockRejectedValue(new Error('SMTP error'));

        const result = await s_send_email_receipt(
            'File',
            'test.user@.com', 
            'Invoice',
            'Thanks to shop with us!',
            Buffer.from('pdf-content')
        );

        expect(result).toBe(false);
        expect(transporter.sendMail).toHaveBeenCalledTimes(1);
    })
})