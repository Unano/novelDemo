let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema ({
  'id': String, // id号
  'account': String, // 账号
  'password': String, // 密码
  'reader': Object, // 读者身份下的数据
  'author': Object // 作者身份下的数据
});

module.exports = mongoose.model('User', userSchema)
