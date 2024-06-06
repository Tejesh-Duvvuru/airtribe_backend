console.log("hello");

for (let index = 0; index < 50; index++) {
  console.log("Inside loop");
}

process.nextTick(() => {
  console.log("Inside nexttickt");
}); //microtask

console.log("end");
