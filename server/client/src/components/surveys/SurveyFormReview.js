// SurveyFormReview shows users their form inputs for review
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = formFields.map( ({ name, label}) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });
  // formValues in submitSurvey() is passed to this as props to this component above
  return (
    <div>
    <h5>Please confirm your entries</h5>
    {reviewFields}
    <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
      Back
    </button>

    <button className="green white-text right btn-flat"
      onClick={() => submitSurvey(formValues, history)}>
      Send Survey
      <i className="right material-icons">email</i>
    </button>
    </div>
  );
};

function mapStateToProps(state) {
  //console.log(state) to see the auth and form Objects being sent by redux store
  //form.surveyForm is the form data in the export default reduxForm of SurveyForm.js
  //specifically the line form: 'surveyForm'
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
