const { pool } = require('../../config/db');

const Router = require('express')();

Router.post('/addLeave', async (req, res) => {
    try {
        const { from_date, to_date, leave_type, description, emp_code, leave_status } = req.body;
        await pool.query('insert into leave_request ( from_date, to_date, leave_type, description, emp_code, leave_status ) values ( ?, ?, ?, ?, ?, Pending)', [from_date, to_date, leave_type, description, emp_code, leave_status], (err, result) => {
            if(err) {
                res.status(400).json({ status: 0, message: 'cant able to insert' });
            }
            else {
                res.status(200).json({ status: 1, message: 'Leave Request Sended Successfully' });
            }
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: 0, message: 'Server Issue' });
    }
})

Router.get('/listLeave')