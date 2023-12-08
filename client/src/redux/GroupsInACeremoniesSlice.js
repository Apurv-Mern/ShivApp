import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addGroupsInACeremonies } from "./Api";

// ? Initial State
const initialState = {
  ceremonies: [],
  loading: false,
  error: null,
};

export const addGroupsInACeremony = createAsyncThunk(
  "ceremonyGroup/getUserGroupsByUserId",
  async (data) => {
    try {
      const response = await addGroupsInACeremonies(data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const GroupsInACeremoniesSlice = createSlice({
  name: "GroupsInACeremoniesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addGroupsInACeremony.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addGroupsInACeremony.fulfilled, (state, action) => {
        state.loading = false;
        state.ceremonies = action.payload.ceremonies;
        state.error = null;
      })
      .addCase(addGroupsInACeremony.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default GroupsInACeremoniesSlice.reducer;
