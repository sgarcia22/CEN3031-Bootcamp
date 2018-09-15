'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config'),
    listingData = require('./listings.json');

/* Connect to your database */
var db = mongoose.connect(config.db.uri);

/*
  Instantiate a mongoose model for each listing object in the JSON file,
  and then save it to your Mongo database
 */

var newListing;
listingData = listingData.entries;

for (var i = 0; i < listingData.length; ++i) {

  if (listingData[i].coordinates) {
    newListing = new Listing({
      code: listingData[i].code,
      name: listingData[i].name,
      coordinates: {
        latitude: listingData[i].coordinates.latitude,
        longitude: listingData[i].coordinates.longitude
      },
      address: listingData[i].address
    });
  }
  else {
    newListing = new Listing({
      code: listingData[i].code,
      name: listingData[i].name
    });
  }

  //Save the new listing
  newListing.save (function (err) {
    if (err) throw err;
    console.log ('New Listing has been added.');
  });

}


/*
  Once you've written + run the script, check out your MongoLab database to ensure that
  it saved everything correctly.
 */
