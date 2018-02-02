require("dotenv").config();

var keys = require("./keys.js");
console.log("keys: " ,keys);

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

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

    	console.log("TWEET " + inquirerResponse.command);
    }
    else if(inquirerResponse.command === "spotify-this-song"){
     	console.log("SPOTIFY " + inquirerResponse.command);

    }
  	else if(inquirerResponse.command === "movie-this"){
     	console.log("MOVIE " + inquirerResponse.command);

    }
    else if(inquirerResponse.command === "do-what-it-says"){
     	console.log("ANYTHING " + inquirerResponse.command);
    }


  });