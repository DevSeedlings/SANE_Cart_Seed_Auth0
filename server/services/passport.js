// PASSPORT //
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

// APP //
var app = require('./../index');
var db = app.get('db');

// CONFIG //
var config = require('./../config');

// RUN WHEN LOGGING IN //
passport.use(new Auth0Strategy(config.authConfig, function(accessToken, refreshToken, extraParams, profile, done) {
  db.user.search_email([profile.displayName], function(err, user) {
    if (err) {
      return done(err);
    }
    else if (!user.length) {
      db.user.create([profile.nickname, profile.displayName], function(err, user) {
        if (err) {
          return done(err);
        }
        console.log('User created');

        db.order.insert([user[0].id], function(err, order) {
          if (err) {
            console.log('DB Create, durring user create: ', err);
          }

          user[0].order_id = order[0].id;
          return done(null, user[0]);
        })
      })
    }
    else {
      console.log('User found');
      db.order.read_incomplete([user[0].id], function(err, order) {
        if (err) {
          return console.log("Find User Auth, Order not found", err);
        }

        console.log('order: ', order);
        user[0].order_id = order[0].id;
        return done(null, user[0]);
      });
    }
  });
}));

// Puts the user on the session
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
  console.log('user: ', user);
	done(null, user);
});

module.exports = passport;
