// dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// models
var Article = require("./models/Article.js");
var Comment = require("./models/Comment.js");
// var db = require("./models");
var db = mongoose.connection;

var PORT = process.env.PORT || 3000;

// express
var app = express();

// middleware
// morgan logger for logging requests
app.use(logger("dev"));
// body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// express.static to serve the public folder as a static directory
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var bumpRouter = require("./controllers/bump-routes.js");
var htmlRouter = require("./controllers/html-routes.js");

app.use("/", htmlRouter);
app.use("/", bumpRouter);

// Connect to the Mongo DB
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/bumps";

mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI);

mongoose.connect("mongodb://localhost/bumps", { useNewUrlParser: true });

db.on("error", function(error) {
    console.log("mongoose error: ", error)
});
db.once("open", function() {
    console.log("mongoose connection successful");
});






// start server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
