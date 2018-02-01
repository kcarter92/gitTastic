var animes = ["Pokemon", "Naruto", "Cowboy Bebop", "Rick n Morty", "One Piece", "Sailor Moon", "Spirited Away", "Trigun", "Dragon Ball Z", "Bleach", "Fullmetal Alchemist"];

function displayAnime() {

	var anime = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + anime + "&api_key=TCOu5cz4YWxm9dzAE4DSbgVGZBJT7eCI&limit=10";
//Have it so it is a random gif everytime 

$.ajax({
url: queryURL,
method: "GET"
}).then(function(response) {

	console.log(queryURL);
	console.log(response);

	var animeDiv = $("<div class='anime'>");
	var results = response.data;

	for (var i = 0; i < results.length; i++) {

		var animeDiv = $("<div>");
		var p = $("<p>").text("Rating: " + results[i].rating);
		var animeImage = $("<img>");

		animeImage.attr("src", results[i].images.fixed_height_still.url);
		animeImage.attr("data-still", results[i].images.fixed_height_still.url);
		animeImage.attr("data-animate", results[i].images.fixed_height.url);
		animeImage.attr("data-state", "still");

		animeDiv.append(animeImage);
		animeDiv.append(p);

		animeDiv.addClass("gifDiv");

		$("#animes-view").prepend(animeDiv);
	}
});

}

function renderButtons() {

	$("#buttons-view").empty();
		for (var i = 0; i < animes.length; i++) 
		{
			var a = $("<button>");
			a.addClass("anime-btn");
			a.attr("data-name", animes[i]);
			a.text(animes[i]);
			$("#buttons-view").append(a);
		}
	}

	$("#add-anime").on("click", function(event) 
	{
		event.preventDefault();
		var anime = $("#anime-input").val().trim();

		animes.push(anime);

		renderButtons();

		$("#anime-input").val('');

	});
$(document).on("click", "img", function still() {
      var state = $(this).attr("data-state");
      console.log(state);
      if (state === "still") 
      {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } 
      else 
      {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
      console.log(this);
    });
$(document).on("click", ".anime-btn", displayAnime);

renderButtons();

//Write a function that will change the gif from '.static' to '.active'(giphy api understands data still etc)
//Reset background 