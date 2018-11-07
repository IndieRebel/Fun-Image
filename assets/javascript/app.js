/* Stinson Javascript for GifTastic Week 6 HW */

// This assisgnment will use the GIPHY API key to make a dynamic web page
//GIPHY API account https://giphy.com/channel/indierebel


$(document).ready(function(){
var limit = 10
var topics = ['80s music', '80s movies', '80s tv', '80s commercials', '80s retro', 'mtv 80s retro'];
function display() {
var apiKey = '5gOJhpUohTr0uqBWtpI9JMAf2rbHg4fZ';
var newGif = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q="+newGif+"&api_key="+apiKey+"&limit=10"+limit+"" ;

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
$(".gif").empty();
for (var i = 0; i < limit; i++){
  var gifDiv = $("<div class='gif'>").css('float','left');
  var rating = response.data[i].rating;
  var ratingPElement = $("<p>").text("Rating: "+rating);
  gifDiv.append(ratingPElement);
  var type = response.data[i].type;
  var typePElement = $("<p>").text("Type: "+type);
  gifDiv.append(typePElement);
  var source = response.data[i].source_tld;
  var sourceElement = $("<div>").addClass('moveIt').html("<a href="+"https://"+source+" target='_blank'>Source Link!!</a>");
  gifDiv.append(sourceElement);

  var gifURLStill = response.data[i].images.fixed_height_still.url;
  var gifURLAnimated = response.data[i].images.fixed_height.url;

  var gif = $("<img>").attr("data-still", gifURLStill).addClass('myGifs').attr("data-animate",gifURLAnimated).attr("src",gifURLStill).attr("data-state","still");

  gifDiv.append(gif);

  $("#gifSpace").prepend(gifDiv);
  }

  $(".myGifs").on("click", function() {

    var state = $(this).attr('data-state');
   
    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }   
    })

    
  });
}

function makeButton() {
$("#btns").empty();

for (var i = 0; i < topics.length; i++) {
  var adder = $("<button>");
  adder.addClass("retroBtn");
  adder.attr("data-name", topics[i]);
  adder.text(topics[i]);
  $("#btns").append(adder);
  }
}

$("#loadGif").on("click", function(event) {
event.preventDefault();
var newGif = $("#gifPlaceholder").val().trim();
topics.push(newGif);
makeButton();
});

$(document).on("click", ".retroBtn", display);
makeButton();
})