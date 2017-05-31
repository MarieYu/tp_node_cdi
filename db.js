var mongoose = require('mongoose');
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
                menus[val["_id"]] = {name: val["name"], type: val["type"], recipe: val["recipe"], price: val["price"]};
            }
            res.render('index', {title: 'Pizzeria', values: menus});
        });
    },

    sendVal : function(val, res) {
        console.log("sendVal");
        var request = new Menus({name: val['title'], type: val["type"], recipe: val["recipe"].split(","), price: val["price"]});
        request.save(function (err, result) {
            if (err) {
                console.log(err);
                res.send(JSON.stringify({status: "error", value: "Error, db request failed"}));
                return
            }
            res.status(201).send(JSON.stringify({status: "ok", result: result }));
            res.render('index');
        });
    },

    delVal : function(id) {
        Values.remove({_id: id}, function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
};
