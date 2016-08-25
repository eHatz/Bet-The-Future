//Dependencies
var express = require('express');
var methodO = require('method-override');
var bodyParse = require('body-parser');
var router = express.Router();
var passport = require("passport");
var models = require('../models');

//Passport dependencies
var cookieParser = require('cookie-parser');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var models = require('../models');
var User = models.Users; 

//Passport middleware
app.use(cookieParser())
app.use(session({ secret: 'dromedary_Stampede' }));
app.use(passport.initialize());
app.use(passport.session());

//Routes
router.get('/', function (req, res) {
	res.render('login');
});

router.get('/signup', function(req, res) {
	res.render('signup'); // uses signup.handlebars
});

router.get('/home', function(req, res) {
	if (req.isAuthenticated()){
		models.Bet.findAll({}).then(function(single_bet) {
			res.render('home', {
				bet: single_bet
			})
		}).catch(function(err){
			if(err){
				throw err;
			}
		})
	}
	else{
		req.session.error = 'Please sign in!';
		console.log(req.session.error);
		res.redirect('/');
	}
});

router.get('/profile', function(req, res) {
	res.render('profile'); //uses login.handlebars
});

router.post('/signUp', function(req, res) {

	models.Users.create({
		FirstName: req.body.firstName,
		LastName: req.body.lastName,
		Email: req.body.email,
		UserName: req.body.userName,
		Password: req.body.password,
		ImageLink: req.body.image
	}).then(function() {
		res.redirect('/');
	}).catch(function(err) {
		throw err;
	});
});


router.post('/home', function(req, res){
	console.log("request body",req.body);
	console.log("*******************")
	models.Bet.create({
		user:req.body.user,
		prediction: req.body.prediction,
		referee: req.body.referee,
		price:req.body.price,
		judgmentDay: req.body.judgementDay

	}).then(function(bet_response){
		console.log("bet_response",bet_response	);
			console.log("*******************")

		res.redirect('home')
	}).catch(function(err){
		throw err;
	})
});	

//Passport login 
router.post('/login',
	passport.authenticate('loginStrategy',{ 
		successRedirect: '/home',
		failureRedirect: '/' 
	})
);

//Passport logout
router.get('/logout', function(req, res){
	console.log("logged out!");
	req.logout();
	res.redirect('/');
});

/////////// PASSPORT LOGIC\\\\\\\\\\\\

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
    console.log("loginUser: " + loginUser);
    console.log("loginPassword: " + loginPassword);

    User.findOne({where: {UserName: loginUser}}).then(function(user){
      console.log("findOne user: ", user)
      if (!user){
          return done(null, false, {message: 'Incorrect username.'});
        }
      if (!user.Password === loginPassword){
          return done(null, false, {message: 'Incorrect password.' });
        }
        //Successful login
      return done(null, user);
    });
  }
));

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {return next(); }
	req.session.error = 'Please sign in!';
	res.redirect('/');
}

module.exports = router;


