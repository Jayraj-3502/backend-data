import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponce from "../utils/ApiResponce.js";

// First section to see total number of products ordered and total amount
export async function totalFilter(req, res) {
  try {
    const allOrders = await Order.find();
    const allProducts = await Product.find();

    const totalAmount = allOrders.reduce((acc, order) => {
      return acc + order.totalamount;
    }, 0);

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: {
        totalordersold: allOrders.length,
        totalorderrevenue: totalAmount,
        totalproductcount: allProducts.length,
      },
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function userDetailsForAdmin(req, res) {
  try {
    const allUsers = await User.find({ role: "user" })
      .limit(20)
      .select("_id fullname totalorders totalorderamount");

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: allUsers,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function sellerDetailsForAdmin(req, res) {
  try {
    const allSellers = await User.find({ role: "seller" })
      .limit(20)
      .select(
        "_id fullname totalproductofseller totalproductsselled totalproductsselledamount"
      );

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: allSellers,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function topUsersBasedOnOrder(req, res) {
  try {
    const topUser = await User.find({ role: "user" })
      .sort({
        totalorders: "desc",
      })
      .limit(5);
    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: topUser,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: "Server Error" });
  }
}

export async function topSellerBasedOnAmount(req, res) {
  try {
    const topSeller = await User.find({ role: "seller" })
      .sort({
        totalproductsselledamount: "desc",
      })
      .limit(5);
    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: topSeller,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: "Server Error" });
  }
}

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

export async function getAllOrdersDetails(req, res) {
  try {
    const response = await Order.find()
      .populate("user", "fullname")
      .populate("products.product", "name");
    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: response,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}
