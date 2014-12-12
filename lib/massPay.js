var request = require("request");
var DB = require("../DB/operations");
var db = new DB();

	var remaining = [];
	var items = new Array();
	var item = {
		receiver:'',
		note:'',
		amount:'',
		sender_item_id:'',
		recipient_type:''
	};

var security_context = {
	"actor": {
		"id": "",
		"account_number": "2152331553409959696",
		"party_id": ""
	},
	"scopes": [
		"openid",
	"https://api.paypal.com/v1/developer/.* <https://api.paypal.com/v1/developer/.%2a> <https://api.paypal.com/v1/developer/.%2a> <https://api.paypal.com/v1/developer/.%2a> <https://api.paypal.com/v1/developer/.%2a> ","https://uri.paypal.com/payments/payouts"
		]
};
module.exports = {
execute: function(callback){

		 db.getBuyers(function(rows) {
				max = 0;
				for(i =0;i<rows.length;i++) {
					if(parseInt(rows[i].Maximum_Bid) > parseInt(max)) {
						max = parseInt(rows[i].Maximum_Bid);
					}
				}
				 });

	db.getRemainingBidders(function(rows) {
			for(i = 0; i < rows.length;i++) {
			remaining[i] = rows[i].email;
			var item = new Object();
			//items[i] = new item();
			item.recipient_type = "EMAIL";
			item.amount = {
			"value": parseInt(10000-parseInt(max)),
			"currency": "USD"
			};
			console.log(rows[i].email + "@paypal.com  Sandeep");
			item.receiver = rows[i].email + "@paypal.com";
			item.note = "osama";
			item.sender_item_id = "items1";
			items.push(item);

			}

var data = {
	"sender_batch_header": {
		"email_subject": "you ha"
	}
};

	data.items = items;

console.log(data);

var options = {
url: 'http://stage2vps10.qa.paypal.com:13664/v1/payments/payouts',
     headers: {
	     "X-PAYPAL-SECURITY-CONTEXT": JSON.stringify(security_context),
	     'Content-Type': 'application/json'
     },
body: data,
      json: true,
      method: 'POST'
	};



request(options, function (err, response, body) {
		if (err) { console.log("Error"+err)} ;
		console.log(JSON.stringify(response.body));
		callback("success");

		});
			});

}
};
