const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
let RequestSchema = new mongoose.Schema({
  requested: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user'
    },
  searcher: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user'
    },
  status: String, 
  request_date: Date,
  message: String,
  requested_talent: String    
});

//define model
let RequestModel = mongoose.model('request', RequestSchema);

//export model
module.exports = RequestModel;
