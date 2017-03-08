// APP //
var app = require('./../index');
var db = app.get('db');

module.exports = {
	// RETURN CURRENT USER //
	me: function(req, res, next) {
		if (!req.user) {
			return res.status(200).send(null);
		}
		// Return user
		return res.status(200).send(req.user);
	},

	update_current: function(req, res, next) {
		console.log('Starting update');

		var updateUser = req.body;
		updateUser.id = req.user.id;
		db.users.save(updateUser, function(err, user) {
			if (err) {
				console.log('User update error', err);

				return res.status(409).send(err);
			}

			req.user = user;

			res.status(200).send(user);
		});
	}
};
