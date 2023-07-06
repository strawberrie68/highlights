const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')
const passport = require("passport");
const GOOGLE_CLIENT_ID = "1765682568097-gnptgeu2k8jg5eockec4q0jpq00jb65i.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"


passport.use(
    new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  function (accessToken, refreshToken, profile, done) {
    // UserActivation.findOrCreate({googleId: profile.id}, function(err, user){
    //     return cb(err, user)
    // })
    done(null,profile );
   
  }
  )
);
passport.serializeUser((user,done)=>{
    done(null,user);
});
passport.deserializeUser((user,done)=>{
    done(null,user);
});