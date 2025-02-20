require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({ 
    host: process.env.HOST_NAME,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
});


module.exports = pool.promise();