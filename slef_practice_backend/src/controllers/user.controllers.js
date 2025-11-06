import { NewUser } from "../models/user.models.js";

export async function registerNewUser(req, res) {
  try {
    const { username, email, password } = req.body;

    const usernameExist = await NewUser.findOne({ username });
    if (usernameExist) {
      res.status(409).send("User Name already exist");
    }

    const emailExist = await NewUser.findOne({ email });
    if (emailExist) {
      res.status(409).send("User Email already exist");
    }

    const newUser = await NewUser.create({ username, email, password });
    res.status(201).send({ status: "created", data: newUser });
  } catch (err) {
    res.status(500).send("Server Error", err);
  }
}

export async function loginUser(req, res) {
  try {
    const { username } = req.body;
    const userExist = await NewUser.findOne({ username });

    if (!userExist) {
      return res.status(401).send({ Message: "User not found!" });
    }

    res
      .status(201)
      .send({ Message: "User Found and Logged in", Data: userExist });
  } catch (err) {
    res.status(500).send({ Message: "Server Error", Error: err });
  }
}

export async function getAllUsersData(req, res) {
  try {
    const users = await NewUser.find();
    res.status(201).send({ mesage: "Users Data", users: users });
  } catch (err) {
    res.status(500).send({ Message: "Server Error", Error: err });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await NewUser.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ Message: "User Not Found" });
    }
    res.status(201).send({ Message: "User Found", User: user });
  } catch (err) {
    res.status(500).send({ Message: "Server Error", Error: err });
  }
}

export async function updateUserData(req, res) {
  try {
    const userExist = await NewUser.findById(req.params.id);
    if (!userExist) {
      return res.status(404).send({ Message: "User not found" });
    }

    const updatedUser = await NewUser.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).send({
      Message: "User updated successfully",
      Data: updatedUser,
    });
  } catch (err) {
    res.status(500).send({ Message: "Server Error", Error: err });
  }
}

export async function deleteUserById(req, res) {
  try {
    const userDelete = await NewUser.findByIdAndDelete(req.params.id);
    if (!userDelete) {
      return res.status(404).send({ message: "User not exist" });
    }
    res.status(201).send({ message: "User is Deleted" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
}
