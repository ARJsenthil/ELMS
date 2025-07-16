const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).json({ status: 0, message: "No Token Provider" });

    const token = authHeader.split(' ')[1];
    // try {
    //     const decoder = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    //     req.user = decoder.id;
    //     console.log(req);
    //     next();
    // } catch (err) {
    //     return res.status(500).json({ status: 0, message: "Token is Invalid" });
    // }
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
        if (err && err.name == "TokenExpiredError") {
            return res.sendStatus(401);
        }
        else if(err){
            return res.sendStatus(403);
        }
        req.user = user.id;
        next();
    });
}

module.exports = auth;