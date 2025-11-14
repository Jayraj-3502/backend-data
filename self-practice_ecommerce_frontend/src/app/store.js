import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../feature/users.store";
import { adminReducer } from "../feature/admin.store";
import { productReducer } from "../feature/products.store";
import { sellerReducer } from "../feature/seller.store";

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    product: productReducer,
    seller: sellerReducer,
  },
});
