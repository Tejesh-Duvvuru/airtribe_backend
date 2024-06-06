console.log("hello");

for (let index = 0; index < 50; index++) {
  console.log("Inside loop");
} // synchrounus

// let current = Date.now();
// console.log("curent:", current);
// let current1 = Date.now();
// console.log(current1);
// let current2 = Date.now();
// console.log(current2);
// let current3 = Date.now();
// console.log(current3);
// console.log(current1 - current);
const timeoutScheduled = Date.now();
setTimeout(function () {
  const delay = Date.now() - timeoutScheduled;
  console.log(`Inside set timeout , timeout execution with delay ${delay}`);
}, 0); // macrotask

process.nextTick(() => {
  console.log("Inside next tick");
  let current = Date.now();
  //Date.now() - current 1, 2, ...,n milliseconds will go
  while (Date.now() - current < 10000) {} // delaying 10sec
}); // microtask

console.log("end");

//never ever relay on timeres in node js

//epoch  time is called epoch

//node --inspect-brk phase3.js
// go to chrome then chrome://inspect
