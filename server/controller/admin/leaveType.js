const { pool } = require("../../config/db");
const { Capitalize } = require("../../utilities/helperFunction");

class LeaveType {
    async create(req, res) {
        try {
            const { description } = req.body;
            const leave_type = Capitalize(req.body.leave_type);
            pool.query('insert into leave_type ( leave_type, description ) values ( ?, ? )', [leave_type, description], (err, result) => {
                if (err) {
                    if (err.sqlState === '23000') {
                        return res.status(409).json({ status: 0, message: 'Duplicate Entry', error: err });
                    }
                    else if (err.code == "ECONNREFUSED" || "PROTOCOL_CONNECTION_LOST") {
                        res.status(503).json({ status: 0, message: "ECONNREFUSED" });
                    }
                    else return res.status(400).json({ status: 0, message: 'Server Error', error: err });
                }
                else {
                    return res.status(200).json({ status: 1, message: 'LeaveType Added Successfully', data: result });
                }
            })
        } catch (err) {
            res.status(500).json({ status: 0, message: "Server Error" });
        }
    }

    async getAll(req, res) {
        try {
            pool.query('select * from leave_type', async (err, result) => {
                if (err) {
                    if (err.code == "ECONNREFUSED" || "PROTOCOL_CONNECTION_LOST") {
                        res.status(503).json({ status: 0, message: "ECONNREFUSED" });
                    }
                    else return res.status(400).json({ status: 0, message: 'server error', error: err });
                }
                else {
                    return res.status(200).json({ status: 1, message: 'LeaveTypes retrived successfully', data: result });
                }
            })
        } catch (err) {
            res.status(500).json({ status: 0, message: "Server Error" });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            pool.query('select * from leave_type where id=?', [id], (err, result) => {
                if (err) {
                    if (err.code == "ECONNREFUSED" || "PROTOCOL_CONNECTION_LOST") {
                        res.status(503).json({ status: 0, message: "ECONNREFUSED" });
                    }
                    else return res.status(400).json({ status: 0, message: 'server error', error: err });
                }
                else {
                    return res.status(200).json({ status: 1, message: 'Leave Type Retrived Successfully', data: result[0] });
                }
            })
        } catch (err) {
            res.status(500).json({ status: 0, message: "Server Error" });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { description } = req.body;
            const leave_type = Capitalize(req.body.leave_type);
            pool.query('update leave_type set leave_type = ? , description = ? where id = ? ', [leave_type, description, id], (err, result) => {
                if (err) {
                    if (err.sqlState === '23000') {
                        return res.status(409).json({ status: 0, message: 'Duplicate Entry', error: err });
                    }
                    else if (err.code == "ECONNREFUSED" || "PROTOCOL_CONNECTION_LOST") {
                        res.status(503).json({ status: 0, message: "ECONNREFUSED" });
                    }
                    else return res.status(409).json({ status: 0, message: 'Server Error', error: err });
                }
                else {
                    return res.status(200).json({ status: 1, message: 'LeaveType Updated Successfully' });
                }
            })
        } catch (err) {
            res.status(500).json({ status: 0, message: "Server Error" });
        }
    }
}

module.exports = new LeaveType;