import _ from 'lodash';
import React, { Component } from 'react';
//reduxForm allows our component to connect/talk to our store at the 'top' of the
//application
//Field component is a helper provided by reduxForm for rendering any type of
//traditional html form element

import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';

const FIELDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipient List', name: 'emails' }
]
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
    return FIELDS.map((el) => {
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
      <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
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

//reduxForm only requires one property, 'form'
export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
