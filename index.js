require("dotenv").config();
const express = require("express");
var createError = require("http-errors");
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var csrf = require('csurf');
var passport = require('passport');
const app = express();
const port = 3000;
require("./dbconnection"); //db connection
const homeRouter = require("./routes/home");
var SQLiteStore = require('connect-sqlite3')(session);
var authRouter = require('./routes/auth');
const registerRouter = require('./routes/register');


//middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));
app.locals.pluralize = require('pluralize');

app.use(session({
    secret: process.env['SESSION_SECRET'],
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' }),
    //add cokkie for 24 hrs
    cookie: { maxAge: 24 * 60 * 60 * 1000 },// 24 hrs
    httponly: true,
    unset: 'destroy'
  }));
  app.use(csrf());
  app.use(passport.authenticate('session'));
  app.use(function(req, res, next) {
    var msgs = req.session.messages || [];
    res.locals.messages = msgs;
    res.locals.hasMessages = !! msgs.length;
    req.session.messages = [];
    next();
  });
  app.use(function(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
  });

//routes
app.use("/", homeRouter);
app.use("/", authRouter);
app.use("/", registerRouter);
app.use("/", require("./routes/payment"));



//error handlers
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () =>
  console.log(`Mr-traveller app listening on port ${port}!`)
);
