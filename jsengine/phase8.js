console.log("stack [1]");

setTimeout(() => console.log("macro [2]"), 0);
setTimeout(() => console.log("macro [3]"), 0);

const p = Promise.resolve();

for (let i = 0; i < 3; i++) {
  p.then(() => {
    setTimeout(() => {
      console.log("micro [4]");
      setTimeout(() => console.log("macro [5]"), 0);
      p.then(() => console.log("micro [6]"));
    }, 0);
    console.log("micro [7]");
  });
}

console.log("stack [8]");

//just rember
//order
//synchrouns, microtask, macrotask
//inside microtask also same first synchrouns, microtask, macrotask
//inside macrotask also same first synchrouns, microtask, macrotask
//class 7 1:55
// stack[1];
// stack[8];
// micro[7];
// micro[7];
// micro[7];
// macro[2];
// macro[3];
// micro[4];
// micro[6];
// micro[4];
// micro[6];
// micro[4];
// micro[6];
// macro[5];
// macro[5];
// macro[5];
