'use strict';


var IndexModel = require('../models/index'),
    ProfileModel = require('../models/profile'),
    AdminModel = require('../models/admin'),
    auth = require('../lib/auth');
var db = require('../DB/operations')();

module.exports = function (router) {

    var indexmodel = new IndexModel();
    var profilemodel = new ProfileModel();
    var adminmodel = new AdminModel();


    router.get('/', function (req, res) {
        res.render('index', indexmodel);
    });


    router.get('/details', function(req, res) {

	 db(function(rows){
                var model1 = {
                        rows:rows
                };
                res.render('table', model1);
        });

    });


    router.get('/admin', function(req, res) {
        res.render('admin', adminmodel);
    });

    /**
     * Allow the users to log out
     */
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/login');
    });

};
