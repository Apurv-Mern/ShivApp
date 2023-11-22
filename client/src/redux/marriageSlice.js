import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getMarriageDetails, putMarriageDetails } from "./Api";

// ? Initial State
export const initialState = {
  marriageDetails: [],
};

// Async thunk action for user login
export const getMarriageDetailss = createAsyncThunk(
  "marriageSlice/getMarriageDetails",
  async () => {
    const response = await getMarriageDetails();
    return response.data;
  }
);
export const putMarriageDetailss = createAsyncThunk(
  "marriageSlice/putMarriageDetailss",
  async (data) => {
    const response = await putMarriageDetails(data);
    return response.data;
  }
);

const marriageSlice = createSlice({
  name: "marriage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //  ?Get Marriage Details
      .addCase(getMarriageDetailss.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMarriageDetailss.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.marriageDetails = action.payload;
      })
      .addCase(getMarriageDetailss.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

// Export the actions and reducer
// export const { logout } = marriageSlice.actions;
export default marriageSlice.reducer;
