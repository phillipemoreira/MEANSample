var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactList',['contactList']);
var bodyParser = require('body-parser');


app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());

app.get('/contactlist', function(req, res) {
	console.log("I received a GET request.");
	
	db.contactList.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});
	
});

app.post('/contactlist', function(req, res) {
	console.log("I received a POST request");
	console.log(req.body);
	
	db.contactList.insert(req.body, function(err, doc){
		res.json(doc);
	});
	
});

app.listen(3000);
console.log("Server running in port 3000");