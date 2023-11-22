import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { contactUs, getMarriageDetails, putMarriageDetails } from "./Api";

// ? Initial State
export const initialState = {
  marriageDetails: [],
};

// Async thunk action for user login

export const updateContactDetails = createAsyncThunk(
  "contactus/updateContactDetails",
  async (data) => {
    const response = await contactUs(data);
    return response.data;
  }
);

const ContactUsSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// Export the actions and reducer
// export const { logout } = marriageSlice.actions;
export default ContactUsSlice.reducer;
