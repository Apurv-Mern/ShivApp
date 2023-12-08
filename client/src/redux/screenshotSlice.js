// src/redux/screenshotSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ThankYou,
  saveTheDateTestMail,
  sendSaveTheDate,
  sendScreenShotsWedding,
  singleTemplate,
  thankYouTestMail,
  weAreEngaged,
  weEngagedTestMail,
  weddingTestMail,
} from "./Api";

const initialState = {
  screenshotData: [],
  loading: false,
  error: null,
};

export const weddingScreenshotsToApi = createAsyncThunk(
  "screenshot/weddingScreenshotsToApi",
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
      });

      console.log("selectedCeremonies", allSelectedCeremonies);
      newSelectedGroupNames.forEach((groupName) => {
        formData.append("groupname[]", groupName);
      });

      const response = await sendScreenShotsWedding(formData);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const weAreEngagedScreenshotsToApi = createAsyncThunk(
  "singleScreenshot/weAreEngagedScreenshotsToApi",
  async ({ singleScreenshotsArray, filteredGroupNames }) => {
    try {
      const formData = new FormData();
      console.log("filteredGroupNames", filteredGroupNames);
      formData.append(`images`, singleScreenshotsArray);
      filteredGroupNames.forEach((groupName) => {
        formData.append("groupname[]", groupName);
      });

      const response = await weAreEngaged(formData);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const saveTheDateScreenshotsToApi = createAsyncThunk(
  "singleScreenshot/saveTheDateScreenshotsToApi",
  async ({ singleScreenshotsArray, filteredGroupNames }) => {
    try {
      const formData = new FormData();
      formData.append(`images`, singleScreenshotsArray);
      filteredGroupNames.forEach((groupName) => {
        formData.append("groupname[]", groupName);
      });

      const response = await sendSaveTheDate(formData);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const thankYouScreenshotsToApi = createAsyncThunk(
  "singleScreenshot/saveTheDateScreenshotsToApi",
  async ({ singleScreenshotsArray, filteredGroupNames }) => {
    try {
      const formData = new FormData();
      formData.append(`images`, singleScreenshotsArray);
      filteredGroupNames.forEach((groupName) => {
        formData.append("groupname[]", groupName);
      });

      const response = await ThankYou(formData);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const testMailForSaveTheDate = createAsyncThunk(
  "singleScreenshot/testMailForSaveTheDate",
  async ({ singleScreenshotsArray, email, bride_name, groom_name }) => {
    try {
      const formData = new FormData();
      formData.append(`images`, singleScreenshotsArray);
      formData.append("email", email);
      formData.append("bride_name", bride_name);
      formData.append("groom_name", groom_name);

      const response = await saveTheDateTestMail(formData);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const testMailForWeEngaged = createAsyncThunk(
  "singleScreenshot/testMailForWeEngaged",
  async ({ singleScreenshotsArray, email, bride_name, groom_name }) => {
    try {
      const formData = new FormData();
      formData.append(`images`, singleScreenshotsArray);
      formData.append("email", email);
      formData.append("bride_name", bride_name);
      formData.append("groom_name", groom_name);

      const response = await weEngagedTestMail(formData);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const testMailForThankYou = createAsyncThunk(
  "singleScreenshot/testMailForThankYou",
  async ({ singleScreenshotsArray, email, bride_name, groom_name }) => {
    try {
      const formData = new FormData();
      formData.append(`images`, singleScreenshotsArray);
      formData.append("email", email);
      formData.append("bride_name", bride_name);
      formData.append("groom_name", groom_name);

      const response = await thankYouTestMail(formData);
      return response.data;
    } catch (error) {
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
    bride_name,
    groom_name,
  }) => {
    try {
      const formData = new FormData();
      formData.append(`images`, screenshotsArray);
      formData.append("email", email);
      formData.append("user_id", user_id);
      formData.append("newGroupName", newGroupName);
      formData.append("event_id", event_id);
      formData.append("guest_id", guest_id);
      formData.append("bride_name", bride_name);
      formData.append("groom_name", groom_name);

      const response = await weddingTestMail(formData);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const screenshotSlice = createSlice({
  name: "screenshot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default screenshotSlice.reducer;
