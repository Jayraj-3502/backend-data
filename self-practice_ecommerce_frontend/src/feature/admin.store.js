import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allUsers: [],
  allSellers: [],
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
      .addCase(getAllSellersData.rejected, (state, action) => {});
  },
});

export const adminReducer = adminSlice.reducer;
