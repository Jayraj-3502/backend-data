import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  allProducts: [],
  currentProductDetails: {},
};

export const getAllProductsData = createAsyncThunk(
  "product/getAllProductsData",
  async () => {
    const response = await axios.get("http://localhost:3000/products");

    if (!response.data.success) {
      toast.error("Data not fetched!");
      return;
    }

    console.log(response.data);
    return response.data;
  }
);

export const getCurrentProductDetails = createAsyncThunk(
  "product/getCurrentProductDetails",
  async (id) => {
    const response = await axios.get(`http://localhost:3000/products/${id}`);

    if (!response.data.success) {
      toast.error("Data not fetched!");
      return;
    }

    console.log(response.data);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsData.pending, (state, action) => {})
      .addCase(getAllProductsData.fulfilled, (state, action) => {
        state.allProducts = action.payload.data.responceData;
        console.log(state.allProducts);
      })
      .addCase(getAllProductsData.rejected, (state, action) => {})

      .addCase(getCurrentProductDetails.pending, (state, action) => {})
      .addCase(getCurrentProductDetails.fulfilled, (state, action) => {
        state.currentProductDetails = action.payload.data.responceData;
        console.log(state.currentProductDetails);
      })
      .addCase(getCurrentProductDetails.rejected, (state, action) => {});
  },
});

export const productReducer = productSlice.reducer;
