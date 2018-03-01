window.onload = function loaded(){

	var topics = ["Bugs Bunny", "Daffy Duck", "Tweety Bird", "Tasmanian Devil", "Sylvester the Cat", "Elmer Fudd", "Yosemite Sam", "Foghorn Leghorn"];


	function array(){
		
		for (var i = 0; i < topics.length; i++){
		var buttons = $('<button>' + topics[i] + '</button>');
		buttons.attr("data", topics[i]);
		buttons.attr("id", "button");
		buttons.appendTo('#funnyButtons');
		} //for
		animate();
	}//array

	array();

	$("#submit").on("click", function() {
    	var newCharacter = $("#add").val();
    	topics.push(newCharacter);
    	
    	$("#funnyButtons").empty();
    	array();
    	
    	// console.log("submit: " + newCharacter);
    })//submit on click

function animate(){

	$("button").on("click", function() {
		console.log("button on click");
		var character = $(this).attr("data");
		console.log("this attr data " + character);
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        character + "&api_key=a9jJeRz2QX1QmREE83SQa1taGjuEuuiO&limit=10";;

        $.ajax({
          url: queryURL,
          method: "GET"
        }) //ajax
        .then(function(response) {
          console.log(queryURL);

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          
          for (var i = 0; i < results.length; i++) {

            
            var characterDiv = $("#characters");
            var characterImage = $("<img>");
            
            characterImage.attr("src", results[i].images.fixed_height_still.url);
            characterImage.attr("data-still", results[i].images.fixed_height_still.url);
            characterImage.attr("data-animate", results[i].images.original.url);
            characterImage.attr("data-state", "still");
            characterImage.attr("class", "gif");
            
            characterDiv.append(p);
            characterDiv.append(characterImage);

            var p = $("<p>").text("Rating: " + results[i].rating);
            
            $("#characters").append(characterDiv);
          } //for results
        }); //then

	}) //button on click
}//animate

	$(document).on("click", ".gif", function(){
        	
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
     
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
      	console.log(state);
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

      } else {
      	console.log(state);
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    }); //gif on click





}//window.onload
