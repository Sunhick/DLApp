/**
*  @Author: Pallavi Madasu(pama1314@colorado.edu)
*  @Desc: student controller 
*
*  Copyright (c) 2016. University of Colorado, boulder
*/

var Student = require('../models/students');


module.exports = function(router) {

	router.post('/student/add', function(req,res){

    	var studentModel = new Student(req.body);

    	studentModel.save(function(err, result){
    			res.json(result);
   		 });
	});

	// query mongo db for the list of students
	router.get("/students/list", function(req, res) {
        var students = [];
        Student.find({}, function(err, records) {
            records.forEach(function(record) {
                var student = {};
                student = record;
                students.push(student);
            });
            res.send(students);
        });
    });
}
