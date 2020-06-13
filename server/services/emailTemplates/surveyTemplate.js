const keys = require('../../config/keys');
//define and export function that returns some html to be used as the body
//of any email we sendout (with this template)
//survey is argument that will include survey.body among other things
module.exports = (survey) => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>I'd like your input</h3>
          <p>Please answer the following question: </p>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a><br>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
          </div>
        </div>
      </body>
    `
}
