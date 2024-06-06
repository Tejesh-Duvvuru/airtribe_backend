const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../src/models/user");

const signup = (req, res) => {
  const user = new User({
    fullName: req.body.fullName,
    role: req.body.role,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  user
    .save()
    .then((data) => {
      res.status(200).send({
        message: "succesfully register",
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

const signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found",
        });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid password",
        });
      }

      var token = jwt.sign(
        { id: user.id, email: req.body.email },
        process.env.API_SECRET,
        {
          expiresIn: 86400,
        }
      );
      res.status(200).send({
        user: {
          email: user.email,
        },
        message: "login successfully",
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

module.exports = { signup, signin };
