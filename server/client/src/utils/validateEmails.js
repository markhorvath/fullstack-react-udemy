
//this was taken from the javascript version on https://emailregex.com/
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
  const invalidEmails = emails
  .split(',')
  .map(email => email.trim())
  .filter(email => re.test(email) === false);

  if(invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }

  return;
}
//POTENTIAL FIX TO VALIDATE EMAILS 
// const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//
// export default emails => {
//   const invalidEmails = emails
//     .split(",")
//     .map(email => email.trim())
//     .filter(email => re.test(email) === false);
//
//   if (invalidEmails.length) {
//     const addSpacing = invalidEmails.map(email => " " + email);
//     return `These emails are invalid:${addSpacing}`;
//   }
//
//   return;
// };
