var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var novelSchema = new Schema({
  'id': Number,   // id号
  'title': String, // 书名
  'author': String, // 作者
  'state': String, // 状态：0：全部；1：已完结；2：连载中
  'introduce': String, // 简介
  'tags': Array, // 标签
  'click': String // 点击量
});

module.exports = mongoose.model('Novel', novelSchema);
