/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: students model
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    // primary faculty information
    firstName: String,
    lastName: String
});

var Student = mongoose.model('Student', studentSchema);

module.exports = Student;