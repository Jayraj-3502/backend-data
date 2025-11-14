import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allUsers: [],
  allSellers: [],
  allProducts: [],
  allOrders: [],
  allFilterData: {},
};

export const getAllUsersData = createAsyncThunk(
  "admin/getAllUsersData",
  async () => {
    console.log("this");
    const responce = await axios.get(
      "http://localhost:3000/admin-dashboard/users"
    );

    console.log(responce.data);
    return responce.data;
  }
);

export const getAllSellersData = createAsyncThunk(
  "admin/getAllSellersData",
  async () => {
    console.log("This");
    const responce = await axios.get(
      "http://localhost:3000/admin-dashboard/seller"
    );

    console.log(responce.data);
    return responce.data;
  }
);

export const getAllProductsDetails = createAsyncThunk(
  "admin/getAllProductsDetails",
  async () => {
    console.log("This");
    const response = await axios.get(
      "http://localhost:3000/admin-dashboard/allproducts"
    );
    console.log(response.data);
    return response.data;
  }
);

export const getAllOrdersDetails = createAsyncThunk(
  "admin/getAllOrdersDetails",
  async () => {
    console.log("This");
    const response = await axios.get(
      "http://localhost:3000/admin-dashboard/allorders"
    );
    console.log(response.data);
    return response.data;
  }
);

export const getFilterDetails = createAsyncThunk(
  "admin/getFilterDetails",
  async () => {
    console.log("This filter");
    const response = await axios.get(
      "http://localhost:3000/admin-dashboard/allfilter"
    );

    console.log(response.data);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id) => {
    console.log(id);
    const response = await axios.delete(`http://localhost:3000/products/${id}`);
    console.log(response.data);
    return response.data;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersData.pending, (state, action) => {})
      .addCase(getAllUsersData.fulfilled, (state, action) => {
        state.allUsers = action.payload?.data?.responceData;
        console.log(state.allUsers);
      })
      .addCase(getAllUsersData.rejected, (state, action) => {})

      .addCase(getAllSellersData.pending, (state, action) => {})
      .addCase(getAllSellersData.fulfilled, (state, action) => {
        state.allSellers = action.payload?.data?.responceData;
        console.log(state.allSellers);
      })
      .addCase(getAllSellersData.rejected, (state, action) => {})

      .addCase(getAllProductsDetails.pending, (state, action) => {})
      .addCase(getAllProductsDetails.fulfilled, (state, action) => {
        state.allProducts = action.payload?.data?.responceData;
        console.log(state.allProducts);
      })
      .addCase(getAllProductsDetails.rejected, (state, action) => {})

      .addCase(getAllOrdersDetails.pending, (state, action) => {})
      .addCase(getAllOrdersDetails.fulfilled, (state, action) => {
        state.allOrders = action.payload?.data?.responceData;
        console.log(state.allOrders);
      })
      .addCase(getAllOrdersDetails.rejected, (state, action) => {})

      .addCase(getFilterDetails.pending, (state, action) => {})
      .addCase(getFilterDetails.fulfilled, (state, action) => {
        state.allFilterData = action.payload?.data?.responceData;
        console.log(state.allFilterData);
      })
      .addCase(getFilterDetails.rejected, (state, action) => {})

      .addCase(deleteProduct.pending, (state, action) => {})
      .addCase(deleteProduct.fulfilled, (state, action) => {})
      .addCase(deleteProduct.rejected, (state, action) => {});
  },
});

export const adminReducer = adminSlice.reducer;
