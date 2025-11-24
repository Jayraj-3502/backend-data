async function FirstMethod() {
  console.log("This is running");
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await response.json();
  console.log(data);
}

async function secondMethod() {
  console.log("Second method is running");
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
    });
}

async function thirdMethod() {
  try {
  } catch (err) {
    console.log(message);
  }
}

// FirstMethod();
thirdMethod();
