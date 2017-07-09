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
    // var id = req.body.id;
    /*mongodb.connect(url, function(err, db) {
        db.collection('users').find({ _id: objectid(req.params.id) }).toArray((err, result) => {
            if (err) return console.log(err);
            res.send(result);
            // res.render('userlist', { users: result });
        });
    });*/
});

// VIEW
router.get('/list:id', function(req, res, next) {
    res.render('addcustomer');
});


// INSERT customer
router.get('/add', function(req, res, next) {
    res.render('addcustomer');
});



router.get('/edit', function(req, res, next) {
    res.render('customeredit');
});

module.exports = router;