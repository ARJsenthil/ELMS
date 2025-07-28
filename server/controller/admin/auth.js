// require('dotnet').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { pool } = require('../../config/db');
const { generateAccessToken, generateRefreshToken } = require('../../services/token.service');

class Auth {

    async login(req, res) {
        try {
            const { ph_no, password, type } = req.body;
            console.log(req.body);
            pool.query(`select * from ${type} where ph_no = ?`, ph_no, async (err, result) => {
                if (err) {
                    return res.status(409).json({ status: 0, message: "Try Again Later", error: err });
                }
                else {
                    if (result.length > 0) {
                        const data = result[0];
                        console.log(result);
                        // console.log(await bcrypt.compare(password, result[0].password))
                        bcrypt.compare(password, result[0].password_hash, (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.status(409).json({ status: 0, message: "Incorrect Password", error: err });
                            }
                            else {
                                const employeeDetail = { id: data.id, email: data.email, ph_no: data.ph_no, type };
                                employeeDetail["name"] = data.firstname ? data.firstname + ' ' + data.lastname : data.name;
                                const accessToken = generateAccessToken(employeeDetail);
                                const refreshToken = generateRefreshToken(employeeDetail);
                                res.cookie('refreshToken', refreshToken, {
                                    httpOnly: true,
                                    secure: false, // set to true in production (HTTPS)
                                    sameSite: 'Lax',
                                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                                });
                                return res.status(200).json({ status: 1, message: `Welcome Back ${employeeDetail.name}`, data: { token: accessToken, data: employeeDetail } });
                            }
                        });
                    }
                    else {
                        return res.status(409).json({ status: 0, message: "User Not Found" });
                    }
                }
            })
        } catch (err) {

        }
    }

    async refresh(req, res) {
        console.log(req.cookies.refreshToken);
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(403).json({ message: "No refresh token" });
        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
            if (err) return res.status(403).json({ message: "Invalid refresh token" });

            const employeeDetail = { id: user.id, email: user.email, ph_no: user.ph_no, type: user.type };
            const newAccessToken = generateAccessToken(employeeDetail);
            res.json({ accessToken: newAccessToken });
        });
    }

    async logout(req, res) {
        res.clearCookie('refreshToken');
        res.status(204).send();
    }

    async register(req, res) {
        try {
            console.log(req.body);
            const { ph_no, password, email } = req.body;
            const password_hash = await bcrypt.hash(password, 5);
            console.log(password_hash);
            pool.query("insert into user_data (ph_no, email, password) values (?, ?, ?)", [ph_no, email, password_hash], (err, result) => {
                if (err) {
                    return res.status(409).json({ status: 0, message: "Registeration Failed Try Again Later", error: err });
                }
                else {
                    return res.status(200).json({ status: 1, message: "User Created Successfully" });
                }
            })
        } catch (err) {
            return res.status(500).json({ status: 0, message: "Server Error", error: err });
        }
    }
}

module.exports = new Auth;