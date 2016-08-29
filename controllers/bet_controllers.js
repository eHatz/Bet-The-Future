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
	if (req.isAuthenticated()) {
		req.session.error = 'Please sign in!';
		res.redirect('/home');
		return false;
	};

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

	models.User.findOne({ where: {id: req.user.id} }).then(function(user) {
		user.getFriends().then(function(allFriends) {
			user.getBets().then(function(userBets) {
				var betReferee = [];
				var userBetArr = [];				
				for (var i = 0; i < userBets.length; i++) {
					if (userBets[i].referee === user.UserName) {
						betReferee.push(userBets[i]);
					} else {
						userBetArr.push(userBets[i]);
					};
				};
				res.render('home', {
					bet: userBetArr,
					ref: betReferee,
					friends: allFriends,
					user:user
				})
			})	
		})
	}).catch(function(err){
		if(err){
			throw err;
		}
	})
});

//====================SEARCH USERS TO GET SOME FRIENDS===========================
// router.get('/search-users', function(req, res) {
// 	if (!req.isAuthenticated()) {
// 		req.session.error = 'Please sign in!';
// 		res.redirect('/');
// 		return false;
// 	};
// 	var friends = []
// 	res.render('search_users', friends);
// })
router.post('/search-users', function (req, res) {
	res.redirect('/search-users/' + req.body.userName)
});

//===========================================================
router.get('/search-users/:userName', function (req, res) {
	if (!req.isAuthenticated()) {
		req.session.error = 'Please sign in!';
		res.redirect('/');
		return false;
	};
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
		res.render('search_users', searchResult)

	}).catch(function(err){

		if(err){
			throw err;
		}
	})

});
//=====================GET FRIENDS==========================
router.post('/add-friend/:id', function(req,res) {

	models.User.findOne({where: {id: req.user.id} }).then(function(user) {
		
		models.User.findOne({where: {id: req.params.id} }).then(function(friend) {
			return user.addFriend(friend);
		})
	}).then(function() {
		res.redirect('/home');
	}).catch(function(err) {
		throw err;
	})

});

//=====================GET PROFILE==========================
router.get('/profile', function(req, res) {
    if (!req.isAuthenticated()) {
        req.session.error = 'Please sign in!';
        res.redirect('/');
        return false;
    };
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
});



//=====================SIGNUP POST=========================
router.post('/signUp', function(req, res) {
	var newName = req.body.userName;
	var newEmail = req.body.email;
	console.log(newName, newEmail);
		models.User.findAll({ 
			//Check for email and username in the DB
			where: sequelize.or(
				{UserName: newName},
				{Email: newEmail}
			)
		}).then(function(data){
			//Grab incoming matched username and email, if any
			var dataName = data[0].dataValues.UserName;
			var dataEmail = data[0].dataValues.Email;
			console.log(dataName, dataEmail);
			//redirect to signup if email or username matches
			if (dataName === newName){
				console.log("That Username is already in use");
				res.redirect("/signUp");
			}else if (dataEmail === newEmail){
				console.log("That email is already in use");
				res.redirect("/signUp");
			}else{
			//Otherwise, continue adding the user
				models.User.create({
					FirstName: req.body.firstName,
					LastName: req.body.lastName,
					Email: newEmail,
					UserName: newName,
					Password: req.body.password,
					ImageLink: req.body.image
				}).then(function() {
					res.redirect('/');
				}).catch(function(err){
					throw err;
				});
			}
		})	
	})

//=====================HOME POST========================
router.post('/create-bet', function(req, res){
	models.User.findOne({ where: {id: parseInt(req.body.participant)} }).then(function(secondPlayer) {
		console.log(secondPlayer);
		models.Bet.create({
			adminPlayer:req.user.UserName,
			adminImageLink: req.user.ImageLink,
			prediction: req.body.prediction,
			challenge: req.body.challenge,
			secondPlayer: secondPlayer.UserName,
			referee: req.body.referee,
			pending: true,
			price:req.body.wager,
			judgmentDay: req.body.judgementDay

		}).then(function(group) {
			var playersSelected = req.body.participant;
			//checkbox allows more than one user but if only one is selcted the data type is number not array
			if (typeof playersSelected === 'string') {
				playersSelected = [req.body.participant];
			} else {
				playersSelected = req.body.participant;
			};

			playersSelected.push((req.user.id).toString()); //adds owner to array in order to add to associaion
			return group.addUsers(playersSelected);

		}).then(function() {
			res.redirect('/home');
		}).catch(function(err) {
			throw err;
		})
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