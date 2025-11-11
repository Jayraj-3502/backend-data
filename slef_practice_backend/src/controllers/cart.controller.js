// import { Cart } from "../models/cart.model.js";
// import { User } from "../models/user.model.js";
// import { Product } from "../models/product.model.js";

// export async function addToCart(req, res) {
//   try {
//     const logginUser = req.user;
//     const { productId, quantity = 1 } = req.body;

//     const userDetails = await User.findById(logginUser.id);
//     if (!userDetails)
//       return ApiError({
//         res,
//         statusCode: 404,
//         detailMessage: "User Not Found",
//       });

//     const productDetails = await Product.findById(productId);

//     console.log(productDetails);

//     if (!productDetails)
//       return ApiError({
//         res,
//         statusCode: 404,
//         detailMessage: "Product not found",
//       });

//     console.log("This is running");

//     const itemIndex = userDetails.cart.findIndex(
//       (item) => item.product.toString() === productId
//     );

//     if (itemIndex > -1) {
//       userDetails.cart[itemIndex].quantity += +quantity;
//     } else {
//       userDetails.cart.push({ product: productId, quantity });
//     }

//     await userDetails.save();

//     ApiResponce({
//       res,
//       statusCode: 200,
//       activityType: "Creation or Update",
//       responceData: userDetails,
//     });
//   } catch (err) {
//     ApiError({ res, statusCode: 500, detailMessage: err });
//   }
// }
