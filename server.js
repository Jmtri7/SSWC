var express = require('express');
var app = express();

// routes

app.get('/', function(request, response) {
	response.send('My App');
});

app.get('/flowers', function(request, response) {
	response.send('My App');
});

app.post('/', function(request, response){
	response.send('My App');
});

// start server
var port = 3000;
app.listen(port, function() {
	console.log("http://localhost:" + port + "/");
});