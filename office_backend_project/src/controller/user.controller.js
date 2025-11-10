import { User } from "../models/user.model.js";
import { CreateUser, FindUserById } from "../services/user.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export async function registerUser(req, res) {
  try {
    const {
      firstname = "",
      lastname = "",
      email = "",
      password = "",
      phone = "",
    } = req.body;

    const newUser = await CreateUser({
      res,
      firstname,
      lastname,
      email,
      password,
      phone,
    });

    if (!newUser) {
      return ApiError({
        res,
        statusCode: 400,
        message: "User creation failed",
      });
    }

    ApiResponse({
      res,
      statusCode: 201,
      actionType: "Creation",
      data: newUser,
    });
  } catch (error) {
    ApiError({ res, statusCode: 500, message: error });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
  } catch (error) {
    ApiError({ res, statusCode: 500, message: error });
  }
}

export async function getAllUser(req, res) {
  try {
    const usersData = await User.find();

    if (!usersData) {
      return ApiError({
        res,
        statusCode: 404,
        message: "User Not Found",
      });
    }

    ApiResponse({ res, statusCode: 201, actionType: "Fetch", data: usersData });
  } catch (error) {
    ApiError({ res, statusCode: 500, message: error });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params.id;
    const userExist = await User.findById(id);

    if (!userExist) {
      return ApiError({
        res,
        statusCode: 404,
        message: "User Not Found or Not Exist",
      });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    ApiResponse({
      res,
      statusCode: 202,
      actionType: "Deletion",
      data: deletedUser,
    });
  } catch (error) {
    ApiError({ res, statusCode: 500, message: error });
  }
}

export async function updateUser(req, res) {}
