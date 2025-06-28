const mysql = require('mysql2');
const fs = require('fs');

// Read the SQL file
const sql = fs.readFileSync("C:/Users/CT-DELL/Downloads/elms-db.sql", "utf8");

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'turntable.proxy.rlwy.net',
  port: 11464,
  user: 'root',
  password: 'ReiEyXjyoSmAMuPyrFltYehTzfAKZEIR',
  database: 'railway',
  multipleStatements: true
});

// Execute SQL
connection.query(sql, (err, results) => {
  if (err) {
    console.error('❌ Error:', err);
  } else {
    console.log('✅ SQL file imported successfully!');
  }
  connection.end();
});
