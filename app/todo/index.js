var express = require('express');
var app = express();

module.exports = function(){
	var PORT = process.env.PORT || 3001;

	app.all('/*', function(req, res){
		res.send("\
			<!DOCTYPE html>\
			<html>\
				<head>\
					<title>Mean TODO app</title>\
				</head>\
				<body>\
					<h1>Hello this is the APP</h1>\
				</body>\
			</html>\
			");
	});

	app.listen(PORT, function(){
		console.log("server running on " + PORT);
	});
}
