//引入需求模块
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header('Access-Control-Allow-Headers', 'Content-Type');//添加此header解决"post请求报错Request header field Content-Type is not allowed by Access-Control-Allow-Headers in preflight response".
  next();
});
//处理post请求
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));//当为false时，无法post(nested object) 嵌套对象

//查询商品基础信息接口
app.get('/user', function(req, res) {
  connection.query("select * from user",
    function(error, results, fields) {
      console.log(req.query.type); //接收get传参
      if (error) {
        res.send(error);
        return;
      } else {
        res.send(results)
      }
  });
})

//登录接口
app.post('/login', function (req, res) {
  connection.query("select * from user where userid='" + req.body.name + "' and password = '" + req.body.password + "'",
  function (error, results, fields) {
    if(error){
      var obj = {
        stat: 0
      }
      res.send(obj);
      return;
    }else{
      if(results.length != 0){
        var obj = {
          stat: 1,
          data:{
            userid: results[0].userid
          }
        }
      }else{
        var obj = {
          stat: 0
        }
      }
      res.send(obj);
    }
  })
})

// 创建连接
var connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '123456',
database: 'testsys',
});
app.listen(3000);
console.log('server port: 3000');