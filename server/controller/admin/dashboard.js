const { pool } = require("../../config/db");

class Dashboard {
    async totalCount(req, res) {
        try {
            const getCount = (query) => {
                return new Promise((resolve, reject) => {
                    pool.query(query, (err, result) => {
                        if(err) return reject(err);
                        resolve(result[0]['count']);
                    })
                })
            }
            const [ departmentCount, leaveTypeCount, employeeCount ] = await Promise.all([
                getCount("select count(*) as count from department"),
                getCount("select count(*) as count from leave_type"),
                getCount("select count(*) as count from employee")
            ])
            res.status(200).json({ status: 1, data: { departmentCount, leaveTypeCount, employeeCount }, message: "Success" });
        } catch (err) {
            if(err.code == "ECONNREFUSED" || "PROTOCOL_CONNECTION_LOST") {
                res.status(503).json({ status: 0, message: "ECONNREFUSED" });
            }
            else {
                res.status(500).json({ status: 0, message: "Server Error" });
            }
        }
    }
}

module.exports = new Dashboard;