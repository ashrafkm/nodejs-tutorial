var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectid = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('customer');
});

// GET list of customers
router.get('/list', function(req, res, next) {
    res.render('list');
});

// VIEW
router.get('/view', function(req, res, next) {
    res.render('view');
});


// INSERT customer
router.get('/add', function(req, res, next) {
    res.render('addcustomer');
});



router.get('/edit', function(req, res, next) {
    res.render('customeredit');
});

module.exports = router;