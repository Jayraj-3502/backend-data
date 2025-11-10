import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export async function addOrder(req, res) {
  try {
    const logginUser = req.user;
    const { productId, quantity } = req.body;

    const userDetail = await User.findById(logginUser.id);
    if (!userDetail)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "User Not Exist",
      });

    const productDetails = await Product.findById(productId);
    if (!productDetails)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "Product Not Found",
      });

    if (productDetails.quantity < quantity)
      return ApiError({
        res,
        statusCode: 400,
        detailMessage: "Product quantity is less then you added.",
      });

    const newOrder = await Order.create({
      user: userDetail._id,
      products: {
        product: productId,
        quantity: quantity,
        price: quantity * productDetails.price,
      },
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function getOrders(req, res) {}
