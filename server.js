var express = require('express');
var app = express();

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('db/flowers2019.db');

app.use(express.static(__dirname + '/public'));

// display all flowers
app.get('/flowers/', function(request, response) {
	db.all('SELECT * FROM flowers', function(err, rows) {
		if(err) {
			console.log("Error: " + err);
		}
		else {
			response.send(rows);
		}
	});
});

// filter flowers
app.get('/flowers/*', function(request, response) {
	db.all('SELECT * FROM flowers WHERE comname LIKE \'%' + (request.url.substring(request.url.lastIndexOf('/') + 1)).replace(/%20/g, ' ') + '%\';', function(err, rows) {
		if(err) {
			console.log("Error: " + err);
		}
		else {
			response.send(rows);
		}
	});
});

// display all sightings
app.get('/sightings/', function(request, response) {
	db.all('SELECT * FROM sightings', function(err, rows) {
		if(err) {
			console.log("Error: " + err);
		}
		else {
			response.send(rows);
		}
	});
});

// filter sightings
app.get('/sightings/*', function(request, response) {
	db.all('SELECT * FROM sightings, flowers WHERE comname = name AND comname LIKE \'%' + (request.url.substring(request.url.lastIndexOf('/') + 1)).replace(/%20/g, ' ') + '%\' ORDER BY sighted DESC LIMIT 10;', function(err, rows) {
		if(err) {
			console.log("Error: " + err);
		}
		else {
			response.send(rows);
		}
	});
});

// insert a new sighting
app.get('/insert/*', function(request, response) {
	var cols = ((request.url.substring(request.url.lastIndexOf('/') + 1))).split("_");
	//console.log(cols[0]);
	db.run(`INSERT INTO sightings(name,person,location,sighted) VALUES(?,?,?,?)`, [cols[0].replace(/%20/g, ' '), cols[1].replace(/%20/g, ' '), cols[2].replace(/%20/g, ' '), cols[3].replace(/%20/g, ' ')], function(err) {
		if (err) {
			return console.log(err.message);
		}
		console.log(`A row has been inserted with rowid ${this.lastID}`);
	});
});

// home page fail safe
app.get('/*', function(request, response) {
	response.sendFile('public/app.html', {root: __dirname })
});

// anticipate a reason to post UNUSED
app.post('/', function(request, response){
	response.send('My App');
});

// start server
var port = 3000;
app.listen(port, function() {
	console.log("http://localhost:" + port + "/");
});