const router = require("express").Router();
const passport = require("passport");

// const CLIENT_URL = "http://localhost:3000/shiv_app/";
const FE_CLIENT_URL = "https://shivappdev.24livehost.com/shiv_app/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfully logged in",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(FE_CLIENT_URL);
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: FE_CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/facebook",
  passport.authenticate("facebook", ["profile", "email"])
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: FE_CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
