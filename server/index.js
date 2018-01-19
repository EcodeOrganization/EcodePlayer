var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors())

// 自定义接口
var mine = require('./mine')
app.use(mine)

var server = app.listen(3000, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})


