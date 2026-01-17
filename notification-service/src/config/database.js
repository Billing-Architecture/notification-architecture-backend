const { Pool } = require('pg');
const dotenv = require('dotenv');

const pool = new Pool({
    host: dotenv.config().parsed.DB_HOST,
    user: dotenv.config().parsed.DB_USER,
    password: dotenv.config().parsed.DB_PASSWORD,
    database: dotenv.config().parsed.DB_NAME,
    port: dotenv.config().parsed.DB_PORT,
});

module.exports = pool;