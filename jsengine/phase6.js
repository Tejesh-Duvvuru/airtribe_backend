const fs = require("fs");
console.log("hello");

//difference between readfile and readfile sync
fs.readFile("./input.txt", () => {
  setTimeout(() => {
    console.log("set timeout inside io");
  }, 0);

  setImmediate(() => {
    console.log("set immediate inside io");
  });
});

setTimeout(() => {
  console.log("set timeout outside");
}, 0);

setImmediate(() => {
  console.log("set immediate outside");
});

console.log("end");

//order excecution
// hello
// end
// set timeout outside
// set immediate outside
// set immediate inside io
// set timeout inside io
// in outside timeout first and immediate second because it priority
//in inside after io first will come immediate and timeinteral or timeout

//check order visuvaliztion diagram
