import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteUserDetailsAdmin, getAdminUserDetails } from "./Api";

// ? Initial State
export const initialState = {
  userDetails: [],
  email: "",
  number: "",
  error: "",
  loading: "",
};

// Async thunk action for user login
export const getAdminUsersDetails = createAsyncThunk(
  "admin/userDetails",
  async (credentials) => {
    const response = await getAdminUserDetails(credentials);
    return response.data;
  }
);
export const adminDeleteUser = createAsyncThunk(
  "admin/userDetails",
  async (id) => {
    const response = await deleteUserDetailsAdmin(id);
    return response.data;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      // * ADMIN USER DETAILS
      .addCase(getAdminUsersDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminUsersDetails.fulfilled, (state, action) => {
        state.error = null;
        state.userDetails = action.payload;
        state.loading = false;
      })
      .addCase(getAdminUsersDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = "Invalid Credentials";
      });
  },
});

// Export the actions and reducer
export const { logout } = adminSlice.actions;
export default adminSlice.reducer;
