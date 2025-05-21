// require('dotnet').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { pool } = require('../../config/db');

class Auth {

    generateToken(payload) {
        const token = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN);
        return token;
    }
    async login(req, res) {

        try {
            const { username, password } = req.body;

            pool.query("select * from user_data where username = ?", username, async (err, result) => {
                if(err) {
                    return res.status(409).json({ status: 0, message: "Try Again Later", error: err });
                }
                else {
                    if(result.length >= 0) {
                        const data = result[0];
                        console.log(await bcrypt.compare(password, result[0].password))
                        await bcrypt.compare(password, result[0].password, (err, result) => {
                            if(err) {
                                console.log(err);
                                return res.status(409).json({ status: 0, message: "Incorrect Password", error: err });
                            }
                            else {
                                function generateToken(payload) {
                                    const token = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN);
                                    return token;
                                }
                                const genaratedToken = jwt.sign(data, process.env.JWT_ACCESS_TOKEN, { expiresIn: '1h' });
                                return res.status(200).json({ status: 1, message: `Welcome Back ${username}`, data: { token: genaratedToken }});
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

    async register(req, res) {
        try {
            console.log(req.body);
            const { username, password, email } = req.body;
            const password_hash = await bcrypt.hash(password, 5);
            console.log(password_hash);
            pool.query("insert into user_data (username, email, password) values (?, ?, ?)", [username, email, password_hash], (err, result) => {
                if(err) {
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