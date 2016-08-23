//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');
var cookieParser = require('cookie-parser');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

//Passport dependencies
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var routes = require('./controllers/bet_controllers.js');
var models = require('./models');
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

app.use(methodOverride('_method'));

app.use(bodyParser.json());

//Passport middleware
app.use(cookieParser())
app.use(express.session({ secret: 'dromedary_Stampede' }));
app.use(passport.initialize());
app.use(passport.session());

//Startup
app.use('/', routes);

var port = 3000;
app.listen(port, function() {
    console.log("app is listening");
});

/////////// PASSPORT \\\\\\\\\\\\

/*Notes


*/

passport.serializeUser(function(user, done) {
  console.log("serializing " + user.username);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});

passport.use("loginStrategy", new LocalStrategy(
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
      	//Successful login
    	return done(null, user);
    });
  }
));

//Passport login authentication
app.post('/login',
	passport.authenticate('loginStrategy',{ 
		successRedirect: '/home',
		failureRedirect: '/login' 
	})
);



