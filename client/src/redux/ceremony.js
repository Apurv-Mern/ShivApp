import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  userLogin,
  userOtpLogin,
  userSignup,
  createCeremonies,
  getCeremoniesByEventIds,
  getAllCeremony,
  addSelectedCeremonies,
  updateCeremonyName,
} from "./Api";

// ? Initial State
export const initialState = {
  ceremony_name: "",
  ceremony_time: "",
  ceremony_venue: "",
  selected: false,
  createCeremonies: [],
  getCeremonies: [],
  getAllCeremonies: [],
};

// Async thunk action for user login
export const createUserCeremony = createAsyncThunk(
  "user/createCeremonies",
  async (ceremonies) => {
    const response = await addSelectedCeremonies(ceremonies);
    return response.data;
  }
);
export const getCeremoniesByEventId = createAsyncThunk(
  "user/getCeremonies",
  async () => {
    const response = await getCeremoniesByEventIds();
    return response.data;
  }
);
export const getAllCeremoniesByEventId = createAsyncThunk(
  "user/getAllCeremonies",
  async () => {
    const response = await getAllCeremony();
    return response.data;
  }
);
export const updateCeremonyNames = createAsyncThunk(
  "user/updateCeremonyName",
  async (data) => {
    const response = await updateCeremonyName(data);
    return response.data;
  }
);

const ceremonySlice = createSlice({
  name: "ceremony",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // * CEREMONY
      .addCase(createUserCeremony.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserCeremony.fulfilled, (state, action) => {
        state.createCeremonies = action.payload;
        state.loading = false;
      })
      .addCase(createUserCeremony.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
          ? action.error.message
          : "Unable to create ceremonies ";
      })

      // * GET ALL CEREMONIES BY EVENT_ID
      .addCase(getCeremoniesByEventId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCeremoniesByEventId.fulfilled, (state, action) => {
        let addSelectedCeremonyNames = [];
        const { payload } = action;
        payload.forEach((ceremony) => {
          if (ceremony.selected === true) {
            addSelectedCeremonyNames.push(ceremony);
          }
        });
        state.getCeremonies = addSelectedCeremonyNames;
        state.loading = false;
      })

      .addCase(getCeremoniesByEventId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
          ? action.error.message
          : "Unable to create ceremonies ";
      })

      .addCase(getAllCeremoniesByEventId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCeremoniesByEventId.fulfilled, (state, action) => {
        state.getAllCeremonies = action.payload;
        state.loading = false;
      })
      .addCase(getAllCeremoniesByEventId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
          ? action.error.message
          : "Unable to create ceremonies ";
      });
  },
});

// Export the actions and reducer
export const {} = ceremonySlice.actions;
export default ceremonySlice.reducer;
