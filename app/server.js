var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactList',['contactList']);

app.use(express.static(__dirname + "/client"));

app.get('/contactlist', function(req, res) {
	console.log("I received a GET request.");
	
	db.contactList.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});
	
});

app.listen(3000);
console.log("Server running in port 3000");