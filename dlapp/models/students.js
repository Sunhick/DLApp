/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: students model
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    firstName: String,
    lastName: String,
    gender: String,
    origin: String,
    race: String,
    addressLine1Boulder: String,
    addressLine2Boulder: String,
    cityBoulder: String,
    stateBoulder: String,
    zipBoulder: Number,
    emailBoulder: String,
    phoneNumerBouler: String,
    addressLine1Summer: String,
    addressLine2Summer: String,
    citySummer: String,
    stateSummer: String,
    zipSummer: String,
    emailSummer: String,
    phoneNumberSummer: String,
    primaryMajor: String,
    gpa: Number,
    secondaryMajor: String,
    schoolLevel: String,
    listGradMonth: String,
    listGradYear: Number,
    sid: Number,
    researchExperience: String,
    appliedBefore: String,
    otherFallEmployment: String,
    projectInterest: String,
    firstChoice: String,
    secondChoice: String,
    thirdChoice: String,
    fourthChoice: String,
    fifthChoice: String,
    backgroundCheck: String,
    backgroundCheckSem: String,
    backgroundCheckYear: String,
    awarenessTraining: String,
    awarenessTrainingSem: String,
    awarenessTrainingYear: String,
    ssnInfo: Number,
    firstSkill: String,
    secondSkill: String,
    thirdSkill: String,
 });

studentSchema.plugin(filePlugin, {
   name: "resume",
   upload_to: make_upload_to_model(uploads, 'resume')
});

studentSchema.plugin(filePlugin, {
   name: "coverLetter",
   upload_to: make_upload_to_model(uploads, 'coverLetter')
});

var Student = mongoose.model('Student', studentSchema);

module.exports = Student;