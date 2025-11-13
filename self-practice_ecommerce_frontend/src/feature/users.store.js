import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  currentUser: {},
  userExist: false,
  tokenDetails: "",
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (email) => {
    console.log("user regestration start");
    const response = await axios.post("http://localhost:3000/register");

    if (!response.success) return toast.error(response.error.detailMessage);

    return response;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }) => {
    console.log("user login start");
    console.log(email);
    console.log(password);
    const response = await axios.post("http://localhost:3000/login", {
      email,
      password,
    });

    const data = response.data;

    console.log(data);

    if (!data.success) return toast.error(data.error.detailMessage);

    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {})
      .addCase(registerUser.fulfilled, (state, action) => {})
      .addCase(registerUser.rejected, (state, action) => {})

      .addCase(loginUser.pending, (state, action) => {})
      .addCase(loginUser.fulfilled, (state, action) => {
        state.tokenDetails = action.payload;
        toast.success("Login Success");
      })
      .addCase(loginUser.rejected, (state, action) => {});
  },
});

export const userReducer = userSlice.reducer;
