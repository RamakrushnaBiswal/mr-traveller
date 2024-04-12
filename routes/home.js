const express = require('express');
const router = express.Router();
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;

var ensureLoggedIn = ensureLogIn();

router.get('/', function(req, res, next) {
    if (!req.user) { return res.render('index'); }
    next();
  }, function(req, res, next) {
    res.locals.filter = null;
    res.render('home', { user: req.user });
  });

router.get('/about', (req, res) => {
    res.render('about');
});
router.get('/contact', (req, res) => {
    res.render('contact');
});
router.get('/locations',ensureLoggedIn, (req, res) => {
    res.render('location');
});
router.get('/policy', (req, res) => {
    res.render('policy');
});
router.get('/review',ensureLoggedIn, (req, res) => {
    res.render('review');
});
router.get('/thankyou',ensureLoggedIn, (req, res) => {
    res.render('thankyou');
});
router.get('/travel',ensureLoggedIn, (req, res) => {
    res.render('travel');
});
router.get('/total',ensureLoggedIn, (req, res) => {
    res.render('total');
});
router.get('/register',ensureLoggedIn, (req, res) => {
    res.render('register');
});
module.exports = router