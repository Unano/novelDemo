var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var novelSchema = new Schema({
  'id': Number,
  'title': String,
  'author': String,
  'state': String,
  'introduce': String,
  'tags': String,
  'click': String
});

module.exports = mongoose.model('Novel', novelSchema);
