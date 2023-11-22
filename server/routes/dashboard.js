

const express=require('express');
const router=express.Router();

const {
  getTotalRsvpResponses,
  getFoodCount,
  getTotalCeremony,
  getAllergies,
  getTotalPersonalAssistance,
  getTotalSareeAssistance,
  getTotalTurbanAssistance,
  getTotalDhotiAssistance,
  getGuestListWithMembers,
  getDrinkPreference,
  getGuestListByCeremony,
  getTotalMUA,
  getAllResponseDataForGuest,
  getFoodCountWithTextResponse,
  getTotalCeremonyByText,
  insertIntoCA,
  getCeremonyAttendance,
  getGuestId,
  allEventAttendance,
  getTotalPersonalAssistanceCombined,
  getTotalMUAList,
  getTotalEthinicWearlist,
  getFlightListReport,
  getFoodListReport,
  getMehndiList,
  getGuestListByFnD,
  getResponseData,

} = require("../controllers/dashboardController");

router.get('/getTotalRsvpResponses/users/:user_id',getTotalRsvpResponses);
router.get('/getTotalFoodCount/:id',getFoodCount);
router.get('/getTotalMUA/:id',getTotalMUA);
router.get('/getTotalCeremony/:id',getTotalCeremony);
router.get('/getAllergies/:id',getAllergies);
router.get('/getDrinkPreference/:id',getDrinkPreference);
router.get('/getGuestListWithMembers/:id',getGuestListWithMembers);
router.get('/getGuestListByCeremony/user/:user_id/ceremony/:ceremony_id',getGuestListByCeremony);
router.get('/getTotalPersonalAssistance/:id',getTotalPersonalAssistance);
router.get('/getTotalSareeAssistance/:id',getTotalSareeAssistance);
router.get('/getTotalTurbanAssistance/:id',getTotalTurbanAssistance);
router.get('/getTotalDhotiAssistance/:id',getTotalDhotiAssistance);
router.get('/getAllResponseDataForGuest/user/:user_id/guest/:guest_id',getAllResponseDataForGuest);
router.get('/getFoodCountWithTextResponse/user/:user_id',getFoodCountWithTextResponse);
router.get('/getTotalCeremonyByText/user/:user_id',getTotalCeremonyByText);
router.post('/insertIntoCA',insertIntoCA);
router.get('/getCeremonyAttendance/user/:user_id/:event_id',getCeremonyAttendance);
router.get('/getGuestId/:user_id/:item',getGuestId);
router.get('/reports/allEventAttendance/:event_id',allEventAttendance);
router.get('/reports/getTotalPersonalAssistanceCombined/:user_id',getTotalPersonalAssistanceCombined);
router.get('/reports/getTotalMUAList/:user_id',getTotalMUAList);
router.get('/reports/getTotalEthinicWearlist/:user_id',getTotalEthinicWearlist);
router.get("/reports/getFlightListReport/:user_id", getFlightListReport);
router.get("/reports/getFoodListReport/:user_id", getFoodListReport);
router.get("/reports/getMehndiList/:user_id", getMehndiList);
router.get("/reports/getResponseData/:user_id/:word", getResponseData);
router.get("/getGuestListByFnD/:user_id/ford", getGuestListByFnD);

module.exports=router;