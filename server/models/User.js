const mongoose = require('mongoose');

const { Schema } = mongoose; //destructured

//we can freely add or remove properties to schemas
const userSchema = new Schema({
  googleId: String
});

//This is how we create the actual class, users will be the name of the collection
//mongoose will not overwrite if the collection already exists, it will only
//create a new collection if the name you enter doesn't already exist
mongoose.model('users', userSchema);
