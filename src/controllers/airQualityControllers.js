// const fetch = require("node-fetch");
// import fetch from "node-fetch";
const axios = require("axios");

// callback postman man is callback once response get
function airQualityCallback(url, options, callback) {
  axios(url, options)
    .then((response) => {
      console.log("res", response?.data);
      callback(null, response?.data);
    })
    .catch((error) => {
      callback(error, null);
    });
}
// promise is
function airQualityPromises(url, options) {
  return new Promise((resolve, reject) => {
    axios(url, options)
      .then((response) => {
        // console.log("res", response);
        // callback(null, response);
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error);
        // callback(error, null);
      });
  });
}

module.exports = {
  airQualityCallback,
  airQualityPromises,
};
