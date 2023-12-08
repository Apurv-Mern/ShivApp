import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getEventById, getEventByUserId, updateUserEvents } from "./Api";

// ? Initial State
export const initialState = {
  event: [],
  event_id: JSON.parse(localStorage.getItem("eventId")) || null,
  selectedEvents: [],
  eventNames: [],
  eventData: [],
  loading: false,
  error: null,
  eventState: "",
  schedularEventTime: "",
};

// Async thunk action for user login
export const addSelectedEvents = createAsyncThunk(
  "event/getUserEvent",
  async (event) => {
    try {
      const response = await updateUserEvents(event);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getUserEventById = createAsyncThunk(
  "event/getUserEventById",
  async () => {
    const response = await getEventById();
    return response.data;
  }
);
export const getEventUserById = createAsyncThunk(
  "event/getEventUserById",
  async () => {
    const response = await getEventByUserId();
    return response.data;
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEventName: (state, action) => {
      state.eventState = action.payload;
      // localStorage.setItem("eventName", JSON.stringify(action.payload));
    },
    setEventId: (state, action) => {
      state.event_id = action.payload;
      localStorage.setItem("eventId", JSON.stringify(action.payload));
    },
    setSchedularEventTime: (state, action) => {
      state.schedularEventTime = action.payload;
      localStorage.setItem("templateTime", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder

      // * POST USER EVENTS BY ID
      .addCase(addSelectedEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSelectedEvents.fulfilled, (state, action) => {
        state.event = action.payload;
        state.loading = false;
      })
      .addCase(addSelectedEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // * GET USER EVENTS BY ID
      .addCase(getUserEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserEventById.fulfilled, (state, action) => {
        state.selectedEvents = action.payload;
        state.loading = false;
      })
      .addCase(getUserEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // * GET  EVENTS USER BY ID
      .addCase(getEventUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEventUserById.fulfilled, (state, action) => {
        state.loading = true;
        state.eventData = action.payload;
        state.loading = false;
      })
      .addCase(getEventUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = "No event found";
      });
  },
});

// Export the actions and reducer
export const { setEventName, setEventId, setSchedularEventTime } =
  eventSlice.actions;
export default eventSlice.reducer;
