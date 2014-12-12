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
                "account_number": "1453948006982829156",
                "auth_claims": [
                    "USERNAME",
                    "PASSWORD"
                ]
            }
        }
    ],
    "actor": {
        "id": "0",
        "account_number": "1453948006982829156",
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
        url: 'https://stage2std095.qa.paypal.com:12450/v1/payments/personal-payments/funding-options',
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
    console.log(objToString(response.body));
    //console.log(JSON.stringify(response.body));

    var accounts = ["1649459614522806421","2280859772709957281","1831848792016226311","1266963231318513302","1591443115931397238","1264974821966863261","1455097459643760314","2253795478794371826","1557309761722077063","2100392054024577272"];
    for(var i=0;i<accounts.length();i++){
    var output = exec('curl --insecure "https://stage2vps10.qa.paypal.com:12450/v1/payments/personal-payments/funding-options" -X POST -H \'X-PayPal-Security-Context: {"scopes":["*"],"subjects":[{"subject":{"id":"0","auth_state":"LOGGEDIN","account_number":"'+accounts[i]+'","auth_claims":["USERNAME","PASSWORD"]}}],"actor":{"id":"0","account_number":"'+accounts[i]+'","auth_claims":["USERNAME","PASSWORD"]}}\' -H \'Content-Type: application/json\' -d \'{"amount":{"value":"34","currency":"USD"},"payee":{"id":"Merchant1@paypal.com","type":"EMAIL"},"fee":{"payer":"PAYER"},"payment_type":"PERSONAL"}\'', {silent:true}).output;
var json_data = JSON.parse(output.substr(output.indexOf("{")));
var id = json_data.funding_options.options[0].id;


var payment_data = 'curl --insecure \'https://stage2vps10.qa.paypal.com:12450/v1/payments/personal-payments\' -X POST -H \'X-PayPal-Security-Context: {"scopes":["*"],"subjects":[{"subject":{"id":"0","auth_state":"LOGGEDIN","account_number":"1453948006982829156","auth_claims":["USERNAME","PASSWORD"]}}],"actor":{"id":"0","account_number":"1453948006982829156","auth_claims":["USERNAME","PASSWORD"]}}\' -H \'Content-Type: application/json\' -d \'{"funding_option_id":"'+id+'","note_to_payee":"Hola! "}\'';
output = exec(payment_data);
callback();
}
});


}
};
};
