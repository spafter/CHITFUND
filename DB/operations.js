var mysql =  require('mysql');


module.exports=function() {

return function getData(callback){

var connection =  mysql.createConnection({
        host: "localhost",
        user : "root",
        password: "test"
  });

connection.connect();

 connection.query("use CHITFUND");
  var strQuery = "select * from Merchant";

  connection.query( strQuery, function(err, rows){
        if(err) {
                throw err;
        }else{
                console.log( "Hi sandeep "+rows );
		callback(rows);
        }
  });

connection.end();
}
};
