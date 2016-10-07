/**
*  @Author: Pallavi Madasu(pama1314@colorado.edu)
*  @Desc: student controller 
*
*  Copyright (c) 2016. University of Colorado, boulder
*/

var dbConfig = require('../config/db')
var mongoose = require('mongoose');
var Student = require('../models/students');

mongoose.createConnection(dbConfig.mongo.uri);

module.exports = function(router) {

	router.post('/student/add', function(req,res){

    	var studentModel = new Student(req.body);

    	studentModel.save(function(err, result){
    			res.json(result);
   		 });
	});
}