//database mock 
jest.mock('../../src/models/notifications', () => ({
    create: jest.fn()
}));
const notifications = require('../../src/models/notifications');
const { s_save_notification } = require('../../src/services/notifications_service');

describe('s_save_notification', () => {
    // Clear call history from all mocks
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.GMAIL_EMAIL = 'test@gmail.com';
    });

    test('save a notification correctly', async () => {
        // creation of response notification mock of the database
        const mock_notification = {
            id: 1,
            notification_receiver: 'user@test.com'
        };

        notifications.create.mockResolvedValue(mock_notification);

        // creation of a notification mock to save into the service
        const notification_data = {
            notification_receiver: 'user@test.com',
            notification_subject: 'Test',
            reference_id: 123,
            notification_message: 'Mensaje de prueba',
            notification_reference_type: 'ORDER'
        };

        const state = 'SENT';

        const result = await s_save_notification(notification_data, state);

        // validate response notification mock
        expect(result).toEqual(mock_notification);

        // Validate that Sequelize was called correctly
        expect(notifications.create).toHaveBeenCalledWith({
            notification_receiver: 'user@test.com',
            notification_subject: 'Test',
            reference_id: 123,
            notification_message: 'Mensaje de prueba',
            notification_reference_type: 'ORDER',
            notification_sender: 'test@gmail.com',
            notification_state: 'SENT'
        });

        // validate the returned value
        expect(notifications.create).toHaveBeenCalledTimes(1);
    });

    test('throw error if the database failed', async () => {

        //simulate a database failed
        notifications.create.mockRejectedValue(new Error('DB error'));

        // data to enter
        const data = {
            notification_receiver: 'user@test.com'
        };

        // execute and validate the error
        await expect( s_save_notification(data, 'FAILED') ).rejects.toThrow('DB error');
    });
});

