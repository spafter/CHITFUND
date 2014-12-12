'use strict';

var User = require('../models/user');

var UserLibrary = function() {
	return {
addUsers: function() { //add two users
		  var u1 = new User({
name: 'Sandeep',
login: 'Merchant1',
password: 'Merchant2',
role: 'admin',
type: 'merchant'
});

var b1 = new User({
name: 'subscriber1',
login: 'subscriber1',
password: 'subscriber1',
role: 'admin',
type: 'subscriber'
});
var b2 = new User({
name: 'subscriber2',
login: 'subscriber2',
password: 'subscriber2',
role: 'admin',
type: 'subscriber'
});


var b3 = new User({
name: 'subscriber3',
login: 'subscriber3',
password: 'subscriber3',
role: 'admin',
type: 'subscriber'
});


var b4 = new User({
name: 'subscriber4',
login: 'subscriber4',
password: 'subscriber4',
role: 'admin',
type: 'subscriber'
});


var b5 = new User({
name: 'subscriber5',
login: 'subscriber5',
password: 'subscriber5',
role: 'admin',
type: 'subscriber'
});


var b6 = new User({
name: 'subscriber6',
login: 'subscriber6',
password: 'subscriber6',
role: 'admin',
type: 'subscriber'
});


var b7 = new User({
name: 'subscriber7',
login: 'subscriber7',
password: 'subscriber7',
role: 'admin',
type: 'subscriber'
});

var b8 = new User({
name: 'subscriber8',
login: 'subscriber8',
password: 'subscriber8',
role: 'admin',
type: 'subscriber'
});

var b9 = new User({
name: 'subscriber9',
login: 'subscriber9',
password: 'subscriber9',
role: 'admin',
type: 'subscriber'
});

var b10 = new User({
name: 'subscriber10',
login: 'subscriber10',
password: 'subscriber10',
role: 'admin',
type: 'subscriber'
});
//Ignore errors. In this case, the errors will be for duplicate keys as we run this app more than once.
u1.save();
b1.save();
b2.save();
b3.save();
b4.save();
b5.save();
b6.save();
b7.save();
b8.save();
b9.save();
b10.save();
},
serialize: function(user, done) {
		   done(null, user.id);
	   },
deserialize: function(id, done) {
		     User.findOne({
_id: id
}, function(err, user) {
done(null, user);
});
}
};
};

module.exports = UserLibrary;
