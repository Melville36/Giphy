$(document).ready( function(){
  //List of sports topics to create buttons
  var topics = ["Football","Basketball","Baseball","Track and Field","Hockey","Soccer","Ping Pong","Fishing"];

  // Function for displaying sports data
      function renderButtons() {

        // Deleting the sports buttons prior to add the new sports
        $("#buttons-view").empty();

        // Looping through the array of sports
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each sports topic in the array
          var a = $("<button>");
          // Adding a class of sport to our button
          a.addClass("sport");
          // Adding a data-attribute
          a.attr("this-sport", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }


  //Function displays 10 images of sport topic selected
  function displaySport(){
    
    var sport = $(this).attr("this-sport");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&limit=10&api_key=dc6zaTOxFJmzC";

    
    $.ajax({
          url: queryURL,
          method: 'GET'
        }).done(function(response) {
          console.log(response);
          
          for (var i =0; i < response.data.length; i++){
          //Create sports div
          var sportDiv = $("<div class='sportImage'>");
          
          //Create variable to hold rating value
          var rating = response.data[i].rating;
          // Creating an element to have the rating displayed
              var pOne = $("<p>").text("Rating: " + rating);
              //Append the rating to the new div
              sportDiv.append(pOne);

          //Create image element
          var image = $("<img class='gifImage'>");
          //Add src attribute for image file
          var still = response.data[i].images.fixed_width_still.url;
          
          //Set the source attribute to the still image of the gif
          image.attr("src", still);

          //Create a still image attribute to hold the still image of the gif
          image.attr("imageStill", response.data[i].images.fixed_width_still.url);

          //Create a animated image attribute to hold the animated gif
          image.attr("imageMove", response.data[i].images.fixed_width.url);
          
          //Append the image file to the new div
          sportDiv.append(image);

          // Displaying the image and rating
          $("#gif").append(sportDiv);
              
        }
    });
  }


  // This function handles events where a sports button is clicked
      $("#add-sports").on("click", function(event) {
        
        event.preventDefault();
        
        // This line grabs the input from the textbox
        var sport = $("#sports-input").val().trim();

        // Adding movie from the textbox to our array
        topics.push(sport);

        // Calling renderButtons which handles the processing of our sports topics array
        renderButtons();
     
      });

      //When a gif is clicked start or stop the gif by changing the src
      $(document).on("click", ".gifImage", function(){
         // Create three variables to get the src, imageStill and imageMove attributes
              var imageSource = $(this).attr("src");
              var still = $(this).attr("imageStill");
              var move = $(this).attr("imageMove");
              
              // If the clicked image's source equal imageStill
              // Then, set the image's source to imageMove
              // Else set source equal to imageStill
              if (imageSource === still) {
                $(this).attr("src", move);
              } else {
                $(this).attr("src", still);
              }
      });

      // Adding a click event listener to all elements with a class of "sport"
      $(document).on("click", ".sport", displaySport);

    renderButtons();

});
