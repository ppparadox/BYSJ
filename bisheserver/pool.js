var mysql=require("mysql");
var pool = mysql.createPool({
    host: 'localhost',
    user: 'wjm',
    password: '111111',
    database: 'bysj',
    connectionLimit :'10000',
});

var sss=function(sql,val,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,val,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};

module.exports=sss;