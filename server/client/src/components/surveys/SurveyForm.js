import React, { Component } from 'react';
//reduxForm allows our component to connect/talk to our store at the 'top' of the
//application
import { reduxForm } from 'redux-form';

class SurveyForm extends Component {
  render() {
    return (
      <div>
      SurveyForm
      </div>
    )
  }
}

//reduxForm only requires one property, 'form'
export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
