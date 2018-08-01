let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema ({
  'id': String,
  'account': String,
  'password': String,
  'reader': Object,
  'author': Object
});

module.exports = mongoose.model('User', userSchema)