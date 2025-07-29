const { pool } = require("../../config/db");
const { Capitalize } = require("../../utilities/helperFunction");
const bcrypt = require('bcrypt');

class Employee {

    async create(req, res) {
        try {
            const { email, gender, dob, dept_id, country, city_town, address, ph_no } = req.body;
            const firstname = Capitalize(req.body.firstname);
            const lastname = Capitalize(req.body.lastname);
            const password = await bcrypt.hash(req.body.password, 5);
            const employeeData = [firstname, lastname, email, password, gender, dob, dept_id, country, city_town, address, ph_no];
            console.log(employeeData);
            pool.query("insert into employee ( firstname, lastname, email, password_hash, gender, dob, dept_id, country, city_town, address, ph_no ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", employeeData, (err, result) => {
                if (err) {
                    if (err.code == "ECONNREFUSED" || "PROTOCOL_CONNECTION_LOST") {
                        res.status(503).json({ status: 0, message: "ECONNREFUSED" });
                    }
                    else return res.status(409).json({ status: 0, message: "Server Error", error: err });
                }
                else {
                    return res.status(200).json({ status: 1, message: "Employee Created Successfully", data: result });
                }
            });

        } catch (err) {
            return res.status(500).json({ status: 0, message: "Internal Server Error", error: err });
        }
    }

    getAll(req, res) {
        try {
            pool.query("select * from employee", (err, result) => {
                if (err) {
                    if (err.code == "ECONNREFUSED" || "PROTOCOL_CONNECTION_LOST") {
                        res.status(503).json({ status: 0, message: "ECONNREFUSED" });
                    }
                    else return res.status(409).json({ status: 0, message: "Server Error", error: err });
                }
                else {
                    console.log(result)
                    return res.status(200).json({ status: 1, message: "Employee Retrived Successfully", data: result });
                }
            })
        } catch (err) {
            return res.status(500).json({ status: 0, message: "Internal Server Error", error: err });
        }
    }

    getById(req, res) {
        try {

            const { id } = req.params;
            pool.query("select * from employee where id = ?", id, (err, result) => {
                if (err) {
                    if (err.code == "ECONNREFUSED" || "PROTOCOL_CONNECTION_LOST") {
                        res.status(503).json({ status: 0, message: "ECONNREFUSED" });
                    }
                    else return res.status(409).json({ status: 0, message: "Server Error", error: err });
                }
                else {
                    console.log(result)
                    return res.status(200).json({ status: 1, message: "Employee Retrived Successfully", data: result[0] });
                }
            })
        } catch (err) {
            return res.status(500).json({ status: 0, message: "Internal Server Error", error: err });
        }
    }

    update(req, res) {
        try {
            const { id } = req.params;
            const { email, gender, dob, dept_id, country, city_town, address, ph_no } = req.body;
            const firstname = Capitalize(req.body.firstname);
            const lastname = Capitalize(req.body.lastname);
            console.log(ph_no);
            pool.query("update employee set firstname = ?, lastname = ?, email = ?, gender = ?, dob = ?, dept_id = ?, country = ?, city_town = ?, address = ?, ph_no = ? where id = ?", [firstname, lastname, email, gender, dob, dept_id, country, city_town, address, ph_no, id], (err, result) => {
                if (err) {
                    if (err.code == "ECONNREFUSED" || "PROTOCOL_CONNECTION_LOST") {
                        res.status(503).json({ status: 0, message: "ECONNREFUSED" });
                    }
                    else return res.status(409).json({ status: 0, message: "Server Error", error: err });
                }
                else {
                    return res.status(200).json({ status: 1, message: "Employee Updated Successfully", data: result });
                }
            })
        } catch (err) {
            return res.status(500).json({ status: 1, message: "Internal Server Error", error: err });
        }
    }
}

module.exports = new Employee;