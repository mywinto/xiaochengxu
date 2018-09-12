const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function request(parameters = {}, success, method = 'GET',header={}){

  wx.request({
    url: 'http://api.budejie.com/api/api_open.php',
    method:method,
    data:parameters?parameters:{},
    header: header ? header : "application/json",
    success:function(res){
      success(res.data);
    },
    fail:function(error){

    },
    complete:function(){

    }
  })
}
module.exports = {
  formatTime: formatTime,
  request: request
}