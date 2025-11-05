import express from "express";

const PORT = 3000;

const app = express();
app.use(express.json());

let users = [
  {
    id: "12345",
    name: "Jairaj",
    email: "rathodjairaj805@gmail.com",
  },
];

app.get("/", (req, res) => {
  return res.json(users);
});

app.get("/:id", (req, res) => {
  const exist = users.find((user) => user.id === req.params.id);
  if (!exist) {
    return res.status(404).send("User not found");
  }
  return res.json(exist);
});

app.post("/", (req, res) => {
  const newUser = req.body;
  const exist = users.find((user) => user.email === newUser.email);
  if (exist) {
    return res.status(404).send("User's email already Exist");
  }
  users.push(newUser);
  return res.send("User added");
});

app.put("/:id", (req, res) => {
  const newData = req.body;
  const exist = users.find((user) => user.id === req.params.id);
  if (!exist) {
    return res.status(404).send("User Not exist");
  } else {
    const index = users.indexOf(exist);
    users[index] = { ...users[index], ...newData };
    return res.send("Data updated");
  }
});

app.patch("/:id", (req, res) => {
  const newData = req.body;
  const exist = users.find((user) => user.id === req.params.id);
  if (!exist) {
    return res.status(404).send("User Not exist");
  } else {
    const index = users.indexOf(exist);
    users[index] = { ...users[index], ...newData };
    return res.send("Data updated");
  }
});

app.delete("/:id", (req, res) => {
  const exist = users.find((user) => user.id === req.params.id);
  if (!exist) {
    return res.status(404).send("User not exist");
  }
  users = users.filter((user) => user.id !== req.params.id);
  return res.send("User Deleted");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
