export function getcookie () {
  let cookie = {}
  let all = document.cookie
  if (!all) {
    return cookie
  }
  let list = all.split('; ')
  list.forEach((item) => {
    let arr = item.split('=')
    let key = arr[0]
    let name = arr[1]
    cookie[key] = name
  })
  return cookie
}
