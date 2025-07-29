const Router = require("express").Router();
const { pool } = require("../../config/db");

Router.delete('/deleteData/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { model } = req.body;
        pool.query(`delete * from ${model} where id = ${id}`, (err, result) => {
            if (err) {
                if (err.code == "ECONNREFUSED" || "PROTOCOL_CONNECTION_LOST") {
                    res.status(503).json({ status: 0, message: "ECONNREFUSED" });
                }
                else res.status(400).json({ status: 0, message: 'server error', error: err });
            }
            else {
                return res.status(200).json({ status: 1, message: `${model} Deleted Successfully`, data: result });
            }
        })
    } catch (err) {
        return res.status(500).json({ status: 0, message: 'server error', error: err });
    }
})


module.exports = Router;