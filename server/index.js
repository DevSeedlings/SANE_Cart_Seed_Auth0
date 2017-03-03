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

app.use(session({
	secret: config.SESSION_SECRET,
	saveUninitialized: false,
	resave: false
}));



// MASSIVE AND DB SETUP //
var massiveUri = config.MASSIVE_URI;
var massiveServer = massive.connectSync({
	connectionString: massiveUri
});
app.set('db', massiveServer);
var db = app.get('db');

var dbSetup = require('./services/dbSetup');
dbSetup.run();



// SESSION AND PASSPORT //
var passport = require('./services/passport');
app.use(passport.initialize());
app.use(passport.session());

// PASSPORT ENDPOINTS //
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: '/#!/profile',
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
app.get('/api/me', isAuthed, userCtrl.me);
app.put('/api/user/current', isAuthed, userCtrl.update_current);

// ORDER ENDPOINTS //
app.put('/api/order/complete', isAuthed, orderCtrl.complete);
app.get('/api/order', isAuthed, orderCtrl.read);
app.post('/api/order/add', isAuthed, orderCtrl.addToCart);
app.put('/api/order/update/:id', isAuthed, orderCtrl.updateItemInCart);
app.delete('/api/order/delete/:id', isAuthed, orderCtrl.deleteFromCart);

// PODUCTS ENDPOINTS //
app.get('/api/products', productCtrl.read);
app.get('/api/product/:id', productCtrl.read_id);



// CONNECTIONS //
var port = config.PORT;
app.listen(port, function() {
	console.log('Listening on port ' + port);
});
