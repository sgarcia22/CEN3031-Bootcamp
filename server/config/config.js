//This file holds any configuration variables we may need
//'config.js' is ignored by git to protect sensitive information, such as your database's username and password
//copy this file's contents to another file 'config.js' and store your MongoLab uri there

module.exports = {
  db: {
    uri: 'mongodb://username:password1@ds157522.mlab.com:57522/cen-assignment3', //place the URI of your mongo database here.
  },
  port: 8080
};
