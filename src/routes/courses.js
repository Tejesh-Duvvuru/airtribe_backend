const express = require("express");
const courses = express.Router();
const coursesList = require("../models/coursesData.json");

courses.get("/", (req, res) => {
  res.json({ courses: coursesList });
});

module.exports = courses;
