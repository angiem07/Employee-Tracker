// Connect to the database
const mysql = require('mysql2/promise');

// Connect to the database
const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'dahlia',
  database: 'employeetracker_db'
});

module.exports = db;