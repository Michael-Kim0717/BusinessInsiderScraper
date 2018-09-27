$(document).ready(function(){

    // Grab the headlines and images as a json
    $.getJSON("/all", function(data) {
        for (var i = 0; i < data.length; i++) {
            if (i == 0){
                $(".collapse").append(
                    "<input type='radio' id=" + data[i]._id + " checked aria-hidden='true' name='articleAcc'>"
                );
            }
            else {
                $(".collapse").append(
                    "<input type='radio' id=" + data[i]._id + " aria-hidden='true' name='articleAcc'>"
                );
            }
            $(".collapse").append(
                "<label for=" + data[i]._id + " aria-hidden='true'> <b>" + data[i].title + " </b> </label>" +
                "<div>" +
                    "<p> Link to Article : " + 
                        "<a href=" + data[i].link + " target='_blank'> Link </a>" + 
                    "</p>" +
                    "<p> Jump to Comments : " + 
                        "<a href=" + "#" + "> Comments </a>" +
                    "</p>" +
                    "<img src=" + data[i].img + " class='articleImg'>" +
                    "<input type='text' placeholder='Name'> <br>" +
                    "<textarea> </textarea>" +
                    "<button class='btn'> Submit Comment </button>" +
                    "<div class=" + "comments" + data[i]._id + ">" +
                        "<h3> Comments : </h3>" +
                    "</div>" +
                "</div>"
            );
        }
    });

    if (window.location.href == "/info"){
        alert("hello");
        setTimeout(function(){
            window.location.href = "/";
        }, 2000);
    }

});