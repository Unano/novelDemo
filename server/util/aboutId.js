// 用创建时的时间创建一个id(这是不恰当的创建id方式)
function createId () {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let id = `${year}${month}${day}${hours}${minutes}${seconds}`;
  return id;
}

exports.createId = createId;
