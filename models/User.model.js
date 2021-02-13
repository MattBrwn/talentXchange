const mongoose = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
let UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  talents: {
    type: String,
    required: true
  },
  description: String
});

let UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
