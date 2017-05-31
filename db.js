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
                console.log(result[i]);
                menus[val["_id"]] = val["name"]
            }
            res.render('index', {title: 'Pizzeria', values: menus});
        });
    },

    sendVal : function(val, res) {
        var request = new Values({name: "nom test"});
        request.save(function (err, result) {
            if (err) {
                console.log(err);
                res.send(JSON.stringify({status: "error", value: "Error, db request failed"}));
                return
            }
            res.status(201).send(JSON.stringify({status: "ok", value: result["value"], id: result["_id"]}));
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
