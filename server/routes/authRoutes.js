const passport = require('passport');
//majority of projects only need a single app object, sets up configuration
//to listen for incoming requests from Node side and sends to Route Handlers

//we use module.exports to allow the 'const app = express()' line in index.js
//to run the app.get handlers below within the => func.  it's why the argument
//is app
module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({ hi: 'everyone' })
  });

  //the 'google' string is part of the new GoogleStrategy instance above, it's
  //got an internal identifier of 'google' so thats how the passport.authenticate
  //knows to use the Strategy coded above
  //the scope specifies to Google what we want access to
  app.get('/auth/google/', passport.authenticate('google', {
    scope: ['profile', 'email']
    })
  );

  app.get('/api/logout'), (req, res) => {
    req.logout();
    // res.redirect('/');
    res.send(req.user);
  }

  app.get('/api/current_user', (req, res) => {
    //this will test to ensure that someone who has already gone thru the oauth
    //flow and logged in can get access to the user
    res.send(req.user);
    //req.session is an object, cookie-session library extracts cookie data out
    //of hte cookie and assigns it to req.session.  Passportjs then looks at
    //req.session, pulls the relevant data and passes to deserializeUser et al.
    // res.send(req.session);
  });

  //oauth callback route handler
  app.get('/auth/google/callback', passport.authenticate('google'));
};
