import React, { Component } from 'react';
//reduxForm allows our component to connect/talk to our store at the 'top' of the
//application
//Field component is a helper provided by reduxForm for rendering any type of
//traditional html form element

import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';


//this.props.handleSubmit is provided by reduxForm that's wired up at bottom
class SurveyForm extends Component {
  //helper function to render SurveyFields
  renderFields() {
    return (
      <div>
        <Field name="title" type="text" component={SurveyField} />
      </div>
    )
  }

  render() {
    return (
      <div>
      <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
        {this.renderFields()}
        <button type="submit">Submit</button>
      </form>
      </div>
    )
  }
}

//reduxForm only requires one property, 'form'
export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
