// Connect to the database
const mysql = require('mysql2');

// Connect to the database
const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'dahlia',
  database: 'employeetracker_db'
});

// Handle database connection errors
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

module.exports = db;