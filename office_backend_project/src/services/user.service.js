import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export async function CreateUser({
  firstname = "",
  lastname = "",
  email = "",
  password = "",
  phone = "",
  //   address = "",
}) {
  const userExist = FindUser({ email });

  if (!userExist) {
    return null;
  }

  const newUser = await User.create({
    firstname,
    lastname,
    email,
    password,
    phone,
    // address,
  });

  return newUser;
}

export async function FindUserByEmail({ email = "" }) {
  const userExist = await User.findOne({ email });
  return userExist;
}

export async function FindUserById({ id = "" }) {
  const userExist = await User.findOne({ id });
  return userExist;
}

export async function DeleteUser({ id = "" }) {
  const user = await User.findById(id);
  return user;
}

export async function UpdateUser({}) {}
