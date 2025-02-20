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

app.get('/',async function (req, res) {
    try {
        const data = await pool.query('insert into admin ( username, password ) values ( "a", "b" )')
        console.log(data)
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 0, message: 'server error' });
    }
})

app.use(cors());

// require('./routes/index')(app);

app.listen(5000, 'localhost', () => {
    console.log('Server ON')
})