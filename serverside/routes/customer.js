var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectid = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/crm';

/* GET home page. */
/*router.get('/', function(req, res, next) {
    res.render('customer');
});*/

// To fix CORS. error(No 'Access-Control-Allow-Origin')
router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
});

// INSERT data
router.post('/insert', function(req, res, next) {
    var obj = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    };
    mongodb.connect(url, function(err, db) {
        // assert.equal(null, err);
        db.collection('users').insertOne(obj, function(err, result) {
            // assert.equal(null, err);
            console.log("Inserted successfully");
            db.close();
        });
    });
    var output = {
        "action": "success"
    }
    res.send(output);

    // res.redirect('/tables/data');
});

// GET customer list
router.get('/list', function(req, res, next) {
    // res.render('userlist');
    // var id = req.body.id;
    mongodb.connect(url, function(err, db) {
        db.collection('users').find().toArray((err, result) => {
            if (err) return console.log(err);
            res.send(result);
            // res.render({ users: result });
        });
    });
});

// Delete user
router.delete('/delete/:id', function(req, res, next) {
    var myid = req.params.id;
    mongodb.connect(url, function(err, db) {
        db.collection('users').remove({ _id: objectid(myid) }, function(err, result) {
            console.log("Deleted");
            res.send(result);
        });
    });
});

// Update customer
router.post('/update/:id', function(req, res, next) {
    // console.log(req);
    var id = req.params.id;

    var obj = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    };
    mongodb.connect(url, function(err, db) {
        db.collection('users').update({ _id: objectid(id) }, { $set: obj }, function(err, result) {
            console.log("Updated");
            res.send((err == null) ? { msg: 'updated' } : { msg: err });
        });
    });
});

module.exports = router;