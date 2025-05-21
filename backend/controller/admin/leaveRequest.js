const { pool } = require('../../config/db');
const Router = require("express").Router();

class LeaveRequest {
    
    create(req, res) {
        try {
            const { from_date, to_date, leave_type, description, emp_code, leave_status } = req.body;
            console.log(req.body);
            pool.query('insert into leave_request ( from_date, to_date, leave_type, description, emp_code ) values ( ?, ?, ?, ?, ? )', [from_date, to_date, leave_type, description, emp_code, leave_status], (err, result) => {
                if(err) {
                    console.log(err);
                    return res.status(400).json({ status: 0, message: 'Server Error' });
                }
                else {
                    return res.status(200).json({ status: 1, message: 'Leave Request Sended Successfully' });
                }
            })
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ status: 0, message: 'Server Issue' });
        }
    }

    getAll(req, res) {
        try {
            pool.query("select * from leave_request", (err, result) => {
                if(err) {
                    return res.status(409).json({ status: 0, message: "Server Error", error: err });
                }
                else {
                    return res.status(200).json({ status: 1, message: 'Leave Request Retrived Successfully', data: result });
                }
            })
        } catch (err) {
            return res.status(500).json({ status: 0, message: "Internal Server Issue" });
        }
    }

    getById(req, res) {
        try {
            const {id} = req.params;
            pool.query("select * from leave_request where id = ?", id, (err, result) =>{
                if(err) {
                    return res.status(409).json({ status:0, message: "Server Error", error: err });
                }
                else {
                    return res.status(200).json({ status:1, message: "leave request retrived", data: result });
                }
            })
        } catch (err) {
            return res.status(500).json({ status:0, message: "Internal Server Error", error: err });
        }
    }

    update(req, res) {
        try {
            const { id } = req.params;
            const { from_date, to_date, leave_type, description, emp_code, leave_status } = req.body;
            pool.query("update leave_request set from_date = ?, to_date = ?, leave_type = ?, description = ?, emp_code = ?, leave_status = ? where id = ?", [from_date, to_date, leave_type, description, emp_code, leave_status, id], (err, result) => {
                if(err) {
                    return res.status(409).json({ status: 0, message: "Server Error", error: err });
                }
                else {
                    return res.status(200).json({ status: 1, message: "Leave Request Updated Successfully", data: result });
                }
            })
        } catch (err) {
            return res.status(500).json({ status: 0, message: "Internal Server Error", error: err });
        }
    }
}

module.exports = new LeaveRequest;