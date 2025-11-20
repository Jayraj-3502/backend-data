import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allOrders: [],
  allCartItems: [],
};

export const getCustomerOrders = createAsyncThunk(
  "customer/getCustomerOrders",
  async (token) => {
    try {
      console.log(token);
      const response = await axios.get(
        "http://localhost:3000/order/userorders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addToCustomerCart = createAsyncThunk(
  "customer/addToCustomerCart",
  async ({ userId, productId }) => {
    try {
      console.log(userId, productId);
      const response = await axios.post("http://localhost:3000/cart/add", {
        userId,
        productId,
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getCustomerCartData = createAsyncThunk(
  "customer/getCustomerCartData",
  async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/cart/${id}`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerOrders.pending, (state, action) => {})
      .addCase(getCustomerOrders.fulfilled, (state, action) => {
        state.allOrders = action.payload?.data?.responceData;
        console.log(state.allOrders);
      })
      .addCase(getCustomerOrders.rejected, (state, action) => {})

      .addCase(getCustomerCartData.pending, (state, action) => {})
      .addCase(getCustomerCartData.fulfilled, (state, action) => {
        state.allCartItems = action.payload?.data?.responceData;
        console.log(state.allCartItems);
      })
      .addCase(getCustomerCartData.rejected, (state, action) => {});
  },
});

export const customerReducer = customerSlice.reducer;
