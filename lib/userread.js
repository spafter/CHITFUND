'use strict';

var config = {
scheme : 'http',
	 host : 'stage2vps10.qa.paypal.com',
	 port: '12254',
	 path : '/webapps/servicebridge/services/invoke',
	 ssl: {
rejectUnauthorized: false
	 }
};
var UserReadServ = require("userread");
var userReadServ = new UserReadServ(config);
var payload = {
emailLoad: {
email: ['us-buyer@paypal.com']
	   }
};
var userReadServ = new UserReadServ();
userReadServ.load_user_data(payload, function (error, result) {
		console.log(!error && result.body);
		
		});
