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

        return done(null, user[0]);
      })
    }
    else {
      console.log('User found');
      return done(null, user[0]);
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
