import { User } from "../models/user.models.js";

export async function handleGetAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
}

export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

export async function addNewUser(req, res) {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).send("Name and email are required");
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(409).send("User's email already exists");
    }

    const newUser = await User.create({ name, email });
    res.status(201).json({ message: "User added", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

export async function deleteUserById(req, res) {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    console.log(deleted);
    if (!deleted) return res.status(404).send("User not found");
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(400).send("Invalid user ID");
  }
}
