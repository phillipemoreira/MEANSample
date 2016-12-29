var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactList',['contactList']);
var bodyParser = require('body-parser');


app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());

// Listing
app.get('/contactlist', function(req, res) {
	console.log("I received a GET request.");
	
	db.contactList.find(function(err, docs){
		res.json(docs);
	});
	
});

// Listing by id
app.get('/contactlist/:id', function(req, res) {
	console.log("I received a GET request.");
	
	db.contactList.findOne({"_id": mongojs.ObjectId(req.params.id)},function(err, docs){
		res.json(docs);
	});
	
});

// Creating new contact
app.post('/contactlist', function(req, res) {
	console.log("I received a POST request");
	console.log(req.body);
	
	if(req.body._id){
		req.body._id = mongojs.ObjectId(req.body.id);
	}

	db.contactList.insert(req.body, function(err, doc){
		res.json(doc);
	});
	
});

// Updating existing contact
app.put('/contactlist/:id', function(req, res) {
	console.log("I received a PUT request");
	console.log(req.body);
	
	// db.contactList.update("_id": mongojs.ObjectId(req.params.id)}, req.body, function(err, doc){
	// 	res.json(doc);
	// });
	
});

// Deleting contact
app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;

	db.contactList.remove({"_id": mongojs.ObjectId(req.params.id)} , function(err, doc){
		if (err) {
			console.log(err);
			return;
		}

		console.log(id + " deleted");
		res.json(doc);

	});
});

app.listen(3000);
console.log("Server running in port 3000");