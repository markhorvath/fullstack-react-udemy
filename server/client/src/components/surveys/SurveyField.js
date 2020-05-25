//SurveyField contains logic to render single label & text input
import React from 'react';

//destructured from props.input (props came from reduxform)
export default ({ input }) => {
  //{...input} is equivalent to onBlur={input.onBlur}, onChange={input.onChange}, etc
  return (
    <div>
      <input {...input} />
    </div>
  )
}
