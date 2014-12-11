var request = require("request");

var https = require('https');

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



https.get(options, function (err, response, body) {
    if (err) { console.log("Error"+err)} ;
    console.log(JSON.stringify(response.body));

});
