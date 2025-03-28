const { Router } = require("express");
const { pool } = require("../../config/db");


Router.delete('/deleteData/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { model } = req.body;
        await pool.query('delete * from ? where _id = ?', [model, id], (err, res) => {
            if(err) {
                res.status(400).json({ status: 0, message: 'server error', error: err });
            }
            else {
                res.status(200).json({ status: 1, message: `${model} Deleted Successfully`, data: res });
            }
        })
    } catch (err) {
        res.status(500).json({ status: 0, message: 'server error', error: err });
    }
})