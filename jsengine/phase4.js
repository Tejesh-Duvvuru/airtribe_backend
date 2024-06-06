console.log("hello");

for (let index = 0; index < 50; index++) {
  console.log("Inside loop");
} // synchrounus

process.nextTick(() => {
  console.log("Inside next tick");
}); // microtask

const timeoutScheduled = Date.now();
setTimeout(function () {
  const delay = Date.now() - timeoutScheduled;
  console.log(`Inside set timeout , timeout execution with delay ${delay}`);
}, 0); // macrotask

Promise.resolve().then(() => {
  console.log("promise is being resolved");
}); // microtask

console.log("end");
