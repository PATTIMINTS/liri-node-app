require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var liriResponse = process.argv[2];
var movieName = process.argv[3];
var artistname = process.argv[3];
var spotify = new Spotify(keys.spotify);


//switches

switch (liriResponse) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default: console.log("\n" + "type a command using 'node liri.js': " + "\n" +
        "concert-this + name of band" + "\n" +
        "spotify-this-song + title of song" + "\n" +
        "movie-this + title of movie" + "\n" +
        "do-what-it-says" + "\n" +
        "use quotes for titles with more than one word");
};

function movieThis() {
    if (!movieName) {
        movieName = "Mr Nobody";

    }
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=76a0debf";

    request(queryURL, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            var myMovies = JSON.parse(body);
            var queryURLresults =
                "Title: " + myMovies.Title + "\n" +
                "Year: " + myMovies.Year + "\n" +
                "Plot: " + myMovies.Plot + "\n" +
                "Actors: " + myMovies.Actors + "\n" +
                "imdbRating: " + myMovies.imdbRating + "\n" +
                "Rotten Tomatoe's Rating: " + myMovies.Ratings[1].Value + "\n" +
                "Country: " + myMovies.Country + "\n" +
                "Year: " + myMovies.Year + "\n"

            console.log(queryURLresults);

        } else {

            console.log("Error occurred: " + err);
            return;

        };
    });
};


//Spotify

var spotify = new Spotify(keys.spotify);

function spotifyThisSong(trackName) {
    var trackName = process.argv[3];



    if (!trackName) {
        trackName = "Friday I'm in Love";

    }


    spotify.search({
        type: 'track',
        query: trackName
    },

        function (err, data) {
            if (!err) {
                var trackInfo = data.tracks.items;
                for (var i = 0; i < 5; i++) {
                    if (trackInfo[i] != undefined) {

                        var spotifyResults =
                            "Artist: " + trackInfo[i].artists[0].name + "\n" +
                            "Song: " + trackInfo[i].name + "\n" +
                            "Album: " + trackInfo[i].album.name + "\n" +
                            "Preview URL: " + trackInfo[i].preview_url + "\n"

                        console.log(spotifyResults);
                        console.log(' ');

                    };
                };
            } else {
                console.log('Error occured:' + err);
                return;
            }
        });

};
// concert this
function concertThis() {
    var queryURL = "https://rest.bandsintown.com/artists/" + artistname + "/events?app_id=3c5eb98e695dc304f85847f7a803873b"

    request(queryURL, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            var eventData = JSON.parse(body);
            
            
            var queryURLresults =
                "Venue Name: " + eventData[0].venue.name + "\n" +
                "Lineup: " + eventData[0].lineup + "\n" +
                "City: " + eventData[0].venue.city + "\n" +
                "Region: " + eventData[0].venue.region + "\n" +
                "Date: " + eventData[0].datetime + "\n" +
                "Country: " + eventData[0].venue.country + "\n"


            console.log(queryURLresults);
        } else {
            console.log("Error occurred: " + err);
            return;

        };
    });
};

// doWhatItSays

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }


        var output = data.split(",");

        // Loop Through the newly created output array
        for (var i = 0; i < output.length; i++) {

            // Print each element (item) of the array/
            console.log(output[i]);
        }
    });
};






