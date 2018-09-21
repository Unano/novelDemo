var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema({
  '1': Object, // 时期
  '2': Object, // 题材
  '3': Object  // 结局
});

module.exports = mongoose.model('Tag', tagSchema);
