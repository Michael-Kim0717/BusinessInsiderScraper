$(document).ready(function(){

    // Grab the headlines and images as a json
    // Add all received articles into the homepage
    $.getJSON("/all", function(data) {
        for (var i = 0; i < data.length; i++) {
            $(".collapse").append(
                "<input type='radio' class='articleAcc' id=" + data[i]._id + " aria-hidden='true' name='articleAcc'>" +
                "<label for=" + data[i]._id + " aria-hidden='true'> <b>" + data[i].title + " </b> </label>" +
                "<div>" +
                    "<p> Link to Article : " + 
                        "<a href=" + data[i].link + " target='_blank'> Link </a>" + 
                    "</p>" +
                    "<p> Jump to Comments : " + 
                        "<a href=" + "#" + "> Comments </a>" +
                    "</p>" +
                    "<img src=" + data[i].img + " class='articleImg'>" +
                    "<input type='text' placeholder='Name' id=" + "name" + data[i]._id + "> <br>" +
                    "<textarea id=" + "comment" + data[i]._id + "> </textarea>" +
                    "<button class='btn submitComment' id=" + "submit" + data[i]._id + "> Submit Comment </button>" +
                    "<h3> Comments : </h3>" +
                    "<div class='comments " + "comments" + data[i]._id + "'>" +
                    "</div>" +
                "</div>"
            );
        }
    });

    // Whenever the user clicks on a collapsible article,
    // Grab the comments and populate the specific article.
    $(document).on("click", ".articleAcc", function() {
        var id = $(this).attr("id");

        $(".comments" + id).empty();

        $.ajax({
            method: "GET",
            url: "/all/" + id
        })
        .then(function(data){
            for (var i = 0; i < data.comment.length; i++){
                $(".comments" + id).append(
                    "<h5>" + data.comment[i].name + "</h5>" +
                    "<h6>" + data.comment[i].comment + "</h6>" +
                    "<hr>"
                );
            }
        })
    });

    // Whenever the user submits a comment to a post,
    // Grab the name and comment field
    // Call an AJAX request to add the comment into that specific post.
    $(document).on("click", ".submitComment", function(){
        var id = $(this).attr("id").substring(6);
        var name = $("#name" + id).val().trim();
        var comment = $("#comment" + id).val().trim();

        $.ajax({
            method: "POST",
            url: "/all/" + id,
            data: {
                name: name,
                comment: comment
            }
        })
        .then(function(data){
            $("#name" + id).val("");
            $("#comment" + id).val("");
            
            $(".comments" + id).empty();

            $.ajax({
                method: "GET",
                url: "/all/" + id
            })
            .then(function(data){
                for (var i = 0; i < data.comment.length; i++){
                    $(".comments" + id).append(
                        "<h5>" + data.comment[i].name + "</h5>" +
                        "<h6>" + data.comment[i].comment + "</h6>" +
                        "<hr>"
                    );
                }
            })
        })
    })

});