function timeout(message) { 
  return message
}
function dateConversion(time) { 
  //计算出相差天数
  let day = Math.floor(time / (24 * 3600 * 1000))
  //计算出小时数
  let leave1 = time % (24 * 3600 * 1000)
  let hours = Math.floor(leave1 / (3600 * 1000))
  hours = hours >= 10 ? hours : '0' + hours
  //计算相差分钟数
  let leave2 = leave1 % (3600 * 1000)
  let minutes = Math.floor(leave2 / (60 * 1000))
  minutes = minutes >= 10 ? minutes : '0' + minutes
  //计算相差秒数
  let leave3 = leave2 % (60 * 1000)
  let seconds = Math.round(leave3 / 1000)
  seconds = seconds >= 10 ? seconds : '0' + seconds
  var str = day + "天 " + hours + ": " + minutes + ": " + seconds
  return str
}
module.exports = {
  timeout,
  dateConversion
}