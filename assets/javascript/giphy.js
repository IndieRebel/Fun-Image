/* Stinson Javascript for GifTastic Week 6 HW */

// This assisgnment will use the GIPHY API key to make a dynamic web page
//Parameters will be set in javascript, and buttons will be shown when page loads
//Hint: Be sure to read about these GIPHY parameters *`q` *`limit` *`rating`
//Create a GIPHY API account https://giphy.com/channel/indierebel
//Obtain an API key d9iQLmtFBjxjp4MRuHdHujF8H58EA3rG
//Create an array of strings, each one related to your topic
//The app should take the topics and create buttons in your HTML
//When the user clicks on the button, the page should grab 10 static, non-animated gif images from the GIPHY API and display them on the page
//When the user clicks one of the gif, it should animate
//If the user clicks the gif again, it should stop
//A rating should appear under every gif
//Add a form to your page takes the value from a user input box and adds it into your `topics` array
//Then make a function call that takes each topic in the array remakes the buttons on the page

$(document).ready(function () {
  //array of topics
  var topics = ['80s music', '80s movies', '80s tv', '80s commercials', '80s retro', 'mtv 80s retro'];
  console.log(topics);

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=d9iQLmtFBjxjp4MRuHdHujF8H58EA3rG&limit=10";
  var apiKey = "&api_key=d9iQLmtFBjxjp4MRuHdHujF8H58EA3rG";
  var query = "&q="
  var limit = 10
  var rating = ['g', 'pg', 'pg13']

  // Search Endpoint
  //Host: api.giphy.com
  //Path: GET /v1/gifs/search
  //Description: Search all GIPHY GIFs for a word or phrase. Punctuation will be stripped and ignored. Use a plus or url encode for phrases. Example Emily+Blunt, John+Krasinski, or a+quiet+place

  //renders topics buttons
  function renderButtons() {
    $('#buttons-view').empty();

    for (var i = 0; i < topics.length; i++) {

      var newButton = $("<button class='btn btn-primary btn-lg active'>");
      newButton.attr("data-topics", topics[i]);
      newButton.text(topics[i]);

      $("#buttons-view").append(newButton);
    }
  }
  renderButtons();

  // pushes array items to DOM
  $("#add-topics").on("click", function (event) {
    event.preventDefault();
    var char = $("#topics-input").val().trim();
    topics.push(char);
    renderButtons();
  });

  // changed "doucment" listener to more specific #buttons-view
  $("#buttons-view").on("click", ".btn-primary", function () {

    var topics = $(this).attr("data-topics");
    //API calls returns 10 repsonses only 1 loads...
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=d9iQLmtFBjxjp4MRuHdHujF8H58EA3rG&limit=10"
    console.log(queryURL);
    //calls giphy API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
    });
  //assigned variables to still image and gif
  var stillImage = results[0].images.original_still.url
    var gifImage = results[0].images.original.url
    //loads rating object to html with click on character button
    $('.rating').html('Rated: ' + results[0].rating);
    //loads still image with click of character button
    $('.image').html('<img class="img-thumbnail" src="' + stillImage + ' "data-state="still"' + '>');
    $('.image').html('<img class="img-thumbnail" src="' + gifImage + ' "data-state="still"' + '>');

  });
  //supposed to add clicking event to image that changes src of still image to gif
  $(".img-thumbnail").on({
    'click': function () {
      var src = ($(this).attr('src') === stillImage) ?
        stillImage :
        gifImage;
      $(this).attr('src', src);
      console.log(img - thumbnail);

    }
  });

});