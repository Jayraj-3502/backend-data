import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../feature/users.store";
import { adminReducer } from "../feature/admin.store";

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
  },
});
