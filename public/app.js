// Grab the headlines and images as a json
$.getJSON("/all", function(data) {
    // For each one
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + data[i]._id + "'> <img src=" + data[i].img + "> <br />" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});
  