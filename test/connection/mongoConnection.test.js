const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//the url usersTestDB  is for testing db not actuall db
mongoose.connect("mongodb://localhost:27017/usersTestDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
console.log("connected to moongo");

// console.log("errored out", );

mongoose.connection
  .once("open", () => console.log("connected"))
  .on("error", (error) => {
    console.warn("warn", error);
  });
// if we run this every test data will be destroy in db so we can do fresh data
// for that we don't kept inside describe it should apply for every testcase
beforeEach((done) => {
  console.log("running before each test literally");
  //@users is model name
  mongoose.connection.collection.users.drop(() => {
    done();
  });
});
