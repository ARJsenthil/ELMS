const { Router } = require("express");
const { pool } = require("../../config/db");
const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
        console.log(req.body);
        try {
        const { username, password, type } = req.body;
        console.log(req.body);
         pool.query(`SELECT * FROM ${type} WHERE username = ? and password = ?`, [username, password], async (err, result) => {
            if(err) {
                console.log(err);
                return res.status(400).json({ status: 0, message: 'server error' });
            }
            else {
                console.log(result)
                if(result.length) {
                    return res.status(200).json({ status: 1, message: 'login' });
                }
                else {
                    return res.status(409).json({ status: 0, message: 'incorrect username/password' });
                }
            }
        })
    } catch (err) {
        return res.status(500).json({ status: 0, message: 'server error', error: err });
    }
})

module.exports = router;