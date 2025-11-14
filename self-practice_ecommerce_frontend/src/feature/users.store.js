import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  currentUser: {},
  userExist: false,
  tokenDetails: "",
  otp: "",
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

export const getOtpDetails = createAsyncThunk(
  "user/getOtpDetails",
  async (data) => {
    const response = await axios.post("http://localhost:3000/otp", { data });
    console.log(response.data);
    return response.data;
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

function setToLocalStorage(token) {
  const storedToken = localStorage.setItem("token", token);
  console.log(storedToken);
}

function getFromLocalStorage() {
  const storedToken = localStorage.getItem("token");
  console.log(storedToken);
  return storedToken;
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      setToLocalStorage(action.payload);
    },
    getToken: (state, action) => {
      const token = getFromLocalStorage(action.payload);
      state.tokenDetails = token;
    },
  },
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
      .addCase(loginUser.rejected, (state, action) => {})

      .addCase(getOtpDetails.pending, (state, action) => {})
      .addCase(getOtpDetails.fulfilled, (state, action) => {
        state.otp = action.payload;
        console.log(state.otp);
        toast.success("Login Success");
      })
      .addCase(getOtpDetails.rejected, (state, action) => {});
  },
});

export const userReducer = userSlice.reducer;
