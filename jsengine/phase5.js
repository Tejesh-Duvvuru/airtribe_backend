const {
  airQualityPromises,
} = require("../src/controllers/airQualityControllers");

let url = `https://api.openaq.org/v2/latest`;

console.log("hello");

for (let index = 0; index < 10; index++) {
  console.log("Inside loop");
} // synchrounus

process.nextTick(() => {
  console.log("Inside next tick");
  let current = Date.now();
  //Date.now() - current 1, 2, ...,n milliseconds will go
  while (Date.now() - current < 10) {} // delaying 10sec
}); // microtask

Promise.resolve().then(() => {
  console.log("promise is being resolved");
}); // microtask

let options = {
  method: "GET",
};
airQualityPromises(url, options)
  .then((response) => {
    console.log("promise is being resolved and data is network request");
  })
  .catch((err) => {
    console.log("888888888888888", err);
  });
//microtask but it network call first network call should be resolve
//it is network request
//so we can't say when it will execute
//sometime it  will take 1sec or 2sec or 3sec
//based on this order execution will change

for (let index = 0; index < 10; index++) {
  Promise.resolve().then(() => {
    console.log("promise is being resolved with in the loop");
  }); // microtask
}

setImmediate(() => {
  console.log("Immediate");
}); // macrotask

const timeoutScheduled = Date.now();
setTimeout(function () {
  const delay = Date.now() - timeoutScheduled;
  console.log(`Inside set timeout , timeout execution with delay ${delay}`);
}, 10); // macrotask
//if we decrease time first it will excute
//then setImmediate
//then network call maybe
//exaclty this will not happen
//you can check circle of diagram in note

console.log("end");
