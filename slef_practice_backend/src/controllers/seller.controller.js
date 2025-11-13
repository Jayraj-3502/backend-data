import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponce from "../utils/ApiResponce.js";

export async function allProductsWithDetails(req, res) {
  try {
    const logginUser = req.user;
    const sellerAllProducts = await Product.find({ sellerid: logginUser.id });

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: sellerAllProducts,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function topBuyedProducts(req, res) {
  try {
    const logginUser = req.user;
    const topProducts = await Product.find({ sellerid: logginUser.id })
      .sort({
        totalSelled: "desc",
      })
      .limit(5);

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: topProducts,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function topBuyedPeoples(req, res) {
  try {
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function sellerTotalFilter(req, res) {
  try {
    const logginUser = req.user;
    const sellerDetails = User.findById(logginUser.id);

    const finalResponceData = {
      fullname: sellerDetails.fullname,
      total_number_of_products: sellerDetails.totalproductofseller,
      total_products_selled: sellerDetails.totalproductsselled,
      total_products_selled_amount: sellerDetails.totalproductsselledamount,
    };

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
