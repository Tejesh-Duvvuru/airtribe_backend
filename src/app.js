const express = require("express");

const app = express();
//"./routes/airQuality3"   this  called relative path
const airQuality = require("./routes/airQuality3");

const routes = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
const { signup, signin } = require("./controllers/authController");
const courses = require("./routes/courses");
if (process.env.NODE_ENV !== "test") {
  try {
    mongoose.connect("mongodb://localhost:27017/userdb", {
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
    });
    console.log("connected to moongo");
  } catch (error) {
    console.log("errored out", error);
  }
}

app.use(express.json());
app.use(routes);
const myLogger = function (req, res, next) {
  console.log("my logger");
  next();
};

const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  console.log("requested time " + req.requestTime);
  next();
};

routes.use(myLogger);
routes.use(requestTime);

routes.get("/", (req, res) => {
  res.send("I am here:-) buddy");
});
routes.use("/airQuality", airQuality);
routes.post("/register", signup);
routes.post("/sigin", signin);
routes.use("/courses", courses);
let PORT = 5001;
app.listen(process.env.PORT || PORT, (err) => {
  if (err) {
    console.log(`node error ${err}`);
  } else {
    console.log(`app is listening at port number 5001`);
  }
});

module.exports = app;
