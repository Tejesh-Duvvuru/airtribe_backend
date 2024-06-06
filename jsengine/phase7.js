const fs = require("fs");
console.log("start");

process.nextTick(() => {
  console.log("first tick call back executed");
}); // microtask

Promise.resolve().then(() => {
  console.log("first promise is being resolved");
}); // microtask

fs.readFile("./input.txt", (error) => {
  setTimeout(() => {
    console.log("set timeout inside io");
  }, 0);

  setImmediate(() => {
    console.log("set immediate inside io");
  });
  if (!error) {
    console.log("file read");
  }
  Promise.resolve().then(() => {
    console.log("second promise is being resolved");
  }); // microtask
  process.nextTick(() => {
    console.log("second tick call back executed");
  });
});

Promise.resolve().then(() => {
  console.log("third promise is being resolved");
}); // microtask

process.nextTick(() => {
  console.log("third tick call back executed");
}); // microtask

setTimeout(() => {
  console.log("set timeout outside");
}, 0);

setImmediate(() => {
  console.log("set immediate outside");
});

console.log("end");

// start
// end
// first tick call back executed   // process.next has higest order then promise
// third tick call back executed
// first promise is being resolved
// third promise is being resolved
// set timeout outside
// set immediate outside
// file read
// second tick call back executed
// second promise is being resolved
// set immediate inside io
// set timeout inside io
