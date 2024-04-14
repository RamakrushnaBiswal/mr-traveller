var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc').Strategy;
var router = express.Router()
const { User, FederatedCredentials } = require('../models/googleuser');
// Passport implementation using Mongoose models
passport.use(new GoogleStrategy({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  // callbackURL: 'http://localhost:3000/oauth2/redirect/google',
  callbackURL: 'https://mr-traveller.onrender.com/oauth2/redirect/google',
  scope: ['profile']
}, function verify(issuer, profile, cb) {
  // Check if the user already exists
  User.findOne({ name: profile.displayName })
    .then(user => {
      if (!user) {
        // If user does not exist, create a new user and federated credentials
        const newUser = new User({ name: profile.displayName });
        return newUser.save()
          .then(savedUser => {
            const newFederatedCredentials = new FederatedCredentials({
              user_id: savedUser._id,
              provider: issuer,
              subject: profile.id
            });
            return newFederatedCredentials.save()
              .then(() => cb(null, savedUser))
              .catch(err => cb(err));
          })
          .catch(err => cb(err));
      } else {
        // If user exists, find the federated credentials
        return FederatedCredentials.findOne({ user_id: user._id, provider: issuer, subject: profile.id })
          .then(credentials => {
            if (!credentials) {
              // If federated credentials do not exist, create new credentials
              const newFederatedCredentials = new FederatedCredentials({
                user_id: user._id,
                provider: issuer,
                subject: profile.id
              });
              return newFederatedCredentials.save()
                .then(() => cb(null, user))
                .catch(err => cb(err));
            } else {
              // If federated credentials exist, return the user
              return cb(null, user);
            }
          })
          .catch(err => cb(err));
      }
    })
    .catch(err => cb(err));
}));
  
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

/* GET /login
 *
 * This route prompts the user to log in.
 *
 * The 'login' view renders an HTML page, which contain a button prompting the
 * user to sign in with Google.  When the user clicks this button, a request
 * will be sent to the `GET /login/federated/accounts.google.com` route.
 */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* GET /login/federated/accounts.google.com
 *
 * This route redirects the user to Google, where they will authenticate.
 *
 * Signing in with Google is implemented using OAuth 2.0.  This route initiates
 * an OAuth 2.0 flow by redirecting the user to Google's identity server at
 * 'https://accounts.google.com'.  Once there, Google will authenticate the user
 * and obtain their consent to release identity information to this app.
 *
 * Once Google has completed their interaction with the user, the user will be
 * redirected back to the app at `GET /oauth2/redirect/accounts.google.com`.
 */
router.get('/login/federated/google', passport.authenticate('google'));

/*
    This route completes the authentication sequence when Google redirects the
    user back to the application.  When a new user signs in, a user account is
    automatically created and their Google account is linked.  When an existing
    user returns, they are signed in to their linked account.
*/
router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login'
}));

/* POST /logout
 *
 * This route logs the user out.
 */
router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;