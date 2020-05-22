const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

//helper.Mail is an object that takes a lot of configuration and spits out a mailer
//we want to customize it so we're extending it and adding to it
class Mailer extends helper.Mail {
  //consructor is called whenever we use 'new' keyword on Mailer and it
  //lets us set up some initialization for this class instance
  //we only require subject and recipients to send, so those 2 properties are
  //destructured out of survey model, and content will be the body of survey

  constructor({ subject, recipients }, content) {
    //super() is just required
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('markhorvath7@gmail.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }
  //helper func to map over list of recipients and return the email
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    })
  }

  //this is basically from sendgrid documentation
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    //iterate over the list of recipients, and for each recipient (which
    //is whats returned from formatAddresses, its just the email) add
    //them to personalize object

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    //this is defined by the mail base class
    this.addPersonalization(personalize);
  };

    async send() {
      const request = await this.sgApi.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: this.toJSON()
      });

      const response = await this.sgApi.API(request);
      return response;
    };

}

module.exports = Mailer;
