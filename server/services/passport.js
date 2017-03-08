// PASSPORT //
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

// APP //
var app = require('./../index');
var db = app.get('db');

// CONFIG //
var config = require('./../config');

// RUN WHEN LOGGING IN //
passport.use(new Auth0Strategy(config.AUTH_CONFIG, function(accessToken, refreshToken, extraParams, profile, done) {
  db.user.read_email([profile.emails[0].value], function(err, user) {

    user = user[0];

    // Is there an error?
    if (err) {
      return done(err);
    }

    // Does the user not exist?
    else if (!user) {

      // Is there a name or do I need a placeholder name?
      if (!profile.name.givenName)
        profile.name = {
          givenName: profile.displayName,
          familyName: null
        };

      // Create user.
      db.user.insert([profile.name.givenName, profile.name.familyName, profile.emails[0].value], function(err, user) {
        if (err) {
          console.log('user creation err: ', err);

          return done(err);
        }

        // Create Order
        db.order.insert([user[0].user_id], function(err, order) {
          if (err) {
            console.log('DB Create, durring user create: ', err);
          }

          user[0].order_id = order[0].id;
          return done(null, user[0]);
        });
      });
    }

    // Can and does the username need to be updated?
    else if (!user.name_last && profile.name.familyName) {

      // Change name
      user.name_first = profile.name.givenName;
      user.name_last = profile.name.familyName;

      // Update user
      db.users.save(user, function(err, updatedUser) {
        if (err) {
          console.log('User update error on login', err);

          return done(err);
        }

        // Find the users order
        findOrder(updatedUser);
      });
    }

    // User found and does not require update
    else {
      findOrder(user);
    }

    // Find users order
    function findOrder(user) {
      db.order.read_incomplete([user.user_id], function(err, order) {
        if (err) {
          console.log("Find User Auth, Order not found", err);

          done(err);
        }

        user.order_id = order[0].order_id;
        return done(null, user);
      });
    }
  });
}));

// Puts the user on the session
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
	done(null, user);
});

module.exports = passport;
