const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireLogin = require('../middlewares/requireCredits');

//we required in mongoose (above) and required surveys via mongoose because
//there's issues with mongoose and testing? didnt really understand it but it
//bypasses something
const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

//create instance of a Survey, lower survey to indicate its an instance
    const survey = new Survey({
      title,
      subject,
      body,
      recipients
    })
  });
};
