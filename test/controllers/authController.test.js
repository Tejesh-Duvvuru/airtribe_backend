process.env.NODE_ENV = "test";
let chai = require("chai");
const expect = require("chai").expect;
let chaiHttp = require("chai-http"); // it is for http server
const server = require("../../src/app");
chai.use(chaiHttp); // similar to app.use() we are saying chai to use chaiHttp

describe("verify the signup flow", () => {
  it("Successful signup", (done) => {
    let signUpBody = {
      fullName: "tejesh",
      password: "12345678",
      email: "tejesh@test.com",
      role: "tester",
    };

    // body =send
    // headers = set  .set('authorization', 'JWT Key)
    chai
      .request(server)
      .post("/register")
      .send(signUpBody)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.message).equal("succesfully register");
        done();
      });
  });
});
