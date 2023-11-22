const express = require("express");
const router = express.Router();
const {
  creatPaymentIntent,
  createPaymentLink,
  success,
  cancel,
  getPaymentStatus,
  getAllPaymentHistory,
  additionalGuests,
  successadditional,
  canceladditional,
  getAdditionalGuestInfo,
} = require("../controllers/StripepaymentController");

router.get("/getAllPaymentHistories", getAllPaymentHistory);
router.get("/createpaymentintent", creatPaymentIntent);
router.get(
  "/createpaymentlink/user/:user_id/:id/event/:event",
  createPaymentLink
);
router.get("/success/user/:user_id/:pkg/:eve", success);
router.get("/cancel/user/:user_id/:pkg/:eve", cancel);
router.get("/getPaymentStatus/user/:user_id", getPaymentStatus);
router.get("/canceladditional/user/:user_id/:packg", canceladditional);
router.get("/additionalGuests/user/:user_id/:id", additionalGuests);
router.get("/successadditional/user/:user_id/:packg", successadditional);
router.get("/getAdditionalGuestInfo/user/:user_id", getAdditionalGuestInfo);

module.exports = router;

// https://localhost:3004/payment/additionalGuests/user/161/2
