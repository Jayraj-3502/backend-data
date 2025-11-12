import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponce from "../utils/ApiResponce.js";

// First section to see total number of products ordered and total amount
export async function totalFilter(req, res) {
  try {
    const allOrders = await Order.find();

    const totalAmount = allOrders.reduce((acc, order) => {
      return acc + order.totalamount;
    }, 0);

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: {
        totaluser: allOrders.length,
        totalamount: totalAmount,
      },
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function userDetailsForAdmin(req, res) {
  try {
    const allUsers = await User.find({ role: "user" });

    const finalResponceData = allUsers.map((user) => {
      return {
        fullName: user.fullname,
        totalOrders: user.totalorders,
        totalOrderAmount: user.totalorderamount,
      };
    });

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: finalResponceData,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function sellerDetailsForAdmin(req, res) {
  try {
    const allUsers = await User.find({ role: "seller" });

    const finalResponceData = allUsers.map((user) => {
      return {
        fullName: user.fullname,
        totalNumberOfProduts: user.totalproductofseller || 0,
        totalProductsSelled: user.totalproductsselled,
        totalProductsSelledAmount: user.totalproductsselledamount,
      };
    });

    console.log(finalResponceData);

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: finalResponceData,
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
    const topUser = await User.find({ role: "seller" })
      .sort({
        totalproductsselledamount: "desc",
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
