import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { forgotPassword, resetPassword } from "./Api";

export const initialState = {
  forgotPasswordEmail: null,
  resetPassword: null,
  token: null,
  loading: null,
  error: null,
};

export const userForgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (credentials) => {
    const response = await forgotPassword(credentials);
    return response.data;
  }
);

export const userResetPassword = createAsyncThunk(
  "user/resetPassword",
  async (credentials, { getState }) => {
    try {
      const token = getState().forgotPassword.token;
      const response = await resetPassword(token, credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    setResetPasswordToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // * FORGOT PASSWORD
      .addCase(userForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userForgotPassword.fulfilled, (state, action) => {
        state.forgotPasswordEmail = action.payload;
        state.loading = false;
      })
      .addCase(userForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // * RESET PASSWORD
      .addCase(userResetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userResetPassword.fulfilled, (state, action) => {
        state.resetPassword = action.payload;
        state.loading = false;
      })
      .addCase(userResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setResetPasswordToken } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
