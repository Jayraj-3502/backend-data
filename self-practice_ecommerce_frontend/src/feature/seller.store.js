import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  allProducts: [],
  allOrders: [],
};

export const getAllSellerProducts = createAsyncThunk(
  "seller/getAllSellerProducts",
  async (sellerId) => {
    const response = await axios.post(
      "http://localhost:3000/seller-dashboard/products",
      sellerId
    );

    if (!response.data.success) {
      toast.error("Something went wrong");
      return [];
    }

    toast.success("Data Fetched");
    return response.data;
  }
);

export const addProductForSeller = createAsyncThunk(
  "seller/addProductForSeller",
  async (productData) => {
    const response = await axios.post(
      "http://localhost:3000/products",
      productData
    );
    console.log(response.data);
  }
);

export const updateProductForSeller = createAsyncThunk(
  "seller/updateProductForSeller",
  async (productData) => {
    const response = await axios.put(
      `http://localhost:3000/products/${productData._id}`,
      productData
    );
    console.log(response.data);
  }
);

export const getAllOrdersForSeller = createAsyncThunk(
  "seller/getAllOrdersForSeller",
  async ({ id }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/order/sellerorders/${id}`
      );
      console.log(response.data);
    } catch (err) {
      toast.error(err);
    }
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
        state.allProducts = action.payload?.data?.responceData;
      })
      .addCase(getAllSellerProducts.rejected, (state, action) => {})

      .addCase(addProductForSeller.pending, (state, action) => {})
      .addCase(addProductForSeller.fulfilled, (state, action) => {
        console.log("product added");
      })
      .addCase(addProductForSeller.rejected, (state, action) => {})

      .addCase(getAllOrdersForSeller.pending, (state, action) => {})
      .addCase(getAllOrdersForSeller.fulfilled, (state, action) => {
        state.allOrders = action.payload?.data?.responceData || [];
        console.log("This is done");
      })
      .addCase(getAllOrdersForSeller.rejected, (state, action) => {});
  },
});

export const sellerReducer = sellerSlice.reducer;
