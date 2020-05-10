const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

//same as authRoutes in that it starts with module.exports
//Stripe documentation here https://www.npmjs.com/package/stripe
module.exports = app => {
  //requireLogin is added as 2nd argument, its middleware to check if user exists
  //this is a reference to the function requireLogin, if it was invoked () here
  //it would run the instant express loads
  app.post('/api/stripe', requireLogin, async (req, res) => {
    //logic to determine if user exists/is logged in, sends 401 http error if not
    if(!req.user) {
      return res.status(401).send({ error: "You must login to Google" });
    }

    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 Credits',
      source: req.body.id
    });

    //req.user comes from passport
    req.user.credits += 5;
    const user = await req.user.save();

    //after user is saved, send the data back to browser
    res.send(user);
  });
};
