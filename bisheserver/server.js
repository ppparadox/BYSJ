var mysql      = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 
var sss=require("./pool.js");






app.all('*', function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With, accept, origin, Content-Type");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  res.header("X-Powered-By",' 3.2.1')  
  res.header("Content-Type", "application/json;charset=utf-8");  
  next();  
});  //支持跨域

app.use(bodyParser.json()); // for parsing application/json



app.get('/', function (req, res) {
  console.log('来了一次访问');
  res.json({login:'访问答复'});
})





// 用户登录模块
app.post('/login', function (req, res) {
  const isquerysql="SELECT * FROM USER WHERE account='"+req.body.account+"' and password='"+req.body.password+"'";
  sss(isquerysql,function (err,vals,fields) {
   if(err){
    console.log('[SELECT ERROR] - ',err.message);
    return;
  }

  else 
  {
    if(vals.length==0)        
      res.send('无该注册帐号');
    else
      res.send('登陆成功');

  }
});


})



//用户注册模块
app.post('/register', function (req, res) {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'wjm',
    password : '111111',
    database : 'bysj'
  });
  var values = [req.body.name,req.body.sex,req.body.account,req.body.password,req.body.isadmin];
  var insertsql = "INSERT INTO user(name,sex,account,password,isadmin) VALUES (?,?,?,?,?)";
  var querysql="SELECT * FROM USER WHERE account='"+req.body.account+"'";
  sss(querysql,function (err,vals,fields) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    else 
      {if(vals.length==0)
       {
        sss(insertsql,values,function (err, rows, fields) {
          if(err){
            return;
          }
          else res.send('注册成功');
        });
      }
      else   { res.send('改用户已经注册'); }
    }
  });

})


//公交注册模块
app.post('/busregister', function (req, res) {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'wjm',
    password : '111111',
    database : 'bysj'
  });



  var values = [req.body.routeid,req.body.stopnum,req.body.timecost,req.body.first_time,req.body.last_time,req.body.wfstate];
  var insertsql3 = "INSERT INTO busroute(routeid,stopnum,timecost,first_time,last_time,wfstate) VALUES (?,?,?,?,?,?)";
  var querysql3="SELECT * FROM BUSROUTE WHERE routeid='"+req.body.routeid+"'";
  sss(querysql3,function (err,vals,fields) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    else 
      {if(vals.length==0)
       {
        sss(insertsql3,values,function (err, rows, fields) {
          if(err){
            return;
          }
          else res.send('公交路线添加成功');
        });
      }
      else   { res.send('该路线已经添加'); }
    }
  });

})
var server = app.listen(8089, function () {
  var host = server.address().address
  var port = server.address().port 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})




// connection.connect();


// var values = [
// [13,2,4,3],
// [53,1,7,7]
// ];


// var sql = "INSERT INTO bus_placeinfo(placeid,nextstopdistance,placename,nextstoptime) VALUES ?";

// connection.query(sql, values,function (err, rows, fields) {

// });

// connection.query('SELECT * from bus_placeinfo', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });


// connection.end();


