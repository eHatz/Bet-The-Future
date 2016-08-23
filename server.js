//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./controllers/bet_controllers.js');
var models = require('./models');
var User = models.Users; //correct?

var app = express();
var router = express.Router();

//Middleware
app.use(express.session({ secret: 'dromedary_Stampede' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(methodOverride('_method'));

app.use(bodyParser.json());

//Startup
app.use('/', routes);

var port = 3000;
app.listen(port, function() {
    console.log("app is listening");
});

/////////// PASSPORT \\\\\\\\\\\\

/*Notes


*/

passport.use(new LocalStrategy(
  function(loginUser, loginPassword, done) {
    User.findOne({username: loginUser}, function (err, user) {
    	if (err){
    		return done(err); 
    	}
    	if (!user){
        	return done(null, false, {message: 'Incorrect username.'});
      	}
     	if (!user.validPassword(loginPassword)){
        	return done(null, false, { message: 'Incorrect password.' });
      	}
      	//Successful, login
    	return done(null, user);
    });
  }
));

// //First option: Authentication with a plain callback function
// app.post('/login', 
// 	passport.authenticate('local'),
// 	function(request, response){
// 		// If this function gets called, authentication was successful.
// 		console.log(response.user)
// 		//response.redirect('/users/' + request.user.username);
// 	}
// );

//Authentication with an object to handle redirecting
app.post('/login',
	passport.authenticate('local',{ 
		successRedirect: '/home',
		failureRedirect: '/login' 
	})
);


