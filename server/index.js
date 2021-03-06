//at time he created this import wouldn't work (it's ES2015), had to use require
const express = require('express');
const mongoose = require ('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
// const bodyParser = require('body-parser');
//had to switch the orders of these, passport needs User to run properly, but
//User was getting loaded AFTER passport was trying to run
require('./models/User');
require('./models/Survey');
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

//bodyParser middleware.  anytime a post/put/patch/etc request comes into our app
//this parses the body then assigns it to req.body property of the incoming
//request object
//UPDATE body-parser is broken, can use express.json() instead
app.use(express.json());

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
//Added billingRoutes
require('./routes/billingRoutes')(app);
//Added surveyRoutes
require('./routes/surveyRoutes')(app);

//code to run only if we're on heroku / in production
if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assets like our main.js or main.css files
  app.use(express.static('client/build'));
  //Express will serve up the index.html file if it doesn't recognize the route
  //This is basically the catch-all code which basically just sends back the
  //index.html file if none of the routes above worked
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

//look at underlying environment and see what port we're using, or use port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
