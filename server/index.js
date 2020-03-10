//at time he created this import wouldn't work (it's ES2015), had to use require
const express = require('express');
const passport = require('passport');
//we only need the .Strategy propery from this
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//get google oauth keys from keys.js
const keys = require('./config/keys');

//majority of projects only need a single app object, sets up configuration
//to listen for incoming requests from Node side and sends to Route Handlers
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'world' })
});
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

//the 'google' string is part of the new GoogleStrategy instance above, it's
//got an internal identifier of 'google' so thats how the passport.authenticate
//knows to use the Strategy coded above
//the scope specifies to Google what we want access to
app.get('/auth/google/', passport.authenticate('google', {
  scope: ['profile', 'email']
  })
);

//oauth callback route handler
app.get('/auth/google/callback', passport.authenticate('google'));

//look at underlying environment and see what port we're using, or use port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
