const passport = require('passport');
//we only need the .Strategy propery from this
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//get google oauth keys from keys.js
const keys = require('../config/keys');

//passport.use() is a generic function to use a strategy
//new GoogleStrategy creates new instance of passport strategy
//callbackURL is for when users go to that path, we'll add a route handler forit
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
},
  (accessToken, refreshToken, profile, done) => {
    console.log('acces token: ', accessToken,
    'refreshToken: ', refreshToken,
    'profile: ', profile);
  })
);
