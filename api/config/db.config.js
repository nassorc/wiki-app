const mysql = require('mysql2');

require('dotenv').config();

// create connection to database
const pool = mysql.createPool({
    host             : process.env.DB_HOST,
    user             : process.env.DB_USER,
    database         : process.env.DB_NAME,
    connectionLimit  : 10
}).promise();

module.exports = pool;