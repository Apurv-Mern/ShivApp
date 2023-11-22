import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFlightListReport,
  getFoodListReport,
  getMehndiList,
  getTotalEthinicWearlist,
  getTotalMUAList,
  getTotalPersonalAssistanceCombined,
} from "./Api";

// ? Initial State
export const initialState = {
  TotalEthinicWearlist: [],
  getFlightListReport: [],
  getFoodListReport: [],
  getMehndiList: [],
  getTotalPersonalAssistanceCombined: [],
  getTotalMUAList: [],
  loading: false,
  error: null,
};

export const getPersonalAssistanceCombined = createAsyncThunk(
  "reports/personalAssistance",
  async () => {
    try {
      const response = await getTotalPersonalAssistanceCombined();
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getTotalMUALists = createAsyncThunk(
  "reports/getTotalMUALists",
  async () => {
    try {
      const response = await getTotalMUAList();
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getTotalEthinicWearlists = createAsyncThunk(
  "reports/EthinicWear",
  async () => {
    try {
      const response = await getTotalEthinicWearlist();
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getFlightListReports = createAsyncThunk(
  "reports/flightReport",
  async () => {
    try {
      const response = await getFlightListReport();
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getFoodListReports = createAsyncThunk(
  "reports/foodList",
  async () => {
    try {
      const response = await getFoodListReport();
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getMehndiLists = createAsyncThunk(
  "reports/mehndiList",
  async () => {
    try {
      const response = await getMehndiList();
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTotalEthinicWearlists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTotalEthinicWearlists.fulfilled, (state, action) => {
        state.loading = false;
        state.TotalEthinicWearlist = action.payload;
        state.error = null;
      })
      .addCase(getFlightListReports.fulfilled, (state, action) => {
        state.loading = false;
        state.getFlightListReport = action.payload;
        state.error = null;
      })
      .addCase(getFoodListReports.fulfilled, (state, action) => {
        state.loading = false;
        state.getFoodListReport = action.payload;
        state.error = null;
      })
      .addCase(getMehndiLists.fulfilled, (state, action) => {
        state.loading = false;
        state.getMehndiList = action.payload;
        state.error = null;
      })
      .addCase(getPersonalAssistanceCombined.fulfilled, (state, action) => {
        state.loading = false;
        state.getTotalPersonalAssistanceCombined = action.payload;
        state.error = null;
      })
      .addCase(getTotalMUALists.fulfilled, (state, action) => {
        state.loading = false;
        state.getTotalMUAList = action.payload;
        state.error = null;
      })
      .addCase(getTotalEthinicWearlists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reportSlice.reducer;
