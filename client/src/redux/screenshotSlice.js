// src/redux/screenshotSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  saveTheDateTestMail,
  sendSaveTheDate,
  sendScreenShots,
  singleTemplate,
  weEngagedTestMail,
  weddingTestMail,
} from "./Api";

const initialState = {
  screenshotData: [],
  loading: false,
  error: null,
};

export const sendScreenshotsToApi = createAsyncThunk(
  "screenshot/sendToApi",
  async ({
    screenshotsArray,
    newSelectedGroupNames,
    allSelectedCeremonies,
  }) => {
    try {
      const formData = new FormData();
      formData.append(`images`, screenshotsArray);
      allSelectedCeremonies.forEach((ceremonies) => {
        formData.append("ceremony_invited_for[]", ceremonies.name);
        // console.log(ceremonies);
      });

      console.log("selectedCeremonies", allSelectedCeremonies);
      newSelectedGroupNames.forEach((groupName) => {
        formData.append("groupname[]", groupName);
      });

      // console.log("screen shot slice", screenshotsArray[0].length);

      const response = await sendScreenShots(formData);
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log({ error });
      return error.message;
    }
  }
);
export const sendSingleScreenshotsToApi = createAsyncThunk(
  "singleScreenshot/sendToApi",
  async ({ singleScreenshotsArray, filteredGroupNames }) => {
    try {
      const formData = new FormData();
      formData.append(`images`, singleScreenshotsArray);
      // console.log(filteredGroupNames);
      filteredGroupNames.forEach((groupName) => {
        formData.append("groupname[]", groupName);
      });

      const response = await singleTemplate(formData);
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log({ error });
      return error.message;
    }
  }
);
export const sendSaveTheDateScreenshot = createAsyncThunk(
  "singleScreenshot/sendToApi",
  async ({ singleScreenshotsArray, filteredGroupNames }) => {
    try {
      const formData = new FormData();
      formData.append(`images`, singleScreenshotsArray);
      filteredGroupNames.forEach((groupName) => {
        formData.append("groupname[]", groupName);
      });

      const response = await sendSaveTheDate(formData);
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log({ error });
      return error.message;
    }
  }
);
export const testMailForSaveTheDate = createAsyncThunk(
  "singleScreenshot/testMailForSaveTheDate",
  async ({ singleScreenshotsArray, email }) => {
    try {
      const formData = new FormData();
      formData.append(`images`, singleScreenshotsArray);
      formData.append("email", email);

      const response = await saveTheDateTestMail(formData);
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log({ error });
      return error.message;
    }
  }
);
export const testMailForWeEngaged = createAsyncThunk(
  "singleScreenshot/testMailForWeEngaged",
  async ({ singleScreenshotsArray, email }) => {
    try {
      const formData = new FormData();
      formData.append(`images`, singleScreenshotsArray);
      formData.append("email", email);

      const response = await weEngagedTestMail(formData);
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log({ error });
      return error.message;
    }
  }
);
export const testMailForWedding = createAsyncThunk(
  "singleScreenshot/testMailForWedding",
  async ({
    screenshotsArray,
    email,
    user_id,
    newGroupName,
    event_id,
    guest_id,
  }) => {
    try {
      const formData = new FormData();
      formData.append(`images`, screenshotsArray);
      formData.append("email", email);
      formData.append("user_id", user_id);
      formData.append("newGroupName", newGroupName);
      formData.append("event_id", event_id);
      formData.append("guest_id", guest_id);

      const response = await weddingTestMail(formData);
      // console.log(response);
      return response.data;
    } catch (error) {
      // console.log({ error });
      return error.message;
    }
  }
);

const screenshotSlice = createSlice({
  name: "screenshot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendScreenshotsToApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendScreenshotsToApi.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendScreenshotsToApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default screenshotSlice.reducer;
