const {
  airQualityPromises,
} = require("../src/controllers/airQualityControllers");

let url = `https://api.openaq.org/v2/latest`;

console.log("hello");

for (let index = 0; index < 6; index++) {
  console.log("inside for loop");
}

async function getData() {
  let data = await airQualityPromises(url);
  console.log("get data", data);
  console.log("iiiiii");
}

getData();

console.log("end");

//hello
//inside for loop
//inside for loop
//inside for loop
//inside for loop
//inside for loop
//inside for loop
//end
//get data

//still we are using async and await end is
//logging first because
// async and await are promises
//so order is synchronus, microtask, macrotask
