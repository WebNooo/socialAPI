const jwt = require("jsonwebtoken");
const result = require("./result");

module.exports = function (req, res, next){
    const token = req.header('auth-token');
    console.log(token)

    if (!token) return res.send(result({}, 1));

    try {
        req.user = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    }catch (err){
        res.send(result({}, 2));
    }
}