import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import ApiResponce from "../utils/ApiResponce.js";
import { Product } from "../models/product.model.js";

export async function registerNewUser(req, res) {
  try {
    const {
      fullname = "",
      email = "",
      password = "",
      phone = "",
      role = "user",
    } = req.body;

    const userExistDetails = await User.findOne({ email });

    if (userExistDetails) {
      return ApiError({
        res,
        statusCode: 409,
        detailMessage: "Email already exist.",
      });
    }

    const newPassword = await bcrypt.hash(password, 10);
    console.log(newPassword);
    const newUser = await User.create({
      fullname,
      email,
      password: newPassword,
      phone,
      role,
    });
    console.log(newUser);
    ApiResponce({
      res,
      statusCode: 201,
      activityType: "New User Creation",
      responceData: newUser,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "User Email not exist",
      });
    }

    const passwordMatch = await bcrypt.compare(password, userExist.password);

    if (!passwordMatch) {
      return ApiError({
        res,
        statusCode: 401,
        detailMessage: "Password is wrong",
      });
    }

    const token = jwt.sign(
      {
        id: userExist._id,
        emial: userExist.email,
        role: userExist.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    ApiResponce({
      res,
      statusCode: 201,
      activityType: "Login",
      responceData: { userExist, token },
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function getAllUsersData(req, res) {
  try {
    const logginUser = req.user;

    if (logginUser.role !== "admin") {
      return ApiError({
        res,
        statusCode: 401,
        detailMessage: "Only Admin have access to see all users",
      });
    }

    const users = await User.find();
    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Finding",
      responceData: users,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function getUserById(req, res) {
  try {
    const logginUser = req.user;
    const user = await User.findById(logginUser.id);
    if (!user) {
      return res.status(404).send({ Message: "User Not Found" });
    }
    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Finding",
      responceData: user,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function updateUserData(req, res) {
  try {
    const logginUser = req.user;

    const userExist = await User.findById(logginUser.id);
    if (!userExist) {
      return res.status(404).send({ Message: "User not found" });
    }

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Update",
      responceData: updatedUser,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function deleteUserById(req, res) {
  try {
    const logginUser = req.user;
    const userDelete = await User.findByIdAndDelete(logginUser.id);
    if (!userDelete) {
      return res.status(404).send({ message: "User not exist" });
    }
    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Delete",
      responceData: userDelete,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function addToCart(req, res) {
  try {
    const logginUser = req.user;
    const { productId, quantity = 1 } = req.body;

    const userDetails = await User.findById(logginUser.id);
    if (!userDetails)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "User Not Found",
      });

    const productDetails = await Product.findById(productId);

    console.log(productDetails);

    if (!productDetails)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "Product not found",
      });

    console.log("This is running");

    const itemIndex = userDetails.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      userDetails.cart[itemIndex].quantity += +quantity;
    } else {
      userDetails.cart.push({ product: productId, quantity });
    }

    await userDetails.save();

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Creation or Update",
      responceData: userDetails,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}
