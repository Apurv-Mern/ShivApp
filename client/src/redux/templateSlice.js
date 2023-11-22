import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { eventAllDetails, updateUserFoods } from "./Api";

// ? Initial State
export const initialState = {
  selectedTemplate: null,
  tempText1: `You are invited to our wedding <br/> Groom Name <br/> weds <br/> Bride Name`,
  names: " Groom Name <br/> weds <br/> Bride Name",
  ssTempText1: ` are invited to our wedding <br/> Groom Name <br/> weds <br/> Bride Name`,
  tempText2:
    "Mr Joe Blogs & Mrs Joe Blogs <br/> awaits your gracious presence on the auspicious event <br/> of the wedding of their daughter <br/> Bride Name <br/> WEDS <br/> Groom Name <br/> Son of Mr Jane Doe & Mrs Dane Doe.",
  tempText3:
    "PRE WEDDING CEREMONY 1 <br/>DATE TIME VENUE <br/> PRE WEDDING CEREMONY 2 <br/> DATE TIME VENUE <br/> PRE WEDDING CEREMONY 3 <br/>DATE TIME VENUE <br/> PRE WEDDING CEREMONY 4 <br/> DATE TIME VENUE <br/ CIVIL CEREMONY <br/> DATE TIME VENUE <br/> WEDDING CEREMONY <br/>DATE TIME VENUE <br/>RECEPTION <br/>DATE TIME VENUE",
  footer: "NO BOXED GIFTS PLEASE",
  engagedText: `We're Engaged <br/> Groom Name <br/> weds <br/> Bride Name`,
  thankYou:
    "THANK YOU! <br/> FOR ATTENDING OUR WEDDING EVENTS AND SHARING IN OUR JOY, WE ARE SO PLEASED YOU WERE THERE WITH US!",
  dynamicCeremony: "",
  saveTheDate: `SAVE THE DATE! <br/> Enter Your Date <br/>`,
  loading: false,
  error: null,
  invitationType: "",
  setinvitationTypeStyling: "",
  sampleText: "",
};

export const getAllEventsDetails = createAsyncThunk(
  "user/eventDetails",
  async () => {
    const response = await eventAllDetails();
    return response.data;
  }
);

const templateSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    selectImage: (state, action) => {
      state.selectedTemplate = action.payload;
      localStorage.setItem("template", state.selectedTemplate);
      // console.log(state.selectedTemplate);
    },
    templateText1: (state, action) => {
      state.tempText1 = action.payload;
      // console.log(state.tempText1);
    },
    templateText2: (state, action) => {
      state.tempText2 = action.payload;
    },
    templateText3: (state, action) => {
      state.tempText3 = action.payload;
    },
    engagedAllText: (state, action) => {
      state.engagedText = action.payload;
    },
    footerText: (state, action) => {
      state.footer = action.payload;
    },
    temp3Ceremony: (state, action) => {
      // console.log("slice", action.payload);
      state.dynamicCeremony = action.payload;
    },
    setinvitationType: (state, action) => {
      state.invitationType = action.payload;
    },
    updatessTempText1: (state, action) => {
      state.ssTempText1 = action.payload;
    },
    thankYouText: (state, action) => {
      state.thankYou = action.payload;
    },
    saveTheDateText: (state, action) => {
      state.saveTheDate = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // * CEREMONY
      .addCase(getAllEventsDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEventsDetails.fulfilled, (state, action) => {
        console.log(action.payload.data.ceremony_name);
        state.ceremony_name = action.payload.data.ceremony_name;
        state.ceremony_time = action.payload.data.ceremony_time;
        state.ceremony_venue = action.payload.data.ceremony_venue;
        state.loading = false;
      })
      .addCase(getAllEventsDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message
          ? action.error.message
          : "Unable to create ceremonies ";
      });
  },
});

// Export the actions and reducer
export const {
  selectImage,
  templateText1,
  templateText2,
  updateTempText1WithInvitationType,
  templateText3,
  footerText,
  temp3Ceremony,
  engagedAllText,
  ssTempText1,
  setinvitationType,
  updatessTempText1,
  thankYouText,
  saveTheDateText,
} = templateSlice.actions;
export default templateSlice.reducer;
