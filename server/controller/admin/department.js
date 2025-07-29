const Router = require("express").Router();
const { pool } = require("../../config/db");
const { Capitalize } = require("../../utilities/helperFunction");

class Department {
    async create(req, res) {
        try {
            
            const { dept_short_name } = req.body;
            const dept_name = Capitalize(req.body.dept_name);
            const dept_code = Capitalize(req.body.dept_code);
            pool.query('insert into department ( dept_code, dept_name, dept_short_name ) values ( ?, ?, ? )', [ dept_code, dept_name, dept_short_name ], (err, result) => {
                if(err) {
                    if(err.sqlState === '23000') {
                        return res.status(409).json({ status: 0, message: 'Duplicate Entry', error: err });
                    }
                    else if (err.code == "ECONNREFUSED") {
                        res.status(503).json({ status: 0, message: "ECONNREFUSED" });
                    }
                    else {
                        return res.status(409).json({ status: 0, message: 'Server Error', error: err });
                    }
                }
                else {
                    return res.status(200).json({ status: 1, message: 'Department Added Successfully' });
                }
            })
        } catch (err) {
            return res.status(500).json({ status: 0, message: 'Server Issue', error: err });
        }
    }

    async getAll(req, res) {
        try {
            pool.query('select * from department', async (err, result) => {
               if (err) {
                    if (err.code == "ECONNREFUSED") {
                        res.status(503).json({ status: 0, message: "ECONNREFUSED" });
                    }
                    else {
                        res.status(400).json({ status: 0, message: "Server Error" });
                    }
                }
               else {
                   return res.status(200).json({ status: 1, message: 'Departments retrived successfully', data: result });
               }
           })
       } catch (err) {
           return res.status(500).json({ status: 0, message: 'server error', error: err });
       }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
             pool.query('select * from department where id=?', [id], (err, result) => {
                if (err) {
                    if (err.code == "ECONNREFUSED") {
                        res.status(503).json({ status: 0, message: "ECONNREFUSED" });
                    }
                    else {
                        res.status(400).json({ status: 0, message: "Server Error" });
                    }
                }
                else {
                    return res.status(200).json({ status: 1, message: 'Department Retrived Successfully', data: result[0] });
                }
            })
        } catch (err) {
            return res.status(500).json({ status: 0, message: 'server error' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { dept_short_name } = req.body;
            const dept_name = Capitalize(req.body.dept_name);
            const dept_code = Capitalize(req.body.dept_code);
            const duplicateCheck = pool.query("select * from department where id != ? and dept_code = ?", [id, dept_code], (err, result) => {
                if(err) {
            console.log(err)
            return false;
                }
                else {
            console.log(result)
        }
            });
            // console.log(duplicateCheck)
            pool.query('update department set dept_code = ? , dept_name = ? , dept_short_name = ? where id = ? ', [ dept_code, dept_name, dept_short_name, id ], (err, result) => {
                if(err) {
                    if(err.sqlState === '23000') {
                        return res.status(409).json({ status: 0, message: 'Duplicate Entry', error: err });
                    }
                    else {
                        return res.status(409).json({ status: 0, message: 'Server Error', error: err });
                    }
                }
                else {
                    return res.status(200).json({ status: 1, message: 'Department Updated Successfully' });
                }
            })
        } catch (err) {
            return res.status(500).json({ status: 0, message: 'Server Issue', error: err });
        }
    }
}

module.exports = new Department;