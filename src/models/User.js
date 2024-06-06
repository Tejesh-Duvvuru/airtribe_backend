var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  fullName: {
    type: String,
    required: [true],
  },
  email: {
    type: String,
    unique: [true, "email is already taken"],
    lowercase: true,
    trim: true,
    required: [true, "email not provide"],
    validate: {
      validator: function (v) {
        return;
      },
      message: "(v) not validate",
    },
  },
  role: {
    type: String,
    required: [true, "Please specify the role"],
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
