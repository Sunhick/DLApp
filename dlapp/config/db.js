/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  Pallavi Madasu<pama1314@colorado.edu>
*  @Desc: configuration for DB
*
*  Copyright (c) 2016. University of Colorado, boulder
*/

var mongoose = require("mongoose");
var dbURI = 'mongodb://localhost:27017/dlapp';

// Create the database connection 
mongoose.connect(dbURI); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 
