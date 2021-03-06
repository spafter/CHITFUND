var request = require("request");
var shell = require('shelljs/global');
var https = require('https');

module.exports = function(){
var security_context = {
    "scopes": [
        "*"
    ],
    "subjects": [
        {
            "subject": {
                "id": "0",
                "auth_state": "LOGGEDIN",
                "account_number": "2152331553409959696",
                "auth_claims": [
                    "USERNAME",
                    "PASSWORD"
                ]
            }
        }
    ],
    "actor": {
        "id": "0",
        "account_number": "2152331553409959696",
        "auth_claims": [
            "USERNAME",
            "PASSWORD"
        ]
    }
},



    

data = {
  "amount": {
    "value": "10",
    "currency": "USD"
  },
  "payee": {
    "id": "cdayanand-us@paypal.com",
    "type": "EMAIL"
  },
  "fee": {
    "payer": "PAYER"
  },
  "payment_type": "PERSONAL"
},



    options = {
        url: 'https://stage2vps10.qa.paypal.com:12450/v1/payments/personal-payments/funding-options',
        headers: {
            "X-PAYPAL-SECURITY-CONTEXT": JSON.stringify(security_context),
            'Content-Type': 'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify(data),
        json: true,
        method: 'POST',
        encoding: 'utf-8',
        strictSSL: false,
        secureProtocol: 'TLSv1_method',
	rejectUnauthorized : false
    };


return {
execute: function(user,callback){
		 request(options, function (err, response, body) {
    if (err) { console.log("Error"+err)} ;
    //console.log(JSON.stringify(response.body));
    var account = '';
    if(user == "subscriber1")
    	account = "1649459614522806421";
    else
        account = "2280859772709957281";

	var output = exec('curl --insecure "https://stage2vps10.qa.paypal.com:12450/v1/payments/personal-payments/funding-options" -X POST -H \'X-PayPal-Security-Context: {"scopes":["*"],"subjects":[{"subject":{"id":"0","auth_state":"LOGGEDIN","account_number":"'+account+'","auth_claims":["USERNAME","PASSWORD"]}}],"actor":{"id":"0","account_number":"'+account+'","auth_claims":["USERNAME","PASSWORD"]}}\' -H \'Content-Type: application/json\' -d \'{"amount":{"value":"1","currency":"USD"},"payee":{"id":"cdayanand-us@paypal.com","type":"EMAIL"},"fee":{"payer":"PAYER"},"payment_type":"PERSONAL"}\'', {silent:true}).output;
var json_data = JSON.parse(output.substr(output.indexOf("{")));
var id = json_data.funding_options.options[0].id;
console.log("SHANKAR"+id);


var payment_data = 'curl --insecure \'https://stage2vps10.qa.paypal.com:12450/v1/payments/personal-payments\' -X POST -H \'X-PayPal-Security-Context: {"scopes":["*"],"subjects":[{"subject":{"id":"0","auth_state":"LOGGEDIN","account_number":"'+account+'","auth_claims":["USERNAME","PASSWORD"]}}],"actor":{"id":"0","account_number":"'+account+'","auth_claims":["USERNAME","PASSWORD"]}}\' -H \'Content-Type: application/json\' -d \'{"funding_option_id":"'+id+'","note_to_payee":"Hola! "}\'';
output = exec(payment_data);
console.log("SHANKAR" + output);
callback();
});


}
};
};
