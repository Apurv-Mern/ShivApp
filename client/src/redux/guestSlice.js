import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addGuestInAGroup,
  getAdditionalGuestInfo,
  getAllGuestForUser,
  getAllGuestInAGroup,
  getGuestForGifts,
  getGuestForGroup,
  getGuestInAGroup,
  getWeddingList,
  postGiftData,
  updateGuest,
  uploadExcel,
} from "./Api";

// ? Initial State
export const initialState = {
  guest: [],
  allGuest: [],
  guestInAGroup: [],
  guestId: "",
  groupname: "",
  excel: "",
  giftGuest: [],
  additionalGuest: [],
  weddingLists: [],
  loading: false,
  error: null,
};
export const getGuestForAGroup = createAsyncThunk(
  "user/getGuestForAGroup",
  async (data) => {
    const response = await getGuestForGroup(data);
    return response.data;
  }
);
export const addGuest = createAsyncThunk(
  "user/addGuestInAGroup",
  async (data) => {
    const response = await addGuestInAGroup(data);
    return response.data;
  }
);
export const getAllGuestForAUser = createAsyncThunk(
  "user/getAllGuestForAUser",
  async () => {
    const response = await getAllGuestForUser();
    return response.data;
  }
);

export const updateGuestDetailsByGuestId = createAsyncThunk(
  "user/updateAllGuestForAUser",
  async (data) => {
    const response = await updateGuest(data);
    return response.data;
  }
);
export const uploadGuestDetails = createAsyncThunk(
  "user/uploadExcel",
  async (data) => {
    // console.log("dtaaa", data);
    const response = await uploadExcel(data);
    return response.data;
  }
);
export const getGuestForGiftsReceived = createAsyncThunk(
  "user/getGuestForGiftsReceived",
  async (ceremony_id) => {
    // console.log("dtaaa", data);
    const response = await getGuestForGifts(ceremony_id);
    return response.data;
  }
);
export const postGiftsDataa = createAsyncThunk(
  "user/postGiftsData",
  async (data) => {
    // console.log("dtaaa", data);
    const response = await postGiftData(data);
    return response.data;
  }
);
export const getAdditionalGuest = createAsyncThunk(
  "user/getAdditionalGuest",
  async () => {
    const response = await getAdditionalGuestInfo();
    return response.data;
  }
);
export const weddingList = createAsyncThunk("user/weddingList", async () => {
  const response = await getWeddingList();
  return response.data;
});

const guestSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    setGuestId: (state, action) => {
      state.guestId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // * Add Guest In A Group
      .addCase(addGuest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addGuest.fulfilled, (state, action) => {
        state.allGuest = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addGuest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // * Get All Guest For A User
      .addCase(getAllGuestForAUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllGuestForAUser.fulfilled, (state, action) => {
        state.guest = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllGuestForAUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getGuestForAGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGuestForAGroup.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.groupname = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getGuestForAGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateGuestDetailsByGuestId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGuestDetailsByGuestId.fulfilled, (state, action) => {
        console.log(action.payload);
        state.guest = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAdditionalGuest.fulfilled, (state, action) => {
        state.additionalGuest = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getGuestForGiftsReceived.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.giftGuest = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(weddingList.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.weddingLists = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateGuestDetailsByGuestId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the actions and reducer
export const { setGuestId } = guestSlice.actions;
export default guestSlice.reducer;
