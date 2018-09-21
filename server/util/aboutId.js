// 用创建时的时间创建一个id(这是不恰当的创建id方式,如果在同一时间注册账号，那么就会产生相同的id)
function createId () {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let milliseconds = date.getMilliseconds();
  let id = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
  return id;
}

exports.createId = createId;
