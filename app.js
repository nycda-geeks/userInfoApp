// the modules needed for this app
var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser')




// renders a page that displays all your users.
app.set('views', 'src/views'); // views are templates
app.set('view engine', 'jade');
app.use(express.static('src'));
app.use(express.static('../js'));

app.get('/', function(request, response) {
	fs.readFile('./users.json', function(err, data) {
		if (err) {
			console.log(err);
		}

		var parsedData = JSON.parse(data);
		// console.log(parsedData);
		response.render("index", {
			users: parsedData
		});
	});
});

//Create two more routes:
//- route 2: renders a page that displays a form which is your search bar.
//- route 3: takes in the post request from your form, then displays matching 

app.use( bodyParser.json() );      
app.use( bodyParser.urlencoded({    
	extended: true
})); 
app.get('/search', function(request, response){
	response.render('search') // als ik naar /search ga laadt dan de pagina
});

app.post('/searchbar', function(request, response){
 fs.readFile('./users.json', function(err, data) {
 	if (err) {
			console.log(err);
		}
		var parsedData = JSON.parse(data);
		var input = request.body.input;
		var match = [];
		var niets = 0;
		var count = 0;

		for (var i = 0; i < parsedData.length; i++){
			var voornaam = parsedData[i].firstname
			var achternaam = parsedData[i].lastname
			if (voornaam.indexOf(input) >=0 || achternaam.indexOf(input)>=0){
			match.push(voornaam + " " + achternaam);
			count++
				if(count == parsedData.length){
					if (match.length == parsedData.length){
						match = [];
					}
				}
		}
		else {
			count++
			if (count == parsedData.length) {
				if (match.length == 0) {
					match = ["Hahah niks hier sukkel"]
				}
			}
		} 

}

		response.send({match:match});
		console.log(match)

		

		


});
});

app.post('/search', function( request, response){
	fs.readFile('./users.json', function(err, data) {
		var match = [];

		if (err) {
			console.log(err);
		}

		var parsedData = JSON.parse(data);

		console.log('parseddata')
		console.log(parsedData)
		
		var input = request.body.userinput
		for (var i = 0; i < parsedData.length; i++) {
			if (input === parsedData[i].firstname){
			match.push(parsedData[i]);
			}
			if (input === parsedData[i].lastname){
			match.push(parsedData[i]);
			}
	}

		// match = JSON.stringify(match);
		if (match.length == 0){
			console.log("no user found!")
		} else {
		console.log(match[0].firstname)
		console.log(input)
	}
	 response.render('results', {match: match})
	});
});



app.get('/submit-user', function (request, response) {
	response.render("submit", {
	});
});


app.post('/submit-user', function (request, response) {
	var newuser = request.body
	var userList = fs.readFileSync('./users.json')
	var users = JSON.parse (userList)
		users.push (newuser)
	var userJSON = JSON.stringify (users)
		fs.writeFileSync ('./users.json', userJSON)
			response.redirect ('/')
 });
	

var server = app.listen(3000, function() {
	console.log('Example app listening on port: ' + server.address().port);
});