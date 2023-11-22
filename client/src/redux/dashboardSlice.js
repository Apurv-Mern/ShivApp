import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addGroupsInACeremonies,
  getAllergies,
  getCeremony,
  getCeremonyAttendance,
  getDhotiAssistance,
  getDrinksPreference,
  getEventsAttendance,
  getFilterCeremony,
  getFilterFoodAndDrink,
  getFoodCount,
  getGuestListWithMembers,
  getMUA,
  getRsvpResponses,
  getSareeAssistance,
  getTotalPersonalAssistance,
  getTurbanAssistance,
} from "./Api";

// ? Initial State
const initialState = {
  allergies: "",
  personalAssistance: "",
  mua: "",
  dhoti: "",
  turban: "",
  saree: "",
  rspv: "",
  foodCount: [],
  ceremony: [],
  memberList: [],
  filterCeremony: [],
  drinksPrefrence: [],
  getCeremonyAttendance: [],
  getEventAttendance: [],
  filteredFoodAndDrink: [],
  ceremony_id: "",
  fdName: "",
  loading: false,
  error: null,
};

export const getUserAllergies = createAsyncThunk(
  "dashboard/getUserAllergies",
  async () => {
    try {
      const response = await getAllergies();
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getPersonalAssistance = createAsyncThunk(
  "dashboard/getTotalPersonalAssistance",
  async () => {
    try {
      const response = await getTotalPersonalAssistance();
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getTotalMua = createAsyncThunk("dashboard/getMUA", async () => {
  try {
    const response = await getMUA();
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
export const getTotalDhotiAssistance = createAsyncThunk(
  "dashboard/getTotalDhotiAssistance",
  async () => {
    try {
      const response = await getDhotiAssistance();
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getTotalTurbanAssistance = createAsyncThunk(
  "dashboard/getTotalTurbanAssistance",
  async () => {
    try {
      const response = await getTurbanAssistance();
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getTotalSareeAssistance = createAsyncThunk(
  "dashboard/getTotalSareeAssistance",
  async () => {
    try {
      const response = await getSareeAssistance();
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getTotalGuestListWithMembers = createAsyncThunk(
  "dashboard/getTotalGuestListWithMembers",
  async () => {
    try {
      const response = await getGuestListWithMembers();
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getTotalRsvpResponses = createAsyncThunk(
  "dashboard/getTotalRsvpResponses",
  async () => {
    try {
      const response = await getRsvpResponses();
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getTotalFoodCount = createAsyncThunk(
  "dashboard/getTotalFoodCount",
  async () => {
    try {
      const response = await getFoodCount();
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getTotalCeremony = createAsyncThunk(
  "dashboard/getTotalCeremony",
  async () => {
    try {
      const response = await getCeremony();
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getTotalFilterCeremony = createAsyncThunk(
  "dashboard/getFilterCeremony",
  async (ceremonyId) => {
    try {
      const response = await getFilterCeremony(ceremonyId);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getAllDrinksPrefrence = createAsyncThunk(
  "dashboard/getdrinkPrefrence",
  async () => {
    try {
      const response = await getDrinksPreference();
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getAllCeremonyAttendance = createAsyncThunk(
  "dashboard/getCeremonyAttendance",
  async (event_id) => {
    try {
      // console.log(event_id);
      const response = await getCeremonyAttendance(event_id);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getAllEventsAttendance = createAsyncThunk(
  "dashboard/getEventsAttendance",
  async (data) => {
    try {
      const response = await getEventsAttendance(data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getFilterFoodAndDrinkList = createAsyncThunk(
  "dashboard/getFilterFoodAndDrink",
  async (data) => {
    // console.log(data);
    try {
      const response = await getFilterFoodAndDrink(data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const userDashboard = createSlice({
  name: "userDashboard",
  initialState,
  reducers: {
    selectCeremonyId: (state, action) => {
      // console.log(action.payload);
      state.ceremony_id = action.payload;
      localStorage.setItem("ceremony_id", action.payload);
    },
    selectFoodAndDrinkName: (state, action) => {
      // console.log(action.payload);
      state.fdName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAllergies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAllergies.fulfilled, (state, action) => {
        state.loading = false;
        state.allergies = action.payload;
        state.error = null;
      })
      .addCase(getPersonalAssistance.fulfilled, (state, action) => {
        state.loading = false;
        state.personalAssistance = action.payload;
        state.error = null;
      })
      .addCase(getTotalMua.fulfilled, (state, action) => {
        state.loading = false;
        state.mua = action.payload;
        state.error = null;
      })
      .addCase(getTotalDhotiAssistance.fulfilled, (state, action) => {
        state.loading = false;
        state.dhoti = action.payload;
        state.error = null;
      })
      .addCase(getTotalTurbanAssistance.fulfilled, (state, action) => {
        state.loading = false;
        state.turban = action.payload;
        state.error = null;
      })
      .addCase(getTotalSareeAssistance.fulfilled, (state, action) => {
        state.loading = false;
        state.saree = action.payload;
        state.error = null;
      })
      .addCase(getTotalGuestListWithMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.memberList = action.payload;
        state.error = null;
      })
      .addCase(getTotalRsvpResponses.fulfilled, (state, action) => {
        state.loading = false;
        state.rspv = action.payload;
        state.error = null;
      })
      .addCase(getTotalFoodCount.fulfilled, (state, action) => {
        state.loading = false;
        state.foodCount = action.payload;
        state.error = null;
      })
      .addCase(getTotalCeremony.fulfilled, (state, action) => {
        state.loading = false;
        state.ceremony = action.payload;
        state.error = null;
      })
      .addCase(getTotalFilterCeremony.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload);
        state.filterCeremony = action.payload;
        state.error = null;
      })
      .addCase(getAllDrinksPrefrence.fulfilled, (state, action) => {
        state.loading = false;
        state.drinksPrefrence = action.payload;
        state.error = null;
      })
      .addCase(getAllCeremonyAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.getCeremonyAttendance = action.payload;
        state.error = null;
      })
      .addCase(getAllEventsAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.getEventAttendance = action.payload;
        state.error = null;
      })
      .addCase(getFilterFoodAndDrinkList.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredFoodAndDrink = action.payload;
        state.error = null;
      })
      .addCase(getUserAllergies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { selectCeremonyId, selectFoodAndDrinkName } =
  userDashboard.actions;
export default userDashboard.reducer;
