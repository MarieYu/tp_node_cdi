var mongoose = require('mongoose');
var pug = require('pug');
var schema = mongoose.Schema({
    name: String,
    type: String,
    recipe: Array,
    price: Number
    },
    {collection : 'menu'});

var Menus = mongoose.model('menu', schema);

module.exports = {
    connectDB : function() {
		// Connect to Mongo DB
		mongoose.connect('mongodb://localhost/pizza'); // local
    },

    getVal : function(res) {
        Menus.find(function(err, result) {
            if (err) {
                console.log(err);
                res.send('database error');
                return
            }
            var menus = {};
            for (var i in result) {
                var val = result[i];
                menus[val["_id"]] = {id: val["_id"], name: val["name"], type: val["type"], recipe: val["recipe"], price: val["price"]};
            }
            res.render('index', {title: 'Pizzeria', values: menus});
        });
    },

    sendVal : function(val, res) {
        console.log("sendVal");
        console.log(val);
        var request = new Menus({id: val["_id"], name: val['name'], type: val["type"], recipe: val["recipe"].split(","), price: val["price"]});
        request.save(function (err, result) {
            if (err) {
                console.log(err);
                res.send(JSON.stringify({status: "error", value: "Error, db request failed"}));
                return
            }
            var html = pug.renderFile('views/new-element.pug', {result: result});
            res.json({html: html});
        });
    },

    delVal : function(id, res) {
        console.log("delVal");
        Menus.remove({_id: id}, function(err) {
            if (err) {
                console.log(err);
            }
            res.json({_id: id})
        });
    }
};
