var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactList',['contactList']);
var bodyParser = require('body-parser');
var fs = require('fs');

module.exports = function(){
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
		
		db.contactList.insert(req.body, function(err, doc){
			res.json(doc);
		});
		
	});

	// Updating existing contact
	app.put('/contactlist/:id', function(req, res) {
		console.log("I received a PUT request");
		console.log(req.body.name);
		
		var id = req.params.id;
		db.contactList.findAndModify({query: {_id : mongojs.ObjectId(id)},
			update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}}, 
			new: true}, function(err, doc){
				res.json(doc);
			});	
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

	// Database initialization
	function initializeDB() {
		db.runCommand({listCollections: 1}, function(err, res){
			if (res.cursor.firstBatch.length == 0){
				populateDB();
			}
		});
	};

	function populateDB(argument) {
		console.log('populating database with contacts.' );
		
		var contacts = JSON.parse(fs.readFileSync('./dummy-contacts/contacts.json', 'utf8'));
		
		contacts.forEach(function(element, index) {
			insertContacts(element, index, contacts.length - 1);
		});
	}

	function insertContacts(element, index, numberOfContacts){
		db.contactList.findOne({"name": element.name}, function(err, docs){
			if (!docs){
				db.contactList.insert(element, function(err, doc){
					if (err) throw err;
					
					if (index == numberOfContacts){
						console.log(index + 1 + ' contacts inserted.');
					}
				});			
			}
		});
	}

	app.listen(3000);
	initializeDB();
	console.log("Server running in port 3000.");
}


