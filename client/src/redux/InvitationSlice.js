import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addGroup, getGroups } from "./Api";

// ? Initial State
export const initialState = {
  invitationType: "",
  selectedInvitationType: {},
  loading: false,
  error: null,
};

const invitationSlice = createSlice({
  name: "invitation",
  initialState,
  reducers: {
    selectInvitation: (state, action) => {
      state.invitationType = action.payload;
      console.log("heloo wordl", state.invitationType);
    },
    selectedInvitationTypeForGroup: (state, action) => {
      state.selectedInvitationType = action.payload;
      console.log("invitation", action.payload);
    },
  },
});

// Export the actions and reducer
export const { selectInvitation, selectedInvitationTypeForGroup } =
  invitationSlice.actions;
export default invitationSlice.reducer;
