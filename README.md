# BusinessInsiderScraper

http://business-insider-scraper.herokuapp.com/

![Home Page](https://user-images.githubusercontent.com/8729300/46429948-b0d83480-c715-11e8-8ec1-0659be8e3fbd.png)

An open platform for individuals to look at Business Insider Articles and comment freely on them.

### GETTING STARTED

#### BUILT-WITH

```
  Languages and Database :
  
  JAVASCRIPT
  JQUERY
  HTML / CSS / MINI CSS
  MONGODB
  
  Node Packages :
 
  body-parser : parse incoming request bodies in a middleware before your handlers, available under the req.body property
  cheerio : fast, flexible & lean implementation of core jQuery designed specifically for the server
  dotenv : a zero-dependency module that loads environment variables from a .env file into process.env
  express : fast, unopinionated, minimalist web framework for node
  mongoose : a MongoDB object modeling tool designed to work in an asynchronous environment
  request : designed to be the simplest way possible to make http calls
```

##### SAMPLE DATA

All articles are received using cheerio to fit the following schema/format :

```json
articleObject {
  title : TITLE-OF-ARTICLE,
  link : LINK-TO-ARTICLE,
  image : IMAGE-LINK,
  comment : [{
    name : NAME-OF-PERSON,
    comment : PERSONS-COMMENT
  }]
}
```

### WEBSITE / IMAGES

#### HOME PAGE

The Home Page contains a bunch of scraped articles from Business Insider. In order to receive the articles at first, the "Get Articles" button on the navigation bar calls a Request call and appends new articles onto the page that each dropdown for more information.

![Home Page](https://user-images.githubusercontent.com/8729300/46429948-b0d83480-c715-11e8-8ec1-0659be8e3fbd.png)

#### COMMENTS

Dropdowns for articles contain the links to the articles as well as a list of comments that users are able to freely write on and view later.

![Comments](https://user-images.githubusercontent.com/8729300/46429961-ba619c80-c715-11e8-9d95-2ad43092d7d3.png)

### TODO / BUGS
