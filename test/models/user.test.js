const sinon = require("sinon");
const expect = require("chai").expect;
const User = require("../../src/models/User");
const bcrypt = require("bcrypt");

describe("Creating documnets in mongo db", () => {
  it("craetes a new user successfully", (done) => {
    const user = new User({
      fullName: "Tejesh D",
      role: "admin",
      email: "test123@yopmail.com",
      password: bcrypt.hashSync("test1", 8),
    });
    user.save().then((user) => {
      console.log(user);
      expect(!user.isNew).equal(true);
      done();
    });
  });
});

describe("Validate email correctness", () => {
  it("craetes a new user successfully", (done) => {
    const user = new User({
      fullName: "Tejesh D",
      role: "admin",
      email: "tes@t123@yopmail.com",
      password: bcrypt.hashSync("test1", 8),
    });
    // catch because we are handling promises .then and .catch
    user.save().catch((err) => {
      expect(err._message).equal("User validation failed");
      console.log(user);
      // expect(!user.isNew).equal(true);
      done();
    });
  });
});

//we can disable before for one test case
//this is for check duplicate email id's but we are running beforeeach test deleting data
