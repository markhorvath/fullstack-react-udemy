//SurveyField contains logic to render single label & text input
import React from 'react';

//destructured from props.input (props came from reduxform)
export default ({ input, label }) => {
  //{...input} is equivalent to onBlur={input.onBlur}, onChange={input.onChange}, etc
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
    </div>
  )
}
