// Dependencies
const 
    bodyParser = require('body-parser'),
    cheerio = require('cheerio'),
    express = require('express'),
    mongoose = require('mongoose'),
    mongojs = require('mongojs'),
    request = require('request'),
    expressHandlebars = require('express-handlebars');

// If deployed, use the deployed database. Otherwise use the local bIScraper database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/bIScraper";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });;

// Hook mongojs configuration to the db variable
var db = require("./models");

// Default PORT to be used
const PORT = 3000;

// Initialize Express
var app = express();

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Retrieve data from the db to be used to populate the home page
app.get("/all", function(req, res) {
    // Find all results from the scrapedData collection in the db
    db.Article.find({})
        .then(function(dbArticle){
            res.json(dbArticle);
        })
        .catch(function(error){
            res.json(error);
        });
});

// Retrieve data from the Business Insider website in order to populate the database
app.get("/info", function(req, res) {
    // Making a request for Business Insider's front page. The page's HTML is passed as the callback's third argument
    request("https://www.businessinsider.com/", function(error, response, html) {
        // Load the html body from request into cheerio
        var $ = cheerio.load(html);

        // With cheerio, find each p-tag with the "title" class
        // (i: iterator. element: the current element)
        $("a.title").each(function(i, element) {

            // Save elements to an object.
            var title = $(element).text();
            var link = $(element).attr("href");
            var img = $(element).parent().parent().find("img").attr("src");

            var result = {
                title: title,
                link: link,
                img: img
            }
  
            // If this found element had both a title and a link
            if (img != undefined) {
                // Insert the data in the scrapedData db
                db.Article.create(result)
                    .then(function(dbArticle){
                        console.log(dbArticle);
                    })
                    .catch(function(error){
                        return res.json(error);
                    });
            }
        });
    });

    // Once the data has been received, go back to the home page
    res.redirect("/");
});

// Grab the specific Article and its data when the headline is clicked
app.get("/all/:id", function(request, response){
    db.Article.findOne({ _id: request.params.id })
        .populate("comment")
        .then(function(dbArticle) {
            response.json(dbArticle);
        })
        .catch(function(error){
            response.json(error);
        });
});

// When the user clicks the submit comment button,
// Add the comment onto the database
app.post("/all/:id", function(request, response){
    db.Comment.create(request.body)
        .then(function(dbComment){
            return db.Article.findOneAndUpdate(
                { _id : request.params.id },
                { $push: { comment: dbComment._id } },
                { new: true }
            )
        })
        .then(function(dbArticle) {
            response.json(dbArticle);
        })
        .catch(function(error){
            response.json(error);
        });
});

// Start the server
app.listen(process.env.PORT || PORT, function() {
  console.log("App running on port " + PORT + "!");
});