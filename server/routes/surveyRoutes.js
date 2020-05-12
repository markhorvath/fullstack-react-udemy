const requireLogin = require('../middlewares/requireLogin');
const requireLogin = require('../middlewares/requireCredits');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {

  });
};
