var express = require('express');
var methodO = require('method-override');
var bodyParse = require('body-parser');
var router = express.Router();
var models = require('../models');
var passport = 



router.get('/', function (req, res) {
	res.render('login')
});
router.post('/login', function(req, res) {

	models.Users.findAll({ where: {UserName: req.body.username}}).then(function(data) {
		var formPassword = req.body.password;
		if (data.length === 0 || formPassword !== data[0].Password) {
			console.log('invalid Username/Password');
			res.redirect('/');
		} else if (data.length > 0 && formPassword === data[0].Password) {
			console.log('Welcome!');
			res.redirect('/home');
		};
		
	}).catch(function(err) {
		throw err;
	});

});
router.get('/signup', function(req, res) {

	res.render('signup'); // uses signup.handlebars

});

router.get('/home', function(req, res) {
	models.betTable.findAll({}).then(function(single_bet) {
		res.render('home', {
			bet: single_bet
		})
	}).catch(function(err){
		if(err){
			throw err;
		}
	})
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
	console.log(req.body);
	models.betTable.create({
		prediction: req.body.prediction,
		price:req.body.price
	}).then(function(bet_response){
		console.log(bet_response);
		res.redirect('home')
	}).catch(function(err){
		throw err;
	})
});	


module.exports = router;



// app.get('/', function(req, res) {
//     // SeqBurger.findAll({}).then(function(sq_data) {
//     //     // console.log(sq_data);
//     //     res.render('index', {
//     //         burgers: sq_data  //refers to the burgers in index.handlebars
//     //     })
//     // }).catch(function(err) {
//     //     if (err) {
//     //         throw err;
//     //     }
//     // })
//     res.render('signup');

// });

// app.post('/signUp', function(req, res) {
//     // SeqBurger.create({
//     //     name: req.body.name,
//     //     devoured: false
//     // }).then(function(sq_response) {
//     //     // console.log(sq_response);
//     //     res.redirect('/')
//     // }).catch(function(err) {
//     //     throw err;
//     // })
//     users.create({
//         FirstName: req.body.firstName,
//         LastName: req.body.lastName,
//         Email: req.body.email,
//         UserName: req.body.userName,
//         Password: req.body.password,
//         ImageLink: req.body.image
//     }).then(function() {
//         res.redirect('/');
//     }).catch(function(err) {
//         throw err;
//     });

// });



// app.put('/update', function(req, res) {
//     console.log(req.body.id)

//     SeqBurger.findOne({
//         where: {
//             id: req.body.id,
//         }
//     }).then(function updateSeqBurger(sq_burger) {
//         console.log(sq_burger);
//         sq_burger.update({
//             devoured: true
//         }).then(function(whatever) {
//             res.redirect('/');
//         });
//     });
// });

// // function that takes the sq_Burger


// // function logAndRedirect(updated_SeqBurger) {
// //     console.log(updated_SeqBurger);
// //     res.redirect('/')
// // }

// app.delete('/delete', function(req,res){
//     SeqBurger.findOne({
//         where: {
//             id: req.body.id,
//         }
//     }).then(function deleteBurger(del_burger){
//         console.log(del_burger);
//         del_burger.destroy({
//             devoured:true
//         }).then(function(another_arg){
//             res.redirect('/');
//         });
//     });
// });

// app.listen(port, function() {
//     console.log("app is listening");
// })