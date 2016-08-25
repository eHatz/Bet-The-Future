//Dependencies
var express = require('express');
var methodO = require('method-override');
var bodyParse = require('body-parser');
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var server = require("../server.js");
var models = require('../models');



//==================LOGIN GET============================
router.get('/', function (req, res) {
	res.render('login');
});

//==================SIGNUP GET=============================
router.get('/signup', function(req, res) {
	res.render('signup'); // uses signup.handlebars
});

//====================HOME GET=============================

// router.get('/home', function(req, res) {
// 	models.Bet.findAll({}).then(function(single_bet) {
// 		res.render('home', {
// 			bet: single_bet
// 		})
// 	}).catch(function(err){
// 		if(err){
// 			throw err;
// 		}
// 	})
// });


router.get('/home', function(req, res) {
	if (req.isAuthenticated()){
		console.log ("server: ", server);
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

//====================PROFILE GET==========================
router.get('/profile', function(req, res) {
	res.render('profile'); //uses login.handlebars
});

//====================FRIEND GET========================

router.get('/friends', function(req, res){

	res.render('friends');
});


//=====================SIGNUP POST=========================
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

//=====================HOME POST========================
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

//=====================PASSPORT========================

//Login 
router.post('/login',
	passport.authenticate('loginStrategy',{ 
		successRedirect: '/home',
		failureRedirect: '/' 
	})
);

//Logout
router.get('/logout', function(req, res){
	console.log("logged out!");
	req.logout();
	res.redirect('/');
});

module.exports = router;


