//at time he created this import wouldn't work (it's ES2015), had to use require
const express = require('express');
//this works, but we can refactor to what's below
// const authRoutes = require('./routes/authRoutes');
//since this isn't returning anything (ie export default) we don't need to
//assign it to variable
require('./services/passport');


const app = express();

//This is an IFFE, authRoutes exports the function which gets called immediately
//with the app object as the argument
require('./routes/authRoutes')(app);

//look at underlying environment and see what port we're using, or use port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
