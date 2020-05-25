//SurveyField contains logic to render single label & text input
import React from 'react';

//destructured from props.input (props came from reduxform)
export default ({ input, label, meta: { error, touched} }) => {
  //{...input} is equivalent to onBlur={input.onBlur}, onChange={input.onChange}, etc
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      //this is kinda abusing javascript, if touched is true and error is a string
      //(or maybe just exists) then it'll display, if touched is false it won't
      //just because it's false
      {touched && error}
    </div>
  )
}
