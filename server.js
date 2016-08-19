var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var sequelize = require('sequelize');

// ********* sync db
// var SeqBurger = require('./models').SeqBurger;
// SeqBurger.sync();
// ******** multiple models
// var Models = require('./models');
// Models.sequelize.sync()
// ********




var app = express();
app.use('/static', express.static('public/assets'));
var port = 3000;
app.use(methodOverride('_method'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));



var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');



app.get('/', function(req, res) {
    SeqBurger.findAll({}).then(function(sq_data) {
        // console.log(sq_data);
        res.render('index', {
            burgers: sq_data  //refers to the burgers in index.handlebars
        })
    }).catch(function(err) {
        if (err) {
            throw err;
        }
    })
});

app.post('/newBurger/create', function(req, res) {
    SeqBurger.create({
        name: req.body.name,
        devoured: false
    }).then(function(sq_response) {
        // console.log(sq_response);
        res.redirect('/')
    }).catch(function(err) {
        throw err;
    })

});



app.put('/update', function(req, res) {
    console.log(req.body.id)

    SeqBurger.findOne({
        where: {
            id: req.body.id,
        }
    }).then(function updateSeqBurger(sq_burger) {
        console.log(sq_burger);
        sq_burger.update({
            devoured: true
        }).then(function(whatever) {
            res.redirect('/');
        });
    });
});

// function that takes the sq_Burger


// function logAndRedirect(updated_SeqBurger) {
//     console.log(updated_SeqBurger);
//     res.redirect('/')
// }

app.delete('/delete', function(req,res){
    SeqBurger.findOne({
        where: {
            id: req.body.id,
        }
    }).then(function deleteBurger(del_burger){
        console.log(del_burger);
        del_burger.destroy({
            devoured:true
        }).then(function(another_arg){
            res.redirect('/');
        });
    });
});

app.listen(port, function() {
    console.log("app is listening");
})