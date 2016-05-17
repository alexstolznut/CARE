// Node.js Dependencies
const http = require("http");
const path = require("path");

// bug fix 1
var express = require('express');

var handlebars = require("express-handlebars");

var app = express();

var mongoose = require('mongoose');

var router = {
    index: require("./routes/index"),
    message: require("./routes/message"),
    newthread: require("./routes/newthread")
};

var parser = {
    body: require("body-parser")
};

// Database Connection
var db = mongoose.connection;
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/cogs121');
db.on('error', console.error.bind(console, 'Mongo DB Connection Error:'));
db.once('open', function(callback) {
    console.log("Database connected successfully.");
});

// Middleware
app.set("port", process.env.PORT || 3000);
app.engine("html", handlebars());
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "/public")));
app.use(parser.body.urlencoded({ extended: false }));
app.use(parser.body.json());

// Routes
app.get("/forums", router.index.view);
app.get('/newthread', router.newthread.view);
app.post("/message", router.message.send);
app.get("/", function(req, res) {
   res.render('landing', {});
});

app.get('/delphidata', function(req,res){

  var consString = process.env.DATABASE_CONNECTION_URL;

  var query = "SELECT Geography as zip, Total_Cases as totalCasesOfAnxiety FROM public.hhsa_anxiety_hospitalizations_aggr_2010_2012 WHERE Year>"
});

// Start Server
http.createServer(app).listen(app.get("port"), function() {
    console.log("Express server listening on port " + app.get("port"));
});
