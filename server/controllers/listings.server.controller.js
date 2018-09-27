
/* Dependencies */
var mongoose = require('mongoose'),
    Listing = require('../models/listings.server.model.js');

/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);

  /* Then save the listing */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.listing);
};

/* Update a listing */
exports.update = function(req, res) {
  var listing = req.listing;

  Listing.findOne({code : listing.code}, function (err, user) {
    if (err) {
      return res.status(400).send(err);
    }
    else {
      user.name = req.body.name;
      user.code = req.body.code;
      user.address = req.body.address;
      user.save(function (err) {
        if(err) {
            return res.status(400).send(err);
        }
      });
      res.send(user);
    }
  });
};

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;

  Listing.findByIdAndRemove(listing._id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.status(200);
      res.send(listing);
    }
  });
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  var codes = req.body.code;
  Listing.find({}, null, {sort : {codes}}, function(err, listings) {
     if (err) {
       console.log(err);
       res.status(400).send(err);
     }
     res.send(listings);
  });
};

/*
Middleware: find a listing by its ID, then pass it to the next request handler.

Find the listing using a mongoose query,
      bind it to the request object as the property 'listing',
      then finally call next
*/
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};
