// Node.js Dependencies
const http = require("http");
const path = require("path");
var dotenv = require('dotenv');
var pg = require('pg');
var jsonfile = require('jsonfile');

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');
var models = require("./modelsfacebook");

const MongoStore = require("connect-mongo")(session);
require("dotenv").load();

// bug fix 1
var express = require('express');

var handlebars = require("express-handlebars");

var app = express();

var mongoose = require('mongoose');

var router = {
    index: require("./routes/index"),
    message: require("./routes/message"),
    newthread: require("./routes/newthread"),
    map: require("./routes/map"),
    learnmore: require("./routes/learnmore")
};

var parser = {
    body: require("body-parser"),
    cookie: require("cookie-parser")
};

// Database Connection
var db = mongoose.connection;
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/cogs121');
db.on('error', console.error.bind(console, 'Mongo DB Connection Error:'));
db.once('open', function(callback) {
    console.log("Database connected successfully.");
});


// session middleware
var session_middleware = session({
    key: "session",
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
        mongooseConnection: db
    })
});
app.use(session_middleware);

// Middleware
app.set("port", process.env.PORT || 3000);
app.engine("html", handlebars());
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "/public")));
app.use(parser.body.urlencoded({ extended: false }));
app.use(parser.body.json());

// passport middleware
app.use(parser.body.json());
app.use(require('method-override')());
app.use(session_middleware);
app.use(passport.initialize());
app.use(passport.session());


// facebook
passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: "/auth/facebook/callback",
    },
    function(accessToken, refreshToken, profile, done) {
        // What goes here? Refer to step 4.
        models.User.findOne({
            facebookID: profile.id
        }, function(err, user) {
            // (1) Check if there is an error. If so, return done(err);
            if (err) {
                return done(err);
            }
            if (!user) {
                // (2) since the user is not found, create new user.
                // Refer to Assignment 0 to how create a new instance of a model
                var newUser = new models.User({
                    "facebookID": profile.id,
                    "token": accessToken,
                    "name": profile.displayName
                });
                newUser.save();
                return done(null, profile);
            } else {
              console.log(user);
                process.nextTick(function() {
                    user.facebookID = profile.id;
                    user.token = accessToken;
                    user.name = profile.displayName;
                    user.save();
                    return done(null, profile);
                });
            }
        });
    }));

// Routes

// routes for oauth using Passport
app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/forums',
        failureRedirect: '/'
    }),
    function(req, res) {
        console.log("success")
            // Successful authentication, redirect home.
        res.redirect('/');
    });

app.get("/forums", router.index.view);
app.get('/newthread', router.newthread.view);
app.get('/map', router.map.view);
app.get('/learnmore', router.learnmore.view);
app.post("/message", router.message.send);
app.get("/", function(req, res) {
   res.render('landing', {});
});

app.get('/delphidata', function(req,res){

  var consString = process.env.DATABASE_CONNECTION_URL;

  var query = "SELECT Geography as zip, Total_Cases as totalCasesOfAnxiety FROM public.hhsa_anxiety_hospitalizations_aggr_2010_2012 WHERE Year>"
});

/* Passport serialization here */
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Start Server
http.createServer(app).listen(app.get("port"), function() {
    console.log("Express server listening on port " + app.get("port"));
});
