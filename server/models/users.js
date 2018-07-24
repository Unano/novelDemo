let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema ({
  'id': Number,
  'account': String,
  'password': String,
  'coins': Number,
  'favoriteNovels': Array
});

module.exports = mongoose.model('User', userSchema)