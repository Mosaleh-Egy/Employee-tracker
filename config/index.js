const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if (err) {
        throw err;
    }
})

module.exports = connection;
