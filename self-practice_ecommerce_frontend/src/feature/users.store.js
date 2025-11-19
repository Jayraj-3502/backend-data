import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { set } from "mongoose";
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
    const response = await axios.post("http://localhost:3000/register", {
      email,
    });
    if (!response.success) return toast.error(response.error.detailMessage);
    return response;
  }
);

export const getOtpVerification = createAsyncThunk(
  "user/getOtpVerification",
  async (data) => {
    console.log("This is running");
    console.log(data);
    const response = await axios.post("http://localhost:3000/otp", data);
    console.log(response.data);
    return response.data;
  }
);

export const loginUser = createAsyncThunk("user/loginUser", async (details) => {
  console.log("user login start");
  const response = await axios.post("http://localhost:3000/login", details);
  const data = response.data;
  console.log(data);
  if (!data.success) return toast.error(data.error.detailMessage);
  return data;
});

export const updateSellerProfileDetails = createAsyncThunk(
  "user/updateSellerProfileDetails",
  async ({ id, fullname, phone }) => {
    console.log(id, fullname, phone);
    const response = await axios.put(`http://localhost:3000/user/${id}`, {
      fullname,
      phone,
    });

    if (!response.data.success) {
      toast.error("Something went wrong");
      return [];
    }

    toast.success("Update Successfull");
    return response.data;
  }
);

export const tokenVerfication = createAsyncThunk(
  "user/tokenVerfication",
  async () => {
    const token = getFromLocalStorage();
    console.log(token);
    if (!token) return null;
    try {
      const response = await axios.post(
        "http://localhost:3000/tokenverification",
        { token: token }
      );
      console.log(response.data);
      return { token, data: response?.data };
    } catch (err) {
      toast.error("Something Went Wrong Please Login Again");
      return "";
    }
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
    getToken: (state, action) => {
      const token = getFromLocalStorage();
      state.tokenDetails = token;
      state.userExist = true;
    },

    logoutUser: (state, action) => {
      setToLocalStorage("");
      state.currentUser = {};
      state.userExist = false;
      state.tokenDetails = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {})
      .addCase(registerUser.fulfilled, (state, action) => {})
      .addCase(registerUser.rejected, (state, action) => {})

      .addCase(loginUser.pending, (state, action) => {})
      .addCase(loginUser.fulfilled, (state, action) => {
        state.tokenDetails = action?.payload?.data?.responceData?.token;
        state.currentUser = action?.payload?.data?.responceData?.userDetails;
        state.userExist = true;
        console.log(action?.payload?.data?.responceData?.token);
        setToLocalStorage(action?.payload?.data?.responceData?.token);
        toast.success("Login Success");
      })
      .addCase(loginUser.rejected, (state, action) => {})

      .addCase(getOtpVerification.pending, (state, action) => {})
      .addCase(getOtpVerification.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getOtpVerification.rejected, (state, action) => {})

      .addCase(tokenVerfication.pending, (state, action) => {})
      .addCase(tokenVerfication.fulfilled, (state, action) => {
        state.tokenDetails = action.payload?.token || "";
        state.userExist = true;
        state.currentUser = action.payload?.data?.data?.responceData || {};
      })
      .addCase(tokenVerfication.rejected, (state, action) => {
        console.log(action.payload);
      })

      .addCase(updateSellerProfileDetails.pending, (state, action) => {})
      .addCase(updateSellerProfileDetails.fulfilled, (state, action) => {})
      .addCase(updateSellerProfileDetails.rejected, (state, action) => {});
  },
});

export const userReducer = userSlice.reducer;
export const { getToken, logoutUser } = userSlice.actions;
