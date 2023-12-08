// src/redux/screenshotSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  rspvFormApi,
  rspvPostFormApi,
  rspvAdditionalGuestApi,
  getDynamicRsvpQuestions,
  postDynamicRsvpQuestions,
  getDynamicRsvpQuestions2,
  getCeremoniesForRsvp,
} from "./Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialState = {
  question_id: [],
  response: [],
  successMessage: "",
  userQuestions: [],
  selectedCeremoniesForRsvp: [],
  loading: false,
  error: null,
};

export const getUserRspvForm = createAsyncThunk(
  "rspv/getUserRspvForm",
  async () => {
    try {
      const response = await rspvFormApi();
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const postUserRspvForm = createAsyncThunk(
  "rspv/postUserRspvForm",
  async (data) => {
    try {
      const response = await rspvPostFormApi(data);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.error;
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
      throw new Error(error.response.data.message);
    }
  }
);

export const postAdditionalGuestRspvForm = createAsyncThunk(
  "rspv/postAdditionalGuestRspvForm",
  async (data) => {
    try {
      const response = await rspvAdditionalGuestApi(data);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      const errorMessage = error?.response?.data?.error;
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
      throw new Error(error.response.data.message);
    }
  }
);
export const getUserDynamicRsvpQuestions = createAsyncThunk(
  "rspv/getDynamicRsvpQuestions",
  async () => {
    try {
      const response = await getDynamicRsvpQuestions();
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getUserDynamicRsvpQuestions2 = createAsyncThunk(
  "rspv/getDynamicRsvpQuestions2",
  async (user_id) => {
    try {
      // console.log(user_id);

      const response = await getDynamicRsvpQuestions2(user_id);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const postUserDynamicRsvpQuestions = createAsyncThunk(
  "rspv/getDynamicRsvpQuestions",
  async (data) => {
    try {
      const response = await postDynamicRsvpQuestions(data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
export const getAllSelectedCeremoneisForRsvp = createAsyncThunk(
  "rspv/getAllSelectedCeremoneisForRsvp",
  async (id) => {
    try {
      const response = await getCeremoniesForRsvp(id);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const rspvSlice = createSlice({
  name: "rspv",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserRspvForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserRspvForm.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
        state.error = null;
      })
      .addCase(getUserRspvForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(postUserRspvForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postUserRspvForm.fulfilled, (state, action) => {
        const { question_id, response } = action.payload;
        state.loading = false;
        state.question_id = question_id;
        state.response = response;
        state.error = null;
        state.successMessage = "form submitted successfully";
        toast.success("THANK YOU FOR SUBMITTING YOUR RSVP FOR THE SHIV DEMO", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .addCase(postUserRspvForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("error-payload", action.payload);
      })
      .addCase(postAdditionalGuestRspvForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postAdditionalGuestRspvForm.fulfilled, (state, action) => {
        const { question_id, response } = action.meta.arg;
        // const { question_id, response } = action.payload;
        // console.log("@payload", question_id, response);
        state.loading = false;
        state.question_id = question_id;
        state.response = response;
        state.error = null;
        toast.success("Additional Guest Add successfully", {
          position: "top-right",
          autoClose: 3000,
        });
      })
      .addCase(getUserDynamicRsvpQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.userQuestions = action.payload;
        state.error = null;
      })

      .addCase(getUserDynamicRsvpQuestions2.fulfilled, (state, action) => {
        state.loading = false;
        state.userQuestions = action.payload;
        state.error = null;
      })
      .addCase(getUserDynamicRsvpQuestions2.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDynamicRsvpQuestions2.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getAllSelectedCeremoneisForRsvp.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCeremoniesForRsvp = action.payload;
        state.error = null;
      })

      .addCase(postAdditionalGuestRspvForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default rspvSlice.reducer;
