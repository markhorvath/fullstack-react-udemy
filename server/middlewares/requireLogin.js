
//next passes the request on to the next middleware in the chain
module.exports = (req, res, next) => {
  if(!req.user) {
    return res.status(401).send({ error: "You must login to Google" });
  }
  //if user exists, go on to actual request handling
  next();
}
