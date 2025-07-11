const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const pool = require('./config/db');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const testConnection = async () => {
    try {
        const [rows] = await pool.query('SELECT 1'); // Simple test query
        console.log('DB Connected Successfully');
    } catch (err) {
        console.error('DB Error:', err.message);
    }
}
testConnection();
app.get('/', (req, res) => {
  res.send('Server is running!');
});
app.use(cors());

require('./routes')(app);

app.listen(process.env.PORT || 4000, 'localhost', () => {
    console.log('Server ON')
})