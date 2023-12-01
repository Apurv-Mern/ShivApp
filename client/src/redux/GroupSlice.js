import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addGroup, deleteGroupByUserId, getGroupByUserId } from "./Api";

// ? Initial State
export const initialState = {
  groups: [],
  groupWithId: [],
  loading: false,
  error: null,
};

export const getGroupsByUserId = createAsyncThunk(
  "user/groupNames",
  async () => {
    const response = await getGroupByUserId();
    return response.data;
  }
);
export const addAGroups = createAsyncThunk(
  "user/addGroupNames",
  async (data) => {
    const response = await addGroup(data);
    return response.data;
  }
);
export const deleteAGroups = createAsyncThunk(
  "user/deleteAGroups",
  async (groupId) => {
    const response = await deleteGroupByUserId(groupId);
    return response.data;
  }
);

const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // * USER GROUPS WITH ID
      .addCase(getGroupsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGroupsByUserId.fulfilled, (state, action) => {
        state.groupWithId = action?.payload?.map((item) => ({
          id: item.id,
          groupname: item.groupname,
        }));

        state.loading = false;
        state.error = null;
      })
      .addCase(getGroupsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the actions and reducer
export const {} = groupSlice.actions;
export default groupSlice.reducer;
