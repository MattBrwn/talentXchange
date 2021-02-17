const { Schema, model } = require("mongoose");

let RequestSchema = new Schema({
  requested: {
    type: Schema.Types.ObjectId, ref: 'user'
    },
  searcher: {
    type: Schema.Types.ObjectId, ref: 'user'
    },
  status: {
    type: String,
    default: 'pending'
  }, 
  request_date: Date,
  message: String,
  requested_talent: String    
});

//define model
let RequestModel = model('request', RequestSchema);

//export model
module.exports = RequestModel;
