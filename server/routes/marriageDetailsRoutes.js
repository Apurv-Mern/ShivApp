const express = require("express");
const router = express.Router();
const marriageDetailsController = require("../controllers/marriageDetailsController");

router.post("/", marriageDetailsController.createMarriageDetail);
router.get("/:user_id", marriageDetailsController.getMarriageDetailsByUser);
router.put("/:user_id", marriageDetailsController.updateMarriageDetail);
router.delete("/:id", marriageDetailsController.deleteMarriageDetail);

module.exports = router;
