const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = (req, res, next) => {
  req.headers.authorization;
  if (
    req?.headers?.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.API_SECRET,
      (err, decode) => {
        if (err) {
          req.user = undefined;
          next();
        }
        User.findOne({
          _id: decode.id,
        })
          .then((user) => {
            req.user = user;
            next();
          })
          .catch((err) => {
            res.status(500).send({ meassge: err });
          });
      }
    );
  } else {
    req.user = undefined;
    req.message = "Authorization header has not been provided";
    next();
  }
};

module.exports = verifyToken;
