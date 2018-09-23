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
mongoose.connect(MONGODB_URI);

// Configure database
var databaseUrl = "bIScraper";
var collections = ["businessInsider"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Default PORT to be used
const PORT = 3000;

// Initialize Express
var app = express();

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Retrieve data from the db
app.get("/all", function(req, res) {
    // Find all results from the scrapedData collection in the db
    db.businessInsider.find({}, function(error, found) {
        // Throw any errors to the console
        if (error) {
            console.log(error);
        }
        // If there are no errors, send the data to the browser as json
        else {
            res.json(found);
        }
    });
});

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
  
            // If this found element had both a title and a link
            if (img != undefined) {
                // Insert the data in the scrapedData db
                console.log(title + ", " + link);
                db.businessInsider.insert({
                    title: title,
                    link: link,
                    img: img
                },
                function(err, inserted) {
                    if (err) {
                        // Log the error if one is encountered during the query
                        console.log(err);
                    }
                    else {
                        // Otherwise, log the inserted data
                        console.log(inserted);
                    }
                });
            }
        });
    });
  
    // Send a "Scrape Complete" message to the browser
    res.send("Scrape Complete");
});
  

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});