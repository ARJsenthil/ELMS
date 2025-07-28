const mysql = require('mysql2');
const fs = require('fs');

// Read SQL file
const sql = fs.readFileSync("elms-db.sql", "utf8");

// Replace these with real values from Railway Connect tab
const connection = mysql.createConnection({
  host: 'mysql.railway.internal',   // Replace with actual host
  port: 3306,
  user: 'root',
  password: 'EzuUzkYnxTgLlHbzUNeLYHAQeRKeTVST',
  database: 'railway',
  multipleStatements: true
});

// Execute SQL
connection.query(sql, (err, results) => {
  if (err) {
    console.error('❌ SQL execution error:', err.sqlMessage || err.message);
  } else {
    console.log('✅ SQL file imported successfully!');
  }
  connection.end();
});
