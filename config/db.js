const { Pool } = require('pg');
const dotenv = require("dotenv").configDotenv();
const password = process.env.DB_PASSWORD || '';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;

