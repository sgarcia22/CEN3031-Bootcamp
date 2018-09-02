//Samantha Garcia
//CEN3031 Assignment #1

var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

/*
  The request handler sends the listingData in the JSON format if a GET request
  is sent to the '/listings' path. Otherwise, it sends a 404 error.
 */
var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
  if (parsedUrl.pathname != '/listings') {
      response.statusCode = 404;
      response.setHeader('Content-Type', 'text/plain');
      response.write('Bad gateway error');
  }
  else {
      response.setHeader('Content-Type', 'application/json');
      response.write(JSON.stringify(listingData));
  }
  response.end();
};

/*
  This callback function saves the data in the listingData variable, and
  then starts the server.
 */
fs.readFile('listings.json', 'utf8', function(err, data) {
   //If error, return string of error
   if (err) {
     console.log(err);
     throw err;
   }

   //Parse the json file into the listingData var
   listingData = JSON.parse(data);

   //Start the server
   var server = http.createServer(requestHandler);

   //The server is listening
   server.listen(port, function () {
     console.log('Received!');
   });

   console.log ("Server has started");

});
