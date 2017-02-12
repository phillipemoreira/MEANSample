var http = require('http');
var htmlToText = require('html-to-text');
var path = require('path');

var server = http.createServer(function(req, res){
	if (req.method == 'GET'){

		res.writeHead('200', {'Content-Type' : 'text/plain'});
		
		htmlToText.fromFile(path.join(__dirname, 'client/index.html'), {
		    //tables: ['#invoice', '.address']
		}, (err, text) => {
		    if (err) return console.error(err);
		    console.log(text);
		    res.write(text);
		    res.end();
		});
	}
});

server.listen(3000);
console.log("Contact-list app running in port 3000.");