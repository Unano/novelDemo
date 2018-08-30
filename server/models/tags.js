var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
  '1': Object,
  '2': Object,
  '3': Object,
  '4': Object
});

module.exports = mongoose.model('Tag', tagSchema);
