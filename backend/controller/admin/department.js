const { Router } = require("express");
const { pool } = require("../../config/db");


Router.post('/addDepartment', async (req, res) => {
    try {
        const { dept_code, dept_name, dept_short_name } = req.body;
        await pool.query('insert into department ( dept_code, dept_name, dept_short_name ) values ( ?, ?, ? )', [ dept_code, dept_name, dept_short_name ], (err, result) => {
            if(err) {
                res.status(400).json({ status: 0, message: 'Server Error', error: err });
            }
            else {
                res.status(200).json({ status: 1, message: 'Leave Request Sended Successfully' });
            }
        })
    } catch (err) {
        res.status(500).json({ status: 0, message: 'Server Issue', error: err });
    }
})

Router.get('/listDepartment', async (req, res) => {
    try {
        await pool.query('select * from department', async (err, res) => {
            if(err) {
                res.status(400).json({ status: 0, message: 'server error', error: err });
            }
            else {
                res.status(200).json({ status: 1, message: 'Departments retrived successfully', data: res });
            }
        })
    } catch (err) {
        res.status(500).json({ status: 0, message: 'server error', error: err });
    }
})

Router.get('/viewDepartment/:id', async (req, res) => {
    try {
        const { id } = req.query;
        await pool.query('select * from department where id=?', id, (err, res) => {
            if(err) {
                res.status(400).json({ status: 0, message: 'server error', error: err });
            }
            else {
                res.status(200).json({ status: 0, message: 'server error', data: res });
            }
        })
    } catch (err) {
        res.status(500).json({ status: 0, message: 'server error' });
    }
})

Router.put('/updateDepartment/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { dept_code, dept_name, dept_short_name } = req.body;
        await pool.query('update table department dept_code = ? , dept_name = ? , dept_short_name = ? where _id = ? ', [ dept_code, dept_name, dept_short_name, id ], (err, result) => {
            if(err) {
                res.status(400).json({ status: 0, message: 'Server Error', error: err });
            }
            else {
                res.status(200).json({ status: 1, message: 'Leave Request Sended Successfully' });
            }
        })
    } catch (err) {
        res.status(500).json({ status: 0, message: 'Server Issue', error: err });
    }
})