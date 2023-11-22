
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
const GOOGLE_CLIENT_SECRET = 'YOUR_GOOGLE_CLIENT_SECRET';
const FACEBOOK_CLIENT_ID ='YOUR_FACEBOOK_CLIENT_ID';
const FACEBOOK_CLIENT_SECRET = 'YOUR_FACEBOOK_CLIENT_SECRET';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/google'
},(accessToken, refreshToken, profile, callback)=>{
    callback(null, profile);
}))

passport.use(new FacebookStrategy({
      clientID:  637874308059622, //process.env.FB_ID, , 
      clientSecret: '7b1402fce14da1eb22c72eee2e5fe4bd',//process.env.FB_SECRET,
    //   clientID: FACEBOOK_CLIENT_ID,
    //   clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL:'/facebook',
      profileFields: ['emails', 'displayName', 'name', 'picture']
  }, (accessToken, refreshToken, profile, callback)=>{
      callback(null, profile)
  }))
  
  passport.serializeUser((user,callback)=>{
      callback(null, user);
  })
  
  passport.deserializeUser((user, callback)=>{
      callback(null, user);
  })
  
  module.exports = passport;
  