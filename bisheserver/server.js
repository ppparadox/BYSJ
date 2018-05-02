var mysql      = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'wjm',
  password : '111111',
  database : 'test'
});





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


app.post('/login', function (req, res) {
  console.log(req.body);
   res.json(req.body);
})

app.post('/register', function (req, res) {
  console.log(req.body);
   res.json(req.body);
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


