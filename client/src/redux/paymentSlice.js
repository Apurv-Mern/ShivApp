// src/redux/screenshotSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  cronJob,
  getPaymentHistories,
  paymentStatus,
  stripePayment,
} from "./Api";

const initialState = {
  payment: [],
  paymentStatus: [],
  payments: [],
  loading: false,
  error: null,
};

export const stripePaymentSession = createAsyncThunk(
  "stripe/payment",
  async () => {
    try {
      const response = await stripePayment();
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getPaymentStatus = createAsyncThunk(
  "stripe/paymentStatus",
  async () => {
    try {
      const response = await paymentStatus();
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getAllPaymentHistories = createAsyncThunk(
  "stripe/paymentHistory",
  async () => {
    try {
      const response = await getPaymentHistories();
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const startCronJob = createAsyncThunk(
  "cronjob/startCronJob",
  async (data) => {
    try {
      const response = await cronJob(data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(stripePaymentSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(stripePaymentSession.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
        state.error = null;
      })
      .addCase(stripePaymentSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPaymentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = action.payload;
        state.error = null;
      })
      .addCase(getAllPaymentHistories.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
        state.error = null;
      })
      .addCase(getPaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
