require("dotenv").config();

var keys = require("./keys.js");
// console.log("keys: " ,keys);

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var mediaString = "";

var inquirer = require("inquirer");

inquirer.prompt([

{
	type: "list",
	message: "Liri command?",
	choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
	name: "command"
}
])
.then(function(inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    console.log("\nCommand " + inquirerResponse.command);

    if (inquirerResponse.command === "my-tweets") {

    	// console.log("TWEET " + inquirerResponse.command);
    	// console.log("CLIENT " + inquirerResponse.command);
    	displayTwitter();
    }
    else if(inquirerResponse.command === "spotify-this-song"){
    	console.log("SPOTIFY " + inquirerResponse.command);
    	inquirer.prompt([
    	{
    		type: "input",
    		message: "Song Title?",
    		name: "name"
    	},
    	])
    	.then(function(inquirerResponse) {
    		console.log("NAME " + inquirerResponse.name);
    		mediaString = inquirerResponse.name;
    		console.log("mediaString" + mediaString);
    		if (mediaString === ""){
    			mediaString = "The Sign";
    		}
			displaySpotify();
		});
    }
    else if(inquirerResponse.command === "movie-this"){
     	// console.log("MOVIE " + inquirerResponse.command);
     	inquirer.prompt([
     	{
     		type: "input",
     		message: "Movie Title?",
     		name: "name"
     	},
     	])
     	.then(function(inquirerResponse) {
			// console.log("NAME " + inquirerResponse.name);
			mediaString = inquirerResponse.name;
			// console.log("mediaString" + mediaString);
			if (mediaString === ""){
				mediaString = "Mr. Nobody";
			}
			displayMovie();
		});
     }
     else if(inquirerResponse.command === "do-what-it-says"){
     	console.log("ANYTHING " + inquirerResponse.command);
     }


 });




 //  	function mediaName() {
	// 	// var inquirer = require("inquirer");

	// 	inquirer.prompt([
	// 	{
	// 		type: "input",
	// 		message: "Movie or Song Title?",
	// 		name: "name"
	// 	},
	// 	])
	// 	.then(function(inquirerResponse) {
	// 		console.log("NAME " + inquirerResponse.name);
	// 		mediaString = inquirerResponse.name;
	// 		console.log("mediaString" + mediaString);

	// 	});
	// }

  // Functions for each liri selection

  	function displayTwitter() {

  	var params = {screen_name: 'sjbmarek'};
  	client.get('statuses/user_timeline/', params, function(error, data, response) {
  		if (!error) {
  			console.log("@sjbmarek");
  			for (var i = 0;  i < data.length; i++) {
  				console.log("--------------------- " + (i+1) + " tweet---------------------")
  				console.log(data[i].text);
  			}
  		}
  		else{
  			console.log("Error: " + error);
  			return;
  		}
  	});        
	};

	function displaySpotify() {
		console.log("mediaString in displaySpotify function: " + mediaString);

		spotify.search({ type: 'track', query: mediaString, limit: 5 }, function(err, data) {
			if (err) {
				return console.log('Error: ' + err);
			} 
			console.log(data); 
		});

	};

	function displayMovie() {
	    var request = require("request");
		// Create a variable for holding the movie name
		var movieName = mediaString;
		// console.log("first movie name ", movieName);
		var modifiedmovieName = movieName.split(' ').join('+');
		// console.log("second movie name ", modifiedmovieName);
		// Run a request to the OMDB API with the movie specified
		var queryUrl = "http://www.omdbapi.com/?t=" + modifiedmovieName + "&y=&plot=short&apikey=trilogy";
		// console.log(queryUrl);
		request(queryUrl, function(error, response, body) {

		  // If the request is successful
		  if (!error && response.statusCode === 200) {

		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("IMDB Rating: " + JSON.parse(body).Rated);
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		    console.log("Country Where Produced: " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Plot: " + JSON.parse(body).Plot);
		    console.log("Actors: " + JSON.parse(body).Actors);
		    // console.log(JSON.parse(body));
			}
			else{
	  			console.log("Error: " + error);
	  			return;
  		}
		});
	};

	function displaySelection() {
           
    };
