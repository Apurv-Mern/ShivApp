import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getAllDrinks,
  getAllFoods,
  selectedDrinks,
  selectedFoods,
  updateDrinks,
  updateFoods,
  updateUserFoods,
} from "./Api";

// ? Initial State
export const initialState = {
  selectedFoods: [],
  selectedDrinks: [],
  drinks: [],
  foods: [],
  loading: false,
  error: null,
};

export const getDrinks = createAsyncThunk("event/getDrinks", async () => {
  const response = await getAllDrinks();
  return response.data;
});

export const getFoods = createAsyncThunk("event/getFoods", async () => {
  const response = await getAllFoods();
  return response.data;
});

export const updateDrinkForAUser = createAsyncThunk(
  "event/updateDrinks",
  async (data) => {
    const response = await updateDrinks(data);
    return response.data;
  }
);

export const updateFoodForAUser = createAsyncThunk(
  "event/updateFoods",
  async (data) => {
    const response = await updateFoods(data);
    return response.data;
  }
);

export const selectedDrinksForAUser = createAsyncThunk(
  "event/selectedDrinks",
  async () => {
    const response = await selectedDrinks();
    return response.data;
  }
);

export const selectedFoodForAUser = createAsyncThunk(
  "event/selectedFoods",
  async () => {
    const response = await selectedFoods();
    return response.data;
  }
);

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // * GET All DRINKS
      .addCase(getDrinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDrinks.fulfilled, (state, action) => {
        state.drinks = action.payload;
        state.loading = false;
      })
      .addCase(getDrinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // * GET All FOODS
      .addCase(getFoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFoods.fulfilled, (state, action) => {
        state.foods = action.payload;
        state.loading = false;
      })
      .addCase(getFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // * Get Selected Foods
      .addCase(selectedFoodForAUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectedFoodForAUser.fulfilled, (state, action) => {
        state.selectedFoods = action.payload;
        state.loading = false;
      })
      .addCase(selectedFoodForAUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // * Get Selected Drinks
      .addCase(selectedDrinksForAUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectedDrinksForAUser.fulfilled, (state, action) => {
        state.selectedDrinks = action.payload;
        state.loading = false;
      })
      .addCase(selectedDrinksForAUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

// Export the actions and reducer
export const {} = foodSlice.actions;
export default foodSlice.reducer;
