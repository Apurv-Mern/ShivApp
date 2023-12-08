// src/redux/screenshotSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserGroupsFromUserId } from "./Api";

const initialState = {
  groupCeremonyResponse: [],
  groupedData: {},
  selectedGroupNames: [],
  newSelectedGroupNames: [],
  loading: false,
  error: null,
};

export const getUserGroupsByUserId = createAsyncThunk(
  "template/getUserGroupsFromUserId",
  async () => {
    try {
      const response = await getUserGroupsFromUserId();
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const templateCreationSlice = createSlice({
  name: "templateCreationSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserGroupsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserGroupsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.groupCeremonyResponse = action.payload;
        state.error = null;

        const { payload } = action;
        const { Ceremonies } = payload;
        let selectedGroupNames = [];
        // let newSelectedGroupNames = [];
        let groupedData = {};

        Ceremonies.forEach((ceremony) => {
          ceremony.groups.forEach((group) => {
            const {
              ceremony_name,
              ceremony_id,
              ceremony_time,
              ceremony_venue,
            } = ceremony;
            // const { groupname, selected, } = group;
            const { groupname, selected, invitation_type } = group;
            // Check if the group is selected (selected === true)
            if (selected) {
              selectedGroupNames.push(groupname);

              // Initialize groupedData for this group if it doesn't exist
              if (!groupedData[groupname]) {
                groupedData[groupname] = [];
              }

              // Push the ceremony name and ID into the corresponding group
              groupedData[groupname].push({
                ceremony_id,
                ceremony_name,
                ceremony_time,
                ceremony_venue,
                invitation_type,
              });
            }
          });
        });

        // Update the state with the processed data
        state.selectedGroupNames = selectedGroupNames;
        state.newSelectedGroupNames = Array.from(new Set(selectedGroupNames));
        state.groupedData = groupedData;
      })
      .addCase(getUserGroupsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default templateCreationSlice.reducer;
