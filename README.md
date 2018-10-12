# node-vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 连接mysql
``` bash
# 创建接口文件
在项目文件下创建server.js

# 引入需求模块
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

# 设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header('Access-Control-Allow-Headers', 'Content-Type');//添加此header解决，post请求报错Request header field Content-Type is not allowed by Access-Control-Allow-Headers in preflight response.
  next();
});

# 处理post请求
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));//当为false时，无法post(nested object) 嵌套对象

# 编写接口
//get接口
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

//post接口
app.post('/login', function (req, res) {
  connection.query("select * from user where userid='" + req.body.name + "' and password = '" + req.body.password + "'",
  function (error, results, fields) {
    if(error){
      res.send(error);
      return;
    }else{
      res.send(results);
    }
  })
})

# 创建连接
var connection = mysql.createConnection({
host: 'localhost', //数据库所在服务器ip
user: 'root', //数据库用户名
password: '123456', //数据库密码
database: 'testsys', //连接的数据库名称
});
app.listen(3000); //端口

#运行
执行node server.js
接口更改后需要重新执行才能生效