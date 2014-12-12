'use strict';

var IndexModel = require('../models/index'),
    ProfileModel = require('../models/profile'),
    AdminModel = require('../models/admin'),
    auth = require('../lib/auth');
var DB = require('../DB/operations');

var SendMoney  = require('../lib/SendMoney');
var MassPay = require('../lib/massPay');

function alphaOnly(a) {
	    var b = '';
	        for (var i = 0; i < a.length; i++) {
			        if (a[i] >= 'A' && a[i] <= 'z') b += a[i];
				    }
		    return b;
}
module.exports = function (router) {

    var indexmodel = new IndexModel();
    var profilemodel = new ProfileModel();
    var adminmodel = new AdminModel();
	var db = new DB();


    router.get('/', function (req, res) {
        res.render('index', indexmodel);
    });


    router.get('/details', function(req, res) {
	 db.getBuyers(function(rows){
                var model1 = {
                        rows:rows,
			name: req.user.login
                };
		res.render('table', model1);
    });
	 });


    router.get('/admin', function(req, res) {
	db.getDateAndTime(function(rows){	
        res.render('admin', adminmodel);
    });
	});

    /**
     * Allow the users to log out
     */
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/login');
    });

    router.post('/update_time',function(req,res){
		    var date = req.body.date;
		    var time = req.body.time;
		    var merchant = req.user.login;
		    var hour = time.substr(0,time.indexOf(':'));
		    var min = parseInt(time.substr((time.indexOf(":"))+1,2));
		    var ampm = alphaOnly(time);
		    if(ampm == "pm")
		    	hour = parseInt(hour)+12;
			
		    var final_time = hour+":"+min+":00";
		    db.setDateAndTime(date,final_time,merchant,function(){
		    res.redirect('/admin');
				    
				    });
		    
		    });

    router.post('/update_bid',function(req,res) {
                         var bid = req.body.bid_amount;
			 var merchant = req.user.login;
			 db.setbid(bid,merchant,function() {
				 	res.redirect('/details');
				 });

		    });
    router.get('/getsubscribers',function(req,res){
		    db.getBuyers(function(rows){
			    var i=0;
			    var final_data = "<table>";
			    final_data += "<tr><td>ID</td><td>Subsciber Name</td><td>Maximum Bid</td></tr>";
			    for(i=0;i<rows.length;i++)
			    {
			    	final_data += "<tr><td>"+rows[i].id+"</td><td>"+rows[i].email+"</td><td>"+rows[i].Maximum_Bid+"</td></tr>";
			    }
			    final_data += "</table>";
			    res.write(final_data);
			    res.end();
			    });
		    });
    router.get('/sendmoney',function(req,res){
		    var sendMoney = new SendMoney();
		    sendMoney.execute(req.user.login,function(){
			    res.redirect('/details');
			    });
		    
		    });

    router.post('/mass_pay',function(req,res) {
		    //var mass_pay = new MassPay();
		    MassPay.execute(function(response) {
			    	res.redirect('/details');
			    });
		    });
};
