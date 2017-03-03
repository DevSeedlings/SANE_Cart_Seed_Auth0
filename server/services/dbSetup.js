// APP AND CONFIG REQUIRE //
var app = require('./../index');
var db = app.get('db');
var config = require('./../config');

// ALLOW CONSOLE OUTPUT //
var allowConsoleOutput = config.INITIALIZE_LOG;
var log = function(input) {
	if (allowConsoleOutput) {
		console.log(input);
	}
};

// INITIALIZE FUNCTION //
module.exports = {
	run: function() {
		log('Initializing database');

		db.initialize.tables_initialize(function(err, table) {
			if (err) log('Some tables failed to create');
			else log('Tables successfully initialized');
		});
	}
};
