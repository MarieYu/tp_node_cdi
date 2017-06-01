/**
 * Created by Marie on 30/05/2017.
 */
var express = require('express');
var mongodb = require('../db');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    mongodb.getVal(res);
});

/* GET add page */
router.get('/add', function(req, res) {
   res.render('add');
});

/* POST ajout d'un plat */
router.post('/send', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var val = req.body;
    if (val === undefined || val === "") {
        res.send(JSON.stringify({status: "error", value: "Value undefined"}));
        return
    }
    mongodb.sendVal(val, res);
});

/* Delete pizza */
router.delete('/pizza/:id', function(req, res) {
    console.log("delete");
    res.setHeader('Content-Type', 'application/json');
    var uuid = req.params.id;
    console.log(req.params.id);
    if (uuid === undefined || uuid === "") {
        res.send(JSON.stringify({status: "error", value: "UUID undefined"}));
        return
    }
    mongodb.delVal(uuid);
    res.send(JSON.stringify({status: "ok", value: uuid}));
});

module.exports = router;