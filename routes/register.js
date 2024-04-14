const express = require('express');
const UserModel = require('../models/data'); // Renamed variable to UserModel
const router = express.Router();
const csrf = require('csurf');
const body_parser = require('body-parser');
const ensureLogIn = require('connect-ensure-login').ensureLoggedIn;

const ensureLoggedIn = ensureLogIn();

router.use(body_parser.json());
router.use(body_parser.urlencoded({ extended: false }));
router.use(csrf());

router.get('/register', ensureLoggedIn, (req, res) => {
    res.render('register', { csrfToken: req.csrfToken() });
});

router.post('/register', ensureLoggedIn, (req, res) => {
    let data = req.body;
    const newuser = new UserModel(data); // Changed variable name to UserModel
    newuser.save()
        .then(() => {
            res.redirect('/thankyou');
        })
        .catch((err) => {
            console.log(err);
        });
});

// Route to fetch user data and render EJS templat

module.exports = router;
