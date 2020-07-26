const _ = require('lodash');
const { Path } = require('path-parser');
//'url' is a default or integrated module in nodejs, its a library with helpers
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

//we required in mongoose (above) and required surveys via mongoose because
//there's issues with mongoose and testing? didnt really understand it but it
//bypasses something
const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for your input!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    const events = _.chain(req.body)
      .map(({ email, url }) => {
        //this Path object is used to look at the pathname and extract out the
        //variables we need (surveyid and choice)

        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: {email: email, responded: false}
          }
        }, {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true }
        }).exec();
      })
      .value();

      console.log(events);
    //this tells sendgrid the request is ok/complete
    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

//create instance of a Survey, lower survey to indicate its an instance
//.map(email => ({ email })) is es6 condensing (email => { return { email: email }})
//then we added .trim() because there was trailing whitespace in the emails
//req.user.id is an id created by mongodb for the user
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    //Sendgrid, from Mailer.js, this will send the actual email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    //try to catch any error in any of these await funcs
    try {
      await mailer.send();
      //await again because we want to make sure we wait for it to finish, this is
      //saving the survey to the database
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      //sending back the user model with the updated credits
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
