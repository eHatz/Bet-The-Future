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
var models = require('../models');
var User = models.Users; //correct?

var app = express();
var router = express.Router();


//Middleware
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
app.use(methodOverride('_method'))
app.use(bodyParser.json());

app.use('/', routes);

var port = 3000;
app.listen(port, function() {
    console.log("app is listening");
});

/////////// PASSPORT \\\\\\\\\\\\

/*Notes
we need:
	-passport.initialize() middleware 
	-passport.session() middleware

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
     	if (!user.validPassword(password)){
        	return done(null, false, { message: 'Incorrect password.' });
      	}
      	//Successful, login
    	return done(null, user);
    });
  }
));