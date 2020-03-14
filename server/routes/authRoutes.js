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

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  //oauth callback route handler
  app.get('/auth/google/callback', passport.authenticate('google'));
};
