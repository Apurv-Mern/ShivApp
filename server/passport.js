const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const request = require('request');
const express = require("express");
const router = express.Router();
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "160836342396-61uc0da4nl61epv9n4gfp34r2d8f3cmt.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
   async function (accessToken, refreshToken, profile, callback) {
      // Authentication succeeded, return the user profile
        const data = {
          name: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value
      };
      console.log("line 28 passport",data);
      request.post({
        url: 'https://shivappdev.24livehost.com:3004/user/dynamic-social-login',
        json: true,
        body: data,
        rejectUnauthorized: false
    }, function (error, response, body) {
        if (error) {
            console.error(error);
            return callback(error);
        }
        console.log('API Response:', body);
      //router.handle({ method: 'post', url: '/dynamic-social-login', body: { data } }, null, () => {});
      })
      callback(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: "637874308059622",
      clientSecret: "7b1402fce14da1eb22c72eee2e5fe4bd",
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, callback) {
      console.log("accessToken: ", accessToken);
      console.log("refreshToken: ", refreshToken);
      console.log("profile: ", profile);
      const userInfo = {
        userId: body.userId,
        userName: body.userName,
        accessToken: body.accessToken,
        refreshToken: body.refreshToken,
        // Add other user details as needed
      };

      // Continue with the Google Auth callback
      callback(null, profile, userInfo);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// function (accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
