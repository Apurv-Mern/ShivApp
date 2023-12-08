import axios from "axios";

const serverURl = "https://shivappdev.24livehost.com:3004/api";
// const serverURl = "http://localhost:3001";

// const userId = JSON.parse(localStorage.getItem("user"));
const eventid = JSON.parse(localStorage.getItem("eventId"));

// ? AUTHENTICATION
export const userLogin = (credentials) => {
  return axios.post(`${serverURl}/user/signin`, credentials);
};

export const userSignup = (credentials) => {
  return axios.post(`${serverURl}/user/signup`, credentials);
};
export const rspvPostFormApi = (data) => {
  return axios.post(`${serverURl}/rsvp/responses`, data);
};

export const rspvAdditionalGuestApi = (data) => {
  return axios.post(`${serverURl}/rsvp/additionalguest`, data);
};
export const forgotPassword = (credentials) => {
  return axios.post(`${serverURl}/user/forgotPassword`, credentials);
};
export const resetPassword = (token, credentials) => {
  return axios.put(`${serverURl}/user/resetPassword/${token}`, credentials);
};
export const userOtpLogin = (credentials) => {
  return axios.post(`${serverURl}/user/otpsignin`, credentials);
};

// ? EVENT
export const getEventById = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/userevents/${id}`);
};

// * This api handle both post and put.
export const updateUserEvents = (event) => {
  return axios.put(`${serverURl}/userevents`, event);
};

export const eventAllDetails = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.post(`${serverURl}/userevents/${id}`);
};

export const createCeremonies = (ceremony) => {
  return axios.post(`${serverURl}/ceremony`, ceremony);
};

export const getCeremoniesByEventIds = () => {
  const event_id = JSON.parse(localStorage.getItem("eventId"));
  return axios.get(`${serverURl}/ceremony/${event_id}`);
};

export const getEventByUserId = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/events/${id}`);
};

// ? FOOD
// * This api handle both post and put.
export const updateUserFoods = (food) => {
  return axios.put(`${serverURl}/userfoods`, food);
};

// * GROUPS
// ? GET GROUP BY USERID
export const getGroupByUserId = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/groups/${id}`);
};
export const deleteGroupByUserId = (groupId) => {
  return axios.delete(`${serverURl}/groups/${groupId}`);
};

export const addGroup = (data) => {
  return axios.post(`${serverURl}/groups`, data);
};

// ? ADD GUEST IN A GROUP
export const getGuestForGroup = (groupName) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/guest/users/${id}/group/${groupName}`);
};
export const getAllGuestForUser = (data) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/guest/getallguest/${id}`, data);
};
export const addGuestInAGroup = (data) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.post(`${serverURl}/guest/${id}`, data);
};
export const deleteGuestInAGroup = (guestId) => {
  return axios.delete(`${serverURl}/guest/${guestId}`);
};

// * UPDATE GUEST
export const updateGuest = (data) => {
  return axios.put(`${serverURl}/guest/${data.guestId}`, data.mappedData);
};

// ? SCREENSHOT UPLOAD
export const sendScreenShotsWedding = (images) => {
  const id = JSON.parse(localStorage.getItem("user"));
  const eventId = JSON.parse(localStorage.getItem("eventId"));

  return axios.post(
    `${serverURl}/pdf/WeddingTestMail/users/${id}/event/${eventId}`,
    images,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const weAreEngaged = (images) => {
  const id = JSON.parse(localStorage.getItem("user"));
  const eventId = JSON.parse(localStorage.getItem("eventId"));

  return axios.post(
    `${serverURl}/pdf/WeAreEngaged/users/${id}/event/${eventId}`,
    images,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
export const ThankYou = (images) => {
  const id = JSON.parse(localStorage.getItem("user"));
  const eventId = JSON.parse(localStorage.getItem("eventId"));

  return axios.post(
    `${serverURl}/pdf/thankyou/users/${id}/event/${eventId}`,
    images,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
// '/savethedate/users/:user_id/',
export const sendSaveTheDate = (images) => {
  const id = JSON.parse(localStorage.getItem("user"));
  const eventId = JSON.parse(localStorage.getItem("eventId"));

  return axios.post(
    `${serverURl}/pdf/savethedate/users/${id}/event/${eventId}`,
    images,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const weddingTestMail = (images) => {
  return axios.post(`${serverURl}/pdf/WeddingTestMail`, images, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const weEngagedTestMail = (images) => {
  return axios.post(`${serverURl}/pdf/WeAreEngagedTestMail`, images, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const saveTheDateTestMail = (images) => {
  return axios.post(`${serverURl}/pdf/saveTheDateTestMail`, images, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const thankYouTestMail = (images) => {
  return axios.post(`${serverURl}/pdf/thankyouTestMail`, images, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ? REVP FORM
export const rspvFormApi = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/rsvp/responses/${id}`);
};

// ? Get Groups in the ceremonies
// https://shivappdev.24livehost.com:3004/ceremony/groups

export const getGroupsInceremony = (data) => {
  return axios.post(`${serverURl}/ceremony/groups`, data);
};

// ? GET ALL CEREMONIES
export const getAllCeremony = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/ceremony/user/${id}`);
};

export const addSelectedCeremonies = (data) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.put(`${serverURl}/ceremony/user/${id}`, data);
};

// ? GET ALL DRINKS

export const getAllDrinks = () => {
  return axios.get(`${serverURl}/drinks`);
};

export const getAllFoods = () => {
  return axios.get(`${serverURl}/foods`);
};

// GET USER GROUPS BY USERID

export const getUserGroupsFromUserId = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/ceremony/usergroup/${id}`);
};

// ADD GROUPS IN THE CEREMONIES

export const addGroupsInACeremonies = (data) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.post(`${serverURl}/ceremony/groups/${id}`, data);
};

// ? DASHBOARD
// * ALLEGIES
export const getAllergies = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/dashboard/getAllergies/${id}`);
};

// *getTotalPersonalAssistance
export const getTotalPersonalAssistance = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/dashboard/getTotalPersonalAssistance/${id}`);
};

// */dashboard/getTotalMUA/118
export const getMUA = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/dashboard/getTotalMUA/${id}`);
};

// *getTotalDhotiAssistance
export const getDhotiAssistance = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/dashboard/getTotalDhotiAssistance/${id}`);
};

export const getTurbanAssistance = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/dashboard/getTotalTurbanAssistance/${id}`);
};

export const getSareeAssistance = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/dashboard/getTotalSareeAssistance/${id}`);
};

export const getGuestListWithMembers = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/dashboard/getGuestListWithMembers/${id}`);
};

export const getRsvpResponses = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/dashboard/getTotalRsvpResponses/${id}`);
};
export const getFoodCount = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(
    `${serverURl}/dashboard/getFoodCountWithTextResponse/user/${id}`
  );
};
export const getCeremony = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/dashboard/getTotalCeremonyByText/user/${id}`);
};

export const getFilterCeremony = (ceremony_id) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(
    `${serverURl}/dashboard/getGuestListByCeremony/user/${id}/ceremony/${ceremony_id}`
  );
};

export const getDrinksPreference = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/dashboard/getDrinkPreference/${id}`);
};

// ? Stripe Paymemt
// https://shivappdev.24livehost.com:3004/payment/getAllPaymentHistories

export const getPaymentHistories = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/payment/getAllPaymentHistories`);
};
export const stripePayment = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/stripe/createpaymentlink/4`);
};

// ? Payment Status
// https://shivappdev.24livehost.com:3004/payment/getPaymentStatus/user/141
export const paymentStatus = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/payment/getPaymentStatus/user/${id}`);
};

// ? Update Ceremony Name
export const updateCeremonyName = (data) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.put(`${serverURl}/ceremony/user/${id}/event/${data.event_id}`, {
    ceremonies: data.ceremonies,
  });
};

// ? Add Drink
export const updateDrinks = (data) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.post(`${serverURl}/drinks/user/${id}`, data);
};

// ? Add Foods
export const updateFoods = (data) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.post(`${serverURl}/foods/user/${id}`, data);
};

// ? Get Selected Foods
export const selectedFoods = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/foods/user/${id}`);
};

// ? Get Selected Drinks
export const selectedDrinks = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/drinks/user/${id}`);
};

// https://shivappdev.24livehost.com:3004/dashboard/getCeremonyAttendance/user/141/69
export const getCeremonyAttendance = (event_id) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(
    `${serverURl}/dashboard/getCeremonyAttendance/user/${id}/${event_id}`
  );
};

export const getEventsAttendance = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/dashboard/getTotalRsvpResponses/users/${id}`);
};

// ? Excel upload
// {{url}}/guest/import/151
export const uploadExcel = (data) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.post(`${serverURl}/guest/import/${id}`, data);
};

// get('/reports/getTotalEthinicWearlist/:user_id',
export const getTotalEthinicWearlist = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(
    `${serverURl}/dashboard/reports/getTotalEthinicWearlist/${id}`
  );
};

// get("/reports/getFlightListReport/:user_id
export const getFlightListReport = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/dashboard/reports/getFlightListReport/${id}`);
};

// get("/reports/getFoodListReport/:user_id"
export const getFoodListReport = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/dashboard/reports/getFoodListReport/${id}`);
};

// get("/reports/getMehndiList/:user_id
export const getMehndiList = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/dashboard/reports/getMehndiList/${id}`);
};
export const getTotalPersonalAssistanceCombined = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(
    `${serverURl}/dashboard/reports/getTotalPersonalAssistanceCombined/${id}`
  );
};
export const getTotalMUAList = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/dashboard/reports/getTotalMUAList/${id}`);
};

// https://shivappdev.24livehost.com:3004/dashboard/reports/getResponseData/161/Prosecco
export const getFilterFoodAndDrink = (name) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(
    `${serverURl}/dashboard/reports/getResponseData/${id}/${name}`
  );
};

// ? ADMIN
// https://shivappdev.24livehost.com:3004/admin/user_details

export const getAdminUserDetails = () => {
  return axios.get(`${serverURl}/admin/user_details`);
};

// ?RSVP dynamic question

export const postDynamicRsvpQuestions = (data) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.put(`${serverURl}/user/updateAndGetUserQuestions/${id}`, data);
};

// ? GET GUEST FOR THE GIFT RECEIVED
export const getGuestForGifts = (ceremony_id) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/usergift/list/${id}/${ceremony_id}`);
};
export const postGiftData = (data) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.put(`${serverURl}/usergift`, data);
};

// ?GET MARRIAGE DETAILS
export const getMarriageDetails = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/marriagedetails/${id}`);
};
export const getMarriageDetails2 = (user_id) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/marriagedetails/${user_id}`);
};

export const getDynamicRsvpQuestions = () => {
  const id = JSON.parse(localStorage.getItem("user"));

  return axios.get(`${serverURl}/user/getUserQuestions/${id}`);
};

export const getDynamicRsvpQuestions2 = (user_id) => {
  const id = JSON.parse(localStorage.getItem("user"));

  return axios.get(`${serverURl}/user/getUserQuestions/${user_id}`);
};

export const putMarriageDetails = (data) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.put(`${serverURl}/marriagedetails/${id}`, data);
};

export const getCeremoniesForRsvp = (id) => {
  return axios.get(`${serverURl}/user/getGuestCeremony/${id}`);
};

// https://shivappdev.24livehost.com:3004/contact
export const contactUs = (data) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.post(`${serverURl}/contact`, data);
};

export const getAdditionalGuestInfo = (data) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(
    `${serverURl}/payment/getAdditionalGuestInfo/user/${id}`,
    data
  );
};

export const getWeddingList = () => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/weddinglist/${id}`);
};

export const cronJob = (data) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.post(`${serverURl}/cronjob`, data);
};

export const UploadProfile = (data) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.post(`${serverURl}/profile/upload/${id}`, data);
};
export const getUploadProfile = (data) => {
  const id = JSON.parse(localStorage.getItem("user"));
  return axios.get(`${serverURl}/profile/profile-link/${id}`, data);
};

export const deleteUserDetailsAdmin = (id) => {
  return axios.delete(`${serverURl}/admin/user_details/${id}`);
};

// 'https://shivappdev.24livehost.com:3004/user/dynamic-social-login'
export const sendSocialLoginData = (data) => {
  return axios.post(`${serverURl}/user/dynamic-social-login`, data);
};
// put("update-user/:user_id.
export const updateUserDetails = (data) => {
  return axios.put(
    `${serverURl}/user/update-user/${data.id.id}`,
    data.editedData
  );
};

// ? COORDINATE API
export const setCoordinates = (data) => {
  return axios.post(`${serverURl}/coordinates/box-coordinates`, data);
};

export const getCoordinates = (data) => {
  return axios.get(
    `${serverURl}/coordinates/retrieveCoordinates/${data.user_id}/${data.event_id}`
  );

  // GET https://shivappdev.24livehost.com:3004/api/groups/getGuestCeremonyByCode/282561
};
export const weddingCode = (code) => {
  return axios.get(`${serverURl}/groups/getGuestCeremonyByCode/${code}`);
};
