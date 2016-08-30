//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');
var cookieParser = require('cookie-parser');

//Passport dependencies
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

var routes = require('./controllers/bet_controllers.js');
var models = require('./models');


var User = models.User; //correct?

var User = models.Users; //correct?

//================FIND ONE==============
// User.findOne().then(function(userArray){
//   console.log(userArray);
 
// });
//================FIND ALL==================
// models.Bet.findAll().then(function(betArray){
//   console.log(betArray);
// });
//===========================================



var User = models.User; 


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
app.use(session({ secret: 'dromedary_Stampede' }));
app.use(passport.initialize());
app.use(passport.session());

//Startup
app.use('/', routes);

var PORT = process.env.PORT || 3306;

app.listen(PORT, function() {
    console.log("app is listening on port ", PORT);
});

/////////// PASSPORT \\\\\\\\\\\\

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

module.exports = passport.use("loginStrategy", new LocalStrategy(
  function(loginUser, loginPassword, done) {
    User.findOne({where: {UserName: loginUser}}).then(function(user){
    	if (!user){
        	return done(null, false, {message: 'Incorrect username.'});
      	}
     	if (!user.Password === loginPassword){
        	return done(null, false, {message: 'Incorrect password.' });
      	}
      	//Successful login
      console.log("userID console: ", user.id)
    	return done(null, user);
    });
  }
));


