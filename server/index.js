//at time he created this import wouldn't work (it's ES2015), had to use require
const express = require('express');
const mongoose = require ('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
//had to switch the orders of these, passport needs User to run properly, but
//User was getting loaded AFTER passport was trying to run
require('./models/User');
require('./services/passport');

// mongoose.connect(keys.mongoURI).catch(error => console.log(error));

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.log('Error on start: ' + err.stack));

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize());
app.use(passport.session());

//This is an IFFE, authRoutes exports the function which gets called immediately
//with the app object as the argument
require('./routes/authRoutes')(app);

//look at underlying environment and see what port we're using, or use port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
