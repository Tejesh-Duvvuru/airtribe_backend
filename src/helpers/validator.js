class validator {
  static validateCouseInfo(courseInfo, courseData) {
    if (
      courseInfo.hasOwnProperty("course") &&
      courseInfo.hasOwnProperty("courseId") &&
      courseInfo.hasOwnProperty("college") &&
      courseInfo.hasOwnProperty("semester") &&
      courseInfo.hasOwnProperty("instructor") &&
      courseInfo.hasOwnProperty("averageRating") &&
      courseInfo.hasOwnProperty("studentsVoted") &&
      this.validateUniqueCourseId(courseInfo, courseData)
    ) {
      return {
        status: true,
        message: "Course has been added",
      };
    }
    if (!this.validateUniqueCourseId(courseInfo, courseData)) {
      return {
        status: false,
        message: "Course has been unique id",
      };
    }
    return {
      status: false,
      message: "properties not match",
    };
  }

  static validateUniqueCourseId(courseInfo, courseData) {
    let valueFoud = courseData.airtribe.some(
      (ele) => ele.courseId === courseInfo.courseId
    );
    if (valueFoud) return false;
    return true;
  }
}

module.exports = validator;
