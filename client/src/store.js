import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/authSlice";
import eventSlice from "./redux/eventSlice";
import foodSlice from "./redux/foodSlice";
import templateSlice from "./redux/templateSlice";
import forgotPasswordSlice from "./redux/forgotPassword";
import ceremony from "./redux/ceremony";
import GroupSlice from "./redux/GroupSlice";
import guestSlice from "./redux/guestSlice";
import screenshotSlice from "./redux/screenshotSlice";
import InvitationSlice from "./redux/InvitationSlice";
import rspvSlice from "./redux/rspvSlice";
import templateCreationSlice from "./redux/templateCreationSlice";
import GroupsInACeremoniesSlice from "./redux/GroupsInACeremoniesSlice";
import dashboardSlice from "./redux/dashboardSlice";
import paymentSlice from "./redux/paymentSlice";
import reportSlice from "./redux/reportSlice";
import adminSlice from "./redux/adminSlice";
import marriageSlice from "./redux/marriageSlice";
import ContactUsSlice from "./redux/ContactUsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    event: eventSlice,
    food: foodSlice,
    image: templateSlice,
    forgotPassword: forgotPasswordSlice,
    ceremony: ceremony,
    groups: GroupSlice,
    guest: guestSlice,
    screenShot: screenshotSlice,
    invitation: InvitationSlice,
    rspv: rspvSlice,
    template: templateCreationSlice,
    groupsInCeremony: GroupsInACeremoniesSlice,
    userDashboard: dashboardSlice,
    payment: paymentSlice,
    reports: reportSlice,
    admin: adminSlice,
    marriage: marriageSlice,
    contact: ContactUsSlice,
  },
});
