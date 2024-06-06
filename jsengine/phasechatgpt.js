function someAsyncOperation(callback) {
  console.log("inside function");
  // Simulating an asynchronous operation
  setTimeout(function () {
    // Callback to be executed after the async operation completes
    callback();
  }, 0);
}

someAsyncOperation(function () {
  console.log("Async operation completed");
});

process.nextTick(function () {
  console.log("This will be executed before the async operation callback");
});
