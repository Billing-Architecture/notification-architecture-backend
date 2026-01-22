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
- Node.js v20 o superior
- Docker y Docker Compose
- Git

---

## Endpoints
| Method | Endpoint              | Description                                        |
|--------|-----------------------|----------------------------------------------------|
| POST   | /api/notify/bill      | Notify invoice via email and save notification log |
| POST   | /api/notify/payment   | Notify payment via email and save notification log |

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
