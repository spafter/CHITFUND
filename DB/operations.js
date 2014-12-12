var mysql =  require('mysql');


module.exports=function DB() {

	var connection =  mysql.createConnection({
host: "localhost",
user : "root",
password: "test"
});
connection.connect();
connection.query("use CHITFUND");
return {
getBuyers: function(callback){



		   var strQuery = "select * from Merchant";

		   connection.query( strQuery, function(err, rows){
				   if(err) {
				   throw err;
				   }else{
				   console.log( "Hi sandeep "+rows );
				   callback(rows);
				   }
				   });

	   },
getDateAndTime: function(callback){
			var strQuery = "select * from auction";
			connection.query(strQuery,function(err,rows){
					if(err) {
					throw err;
					}else{
					console.log( "Hi sandeep "+rows );
					callback(rows);
					}

					});

		},
setDateAndTime: function(date,time,merchant,callback){
			var strQuery = "update auction set date='"+date+"' , time='"+time+"' where merchant='"+merchant+"'";
			connection.query(strQuery,function(err){
					callback();
					});

		},

setbid:  function(bid,email,callback) {
		 var strQuery = "update Merchant set Maximum_Bid='"+bid+"' where email='"+email+"'";

		 connection.query(strQuery,function(err){
				 callback();
				 });

	 },

getRemainingBidders: function(callback) {
			     var strQuery = "select * from Merchant where bidCompleted=false";

			     connection.query( strQuery, function(err, rows){
					     if(err) {
					     throw err;
					     }else{
					     callback(rows);
					     }
					     });

		     }

};
};
