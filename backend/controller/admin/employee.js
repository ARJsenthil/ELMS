const { pool } = require("../../config/db");

class Employee {

    create(req, res) {
        try {
            const { firstname, lastname, email, password_hash, gender, dob, dept_id, country, city_town, address, ph_no } = req.body;
            const employeeData = [ firstname, lastname, email, password_hash, gender, dob, dept_id, country, city_town, address, ph_no ];

            pool.query("insert into employee ( firstname, lastname, email, password_hash, gender, dob, dept_id, country, city_town, address, ph_no ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", employeeData, (err, result) => {
                if(err) {
                    return res.status(409).json({ status: 0, message: "Server Error", error: err });
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
                if(err) {
                    return res.status(409).json({ status: 0, message: "Server Error", error: err });
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
                if(err) {
                    return res.status(409).json({ status: 0, message: "Server Error", error: err });
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
            const { firstname, lastname, email, gender, dob, dept_id, country, city_town, address, ph_no } = req.body;
            console.log(ph_no);
            pool.query("update employee set firstname = ?, lastname = ?, email = ?, gender = ?, dob = ?, dept_id = ?, country = ?, city_town = ?, address = ?, ph_no = ? where id = ?", [ firstname, lastname, email, gender, dob, dept_id, country, city_town, address, ph_no, id ], (err, result) => {
                if(err) {
                    return res.status(409).json({ status: 0, message: "Server Error", error: err });
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