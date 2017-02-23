// EXTERNAL MODULES //
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var massive = require('massive');

// CONFIG //
var config = require('./config');

// EXPRESS //
var app = module.exports = express();
app.use(express.static(__dirname + './../dist'));
app.use(bodyParser.json());

// MASSIVE //
var massiveUri = config.MASSIVE_URI;
var massiveServer = massive.connectSync({
	connectionString: massiveUri
});
app.set('db', massiveServer);
var db = app.get('db');

// DB SETUP //
var dbSetup = require('./services/dbSetup');
dbSetup.run();

// SESSION AND PASSPORT //
var passport = require('./services/passport');
app.use(session({
	secret: config.SESSION_SECRET,
	saveUninitialized: false,
	resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

// PASSPORT ENDPOINTS //
app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: '/#!/products',
  failureRedirect: '/#!/'
}));
app.get('/api/logout', function(req, res, next) {
	req.logout();
	return res.status(200)
		.send('logged out');
});

// POLICIES //
var isAuthed = function(req, res, next) {
	if (!req.isAuthenticated()) return res.status(401)
		.send();
	return next();
};

// CONTROLLERS //
var userCtrl = require('./controllers/userCtrl');
var orderCtrl = require('./controllers/orderCtrl');
var productCtrl = require('./controllers/productCtrl');

// USER ENDPOINTS //
app.get('/api/me', userCtrl.me);
app.put('/api/user/current', isAuthed, userCtrl.update);

// ORDER ENDPOINTS //
app.put('/api/order/complete', orderCtrl.complete)
app.get('/api/order', orderCtrl.read);
app.post('/api/order/add', orderCtrl.addToCart);
app.put('/api/order/update/:id', orderCtrl.updateItemInCart);
app.delete('/api/order/delete/:id', orderCtrl.deleteFromCart);

// PODUCTS ENDPOINTS //
app.get('/api/products', productCtrl.read);
// app.post('/api/products', productCtrl.create);
// app.put('/api/products/:id', productCtrl.update);
// app.delete('/api/products/:id', productCtrl.delete);



// CONNECTIONS //
var port = config.PORT;
app.listen(port, function() {
	console.log('Listening on port ' + port);
});
