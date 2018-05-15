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


-


// 用户登录模块
app.post('/login', function (req, res) {
  const isquerysql="SELECT isadmin FROM USER WHERE account='"+req.body.account+"' and password='"+req.body.password+"'";
  console.log(req.body);
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
    {
      console.log(vals[0].isadmin)
      res.send(vals[0].isadmin);
    }

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


// 公交详情添加模块

app.post('/adddetail', function (req, res) {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'wjm',
    password : '111111',
    database : 'bysj'
  });

console.log('add');
  var values = [req.body.routeid,req.body.placename,req.body.index,req.body.price];

  var insertsql5 = "INSERT INTO BUSPLACE(routeid,placename,stopindex,price) VALUES (?,?,?,?)";

        sss(insertsql5,values,function (err, rows, fields) {
          if(err){
            return;
          }
          else res.send('公交站点添加成功');
        });


})



// 公交路线查询模块

app.post('/routeidquery', function (req, res) {
   var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'wjm',
    password : '111111',
    database : 'bysj'
  });


const querysql03="select placename,price,stopindex from busplace where routeid='"+req.body.routeid+"'";

 sss(querysql03,function (err,vals,fields) {
if(err){
            return;
          }
          else 
          {
            var dataa=JSON.stringify(vals);
          console.log(dataa);
          res.send(dataa);

          }
});

})


// 全公交路线查询模块

app.get('/queryall', function (req, res) {
   var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'wjm',
    password : '111111',
    database : 'bysj'
  });


var querysql333="select * from busroute ";
console.log('123333');

 sss(querysql333,function (err,vals,fields) {
if(err){
            return;
          }
          else 
          {
            var dataa=JSON.stringify(vals);
          console.log(dataa);
          res.json(dataa);
          }
});

})


// 详细站点查询模块

app.post('/querydetail', function (req, res) {
   var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'wjm',
    password : '111111',
    database : 'bysj'
  });

console.log('详细站点访问');

var querysql3444="select * from busplace where routeid='"+req.body.routeid+"'";
console.log(querysql3444);
 sss(querysql3444,function (err,vals,fields) {
if(err){
            return;
          }
          else 
          {
            var dataa=JSON.stringify(vals);
    
          res.json(dataa);
          }
});

})



// 全公交删除查询模块

app.post('/delete', function (req, res) {
   var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'wjm',
    password : '111111',
    database : 'bysj'
  });

console.log('路线删除访问');

var querysql1="delete from busroute where routeid='"+req.body.routeid+"'";
var querysql2="delete from busplace where routeid='"+req.body.routeid+"'";
console.log('123');
 sss(querysql1,function (err,vals,fields) {
 sss(querysql2,function (err,vals,fields) { 
  res.send('删除成功')});

});

})

// 全公交详情删除模块
app.post('/deletedetail', function (req, res) {
   var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'wjm',
    password : '111111',
    database : 'bysj'
  });

console.log('详情删除访问');
var routeid=req.body.routeid;
var stopindex=req.body.index;
var querysql1="delete from busplace where routeid='"+routeid+"'and stopindex='"+stopindex+"'";
var querysql2= "UPDATE busplace  SET stopindex=stopindex-1  where stopindex>"+stopindex+"";

 sss(querysql1,function (err,vals,fields) {
 sss(querysql2,function (err,vals,fields) { 
  res.send('删除详情站点成功')});

});

})


// 详细站点名称变更模块
app.post('/updatedetailname', function (req, res) {
   var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'wjm',
    password : '111111',
    database : 'bysj'
  });

console.log('详情地点变更访问');
var routeid=req.body.routeid;
var stopindex=req.body.index;
var name=req.body.name;


var querysql1= "UPDATE busplace  SET placename='"+name+"'  where stopindex='"+stopindex+"'and routeid='"+routeid+"'";

 sss(querysql1,function (err,vals,fields) {

  if(err){
    console.log(err)
            return;
          }
          else
  res.send('更新成功')});

})



// 详细站点价格变更模块
app.post('/updatedetailprice', function (req, res) {
   var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'wjm',
    password : '111111',
    database : 'bysj'
  });

console.log('详情地点变更访问');
var routeid=req.body.routeid;
var stopindex=req.body.index;
var price=req.body.price;


var querysql1= "UPDATE busplace  SET price='"+price+"'  where stopindex='"+stopindex+"'and routeid='"+routeid+"'";

 sss(querysql1,function (err,vals,fields) {

  if(err){
    console.log(err)
            return;
          }
          else
  res.send('更新成功')});

})




var server = app.listen(8089, function () {
  var host = '127.0.0.1'
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


