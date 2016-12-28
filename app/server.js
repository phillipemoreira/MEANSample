var express = require('express');
var app = express();

app.use(express.static(__dirname + "/client"));

app.get('/contactlist', function(req, res) {
	console.log("I received a GET request.");
	
	//Dummy data
	person1 = {
		name : 'Tim',
		email : 'tim@gmail.com',
		number: '(222) 222-2222'
	};
	
	person2 = {
		name : 'Gloria',
		email : 'gloria@gmail.com',
		number: '(333) 333-3333'
	};
	
	person3 = {
		name : 'John',
		email : 'john@gmail.com',
		number: '(444) 444-4444'
	};
	
	var contactList = [person1, person2, person3];
	res.json(contactList);
});

app.listen(3000);
console.log("Server running in port 3000");