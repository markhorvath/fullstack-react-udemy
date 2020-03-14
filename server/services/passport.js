const passport = require('passport');
//we only need the .Strategy propery from this
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');
//passport.use() is a generic function to use a strategy
//new GoogleStrategy creates new instance of passport strategy
//callbackURL is for when users go to that path, we'll add a route handler forit
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
},
  (accessToken, refreshToken, profile, done) => {
    //find if One of the googleId already exists in the collection
    User.findOne({ googleId: profile.id })
      .then((existingUser) => {
        if (existingUser) {
          //we already have a record with the googleId
          //done requires 2 objects, 1st is error and since we found a user here
          //we can set it to null, the second object is the user record
          done(null, existingUser);
        } else {
          //else we create a new user
          //.save is what saves it to the DB
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
            //the .then promise is used because creating a new user
            //is async, once finished we take the user and call done on it
        }
      });
  })
);
