const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET_KEY;

// Creates a JWT access token for a given user
module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };

    return jwt.sign(data, secret, {});
};

// Middleware that verifies the Bearer token sent in the Authorization header
module.exports.verify = (req, res, next) => {
    let token = req.headers.authorization;

    if (typeof token === "undefined") {
        return res.status(401).send({ message: "Authentication failed. No token provided." });
    }

    token = token.slice(7, token.length); // Remove "Bearer " prefix

    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            return res.status(401).send({ message: "Authentication failed. Invalid or expired token." });
        }

        req.user = decodedToken;
        next();
    });
};
