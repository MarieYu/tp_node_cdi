/**
 * Created by Marie on 30/05/2017.
 */
var express = require('express');
var mongodb = require('../db');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    //res.render('index', { title: 'Pizzeria' });
    mongodb.getVal(res);
});

/* GET add page */
router.get('/add', function(req, res) {
   res.render('add');
});

router.post('/send', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var val = req.body;
    if (val === undefined || val === "") {
        res.send(JSON.stringify({status: "error", value: "Value undefined"}));
        return
    }
    mongodb.sendVal(val, res);
});

/*router.delete('/values/:id', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var uuid = req.params.id;

    if (uuid === undefined || uuid === "") {
        res.send(JSON.stringify({status: "error", value: "UUID undefined"}));
        return
    }
    mongodb.delVal(uuid);
    res.send(JSON.stringify({status: "ok", value: uuid}));
});*/

module.exports = router;