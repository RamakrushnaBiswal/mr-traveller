const express = require('express');
const { Data, User } = require('../models/data'); // Renamed variable to UserModel
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
    const newuser = new Data(data);
    newuser.save()
        .then(() => {
            res.redirect('/thankyou');
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get('/booking', ensureLoggedIn, async (req, res) => {
    try {
        const users = await User.find();
        const data = await Data.find();
        const csrfToken = req.csrfToken();

        const userUuidMap = new Map();
        users.forEach(user => userUuidMap.set(user.uuid, user));
        const userData = data.filter(dataItem => userUuidMap.has(dataItem.uuid));

        res.render('booking', { userData: userData,csrfToken: csrfToken });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
// router.delete('/booking/:uuid', ensureLoggedIn, async (req, res) => {
//     try {
//         const { uuid } = req.params;
//         // Delete the data associated with the given UUID
//         await Data.deleteMany({ uuid: uuid });

//         // Redirect to the booking page after deletion
//         res.redirect('/booking');

//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

module.exports = router;
