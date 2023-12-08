import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  UploadProfile,
  getUploadProfile,
  sendSocialLoginData,
  userLogin,
  userOtpLogin,
  userSignup,
} from "./Api";

// ? Initial State
export const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  userDetails: "",
  loading: false,
  error: null,
  otp: null,
  email: "",
  number: "",
  profile: "",
};

// Async thunk action for user login
export const loginUser = createAsyncThunk(
  "user/signin",
  async (credentials) => {
    const response = await userLogin(credentials);
    return response.data;
  }
);

export const signupUser = createAsyncThunk(
  "user/signup",
  async (credentials) => {
    const response = await userSignup(credentials);
    return response.data;
  }
);

export const otpUserLogin = createAsyncThunk(
  "user/OTP",
  async (credentials) => {
    const response = await userOtpLogin(credentials);
    return response.data;
  }
);
export const uploadProfilePicture = createAsyncThunk(
  "user/uploadProfilePicture",
  async (data) => {
    const response = await UploadProfile(data);
    return response.data;
  }
);
export const getUploadProfiles = createAsyncThunk(
  "user/getUploadProfile",
  async (data) => {
    const response = await getUploadProfile(data);
    return response.data;
  }
);
export const sendGoogleLoginData = createAsyncThunk(
  "user/sendGoogleLoginData",
  async (data) => {
    const response = await sendSocialLoginData(data);
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      // * LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload.userId));
        localStorage.setItem(
          "userName",
          JSON.stringify(action.payload.userName)
        );
        state.userDetails = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = "Invalid Credentials";
      })

      // * SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload.userId));
        localStorage.setItem(
          "userName",
          JSON.stringify(action.payload.userName)
        );
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.email = "Email Already Exists ";
        // state.number = "Phone Number Already Exists ";
        state.error = action.error.message;
      })

      // * OTP
      .addCase(otpUserLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(otpUserLogin.fulfilled, (state, action) => {
        state.otp = action.payload;
        state.loading = false;
      })
      .addCase(getUploadProfiles.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(otpUserLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
