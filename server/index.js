//at time he created this import wouldn't work (it's ES2015), had to use require
const express = require('express');

//majority of projects only need a single app object, sets up configuration
//to listen for incoming requests from Node side and sends to Route Handlers
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there' })
});

app.listen(5000);
