// setup the code to connect Node to MySQL.

// Export the connection.
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'BetApp_db'
});

connection.connect(function(err) {
	if (err) {
		return console.error('error connecting: ' + err);
	};

	console.log('connected as id ' + connection.threadId);

})

module.exports.connection = connection;