const API_AUTH_KEY = require("./authkey.js");

const authMiddleware = async(req, res, next) => {
    const authKey = req.headers["apiauthkey"];

    if(!authKey) return res.status(403).json({"error": "apiauthkey is missing or invalid"})

    if(authKey !== API_AUTH_KEY) return res.status(403).json({"error": "Failed to authenticate apiauthkey"})

    next();
}


module.exports = authMiddleware;