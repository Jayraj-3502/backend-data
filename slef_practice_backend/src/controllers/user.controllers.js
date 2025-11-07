import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError.js";

export async function registerNewUser(req, res) {
  try {
    const { username, email, password } = req.body;

    const userExistDetails = await User.findOne({ username, email });

    if (userExistDetails) {
      if (userExistDetails.username === username) {
        res.status(409).send({ Message: "username already exist" });
      } else if (userExistDetails.email) {
        res.status(409).send({ Message: "email already exist" });
      } else {
        res.status(501).send({ Message: "Something went wrong" });
      }
    }

    const newPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: newPassword,
    });
    res.status(201).send({ status: "created", data: newUser });
  } catch (err) {
    res.status(500).send("Server Error", err.message);
  }
}

export async function loginUser(req, res) {
  try {
    const { username } = req.body;
    const userExist = await User.findOne({ username });

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
    const users = await User.find();
    res.status(201).send({ mesage: "Users Data", users: users });
  } catch (err) {
    res.status(500).send({ Message: "Server Error", Error: err });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
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
    const userExist = await User.findById(req.params.id);
    if (!userExist) {
      return res.status(404).send({ Message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
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
    const userDelete = await User.findByIdAndDelete(req.params.id);
    if (!userDelete) {
      return res.status(404).send({ message: "User not exist" });
    }
    res.status(201).send({ message: "User is Deleted" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
}
