import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  allProducts: [],
};

export const getAllSellerProducts = createAsyncThunk(
  "seller/getAllSellerProducts",
  async () => {
    const response = await axios.get();

    if (!response.data.success) {
      toast.error("Something went wrong");
      return [];
    }

    toast.success("Data Fetched");
    return response.data;
  }
);

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSellerProducts.pending, (state, action) => {})
      .addCase(getAllSellerProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload.data.responseData;
        console.log(state.allProducts);
      })
      .addCase(getAllSellerProducts.rejected, (state, action) => {});
  },
});

export const sellerReducer = sellerSlice.reducer;
