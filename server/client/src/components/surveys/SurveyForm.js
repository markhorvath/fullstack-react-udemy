import _ from 'lodash';
import React, { Component } from 'react';
//reduxForm allows our component to connect/talk to our store at the 'top' of the
//application
//Field component is a helper provided by reduxForm for rendering any type of
//traditional html form element

import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

//this.props.handleSubmit is provided by reduxForm that's wired up at bottom
class SurveyForm extends Component {
  //helper function to render SurveyFields
  renderFields() {
    //LODASH version
    // return (
    //   _.map(FIELDS, ({ label, name }) => {
    //     return <Field component={SurveyField} type="text" label={label} name={name} />
    //   })
    // )
    //ES6 version
    return formFields.map((el) => {
        return <Field component={SurveyField} type="text" label={el.label} key={el.name} name={el.name} />
      }
    )

    // return (
    //   <div>
    //     <Field name="title" type="text" component={SurveyField} label="Survey Title" />
    //     <Field name="subject" type="text" component={SurveyField} label="Subject Line" />
    //     <Field name="body" type="text" component={SurveyField} label="Email Body" />
    //     <Field name="emails" type="text" component={SurveyField} label="Recipient List" />
    //   </div>
    // )
  }

  render() {
    return (
      <div>
      <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
        {this.renderFields()}
        <Link to="/surveys" className="red btn-flat white-text">Cancel
        </Link>
        <button type="submit" className="teal btn-flat right white-text">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

//this may have to be updated later to set errors[name] to a default string like
//'you must provide a value'
  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  })

  // if (!values.title) {
  //   errors.title = 'You must provide a title';
  // }
  //
  // if (!values.subject) {
  //   errors.title = 'You must provide a subject';
  // }
  //
  // if (!values.body) {
  //   errors.title = 'You must provide a text for the email body';
  // }

  return errors;
}

//reduxForm only requires one property, 'form'
//destroyOnUnmount is true by default, it destorys form data anytime its no longer
//on the screen.  we want it to persist so we set it to false
export default reduxForm({
  validate: validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
