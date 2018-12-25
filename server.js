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

//例子，get如何接收传参
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

//验证当前账户是否存在，若存在则使用密码登录，不存在可以进行注册
app.post('/verifyAccount', function (req, res) {
  connection.query("select * from user where userid='" + req.body.account + "'",
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
            userStatus: 1
          }
        }
      }else{
        var obj = {
          stat: 1,
          data:{
            userStatus: 2
          }
        }
      }
      res.send(obj);
    }
  })
})

//登录接口
app.post('/login', function (req, res) {
  connection.query("select * from user where userid='" + req.body.account + "' and password = '" + req.body.password + "'",
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

//注册接口
app.post('/regist', function (req, res) {
  connection.query("insert user(userid,password) values('" + req.body.account + "','" + req.body.password + "')",
  function (error, results, fields) {
    if(error){
      var obj = {
        stat: 0
      }
      res.send(obj);
      return;
    }else{
      var obj = {
        stat: 1
      }
      res.send(obj);
    }
  })
})

//获取题目类型列表
app.get('/getExamList', function (req,res) {
  connection.query("select type from exam where examid in(select examid from topic) order by type",
  function(error,results,field){
    if(error){
      res.send(error);
      return;
    }else{
      let arr = [],arr1 = [],arr2 = [], arr3 = [],arr4 = [];
      for(var i = 0; i < results.length; i++){
        switch(results[i].type){
          case 1:
            arr1.push(results[i].examid);
            break;
          case 2:
            arr2.push(results[i].examid);
            break;
          case 3:
            arr3.push(results[i].examid);
            break;
          case 4:
            arr4.push(results[i].examid);
            break;
          default: 
            break;
        }
      }
      arr.push({
        type: 1,
        num: arr1.length
      })
      arr.push({
        type: 2,
        num: arr2.length
      })
      arr.push({
        type: 3,
        num: arr3.length
      })
      arr.push({
        type: 4,
        num: arr4.length
      })
      res.send(arr);
    }
  })
})

// 获取试卷
app.get('/exam', function(req, res) {
  connection.query("select * from exam where type = " + req.query.type,
    function(error, results, fields) {
      if (error) {
        res.send(error);
        return;
      } else {
        res.send(results)
      }
  });
})

// 获取试卷题目
app.get('/topic', function(req, res) {
  connection.query("select * from topic where examid = " + req.query.examid,
    function(error, results, fields) {
      if (error) {
        res.send(error);
        return;
      } else {
        res.send(results)
      }
  });
})

//提交答题结果
app.post('/answer', function (req, res) {
  connection.query("select examid from result where userid='" + req.body.userid + "' and examid= '" + req.body.examid + "'",
  function (error, results, fields) {
    if(error){
      res.send(error)
      return;
    }else{
      if(results.length == 0){
        connection.query("insert into result(uid,userid,examid,score,heightscore,results,time)values(uuid(),'"+ req.body.userid +"','"+ req.body.examid +"','"+ req.body.score +"','"+ req.body.score +"','"+ req.body.result +"',now())",
        function (error, results, fields) {
          if(error){
            res.send(error)
            return;
          }else{
            res.send({
              stat: 1,
              message: '提交成功'
            })
          }
        })
      }else{
        connection.query("update result set score='"+ req.body.score +"',heightscore=case when heightscore < " + req.body.score + " then '"+ req.body.score +"' else heightscore end,results='"+ req.body.result +"',time=now() where userid ='"+ req.body.userid +"' and examid='"+ req.body.examid +"'",
        function (error, results, fields) {
          if(error){
            res.send(error)
            return;
          }else{
            res.send({
              stat: 1,
              message: '提交成功'
            })
          }
        })
      }
    }
  })
})

//获取答案结果
app.post('/result', function(req, res){
  connection.query("select * from result where userid='"+ req.body.userid +"' and examid='"+ req.body.examid +"'",
  function(error, results, fields){
    if(error){
      res.send(error)
    }else{
      res.send(results)
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