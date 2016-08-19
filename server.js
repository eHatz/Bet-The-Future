var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var sequelize = require('sequelize');
var routes = require('./controllers/bet_controllers.js');

var app = express();
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