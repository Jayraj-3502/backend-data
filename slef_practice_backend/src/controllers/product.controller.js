import { Product } from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponce from "../utils/ApiResponce.js";
import { uploadFile } from "../utils/uploadFile.js";
import { loginUser } from "./user.controller.js";

export async function getAllProductDetails(req, res) {
  try {
    const allProducts = await Product.find().select(
      "_id name price stock totalSelled"
    );

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: allProducts,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function getSellerProducts(req, res) {
  try {
    const logginUser = req.user;
    console.log(logginUser);
    if (logginUser.role === "user") {
      return ApiError({
        res,
        statusCode: 402,
        detailMessage: "You are not a seller",
      });
    }

    const sellerProduct = await Product.find({ sellerid: logginUser.id });

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: sellerProduct,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function createNewProduct(req, res) {
  try {
    const logginUser = req.user;

    if (logginUser.role === "user") {
      return ApiError({
        res,
        statusCode: 400,
        detailMessage: "User can add product",
      });
    }

    const {
      name = "",
      description = "",
      brand = "",
      price = "",
      color = "",
      stock = 0,
    } = req.body;

    const newProduct = await Product.create({
      name,
      description,
      brand,
      price,
      color,
      stock,
      sellerid: logginUser.id,
    });

    const userDetails = User.findById(logginUser.id);

    await User.findByIdAndUpdate(
      logginUser.id,
      {
        $set: { totalproductofseller: +userDetails.totalproductofseller + +1 },
      },
      { new: true, runValidators: true }
    );

    ApiResponce({
      res,
      statusCode: 201,
      activityType: "Creation",
      responceData: newProduct,
    });
  } catch (err) {
    console.log("This is error");
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function deleteProductById(req, res) {
  try {
    // const logginUser = req.user;

    // if (logginUser.role === "user") {
    //   return ApiError({
    //     res,
    //     statusCode: 402,
    //     detailMessage: "You are not a seller or admin",
    //   });
    // }

    console.log("delete run");
    const productDetails = await Product.findById(req.params.id);

    // if (logginUser.role === "seller") {
    //   if (productDetails.sellerid !== logginUser.id) {
    //     return ApiError({
    //       res,
    //       statusCode: 402,
    //       detailMessage: "Seller Id not matched",
    //     });
    //   }
    // }

    const productExist = await Product.findByIdAndDelete(req.params.id);
    if (!productExist) {
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "Product not found",
      });
    }

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Delete",
      responceData: productExist,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function updateProductById(req, res) {
  try {
    const logginUser = req.user;

    if (logginUser.role === "user")
      return ApiError({
        res,
        statusCode: 402,
        detailMessage: "Your are not a seller or admin",
      });

    const productExist = await Product.findById(req.params.id);

    if (!productExist) {
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "Product not found",
      });
    }

    if (logginUser.role === "seller") {
      if (productExist.sellerid !== logginUser.id)
        return ApiError({
          res,
          statusCode: 402,
          detailMessage: "Seller Id not matched",
        });
    }

    const updatedUser = await Product.findByIdAndUpdate(
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

export async function getProductById(req, res) {
  try {
    const productExist = await Product.findById(req.params.id);
    if (!productExist) {
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "Product not found",
      });
    }

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Update",
      responceData: productExist,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}
