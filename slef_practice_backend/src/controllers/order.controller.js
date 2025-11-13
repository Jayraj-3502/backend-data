import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponce from "../utils/ApiResponce.js";

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
      sellerid: productDetails.sellerid,
      products: {
        product: productId,
        quantity: quantity,
        price: productDetails.price,
      },
      totalamount: quantity * productDetails.price,
      orderdate: Date.now(),
      status: "processing",
    });

    await Product.findByIdAndUpdate(
      productDetails._id,
      { $set: { stock: productDetails.stock - quantity } },
      { new: true, runValidators: true }
    );

    const totalorders = +userDetail.totalorders + +quantity;
    const totalorderamount =
      +userDetail.totalorderamount + +productDetails.price * +quantity;

    await User.findByIdAndUpdate(
      logginUser.id,
      {
        $set: {
          totalorders: parseFloat(totalorders.toFixed(2)),
          totalorderamount: parseFloat(totalorderamount.toFixed(2)),
        },
      },
      { new: true, runValidators: true }
    );

    const sellerDetails = await User.findById(productDetails.sellerid);

    const totalproductsselled = +sellerDetails.totalproductsselled + +quantity;
    const totalproductsselledamount =
      +sellerDetails.totalproductsselledamount +
      +productDetails.price * +quantity;

    await User.findByIdAndUpdate(
      sellerDetails._id,
      {
        $set: {
          totalproductsselled: parseFloat(totalproductsselled.toFixed(2)),
          totalproductsselledamount: parseFloat(
            totalproductsselledamount.toFixed(2)
          ),
        },
      },
      { new: true, runValidators: true }
    );

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Placed",
      responceData: newOrder,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function getOrdersForUser(req, res) {
  try {
    const logginUser = req.user;
    if (logginUser.role != "user")
      return ApiError({
        res,
        statusCode: 400,
        detailMessage: "Only user can access this",
      });

    const allOrders = await Order.find({ user: logginUser.id });
    if (!allOrders)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "No Order found",
      });

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: allOrders["products"],
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

// This function is to get data of orders filter by the seller ID
export async function getOrdersForSeller(req, res) {
  try {
    const logginUser = req.user;

    if (logginUser.role != "seller")
      return ApiError({
        res,
        statusCode: 400,
        detailMessage: "Only Seller can access this",
      });

    const allOrders = await Order.find({ sellerid: logginUser.id });

    if (!allOrders)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "No order found",
      });

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: allOrders,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

// This function is to get data of all orders for admin
export async function getOrdersForAdmin(req, res) {
  try {
    const logginUser = req.user;

    if (logginUser.role != "admin")
      return ApiError({
        res,
        statusCode: 400,
        detailMessage: "Only admin can access this",
      });

    const allOrders = await Order.find();

    if (!allOrders)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "Orders are not found",
      });

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Fetch",
      responceData: allOrders,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const logginUser = req.user;
    const { orderid, status } = req.body;

    if (logginUser.role === "user")
      return ApiError({
        res,
        statusCode: 400,
        detailMessage: "User can't update status",
      });

    const orderDetails = await Order.findById(orderid);
    if (!orderDetails)
      return ApiError({
        res,
        statusCode: 404,
        detailMessage: "Order not exist",
      });

    if (
      logginUser.role === "seller" &&
      orderDetails.sellerid.toString() !== logginUser.id
    )
      return ApiError({
        res,
        statusCode: 400,
        detailMessage: "Seller Id not matched",
      });

    const updatedOrder = await Order.findByIdAndUpdate(
      orderid,
      { $set: { status: status } },
      { new: true, runValidators: true }
    );

    if (!updatedOrder)
      return ApiError({
        res,
        statusCode: 400,
        detailMessage: "Order Status not updated",
      });

    ApiResponce({
      res,
      statusCode: 200,
      activityType: "Update",
      responceData: updatedOrder,
    });
  } catch (err) {
    ApiError({ res, statusCode: 500, detailMessage: err });
  }
}
