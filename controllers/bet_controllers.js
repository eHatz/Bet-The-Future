//Dependencies
var express = require('express');
var methodO = require('method-override');
var bodyParse = require('body-parser');
var router = express.Router();

var app = express();
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
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

router.get('/home', function(req, res) {
	if (!req.isAuthenticated()) {
		req.session.error = 'Please sign in!';
		res.redirect('/');
		return false;
	};
	models.Bet.findAll({}).then(function(single_bet) {
		models.User.findOne({ where: {id: req.user.id}}).then(function(user) {
			user.getFriends().then(function(allFriends) {
				console.log('THIS IS MY FRIENDS ID', allFriends[0].id)
				res.render('home', {
				bet: single_bet,
				friends: allFriends
			})
			})
		})

		// req.user.getFriends().then(function(friends){

		// })
	}).catch(function(err){
		if(err){
			throw err;
		}
	})
});
//====================SEARCH GET===========================
router.get('/search-users', function(req, res) {
	var friends = []
	res.render('friends', friends);
})
router.post('/search-users', function (req, res) {
	res.redirect('/search-users/' + req.body.userName)
});

router.get('/search-users/:userName', function (req, res) {

	models.User.findAll({ where: {UserName: req.params.userName}}).then(function(results) {
		var searchResult = {
			UserName: []
		};
		for (var i = 0; i < results.length; i++) {
			var users = {
				FirstName: results[i].FirstName,
				LastName: results[i].LastName,
				UserName: results[i].UserName,
				ImageLink: results[i].ImageLink,
				id: results[i].id
			};
			searchResult.UserName.push(users)
		};
		res.render('friends', searchResult)
	}).catch(function(err){
		if(err){
			throw err;
		}
	})

});

router.post('/add-friend/:id', function(req,res) {
	models.User.findOne({where: {id: req.user.id} }).then(function(user) {
		
		models.User.findOne({where: {id: req.params.id} }).then(function(friend) {
			return user.addFriend(friend);
		})
	}).then(function() {
		res.redirect('/search-users');
	}).catch(function(err) {
		throw err;
	})
});
 
//====================PROFILE GET==========================
// router.get('/home', function(req, res) {
// 	if (req.isAuthenticated()){
// 		models.Bet.findAll({}).then(function(single_bet) {
// 			// req.user.getFriends().then(function(friends){
// 				res.render('home', {
// 					bet: single_bet,
// 					// friends: friends
// 				})	
// 			// })
// 		}).catch(function(err){
// 			if(err){
// 				throw err;
// 			}
// 		})
// 	}else{
// 		console.log("else");
// 		req.session.error = 'Please sign in!';
// 		res.redirect('/');
// 	}
// });
router.get('/profile', function(req, res) {
	if (req.isAuthenticated()){
		models.User.findOne({where: {id: req.user.id}}).then(function(user_info) {
		res.render('profile', {
			user: user_info
			})
		console.log(user_info);
		}).catch(function(err){
			if(err){
				throw err;
			}
		}) 
	}else{
		console.log("else");
		req.session.error = 'Please sign in!';
		res.redirect('/');
	}
});

//====================FRIEND GET========================

router.get('/friends', function(req, res){
	if (req.isAuthenticated()){
		res.render('friends');
	}else{
		console.log("else");
		req.session.error = 'Please sign in!';
		res.redirect('/');
	}
});

//=====================SIGNUP POST=========================
router.post('/signUp', function(req, res) {
	models.User.create({
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