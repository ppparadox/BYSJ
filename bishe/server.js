var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'wjm',
  password : '111111',
  database : 'test'
});
 
connection.connect();


var values = [
[13,2,4,3],
[53,1,7,7]
];


var sql = "INSERT INTO bus_placeinfo(placeid,nextstopdistance,placename,nextstoptime) VALUES ?";

connection.query(sql, values,function (err, rows, fields) {
 
});
 
connection.query('SELECT * from bus_placeinfo', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

