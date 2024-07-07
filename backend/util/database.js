const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    database: process.env.DBNAME,
    password: process.env.DBPASS
});

module.exports = pool.promise();