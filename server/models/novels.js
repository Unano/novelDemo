var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var novelSchema = new Schema({
  'id': Number,
  'title': String,
  'state': Object,
  'introduce': String,
  'tags': Array,
  'click': Number
});

module.exports = mongoose.model('Novel', novelSchema);