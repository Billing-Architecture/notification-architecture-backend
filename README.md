# Notification API
> API for notification and log saving of billing and payments via Gmail. Developed with Node.js Express, PostgreSQL and Docker.

---

## Descripción
Notification API is a backend project that allow email notifications when an invoice or payment is generated. It also logs these notifications.
It is designed following best development practices, a modular architecture, and is ready to run with Docker.

---

## Technologies used
- Node.js
- Express.js
- PostgreSQL
- Docker
- Sequelize
- dotenv

---

## Project Structure
src/  
├── config/ # Project settings  
├── controllers/ # Business logic  
├── middlewares/ # Transversal logic  
├── models/ # Database models  
├── routes/ # Route definition  
├── services/ # Reusable services  
├── app.js # Configure Express, global middlewares, and register API routes  
└── server.js # Start the server and connect the application to the database  

---

## Requirements
- Node.js v20 or higher version
- Docker y Docker Compose
- Git

---

## Endpoints
| Method | Endpoint              | Description                                        |
|--------|-----------------------|----------------------------------------------------|
| POST   | /api/notify/bill      | Notify invoice via email and save notification log |
| POST   | /api/notify/payment   | Notify payment via email and save notification log |

---

## Example Request (JSON)
Here are two examples of how to make a request to the endpoints described above. You can use tools commonly used for testing and consuming APIs, such as Postman.  

### Example to notify a bill
- Request to notify a bill
```json
{  
    "bill_code": "999999",  
    "bill_issue_date": "2025-01-21",  
    "notification_receiver": "example@.com",  
    "notification_subject": "Invoice",  
    "reference_id": 9999,  
    "notification_message": "Thank you for your purchase.",  
    "notification_reference_type": "INVOICE",  
    "details": {  
        "products": [  
        {  
            "product_name": "product1",  
            "product_quantity": 1,  
            "product_price": 25000,  
            "product_subtotal": 25000  
        },  
        {  
            "product_name": "product2",  
            "product_quantity": 2,  
            "product_price": 12000,  
            "product_subtotal": 24000  
        }  
        ],  
        "subtotal": 49000,  
        "total": 55370  
    }  
}  
```

- Response
```json
{
  "success": true
}
```

### Example to notify a payment
- Request to notify a payment
```json
{  
    "notification_receiver": "example@.com",  
    "notification_subject": "Payment",  
    "reference_id": 12345,  
    "notification_message": "Thank you for your purchase.",  
    "notification_reference_type": "PAYMENT",  
    "payment": {  
        "payment_type": "TRANSFER",  
        "payment_total": 999,  
        "payment_created_at": "2025-01-18"  
    },  
    "bill": {  
        "bill_code":"A9999999",  
        "bill_total":9999,  
        "bill_total_paid":99,  
        "bill_to_pay":999  
    }  
}  
```
- Response
```json
{
  "success": true
}
```

---

## Installation and execution
1. Clone the repository
```bash
git clone https://github.com/Billing-Architecture/notification-architecture-backend.git
cd notification-service
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```

4. Run with Docker
```bash
docker-compose up -d
```

## Available scripts
```bash
npm run dev      # Development mode
npm start        # Production mode
```

---

## Environment variables
The .env file contains: 

PORT= Project port number  
DB_HOST= Database host or name of docker container  
DB_USER= Database user  
DB_PASSWORD= Database password  
DB_NAME= Database name  
DB_PORT= Database port number  
GMAIL_EMAIL= Email for notification  
GMAIL_PASSWORD= Gmail service token  

---

# Execute Tests
The tests are run with:
- npm test

---

## Author
Dennis Gómez Alvarado