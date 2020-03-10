//at time he created this import wouldn't work (it's ES2015), had to use require
const express = require('express');

//majority of projects only need a single app object, sets up configuration
//to listen for incoming requests from Node side and sends to Route Handlers

const app = express();
//app.get creates a brand new route handler
//this is a route handler, the '/' represents the route (localhost:5000/),
//req = request, res = response, then res.send sends back json data
//this arrow function is called automatically anytime someone visits '/'
app.get('/', (req, res) => {
  res.send({ hi: 'there' })
});

//look at underlying environment and see what port we're using, or use port 5000
const PORT = process.env.PORT || 5000;
app.listen(5000);
