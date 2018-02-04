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
    // console.log("\nCommand " + inquirerResponse.command);

    if (inquirerResponse.command === "my-tweets") {

    	// console.log("TWEET " + inquirerResponse.command);
    	// console.log("CLIENT " + inquirerResponse.command);
    	inquirer.prompt([
    	{
    		type: "input",
    		message: "Twitter Screen Name (do NOT include @) ?",
    		name: "name"
    	},
    	])
    	.then(function(inquirerResponse) {
    		// console.log("NAME " + inquirerResponse.name);
    		// mediaString = inquirerResponse.name;
    		// console.log("mediaString" + mediaString);
    		if (mediaString === ""){
    			mediaString = "sjbmarek";
    		}
    		displayTwitter();
    	});

    	// displayTwitter();
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
    		// console.log("NAME " + inquirerResponse.name);
    		mediaString = inquirerResponse.name;
    		// console.log("mediaString" + mediaString);
    		if (mediaString === ""){
    			mediaString = "The Sign by Ace of Base";
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
     	// console.log("ANYTHING " + inquirerResponse.command);
     	displaySelection();
     }


 });
//-------------------------------------------------------------------------------------

  // Functions for each liri selection

  	function displayTwitter() {

	  	var params = {screen_name: mediaString};
	  	client.get('statuses/user_timeline/', params, function(error, data, response) {
	  		if (!error) {
	  			console.log("\nTweets for screen name: " + mediaString);
	  			for (var i = 0;  i < data.length; i++) {
	  				console.log("\n--------------------- tweet " + (i+1) + "------------------------")
	  				console.log(data[i].text);
	  				console.log("Created: " + data[i].created_at + " by " + data[i].user.name);
	  			};  
	  		}
	  		else{
	  			console.log("Error: " + error);
	  			return;
	  		}
	  	});       
	};

	function displaySpotify() {
		// console.log("mediaString in displaySpotify function: " + mediaString);

		spotify.search({ type: 'track', query: mediaString, limit: 1 }, function(err, data) {
			if (err) {
				return console.log('Error: ' + err);
			} 
			else {
			console.log("\nArtist/s Name: " + data.tracks.items[0].artists[0].name); 
			console.log("Song Name: " + data.tracks.items[0].name);
			console.log("Preview Link: " + data.tracks.items[0].preview_url);
			console.log("Album Name: " + data.tracks.items[0].album.name);
			// console.log("log: \n" + data.tracks.items[0]);
			}
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

		    console.log("\nTitle: " + JSON.parse(body).Title);
		    console.log('---------------------------------------------------')
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


		var fs = require("fs");

// This block of code will read from the "movies.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
		fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
 	 	if (error) {
  			return console.log("Error: " + error);
  		}

  // We will then print the contents of data
  		console.log(data);

  // Then split it by commas (to make it more readable)
  		var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
 		 // console.log(dataArr);
 		 if (dataArr[0]==="spotify-this-song"){
 		 	mediaString = dataArr[1];
 		 	displaySpotify();
 		 }
 		 else if(dataArr[0]==="movie-this"){
 		 	mediaString = dataArr[1];
 		 	displayMovie();
 		 }
 		 else if(dataArr[0]==="my-tweets"){
 		 	mediaString = dataArr[1];
 		 	displayTwitter();
 		 }

 		 });


		}