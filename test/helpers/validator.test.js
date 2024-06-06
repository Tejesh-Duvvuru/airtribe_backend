const sinon = require("sinon");
const validator = require("../../src/helpers/validator");
const courseData = require("../../src/models/coursesData.json");
const { beforeEach } = require("mocha");
const expect = require("chai").expect;

let courseDetails = {
  name: "HTML",
  days: 15,
  teacher: "Sandeep",
  course: "node js",
  courseId: 3,
  college: "NBKR",
  semester: 3,
  instructor: "Teja",
  averageRating: 0,
  studentsVoted: 0,
};

describe("validated the function for courses added", () => {
  let validateUniqueCourseIdSpy;
  let validateCouseInfoSpy;

  //it will  call before every 'it' before
  beforeEach((done) => {
    //spy will check the function is called
    validateUniqueCourseIdSpy = sinon.spy(validator, "validateUniqueCourseId");
    validateCouseInfoSpy = sinon.spy(validator, "validateCouseInfo");
    done();
  });
  //it will  call after every 'it' after
  afterEach((done) => {
    //once the spy checking on function we need to restore to use again
    //restoring the spy
    validateUniqueCourseIdSpy.restore();
    validateCouseInfoSpy.restore();
    done();
  });

  it("validate course info happy flow", async function (done) {
    let resposnse = validator.validateCouseInfo(courseDetails, courseData);
    expect(resposnse.status).equal(true);
    expect(resposnse.message).equal("Course has been added");
    expect(validateCouseInfoSpy.calledOnce);
    expect(validateUniqueCourseIdSpy.calledOnce);
    done();
  });
  it("validate error flow", async (done) => {
    courseDetails.courseId = 2;
    let resposnse = validator.validateCouseInfo(courseDetails, courseData);
    expect(resposnse.status).equal(false);
    expect(resposnse.message).equal("Course has been unique id");
    expect(validateCouseInfoSpy.calledOnce);
    expect(validateUniqueCourseIdSpy.calledOnce);
    done();
  });
  it("Validating all fields are present are not", async (done) => {
    courseDetails.courseId = 3;
    delete courseDetails.college;
    let resposnse = validator.validateCouseInfo(courseDetails, courseData);
    expect(resposnse.status).equal(false);
    expect(resposnse.message).equal("properties not match");
    expect(validateCouseInfoSpy.calledOnce);
    expect(validateUniqueCourseIdSpy.calledOnce);
    done();
  });
});

describe("validated the function for courses added - Stubs", () => {
  let validateCouseInfoSpy;
  //mock validateUniqueCourseIdSpy
  beforeEach((done) => {
    //spy will check the function is called
    validateCouseInfoSpy = sinon.spy(validator, "validateCouseInfo");
    done();
  });
  //it will  call after every 'it' after
  afterEach((done) => {
    //once the spy checking on function we need to restore to use again
    //restoring the spy
    validateCouseInfoSpy.restore();
    done();
  });

  it("validate course info happy flow", async function (done) {
    courseDetails.college = "NBKR";
    let validateCouseIdStud = sinon
      .stub(validator, "validateUniqueCourseId")
      .returns(true);
    let resposnse = validator.validateCouseInfo(courseDetails, courseData);
    expect(resposnse.status).equal(true);
    expect(resposnse.message).equal("Course has been added");
    expect(validateCouseInfoSpy.calledOnce);
    expect(validateCouseIdStud.calledOnce);
    validateCouseIdStud.restore();
    done();
  });
});

//setup   before and beforeEach, after and afterEach
//assert  what is assertions
//destory
